# Phase 2: Writer Experience - Research

**Researched:** 2026-04-06
**Domain:** Autopilot drafting modes, writer-friendly git abstractions, session management
**Confidence:** HIGH

## Summary

Phase 2 builds three capability groups on top of Scriven's existing command/skill architecture: (1) autopilot drafting modes that extend the existing `/scr:next` loop into guided, supervised, and full-auto profiles; (2) writer-friendly git abstractions that wrap git commit/log/diff/reset behind save/history/compare/undo/versions commands; and (3) session management commands (pause-work, resume-work, session-report) that read/write STATE.md to preserve the writer's mental context across sessions.

All 13 commands are markdown skill files with YAML frontmatter, following the established pattern. There is no compiled code, no npm dependencies, no runtime beyond the AI agent itself. The "implementation" is writing precise instruction files that tell the AI agent how to execute git operations, read/write STATE.md, and orchestrate the existing discuss-plan-draft-review-submit pipeline in a loop.

**Primary recommendation:** Build autopilot as a loop wrapper around the existing `/scr:next` routing logic. Writer mode commands are thin wrappers around git CLI operations with output formatting. Session commands read/write STATE.md sections. All commands follow the established markdown skill file pattern.

<user_constraints>

## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Guided autopilot shows summary + last 200 words of drafted prose, asks "approve/revise/stop" -- quick review without reading full scene
- **D-02:** Full-auto supports configurable writer-defined checkpoints (e.g., "pause after each act climax") in addition to the 4 built-in pause conditions (continuity contradiction, voice drift, plot hole, missing info)
- **D-03:** `/scr:autopilot --resume` reads STATE.md for last completed unit + current stage, explains where it left off in one sentence, then continues
- **D-04:** Supervised mode batches by structural unit (e.g., "chapters 3-5 complete, review?") rather than arbitrary counts
- **D-05:** `/scr:save` auto-generates commit messages from context: "Saved after drafting chapter 3" / "Saved after editor review" -- writer never writes commit messages
- **D-06:** `/scr:history` displays a markdown table: Date, Action, Details (e.g., "Apr 6, Drafted chapter 3, 1,247 words") -- scannable, no git hashes
- **D-07:** `/scr:compare` shows side-by-side prose diff with changed sentences highlighted, no +/- markers or line numbers -- writer-friendly, not developer-friendly
- **D-08:** `/scr:undo` confirms with "This will revert to your last save. You'll lose: [list of changes]. Proceed?" -- explicit, reversible framing
- **D-09:** `/scr:pause-work` asks "Any notes for when you come back?" and stores writer's thinking in STATE.md Accumulated Context -- captures mental state, not just file state
- **D-10:** `/scr:resume-work` outputs one paragraph: "Last time you [what was done]. You were working on [current unit]. [Suggestion for next step]." -- concise but contextual
- **D-11:** `/scr:session-report` includes: units drafted + word count + time estimate + quality passes run -- actionable metrics a writer cares about
- **D-12:** Session state is per-project (STATE.md is per-project) -- no global session history

### Claude's Discretion
- Writer mode toggle mechanism (config flag in settings.json vs. STATE.md)
- Exact format of history table columns
- How to detect "structural unit" boundaries for supervised batching
- Voice drift threshold for full-auto pause

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope.

</user_constraints>

<phase_requirements>

## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| AUTO-01 | Autopilot guided profile pauses after each atomic unit for writer review | Extend `/scr:next` loop; D-01 defines review format (summary + last 200 words + approve/revise/stop) |
| AUTO-02 | Autopilot supervised profile batches through several units, pauses for review | D-04: batch by structural unit using hierarchy from CONSTRAINTS.json work_types |
| AUTO-03 | Autopilot full-auto runs until complete, only pausing on quality gate failures | D-02: 4 built-in pause conditions + writer-defined checkpoints; note: voice-check/continuity-check from Phase 4 not yet available -- use placeholder detection |
| AUTO-04 | Autopilot resume picks up from last completed unit after interruption | D-03: read STATE.md progress + last actions, one-sentence explanation, continue |
| AUTO-05 | Writer mode toggle hides git terminology | Discretion area: recommend `developer_mode` flag in config.json (already exists in template) |
| AUTO-06 | `/scr:save` creates git commit with writer-friendly message | D-05: auto-generate from STATE.md context (current unit, last command, stage) |
| AUTO-07 | `/scr:history` shows visual timeline of saves without git jargon | D-06: parse `git log`, format as markdown table with Date/Action/Details |
| AUTO-08 | `/scr:compare` shows side-by-side diff in writer-friendly format | D-07: `git diff` output reformatted as prose comparison, no +/- markers |
| AUTO-09 | `/scr:versions` lists draft versions with human-readable labels | List git tags/commits with writer-friendly labels from commit messages |
| AUTO-10 | `/scr:undo` reverts to last checkpoint with confirmation | D-08: show what will be lost, require explicit confirmation, use `git reset` |
| AUTO-11 | `/scr:pause-work` captures full context to STATE.md | D-09: prompt for mental notes, write to STATE.md Session handoff section |
| AUTO-12 | `/scr:resume-work` restores context and explains where writer left off | D-10: read STATE.md, generate one contextual paragraph |
| AUTO-13 | `/scr:session-report` shows work completed in current session | D-11: units drafted + word count + time estimate + quality passes |

</phase_requirements>

## Project Constraints (from CLAUDE.md)

- **Architecture:** Must remain a pure skill/command system -- no compiled code, no runtime dependencies beyond Node.js for the installer
- **Voice fidelity:** Every feature must preserve the Voice DNA pipeline -- fresh context per atomic unit, STYLE-GUIDE.md loaded first
- **Backward compatibility:** Existing 28 commands and templates must continue working as new features are added
- **Plan authority:** If a command file contradicts the product plan, fix the command -- plan is canonical (section 15 for command specs)
- **Progressive disclosure:** Onboarding asks 3 questions max; depth is optional and additive
- **GSD workflow enforcement:** Use GSD entry points for all file-changing operations

## Standard Stack

### Core

This phase requires no new libraries or npm dependencies. All commands are markdown skill files that instruct the AI agent to use git CLI and file I/O operations.

| Tool | Version | Purpose | Why Standard |
|------|---------|---------|--------------|
| Git CLI | 2.50.x (installed) | Underlying version control for save/history/compare/undo/versions | Already required by AI coding agents; writer never sees it directly |
| Markdown skill files | N/A | Command definitions with YAML frontmatter | Established Scriven pattern -- all 21 existing commands follow this |
| STATE.md | N/A | Session state persistence | Already exists as template; session commands extend it |
| config.json | N/A | Autopilot profile and writer mode settings | Already exists with `autopilot` and `git` sections |

### Supporting

| Component | Purpose | When to Use |
|-----------|---------|-------------|
| CONSTRAINTS.json | Work type hierarchy lookup | Supervised mode needs to know structural unit boundaries (top/mid/atomic) |
| OUTLINE.md | Unit enumeration | Autopilot needs to know total units and order |
| drafter.md agent | Prose generation | Autopilot invokes this per atomic unit via fresh context |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Git CLI for save/undo | File-system snapshots | Git is already required, provides full history, branching later |
| STATE.md for session | Separate session JSON | STATE.md is established pattern, human-readable, already read by all commands |
| Markdown table for history | JSON or structured output | Markdown renders nicely in AI agents, matches writer-facing philosophy |

## Architecture Patterns

### Command File Structure

All 13 new commands follow the existing pattern:

```
commands/scr/
  autopilot.md          # Orchestrates guided/supervised/full-auto loops
  save.md               # Git commit wrapper
  history.md            # Git log formatter
  compare.md            # Git diff formatter
  versions.md           # Version listing
  undo.md               # Git reset wrapper
  pause-work.md         # Session pause
  resume-work.md        # Session resume
  session-report.md     # Session metrics
```

Note: `versions.md` is the only new standalone file for versioning. The autopilot command is a single file handling all three profiles via the `--profile` flag.

### Pattern 1: Autopilot as Loop Wrapper

**What:** Autopilot wraps the existing `/scr:next` routing logic in a loop with configurable pause behavior.
**When to use:** All three autopilot profiles.

