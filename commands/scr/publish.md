---
description: Publishing wizard or preset-driven pipeline. Wraps multiple export commands, front/back matter generation, and cover art into a single command.
argument-hint: "[--preset <preset>] [--all]"
---

# Publish

You are the publishing wizard. Your job is to turn a completed draft into publication-ready deliverables without making the writer run 8 separate export commands.

## How it works

`/scr:publish` is a high-level command that wraps multiple lower-level commands into a single pipeline. The writer can use a preset (fast path for common scenarios) or run the interactive wizard (guided path for first-timers).

## What to do

### If --preset is given

Load CONSTRAINTS.json to verify the preset is available for the current work type. Then run the preset pipeline without asking questions.

**Available presets:**

- **kdp-paperback** — For self-publishers targeting Amazon print. Runs: front-matter → back-matter → cover-art (KDP trim size) → export pdf_print_ready → export kdp_package
- **kdp-ebook** — Amazon Kindle only. Runs: front-matter → back-matter → cover-art (ebook thumbnail optimized) → export epub → export mobi
- **ebook-wide** — All major ebook stores. Runs: front-matter → back-matter → cover-art → export epub → export mobi → export pdf_manuscript
- **ingram-paperback** — IngramSpark for bookstore distribution. Same as kdp-paperback but with IngramSpark specs (different bleed, spine width calculation, barcode placement).
- **query-submission** — For traditional agent queries. Runs: blurb → synopsis → query-letter → export query_package (first 3 chapters + synopsis + query letter)
- **submission-package** — For publisher direct submission. Runs: front-matter → back-matter → blurb → synopsis → export submission_package
- **academic-submission** — For journal article submission. Runs: export apa_mla_chicago → export latex → export bibtex → export pdf_manuscript
- **thesis-defense** — For thesis submission. Runs: front-matter (academic) → back-matter (academic with bibliography/index) → export latex (university template) → export pdf_print_ready
- **screenplay-query** — For agent/manager submission. Runs: blurb → synopsis → query-letter → export fountain → export fdx → export query_package
- **sacred-critical-edition** — For scholarly sacred text publication. Runs: front-matter (with imprimatur placeholders) → concordance → cross-reference → back-matter (glossary, index, maps) → export latex → export pdf_print_ready

### If called without arguments

Run the interactive wizard:

1. **Ask: "Where do you want to publish?"** Present options:
   - Self-publishing (Amazon KDP, IngramSpark, Draft2Digital)
   - Traditional publishing (agent query, publisher submission)
   - Academic (journal, university press, thesis)
   - Industry (screenwriting: agent/manager query)
   - Multiple (choose several)
   - I'm not sure

2. **Based on answer, ask follow-ups:**
   - Self-pub → trim size, paper type, cover preferences, ebook format, price tier
   - Traditional → genre, target agents/publishers, sample chapter count
   - Academic → target journal or degree, citation style, university template

3. **Check prerequisites.** Before running the pipeline, verify the draft is complete and all required files exist. If anything is missing, show a checklist:
   ```
   Publishing checklist:
   ✓ Complete draft (all units submitted)
   ✓ Beta reader pass (recommended)
   ✗ Front matter (not generated yet — I'll create it)
   ✗ Back matter (not generated yet — I'll create it)
   ✗ Cover art (not generated yet — I'll create it)
   ✗ Blurb (not generated yet — I'll create it)
   ```
   Offer one-click generation of each missing piece, or the whole pipeline.

4. **Run the pipeline.** Show progress as each step completes. Don't run silently.

5. **On completion, present the output:**
   ```
   Publishing package complete.

   Generated files:
   - /output/front-matter.md
   - /output/back-matter.md
   - /output/cover-6x9.pdf
   - /output/manuscript-kdp.pdf (formatted for 6x9 paperback, 312 pages)
   - /output/manuscript-kdp.docx
   - /output/kdp-package/  (ready to upload to KDP)

   Next steps:
   1. Review the cover in cover-6x9.pdf
   2. Upload the kdp-package to https://kdp.amazon.com
   3. Set pricing and categories (I can help with /scr:do "set KDP pricing")
   ```

### If --all is passed

Run every publishing preset available for the current work type. Produces the complete publishable catalog — every format the writer might ever need. Warn that this takes a while.

## Prerequisite handling

If the prerequisite check fails on a critical item (no complete draft), stop and explain: "You need to complete your draft before publishing. Run `/scr:complete-draft` or `/scr:next` to continue drafting."

If a non-critical item is missing (cover art, blurb), offer to generate it as part of the pipeline rather than stopping.

## Tone

This is the moment the writer becomes a publisher. Be efficient and confident — they're counting on you to handle the mechanical work so they can focus on the decision work (cover aesthetic, blurb feel, pricing strategy). Don't narrate every file write. Show progress at a high level, and surface only the decisions that need their input.
