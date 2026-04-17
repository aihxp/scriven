---
phase: 27-multi-runtime-command-ref-rewriting
plan: 01
subsystem: installer
tags: [installer, codex, claude-code, rewriter, idempotency]
requires: []
provides:
  - "Code-block-aware rewriteInstalledCommandRefs"
  - "generateCodexCommandContent (exported)"
  - "installCodexRuntime writes rewritten .codex/commands/scr/**/*.md via atomicWriteFileSync"
affects:
  - bin/install.js
  - test/install.test.js
tech-stack:
  added: []
  patterns:
    - "CommonMark-ish fenced code-block segmentation (line-oriented, no backtracking)"
    - "TDD RED-then-GREEN (test commit fd93d61 then feat commit df6c3d8)"
key-files:
  created: []
  modified:
    - bin/install.js
    - test/install.test.js
decisions:
  - "Only fenced code blocks (``` and ~~~) are protected; indented-code detection is out of scope per Phase 27 CONTEXT"
  - "Unterminated fence → rest of file treated as code (fail-safe; prefer under-rewriting over mangling code)"
  - "Mixed fences (```/~~~) do not close each other — follows CommonMark"
  - "Re-reading pristine source on every install keeps marker-insertion idempotent; no diff against previously-installed file needed"
  - "Non-.md asset copy loop omitted: commands/scr/** is .md-only today (verified: 101 .md files, 0 non-.md)"
metrics:
  duration: "~25m"
  completed: "2026-04-16"
requirements:
  - REWRITE-01
  - REWRITE-02
---

# Phase 27 Plan 01: Multi-Runtime Command-Ref Rewriting Summary

Fix REWRITE-01 and REWRITE-02: installed Codex command files now use `$scr-*` invocation syntax in prose, and the shared rewriter leaves `/scr:*` references inside fenced code blocks byte-identical across all runtimes.

## Changes

### `rewriteInstalledCommandRefs(content, transform)` — bin/install.js

**Before:** single-line `content.replace(/\/scr:[a-z0-9:-]+/gi, transform)` — rewrote every match, including inside code blocks.

**After:** line-oriented segmenter.

Algorithm:
1. Split `content` on `/\n/` (preserves any `\r` at line ends for CRLF round-trip).
2. Walk lines. A line matching `/^(\s*)(`{3,}|~{3,})/` (first non-whitespace is ≥3 backticks or tildes) opens a code block. Capture fence char and length.
3. Emit the opener verbatim, then emit subsequent lines verbatim until a line whose first non-whitespace is the same fence char repeated ≥ opener length — that line is the closer, emitted and the block ends.
4. Mixed fences (```/~~~) do **not** close each other — CommonMark behavior.
5. If EOF is reached before a matching closer, the remainder is already emitted verbatim (fail-safe).
6. Non-code (prose) lines: `line.replace(/\/scr:[a-z0-9:-]+/gi, transform)`.
7. Re-join with `\n`.