```markdown
# Pseudocode for autopilot loop

1. Read config.json for autopilot.profile (guided|supervised|full-auto)
2. Read STATE.md for current position
3. Read OUTLINE.md for total units

LOOP:
  4. Determine next action (same logic as /scr:next routing)
  5. Execute the action (discuss/plan/draft/review/submit)
  6. Update STATE.md
  7. Check pause conditions:
     - guided: ALWAYS pause after each atomic unit completion
     - supervised: pause when structural unit boundary is reached
     - full-auto: pause ONLY on quality gate failure or writer checkpoint
  8. If paused: show review prompt, wait for input
  9. If not paused: continue loop
  10. If all units complete: show completion summary
```

### Pattern 2: Writer Mode Git Abstraction

**What:** Commands that wrap git operations and translate output to writer-friendly language.
**When to use:** save, history, compare, versions, undo commands.

```markdown
# Pattern: Git operation wrapper

1. Check config.json developer_mode flag
2. Execute git operation (commit, log, diff, tag, reset)
3. Parse git output
4. Format as writer-friendly markdown (no hashes, no +/-, no technical jargon)
5. Update STATE.md with action record
```

### Pattern 3: Session State Management

**What:** Commands that capture and restore the writer's mental context via STATE.md.
**When to use:** pause-work, resume-work, session-report.

```markdown
# Pattern: Session state read/write

1. Read STATE.md (always the first step)
2. Read/write the relevant sections:
   - "Session handoff" for pause/resume
   - "Last actions" table for session-report
   - "Pending" section for next-step suggestions
3. For resume: synthesize context into one natural-language paragraph
```

### Pattern 4: Structural Unit Boundary Detection (Discretion Area)

**What:** How supervised mode detects when a structural unit is complete.
**Recommendation:** Use the work type hierarchy from CONSTRAINTS.json.

The hierarchy defines three levels: `top`, `mid`, `atomic`. The `command_unit` is always the `mid` level. Supervised mode batches at the `mid` level boundary.

```
For a novel: hierarchy = { top: "part", mid: "chapter", atomic: "scene" }
  - Supervised pauses when a chapter's worth of scenes are all drafted
  - "Chapters 3-5 complete, review?" (mid-level boundary)

For a screenplay: hierarchy = { top: "act", mid: "sequence", atomic: "scene" }
  - Supervised pauses when a sequence's scenes are drafted
```

The agent reads OUTLINE.md to know which atomic units belong to which mid-level unit, then pauses when all atomic units in that mid-level unit are complete.

### Pattern 5: Writer Mode Toggle (Discretion Area)

**Recommendation:** Use the existing `developer_mode` field in `config.json` (already present in template).

- `developer_mode: false` (DEFAULT) = Writer mode. All commands use writer-friendly language.
- `developer_mode: true` = Developer mode. Show git terminology, file paths, technical details.

This is already in the config template. No new field needed. The product plan (section 10) explicitly uses `/scr:settings developer_mode: true|false` as the toggle.

### Anti-Patterns to Avoid

- **Running git operations without checking for a git repo:** Always verify `.git/` exists before save/history/compare/undo. If not, offer to initialize.
- **Showing git internals in writer mode:** Never expose commit hashes, branch names, diff markers, or file paths in writer mode. Translate everything.
- **Autopilot without STATE.md updates:** Every autopilot action MUST update STATE.md. If interrupted, resume depends on accurate state.
- **Full-auto without placeholder quality gates:** AUTO-03 depends on voice-check (QUAL-05) and continuity-check (QUAL-08) from Phase 4. For now, implement the pause condition framework with basic detection (e.g., word count anomaly, obvious repetition). The full quality gates plug in later.
- **Losing writer's mental notes on crash:** The pause-work mental notes must be written to STATE.md immediately, not buffered.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Version control | Custom file snapshots | Git CLI (`git commit`, `git log`, `git diff`, `git reset`) | Git is already present, handles edge cases (concurrent edits, corruption recovery), enables Phase 8 collaboration features |
| Diff formatting | Custom text differ | `git diff` output + agent-side reformatting | Git diff handles rename detection, binary files, encoding issues |
| Session persistence | Custom JSON/SQLite session store | STATE.md markdown sections | Every Scriven command already reads STATE.md; single source of truth |
| Unit progress tracking | Custom progress database | STATE.md Progress section + OUTLINE.md | Already the established pattern from Phase 1 |

