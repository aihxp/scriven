# Phase 20: Silent Multi-Runtime Installer - Context

**Gathered:** 2026-04-09
**Status:** Ready for planning

<domain>
## Phase Boundary

Make Scriven install non-interactively into one or more runtimes, with clean reinstall semantics for Scriven-owned files only. This phase covers installer invocation, runtime selection, clean file-copy behavior, and the host-facing delivery contract for Codex and Claude Code. It does not add new writing features or broader host-runtime parity claims.

</domain>

<decisions>
## Implementation Decisions

### Installer invocation
- **D-01:** Add a non-interactive CLI surface for installer control instead of relying on `readline` prompts.
- **D-02:** The primary flag set is `--runtimes`, `--runtime`, `--detected`, `--global` / `--project`, `--writer` / `--developer`, `--silent`, `--help`, and `--version`.
- **D-03:** In non-interactive mode, the installer should fail fast on invalid runtime keys instead of silently picking a fallback.

### Multi-runtime behavior
- **D-04:** One installer run may target both Codex and Claude Code in the same invocation.
- **D-05:** Shared data under `.scriven/` is written once per install run and records the selected runtime list rather than a single-runtime view only.
- **D-06:** Silent installs should print a compact completion line instead of interactive progress prompts.

### Clean install semantics
- **D-07:** Scriven should remove only Scriven-owned output paths before reinstalling, not unrelated files in the host runtime directories.
- **D-08:** Command mirrors may be fully replaced when Scriven owns the target directory subtree (for example `.claude/commands/scr` or `.codex/commands/scr`).
- **D-09:** Agent directories should preserve unrelated user files by deleting only files that correspond to Scriven's shipped agent set before copying fresh versions.

### Runtime delivery model
- **D-10:** Claude Code remains a command-directory runtime with `/scr:*` commands under `.claude/commands/scr`.
- **D-11:** Codex becomes a skill-native runtime surface with generated `$scr-*` skills under `.codex/skills/`.
- **D-12:** Generated Codex skills must read the mirrored installed command markdown under `.codex/commands/scr` as the source of truth instead of duplicating command logic.
- **D-13:** Codex-facing guidance should translate `/scr:*` references to `$scr-*` references in generated skill wrappers and runtime docs.

### OS-agnostic behavior
- **D-14:** Runtime path resolution stays based on home-directory and relative-path joins, not OS-specific shell assumptions.
- **D-15:** Prerequisite and runtime guidance should stay framed as installer targets with narrow support claims, not parity proof.

### the agent's Discretion
- Exact installer output phrasing outside the required flag semantics
- The internal helper split inside `bin/install.js`
- The exact wording of generated Codex skill wrappers as long as they preserve the runtime contract above

</decisions>

<specifics>
## Specific Ideas

- Mirror the effective GSD Codex pattern: skill-native invocation for Codex, slash-command delivery for Claude Code.
- Codex users should reach Scriven with `$scr-help`, `$scr-new-work`, and related `$scr-*` skills rather than having to rely on slash-command indexing.
- The installer should feel clean and scriptable: `npx scriven-cli@latest --runtimes codex,claude-code --global --writer --silent`.
- Keep support claims honest: Codex and Claude are installer targets with different host-facing delivery models, not interchangeable proof of identical runtime behavior.

</specifics>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Runtime contract
- `.planning/REQUIREMENTS.md` — Active v1.5 requirements for silent install, Codex skills, clean reinstall behavior, and QA coverage
- `.planning/ROADMAP.md` — Phase 20 boundary, success criteria, and plan slots for this milestone
- `docs/runtime-support.md` — Canonical runtime matrix and trust-language constraints for installer targets
- `docs/architecture.md` — Installer architecture, runtime types, and install-path framing

### Install UX
- `README.md` — Public quick-start and runtime-target wording that must stay aligned with the real install surface
- `docs/getting-started.md` — User-facing install and first-run flow for Codex and command-directory runtimes

### Implementation surface
- `bin/install.js` — Single installer entrypoint and runtime registry
- `test/installer.test.js` — Installer contract coverage for runtimes, Codex skills, and non-interactive argument parsing

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `bin/install.js`: already contains the runtime registry, path detection, copy helpers, skill manifest generation, and Perplexity guided setup generation
- `commands/scr/`: existing markdown command set remains the behavior source of truth
- `agents/`: shipped agent prompts can continue to be mirrored into runtime agent directories
- `test/installer.test.js`: existing runtime-registry tests provide a natural place to extend installer coverage

### Established Patterns
- Runtime support claims are intentionally narrow and routed through `docs/runtime-support.md`
- Installer targets are modeled by a `RUNTIMES` registry with `commands`, `skills`, or `guided-mcp` strategy types
- Shared data and templates are copied to `.scriven/` regardless of runtime

### Integration Points
- Runtime detection and install strategy live in `bin/install.js`
- Codex and Claude onboarding copy lives in `README.md`, `docs/getting-started.md`, and `docs/architecture.md`
- Trust-regression coverage already reads runtime definitions from `bin/install.js`, so doc changes must stay in sync with that registry

</code_context>

<deferred>
## Deferred Ideas

- Host-runtime smoke tests proving parity inside Codex and Claude sessions
- Broader runtime-specific polish beyond Codex and Claude Code
- Any new writing-command behavior unrelated to install reliability

</deferred>

---

*Phase: 20-silent-multi-runtime-installer*
*Context gathered: 2026-04-09*
