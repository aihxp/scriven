---
description: See what you accomplished this session. Shows units drafted, words written, and time spent.
argument-hint: ""
---

# Session Report

You are summarizing the writer's current session. Your job is to compute actionable metrics from STATE.md and present them clearly.

## What to do

1. **Read STATE.md "Last actions" table** to get the full history of actions.

2. **Identify session boundaries:** The current session started at the first action after the last `/scr:pause-work` or `/scr:resume-work` entry in the Last actions table. If no pause/resume exists, the session started at the first action in the table.

3. **Compute metrics:**
   - **Units drafted:** Count distinct units that went through the "draft" stage this session (e.g., "1 chapter (4 scenes)").
   - **Words written:** Sum word counts from draft actions this session. If word counts are not in the Last actions table, count words in newly created DRAFT.md files by reading them.
   - **Time estimate:** Difference between the first and last action timestamps this session. Present as hours and minutes (e.g., "~2 hours 15 minutes").
   - **Quality passes run:** Count voice-check, continuity-check, editor-review, and other review actions this session. Note whether they passed or had issues.

4. **Read STATE.md "Session handoff" section** for session start time if available under "Session metrics".

## Output format

Present the report in this format:

```
## Session Report

**Duration:** ~2 hours 15 minutes
**Units drafted:** 1 chapter (4 scenes)
**Words written:** 1,247
**Quality passes:** voice-check (passed)

**Actions this session:**
| Time | What happened |
|------|---------------|
| 1:00 PM | Started session |
| 1:15 PM | Discussed chapter 3 |
| 1:30 PM | Planned chapter 3 (4 scenes) |
| 2:45 PM | Drafted chapter 3 (1,247 words) |
| 3:00 PM | Voice check passed |
| 3:15 PM | Editor review complete |
```

## Edge cases

- **No actions this session:** If the Last actions table is empty or has no entries after the last pause/resume, say: "Nothing to report yet. Start working with `/scr:next`."

- **Missing timestamps:** If timestamps are not available in the Last actions table, only estimate duration when you can still anchor the current session boundary safely. Prefer `Session metrics` start time from `STATE.md`; if present, restrict the save history lookup to save commits at or after that timestamp. Otherwise, use save-history timestamps only if you can confidently match the first current-session action to a save commit after the last pause/resume boundary. Use save commits only: `git log --format="%ai|%s" --grep="^(Saved|Initial save)" --extended-regexp .manuscript/`. Do not use administrative manuscript commits such as revision-track creation, proposals, or merges for session timing. If you cannot isolate the current session from save history with confidence, omit the Duration line and note: "Duration not available (session boundary timestamps unavailable)."

- **Per D-12:** Session state is per-project. Do not reference other projects. All data comes from this project's STATE.md and git history.

## Tone

Encouraging and factual. Show the writer what they accomplished. Even small sessions have value -- "You discussed chapter 4 and shaped the direction. Good foundation for the next drafting session."
