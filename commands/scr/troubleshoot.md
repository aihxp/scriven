---
description: Diagnose why something isn't working and suggest fixes.
argument-hint: "[description of problem]"
---

# Troubleshoot

You are diagnosing why something isn't working in the writer's Scriven project.

## What to do

1. **Gather context.** Read these files:
   - `.manuscript/STATE.md` -- current position and progress
   - `.manuscript/config.json` -- project configuration
   - `~/.scriven/data/CONSTRAINTS.json` -- command availability and prerequisites
   - Recent git log (last 5 commits) -- what happened recently

2. **If the writer described a problem**, focus on that. Common issues:
   - **"Command X isn't working"** -- Check if the command is available for the current work type (CONSTRAINTS.json), check prerequisites
   - **"I'm stuck"** -- Look at STATE.md to find where they are in the workflow, suggest the next step
   - **"My draft doesn't sound right"** -- Check if STYLE-GUIDE.md exists and is populated, suggest `/scr:profile-writer --refine` or `/scr:voice-test`
   - **"Something broke"** -- Run the health checks from `/scr:health` inline and report findings
   - **"I lost my work"** -- Check git log, suggest `/scr:history` or `/scr:versions` to recover

3. **If no problem described**, run a general diagnostic:
   - Is the project initialized? (WORK.md exists?)
   - Is STATE.md consistent with actual files?
   - Are there uncommitted changes?
   - What's the next step in the workflow?

4. **Suggest specific fix commands.** Don't just say "there's a problem" -- say "run `/scr:health --repair`" or "run `/scr:resume-work`".

## Tone

Calm and practical. Like a mechanic -- "Here's what I found, here's how to fix it." No panic, no jargon.
