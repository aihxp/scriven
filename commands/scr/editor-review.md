---
description: Walk the writer through their drafted act for manual read-through and quality review.
---

# /scr:editor-review — Manual Read-Through and Quality Review

Walk the writer through their drafted act for acceptance testing.

## Usage
```
/scr:editor-review [N]
```

## Instruction

You are conducting an editorial review of Act `N`. This is the writer's chance to confirm the draft reads as intended — automated checks handle continuity and voice, but only the writer knows if the story *feels* right.

---

### STEP 1: EXTRACT REVIEWABLE BEATS

Load the act's scene plans and drafts. For each scene, extract the key experiential beats the writer should evaluate:

<beat_extraction>
  For each scene, identify 2-4 things the writer should notice when reading:
  - Does the opening hook grab?
  - Does the dialogue feel natural for this character?
  - Does the emotional climax land?
  - Does the pacing feel right?
  - Is the setting vivid enough?
  - Does the ending make you want to keep reading?
  - Does this character's voice sound distinct from others?
  - Is the subtext clear enough without being on-the-nose?
</beat_extraction>

---

### STEP 2: GUIDED WALKTHROUGH

Present each scene's reviewable beats ONE AT A TIME. For each:

1. Show the scene title and a brief reminder of what it covers
2. Direct the writer to read the scene (reference the file path)
3. Ask about each beat:
   - ✅ "Works as intended"
   - ⚠️ "Close but needs adjustment" (ask for details)
   - ❌ "Not working" (ask what's wrong)

Record responses for each beat.

---

### STEP 3: DIAGNOSE ISSUES

For any ⚠️ or ❌ responses, spawn a diagnostic agent:

<diagnostic_agent>
  <role>Revision Analyst</role>
  <task>
    Given the writer's feedback on what's not working:
    1. Identify the root cause (voice issue? pacing? character motivation? structure?)
    2. Propose 2-3 specific revision approaches
    3. Estimate scope of revision (line edit vs. scene rewrite vs. structural change)
    4. Flag any downstream effects (changes that would ripple to other scenes)
  </task>
</diagnostic_agent>

---

### STEP 4: GENERATE EDITOR NOTES

Write `{act_num}-EDITOR-NOTES.md`:

<editor_notes>
  <section name="overall_assessment">
    How the act reads as a whole. What's working, what's not.
  </section>
  <section name="scene_by_scene">
    For each scene:
    - Beats that passed ✅
    - Issues flagged ⚠️❌ with diagnosis
    - Proposed revisions
  </section>
  <section name="revision_plans">
    If issues were found, generate targeted revision plans in the same
    format as SCENE-PLAN.md, but scoped to specific fixes.
    These can be re-executed with /scr:draft-act.
  </section>
  <section name="global_notes">
    Any patterns across scenes (recurring issues, consistent strengths).
    Craft observations the writer should consider for future acts.
  </section>
</editor_notes>

---

### STEP 5: NEXT STEPS

If all beats passed:
- Mark act as "reviewed" in STATE.md
- Suggest moving to `/scr:submit N` or `/scr:discuss-act {N+1}`

If revision plans were created:
- Present the revision scope to the writer
- Explain that running `/scr:draft-act N` will use the revision plans
- Ask if they want to revise now or move on and come back later

---

### OUTPUT

- `{act_num}-EDITOR-NOTES.md`
- Revision plans (if needed): `{act_num}-{N}-REVISION-PLAN.md`
- Updated `STATE.md`
