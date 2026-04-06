# Technology Stack

**Project:** Scriven -- Creative Writing, Publishing, and Translation Pipeline
**Researched:** 2026-04-06

## Architecture Constraint

Scriven is a **pure markdown skill system** with no runtime dependencies. The AI agent (Claude Code, Cursor, Gemini CLI) reads command markdown and executes shell commands. This means:

- Export tools are **external CLI binaries** the agent invokes via shell, not npm dependencies
- The agent generates intermediate files (markdown, HTML, Typst) then calls converters
- Scriven's `package.json` stays dependency-free; tools are prerequisites the user installs
- The installer (`bin/install.js`) should detect and guide installation of prerequisites

This stack document therefore describes **what the agent's command markdown should invoke**, not what to `npm install`.

---

## Recommended Stack

### Document Conversion Engine

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| **Pandoc** | 3.9.x (current: 3.9.0.2) | Universal document converter | De facto standard for markdown-to-anything. Handles EPUB, DOCX, PDF, LaTeX, Typst, HTML. One tool covers 80% of export needs. Actively maintained, massive ecosystem of filters and templates. | HIGH |

**Installation:** `brew install pandoc` (macOS), `apt install pandoc` (Linux), `choco install pandoc` (Windows), or download from pandoc.org.

Pandoc is the backbone. Every export command should check for `pandoc --version` and guide installation if missing.

### PDF Generation

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| **Typst** | 0.14.x | PDF engine for Pandoc | 27x faster than XeLaTeX. Clean syntax. Generates accessible PDF/UA-1 by default (critical for 2025 EAA and 2026 ADA compliance). No massive TeX Live installation required. Pandoc supports `--pdf-engine=typst` natively. | HIGH |
| **XeLaTeX** (fallback) | TeX Live 2025 | Academic/math-heavy PDF | Only needed if Typst cannot handle specialized mathematical notation or journal-specific LaTeX templates. Most creative writing does not need this. | MEDIUM |

**Primary command:** `pandoc manuscript.md --pdf-engine=typst -o manuscript.pdf --template=scriven-book.typst`

**Why Typst over LaTeX:** LaTeX requires a 4-6 GB TeX Live installation. Typst is a single ~30 MB binary. For a tool targeting writers (not academics), the install burden matters enormously. Typst 0.14 added accessibility compliance, removing the last major gap.

**Why not WeasyPrint/wkhtmltopdf:** HTML-to-PDF tools produce web-quality output, not print-quality typesetting. Books need proper kerning, ligatures, widow/orphan control, and gutter margins. Typst handles all of these.

### EPUB Generation

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| **Pandoc** (built-in) | 3.9.x | EPUB 3 generation | Pandoc's EPUB output is production-quality. Supports custom CSS, metadata, cover images, table of contents. Used by published authors and small presses. No additional tool needed. | HIGH |

**Command:** `pandoc manuscript.md -o book.epub --epub-cover-image=cover.jpg --css=scriven-epub.css --toc --metadata-file=metadata.yaml`

**Why not epub-gen-memory (npm):** It generates EPUB from HTML fragments -- workable but inferior to Pandoc's native EPUB pipeline which handles metadata, TOC, accessibility, and KDP validation requirements out of the box. Adding an npm dependency violates Scriven's architecture constraint.

### DOCX Generation

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| **Pandoc** (built-in) | 3.9.x | Manuscript DOCX and formatted DOCX | Supports reference documents (`.docx` templates) for both standard manuscript format (12pt Courier, double-spaced) and formatted/designed output. | HIGH |

**Manuscript format:** `pandoc manuscript.md -o manuscript.docx --reference-doc=scriven-manuscript.docx`
**Formatted:** `pandoc manuscript.md -o formatted.docx --reference-doc=scriven-formatted.docx`

Scriven should ship two reference `.docx` templates: one for standard manuscript submission format, one for designed/formatted output.

