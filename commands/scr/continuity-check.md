# /scr:continuity-check — Scan for Narrative Contradictions

Automated continuity verification across the manuscript.

## Usage
```
/scr:continuity-check [N]
```

If `N` is provided, checks only Act N against previous acts. Otherwise checks entire manuscript.

## Instruction

Spawn a continuity analysis agent that reads all drafted scenes and checks:

<continuity_checks>
  <check name="character_consistency">
    - Physical descriptions match across scenes (eye color, height, scars, etc.)
    - Character names are spelled consistently
    - Age references are consistent with timeline
    - Skills/abilities don't appear or disappear without explanation
    - Knowledge: characters only know what they've been told or witnessed
    - Emotional states follow logically from preceding events
  </check>

  <check name="timeline_logic">
    - Days of the week and dates are consistent
    - Travel time between locations is realistic
    - Seasonal references match the timeline
    - Character ages align with time jumps
    - "Three days ago" type references check out
    - Meals, sleep, and time-of-day references are consistent
  </check>

  <check name="object_tracking">
    - Props and objects are where they should be
    - If a character picks up an item, it's tracked
    - Vehicles, weapons, keys, phones — all accounted for
    - Clothing changes are consistent with context
    - Food/drink orders match what's consumed
  </check>

  <check name="spatial_consistency">
    - Room layouts don't change between scenes
    - Geographic distances are maintained
    - Characters move logically between locations
    - Building/space descriptions are consistent
    - Left/right, north/south orientations hold
  </check>

  <check name="information_flow">
    - Characters don't reference information they haven't received
    - Secrets stay secret until revealed
    - Dramatic irony is intentional, not accidental
    - "As you know, Bob" violations flagged
    - Overheard conversations: who could realistically hear what
  </check>

  <check name="world_rules">
    - Magic/technology systems follow established rules
    - Social norms are consistently applied
    - Economic realities are consistent
    - Laws of physics respected (or consistently broken in speculative fiction)
  </check>
</continuity_checks>

### OUTPUT

Generate a continuity report with:
- ✅ Areas that check out
- ⚠️ Minor inconsistencies (easy fixes)
- ❌ Major contradictions (require scene revision)

For each issue:
- What the contradiction is
- Where it appears (file, paragraph reference)
- What the established fact was and where it was established
- Suggested fix

Save to `.manuscript/{act_num}-CONTINUITY-REPORT.md` or `.manuscript/FULL-CONTINUITY-REPORT.md`
