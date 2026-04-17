# Phase 23: Atomic File Writes - Context

**Gathered:** 2026-04-16
**Status:** Ready for planning
**Mode:** Auto-generated (discuss skipped via workflow.skip_discuss)

<domain>
## Phase Boundary

Installer file writes are crash-safe so an interrupted install never leaves truncated or corrupted files on disk. Covers writing settings.json, manifests, SKILL.md, skill wrappers, and other installer-generated files via temp-file-then-rename, plus detecting and cleaning orphaned `.tmp.*` files from prior interrupted installs.

**Requirements:** SAFE-01, SAFE-02

**Success Criteria:**
1. Every generated file lands via temp-file-then-rename so the target path always has a complete file
2. Orphaned `.tmp.*` files from interrupted installs are detected and cleaned on startup
3. A simulated interrupt mid-install leaves no truncated files at any target path

</domain>

<decisions>
## Implementation Decisions

### Claude's Discretion
All implementation choices are at Claude's discretion — discuss phase was skipped per user setting. Use ROADMAP phase goal, success criteria, research summary (.planning/research/SUMMARY.md), and bin/install.js conventions to guide decisions.

Key research-derived guidance:
- Pattern: write to `${targetPath}.tmp.${crypto.randomUUID()}`, then `fs.renameSync()` to target (POSIX atomic rename)
- Zero new dependencies — use only Node.js 20+ built-ins
- Temp file cleanup runs on installer startup, scanning target directories for `*.tmp.*`
- Single atomic write utility exported from `bin/install.js` should replace all `fs.writeFileSync` calls that generate installer output

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `bin/install.js` currently uses `fs.writeFileSync` in ~7 locations for generated files
- Existing manifest pattern (`.scriven-installed.json`) shows per-runtime tracking approach that atomic writes should preserve

### Established Patterns
- Zero-dependency architecture (`package.json` has no runtime deps)
- Exports from `bin/install.js` are test-consumed (see test suite)
- `removePathIfExists` and `readJsonIfExists` are small focused helpers — new `atomicWriteFileSync` and `cleanOrphanedTempFiles` should follow the same style

### Integration Points
- `writeSharedAssets()` — writes settings.json
- `writeInstalledCommandManifest()` — writes Claude manifest
- `writeCodexSkillManifest()` — writes Codex manifest
- `installCodexRuntime()` — writes per-skill SKILL.md files
- `installManifestSkillRuntime()` — writes generic SKILL.md
- `installGuidedRuntime()` — writes Perplexity setup guide

</code_context>

<specifics>
## Specific Ideas

No specific requirements — discuss phase skipped. Refer to ROADMAP phase description, REQUIREMENTS.md (SAFE-01, SAFE-02), and research/SUMMARY.md.

</specifics>

<deferred>
## Deferred Ideas

None — discuss phase skipped.

</deferred>
