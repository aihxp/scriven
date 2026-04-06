# Domain Pitfalls

**Domain:** Creative writing CLI tool / AI agent skill system with export, illustration, translation, and npm publishing
**Project:** Scriven
**Researched:** 2026-04-06

---

## Critical Pitfalls

Mistakes that cause rewrites, broken releases, or fundamental trust loss.

### Pitfall 1: npm Package That Doesn't Work on First `npx` Run

**What goes wrong:** User runs `npx scriven@latest` and it fails silently, throws a shebang error, or installs but doesn't copy files correctly. First impression is destroyed. CLI tools have near-zero second-chance tolerance -- if the first run fails, the user moves on.

**Why it happens:**
- Missing or malformed shebang (`#!/usr/bin/env node`) in `bin/install.js` -- npx compares the shebang string exactly, and even extra spaces break detection
- The `files` field in package.json omits directories that the installer needs (commands/, agents/, templates/, data/)
- The `bin` field points to a file that assumes a working directory or relative path that doesn't hold when invoked via npx
- npm classic tokens were permanently revoked in December 2025; CI/CD publishing pipelines using old tokens silently fail

**Consequences:** Zero adoption. npm packages get one shot at a first install experience. A broken `npx` command means the user never sees Voice DNA, never sees the writing pipeline, never returns.

**Prevention:**
1. Run `npm pack --dry-run` before every publish to verify the tarball includes all needed files
2. Test the exact `npx scriven@latest` flow in a clean directory with no local node_modules
3. Ensure shebang is exactly `#!/usr/bin/env node\n` with no variations
4. Use OIDC Trusted Publishing for CI/CD (npm's new standard post-2025 token deprecation)
5. Add a `postinstall` or startup self-test that verifies all expected directories were copied
6. Pin `engines.node` to `>=18.0.0` and test on Node 18, 20, and 22

**Detection:** Warning signs include: installer works locally but not via npx; works on macOS but not Linux/Windows; `npm pack` output doesn't list all files; CI publish succeeds but `npx` install fails.

**Phase:** Pre-Phase 5 (npm readiness is listed as Active in PROJECT.md and should be addressed before export features ship)

---

### Pitfall 2: Export Formats That Look Right in Preview but Fail on Platform Upload

**What goes wrong:** Generated EPUB fails EPUBCheck validation and gets rejected by Apple Books, Kobo, or Draft2Digital. DOCX manuscript lacks proper Shunn formatting and looks amateur when agents/editors open it. KDP package gets rejected for cover dimension mismatches.

**Why it happens:**
- EPUB requires strict W3C compliance (EPUBCheck is the gold standard validator). Common failures: missing manifest items, duplicate IDs, incomplete table of contents, unembedded fonts, missing metadata fields
- DOCX export via Pandoc uses default styling unless you provide a custom reference.docx -- the default is NOT manuscript format (double-spaced, Courier/Times, 1-inch margins, header with author/title/page)
- KDP cover dimensions depend on interior page count and paper type (white: 0.002252"/page, cream: 0.0025"/page). Spine width = (page count x paper thickness) + 0.06". Being off by 0.1" causes rejection
- Platform-specific requirements differ: KDP wants PDF/X-1a for print, Apple Books has its own EPUB metadata requirements, IngramSpark needs different bleed settings than KDP

**Consequences:** Writer completes their book in Scriven, tries to publish, gets a cryptic rejection. They blame Scriven, not the platform. Trust in the entire pipeline collapses at the finish line -- the worst possible moment.

**Prevention:**
1. Run EPUBCheck programmatically as a validation step before declaring export complete
2. Ship a custom Pandoc reference.docx that implements Shunn's Proper Manuscript Format (there's an open-source template at prosegrinder/pandoc-templates)
3. Implement the exact KDP spine formula with page-count-dependent calculation, not a static value
4. Enforce the 79-page minimum before adding spine text to covers
5. Build platform-specific validation checklists that run automatically (KDP package checker, EPUB validator, IngramSpark spec checker)
6. Include 0.125" bleed on all sides for KDP covers as a non-negotiable default