### Screenplay Formats (Fountain + FDX)

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| **Afterwriting CLI** | 1.8.x | Fountain to PDF | Node.js-based, npm-installable (`npm i -g afterwriting`). Generates industry-standard screenplay PDFs with page numbers, scene headers, proper formatting. Also provides screenplay statistics. | MEDIUM |
| **Screenplain** | 0.9.x | Fountain to FDX + HTML | Python-based (`pip install screenplain`). Only reliable open-source Fountain-to-FDX converter. FDX is Final Draft's XML format -- essential for screenplay submission. | MEDIUM |

**Fountain to PDF:** `afterwriting --source screenplay.fountain --pdf screenplay.pdf`
**Fountain to FDX:** `screenplain --format fdx screenplay.fountain screenplay.fdx`

**Why two tools:** No single tool handles both PDF and FDX well. Afterwriting produces better PDFs; Screenplain is the only reliable FDX converter. Both are MIT-licensed.

**Why MEDIUM confidence:** Both projects have sporadic maintenance. Afterwriting's last npm publish was 2020 (v1.8.0), though the GitHub repo has more recent commits. Screenplain is similarly quiet. They work, but monitor for breakage. If either dies, the fallback is Pandoc with custom Lua filters for basic screenplay formatting.

### LaTeX Output

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| **Pandoc** (built-in) | 3.9.x | Markdown to LaTeX source | For academic writers who need `.tex` files to submit to journals or further edit in Overleaf. Pandoc generates clean LaTeX with customizable templates. | HIGH |

**Command:** `pandoc manuscript.md -o manuscript.tex --template=scriven-academic.latex`

This outputs `.tex` source, not compiled PDF. Academic users compile it themselves or upload to Overleaf.

### Publishing Platform Packages

| Platform | Format Required | How Scriven Produces It | Confidence |
|----------|----------------|------------------------|------------|
| **KDP (ebook)** | EPUB or DOCX | Pandoc EPUB with KDP-specific CSS (alt text on all images, embedded fonts) | HIGH |
| **KDP (print)** | PDF (no marks, embedded fonts, 300dpi images) | Pandoc + Typst with KDP trim size template (e.g., 6x9, 5.5x8.5), 0.25" extra height, 0.125" extra width for bleed | HIGH |
| **IngramSpark** | PDF/X-1a (CMYK, bleeds, full-wrap cover) | Pandoc + Typst for interior; cover requires separate full-wrap PDF. CMYK conversion via ImageMagick or Ghostscript. | MEDIUM |
| **Submission/Query** | DOCX (standard manuscript format) | Pandoc with manuscript reference doc | HIGH |

**IngramSpark caveat:** PDF/X-1a with CMYK is harder to automate than KDP's simpler requirements. Ghostscript can convert RGB PDF to CMYK PDF/X-1a: `gs -dPDFA -dBATCH -dNOPAUSE -sColorConversionStrategy=CMYK -sDEVICE=pdfwrite -o output.pdf input.pdf`. This needs testing. MEDIUM confidence.

---

## Illustration Generation (AI Image APIs)

| Technology | Purpose | Why | Confidence |
|------------|---------|-----|------------|
| **OpenAI GPT Image 1.5 API** | Primary illustration engine | Best text instruction following of any image API. Natively multimodal (understands story context). $0.02-0.08 per image at medium quality. Available via standard OpenAI API key that Claude Code users likely already have. | HIGH |
| **GPT Image 1 Mini** | Budget/draft illustrations | $0.005/image. Good for concept art, character reference sheets, storyboard thumbnails. Use for iteration before final quality. | HIGH |
| **Stable Diffusion (via API)** | Style-consistent illustration sets | Open-source. LoRA fine-tuning allows training on a specific art style for consistent illustration across a book. Best for children's books / comics needing visual consistency. Requires more setup. | MEDIUM |

