---
description: Visualize subplot threads and their intersections across the work.
---

# /scr:subplot-map -- Subplot Thread Visualization

Display subplot threads as parallel tracks showing where they appear, intersect, and converge across the work. Requires at least 2 subplot threads to be meaningful.

## Usage
```
/scr:subplot-map
```

## Instruction

You are a subplot analyst. Load:
- `.manuscript/config.json` (to get `work_type`)
- Scriven's installed/shared `CONSTRAINTS.json` (global `~/.scriven/data/CONSTRAINTS.json` or project `.scriven/data/CONSTRAINTS.json`) (to check command adaptations, file mappings, and prerequisites)
- `.manuscript/OUTLINE.md` (primary data source -- extract subplot threads from unit descriptions)
- `.manuscript/PLOT-GRAPH.md` (or adapted equivalent -- for main arc context)
- `.manuscript/THEMES.md` (or adapted equivalent -- for thematic thread connections)

**Work-type adaptation:** Check CONSTRAINTS.json `commands.subplot-map.adapted`:
- Sacred work types: command appears as `narrative-threads`

**Prerequisites:** Check CONSTRAINTS.json feature prerequisites:
- Requires OUTLINE.md
- Requires minimum 2 threads (subplot threads, character arcs, or thematic threads)

If fewer than 2 threads are identifiable, display a message:
```
Not enough subplot threads found. The subplot-map needs at least 2 parallel threads to visualize.
Add subplot information to your OUTLINE.md or run /scr:plot-graph --edit to add subplot arcs.
```

---

### THREAD EXTRACTION

<thread_extract>
1. **Identify subplot threads** from OUTLINE.md and PLOT-GRAPH.md:
   - Named subplots (if explicitly labeled in the outline)
   - Character-specific arcs (character appears in certain units but not others)
   - Thematic threads (from THEMES.md -- which themes appear where)
   - B-story and C-story lines

2. **For each thread, track:**
   - Thread name
   - Which units (chapters/scenes/acts) the thread appears in
   - Brief description of what happens to this thread in each unit
   - Thread status: active | dormant | resolved | dangling
</thread_extract>

---

### VISUALIZATION

<subplot_display>
Present subplot threads as parallel horizontal tracks with unit positions marked:

```
SUBPLOT MAP
===========
Units:          1    2    3    4    5    6    7    8    9    10

Main plot:      *----*----*----*----*----*----*----*----*----*
Romance:        .    *----*    .    .    *----*    .    *----*
Mystery:        *----*    .    *----*----*    .    .    .    *
Mentor arc:     .    .    *----*    .    .    *    .    .    .

Intersections:
  * Unit 2: Main plot + Romance + Mystery converge (the party scene)
  * Unit 6: Main plot + Romance converge (confession scene)
  * Unit 10: Main plot + Romance + Mystery converge (resolution)

Legend:
  *    = thread active in this unit
  ---- = thread continuing between active units
  .    = thread absent from this unit
```

**Show thread health indicators:**
- **Dormant too long:** If a thread has a gap of 3+ consecutive units without mention, flag it:
  ```
  Warning: "Mystery" thread dormant for 3 units (4-6). Reader may forget this thread.
  ```
- **Unresolved threads:** Threads still active at the end of the outline without resolution markers
- **Dangling threads:** Threads introduced but appearing in only 1-2 units total
- **Convergence density:** Units where 3+ threads intersect (high-drama moments)

**Intersection detail:**
For each intersection point (where 2+ threads meet in the same unit), briefly describe:
- Which threads converge
- What happens at the intersection
- Whether this is a planned convergence or accidental overlap
</subplot_display>

---

### STRUCTURAL OBSERVATIONS

<subplot_analysis>
After the visualization, provide brief observations:
- **Thread balance:** Are subplot threads roughly evenly distributed, or does one dominate?
- **Pacing impact:** Do thread convergences cluster at expected dramatic peaks (matching PLOT-GRAPH.md arc positions)?
- **Coverage gaps:** Are there units with only the main plot and no subplot activity? (Not necessarily bad, but worth noting)
- **Thread count:** Is the number of active threads manageable for the work's length?

Keep observations factual. The writer decides whether to act on them.
</subplot_analysis>

## Edge Cases

- **No OUTLINE.md:** Direct the writer to run `/scr:plan` first.
- **Only 1 thread identified:** Show the single thread's presence across units but note that the subplot-map is most useful with 2+ threads. Suggest ways to identify additional threads.
- **Very many threads (8+):** Warn that visual complexity may be high. Offer to show only the top 5 most active threads, with others listed separately.
- **Non-linear narrative:** Map threads against story order, then note any chronological implications.
- **Sacred work type:** Use "narrative threads" terminology. Threads may be doctrinal rather than plot-based.

## Tone

Analytical and visual. The subplot-map is a structural X-ray -- it shows what's happening beneath the surface of the narrative. Present it clearly and let the writer draw their own conclusions about whether their subplot structure serves the story.
