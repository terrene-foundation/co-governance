---
name: map-controls
description: Map regulatory requirements to organizational controls. Assess coverage and identify partial or missing mappings.
argument-hint: "[requirement area or regulation to map]"
---

# /map-controls $ARGUMENTS

Map the requirements for **$ARGUMENTS** to organizational controls.

## Protocol

1. **Find the active workspace**
2. **Read the relevant requirements register** from `03-work/`
3. **Identify the organization's control framework** (NIST, ISO 27001, SOC 2, or internal). Ask if not yet established.
4. **Map each requirement to existing controls** with coverage assessment
5. **Identify shared controls** that satisfy multiple requirements
6. **Document mapping rationale** for each connection
7. **Save the control mapping** to `03-work/`

## Output

Save to `03-work/control-mapping-[area-slug].md` with the structured format defined in the control-mapper agent.

## Rules

- Every mapping must explain HOW the control satisfies the requirement
- Ask the compliance officer to confirm the organization's control framework before mapping

## Delegation

Delegate the detailed mapping to the **control-mapper** agent.
