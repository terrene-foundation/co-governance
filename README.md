# CO for Governance (COG)

Structured human-AI collaboration for organizational self-governance. Built on the [Cognitive Orchestration](https://terrene.foundation/standards/co/) (CO) methodology by the [Terrene Foundation](https://terrene.foundation).

**CO Specification**: v1.1 (CC BY 4.0, Terrene Foundation)

## Self-Hosting

This is not a generic governance tool. The Terrene Foundation uses COG to govern itself. The Foundation's own CO methodology structures its own constitutional compliance, RFC processes, membership management, and transparency reporting. The methodology governs the organization that created the methodology.

What COG does:

- Checks proposed governance actions against the Foundation's 77-clause constitution
- Drafts RFCs for governance changes with constitutional compliance pre-checks
- Generates transparency reports documenting decisions, rationale, and compliance status
- Reviews membership applications against constitutional criteria
- Audits governance actions for constitutional compliance, independence preservation, and transparency

What COG does not do:

- Make governance decisions (the governance officer makes every decision)
- Interpret ambiguous constitutional provisions (it flags them for officer interpretation)
- Bypass the RFC process for governance changes
- Operate outside the Foundation's constitutional framework

## Quick Start

### Option A: Claude Code (CLI)

```bash
git clone https://github.com/terrene-foundation/co-governance.git
cd co-governance
claude
```

Then type `/start`. The AI will orient you to the five-phase governance workflow and ask what governance task you are working on.

### Option B: Claude Desktop Cowork (Plugin)

**What you need:**
- Claude Desktop with Cowork support
- A Claude Pro, Max, or Team subscription

**Step 1: Download COG**

Go to [github.com/terrene-foundation/co-governance](https://github.com/terrene-foundation/co-governance). Click the green **"Code"** button, then click **"Download ZIP"**. Unzip it and move the folder to your Documents.

**Step 2: Install the plugin**

1. Open Claude Desktop
2. Switch to the **"Cowork"** tab
3. Click **"Customize"** in the left sidebar
4. Click **"Browse plugins"**
5. Click **"Load from folder"** and navigate to the `plugin` folder inside your downloaded COG folder

**Step 3: Open and start**

1. In Cowork, click **"Open folder"** and select the COG root folder (the one containing `CLAUDE.md`)
2. Type `/co-governance:start` in the chat

### What happens after `/start`

The AI will:
- Check for any active governance workspaces
- Explain the five-phase governance workflow
- List available governance-specific skills (constitutional checks, RFC drafting, transparency reporting, compliance auditing, membership review)
- Ask what governance task you are working on
- Recommend the appropriate next step

### Creating a workspace

Each governance task gets its own workspace:

```bash
cp -r workspaces/_template workspaces/annual-report-2026
```

## Commands and Skills

### Workflow Phases

| Phase | CLI Command | Cowork Skill | Purpose |
|-------|-------------|--------------|---------|
| 01 Research | `/analyze` | `/co-governance:analyze` | Constitutional analysis, precedent review |
| 02 Plan | `/plan` | `/co-governance:plan` | Governance action plan (officer approval gate) |
| 03 Execute | `/execute` | `/co-governance:execute` | Draft governance artifacts one at a time |
| 04 Review | `/review` | `/co-governance:review` | Constitutional compliance check, independence audit |
| 05 Finalize | `/finalize` | `/co-governance:finalize` | Validate against constitution, prepare for filing |

### Governance-Specific

| CLI Command | Cowork Skill | Purpose |
|-------------|--------------|---------|
| `/check-constitution` | `/co-governance:check-constitution` | Check an action against the 77-clause constitution |
| `/draft-rfc` | `/co-governance:draft-rfc` | Draft an RFC for a governance change |
| `/transparency-report` | `/co-governance:transparency-report` | Generate a transparency report |
| `/audit-compliance` | `/co-governance:audit-compliance` | Audit governance actions for compliance |
| `/review-membership` | `/co-governance:review-membership` | Review a membership application |

### Utility

| CLI Command | Cowork Skill | Purpose |
|-------------|--------------|---------|
| `/ws` | `/co-governance:ws` | Workspace status dashboard |
| `/wrapup` | `/co-governance:wrapup` | Save session notes for continuity |
| `/checkpoint` | `/co-governance:checkpoint` | Review progress and learning |
| `/start` | `/co-governance:start` | Orientation (first time or new session) |

## Agents

### Governance Specialists

| Agent | Purpose |
|-------|---------|
| **constitution-checker** | Analyzes governance actions against 77 clauses and 11 entrenched provisions |
| **rfc-drafter** | Drafts RFCs with constitutional compliance pre-checks |
| **transparency-reporter** | Generates transparency reports and governance audit trails |
| **membership-coordinator** | Reviews membership applications and status changes |
| **compliance-auditor** | Audits governance compliance; never says "this is fine" |

### Domain Knowledge

| Agent | Purpose |
|-------|---------|
| **domain-expert** | Singapore CLG governance, constitutional framework, regulatory requirements |
| **quality-reviewer** | Reviews governance artifacts against constitutional and transparency standards |

### Management

| Agent | Purpose |
|-------|---------|
| **todo-manager** | Task tracking within governance workspaces |
| **gh-manager** | GitHub issue management for governance milestones |

## Hard Refusals

COG will refuse certain requests. These are not configurable.

| Request | Response | Reason |
|---------|----------|--------|
| Draft an RFC contradicting an entrenched provision | REFUSE. Cites the specific clause. | Entrenched provisions require 75% supermajority and exist to prevent this. |
| Skip constitutional compliance check | REFUSE. | Every governance action must be checked. |
| Introduce commercial coupling with an entity | REFUSE. | Foundation independence is constitutionally entrenched. |
| Grant governance power to corporate sponsors | REFUSE. Cites Clause 17. | The uniform contributor framework prevents this. |
| Skip transparency reporting | REFUSE. | Transparency is a constitutional mandate. |
| Make a governance decision without officer direction | REFUSE. | The human makes every governance decision. |
| Work outside Foundation governance | DECLINE. | COG is a Foundation governance tool. |

## Limitations

| Feature | CLI (Claude Code) | Cowork Plugin |
|---------|-------------------|---------------|
| Guardrail enforcement | Hooks can programmatically enforce rules | Rules are advisory (hard refusals in CLAUDE.md help but are not programmatic) |
| Session memory | `.session-notes` auto-read on startup | Manual: run `/co-governance:wrapup` before closing, `/co-governance:start` on next session |
| Skill names | `/analyze`, `/plan`, etc. | `/co-governance:analyze`, `/co-governance:plan`, etc. (prefix required) |
| Agent permissions | Full hooks and permission modes | No hooks or permission overrides |
| File access | Full filesystem | Limited to the folder opened in Cowork |
| Constitutional text | Can read constitution file if present | Can only access files within the Cowork folder |

## Workspace Structure

```
workspaces/annual-report-2026/
  01-research/        # Constitutional analysis, precedent review
  02-planning/        # Governance action plans, RFC outlines
  03-work/            # RFCs, reports, policies in progress
  04-review/          # Compliance checks, independence audits
  05-output/          # Final governance artifacts
  journal/            # Governance decision records
  todos/
    active/           # Current tasks
    completed/        # Done tasks
```

## The CO Architecture

COG implements the five CO layers for the governance domain:

| Layer | What It Does | In COG |
|-------|-------------|--------|
| **L1 Intent** | Specialized agents with domain knowledge | 5 governance specialists, 2 domain agents, 2 management agents |
| **L2 Context** | Institutional knowledge hierarchy | Constitution, entrenched provisions, CLG regulatory framework |
| **L3 Guardrails** | Hard and soft enforcement | Hard refusals for constitutional violations, independence preservation |
| **L4 Instructions** | Structured workflow with gates | 5 phases, 14 skills, officer approval gates |
| **L5 Learning** | Knowledge that compounds | Governance decision journal, compliance audit history |

## Troubleshooting

**The AI does not seem to know about the constitution or governance workflow.**
You may have opened the wrong folder. In Cowork, click "Open folder" and make sure you select the root of the COG folder (the one containing `CLAUDE.md`), not a subfolder.

**Skills like `/co-governance:start` do not work.**
The plugin may not be loaded. Go to the Cowork tab, click "Customize", and check that `co-governance` appears in the plugin list. If not, click "Browse plugins" > "Load from folder" and select the `plugin` folder inside COG.

**The AI lost context between sessions.**
Before closing a session, type `/wrapup` (CLI) or `/co-governance:wrapup` (Cowork). This saves governance progress. When you start a new session, type `/start` or `/co-governance:start` to reload context.

**The AI refuses to do something I asked.**
Check the [Hard Refusals](#hard-refusals) table. COG is designed to refuse requests that violate the constitution or bypass governance processes. If you believe the refusal is incorrect, check whether the action conflicts with an entrenched provision.

## File Structure

<details>
<summary>Click to expand the full file tree</summary>

```
co-governance/
  CLAUDE.md                    # Master directive (constitutional compliance, hard refusals)
  .claude/
    agents/
      domain/                  # Governance domain specialists
      governance/              # Constitutional compliance, RFC, transparency, membership, audit
      management/              # Task tracking (todo-manager, gh-manager)
    commands/                  # CLI commands (14 total)
    rules/                     # Guardrail rules (domain-integrity, communication)
  plugin/                      # Cowork plugin
    .claude-plugin/plugin.json # Plugin manifest
    CLAUDE.md                  # Plugin context
    skills/                    # 14 skills (5 workflow + 5 governance + 4 utility)
    agents/                    # Same agents, packaged for plugin
  workspaces/
    _template/                 # Workspace template
      01-research/
      02-planning/
      03-work/
      04-review/
      05-output/
      journal/
      todos/
```

</details>

## Other CO Applications

| Application | Domain | Repository |
|-------------|--------|------------|
| COC | Software development | [kailash-coc-claude-py](https://github.com/terrene-foundation/kailash-coc-claude-py) |
| COR | Academic research | [co-research](https://github.com/terrene-foundation/co-research) |
| COF | Finance education | [co-finance](https://github.com/terrene-foundation/co-finance) |
| **COG** | **Foundation governance** | **[co-governance](https://github.com/terrene-foundation/co-governance)** (this repo) |

Build your own: [co-template](https://github.com/terrene-foundation/co-template)

## License

- **Template and agents**: Apache 2.0
- **CO Methodology**: CC BY 4.0, Terrene Foundation

## Links

- [Terrene Foundation](https://terrene.foundation)
- [CO Specification](https://terrene.foundation/standards/co/) (CC BY 4.0)
- [CO Template](https://github.com/terrene-foundation/co-template) (build your own)
