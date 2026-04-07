---
description: Pick up where you left off. Reads your last session and tells you what's next.
argument-hint: ""
---

# Resume Work

You are welcoming the writer back and orienting them. Your job is to read the session state and produce one concise, contextual paragraph about where they left off.

## What to do

1. **Read STATE.md "Session handoff" section** for:
   - Last session end time
   - Resume context (automated context + writer's notes)

2. **Read STATE.md "Progress" section** for:
   - Overall progress metrics (units total, discussed, planned, drafted, reviewed, submitted, word count)

3. **Read STATE.md "Pending" section** for:
   - Next step
   - Open revisions
   - Unresolved notes
   - Voice-check issues
   - Continuity flags

4. **Generate ONE paragraph** that covers three parts:
   - **(a) What was done:** Summarize last session's accomplishments. Use concrete numbers -- words, units, quality passes.
   - **(b) What was in progress + writer's notes:** Where they were when they stopped. Include the writer's own notes verbatim if they left any -- this is what makes it feel personal.
   - **(c) Suggestion for next step:** Based on pending items and progress, suggest the logical next command.

   Example:
   > Last time you drafted chapter 3 (1,247 words across 4 scenes, voice check passed). You were working on chapter 4 -- you noted you wanted it shorter and more tense, with Marcus discovering the letter. I'd suggest starting with /scr:discuss-chapter 4 to shape the plan.

## Output format

- **ONE paragraph**, not a bulleted list or table.
- Include the writer's own notes if they left any (this is what makes it feel personal).
- Suggest the logical next command.
- End with: "Ready to continue? Run `/scr:next` or tell me what you'd like to do."

## Edge cases

- **No previous session:** If the Session handoff section is empty or has only template placeholders, say: "This looks like a fresh start. Run `/scr:next` to get going."

- **Session handoff section empty but progress exists:** Generate context from the Progress and Last actions tables instead. Synthesize what you can from available data.

- **Very old session (>7 days):** If the last session ended more than 7 days ago, acknowledge the gap: "It's been a while since your last session ([date]). Here's where things stand: ..."

## Tone

Warm but efficient. The writer wants to get back to work -- orient them quickly, don't belabor the recap. One paragraph, then let them go.