**Detection:** Export commands that produce output without validation steps. Any export that doesn't have a corresponding "check" step is a ticking time bomb.

**Phase:** Phase 5 (Front/Back Matter + Publishing Pipeline). Every export format must ship with its validator.

---

### Pitfall 3: Voice DNA Drift During Multi-Format Export

**What goes wrong:** The voice fidelity that Scriven promises through its Voice DNA system degrades when AI generates front matter, back matter, blurbs, synopses, and query letters. These generated pieces sound generic and AI-ish because they don't load STYLE-GUIDE.md.

**Why it happens:** Export-adjacent generation (blurbs, author bios, acknowledgments, synopses) feels like "utility text" so developers skip loading the voice profile. But readers encounter these texts first -- the blurb sells the book, the author bio builds trust. If these sound like ChatGPT wrote them, the entire product's promise is undermined.

**Consequences:** The core value proposition ("Drafted prose sounds like the writer, not like AI") is violated in the most visible parts of the book. A generic-sounding blurb on Amazon kills sales regardless of how good the interior prose is.

**Prevention:**
1. Enforce the same "fresh context per atomic unit with STYLE-GUIDE.md loaded" pattern for ALL generated text, including front/back matter, blurbs, synopses, and query letters
2. Add voice-check validation as a post-generation step for every publishable text
3. Mark the blurb/synopsis generators in CONSTRAINTS.json as requiring voice profile loading
4. Include voice fidelity in the publishing wizard checklist: "Does your blurb sound like you?"

**Detection:** Any generation command that doesn't reference STYLE-GUIDE.md loading in its agent prompt. Grep agent prompts for style guide references -- missing ones are bugs.

**Phase:** Phase 5 (blurb/synopsis generators) and should be a constraint checked at code review for every new generation command.

---

### Pitfall 4: Illustration Pipeline That Generates Inconsistent Characters

**What goes wrong:** AI-generated illustrations show the protagonist with different hair color, clothing, or features across chapters. Character reference sheets exist but aren't loaded into each illustration prompt. Cover art doesn't match interior illustrations.

**Why it happens:**
- AI image generation models don't maintain state between calls -- each generation is independent
- Character reference sheets (CHARACTERS.md visual descriptions) aren't systematically included in every image prompt
- Different illustration types (cover, interior, chapter headers) use different prompt structures and may omit character details
- AI models still struggle with anatomical consistency, text rendering, and maintaining specific visual details across multiple generations

**Consequences:** Visual inconsistency breaks immersion, especially in children's books and comics where illustrations are the primary content. A character who looks different on every page is unshippable.

**Prevention:**
1. Build a visual consistency system: every illustration prompt must include the character reference sheet for all depicted characters
2. Generate character reference sheets FIRST (front view, side view, key details) and require approval before any scene illustrations
3. Include a "visual continuity check" step that shows all illustrations of a character side-by-side before finalizing
4. For children's books/comics, enforce a strict art direction document that locks visual style, color palette, and character models before any illustration work begins
5. Always include human review in the illustration pipeline -- never auto-approve generated images

**Detection:** Illustration commands that don't load character visual descriptions. Art generation without a prior approved reference sheet step.

**Phase:** Phase 6 (Illustration & Cover Art). Character reference sheets must be the FIRST feature built, not an afterthought.

---

## Moderate Pitfalls

### Pitfall 5: Translation That Flattens Creative Voice

**What goes wrong:** AI translation produces grammatically correct but creatively dead text. Wordplay, idioms, cultural references, and the writer's distinctive voice are lost. A punchy English slogan becomes flat and literal in French. Research shows up to 47% of contextual meaning is lost in machine translation due to cultural misinterpretation.

**Why it happens:** AI translation models predict the most common way something has been said, not the best way. They aren't creative -- they optimize for statistical likelihood, which produces bland, safe translations. Creative writing relies heavily on voice, rhythm, and cultural resonance that don't transfer literally.

