---
description: Visualize and manage the narrative arc structure of the story.
---

# /scr:plot-graph — View and Edit Story Arc

Visualize and manage the narrative arc structure.

## Usage
```
/scr:plot-graph [--edit] [--type <arc_type>]
```

**Arc Types:**
- `three-act` — Setup / Confrontation / Resolution (default)
- `five-act` — Exposition / Rising Action / Climax / Falling Action / Denouement
- `hero-journey` — Campbell's monomyth (17 stages)
- `save-the-cat` — Blake Snyder's 15 beats
- `kishotenketsu` — Four-act structure (Japanese/Chinese/Korean)
- `freytag` — Freytag's Pyramid
- `seven-point` — Dan Wells' 7-point structure
- `fichtean-curve` — In medias res with rising crises
- `custom` — Writer-defined structure

## Instruction

Load `PLOT-GRAPH.md`, `OUTLINE.md`, and `STATE.md`.

---

### DISPLAY MODE (default)

Present the story arc as a visual structure showing:

<plot_graph_display>
  1. The chosen arc type with labeled positions
  2. Each act/section mapped to its position on the arc
  3. Current progress (which beats are drafted vs. planned vs. pending)
  4. Key turning points highlighted:
     - **Inciting Incident** — What disrupts the status quo
     - **First Plot Point** — Point of no return
     - **Midpoint** — Mirror moment or reversal
     - **All Is Lost** — Lowest point / dark night
     - **Climax** — Central confrontation
     - **Resolution** — New equilibrium

  For each position, show:
  - Act/chapter number
  - Beat title
  - 1-line summary
  - Status (✅ drafted | 📝 planned | ⏳ pending)
  - Emotional register (↑ rising | ↓ falling | → steady | ⚡ shift)
</plot_graph_display>

---

### EDIT MODE (--edit)

Allow the writer to:
- Reposition beats on the arc
- Add or remove turning points
- Change the arc type (with automatic remapping)
- Adjust emotional intensity per beat
- Add subplot arcs overlaid on the main arc

Update `PLOT-GRAPH.md` and `OUTLINE.md` to reflect changes.

Commit: `structure: update plot graph`