**Key insight:** Scriven is a pure skill/command system. There is no compiled code. Every "implementation" is a markdown instruction file that tells the AI agent what to do. The complexity is in the instruction clarity, not in code.

## Common Pitfalls

### Pitfall 1: Autopilot Infinite Loop
**What goes wrong:** Autopilot gets stuck repeating the same action because STATE.md was not properly updated after the previous action.
**Why it happens:** The agent's fresh context per atomic unit means each iteration starts clean. If state is not persisted between iterations, the loop cannot advance.
**How to avoid:** The autopilot command MUST mandate STATE.md updates after every action. The resume logic reads STATE.md, not agent memory.
**Warning signs:** Same unit being drafted twice, or autopilot re-running discuss after a unit was already discussed.

### Pitfall 2: Git Repo Not Initialized
**What goes wrong:** Writer runs `/scr:save` but there is no `.git/` directory. The git command fails with a cryptic error.
**Why it happens:** Scriven creates `.manuscript/` during `/scr:new-work` but does not necessarily initialize git.
**How to avoid:** Every git-wrapping command (save, history, compare, versions, undo) MUST check for `.git/` first. If missing, initialize it silently in writer mode, or prompt in developer mode.
**Warning signs:** "fatal: not a git repository" in output.

### Pitfall 3: Compare Command Showing Raw Diff
**What goes wrong:** The compare command outputs standard unified diff format with `+`, `-`, `@@` markers.
**Why it happens:** The AI agent defaults to showing git output as-is.
**How to avoid:** The compare command instructions must be extremely specific about output format: side-by-side prose, changed sentences highlighted with bold/italic, no technical markers. Include a concrete output example in the command file.
**Warning signs:** Any `+`, `-`, `@@`, or commit hash appearing in compare output.

### Pitfall 4: Session Report Missing Data
**What goes wrong:** `/scr:session-report` cannot report accurate metrics because STATE.md was not updated consistently.
**Why it happens:** If a writer uses commands that bypass STATE.md updates (e.g., manual editing), the session report has gaps.
**How to avoid:** Every command that modifies manuscript content MUST update the "Last actions" table in STATE.md with timestamp, command name, unit, and outcome.
**Warning signs:** Session report showing 0 words when the writer clearly drafted content.

### Pitfall 5: Resume After Crash vs. Resume After Pause
**What goes wrong:** `/scr:resume-work` and `/scr:autopilot --resume` handle different scenarios but get conflated.
**Why it happens:** Both involve "picking up where you left off."
**How to avoid:** Clear separation: `resume-work` is for session continuity (writer took a break). `autopilot --resume` is for continuing an interrupted autopilot run. Both read STATE.md but present different information. The autopilot resume also re-enters the autopilot loop.
**Warning signs:** Writer expects autopilot to restart but gets a simple status update instead.

### Pitfall 6: Undo Destroys Uncommitted Work
**What goes wrong:** Writer has uncommitted changes, runs `/scr:undo`, and loses work that was never saved.
**Why it happens:** `git reset` discards changes that were not committed.
**How to avoid:** The undo command MUST check for uncommitted changes first. If found, warn: "You have unsaved changes. Save first, or these will be lost." Force the writer to make an explicit choice.
**Warning signs:** Lost prose that the writer was actively editing.

## Code Examples

### Command File Template (established pattern)
```markdown
---
description: One-line description of what this command does.
argument-hint: "[optional arguments]"
---

# Command Name

You are [role description]. Your job is [what this command does].

## What to do

1. **Read STATE.md** for current context.
2. **[Action steps]**
3. **Update STATE.md** with results.
4. **Tell the writer** what happened in plain language.

## Autopilot behavior

If config has `autopilot.enabled: true`, [what to do differently].

## Tone

[Voice guidance for the agent's output]
```

### Save Command: Auto-Generated Commit Message
```markdown
# Logic for auto-generating commit messages

Read STATE.md to determine context:
- Current stage (discuss/plan/draft/review/submit)
- Current unit name and number
- Last command run

Generate message pattern:
- After drafting: "Saved after drafting {unit} {N}"
- After review: "Saved after editor review of {unit} {N}"
- After revision: "Saved after revising {unit} {N}"
- Manual save: "Saved work in progress on {unit} {N}"
- If writer provides optional message: "Saved: {writer's message}"

Execute: git add .manuscript/ && git commit -m "{generated message}"
```

