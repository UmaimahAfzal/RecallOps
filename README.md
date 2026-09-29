# RecallOps

### The AI Incident-Response Agent That Remembers Why Production Broke

RecallOps is an AI-powered incident-response agent that helps engineers investigate production incidents by combining current incident analysis with persistent operational memory.

Instead of treating every incident as a completely new problem, RecallOps recalls how similar incidents were diagnosed and resolved in the past, uses that experience to guide its reasoning, and stores confirmed resolutions for future incidents.

> **Incident → Recall → Reason → Resolve → Remember**

---

## Why RecallOps?

Production incidents rarely happen in isolation.

A team may have already encountered a similar database failure, API timeout, deployment issue, or traffic-related outage months earlier. The problem is that the useful context is often buried across incident tickets, chat messages, documents, or individual experience.

Traditional AI assistants can reason about the incident in front of them, but without persistent operational memory, they may repeatedly start from scratch.

RecallOps is designed around a different idea:

> **An incident-response agent should learn from the incidents a team has already resolved.**

With persistent memory, previous incidents become operational experience that can be recalled when similar problems occur again.

---

## What RecallOps Does

An engineer submits a production incident such as:

```text
The Payment API is returning 503 errors after a deployment.
Requests are failing intermittently and customers cannot complete payments.
```

RecallOps then:

1. **Recalls** relevant historical incidents from Hindsight.
2. **Analyzes** the current incident using the recalled operational context.
3. **Reasons** about possible causes and recommended investigation steps.
4. Allows the engineer to confirm the actual:
   - Root Cause
   - Resolution
   - Outcome
5. **Remembers** the confirmed resolution in Hindsight.
6. Uses that accumulated memory when a similar incident occurs later.

The result is an incident-response workflow that becomes more useful as operational experience accumulates.

---

## Core Workflow

```text
┌──────────────┐
│   INCIDENT   │
│ Engineer      │
│ reports issue │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│    RECALL    │
│ Search       │
│ Hindsight    │
│ memory       │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│    REASON    │
│ Analyze the  │
│ incident with│
│ past context │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│    RESOLVE   │
│ Engineer     │
│ confirms     │
│ actual fix   │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   REMEMBER   │
│ Store the    │
│ experience  │
│ in Hindsight │
└──────────────┘
       │
       └──────────────► Future incidents
```

---

## The Hindsight Memory Layer

Hindsight is the core memory system behind RecallOps.

RecallOps uses Hindsight for two complementary operations:

### 1. Recall

When a new incident is submitted, RecallOps sends the incident context to Hindsight and retrieves relevant historical experiences.

These memories can include:

- Previous incident descriptions
- Root causes
- Resolutions
- Outcomes
- Related operational entities
- Connections between past experiences

The recalled information becomes context for the agent's reasoning.

### 2. Remember

After an engineer confirms how an incident was actually resolved, RecallOps stores the experience back into Hindsight.

A remembered incident contains:

```text
Incident
Root Cause
Resolution
Outcome
```

This creates a continuous learning loop:

```text
Past Incident
      ↓
   Hindsight
      ↓
 New Incident
      ↓
   AI Analysis
      ↓
 Confirmed Resolution
      ↓
   Hindsight
      ↓
 Better Context for Future Incidents
```

The memory is therefore not just a display element—it directly participates in the incident investigation workflow.

---

## Example: Persistent Learning

Consider a previous incident:

```text
Incident:
Payment API returned 503 errors.

Root Cause:
A deployment caused database connection pool exhaustion.

Resolution:
The database connection pool was increased and
affected services were restarted.

Outcome:
The Payment API recovered.
```

Later, an engineer reports a differently worded incident:

```text
The order service is experiencing severe latency and
504 timeout errors during a traffic spike.
Requests are piling up and customers cannot complete
their purchases.
```

RecallOps can retrieve related historical operational experiences and use them as context while reasoning about the new incident.

This demonstrates the key idea behind RecallOps:

> **The agent does not only answer the current question. It can use accumulated operational experience.**

---

## Architecture

```text
                     ┌───────────────────────┐
                     │       Engineer        │
                     │   Incident / Outcome  │
                     └───────────┬───────────┘
                                 │
                                 ▼
                    ┌────────────────────────┐
                    │     React Frontend     │
                    │                        │
                    │  Incident Investigation│
                    │  AI Analysis            │
                    │  Resolution Capture     │
                    │  Hindsight Memory       │
                    └───────────┬────────────┘
                                │
                         REST API / JSON
                                │
                                ▼
                    ┌────────────────────────┐
                    │   Node.js + Express    │
                    │        Backend         │
                    │                        │
                    │ /api/investigate       │
                    │ /api/resolve           │
                    │ /api/recall-test       │
                    │ /api/memory-test       │
                    └───────┬────────┬───────┘
                            │        │
                    ┌───────▼───┐ ┌──▼──────────────┐
                    │  Hindsight │ │  Agent Reasoning │
                    │   Memory   │ │     / Reflect    │
                    └───────────┘ └───────────────────┘
```

---

## Technology Stack

### Frontend

- React
- Vite
- Tailwind CSS
- Lucide React
- React Markdown

### Backend

- Node.js
- Express
- CORS
- dotenv

### AI / Memory

