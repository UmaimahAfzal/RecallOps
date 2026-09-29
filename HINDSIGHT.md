# Hindsight Memory Integration

## Overview

RecallOps uses Hindsight as its persistent operational memory layer.

The purpose of this memory layer is to allow the incident-response agent to retain confirmed incident experiences and recall relevant knowledge during future investigations.

The core memory workflow is:

**Incident → Recall → Reason → Resolve → Remember**

---

## What RecallOps Remembers

After an engineer confirms an incident resolution, RecallOps stores:

- The original incident
- The confirmed root cause
- The resolution that was applied
- The outcome after resolution

This creates a reusable operational experience for future incidents.

---

## How Hindsight Is Used

RecallOps uses three key Hindsight capabilities:

### 1. Retain

After an incident is resolved, RecallOps sends the confirmed incident information to Hindsight using `retain`.

The stored memory contains the incident description, confirmed root cause, resolution, and outcome.

### 2. Recall

When a new incident is investigated, RecallOps sends the current incident description to Hindsight using `recall`.

Hindsight retrieves relevant previous operational experiences based on the current incident context.

The recalled memories are displayed in the RecallOps interface and made available to the reasoning process.

### 3. Reflect

RecallOps uses Hindsight `reflect` for LLM-powered reasoning over the available incident context and recalled memories.

This allows the agent to connect the current incident with relevant historical operational experience instead of treating every incident as completely new.

---

## Persistent Memory in Action

The memory loop can be demonstrated with two incidents involving the same underlying service.

### First Incident

An incident occurs and RecallOps investigates it.

The engineer confirms the root cause, resolution, and outcome.

The confirmed experience is then retained in Hindsight.

### Second Incident

A later incident is described differently but has a related underlying problem.

RecallOps performs another investigation.

Hindsight recalls the previously stored operational experience, allowing RecallOps to provide relevant historical context for the new investigation.

The important point is that the second investigation does not depend on repeating the exact wording of the first incident.

---

## Why Hindsight Matters

Without persistent operational memory, an incident-response agent can analyze the current incident but has limited access to the team's previous confirmed experiences.

With Hindsight, resolved incidents become reusable operational knowledge.

This creates a continuous loop:

**Investigate → Resolve → Remember → Recall → Improve Future Investigations**

The engineer remains responsible for confirming the actual root cause and resolution. RecallOps uses those confirmed outcomes as future context rather than automatically treating AI suggestions as fact.

---

## Technical Integration

The Hindsight client is initialized in the RecallOps Node.js backend.

The backend communicates with the Hindsight bank configured for the application.

The main operations are:

- `hindsight.recall()` — retrieves relevant operational memories.
- `hindsight.reflect()` — performs LLM-powered reasoning using the available context.
- `hindsight.retain()` — stores the confirmed incident experience.

The Hindsight API key is stored in an environment variable and is never committed to the repository.

---

## Memory Demonstration

The RecallOps demo demonstrates the complete memory lifecycle:

1. A new production incident is investigated.
2. Relevant Hindsight memories are recalled.
3. AI analysis provides investigation guidance.
4. The engineer confirms the actual resolution.
5. The incident outcome is retained in Hindsight.
6. A later incident is investigated using different wording.
7. Hindsight recalls the previously confirmed operational experience.
8. RecallOps uses that memory as context for the new investigation.

This demonstrates that Hindsight is not only used as a storage layer. It directly contributes historical operational context to the incident investigation workflow.

---

## Limitations

RecallOps currently focuses on a single operational memory bank and relies on the incident description to provide relevant service or project context.

It does not yet implement separate structured memory isolation for multiple organizations or projects.

Future versions could introduce structured project and service identifiers, richer incident metadata, and more advanced memory filtering.