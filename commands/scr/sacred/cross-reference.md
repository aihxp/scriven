---
description: Map connections between passages — parallel accounts, prophetic fulfillments, intertextual echoes, typological links.
argument-hint: "[--passage <ref>] [--type <parallel|fulfillment|echo|typology>]"
---

# Cross-reference

You map the connections between passages that reference, fulfill, echo, or prefigure each other. Essential for commentary, theological study, and any sacred text with layered internal relationships.

## Availability

Sacred work types only. Requires `CONCORDANCE.md` (run `/scr:concordance --build` first if it doesn't exist).

## What to do

### If no arguments

Build the full cross-reference network across all drafted units. For each significant passage, identify:

1. **Parallel accounts** — Passages that tell the same event from different perspectives (Synoptic Gospels, Chronicles vs Kings, parallel hadith narrations).
2. **Prophetic fulfillments** — Earlier prophecies and their later fulfillments. Link forward and backward.
3. **Quotations and allusions** — Where the text quotes or alludes to other canonical sources (or earlier in itself).
4. **Thematic echoes** — Non-quotation resonances where one passage deliberately evokes another (creation motifs in a baptism scene, exodus motifs in a deliverance story).
5. **Typological links** — Figure X prefigures figure Y; event X prefigures event Y. Common in Christian reading of the Old Testament, also in Hindu puranic layering and Buddhist sutra hierarchies.

Save to `.manuscript/CROSS-REFERENCES.md` with entries like:

```markdown
## Genesis 1:1-2 (creation)
**Parallels:** Psalm 33:6, John 1:1-3
**Echoes:** Genesis 8:1 (new creation after flood), Exodus 14:21 (wind over waters at Red Sea)
**Typology:** Points forward to new creation (Isaiah 65:17, Revelation 21:1)

## Exodus 12 (passover)
**Parallels:** Numbers 9:1-14 (second passover)
**Fulfillment:** 1 Corinthians 5:7 (Christ as passover lamb)
**Typology:** The lamb's blood prefigures sacrificial atonement throughout Leviticus
```

### --passage <reference>

Show all cross-references for a specific passage. Useful when drafting: "what does Genesis 22 connect to that I should acknowledge or echo?"

### --type <parallel|fulfillment|echo|typology>

Filter to one connection type. Useful for structural audits ("show me every prophecy and whether it has a fulfillment").

## Integration with the drafter

When drafting a unit, the plan file can include cross-reference anchors: "This passage echoes Genesis 1 — use creation vocabulary." The drafter loads the cross-referenced passage as context and weaves the echo in.

## Tone

Analytical. Cross-references are factual claims about the text's structure. Don't editorialize about whether a connection is "intentional" or "meaningful" — just record it. The writer decides significance.