- Hindsight
- Hindsight Cloud
- Hindsight Client SDK
- Hindsight Recall
- Hindsight Retain
- Hindsight Reflect

---

## Project Structure

```text
RecallOps/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

## Getting Started

### Prerequisites

Make sure the following are installed:

- Node.js
- npm
- A Hindsight account
- A Hindsight API key

---

## 1. Clone the Repository

```bash
git clone https://github.com/UmaimahAfzal/RecallOps.git
cd RecallOps
```

---

## 2. Configure the Backend

Move into the backend directory:

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
PORT=5000

HINDSIGHT_BASE_URL=https://api.hindsight.vectorize.io

HINDSIGHT_API_KEY=your_hindsight_api_key

HINDSIGHT_BANK_ID=recallops
```

### Important

Never commit the real Hindsight API key to GitHub.

The project uses environment variables for credentials, and `.env` is excluded through `.gitignore`.

---

## 3. Start the Backend

From the `backend` directory:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

---

## 4. Start the Frontend

Open another terminal:

```bash
cd RecallOps/frontend
npm install
npm run dev
```

Vite will provide the local development URL, typically:

```text
http://localhost:5173
```

Open that URL in your browser.

---

## API Endpoints

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/health` | GET | Check backend availability |
| `/api/hindsight-test` | GET | Verify Hindsight connectivity |
| `/api/memory-test` | GET | Test storing operational memory |
| `/api/recall-test` | GET | Test recalling stored memory |
| `/api/investigate` | POST | Investigate a new incident |
| `/api/resolve` | POST | Store a confirmed incident resolution |

---

## Investigation Flow

### Step 1 — Submit an Incident

The engineer enters a production incident.

Example:

```text
The Payment API is returning 503 errors after a deployment.
Requests are failing intermittently and customers cannot
complete payments.
```

### Step 2 — Recall

RecallOps queries Hindsight for relevant historical experiences.

### Step 3 — Analyze

The recalled context is passed into the agent's reasoning workflow.

The resulting analysis can include:

- Relevant historical incidents
- Possible causes
- Evidence from previous incidents
- Recommended investigation steps
- Uncertainty or limitations

### Step 4 — Confirm the Resolution

The engineer provides:

```text
Root Cause:
The deployment introduced a database connection configuration
issue that exhausted the connection pool.

Resolution:
Increased the database connection pool size and restarted
the affected services.

Outcome:
Payment API recovered and response times returned to normal.
```

### Step 5 — Remember

RecallOps stores this confirmed experience in Hindsight.

The information is then available as operational memory for future investigations.

---

## Why Persistent Memory Matters

Without persistent memory:

```text
Incident A → AI analyzes → Done

Incident B → AI starts again from scratch
```

With RecallOps:

```text
Incident A
    ↓
Resolve
    ↓
Remember
    ↓
Hindsight
    ↓
Incident B
    ↓
Recall previous experience
    ↓
Better contextual reasoning
```

The goal is not simply to make the AI generate another answer.

The goal is to give the agent **operational continuity**.

---

## Design Principles

### Memory as a Reasoning Layer

Hindsight is integrated into the investigation loop rather than being used only as a history page.

### Human Confirmation

RecallOps does not blindly treat an AI suggestion as the final truth.

The engineer confirms:

- Root cause
- Resolution
- Outcome

before the experience is stored as a confirmed resolution.

### Evidence-Aware Reasoning

Historical incidents are used as context rather than automatically treated as identical to the current incident.

This allows the agent to reason about similarities while preserving uncertainty.

### Continuous Operational Learning

Every confirmed resolution can become useful context for future incidents.

---

## Security

Sensitive configuration is kept outside the source code.

The following files and directories are ignored:

```text
.env
.env.local
node_modules/
dist/
build/
```

**Never commit API keys, tokens, passwords, or other credentials.**

---

## Current Scope

RecallOps currently focuses on a single core workflow:

> **AI-assisted production incident investigation with persistent operational memory.**

The project intentionally prioritizes a focused workflow rather than attempting to become a complete enterprise incident-management platform.

---

## Future Extensions

Potential extensions include:

- Structured project and service context
- Incident severity classification
- Timeline reconstruction
- Runbook generation
- Incident similarity scoring
- Team-level operational memory
- Incident history and analytics
- Integration with monitoring and alerting systems
- Slack / Teams incident workflows
- Automated post-incident summaries

These are future directions and are not required for the current core workflow.

---

## Core Value Proposition

Traditional incident response often depends on whether the right engineer remembers what happened last time.

RecallOps turns that experience into reusable operational memory.

```text
                         ┌─────────────────┐
                         │  What happened? │
                         └────────┬────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │ What happened   │
                         │     before?     │
                         └────────┬────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │ What worked     │
                         │     before?     │
                         └────────┬────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │ What should we  │
                         │ investigate now?│
                         └────────┬────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │ Remember the    │
                         │ confirmed fix   │
                         └─────────────────┘
```

---

## The Idea in One Sentence

> **RecallOps gives an AI incident-response agent a memory of what the team has already learned, so every resolved incident can become context for the next one.**

---

## Author

**Umaimah Afzal**

GitHub:  
https://github.com/UmaimahAfzal

---

## License

This project is intended as a demonstration and engineering prototype for AI-powered incident response and persistent operational memory.