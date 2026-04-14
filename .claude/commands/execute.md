---
name: execute
description: Draft governance artifacts one task at a time from the approved plan.
---

# /execute

Work through the approved governance action plan from `02-planning/plan.md`, one task at a time.

## Workspace Resolution

1. If `$ARGUMENTS` specifies a project name, use `workspaces/$ARGUMENTS/`
2. Otherwise, use the most recently modified directory under `workspaces/` (excluding `_template/`)
3. If no workspace exists, ask the user to create one first

## Protocol

1. **Read the plan** from `02-planning/plan.md`
2. **Find the next incomplete task**
3. **Context anchor**: read `specs/_index.md`, identify which spec files cover this task's domain, read them. The spec is the authority on what to build. Per `rules/specs-authority.md` MUST §4.
4. **Run a constitutional compliance pre-check** on the task output
5. **Execute the task**, producing the specified governance artifact
6. **Save output** to `03-work/`
7. **Check spec currency**: if this task changed domain truth (constitutional interpretation, regulatory applicability, control mapping), update the relevant spec file immediately per `rules/specs-authority.md` MUST §5. If execution deviates from spec, STOP: update spec with deviation and rationale, flag user-visible changes for officer approval.
8. **Mark the task complete** in the plan
9. **Report what was done** and what the next task is

## Rules

- One task at a time. Do not batch.
- Each task produces a tangible governance artifact saved to the workspace.
- Every governance artifact must include the constitutional basis.
- If a task requires a governance decision the officer has not made, ASK. Do not decide for them.
- If a task involves constitutional interpretation, present the interpretive question to the officer.
- If a task cannot be completed, explain why and what is needed.

## Next Step

When all tasks are complete, recommend `/review` for constitutional compliance checking and quality review.
