---
name: analyze-regulation
description: Analyze a specific regulation or standard and extract actionable requirements into a structured register.
argument-hint: "[regulation name, e.g., 'GDPR', 'HIPAA', 'PCI DSS v4.0']"
---

# /analyze-regulation $ARGUMENTS

Analyze **$ARGUMENTS** and extract a structured requirements register.

## Protocol

1. **Find the active workspace**
2. **Identify the regulation**: full name, jurisdiction, effective date, current version
3. **Determine applicability**: who it applies to, what triggers it, exemptions
4. **Extract requirements**: read the regulatory text and extract every specific obligation as a testable requirement
5. **Classify requirements**: mandatory vs conditional vs recommended
6. **Identify cross-references**: where this regulation references other regulations or standards
7. **Flag ambiguities**: requirements that could be interpreted multiple ways
8. **Save the requirements register** to `03-work/`

## Output

Save to `03-work/requirements-register-[regulation-slug].md` with the structured format defined in the regulation-analyst agent.

## Rules

- Quote exact regulatory text. Do not paraphrase obligations.
- Every requirement gets a unique ID (REQ-NNN) for traceability.
- Flag when your knowledge of this regulation may be outdated.
- The compliance officer determines applicability to their specific organization.

## Delegation

Delegate the detailed analysis to the **regulation-analyst** agent.