Edge cases covered by tests:
- Prose rewrite (Codex transform)
- Triple-backtick block preservation (byte-identical)
- Tilde-fenced block preservation
- Mixed file (prose rewritten, code block byte-identical)
- Empty code block (` ``` \n ``` `)
- Info-string fence (` ```bash ` / ` ```js `)
- Consecutive code blocks separated by prose
- Indented (4-space) lines are NOT code (out of scope, documented in comment)
- Unterminated fence → everything after opener preserved
- Mixed-fence non-closing (` ``` ` does not close `~~~` and vice versa)

### `generateCodexCommandContent(entry, sourceContent)` — new, exported

```js
function generateCodexCommandContent(entry, sourceContent) {
  const rewritten = rewriteInstalledCommandRefs(sourceContent, commandRefToCodexInvocation);
  return markInstalledCommand(
    rewritten,
    'codex',
    commandRefToCodexInvocation(entry.commandRef),
    entry.relativePath
  );
}
```

Marker format: `<!-- scriven-cli-installed-command runtime:codex command:$scr-help source:help.md -->`

Inserted via `insertMarkerComment` — after frontmatter if present, else prepended. Matches the Claude Code marker shape.

### `installCodexRuntime` refactor — bin/install.js

**Before:**
```js
const commandCount = copyDir(path.join(PKG_ROOT, 'commands', 'scr'), commandsDir);
```
Raw `copyDir` → installed `.codex/commands/scr/*.md` contained `/scr:help` (never invoked anything under Codex).

**After:**
```js
const sourceCommandsRoot = path.join(PKG_ROOT, 'commands', 'scr');
const commandEntries = collectCommandEntries(sourceCommandsRoot);
let commandCount = 0;
for (const entry of commandEntries) {
  const sourcePath = path.join(sourceCommandsRoot, entry.relativePath);
  const sourceContent = fs.readFileSync(sourcePath, 'utf8');
  const targetPath = path.join(commandsDir, entry.relativePath);
  atomicWriteFileSync(targetPath, generateCodexCommandContent(entry, sourceContent));
  commandCount++;
}
```

- Uses `atomicWriteFileSync` (Phase 23) — temp-then-rename, no partial writes.
- `removePathIfExists(commandsDir)` still runs before the loop, so stale files from previous runs do not linger.
- Skill wrapper generation (`generateCodexSkill`) is unchanged.
- `copyDir` of agents is unchanged (agents dir has its own rewriter path which was out of scope).

Idempotency: each install re-reads the pristine `commands/scr/**` source, so the marker is inserted exactly once against clean content — not accumulated over an already-marked installed file.

### Exports added

- `rewriteInstalledCommandRefs`
- `generateCodexCommandContent`
- `installCodexRuntime` (for tmpdir-backed test harness)

## Test coverage added (13 new cases)

**`rewriteInstalledCommandRefs code-block awareness`** (10 cases):
1. Rewrites a prose reference (Codex transform)
2. Leaves triple-backtick code blocks unchanged byte-for-byte
3. Leaves tilde-fenced code blocks unchanged byte-for-byte
4. Mixed file: rewrites prose, preserves code blocks
5. Empty code block passes through unchanged
6. Info-string fence opener (` ```bash `) is treated as opener
7. Consecutive code blocks separated by prose still rewrites prose
8. Indented (4-space) lines are NOT treated as code blocks
9. Unterminated fence: rest of file treated as code (fail-safe)
10. Mixed fences do not close each other (` ``` ` opens, `~~~` does not close)

**`generateCodexCommandContent`** (2 cases):
1. Rewrites prose `/scr:help` → `$scr-help` and inserts Codex marker; code block preserved
2. Inserts marker after frontmatter when present

**`generateClaudeCommandContent` regression** (1 case):
1. Rewrites prose to `/scr-` but leaves code block `/scr:help` intact (exercises the new guard via Claude path)

**`installCodexRuntime rewrites command files`** (3 cases):
1. Installed `.codex/commands/scr/help.md` contains `$scr-help` in prose, preserves `/scr:help` inside code blocks, and includes a single `runtime:codex` marker
2. Nested command paths preserved: `sacred/*.md` installs to `.codex/commands/scr/sacred/*.md` with `$scr-sacred-<name>` marker
3. Re-running the installer is idempotent: single marker, no `.tmp.*` leftovers under `.codex/commands/scr/`

Full suite: `node --test test/install.test.js` → 49 tests, 9 suites, 0 failures.

## Non-.md assets in commands/scr/**

Audited with `find commands/scr -type f ! -name '*.md'` → **0 non-.md files** (101 `.md` files total). No special-case copy loop needed; a comment documents this in `installCodexRuntime`.

## Manual smoke verification

```
$ node bin/install.js --runtimes codex --project --silent
$ grep -n '\$scr-help' .codex/commands/scr/help.md
4:<!-- scriven-cli-installed-command runtime:codex command:$scr-help source:help.md -->
(plus prose occurrences)

$ grep -n '/scr:' .codex/commands/scr/help.md
29:  /scr:new-work        Start a new project ...  # ← inside a ``` fenced block
30:  /scr:demo            Explore a pre-built sample project first
31:  /scr:import <file>   Bring in an existing manuscript
32:  /scr:profile-writer  Set up your writer profile
34:Already have a project? Just cd into it and run /scr:next.
```

All remaining `/scr:` occurrences are inside a triple-backtick fenced code block (lines 27/36 are the fences). Exactly as intended.

## Deviations from Plan

None — plan executed exactly as written. TDD RED-then-GREEN followed for the combined plan (tests committed before implementation).

## Commits

- `fd93d61` test(27-01): add failing tests for code-block-aware rewriter + Codex command rewriting
- `df6c3d8` feat(27-01): code-block-aware rewriter + Codex command-file rewriting

## Self-Check: PASSED

Verified:
- `bin/install.js` contains `rewriteInstalledCommandRefs` (new segmenter), `generateCodexCommandContent`, and updated `installCodexRuntime` that calls `generateCodexCommandContent` + `atomicWriteFileSync`.
- `test/install.test.js` contains new describe blocks for code-block awareness, generateCodexCommandContent, Claude regression, and installCodexRuntime rewrites.
- Commits `fd93d61` and `df6c3d8` exist in `git log`.
- `node --test test/install.test.js` reports 49/49 passing.
