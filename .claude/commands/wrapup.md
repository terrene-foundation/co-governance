---
name: wrapup
description: Save session notes before ending. Captures context for the next session.
---

# Session Wrapup

## Workspace Resolution

1. If `$ARGUMENTS` specifies a project name, use `workspaces/$ARGUMENTS/`
2. Otherwise, use the most recently modified directory under `workspaces/` (excluding `_template/`)
3. If no workspace exists, ask the user to create one first

## Journal Check

Before writing session notes, review the session's work and create journal entries for any un-journaled decisions, discoveries, or risks:
- Were any significant decisions made without DECISION entries?
- Were any technical findings discovered without DISCOVERY entries?
- Were any risks identified without RISK entries?

Create entries for anything missing, then proceed to write session notes.

## Protocol

Write a `.session-notes` file in the workspace root capturing:

1. What was accomplished this session
2. What decisions were made
3. What the next steps are
4. Any unresolved questions or blockers
5. The Outstanding Ledger, reconciled (below)

This file will be read by `/start` in the next session to restore context.

## Outstanding Ledger — the Forest (cumulative)

Items 1–4 describe THIS session. The ledger is the running forest: every open forest-level workstream or blocked-item, NOT itemized todos (those live in `todos/active/`). It is carried forward verbatim each session so the next session inherits its bearings instead of re-deriving them from memory. Each row carries a short single-token (whitespace-free), UNIQUE, STABLE **ID** (`F1`, `F2`, … — never reused, never renamed) plus a **value-anchor**: why the item matters, citing a user-anchored source (the project brief, a `journal/` DECISION entry, or a literal user quote).

```markdown
### Outstanding Ledger (forest)

| ID  | Item         | Value-anchor (user-anchored source)                  | Status                            |
| --- | ------------ | ----------------------------------------------------- | --------------------------------- |
| F1  | <workstream> | <why it matters — brief / journal DECISION / quote>   | BLOCKED on X / queued / in-flight |

Closed this session: `F2` → receipt `<PR #N / commit SHA / journal NNNN>`.
```

If the forest is empty, write the sentinel explicitly: "Forest empty — every item closed or externally blocked." NEVER omit this section. An absent ledger is indistinguishable from a forgotten one; absence is not done.

**Why**: A one-shot snapshot forces the next session to re-derive its bearings from memory, where a closed item can resurface or an open one vanish with no trace. The ID — not the prose name — is what carries an item across sessions: rewording never false-trips it and two items can never collide. The value-anchor stops the ledger from drifting into self-referential busywork by binding every row to something the user actually asked for.

## Ledger Reconciliation (every wrapup)

Reconcile the ledger against the prior `.session-notes` on every wrapup:

1. **Carry forward** every prior row whose work is not yet delivered, KEEPING ITS ID UNCHANGED. The item text MAY be reworded; the ID MUST NOT. A prior open ID silently disappearing is BLOCKED — that is the stale-snapshot trap.
2. **Close with receipt** — for each item delivered this session, move it to the "Closed this session" line, referenced BY ITS ID, WITH a durable receipt (PR number, commit SHA, or journal entry NNNN). No ID or no receipt → it is NOT closed; carry it forward.
3. **Grow** — add any new forest-level workstream or blocked-item with a FRESH UNIQUE ID and a value-anchor citing a user-anchored source (per `rules/value-prioritization.md` MUST §2). No value-anchor → request it from the user; do NOT invent one.
4. **Empty forest** still writes the sentinel. The sentinel and open rows are mutually exclusive — asserting "Forest empty" with rows present is a defect.

**Why**: Reconciliation is what converts a per-session note into a durable forest record. Closing only by ID-with-receipt makes "done" auditable rather than asserted, and the no-silent-vanish rule guarantees a workstream cannot be lost simply because a session forgot to mention it. The ledger is forest-level only (workstreams and blocked-items, typically 2–6 rows) — itemizing individual todos here is BLOCKED; those belong in `todos/active/`.
