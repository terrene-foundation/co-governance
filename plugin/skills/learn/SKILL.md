---
name: learn
description: Extract governance precedents and patterns into .claude/ artifacts. Requires officer approval.
---

# /co-governance:learn

Extract reusable governance knowledge from this task into CO artifacts (.claude/ directory).

## Workspace Resolution

1. If `$ARGUMENTS` specifies a project name, use `workspaces/$ARGUMENTS/`
2. Otherwise, use the most recently modified directory under `workspaces/` (excluding `_template/`)
3. If no workspace exists, ask the user to create one first

## Protocol

1. **Review the completed work** in `05-output/` and `journal/`
2. **Identify reusable patterns** -- constitutional interpretations, RFC structures, compliance check procedures, transparency reporting templates
3. **Propose artifact updates** -- suggest specific changes to rules, agents, or skills in `.claude/`
4. **Get officer approval** for each proposed artifact change before making it
5. **Apply approved changes** to `.claude/` files

## What to look for

- Constitutional interpretations that set precedent
- RFC patterns that worked well
- Compliance check procedures that should be standardized
- Transparency reporting formats that proved effective
- Governance process improvements discovered during this task

## Officer Approval Required

Every artifact change must be explicitly approved by the governance officer before applying. Present each proposed change with:

- What will change
- Why (what governance experience motivated it)
- The specific edit

## Journal Entry

Record what knowledge was extracted and what artifacts were updated in `journal/`:

- What governance precedents were codified
- What process improvements were captured
- What constitutional interpretations were documented
