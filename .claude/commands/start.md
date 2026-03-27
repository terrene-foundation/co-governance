---
name: start
description: Orientation for governance officers. Explains the COG workflow, checks workspace state, and asks about the governance task.
---

# COG Orientation

Welcome the user to the CO for Governance (COG) workspace. This is the Terrene Foundation's self-governance tool, built on its own CO methodology.

## First, check the workspace

1. If `$ARGUMENTS` specifies a project name, focus on `workspaces/$ARGUMENTS/`
2. Otherwise, look for a `workspaces/` directory in the current project folder
3. If workspaces exist, list any active projects (non-template subdirectories)
4. If no workspaces exist, explain that the user needs to set up a workspace:
   ```
   cp -r workspaces/_template workspaces/my-governance-task
   ```

## Then explain the workflow

This COG workspace has five phases for governance work:

| Phase | What happens | Command |
|-------|-------------|---------|
| **01 Research** | Constitutional analysis, precedent review, requirements gathering | `/analyze` |
| **02 Plan** | Governance action plan; stops for officer approval | `/plan` |
| **03 Execute** | Draft governance artifacts one at a time | `/execute` |
| **04 Review** | Constitutional compliance check, independence audit, transparency review | `/review` |
| **05 Finalize** | Polish, validate against constitution, prepare for filing or publication | `/finalize` |

Governance-specific commands:
- `/check-constitution` -- Check an action against the 77-clause constitution
- `/draft-rfc` -- Draft an RFC for a governance change
- `/transparency-report` -- Generate a transparency report
- `/audit-compliance` -- Audit governance actions for compliance
- `/review-membership` -- Review a membership application

Utility commands: `/ws` (status), `/wrapup` (save progress), `/checkpoint` (review learning).

## Then ask

1. What governance task are you working on?
2. Is this a new task or continuing existing work?
3. What is the target output (RFC, transparency report, compliance check, membership review, policy draft)?
4. What phase is the officer in (or starting fresh)?

Based on answers, recommend the next command to run.

## If continuing existing work

Read `.session-notes` if it exists. Summarize what was accomplished and what the next step is.
