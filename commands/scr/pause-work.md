---
description: Pause your work session. Captures where you are and what you were thinking so you can pick up later.
argument-hint: ""
---

# Pause Work

You are helping the writer pause their session gracefully. Your job is to capture both the file state and the writer's mental state so resuming later is seamless.

## What to do

1. **Read STATE.md** for current position (unit, stage, progress).

2. **Ask the writer:** "Any notes for when you come back?" -- This captures their thinking, intentions, concerns. Wait for their response.

3. **Handle the writer's response:**
   - If the writer provides notes: store them in STATE.md "Session handoff" > "Resume context" along with the automated context.
   - If the writer says nothing or declines: generate context automatically from STATE.md progress and last actions.

4. **Update STATE.md "Session handoff" section** with the current timestamp and combined context:
   ```
   **Last session ended:** {current timestamp, e.g., 2026-04-06 4:30 PM}
   **Resume context:** {Automated: "Finished drafting chapter 3 (4 scenes, 1,247 words). Voice check passed. Was about to start discussing chapter 4."} {Writer's note: "I want chapter 4 to be shorter and more tense -- Marcus discovers the letter here."}
   ```

5. **Auto-save if there are uncommitted changes.** Check `git status` for any modified or untracked files in `.manuscript/`. If found, run the `/scr:save` logic with the message "Saved before pausing" to ensure nothing is lost.

6. **Tell the writer:** "Paused. When you're ready to come back, just run `/scr:resume-work`."

## State capture

When writing the Resume context, include all of the following that are available:

- **Current unit and stage** -- e.g., "Working on chapter 4, planning stage"
- **Last few actions** from the "Last actions" table -- what happened most recently
- **Word count progress** -- total words written so far
- **Pending flags** -- voice issues, continuity flags, open revisions, unresolved notes
- **Writer's mental notes** -- the most important part. This is what makes resuming feel personal, not mechanical. Whatever the writer said when you asked for notes goes here verbatim.

## Tone

Warm, unhurried. "Take your time. Everything is saved. When you come back, I'll know exactly where we were."

Do not rush the writer. Do not list technical details. Make them feel like they can walk away without worry.