**Why not Midjourney:** No public API as of April 2026. Midjourney is Discord-bot or web-only. Cannot be invoked programmatically from a CLI tool. Explicitly excluded.

**Why not DALL-E 3:** Deprecated. DALL-E 2 and 3 APIs sunset May 2026. GPT Image 1.5 is the replacement.

### Illustration Pipeline Architecture

The agent should:
1. Generate art direction from manuscript context (character descriptions, scene details)
2. Create structured prompts with style parameters (medium, palette, composition)
3. Call the image API via `curl` or the OpenAI CLI
4. Save images with metadata (prompt used, chapter reference, character depicted)
5. Offer revision workflow (refine prompt, regenerate, select from variants)

**API invocation** (agent runs this):
```bash
curl https://api.openai.com/v1/images/generations \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gpt-image-1.5","prompt":"...","size":"1024x1536","quality":"medium"}'
```

The command markdown describes the workflow; the AI agent constructs and executes the API call.

---

## Translation Pipeline

| Technology | Purpose | Why | Confidence |
|------------|---------|-----|------------|
| **DeepL API Pro** | Primary translation engine for European languages | Higher quality than Google for EN/FR/DE/ES/IT/PT/NL/PL/JA/ZH/KO. GDPR-compliant, content not stored or used for training. $5.49/mo + $25/M chars. | HIGH |
| **Google Cloud Translation (v3)** | Broad language coverage, RTL/CJK | 130+ languages vs DeepL's 33. Required for Arabic, Hebrew, Hindi, Swahili, and other languages DeepL doesn't cover. NMT at $20/M chars, LLM mode at $10+$10/M chars. | HIGH |
| **AI Agent (Claude/GPT)** | Cultural adaptation, sacred text translation | Machine translation APIs don't handle literary nuance, sacred registers, or cultural adaptation. The AI agent itself is the best tool for these -- it can apply voice profiles, maintain glossaries, and do formal/dynamic equivalence translation. | HIGH |

### Translation Strategy

**Tier 1 -- Literary translation (recommended):** Use the AI agent itself. Load source text + voice profile + glossary + cultural notes. The agent translates with literary quality. Slow but high quality. Best for novels, poetry, sacred texts.

**Tier 2 -- Accelerated translation:** Use DeepL/Google API for first pass, then AI agent for literary polish and cultural adaptation. 3-5x faster than pure AI translation. Good for non-fiction, technical content.

**Tier 3 -- Volume translation:** API-only for large volumes (documentation, metadata, marketing materials). Quick, cheap, acceptable quality.

**Back-translation verification:** Translate the translated text back to the source language (using a different engine than the forward translation), then AI agent compares source and back-translation to flag divergences. This is standard practice in professional translation QA.

### Translation Memory

Store translation pairs in a local JSON/SQLite database per project. When translating new content, check for previously translated phrases. This is especially critical for:
- Sacred texts (canonical terms must be consistent)
- Series (character names, place names, invented terms)
- Technical writing (terminology consistency)

No external TM tool needed -- the agent manages a simple JSON file.

---

## npm Publishing Configuration

| Concern | Recommendation | Why | Confidence |
|---------|---------------|-----|------------|
| **Authentication** | Granular Access Tokens (not classic) | Classic tokens deprecated; all classic tokens revoked by Feb 2026. Write-access tokens now max 90-day lifespan. | HIGH |
| **Publishing method** | `npm publish` with 2FA from local machine | Most secure for small-team projects. Trusted publishing (OIDC via GitHub Actions) is overkill until Scriven has CI/CD. | HIGH |
| **Prepublish check** | `npm pack --dry-run` before every publish | Verify no secrets, no unnecessary files leaked. The `"files"` field in package.json already scopes what's included. | HIGH |
| **Versioning** | `npm version patch/minor/major` with git tags | Auto-creates git tag, bumps version. Pair with GitHub releases for changelog. | HIGH |
| **npx support** | Already configured (`"bin": {"scriven": "./bin/install.js"}`) | `npx scriven@latest` will download and run the installer. Current setup is correct. | HIGH |
| **Lockfile** | Commit `package-lock.json` but since there are zero dependencies, it's effectively empty | Standard practice. Will matter when/if dev dependencies are added for testing. | HIGH |
| **Node version** | `"engines": {"node": ">=18.0.0"}` (already set) | Node 18 is LTS until April 2025 (EOL). Consider bumping to `>=20.0.0` (LTS until April 2026) or `>=22.0.0` (current LTS, April 2027 EOL). Recommend `>=20.0.0` as minimum. | HIGH |

