---
description: Generate structured cover art prompts with KDP-compliant dimensions.
argument-hint: "[--kdp <trim_size>] [--series] [--prompt-only] [--element front|spine|back|full-wrap]"
---

# /scr:cover-art -- Cover Art Prompt Generator

Generate detailed, copy-pasteable prompts for book cover art with KDP/IngramSpark-compliant dimensions. Produces prompts for front cover, spine, back cover, and full wrap.

## Usage
```
/scr:cover-art [--kdp <trim_size>] [--series] [--prompt-only] [--element front|spine|back|full-wrap]
```

**Flags:**
- `--kdp <trim_size>` -- Calculate dimensions for KDP trim size (e.g., `6x9`, `5.5x8.5`, `5x8`)
- `--series` -- Apply series visual consistency from ART-DIRECTION.md
- `--prompt-only` -- Generate prompts without dimension calculations
- `--element <element>` -- Generate prompt for a single element only (front, spine, back, full-wrap)

## Instruction

You are a **cover art prompt specialist**. You generate structured, detailed prompts for book cover art that can be copy-pasted into any AI image generation tool.

---

### STEP 1: LOAD CONTEXT

Load the following project files:

- `.manuscript/config.json` -- to get `work_type`, `genre`, `title`, `author`, `page_count`, `paper_type`, `trim_width`, `trim_height`
- Scriven's installed/shared `CONSTRAINTS.json` (global `~/.scriven/data/CONSTRAINTS.json` or project `.scriven/data/CONSTRAINTS.json`) -- to check `commands.cover-art.available` and `commands.cover-art.hidden`
- `.manuscript/WORK.md` -- premise, tone, themes, setting
- `.manuscript/CHARACTERS.md` or `.manuscript/FIGURES.md` -- for character imagery on cover
- `.manuscript/illustrations/ART-DIRECTION.md` -- if it exists, for visual style consistency

**Check availability:**

Look up the current work type's group in CONSTRAINTS.json. If the group is in `commands.cover-art.hidden` (script, academic, interactive, speech_song), inform the writer:

> Cover art is not available for [work_type] projects.

Then **stop**.

---

### STEP 2: DETERMINE GENRE CONVENTIONS (D-02)

Based on the genre from WORK.md and config.json, apply genre-specific cover conventions:

| Genre | Imagery | Color Palette | Typography |
|-------|---------|---------------|------------|
| **Romance** | Couple, intimate pose, scenic backdrop | Warm tones (rose, gold, sunset) | Flowing script or elegant serif, embossed/foil effect |
| **Thriller / Mystery** | Dark silhouette, urban setting, single object | Dark palette, high contrast (black, red, steel blue) | Bold sans-serif, condensed, all-caps |
| **Fantasy** | Sweeping landscape, magical scene, character in action | Rich jewel tones (emerald, sapphire, gold) | Ornate display type, decorative serifs |
| **Sci-Fi** | Space, technology, futuristic city, abstract | Cool metallics (silver, electric blue, neon) | Clean modern sans-serif, geometric |
| **Literary Fiction** | Minimalist, typographic, single symbolic object | Muted palette (cream, sage, dusty blue) | Refined serif, generous whitespace |
| **Children's** | Bright character-focused, whimsical scene | Bright saturated primaries and secondaries | Playful hand-lettered or rounded sans-serif |
| **Horror** | Dark atmospheric, unsettling imagery, isolation | Desaturated with crimson or sickly green accent | Distressed, cracked, or dripping typography |
| **Memoir / Biography** | Author photo or symbolic personal imagery | Warm or muted, personal | Classic serif, understated elegance |
| **Poetry** | Abstract, nature, minimal | Ethereal, soft pastels or stark monocromes | Elegant thin serif or handwritten |
| **Sacred / Religious** | Iconographic, symbolic, light imagery | Gold, deep blue, white, liturgical colors | Traditional serif, formal, reverent |
| **Default / Other** | Derive from WORK.md tone and premise | Derive from genre mood | Derive from formality level |

If genre is not clearly one of the above, derive visual direction from WORK.md tone, themes, and premise.

---

### STEP 3: CALCULATE KDP DIMENSIONS

**If `--kdp` flag is provided or `trim_width`/`trim_height` are in config.json:**

Parse the trim size. Accept formats: `6x9`, `5.5x8.5`, `5x8`, or read from config.json `trim_width` and `trim_height`.

**Default trim size:** 6" x 9" (most common KDP paperback).

Read `page_count` from config.json. If not available, warn:
> **Warning:** No page count found in config.json. Using estimated page count of 250. Update config.json with actual page count for accurate spine width.

Read `paper_type` from config.json (default: `white`).

**Paper thickness factors (per Phase 5 constants):**

| Paper Type | Factor (inches/page) |
|------------|---------------------|
| white      | 0.002252            |
| cream      | 0.0025              |
| color      | 0.0032              |

**Spine width calculation:**

