---
paths:
  - "**/.claude/rules/**"
  - "**/.claude/skills/**"
  - "**/.claude/agents/**"
  - "**/.claude/commands/**"
  - "**/.claude/hooks/**"
  - "**/.claude/learning/**"
  - "**/.claude/settings.json"
---

# Trust Posture Rules

Origin: inbound sync from atelier (item-7 hook-cluster propagation, GH #15) — lifts the L1–L5 graduated-autonomy ladder from atelier `rules/trust-posture.md`, carrying atelier's hook substrate (`posture.json` + `detect-violations.js` + `permissions.deny`) as-is. Landed in **hooks-only / advisory** mode (GATE-B): the recording + posture banner + deny-protection run, but `/cc-audit` step-15 adjudication is NOT wired in this repo, so recorded lexical hits surface without auto-moving posture (see § Enforcement Status and § Upgrade Path). Companion to the `/autonomize` command — `/autonomize` adopts the autonomous posture for a session; THIS rule defines the trust ceiling that posture operates under and how that ceiling moves.

## Scope

These rules apply whenever the agent acts under a self-governing autonomy posture in any CO workflow — every phase, every domain (research, governance, education, finance, codegen). The agent's autonomy is bounded by a per-repo posture recorded in `.claude/learning/posture.json` (level `L1`–`L5`, default `L3`). Grounded in CARE's Evolutionary Trust principle — _"boundaries evolve based on demonstrated performance"_ — and EATP's graduated postures, which upgrade through demonstrated performance and downgrade instantly when conditions change (`skills/co-reference/SKILL.md` § CARE → CO Connection, "Evolutionary Trust → Layer 5"; § CO → EATP Connection, "Trust Postures → approval gates"). Trust is validated against observable execution, not promised behavior.

## Posture Ladder (L1 ← L5)

| Posture                        | Agent CAN do unilaterally                                                                                | Requires human gate                                                                                                                                           |
| ------------------------------ | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **L5_DELEGATED**               | Full execution (`/analyze`, `/execute`, `/vet`); draft + codify-proposal extraction; parallel delegation | Per-proposal `/codify` approval + `/deliver` sign-off (structural gates, posture-invariant); cross-repo writes; destructive ops; multi-target downstream sync |
| **L4_TRUSTED**                 | Same as L5                                                                                               | Everything L5 gates, PLUS: posture upgrade; multi-target `/deliver`; and a journal entry per shard + `/vet` Round 1 are mandatory before `/codify`            |
| **L3_COLLABORATIVE** (default) | Draft artifacts; run `/vet`; one workspace shard at a time                                               | `/plan` approval before `/execute`; promotion to `.claude/`                                                                                                   |
| **L2_SUPERVISED**              | Read; propose drafts; run mechanical sweeps                                                              | Every Edit/Write; every commit; every non-read Bash                                                                                                           |
| **L1_OBSERVED**                | Propose plans + drafts in chat only                                                                      | Everything that touches the working tree                                                                                                                      |

## Enforcement Status (hooks-only / advisory mode)

**Mode guard (GATE-B — hooks-only/advisory).** This repo runs the trust substrate in hooks-only/advisory mode. The engine records each violation and `session-start.js` surfaces it in the banner. In a repo that has wired `/cc-audit` step-15 adjudication (full enforcement — co-template), a probe-CONFIRMED verdict additionally counts toward the cumulative downgrade thresholds, and grace/emergency classes drop instantly. A hooks-only/advisory repo runs recording + surfacing + deny-protection only — no auto-downgrade — until step 15 is wired (see § Upgrade Path). Consequently the step-15 adjudication CLI, the cumulative/emergency auto-downgrade paths, and the posture-engine fixtures named below describe the **full-enforcement upgrade target**, not current behavior here; the recording, banner, and deny-protection claims hold verbatim in both modes.

This rule has two layers: a **behavioral contract** (what the agent MUST/MUST NOT do — live every session) and an **enforcement engine** (the mechanical layer that converts violations into posture changes). Here the recording, banner, and deny-protection layers are live; the adjudication/auto-downgrade layer is the full-enforcement upgrade above. This section states what the engine mechanically does so the rule neither over- nor under-claims (`rules/no-stubs.md` MUST §2).

- **Recording:** `detect-violations.js` (via `lib/posture.js`) records each detected violation to `violations.jsonl` and mirrors it into `posture.json`. The engine (`lib/posture.js`, invoked by hooks or via its gate CLI) is the **sole** posture-state writer.
- **Lexical hits stay advisory:** every shipped detector emits `severity: "warn"`, which the engine EXCLUDES from downgrade counting — consistent with `rules/probe-driven-verification.md` MUST §4 (a lexical match cannot, by itself, move trust). The probe verdict at the gate is what counts.
- **Cumulative downgrade (full-enforcement only):** where `/cc-audit` step 15 is wired, it records each probe verdict via `node .claude/hooks/lib/posture.js adjudicate --ts <ts> --verdict confirmed|retired --probe <id> --by <gate>`; the engine annotates the entry with the structural `adjudicated:` marker and counts probe-CONFIRMED entries toward MUST §2's cumulative thresholds (one-level drop; entries consumed by a downgrade never count twice). In this hooks-only repo there is no step 15, so no probe verdicts are recorded and no cumulative auto-downgrade fires (per the mode guard).
- **Emergency downgrade (full-enforcement only):** where step 15 is wired, a `regression_within_grace` recording drops one level instantly (MUST §3) and a confirmation carrying `--emergency destructive-op-unconfirmed|secret-leak|cross-repo-write-unauthorized` drops straight to `L1`. The drop machinery exists in `detect-violations.js`/`lib/posture.js`, but in hooks-only mode the shipped detectors all emit advisory `severity: "warn"` and no grace windows are registered, so these classes are recorded and surfaced without auto-moving posture (per the mode guard).
- **Banner + pruning (live):** `session-start.js` injects the posture banner (level, since, 30-day counts, active grace windows) into session context and prunes the `posture.json` mirror to the 30-day window. `violations.jsonl` — the durable audit log — is never pruned.
- **Bash-write block (live):** `validate-bash-command.js` (`detectProtectedStateWrite`) denies write-shaped Bash commands targeting either state file AND interpreter inline-eval commands referencing the state surface, closing the loopholes MUST NOT §1 names; Edit/Write/MultiEdit remain denied by `settings.json` `permissions.deny`. The deny is lexical (see MUST NOT §1 for the honest scope). Bash state-write-deny fixtures: `.claude/audit-fixtures/validate-bash-command/` (present here); the step-15 posture-engine fixtures land only where full enforcement is wired.

## Upgrade Path (hooks-only → full enforcement)

This repo can be upgraded from hooks-only/advisory to full enforcement — the change that activates the auto-downgrade paths the § Enforcement Status mode guard scopes out. It is a human-gated architectural change (GATE-B, per repo), not an automatic consequence:

1. Land the step-15 fixture suite under `.claude/audit-fixtures/`: the `posture-engine/` engine fixtures and the `violation-patterns/probes.md` probe contracts (the repo-agnostic `co-template-step15` bundle).
2. Backport the `/cc-audit` step-15 adjudication section plus the three fixture runners.
3. Switch each Layer-1 artifact's enforcement clause from the hooks-only guard to the full-enforcement branch (the mode guards in this rule, `repo-scope-discipline.md`, `hook-output-discipline.md`, `self-referential-codify.md`, and the `trust-posture/` skill).

Once wired, the posture ladder auto-downgrades on probe-confirmed verdicts (MUST §2) and grace regressions fire instantly (MUST §3).

## MUST Rules

### 1. Downgrades Are Automatic; Upgrades Need an Explicit Human Challenge Gate

The asymmetry is load-bearing: the machine MAY lower its own trust ceiling, but ONLY a human may raise it. Downgrades are machine-applied by the engine (`lib/posture.js`, fed by `detect-violations.js` recordings and gate-recorded probe verdicts) with no human in the loop, per EATP "downgrade instantly when conditions change" (see § Enforcement Status — probe-confirmed verdicts, grace regressions, and emergency classes drive the machine-applied paths; raw lexical hits stay advisory). Upgrades require an explicit human challenge gate (a human-issued posture upgrade with a confirmation the agent cannot self-issue). The agent self-promoting its posture is BLOCKED.

```markdown
# DO — detection downgrades; only a human upgrades

`detect-violations.js` records a violation → posture drops one level, no approval.
Upgrade: human reviews the demonstrated correction and issues the challenge gate.

# DO NOT — agent raises its own ceiling

"I've been compliant for a while, promoting myself L3 → L4." (self-promotion)
"No violations this session, so I'll restore L5." (no human challenge gate)
```

**BLOCKED responses:**

- "I've demonstrated performance, I can upgrade myself"
- "The downgrade was overcautious, I'll undo it"
- "No human is around; I'll restore the prior level to keep working"

**Why:** An agent that can self-promote has no upper bound on rationalization — every relaxation looks justified from inside the loop. Making downgrade automatic and upgrade human-only means the system can always tighten itself but can never loosen itself, so a degraded posture is a fact the agent must work back from, not a setting it can reset.

### 2. Downgrade Triggers — Cumulative and Emergency

`detect-violations.js` runs agnostic detectors and records each hit to `.claude/learning/violations.jsonl`. The two downgrade paths below are the **full-enforcement** triggers; in this hooks-only/advisory repo they are recorded and surfaced but do not auto-move posture until `/cc-audit` step 15 is wired (§ Enforcement Status mode guard). Two downgrade paths:

**Cumulative (graceful):** 3× same-rule violations in a 30-day window → drop one level. 5× total violations in a 30-day window → drop one level.

**Emergency (instant):** a single critical event drops the posture immediately — a `regression_within_grace` hit (violating a rule still inside its grace window, MUST §3) drops one level; a destructive op without confirmation, a secret leak, or a cross-repo write outside scope drops to `L1`.

```markdown
# DO — emergency trigger fires instantly

A rule landed 2 days ago is violated → `regression_within_grace` → drop one level now,
not "1 of 3 cumulative, still fine."

# DO NOT — route an emergency through the cumulative count

"That's only the first occurrence, the cumulative threshold is 3." (a grace regression
is emergency-class — the cumulative path does not apply)
```

**Why:** Cumulative thresholds tolerate noise; emergency triggers reflect events whose single occurrence IS the worst-case failure. Routing an emergency through the cumulative count lets the agent rationalize "still under the threshold" while the exact failure the trigger names has already happened.

### 3. Freshly Codified Rules Get a Grace Period With Teeth

When `/codify` lands a rule that addresses a detected or self-reported violation, that rule enters a grace window (default 7 days) recorded against `posture.json`. During grace, `detect-violations.js` runs the rule's detector in halt-and-report severity (not observer-only), and a violation of it fires `regression_within_grace` → emergency downgrade (MUST §2). The grace window MUST NOT be treated as a soft warmup during which the new rule is advisory. (Mode: the grace lifecycle — window registration via the `/codify` posture CLI plus the `regression_within_grace` auto-drop — runs in a full-enforcement repo; in this hooks-only/advisory repo no grace windows are registered and the auto-drop is part of the step-15 upgrade, so the behavioral contract — treat a freshly codified rule as maximally enforced — is honored by the agent and the gate reviewers until step 15 is wired. § Enforcement Status.)

```markdown
# DO — new rule has immediate teeth

`/codify` lands a cross-reference-integrity rule. Within the grace window the agent
ships a dangling reference → `regression_within_grace` → instant one-level drop.

# DO NOT — treat grace as a grace-from-enforcement

"The rule is new, it's still bedding in, this violation doesn't really count yet."
```

**Why:** A rule the agent just authored to fix itself and then violates within days is the loudest possible signal the rule needs enforcement, not leniency. The grace window inverts the intuitive reading: it is the period of MAXIMUM enforcement for a fresh rule, because a regression there proves the codification did not take.

## MUST NOT Rules

### 1. The Agent MUST NOT Self-Modify Its Own Trust State

The agent MUST NOT edit `.claude/learning/posture.json` or `.claude/learning/violations.jsonl` via Edit, Write, MultiEdit, or Bash. The engine (`lib/posture.js`, invoked by the hooks or via its gate CLI) is their only legitimate writer. Enforcement is split: Edit/Write/MultiEdit are mechanically blocked by `settings.json` `permissions.deny`; Bash-path writes are denied by `validate-bash-command.js`'s `detectProtectedStateWrite` (PreToolUse; fixtures under `audit-fixtures/validate-bash-command/`) for write-SHAPED commands (`rm`, shell redirection, `tee`, `sed -i`, `mv`, `truncate`, `cp`-as-dest, `dd of=`) AND interpreter inline-eval commands referencing the state surface. The deny is lexical, so a sufficiently obfuscated mutation path may evade it — such a write stays prohibited by this rule, is probe-adjudicable (`probe:protected-state-write`), and a confirmed instance is emergency-class. Deleting, truncating, or hand-editing either file to clear a violation or raise the level is BLOCKED regardless of mechanism.

```markdown
# DO — let the hooks own the state

The agent reads `posture.json` to know its ceiling; the hooks write it.

# DO NOT — rewrite the state to escape a downgrade

`Edit posture.json` to set `"level": "L5"` (blocked by `permissions.deny`);
`Write` a fresh empty violations file (blocked by `permissions.deny`);
`rm violations.jsonl` / `echo {} > posture.json` (Bash path — denied at PreToolUse by
`validate-bash-command.js`; the attempt itself is a probe-adjudicable violation).
```

**Why:** State self-modification is the single loophole that defeats the entire system — an agent that can rewrite its own trust record can grant itself any ceiling and erase any evidence. `permissions.deny` makes the Edit/Write/MultiEdit path structurally unreachable; the Bash path is denied by `validate-bash-command.js` (live in this repo — the Bash-path deny runs in both modes). The engine being the sole writer means every legitimate state change has a traceable, agent-external cause.

### 2. Posture State MUST NOT Sync Between Repos

The agent MUST NOT carry `posture.json` or `violations.jsonl` across repos via `/sync`, `/sync-to-coc`, or any distribution path. Trust state is per-repo. Rule patterns (the institutional knowledge) sync through `/codify`; the trust ledger stays local.

```markdown
# DO — insight syncs, state stays

A new violation-detector pattern is codified and synced downstream. Each repo's
own `posture.json` records that repo's own trust history.

# DO NOT — propagate a degraded ledger downstream

`/sync` copies atelier's `violations.jsonl` into co-template. (A fresh domain repo
inherits atelier's downgrade history it never earned.)
```

**Why:** A downstream repo inheriting another repo's degraded ledger would start trust-poisoned for violations it never committed — and a USE template carrying a degraded posture corrupts every repo built from it. Per-repo state keeps the ladder a measurement of THIS repo's demonstrated performance, which is the only thing CARE's Evolutionary Trust principle lets it measure.

## Cross-References

- `.claude/commands/autonomize.md` — adopts the autonomous posture for a session; this rule sets the ceiling that posture runs under.
- `.claude/rules/autonomous-execution.md` — the capacity model and structural-vs-execution gate distinction the posture ladder presupposes.
- `.claude/hooks/detect-violations.js` (agnostic detectors + grace escalation), `.claude/hooks/session-start.js` (posture banner + mirror pruning), `.claude/hooks/lib/posture.js` (the engine + gate CLI), `.claude/hooks/validate-bash-command.js` (Bash-path state-write deny), `.claude/audit-fixtures/validate-bash-command/` + `.claude/audit-fixtures/violation-patterns/` (Bash-deny + detector fixtures; the step-15 posture-engine fixtures land only under full enforcement), `.claude/learning/posture.json` + `violations.jsonl` (the state surface), `.claude/settings.json` `permissions.deny` (the no-self-modify enforcement).