**Prevention:**
1. Frame translation as a two-step process: AI draft + human review (89% of companies using AI translation still require human review)
2. Build translation memory that preserves approved translations of recurring phrases, character names, and invented terms
3. Implement back-translation verification: translate back to source language and flag passages where meaning drifts significantly
4. Cultural adaptation must be a separate explicit step, not folded into translation -- different markets need different references
5. Load STYLE-GUIDE.md into translation prompts so the AI attempts to preserve voice characteristics
6. For sacred/historical texts: implement formal vs. dynamic equivalence as explicit modes, not a single approach

**Detection:** Translation output that reads like Google Translate -- technically correct, creatively empty. Back-translation that diverges significantly from the source.

**Phase:** Phase 7 (Translation & Multi-Language). Back-translation verification should be built alongside the primary translation, not as a later addition.

---

### Pitfall 6: RTL and CJK Support Treated as a Styling Afterthought

**What goes wrong:** Arabic, Hebrew, Farsi, and CJK (Chinese/Japanese/Korean) text renders incorrectly in exports. RTL text appears mirrored, bidirectional text mixing (e.g., Arabic with embedded English) breaks word order, CJK line breaks occur mid-character. PDFKit doesn't support RTL at all. jsPDF's BiDi implementation is partial.

**Why it happens:** RTL/CJK support is fundamentally different from LTR text handling, not just a CSS `direction: rtl` toggle. It requires: proper BiDi algorithm implementation, different page layouts (binding on the right), different pagination direction, font embedding with full Unicode support, and different line-breaking rules. Most JavaScript PDF/EPUB libraries have incomplete or broken RTL support.

**Prevention:**
1. Choose export libraries with verified RTL support from the start -- don't assume libraries handle it
2. Test with real Arabic/Hebrew/CJK content early, not as a Phase 7 afterthought
3. For EPUB: use proper `dir="rtl"` and `writing-mode` CSS properties, and validate with EPUBCheck
4. For PDF: evaluate libraries specifically for BiDi support before committing (pdfkit has an open issue since 2015 with no resolution)
5. Sacred text templates (Quranic, Torah, etc.) MUST have RTL support -- this isn't optional for those work types
6. Build RTL test fixtures as part of the test suite, not manual testing

**Detection:** No RTL test content in the test suite. Export libraries chosen without checking BiDi support status. Sacred text work types that don't flag RTL as a requirement.

**Phase:** Phase 7, but library selection in Phase 5 must account for RTL needs. Choosing a PDF library in Phase 5 that can't do RTL means a rewrite in Phase 7.

---

### Pitfall 7: Pandoc as a Hidden System Dependency

**What goes wrong:** Export commands silently fail or produce errors because the user doesn't have Pandoc installed. Scriven's architecture is "no runtime dependencies beyond Node.js" but multi-format export almost certainly requires Pandoc (or LibreOffice for DOCX-to-PDF).

**Why it happens:** Pandoc is the standard tool for Markdown-to-DOCX/PDF/EPUB conversion and is extremely capable. But it's a system-level binary, not an npm package. Installing it requires Homebrew (macOS), apt (Linux), or Chocolatey (Windows) -- all outside npm's control.

**Consequences:** Non-technical writers (a primary persona) hit "pandoc: command not found" and have no idea what to do. This directly contradicts the "writer-friendly" design principle.

