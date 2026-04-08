# Scriven

**Package:** [@aihxp/scriven-cli on GitHub Packages](https://github.com/aihxp/scriven/pkgs/npm/scriven-cli)

**Spec-driven creative writing, publishing, and translation for AI coding agents.**

*I don't outline -- Claude does. I don't edit -- Claude does. I don't format -- Claude does. I just write.*

Scriven brings spec-driven workflows to creative writing. It runs inside your AI coding agent (Claude Code, Cursor, Gemini CLI, and more) and handles everything from blank page to publication-ready package.

Scriven is best understood as **AI-native longform writing software built around voice preservation**. Its core promise is narrow and high-stakes: drafted prose should sound like the writer, not like AI. If you want evidence before features, start with the [Proof Artifacts](docs/proof-artifacts.md).

Install is from **GitHub Packages** only (not the public npm registry). Add a [personal access token](https://docs.github.com/en/packages/learn-github-packages/about-permissions-for-github-packages#about-scopes-and-permissions-for-package-registries) with at least **`read:packages`** (fine-grained: **Packages → Read** for this repository), then:

```bash
# ~/.npmrc (one-time)
echo '@aihxp:registry=https://npm.pkg.github.com' >> ~/.npmrc
echo '//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN' >> ~/.npmrc

npx @aihxp/scriven-cli@latest
```

See [Working with the npm registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry) for details.

---

## What is this

Scriven is a command system that turns your AI coding agent into a voice-preserving creative writing studio. It supports 46 work types -- novels, screenplays, research papers, poetry collections, scripture commentaries, comics, memoirs -- each with its own adaptive vocabulary and toolset.

The wedge comes first: Scriven profiles the writer, loads that voice into every drafting step, and keeps each unit on fresh context so the prose stays specific to the project. From there, it expands into 101 slash commands covering the rest of the pipeline:

- **Create** -- Set up a project with tailored context files. Progressive onboarding, never overwhelming.
- **Write** -- Discuss, plan, draft, and revise one unit at a time. The drafter agent loads your Voice DNA and writes in *your* voice, not generic AI prose.
- **Polish** -- Editor review, line edit, copy edit, continuity check, voice check, beta reader simulation, sensitivity review.
- **Publish** -- Front/back matter, cover art, blurbs, query letters, KDP packages, IngramSpark packages, EPUB, PDF, Fountain, Final Draft, LaTeX.
- **Translate** -- Deep translation with glossary management, cultural adaptation, back-translation verification, multi-language simultaneous publishing.
- **Collaborate** -- Parallel revision tracks, co-writing workflows, continuity merge checking.

Everything adapts to your work type. A novel uses `/scr:draft` for chapters. A screenplay uses `/scr:draft` for acts. A Quran commentary uses `/scr:draft` for surahs. Same command, tradition-native vocabulary.

---

## Quick start

```bash
# Install (after ~/.npmrc is set for @aihxp — see above)
npx @aihxp/scriven-cli@latest

# In any project directory, open Claude Code (or your preferred agent) and:
/scr:new-work        # Start a fresh project
/scr:demo            # Explore a pre-built sample first
/scr:next            # The universal "what should I do now" command
/scr:help            # See what's available for your work type
```

If you only ever type `/scr:next`, you can complete an entire novel. It always knows what's next.

If you want the shortest proof-first route, read [Proof Artifacts](docs/proof-artifacts.md) before exploring the rest of the docs.

---

## The Voice DNA system

Scriven's core insight: drafted prose should sound like *you*, not like an AI. Before drafting begins, `/scr:profile-writer` builds a detailed voice profile across 15+ dimensions:

- Narrative perspective, tense, narrator stance
- Sentence architecture, paragraph rhythm
- Vocabulary register, figurative density, recurring image systems
- Dialogue style, character voice differentiation
- Pacing, transitions, emotional range
- Do/don't/consider rules specific to the writer

This profile is saved as `STYLE-GUIDE.md` and loaded into every drafter agent invocation. The drafter writes one atomic unit per fresh context -- a scene, a subsection, a passage -- with the style guide as its primary reference. Voice stays consistent across hundreds of scenes.

For sacred and historical texts, Voice DNA is supplemented by 10 sacred voice registers (prophetic, wisdom, legal, liturgical, narrative-historical, apocalyptic, epistolary, psalmic, parabolic, didactic).

---

## Work types supported

**Prose:** novel, novella, short story, flash fiction, memoir, creative nonfiction, biography, essay, essay collection

**Script:** screenplay, stage play, TV pilot, TV series bible, audio drama, libretto/musical

**Academic:** research paper, thesis/dissertation, journal article, white paper, literature review, monograph

**Visual:** comic, graphic novel, children's book, picture book

**Poetry:** poetry collection, single poem, song/lyric

**Interactive:** interactive fiction, game narrative

**Sacred & historical:** scripture (Biblical, Quranic, Torah, Vedic, Buddhist, generic), commentary/exegesis, devotional, liturgical text, historical chronicle, historical account, mythological collection, religious epic, sermon, homiletic collection

Each work type has its own structural hierarchy and **industry-standard word count and page range guidance** -- a novel targets 70,000–100,000 words across 20–35 chapters, a screenplay targets 90–120 pages across 3–5 acts. These ranges guide outlining, progress tracking, and drafter pacing. Commands rename automatically -- a Torah commentary uses `/scr:plan-parashah`, not `/scr:plan-chapter`.

---

## Autopilot mode

Run the full pipeline autonomously. Three profiles:

- **Guided** -- Pause after each unit for review
- **Supervised** -- Batch through several units, pause for review
- **Full-auto** -- Run until complete; only pause on critical failures

```bash
/scr:autopilot --profile supervised
```

Plus:
- `/scr:autopilot-publish` -- One command generates front matter, back matter, cover, and full export package
- `/scr:autopilot-translate french german spanish` -- Simultaneous multi-language editions

---

## Writer mode vs. developer mode

Scriven detects non-technical writers and hides git terminology. Instead of `commit`, `branch`, `merge`, `diff` -- you see `save`, `version`, `compare`, `accept changes`. All the power, none of the coding jargon.

Technical writers can enable developer mode in settings for full git access and verbose output.

---

## Philosophy

Scriven is built on five principles:

1. **The writer's voice is sacred.** The drafter never imposes generic AI style. Every drafted sentence passes through the Voice DNA gate.

2. **Fresh context per atomic unit.** Each scene, subsection, or passage is drafted in a clean context. This prevents voice drift, context bloat, and keeps each unit at its best.

3. **Progressive disclosure.** Onboarding asks 3 questions, not 30. Depth is optional and always additive.

4. **Tradition-native vocabulary.** A Quran commentary uses surahs and ayahs. A Bible study uses books and verses. A screenplay uses acts and scenes. The tool adapts to the tradition -- the writer never adapts to the tool.

5. **`/scr:next` always works.** The universal interface. A writer who only ever types `/scr:next` can complete an entire novel, from blank page to KDP package.

---

## Documentation

- [Proof Artifacts](docs/proof-artifacts.md) -- Canonical proof hub for the watchmaker sample flow and Voice DNA before/after bundle
- [Getting Started](docs/getting-started.md) -- Install to first draft in 10 minutes
- [Command Reference](docs/command-reference.md) -- All 101 commands with usage, flags, and examples
- [Work Types Guide](docs/work-types.md) -- How 46 work types adapt Scriven's vocabulary
- [Voice DNA Guide](docs/voice-dna.md) -- The 15+ dimension voice profiling system
- [Publishing Guide](docs/publishing.md) -- 13 export formats, KDP, IngramSpark, submission packages
- [Sacred Text Guide](docs/sacred-texts.md) -- 13 sacred work types, voice registers, tradition-native features
- [Translation Guide](docs/translation.md) -- Multi-language pipeline with glossary and cultural adaptation
- [Contributing](docs/contributing.md) -- How to add commands, agents, work types, and templates
- [Architecture](docs/architecture.md) -- How Scriven works under the hood
- [Shipped Assets](docs/shipped-assets.md) -- Canonical inventory of bundled export templates and launch-critical files
- [Runtime Support](docs/runtime-support.md) -- Canonical runtime matrix, Node baseline, and verification-status framing

---

## Installer Targets

Scriven currently ships installer targets for these AI coding agent environments:

- **Claude Code** (primary reference runtime)
- **Cursor**
- **Gemini CLI**
- **Codex CLI**
- **OpenCode**
- **GitHub Copilot**
- **Windsurf**
- **Antigravity**
- **Manus Desktop**

**Installer baseline:** `Node.js 20+` for `npx @aihxp/scriven-cli@latest` (GitHub Packages) and `bin/install.js`.

**Support note:** Claude Code is the primary reference runtime. The environments listed above are installer targets, not a claim that every host runtime has verified parity today. See the [runtime compatibility matrix](docs/runtime-support.md) for install type, support level, and verification status.

---

## Status

**Version:** 1.3.2

Scriven's core command surface is stable across 101 commands, 46 work types, and 10 installer targets. All four milestones (v1.0 MVP, v1.1 Generic Platform Support, v1.2 Documentation, v1.3 Trust & Proof) are shipped. 925 tests pass. See [Shipped Assets](docs/shipped-assets.md) for the canonical asset inventory and [Runtime Support](docs/runtime-support.md) for the runtime compatibility matrix.

---

## License

MIT. See [LICENSE](./LICENSE).

## Contributing

Scriven is an open project. Contributions welcome -- especially new work types, additional runtime adapters, and voice register definitions for languages and traditions we haven't covered yet.