### History Command: Markdown Table Output
```markdown
# Expected output format (from D-06)

| Date | Action | Details |
|------|--------|---------|
| Apr 6, 2:30 PM | Drafted chapter 3 | 1,247 words, 4 scenes |
| Apr 6, 1:15 PM | Reviewed chapter 2 | 3 revision notes |
| Apr 5, 4:00 PM | Planned chapter 3 | 4 scene plans |

# Implementation:
git log --format="%ai|%s" .manuscript/
Parse each line, extract date + commit message
Format commit message into Action + Details columns
```

### Compare Command: Prose-Friendly Output
```markdown
# Expected output format (from D-07)

## Chapter 3, Scene 2 -- Changes

**Before:**
> Marcus walked through the empty corridor, his footsteps echoing against the marble walls.

**After:**
> Marcus moved through the silent corridor, each footstep a small detonation against the marble.

---

**Before:**
> She looked at him with concern.

**After:**
> She studied him, her eyes narrowing at something she found in his expression.

# Implementation:
git diff HEAD~1 .manuscript/{file}
Parse hunks, extract changed lines
Present as Before/After prose pairs with blockquotes
NEVER show: +, -, @@, line numbers, file paths, commit hashes
```

### Autopilot Config Schema Extension
```json
{
  "autopilot": {
    "enabled": false,
    "profile": "guided",
    "custom_checkpoints": [
      "pause after each act climax",
      "pause before chapter 10"
    ]
  }
}
```