**Prevention:**
1. Detect Pandoc at export time and provide clear installation instructions per platform
2. Consider pure-JS alternatives for simple conversions (docx library for DOCX generation, epubjs for EPUB) to avoid the Pandoc dependency for common cases
3. If Pandoc is required, add it to `/scr:publish` prerequisite checklist with a one-command install suggestion
4. Document the dependency explicitly -- don't let users discover it at export time
5. Explore whether the AI agent itself can generate DOCX/EPUB structure directly (it's XML under the hood) for simple cases

**Detection:** Export commands that shell out to `pandoc` without checking if it's installed first. No mention of system dependencies in installation docs.

**Phase:** Phase 5 (Export pipeline). Decision on Pandoc vs. pure-JS must be made at the start of Phase 5, not discovered mid-implementation.

---

### Pitfall 8: Publishing Wizard That Overwhelms Non-Technical Writers

**What goes wrong:** The publish command exposes too many options (KDP, IngramSpark, D2D, Apple Books, submission packages, query packages) and the writer freezes. Or worse, the wizard asks questions the writer can't answer ("What trim size? What paper type? What DPI for your cover?").

**Why it happens:** Self-publishing has genuinely complex requirements, and developers tend to expose all options rather than curating sensible defaults. The product plan already identifies "publishing pipeline overwhelm" as a medium risk.

**Prevention:**
1. Implement publishing presets as the PRIMARY interface (`--preset kdp-paperback`, `--preset ebook-wide`, `--preset query-submission`) with sane defaults for every option
2. The bare `/scr:publish` command should ask ONE question: "Where do you want to publish?" and derive everything else
3. Hide advanced options behind `--advanced` flag, not in the default flow
4. Pre-fill everything derivable: trim size from genre conventions, paper type defaults to white, cover dimensions calculated from page count
5. Show a checklist of what's ready vs. what's missing BEFORE starting the pipeline

**Detection:** Publish wizard that asks more than 3 questions in the default flow. Export options that require publishing industry knowledge to answer.

**Phase:** Phase 5. Preset system must be designed before individual export formats are built.

---

## Minor Pitfalls

### Pitfall 9: Cover Art Spine Width Calculated at Generation Time, Not Dynamically

**What goes wrong:** Cover art is generated early (Phase 6) but the interior page count changes during editing. The spine width is now wrong, and the cover must be regenerated.

**Prevention:** Never bake spine width into cover art until final export. Store cover art as front/back panels + spine separately. Calculate spine width at export time from the actual page count. Display a warning if page count changes after cover generation.

**Phase:** Phase 6 (Illustration). Architecture decision: cover components must be modular, not a single fused image.

---

### Pitfall 10: Translation Memory Without Version Tracking

**What goes wrong:** Source text is revised after translation. Translation memory still maps to old source segments. Translator (human or AI) doesn't know which segments are stale.

**Prevention:** Link translation memory entries to source text hashes. When source text changes, flag affected translations as "needs review" automatically. Never silently serve stale translations.

**Phase:** Phase 7 (Translation). Translation memory design must include version awareness from day one.

---

### Pitfall 11: EPUB/DOCX Export Without Front/Back Matter Integration

**What goes wrong:** Export produces the manuscript body but omits or misorders front matter (title page, copyright, dedication, table of contents) and back matter (author bio, also-by, acknowledgments). The exported file looks incomplete.

**Prevention:** Export commands must assemble the full book, not just the manuscript body. The export pipeline should check which front/back matter files exist and include them in the correct order per publishing conventions. Missing required elements (title page, copyright page) should trigger warnings.

**Phase:** Phase 5. Front/back matter templates must be built before export commands, and export must be designed to consume them.

---

### Pitfall 12: Multi-Runtime Installer Fragility

**What goes wrong:** The installer works for Claude Code but breaks for Cursor, Gemini CLI, or future runtimes because each has different skill/command installation paths, directory structures, and configuration formats.

**Prevention:** Abstract the runtime-specific installation logic behind a clean interface. Test the installer on every supported runtime before each release. Use a runtime detection + adapter pattern rather than if/else chains. Keep runtime-specific code isolated so adding a new runtime is a mechanical task.

**Phase:** Already partially addressed (installer exists for 3 runtimes). Must be regression-tested when new commands are added in any phase.

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| npm publish readiness | Broken `npx` first-run experience | Test in clean environments; `npm pack --dry-run` before every publish |
| Demo sample project | Demo content feels generic, doesn't showcase Voice DNA | Use a distinctive voice in the demo story; include before/after voice comparison |
| Export: DOCX | Default Pandoc output isn't manuscript format | Ship custom reference.docx with Shunn formatting |
| Export: EPUB | Fails EPUBCheck validation | Run EPUBCheck programmatically as part of export |
| Export: PDF | System dependency on Pandoc or LibreOffice | Detect dependencies; provide clear install instructions; explore pure-JS alternatives |
| Export: KDP package | Cover dimensions wrong for page count | Calculate spine dynamically; validate against KDP formula |
| Illustration | Inconsistent character appearance across images | Character reference sheets required before scene illustrations |
| Cover art | Spine width baked in too early | Modular cover components; recalculate at export time |
| Translation | Creative voice lost in translation | Two-step process; back-translation verification; voice profile in prompts |
| RTL/CJK support | Export libraries don't support bidirectional text | Verify library BiDi support BEFORE committing to a library in Phase 5 |
| Sacred texts | Doctrinal sensitivity in translation | Formal/dynamic equivalence as explicit modes; human review gates |
| Multi-format export | Front/back matter omitted or misordered | Export assembles full book; checks for required elements |
| Publishing wizard | Too many options overwhelm writers | Presets as primary interface; one question to start |

---

## Sources

- [Publishing Your First NPM Package (DEV Community)](https://dev.to/mir_mursalin_ankur/publishing-your-first-npm-package-a-real-world-guide-that-actually-helps-4l4)
- [Best practices for building CLI and publishing to NPM](https://webbylab.com/blog/best-practices-for-building-cli-and-publishing-it-to-npm/)
- [npm Classic Tokens to OIDC Trusted Publishing](https://dev.to/zhangjintao/from-deprecated-npm-classic-tokens-to-oidc-trusted-publishing-a-cicd-troubleshooting-journey-4h8b)
- [npm publish bin field issues (GitHub #7302)](https://github.com/npm/cli/issues/7302)
- [Top 10 eBook Validation Errors (Foglio)](https://www.foglioprint.com/blog/top-10-ebook-validation-errors-and-how-we-fix-them/)
- [EPUB Validation Fix Common Errors (WP Author Box)](https://wpauthorbox.com/epub-validation-fix-common-errors-fast/)
- [How to Validate EPUB Before Upload (ebookpbook)](https://www.ebookpbook.com/2026/03/22/validate-epub-before-upload/)
- [KDP Spine Width Calculator Guide](https://www.kdpeasy.com/blog/spine-width-calculator-guide)
- [KDP Cover Templates & Bleed (bookcoverslab)](https://bookcoverslab.com/kdp-cover-templates)
- [Convert Markdown to Manuscript Format with Pandoc](https://www.autodidacts.io/convert-markdown-to-standard-manuscript-format-odts-docs-and-pdfs-with-pandoc/)
- [Pandoc Manuscript Templates (prosegrinder)](https://github.com/prosegrinder/pandoc-templates)
- [AI Translation: The Markup on Literary Translation](https://themarkup.org/artificial-intelligence/2025/04/02/are-ai-models-advanced-enough-to-translate-literature-the-debate-is-roiling-publishing)
- [AI Translation Quality Gaps 2025 (Avantpage)](https://avantpage.com/blog/ai-language-translation-gaps/)
- [Acolad 2025 Translators Survey on AI](https://www.acolad.com/en/services/translation/ai-translation-impact)
- [PDFKit RTL Support Issue #219](https://github.com/foliojs/pdfkit/issues/219)
- [RTL EPUB Export Issues (Adobe Community)](https://community.adobe.com/t5/indesign-discussions/two-major-issues-with-exporting-arabic-farsi-books-into-epub/td-p/12800308)
- [AI Image Generation Mistakes (God of Prompt)](https://www.godofprompt.ai/blog/10-ai-image-generation-mistakes-99percent-of-people-make-and-how-to-fix-them)
- [6 AI Image Generator Mistakes 2025 (AllAboutAI)](https://www.allaboutai.com/resources/ai-image-generator-mistakes/)