```
spine_width = (page_count * paper_factor) + 0.06
```

Where `0.06` inches is the cover thickness for paperback.

**Spine text rule:** Only include spine text if page_count >= 79 (spine too narrow for readable text below 79 pages).

**Full wrap dimensions:**

```
bleed = 0.125  (inches, on each side)

full_wrap_width  = trim_width + spine_width + trim_width + (bleed * 2)
full_wrap_height = trim_height + (bleed * 2)
```

**Individual element dimensions:**

| Element | Width | Height |
|---------|-------|--------|
| Front cover | trim_width + bleed | trim_height + (bleed * 2) |
| Spine | spine_width | trim_height + (bleed * 2) |
| Back cover | trim_width + bleed | trim_height + (bleed * 2) |
| Full wrap | full_wrap_width | full_wrap_height |

**Print requirements:**
- Resolution: 300 DPI minimum for all print elements
- Color space: RGB for KDP (they convert to CMYK), CMYK for IngramSpark
- File format: PDF or high-resolution PNG/TIFF

---

### STEP 4: SERIES CONSISTENCY (D-03)

**If `--series` flag is provided:**

Load `.manuscript/illustrations/ART-DIRECTION.md`. If it does not exist:
> **ART-DIRECTION.md not found.** Run `/scr:art-direction` first to create the visual style bible, then re-run with `--series`.
> Proceeding without series consistency constraints.

If ART-DIRECTION.md exists, extract and enforce:
- **Color palette:** Use the same primary/secondary/accent colors across series covers
- **Typography style:** Consistent font family, weight, and placement across all books
- **Layout structure:** Same general composition template (e.g., title always top-third, author always bottom)
- **Visual motifs:** Recurring design elements that identify the series
- **Art style:** Same rendering approach (realistic, stylized, etc.)

Include a "Series Consistency Notes" section in each prompt referencing ART-DIRECTION.md constraints.

---

### STEP 5: GENERATE PROMPTS (D-01)

Generate prompts for each cover element using the structured format. Each prompt section uses:

- **Subject:** What is depicted
- **Composition:** Framing, layout, focal point, text placement zones
- **Style:** Art style, rendering technique
- **Color Palette:** Dominant colors, mood colors, specific hex values if from ART-DIRECTION.md
- **Mood:** Emotional tone, atmosphere
- **Technical Specs:** Dimensions (inches), DPI, bleed, color space

---

#### FRONT COVER PROMPT

```markdown
# Front Cover Prompt

## Subject
[Primary imagery derived from genre conventions and WORK.md premise. Include main character(s) if applicable, key symbolic elements, setting hints.]

## Composition
- **Title placement:** [top third / center / bottom third]
- **Author name placement:** [top / bottom]
- **Tagline placement:** [below title / above author / none]
- **Primary imagery focal point:** [center / left-of-center / right-of-center]
- **Negative space for text:** [describe areas reserved for title and author]

## Style
[Art style from genre conventions or ART-DIRECTION.md. Rendering technique, level of detail, texture.]

## Color Palette
[Genre-appropriate palette. Include specific colors with hex values if available.]
- Dominant: [color]
- Supporting: [color]
- Accent: [color]
- Text color: [color for title and author name, must contrast with background]

## Mood
[Emotional atmosphere the cover should convey. Match WORK.md tone.]

## Technical Specs
- Dimensions: [trim_width + bleed]" x [trim_height + bleed x 2]"
- Resolution: 300 DPI minimum
- Bleed: 0.125" on all sides (keep critical content inside safe zone, 0.25" from trim edge)
- Format: High-resolution PNG or PDF
```

---

#### SPINE PROMPT

```markdown
# Spine Prompt

## Subject
- Title: [title from config.json]
- Author: [author from config.json]
- Publisher logo area: [bottom of spine, if applicable]

## Composition
- **Text orientation:** Vertical, reading top-to-bottom (US/UK convention) or bottom-to-top (EU convention)
- **Title position:** Upper portion of spine
- **Author position:** Lower portion of spine
- **Spacing:** Even distribution with breathing room

## Style
[Match front cover typography. Simple, readable at small size.]

## Color Palette
- Background: [match front cover dominant or secondary color]
- Text: [high contrast against background]

## Mood
[Continuation of front cover atmosphere]

## Technical Specs
- Width: [spine_width]" (calculated: [page_count] pages x [paper_factor]"/page + 0.06" cover)
- Height: [trim_height + bleed x 2]"
- Resolution: 300 DPI minimum
- Spine text: [Yes -- include text / No -- spine too narrow (under 79 pages)]
- Font size: [calculated based on spine width; typically 8-12pt for readable spine text]
```

---

#### BACK COVER PROMPT