### npm Publish Readiness Checklist

Current `package.json` is nearly ready. Needed additions:

```json
{
  "type": "commonjs",
  "homepage": "https://github.com/scriven/scriven#readme",
  "bugs": "https://github.com/scriven/scriven/issues",
  "funding": "https://github.com/sponsors/scriven",
  "publishConfig": {
    "access": "public"
  },
  "engines": {
    "node": ">=20.0.0"
  }
}
```

Also add a `.npmignore` or rely on the existing `"files"` field (which is already correctly scoped).

---

## Supporting Tools (Prerequisites for Users)

| Tool | Purpose | Install | Required For |
|------|---------|---------|-------------|
| **Pandoc** | Document conversion | `brew install pandoc` | All export commands |
| **Typst** | PDF generation | `brew install typst` | PDF export |
| **Ghostscript** | CMYK conversion, PDF/X-1a | `brew install ghostscript` | IngramSpark package only |
| **ImageMagick** | Image processing (resize, format conversion) | `brew install imagemagick` | Cover art processing, illustration pipeline |
| **Afterwriting** | Fountain to PDF | `npm i -g afterwriting` | Screenplay PDF export only |
| **Screenplain** | Fountain to FDX | `pip install screenplain` | FDX export only |

**Prerequisite detection:** The installer or export commands should check for these tools and provide clear installation instructions. Not all users need all tools -- a novelist needs only Pandoc + Typst. A screenwriter needs Afterwriting + Screenplain. The commands should fail gracefully with helpful messages.

---

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| PDF engine | Typst | XeLaTeX (TeX Live) | 4-6 GB install, 27x slower compilation, worse error messages. Reserve for academic edge cases. |
| PDF engine | Typst | WeasyPrint | HTML-to-PDF, not print-quality typesetting. No proper widow/orphan control, gutter margins. |
| PDF engine | Typst | Prince XML | Commercial ($3,800 license). Overkill for CLI tool targeting indie authors. |
| EPUB | Pandoc | epub-gen-memory (npm) | Would add runtime dependency. Pandoc's EPUB is more mature, handles accessibility, KDP validation. |
| EPUB | Pandoc | Calibre CLI | Calibre is massive (200+ MB). Pandoc is lighter and sufficient. |
| Document conversion | Pandoc | Asciidoctor | Scriven manuscripts are markdown. Asciidoctor is AsciiDoc-native. Adding a format is unnecessary complexity. |
| Illustration | OpenAI GPT Image 1.5 | Midjourney | No API. Cannot automate from CLI. |
| Illustration | OpenAI GPT Image 1.5 | DALL-E 3 | Sunset May 2026. Dead end. |
| Illustration | OpenAI GPT Image 1.5 | Replicate (Flux/SD) | Additional API signup. OpenAI key is already likely available to users of AI coding agents. |
| Translation | DeepL + Google + AI agent | Amazon Translate | Lower quality for literary content. No advantage over Google for broad coverage. |
| Translation | DeepL + Google + AI agent | LibreTranslate | Self-hosted, lower quality, limited languages. Not practical for a CLI tool. |
| Screenplay | Afterwriting + Screenplain | Highland (Mac app) | Not a CLI tool. Cannot automate. |
| Screenplay | Afterwriting + Screenplain | Pandoc Lua filter | Could work but would need significant custom development. Afterwriting/Screenplain already exist. |

