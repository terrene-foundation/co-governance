---
name: deliver
description: Package governance artifacts for filing, publication, or formal adoption.
---

# /co-governance:deliver

Package the finalized governance artifacts from `05-output/` and prepare them for filing, publication, or formal adoption.

## Workspace Resolution

1. If `$ARGUMENTS` specifies a project name, use `workspaces/$ARGUMENTS/`
2. Otherwise, use the most recently modified directory under `workspaces/` (excluding `_template/`)
3. If no workspace exists, ask the user to create one first

## Protocol

1. **Verify finalized output exists** in `05-output/`
2. **Confirm the filing or publication target** -- ACRA, Foundation website, GitHub, internal records?
3. **Package the deliverable** -- format for the target, include constitutional basis and rationale
4. **Pre-filing checklist**:
   - [ ] Constitutional compliance confirmed (Phase 04)
   - [ ] All review issues resolved
   - [ ] Constitutional basis stated explicitly
   - [ ] Rationale documented for every governance decision
   - [ ] Suitable for public disclosure
   - [ ] Governance officer has approved
   - [ ] Filing or publication requirements met (ACRA, website, GitHub)
5. **Prepare filing package** as appropriate

## Output

The filing-ready package plus a summary of what was filed, where, and any follow-up actions (e.g., ACRA confirmation, website publication date).

## Journal Entry

Record the delivery in `journal/` -- what was filed/published, where, and any outstanding follow-up.