```markdown
# Back Cover Prompt

## Subject
- **Blurb text area:** [upper two-thirds of back cover]
- **Author photo area:** [optional, bottom-left, approximately 1.5" x 2"]
- **Endorsement quotes area:** [above or below blurb, 1-2 pull quotes]
- **Barcode placement zone:** Bottom-right, 2" x 1.25" (ISBN barcode -- DO NOT place design elements here)

## Composition
- **Blurb block:** Centered or left-aligned, occupying upper 60-70% of back cover
- **Author bio snippet:** Below blurb, 2-3 sentences
- **Barcode zone:** Fixed bottom-right, 2" wide x 1.25" tall, white background required
- **Background treatment:** [subtle continuation of front cover imagery / solid color / gradient / texture]

## Style
[Match front cover style. Simpler, text-focused. Background should not compete with text readability.]

## Color Palette
- Background: [complement front cover, ensure text readability]
- Blurb text: [high contrast, typically dark on light or light on dark]
- Quote text: [slightly different weight or style from blurb]

## Mood
[Inviting, intriguing -- the back cover sells the book]

## Technical Specs
- Dimensions: [trim_width + bleed]" x [trim_height + bleed x 2]"
- Resolution: 300 DPI minimum
- Bleed: 0.125" on all sides
- Barcode zone: 2" x 1.25" at bottom-right (clear of bleed area)
```

---

#### FULL WRAP PROMPT

```markdown
# Full Wrap Cover Prompt

## Subject
[Combined front + spine + back as a single continuous image or design. Describe how the visual flows across the full wrap.]

## Composition
- **Front cover (right side):** [primary imagery and title zone]
- **Spine (center strip):** [title and author, [spine_width]" wide]
- **Back cover (left side):** [blurb zone, barcode zone, author photo zone]
- **Visual continuity:** [how the image/design connects across all three sections]
- **Bleed extension:** 0.125" beyond trim on all four edges

## Style
[Unified style across all three sections. Single scene/design that wraps around.]

## Color Palette
[Consistent palette across the full wrap. Gradient or scene that transitions naturally.]

## Mood
[Single cohesive atmosphere across the entire cover]

## Technical Specs
- Total width: [full_wrap_width]" ([trim_width]" + [spine_width]" + [trim_width]" + 0.25" bleed)
- Total height: [full_wrap_height]" ([trim_height]" + 0.25" bleed)
- Spine width: [spine_width]"
- Trim size: [trim_width]" x [trim_height]"
- Resolution: 300 DPI minimum
- Bleed: 0.125" on all four sides
- Color space: RGB for KDP, CMYK for IngramSpark
- Safe zone: Keep critical content 0.25" inside trim edges
```

---

### STEP 6: SAVE OUTPUT

Create the output directory:
```bash
mkdir -p .manuscript/illustrations/cover
```

**If `--element` flag is specified:** Save only the requested element's prompt:
- `--element front` -> `.manuscript/illustrations/cover/front-cover-prompt.md`
- `--element spine` -> `.manuscript/illustrations/cover/spine-prompt.md`
- `--element back` -> `.manuscript/illustrations/cover/back-cover-prompt.md`
- `--element full-wrap` -> `.manuscript/illustrations/cover/full-wrap-prompt.md`

**If no `--element` flag:** Save all four prompts as individual files AND a combined file:
- `.manuscript/illustrations/cover/front-cover-prompt.md`
- `.manuscript/illustrations/cover/spine-prompt.md`
- `.manuscript/illustrations/cover/back-cover-prompt.md`
- `.manuscript/illustrations/cover/full-wrap-prompt.md`
- `.manuscript/illustrations/cover/cover-prompts-combined.md` (all four in one file)

Commit: `cover-art: generate cover prompts`

---

### STEP 7: REPORT

After generating prompts, report:

1. **Files created** with paths
2. **Dimensions summary:**
   - Trim size: [w]" x [h]"
   - Spine width: [w]" ([page_count] pages, [paper_type] paper)
   - Full wrap: [w]" x [h]"
3. **Genre conventions applied:** [genre] style
4. **Series consistency:** Applied / Not applied
5. **Next steps:**
   - "Use these prompts with your preferred AI image tool (GPT Image, Stable Diffusion, Midjourney, etc.)"
   - "For series consistency, run `/scr:art-direction` first, then `/scr:cover-art --series`"

---

### Edge Cases

- **No page count in config.json:** Use 250 as default estimate, warn the writer
- **Page count under 79:** Spine prompt notes that spine text is not recommended; generate a minimal spine prompt
- **No genre specified:** Derive visual direction from WORK.md tone and premise; default to literary fiction conventions
- **Sacred work type:** Apply sacred/religious genre conventions (iconographic, gold/blue palette, formal serif)
- **Poetry collection:** Available for poetry; use minimalist/abstract conventions
- **--series without ART-DIRECTION.md:** Warn and proceed without series constraints
- **--prompt-only flag:** Skip dimension calculations, generate pure visual prompts without technical specs
- **Unknown trim size format:** List valid formats: `6x9`, `5.5x8.5`, `5x8`, `8.5x11`
