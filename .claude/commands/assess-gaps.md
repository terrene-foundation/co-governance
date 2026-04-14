---
name: assess-gaps
description: Identify and prioritize gaps between regulatory requirements and current controls.
argument-hint: "[scope of gap assessment]"
---

# /assess-gaps $ARGUMENTS

Assess compliance gaps for **$ARGUMENTS**.

## Protocol

1. **Find the active workspace**
2. **Read control mappings** from `03-work/` to identify "Partial" and "None" coverage items
3. **Assess each gap** for severity, risk, and remediation priority
4. **Identify compound gaps** where multiple individual gaps create a larger exposure
5. **Recommend remediation approaches** with effort estimates
6. **Save the gap analysis** to `03-work/`

## Output

Save to `03-work/gap-analysis-[scope-slug].md` with the structured format defined in the gap-assessor agent.

## Rules

- The compliance officer decides risk acceptance and remediation priority
- Never downplay severity
- Remediation recommendations must be specific and actionable

## Delegation

Delegate the detailed assessment to the **gap-assessor** agent.