---

## What NOT to Use

| Technology | Why Not |
|------------|---------|
| **npm runtime dependencies** | Scriven is a pure skill system. Adding npm deps means adding a build step, version conflicts, and breaking the zero-dependency architecture. |
| **Calibre** | 200+ MB desktop app. Pandoc does everything Scriven needs at 1/10th the size. |
| **DALL-E 2/3 API** | Sunset May 2026. Use GPT Image 1.5 instead. |
| **Midjourney** | No API. Cannot be automated. |
| **wkhtmltopdf** | Deprecated, security issues, poor print quality. |
| **Classic npm tokens** | Revoked Feb 2026. Use granular access tokens only. |
| **Node.js < 20** | Node 18 EOL April 2025. Node 20 LTS until April 2026. Bump minimum. |
| **WeasyPrint for books** | Fine for reports, not for book typesetting. No proper ligatures, optical margins, or page-level layout control. |
| **Custom EPUB generator** | Reinventing what Pandoc already does well. Waste of effort. |

---

## Template Files Scriven Should Ship

These are not code -- they're document templates the agent uses when invoking Pandoc/Typst:

| Template | Format | Purpose |
|----------|--------|---------|
| `scriven-book.typst` | Typst template | Book interior PDF (trim sizes, margins, headers, page numbers) |
| `scriven-manuscript.docx` | DOCX reference doc | Standard manuscript format (12pt Courier, double-spaced, 1" margins) |
| `scriven-formatted.docx` | DOCX reference doc | Designed/formatted DOCX for review copies |
| `scriven-epub.css` | CSS | EPUB styling (clean, readable, KDP-compatible) |
| `scriven-academic.latex` | LaTeX template | Academic paper/thesis formatting |
| `scriven-kdp-cover.typst` | Typst template | KDP cover with calculated spine width |
| `scriven-ingram-cover.typst` | Typst template | IngramSpark full-wrap cover |

---

## Sources

- [Pandoc Official Site](https://pandoc.org/) -- Version 3.9.0.2 confirmed
- [Typst Blog: Typst 0.14](https://typst.app/blog/2025/typst-0.14) -- Accessibility features confirmed
- [Pandoc + Typst Tutorial](https://slhck.info/software/2025/10/25/typst-pdf-generation-xelatex-alternative.html) -- 27x speed improvement verified
- [Afterwriting GitHub](https://github.com/ifrost/afterwriting-labs) -- Fountain CLI tool
- [Screenplain GitHub](https://github.com/vilcans/screenplain) -- Fountain to FDX converter
- [OpenAI API Pricing](https://platform.openai.com/docs/pricing) -- GPT Image 1.5 pricing
- [GPT Image 1.5 Pricing Analysis](https://www.aifreeapi.com/en/posts/openai-image-generation-api-pricing) -- Model comparison
- [DeepL vs Google vs Microsoft 2026](https://taia.io/resources/blog/deepl-vs-google-translate-vs-microsoft-translator/) -- Translation API comparison
- [Translation API Pricing 2026](https://www.buildmvpfast.com/api-costs/translation) -- Cost comparison
- [npm Trusted Publishing](https://docs.npmjs.com/trusted-publishers/) -- Token deprecation timeline
- [Snyk npm Best Practices](https://snyk.io/blog/best-practices-create-modern-npm-package/) -- Security guidance
- [KDP Formatting Requirements](https://kdp.amazon.com/en_US/help/topic/G201857950) -- Print submission specs
- [IngramSpark File Requirements](https://www.ingramspark.com/blog/file-requirements-for-print-books) -- PDF/X-1a specs
- [Best AI Image Generation APIs 2026](https://crazyrouter.com/en/blog/best-ai-image-generation-apis-2026) -- Midjourney no-API confirmed
