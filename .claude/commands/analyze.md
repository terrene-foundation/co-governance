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

## Brief-Claim Verification (when the brief carries ≥3 discrete claims)

`/analyze` is where parallel brief-claim verification runs. When the brief or its source material carries **≥3 discrete claims** (counts, clause numbers, file paths, named artifacts, root-cause or "X currently does Y" assertions), apply `rules/delegation-orchestration.md` MUST §2 ("Parallel Brief-Claim Verification") — the canonical requirement, examples, and BLOCKED list: launch parallel verification agents, one per claim cluster, each independently re-reading every cited source. Workspace step unique to `/analyze`: record each verdict (TRUE / FALSE / UNCLEAR + citation) in `01-research/`, then reconcile corrections into the analysis BEFORE `/plan`, so `/plan` sizes against verified reality. Single-agent analysis on a ≥3-claim brief is BLOCKED.

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
