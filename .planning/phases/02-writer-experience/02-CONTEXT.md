# Phase 2: Writer Experience - Context

**Gathered:** 2026-04-07
**Status:** Ready for planning

<domain>
## Phase Boundary

Deliver autopilot drafting modes (guided, supervised, full-auto), writer-friendly git abstractions (save, history, compare, versions, undo), and session management (pause-work, resume-work, session-report). Non-technical writers use Scriven without encountering git terminology. The AI drafts autonomously with appropriate human checkpoints.

</domain>

<decisions>
## Implementation Decisions

### Autopilot Behavior
- **D-01:** Guided autopilot shows summary + last 200 words of drafted prose, asks "approve/revise/stop" — quick review without reading full scene
- **D-02:** Full-auto supports configurable writer-defined checkpoints (e.g., "pause after each act climax") in addition to the 4 built-in pause conditions (continuity contradiction, voice drift, plot hole, missing info)
- **D-03:** `/scr:autopilot --resume` reads STATE.md for last completed unit + current stage, explains where it left off in one sentence, then continues
- **D-04:** Supervised mode batches by structural unit (e.g., "chapters 3-5 complete, review?") rather than arbitrary counts

### Writer Mode Git Abstractions
- **D-05:** `/scr:save` auto-generates commit messages from context: "Saved after drafting chapter 3" / "Saved after editor review" — writer never writes commit messages
- **D-06:** `/scr:history` displays a markdown table: Date, Action, Details (e.g., "Apr 6, Drafted chapter 3, 1,247 words") — scannable, no git hashes
- **D-07:** `/scr:compare` shows side-by-side prose diff with changed sentences highlighted, no +/- markers or line numbers — writer-friendly, not developer-friendly
- **D-08:** `/scr:undo` confirms with "This will revert to your last save. You'll lose: [list of changes]. Proceed?" — explicit, reversible framing

### Session Management
- **D-09:** `/scr:pause-work` asks "Any notes for when you come back?" and stores writer's thinking in STATE.md Accumulated Context — captures mental state, not just file state
- **D-10:** `/scr:resume-work` outputs one paragraph: "Last time you [what was done]. You were working on [current unit]. [Suggestion for next step]." — concise but contextual
- **D-11:** `/scr:session-report` includes: units drafted + word count + time estimate + quality passes run — actionable metrics a writer cares about
- **D-12:** Session state is per-project (STATE.md is per-project) — no global session history

### Claude's Discretion
- Writer mode toggle mechanism (config flag in settings.json vs. STATE.md)
- Exact format of history table columns
- How to detect "structural unit" boundaries for supervised batching
- Voice drift threshold for full-auto pause

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Product Plan
- `SCRIVEN-PRODUCT-PLAN-v0.3.md` §5 — Autonomous mode (autopilot profiles, stages, pause conditions, YOLO mode)
- `SCRIVEN-PRODUCT-PLAN-v0.3.md` §15.1 — Core workflow command list (autopilot, autopilot-publish, autopilot-translate)
- `SCRIVEN-PRODUCT-PLAN-v0.3.md` §15.11 — Navigation & session commands (save, history, compare, versions, undo, pause-work, resume-work, session-report)
- `SCRIVEN-PRODUCT-PLAN-v0.3.md` §19.3 — Drop-off risk mitigations (writer mode strategy)

### Runtime Artifacts
- `data/CONSTRAINTS.json` — Command availability (autopilot, save, history, etc. all available for "all" work types)
- `commands/scr/next.md` — Next command pattern (autopilot extends this)
- `commands/scr/draft.md` — Draft command (autopilot wraps this per unit)
- `templates/STATE.md` — State file template (session management extends this)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `commands/scr/next.md`: Existing "detect state and run next command" pattern — autopilot extends this into a loop
- `commands/scr/draft.md`: Existing draft command — autopilot calls this per unit
- `templates/STATE.md`: Template for state tracking — session management extends the Accumulated Context section

### Established Patterns
- Commands are markdown skill files with YAML frontmatter
- Each command reads STATE.md and WORK.md for context
- Fresh context per atomic unit (drafter agent pattern) — autopilot must preserve this

### Integration Points
- Autopilot wraps the existing discuss → plan → draft → review → submit chain
- Writer mode commands wrap git operations (commit, log, diff, reset)
- Session commands read/write STATE.md
- Settings stored in .manuscript/config.json or .scriven/settings.json

</code_context>

<specifics>
## Specific Ideas

- Autopilot guided = "enhanced /scr:next in a loop" — same detection logic, just keeps going with approval pauses
- Writer mode should be the DEFAULT — developer mode is opt-in via settings
- The compare command should never show raw diff output — always prose-friendly formatting
- Full-auto is the differentiating feature (no competitor does unattended manuscript generation with quality gates)

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 02-writer-experience*
*Context gathered: 2026-04-07*
