---
name: cc-audit
description: "Audit CC artifacts for quality, completeness, effectiveness, and token efficiency"
---

# CC Artifact Audit

## What This Does

Systematically reviews all Claude Code artifacts (agents, skills, rules, commands, hooks) for quality across four dimensions: competency, completeness, effectiveness, and token efficiency.

## Your Role

Specify scope: audit everything, or target a specific artifact type or file.

## Workflow

1. **Scope determination**: If no scope specified, audit all artifact types. Otherwise focus on the requested scope.

2. **Inventory**: List all artifacts in scope with file paths and line counts.

3. **Audit each artifact** using the claude-code-architect agent's four-dimension framework:
   - **Competency**: Does it know what it claims? Are instructions precise?
   - **Completeness**: Are there gaps? Edge cases? Missing handoffs?
   - **Effectiveness**: Does it produce reliable behavior? Is the output format specified?
   - **Token Efficiency**: Is it lean? Path-scoped? No redundancy?

4. **Cross-reference check**: Verify all referenced artifacts exist. Flag orphans and broken links.

5. **Token budget analysis**: Calculate baseline per-turn token cost (CLAUDE.md + global rules + agent descriptions).

6. **Trust-posture adjudication (step 15)**: for each `.claude/learning/violations.jsonl` entry WITHOUT an `adjudicated:` field (the mechanical filter — the enforcement engine writes that marker), run the matching probe contract in `.claude/audit-fixtures/violation-patterns/probes.md` (question + schema + deterministic scoring, per `rules/probe-driven-verification.md` MUST §2) via the `test-harness-probe` protocol (`skills/test-harness-probe/`). The probe verdict — never the lexical hit — is the authoritative finding (`rules/hook-output-discipline.md` MUST §2 / `rules/probe-driven-verification.md` MUST §4). Record every verdict (confirmed or retired) in the report, a workspace journal entry keyed to the entry's timestamp, AND via the engine CLI:

   ```
   node .claude/hooks/lib/posture.js adjudicate --ts <ts> --verdict confirmed|retired \
        --probe <probe-id> --by cc-audit-step15        # (+ --emergency <class> for emergency-class confirms)
   ```

   The agent NEVER edits the state files directly (`rules/trust-posture.md` MUST NOT §1 — the engine is the sole writer; it applies any cumulative-threshold or emergency downgrade). The three trust-substrate fixture runners MUST all pass before convergence:

   ```
   node .claude/audit-fixtures/violation-patterns/run-fixtures.js
   node .claude/audit-fixtures/validate-bash-command/run-fixtures.js
   node .claude/audit-fixtures/posture-engine/run-fixtures.js
   ```

7. **Report**: Produce findings sorted by severity (CRITICAL → HIGH → NOTE) with specific fix recommendations.

## Composition Precedence

The mechanical checks (cross-reference verification in step 4, line counts and limit checks in step 2) and the four-dimension judgment (step 3) are NOT a flat list of equal findings — they **compose** into one verdict with a fixed precedence. Two signal classes are **load-bearing**; LLM judgment **corroborates**.

- **Structural signal (load-bearing)**: any mechanical-check RED — a cross-reference that does not resolve, an over-limit line/char count, an empty or invalid frontmatter field. Each is CRITICAL **regardless of LLM-dimension judgment**.
- **Adversarial signal (load-bearing)**: if an effectiveness A/B is run (the same task once with the artifact in context and once with it stripped), a failed A/B on an in-scope artifact is CRITICAL **regardless of LLM-dimension judgment**. See `rules/probe-driven-verification.md`.
- **LLM judgment (corroborating)**: surfaced at reviewer-judged NOTE/HIGH. Additive on top of the load-bearing signals — it catches what they miss, but it is NEVER auto-cleared and NEVER used to override them.

```markdown
# DO — structural signal wins:

The cross-reference check flags a dangling reference in agent X.
LLM read of X: "reads clean, well-scoped, no issues."
→ Verdict: CRITICAL (the dangling ref). The LLM read is recorded as
corroboration, not as a clearance.

# DO NOT — LLM judgment overriding a structural red:

An invalid-frontmatter hit on rule Y is downgraded to NOTE because
"the rule is obviously fine on reading and the key is harmless."
→ A structural RED is CRITICAL. An LLM "looks fine" can NEVER clear it.
```

**Why**: Mechanical checks exist to catch silent failures — the class of defect an LLM read misses by construction (a key the runtime parses as no-frontmatter still "reads fine"). If a confident LLM judgment could downgrade a structural RED, the audit's deterministic backbone becomes advisory and the silent-failure class reopens. Precedence is one-directional: structure and adversarial proof gate the verdict; judgment enriches it.

## Agent Teams

| Function                     | Agent                    |
| ---------------------------- | ------------------------ |
| Audit execution              | claude-code-architect    |
| Standards compliance         | gold-standards-validator |
| Cross-reference verification | quality-reviewer         |

## Completion Evidence

- Audit report with dimension scores for each artifact
- Token budget summary
- Prioritized fix list with CRITICAL/HIGH/NOTE severity
