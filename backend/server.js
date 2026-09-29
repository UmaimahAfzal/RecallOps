import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { HindsightClient } from "@vectorize-io/hindsight-client";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const hindsight = new HindsightClient({
  baseUrl: process.env.HINDSIGHT_BASE_URL,
  apiKey: process.env.HINDSIGHT_API_KEY,
});

const BANK_ID = process.env.HINDSIGHT_BANK_ID;


/* =========================================================
   BASIC HEALTH CHECK
========================================================= */

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "RecallOps backend is running",
  });
});


/* =========================================================
   HINDSIGHT CONNECTION TEST
========================================================= */

app.get("/api/hindsight-test", async (req, res) => {
  try {
    const response = await fetch(
      `${process.env.HINDSIGHT_BASE_URL}/v1/default/banks`,
      {
        headers: {
          Authorization: `Bearer ${process.env.HINDSIGHT_API_KEY}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data?.detail
          ? JSON.stringify(data.detail)
          : `Hindsight returned ${response.status}`
      );
    }

    const bank = data.banks?.find(
      (item) => item.bank_id === BANK_ID
    );

    if (!bank) {
      throw new Error(`Memory bank "${BANK_ID}" was not found.`);
    }

    res.json({
      success: true,
      message: "RecallOps is connected to Hindsight",
      bank: {
        id: bank.bank_id,
        name: bank.name,
      },
    });

  } catch (error) {
    console.error("Hindsight connection error:", error);

    res.status(500).json({
      success: false,
      message: "Could not connect to Hindsight",
      error: error.message,
    });
  }
});

app.get("/api/memory-test", async (req, res) => {
  try {
    const result = await hindsight.retain(
      BANK_ID,
      `
RecallOps test incident.

Incident:
Production API latency increased significantly.

Root cause:
Database connection pool exhaustion.

Resolution:
Increased the connection pool size and restarted affected services.

Outcome:
API latency returned to normal.

This incident should be remembered for future incidents involving API latency or database connection exhaustion.
      `.trim()
    );

    res.json({
      success: true,
      message: "Memory stored successfully",
      result,
    });

  } catch (error) {
    console.error("Memory storage error:", error);

    res.status(500).json({
      success: false,
      message: "Could not store memory",
      error: error.message,
    });
  }
});

app.get("/api/recall-test", async (req, res) => {
  try {
    const result = await hindsight.recall(
      BANK_ID,
      "Production API latency increased because of database connection pool exhaustion"
    );

    res.json({
      success: true,
      message: "Memory recalled successfully",
      result,
    });

  } catch (error) {
    console.error("Memory recall error:", error);

    res.status(500).json({
      success: false,
      message: "Could not recall memory",
      error: error.message,
    });
  }
});

app.post("/api/investigate", async (req, res) => {
  try {
    const { incident } = req.body;

    if (!incident || !incident.trim()) {
      return res.status(400).json({
        success: false,
        message: "Incident description is required",
      });
    }

    // 1. Recall relevant historical incidents
    const memory = await hindsight.recall(
      BANK_ID,
      incident
    );

    // 2. Ask Hindsight to reason over the incident + memory
    const analysis = await hindsight.reflect(
  BANK_ID,
  `
You are RecallOps, an AI incident-response engineer.

Analyze this production incident using the operational memory
stored in RecallOps.

CURRENT INCIDENT:
${incident}

Use relevant previous incidents, root causes, resolutions,
and outcomes when they are applicable.

Provide:
1. Incident assessment
2. Relevant historical evidence
3. Likely root cause
4. Investigation steps
5. Recommended resolution
6. Important uncertainty or caution

Do not invent historical incidents.
Clearly distinguish historical memory from your reasoning.
  `.trim(),
  {
    budget: "low",
  }
);

    res.json({
  success: true,
  incident,
  memories: memory.results || [],
  analysis:
    typeof analysis?.text === "string"
      ? analysis.text
      : typeof analysis === "string"
        ? analysis
        : JSON.stringify(analysis, null, 2),
});

  } catch (error) {
    console.error("Investigation error:", error);

    res.status(500).json({
      success: false,
      message: "Investigation failed",
      error: error.message,
    });
  }
});

app.post("/api/resolve", async (req, res) => {
  try {
    const {
      incident,
      rootCause,
      resolution,
      outcome,
    } = req.body;

    if (!incident || !rootCause || !resolution) {
      return res.status(400).json({
        success: false,
        message: "Incident, root cause, and resolution are required.",
      });
    }

    const memoryContent = `
RecallOps incident resolution record.

Incident:
${incident}

Root cause:
${rootCause}

Resolution:
${resolution}

Outcome:
${outcome || "Outcome not specified."}

This is a confirmed incident-resolution experience from the engineering team.
Use it as operational knowledge for future similar incidents.
    `.trim();

    const result = await hindsight.retain(
      BANK_ID,
      memoryContent
    );

    res.json({
      success: true,
      message: "Resolution remembered successfully",
      result,
    });

  } catch (error) {
    console.error("Resolution memory error:", error);

    res.status(500).json({
      success: false,
      message: "Could not remember resolution",
      error: error.message,
    });
  }
});
/* =========================================================
   START SERVER
========================================================= */

app.listen(PORT, () => {
  console.log(`RecallOps backend running on http://localhost:${PORT}`);
  console.log(`Hindsight bank: ${BANK_ID}`);
});