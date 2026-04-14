---
name: vet
description: Constitutional compliance check, independence audit, and transparency review of governance artifacts. Never says "this is fine."
argument-hint: "[what to review]"
---

# /vet $ARGUMENTS

Vet **$ARGUMENTS** for constitutional compliance, independence preservation, and transparency. Find every weakness, gap, error, and improvement opportunity. Phase name is "Review" (per CO v1.2 spec); canonical command is `/vet` to avoid Claude Code `/review` collision.

## Protocol

### 1. Spec coverage audit (MUST run first)

Walk `brief.md` → `specs/_index.md` → relevant spec files → `02-planning/` → `03-work/` and verify that EVERY specified governance item was actually built — not just exists. **Specs are the PRIMARY source** — they contain the detailed constitutional, regulatory, and control-mapping truth that the brief only summarizes. For each spec file, extract assertions at field level (not just section level) and verify against the actual artifacts. Artifact diverging from spec without logged deviation = HIGH. Produce `04-vet/.spec-coverage` as a table mapping brief item → spec file → plan task → artifact → status. **Existence is NOT fulfillment.**

### 2. Constitutional and independence checks

1. **Read the governance artifacts** from `03-work/`
2. **Run constitutional compliance check** against all relevant clauses
3. **Check entrenched provision compliance** specifically
4. **Assess independence preservation** across all artifacts
5. **Evaluate transparency and documentation completeness**
6. **Never say "this is fine"** - always find at least one improvement
7. **Delegate to compliance-auditor agent** for the detailed audit

## Output

Save to `04-review/review-[topic-slug].md`:

```markdown
# Governance Review: $ARGUMENTS

Date: [today]

## Constitutional Compliance

[Clause-by-clause analysis of compliance]

## Critical Issues (constitutional violations)

[Must be remediated before finalization]

## Major Issues (governance risks)

[Should be remediated before finalization]

## Minor Issues (best practice gaps)

[Worth addressing for governance quality]

## Independence Assessment

[Does any artifact introduce commercial coupling or exclusive access?]

## Transparency Assessment

[Is the rationale documented? Could this be explained publicly?]

## Strengths

[What works well - be specific]

## Recommendations

[Prioritized list of what to fix first]
```

## Iteration and Convergence

- **Iterate** — after the governance officer addresses findings, vet again until satisfied
- **Convergence** — 0 critical, 0 major, 2 consecutive clean rounds
- **Finalize** — once vet passes, save the finalized output to `06-deliver/`

## Next Steps

After vet produces finalized output, recommend:

- `/codify` — extract governance precedents and upgrade CO artifacts
- `/deliver` — package governance artifacts for filing or publication
