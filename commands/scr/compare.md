---
description: Compare your current work with a previous save. Shows changes in plain prose, not code diff.
argument-hint: "[save number or 'last']"
---

# Compare

You are showing the writer how their prose has changed. Your job is to format git diff output as readable prose comparisons with NO technical diff markers.

## What to do

1. **Check for `.manuscript/` directory.** If missing: "No manuscript found. Start with `/scr:new-work`."

2. **Check for `.git/` directory.** If missing: "No save history to compare. Save your work first with `/scr:save`."

3. **Check for at least 2 saves.** Run `git rev-list --count HEAD -- .manuscript/ 2>/dev/null`. If less than 2: "Need at least two saves to compare. Save your work again with `/scr:save` after making changes."

4. **Read `.manuscript/config.json`** for `developer_mode` and `command_unit`.

5. **Determine what to compare:**
   - No argument or `last`: compare current state with last save (`HEAD~1`)
   - A number N: compare current state with the Nth previous save (`HEAD~N`)
   - Two numbers "N M": compare save N with save M
   - Run the appropriate: `git diff HEAD~1 -- .manuscript/` (or specified refs)

6. **Parse the diff output** into changed prose pairs:
   - For each changed file in `.manuscript/`, extract the diff hunks
   - Map file paths to unit names (e.g., `.manuscript/drafts/body/3-2-DRAFT.md` becomes the unit name from the file content or outline)
   - Group changes by unit (chapter/scene/section)

7. **Format as Before/After blocks:**

   ```
   ## {Unit Name} -- Changes

   **Before:**
   > Marcus walked through the empty corridor, his footsteps echoing against the marble walls.

   **After:**
   > Marcus moved through the silent corridor, each footstep a small detonation against the marble.

   ---

   **Before:**
   > She looked at him with concern.

   **After:**
   > She studied him, her eyes narrowing at something she found in his expression.
   ```

8. **Show the formatted comparison to the writer.**

## Formatting rules

- **NEVER show:** `+`, `-`, `@@`, line numbers, file paths, commit hashes, `diff --git`, `index`, `---`, `+++`
- Use blockquotes (`>`) for prose passages
- Group changes by unit (chapter/scene) with `##` headings
- Show 1 sentence of unchanged context before and after each change for readability
- If a section was added (no previous version): use "**New:**" instead of Before/After
- If a section was removed: use "**Removed:**" with the deleted text in a blockquote
- If only whitespace or formatting changed: skip it silently
- Separate multiple changes within a unit with `---` horizontal rules

## Writer mode output

- **Writer mode** (`developer_mode: false`): Show ONLY the formatted Before/After blocks as described above. No technical information whatsoever.
- **Developer mode** (`developer_mode: true`): Show standard unified diff output with file paths and line numbers. Include commit hashes being compared.

## Edge cases

- **No changes:** "No differences found. Your current work matches your last save."
- **Only one save:** "Need at least two saves to compare."
- **Binary files changed** (images, etc.): Skip them silently in writer mode. Mention them in developer mode.
- **New files added since last save:** Show under a "**New files:**" heading with the content.
- **Files deleted since last save:** Show under a "**Removed files:**" heading.
- **Very large diff** (more than 50 changed passages): Summarize with counts per unit, then show the first 10 changes. Mention: "Showing 10 of [N] changes. There were significant changes across [M] sections."

## Tone

Neutral. Observational. Present the changes without judgment. Don't comment on whether changes are improvements -- that's the editor's job.
