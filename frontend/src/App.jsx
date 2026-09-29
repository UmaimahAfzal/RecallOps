import { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import {
  BrainCircuit,
  Activity,
  Database,
  Network,
  ShieldAlert,
  Search,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Zap,
  Paperclip,
  BarChart3,
  FileText,
  Clock3,
  ChevronRight,
} from "lucide-react";

import "./App.css";

function App() {
  const [incident, setIncident] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
const [loadingStage, setLoadingStage] = useState(0);
const [rootCause, setRootCause] = useState("");
const [resolution, setResolution] = useState("");
const [outcome, setOutcome] = useState("");
const [remembering, setRemembering] = useState(false);
const [remembered, setRemembered] = useState(false);
  const analysisRef = useRef(null);



 const handleInvestigate = async () => {
  if (!incident.trim()) return;

  setLoading(true);
  setError("");
  setAnalysis("");
  setMemories([]);
  setLoadingStage(0);

  const stageTimer = setInterval(() => {
    setLoadingStage((current) => {
      if (current < 3) {
        return current + 1;
      }
      return current;
    });
  }, 1800);

  try {
    const response = await fetch("http://localhost:5000/api/investigate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        incident: incident.trim(),
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error || data.message || "Investigation failed");
    }

    clearInterval(stageTimer);

    setLoadingStage(4);
    setAnalysis(data.analysis || "");
    setMemories(data.memories || []);

    setTimeout(() => {
      analysisRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 500);

  } catch (err) {
    clearInterval(stageTimer);

    console.error("Investigation error:", err);
    setError(err.message || "Something went wrong");

  } finally {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }
};

const handleRememberResolution = async () => {
  if (!incident.trim() || !rootCause.trim() || !resolution.trim()) {
    return;
  }

  setRemembering(true);
  setRemembered(false);
  setError("");

  try {
    const response = await fetch("http://localhost:5000/api/resolve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        incident: incident.trim(),
        rootCause: rootCause.trim(),
        resolution: resolution.trim(),
        outcome: outcome.trim(),
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(
        data.error || data.message || "Could not remember resolution"
      );
    }

    setRemembered(true);

  } catch (err) {
    console.error("Remember resolution error:", err);
    setError(err.message || "Could not remember resolution");
  } finally {
    setRemembering(false);
  }
};

  return (
    <div className="app-shell">

      {/* ================= NAVBAR ================= */}
      <header className="navbar">
        <div className="nav-inner">

          <div className="brand">
            <div className="brand-icon">
              <BrainCircuit size={27} strokeWidth={1.8} />
            </div>

            <div className="brand-text">
              <div className="brand-name">
                Recall<span>Ops</span>
              </div>
              <div className="brand-subtitle">
                INCIDENT INTELLIGENCE
              </div>
            </div>
          </div>

          <nav className="nav-links">
  <a href="#home" className="nav-link active">
    <Activity size={17} />
    Home
  </a>

  <a href="#incidents" className="nav-link">
    <Activity size={17} />
    Incidents
  </a>

  <a href="#memory" className="nav-link">
    <Database size={17} />
    Memory
  </a>

  <a href="#workflow" className="nav-link">
    <Network size={17} />
    How it works
  </a>
</nav>

          <div className="system-status">
            <span className="status-dot"></span>
            SYSTEM ONLINE
          </div>

        </div>
      </header>


      {/* ================= HERO ================= */}
      <main>

<section id="home" className="hero-section">
          <div className="hero-bg"></div>
          <div className="hero-overlay"></div>

          <div className="hero-container">

            {/* LEFT SIDE */}
            <div className="hero-copy">

              <div className="eyebrow">
                <Sparkles size={15} />
                AI-POWERED INCIDENT RESPONSE
              </div>

              <h1>
                When production breaks,
                <br />
                your team's memory
                <br />
                <span>shouldn't.</span>
              </h1>

              <p className="hero-description">
                RecallOps remembers how your team handled incidents before,
                learns from every resolution, and brings that operational
                knowledge back when the next incident occurs.
              </p>


              {/* FEATURE PILLS */}
              <div className="feature-row">

                <div className="feature-item">
                  <div className="feature-icon blue">
                    <Zap size={19} />
                  </div>
                  <span>
                    Faster
                    <br />
                    Resolution
                  </span>
                </div>

                <div className="feature-item">
                  <div className="feature-icon purple">
                    <Database size={19} />
                  </div>
                  <span>
                    Persistent
                    <br />
                    Memory
                  </span>
                </div>

                <div className="feature-item">
                  <div className="feature-icon cyan">
                    <BrainCircuit size={19} />
                  </div>
                  <span>
                    Context-Aware
                    <br />
                    AI
                  </span>
                </div>

                <div className="feature-item">
                  <div className="feature-icon gold">
                    <BarChart3 size={19} />
                  </div>
                  <span>
                    Stronger
                    <br />
                    Teams
                  </span>
                </div>

              </div>

            </div>


            {/* RIGHT INCIDENT CARD */}
            <div className="hero-incident">

<div id="incidents" className="incident-card">
                <div className="incident-card-header">

                  <div className="incident-alert-icon">
                    <ShieldAlert size={21} />
                  </div>

                  <div>
                    <h3>Describe a production incident</h3>
                    <p>
                      Tell RecallOps what's happening. The agent will search
                      its memory and guide you.
                    </p>
                  </div>

                </div>


                <textarea
                  value={incident}
                  onChange={(e) => setIncident(e.target.value)}
                  placeholder="Example: Payment API is returning 503 errors after today's deployment..."
                />
{loading && (
  <div className="recall-engine-status">
    <div className="recall-engine-header">
      <div className="recall-engine-title">
        <span className="recall-pulse"></span>
        RECALL ENGINE
      </div>

      <span className="recall-engine-active">
        ACTIVE
      </span>
    </div>

    <div className="recall-stage">
      <span className="stage-icon completed">✓</span>
      <span>Incident captured</span>
    </div>

    <div className={`recall-stage ${loadingStage >= 1 ? "active" : ""}`}>
      <span className="stage-icon">
        {loadingStage >= 1 ? "◉" : "○"}
      </span>
      <span>Searching operational memory</span>
    </div>

    <div className={`recall-stage ${loadingStage >= 2 ? "active" : ""}`}>
      <span className="stage-icon">
        {loadingStage >= 2 ? "◉" : "○"}
      </span>
      <span>Comparing historical patterns</span>
    </div>

    <div className={`recall-stage ${loadingStage >= 3 ? "active" : ""}`}>
      <span className="stage-icon">
        {loadingStage >= 3 ? "◉" : "○"}
      </span>
      <span>Generating investigation plan</span>
    </div>
  </div>
)}

                <div className="incident-actions">

                  <button className="attach-button">
                    <Paperclip size={17} />
                    Add logs <span>(optional)</span>
                  </button>

                  <button
                    className="investigate-button"
                    onClick={handleInvestigate}
                    disabled={loading}
                  >
                    <Search size={19} />
                    {loading ? "Investigating..." : "Investigate Incident"}
                    <ArrowRight size={18} />
                  </button>

                </div>

              </div>


              {/* DECORATIVE MONITOR */}
              <div className="monitor-glow">

                <div className="monitor-screen">

                  <div className="monitor-top">
                    <span>PRODUCTION INCIDENT</span>
                    <span className="monitor-live">LIVE</span>
                  </div>

                  <div className="monitor-title">
                    Payment API — HTTP 503
                  </div>

                  <div className="graph">
                    <div className="graph-line"></div>
                  </div>

                  <div className="monitor-footer">
                    <span>ERROR RATE</span>
                    <strong>+42.8%</strong>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* ================= ANALYSIS SECTION ================= */}
<section ref={analysisRef} className="analysis-section">
          <div className="analysis-grid">

            {/* AI ANALYSIS */}
<div id="memory" className="glass-panel">
              <div className="panel-heading">

                <div className="heading-left">

                  <div className="panel-icon blue-icon">
                    <Sparkles size={21} />
                  </div>

                  <div>
                    <h2>AI Analysis</h2>
                    <p>
                      Reasoning from current incident and historical memory
                    </p>
                  </div>

                </div>

              </div>


              {loading ? (
  <div className="empty-state">
    <div className="empty-icon blue-empty">
      <BrainCircuit size={28} />
    </div>

    <h3>Investigating incident...</h3>

    <p>
      RecallOps is searching operational memory and reasoning
      over previous incidents.
    </p>
  </div>
) : error ? (
  <div className="empty-state">
    <div className="empty-icon blue-empty">
      <ShieldAlert size={28} />
    </div>

    <h3>Investigation failed</h3>

    <p>{error}</p>
  </div>
) : analysis ? (
 <div className="analysis-result">
  <div className="analysis-markdown">
    <ReactMarkdown>
      {analysis}
    </ReactMarkdown>
  </div>
</div>
) : (
  <div className="empty-state">
    <div className="empty-icon blue-empty">
      <BrainCircuit size={28} />
    </div>

    <h3>Waiting for an incident...</h3>

    <p>
      RecallOps will analyze the issue and provide
      an investigation plan.
    </p>
  </div>
)}
            </div>
            {analysis && (
  <div className="resolution-panel">
<div className="resolution-heading">
  <div>
    <div className="resolution-kicker">
      NEXT STEP
    </div>

    <h3>Confirm the Resolution</h3>

    <p>
      Review the investigation, then tell RecallOps what actually
      fixed the incident. Your confirmation becomes future
      operational memory.
    </p>
  </div>
</div>

    <div className="resolution-fields">
      <div className="resolution-field">
        <label>Root Cause</label>
        <textarea
          value={rootCause}
          onChange={(e) => setRootCause(e.target.value)}
          placeholder="Example: Database connection pool was exhausted after deployment."
        />
      </div>

      <div className="resolution-field">
        <label>Resolution</label>
        <textarea
          value={resolution}
          onChange={(e) => setResolution(e.target.value)}
          placeholder="Example: Increased the connection pool size and restarted affected services."
        />
      </div>

      <div className="resolution-field">
        <label>Outcome <span>(optional)</span></label>
        <textarea
          value={outcome}
          onChange={(e) => setOutcome(e.target.value)}
          placeholder="Example: API latency returned to normal."
        />
      </div>
    </div>

    <button
      className="remember-button"
      onClick={handleRememberResolution}
      disabled={
        remembering ||
        !rootCause.trim() ||
        !resolution.trim()
      }
    >
      {remembering ? (
        <>
          <Database size={18} />
          Remembering...
        </>
      ) : remembered ? (
        <>
          <CheckCircle2 size={18} />
          Resolution Remembered
        </>
      ) : (
        <>
          <Database size={18} />
          Remember This Resolution
          <ArrowRight size={17} />
        </>
      )}
    </button>

    {remembered && (
  <>
    <div className="remember-success">
      <CheckCircle2 size={16} />
      This resolution has been added to RecallOps operational memory.
    </div>

    <div className="continue-hint">
      ↓ &nbsp; Review the updated Hindsight Memory below
    </div>
  </>
)}

{!remembered && (
  <div className="continue-hint">
    ↓ &nbsp; After remembering the resolution, review Hindsight Memory below
  </div>
)}
  </div>
)}


            {/* HINDSIGHT MEMORY */}
            <div className="glass-panel">

              <div className="panel-heading">

                <div className="heading-left">

                  <div className="panel-icon purple-icon">
                    <Database size={21} />
                  </div>

                  <div>
                    <h2>Hindsight Memory</h2>
                    <p>
                      Relevant historical incidents
                    </p>
                  </div>

                </div>

<div className="match-count">
  {memories.length} {memories.length === 1 ? "match" : "matches"}
</div>

              </div>


             {memories.length > 0 ? (
  <div className="memory-list">
    {memories.map((memory) => (
      <div className="memory-card" key={memory.id}>
       <div className="memory-card-top">
  <span className="memory-type">
    {memory.type || "memory"}
  </span>

  <span className="memory-score">
    RECALLED
  </span>
</div>

        <p>{memory.text}</p>

        {memory.entities?.length > 0 && (
          <div className="memory-tags">
            {memory.entities.map((entity) => (
              <span key={entity}>{entity}</span>
            ))}
          </div>
        )}
      </div>
    ))}
  </div>
) : (
  <div className="empty-state">
    <div className="empty-icon purple-empty">
      <Database size={28} />
    </div>

    <h3>No related incidents found yet.</h3>

    <p>
      Historical context will appear here after investigation.
    </p>
  </div>
)}

            </div>

          </div>

        </section>


        {/* ================= WORKFLOW ================= */}
<section id="workflow" className="workflow-section">
          <div className="workflow-title">

            <div className="workflow-kicker">
              HOW RECALLOPS WORKS
            </div>

            <h2>
              Every incident makes
              <br />
              RecallOps smarter.
            </h2>

          </div>


          <div className="workflow-steps">

            {/* STEP 1 */}
            <div className="workflow-step">

              <div className="step-icon red-step">
                <ShieldAlert size={22} />
              </div>

              <div className="step-number">01</div>

              <div className="step-content">
                <h3>Incident</h3>
                <p>
                  A production problem
                  <br />
                  is reported.
                </p>
              </div>

            </div>


            <div className="step-arrow">
              <ArrowRight size={22} />
            </div>


            {/* STEP 2 */}
            <div className="workflow-step">

              <div className="step-icon blue-step">
                <BrainCircuit size={22} />
              </div>

              <div className="step-number blue-number">02</div>

              <div className="step-content">
                <h3>Recall</h3>
                <p>
                  Hindsight retrieves
                  <br />
                  relevant history.
                </p>
              </div>

            </div>


            <div className="step-arrow">
              <ArrowRight size={22} />
            </div>


            {/* STEP 3 */}
            <div className="workflow-step">

              <div className="step-icon green-step">
                <CheckCircle2 size={22} />
              </div>

              <div className="step-number green-number">03</div>

              <div className="step-content">
                <h3>Resolve</h3>
                <p>
                  The engineer confirms
                  <br />
                  what worked.
                </p>
              </div>

            </div>


            <div className="step-arrow">
              <ArrowRight size={22} />
            </div>


            {/* STEP 4 */}
            <div className="workflow-step">

              <div className="step-icon gold-step">
                <Database size={22} />
              </div>

              <div className="step-number gold-number">04</div>

              <div className="step-content">
                <h3>Remember</h3>
                <p>
                  The outcome becomes
                  <br />
                  future knowledge.
                </p>
              </div>

            </div>

          </div>

        </section>


        {/* ================= METRICS ================= */}
       <section className="metrics-section">

  <Metric
    icon={<Database size={19} />}
    number={String(memories.length).padStart(2, "0")}
    label="Memories recalled"
    type="blue"
  />

  <Metric
    icon={<CheckCircle2 size={19} />}
    number={remembered ? "01" : "00"}
    label="Resolution remembered"
    type="green"
  />

  <Metric
    icon={<Search size={19} />}
    number={String(memories.length).padStart(2, "0")}
    label="Relevant matches"
    type="cyan"
  />

  <Metric
    icon={<BrainCircuit size={19} />}
    number="LIVE"
    label="AI reasoning"
    type="blue"
  />

</section>


      </main>


      {/* ================= FOOTER ================= */}
<footer className="footer">
  <div className="footer-left">
    <div className="footer-brand">
      <BrainCircuit size={19} />
      <span>RecallOps</span>
    </div>

    <span className="footer-tagline">
      Operational memory for modern engineering teams.
    </span>
  </div>

  <div className="footer-center">
    <span>AI INCIDENT RESPONSE</span>
    <span>•</span>
    <span>PERSISTENT MEMORY</span>
    <span>•</span>
    <span>HINDSIGHT POWERED</span>
  </div>

  <div className="footer-status">
    <span className="status-dot"></span>
    SYSTEM ONLINE
  </div>
</footer>

    </div>
  );
}


function Metric({ icon, number, label, type }) {
  return (
    <div className="metric-card">

      <div className={`metric-icon ${type}`}>
        {icon}
      </div>

      <div className="metric-number">
        {number}
      </div>

      <div className="metric-label">
        {label}
      </div>

    </div>
  );
}


export default App;