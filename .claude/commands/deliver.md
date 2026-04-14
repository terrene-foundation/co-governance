---
name: deliver
description: Package governance artifacts for filing or publication.
argument-hint: "[project name]"
---

# /deliver

Package the finalized governance output for filing or publication.

## Workspace Resolution

1. If `$ARGUMENTS` specifies a project name, use `workspaces/$ARGUMENTS/`
2. Otherwise, use the most recently modified directory under `workspaces/` (excluding `_template/`)

## Protocol

1. **Confirm review is complete** — check that 04-review/ has review findings and critical issues are resolved
2. **Package the output** — ensure 05-output/ contains the finalized governance artifacts
3. **Run final validation** against constitutional compliance rules
4. **Pre-delivery checklist**:
   - [ ] All critical review issues resolved
   - [ ] Constitutional compliance verified for all governance actions
   - [ ] Independence checks passed
   - [ ] Transparency requirements met (rationale documented, auditable)
   - [ ] Governance officer has approved the final version
5. **Deliver** — file with ACRA, publish to repository, or distribute to members as appropriate

## Approval Gate

**HARD GATE**: Governance officer approves before artifacts are filed or published. Ask:

- Does this cover everything required for this governance action?
- Is anything here that doesn't belong?
- Is anything missing?
- Is the documentation sufficient for public transparency?

## Journal Entry

Record what was delivered and the filing/publication target in `journal/`. Type: DECISION.
