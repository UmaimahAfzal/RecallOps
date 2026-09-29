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

Conceptually, the stored memory contains:

```text
Incident:
[incident description]

Root Cause:
[confirmed root cause]

Resolution:
[resolution applied]

Outcome:
[result after resolution]