### STATE.md Session Handoff Extension
```markdown
## Session handoff

**Last session ended:** 2026-04-06 4:30 PM
**Resume context:** Finished drafting chapter 3 (4 scenes, 1,247 words). Voice check passed. Was about to start discussing chapter 4. Writer's note: "I want chapter 4 to be shorter and more tense -- Marcus discovers the letter here."

## Session metrics

**Current session started:** 2026-04-06 1:00 PM
**Units this session:** 1 chapter (4 scenes)
**Words this session:** 1,247
**Quality passes:** voice-check (passed), continuity-check (not yet available)
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Manual git usage for writers | Writer-mode abstractions hiding git | Scriven Phase 2 design | Non-technical writers never see git |
| Manual step-by-step workflow | Autopilot profiles with configurable autonomy | Scriven Phase 2 design | Writers choose their preferred oversight level |
| Context lost between sessions | STATE.md session handoff with mental notes | Scriven Phase 2 design | Writers resume with full context |

**Relevant precedent:** The `/scr:next` command already implements the "detect state and run next action" pattern. Autopilot is `/scr:next` in a loop with pause conditions. This is an extension, not a new pattern.

## Open Questions

1. **Voice Drift Detection for Full-Auto**
   - What we know: Full-auto (AUTO-03) should pause on voice drift. Phase 4 delivers the real `/scr:voice-check` command (QUAL-05).
   - What's unclear: What placeholder detection should Phase 2 use? The drafter agent already does a self-check (Step 4 in drafter.md). But full-auto needs an automated threshold.
   - Recommendation: Use the existing `voice.drift_threshold` from config.json (default 0.3). The autopilot command instructs the agent to do a quick voice comparison after each unit. If Phase 4 replaces this with a proper checker, the autopilot just calls the new command instead. Build the hook point now, quality gate plugs in later.

2. **Custom Checkpoint Parsing**
   - What we know: D-02 specifies writer-defined checkpoints like "pause after each act climax." These are stored in `autopilot.custom_checkpoints` array.
   - What's unclear: How does the agent match a free-text checkpoint to the current position in the manuscript?
   - Recommendation: The agent reads the checkpoint text as a natural-language instruction and checks it against OUTLINE.md structure at each iteration. E.g., "pause after each act climax" -- the agent checks if the just-completed unit is marked as a climax in OUTLINE.md. This is AI-native pattern matching, not regex.

3. **Git Auto-Init**
   - What we know: Writer mode git commands need a git repo. The `/scr:new-work` command creates `.manuscript/` but may not init git.
   - What's unclear: Should `/scr:save` auto-initialize git if missing, or should `/scr:new-work` always initialize?
   - Recommendation: `/scr:save` should check and auto-init if needed (silent in writer mode). Also update `/scr:new-work` to always `git init` the project directory. Belt and suspenders.

4. **Session Timing**
   - What we know: D-11 requires session-report to show time estimate.
   - What's unclear: How to track time without a running process? Scriven is stateless between commands.
   - Recommendation: Record timestamps in STATE.md "Last actions" table. Session start = first action timestamp. Session end = last action timestamp. Time = difference. This is an estimate (gaps during the session are included), but it's the best we can do without a daemon.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Node.js built-in test runner (node:test) |
| Config file | None -- uses `node --test test/*.test.js` |
| Quick run command | `node --test test/*.test.js` |
| Full suite command | `node --test test/*.test.js` |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| AUTO-01 | Guided autopilot command file exists with correct frontmatter | unit | `node --test test/commands.test.js` | Existing (covers new files automatically) |
| AUTO-02 | Supervised mode documented in autopilot.md | unit | `node --test test/commands.test.js` | Existing |
| AUTO-03 | Full-auto mode documented in autopilot.md | unit | `node --test test/commands.test.js` | Existing |
| AUTO-04 | Autopilot resume logic in autopilot.md | unit | `node --test test/commands.test.js` | Existing |
| AUTO-05 | Writer mode toggle: developer_mode field in config.json template | unit | `node --test test/phase2-writer-mode.test.js` | Wave 0 |
| AUTO-06 | save.md command file exists with correct structure | unit | `node --test test/commands.test.js` | Existing |
| AUTO-07 | history.md command file exists with correct structure | unit | `node --test test/commands.test.js` | Existing |
| AUTO-08 | compare.md command file exists with correct structure | unit | `node --test test/commands.test.js` | Existing |
| AUTO-09 | versions.md command file exists with correct structure | unit | `node --test test/commands.test.js` | Existing |
| AUTO-10 | undo.md command file exists with correct structure | unit | `node --test test/commands.test.js` | Existing |
| AUTO-11 | pause-work.md command file exists with correct structure | unit | `node --test test/commands.test.js` | Existing |
| AUTO-12 | resume-work.md command file exists with correct structure | unit | `node --test test/commands.test.js` | Existing |
| AUTO-13 | session-report.md command file exists with correct structure | unit | `node --test test/commands.test.js` | Existing |

### Sampling Rate
- **Per task commit:** `node --test test/commands.test.js`
- **Per wave merge:** `node --test test/*.test.js`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `test/phase2-writer-mode.test.js` -- verify config.json template has developer_mode field, autopilot section has all required fields, STATE.md template has session handoff section
- [ ] `test/phase2-autopilot.test.js` -- verify autopilot.md references all three profiles, config schema supports custom_checkpoints
- [ ] Verify existing `test/commands.test.js` will auto-detect new command files (it does -- it reads the commands/scr/ directory dynamically)

## Sources

### Primary (HIGH confidence)
- `/Users/hprincivil/Projects/scriven/SCRIVEN-PRODUCT-PLAN-v0.3.md` sections 5, 10, 15.11, 19.3 -- Autopilot profiles, writer mode spec, command list, drop-off mitigations
- `/Users/hprincivil/Projects/scriven/commands/scr/next.md` -- Existing routing logic that autopilot extends
- `/Users/hprincivil/Projects/scriven/commands/scr/draft.md` -- Existing draft command with autopilot hooks
- `/Users/hprincivil/Projects/scriven/agents/drafter.md` -- Drafter agent with voice-check self-check pattern
- `/Users/hprincivil/Projects/scriven/templates/STATE.md` -- State template with session handoff section
- `/Users/hprincivil/Projects/scriven/templates/config.json` -- Config with autopilot and git sections
- `/Users/hprincivil/Projects/scriven/data/CONSTRAINTS.json` -- Command availability and work type hierarchies

### Secondary (MEDIUM confidence)
- None needed -- all research is against the project's own codebase and product plan

### Tertiary (LOW confidence)
- None

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- No new dependencies. Pure skill file creation following established patterns.
- Architecture: HIGH -- Extends existing `/scr:next` pattern. All integration points already defined in product plan.
- Pitfalls: HIGH -- Derived from analysis of existing command patterns and git edge cases.

**Research date:** 2026-04-06
**Valid until:** 2026-05-06 (stable -- no external dependencies that could change)
