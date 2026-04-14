---
name: analyze
description: Research constitutional provisions, precedents, and governance requirements for a governance task.
argument-hint: "[governance topic or question]"
---

# /analyze $ARGUMENTS

Research and analyze the governance topic **$ARGUMENTS** thoroughly.

## Protocol

1. **Find the active workspace** by checking `workspaces/` for the most recently modified project
2. **Read the project brief** if one exists in the workspace
3. **Identify relevant constitutional clauses** that apply to this governance topic
4. **Check entrenched provisions** for any constraints on the topic
5. **Research precedents** from previous governance decisions in the workspace journal
6. **Identify regulatory requirements** (Singapore CLG, ACRA) if applicable
7. **Document findings** in `01-research/`
8. **Create `specs/`** (MUST — before vet) — see `rules/specs-authority.md`. Create `specs/_index.md` plus one spec file per major governance domain area (e.g., `constitutional-basis.md`, `regulatory-applicability.md`, `entrenched-constraints.md`). Each spec file MUST be detailed enough to be the authority on its topic. For each requirement in the brief, confirm a corresponding spec section exists — missing mappings are BLOCKING.

## Output

Save a structured analysis to `01-research/analysis-[topic-slug].md`:

```markdown
# Governance Analysis: $ARGUMENTS
Date: [today]

## Constitutional Framework
[Which clauses apply. Whether any entrenched provisions are involved.]

## Key Findings
[What you discovered about the governance topic]

## Precedents
[Previous governance decisions that are relevant]

## Regulatory Requirements
[Singapore CLG or ACRA requirements, if applicable]

## Constraints and Considerations
[What limits apply. What standards must be met.]

## Recommendations
[What the governance officer should consider for the next phase]
```

## Next Step

After analysis, recommend `/plan` to create a structured governance action plan based on findings.
