# Phase 27: Multi-Runtime Command-Ref Rewriting - Context

**Gathered:** 2026-04-16
**Status:** Ready for planning
**Mode:** Auto-generated (discuss skipped via workflow.skip_discuss)

<domain>
## Phase Boundary

Cross-references between commands use correct invocation syntax for each runtime. Codex command files get `$scr-*`, Claude Code gets `/scr:*`, other runtimes get their native syntax. References inside fenced code blocks are preserved unchanged so documentation examples remain portable.

**Requirements:** REWRITE-01, REWRITE-02

**Success Criteria:**
1. Installed command files for Codex contain `$scr-*`, Claude contains `/scr:*`, other runtimes use correct syntax
2. References inside fenced code blocks left unchanged
3. Mixed prose/code files have only prose references rewritten

</domain>

<decisions>
## Implementation Decisions

### Claude's Discretion

Per research/ARCHITECTURE.md:
- The gap is narrow — `installCodexRuntime` copies raw command markdown files to `.codex/commands/scr/*.md` without rewriting `/scr:` to `$scr-*`. The skill files (separate) are rewritten correctly.
- Subdirectory runtimes (Cursor, Gemini, Windsurf, OpenCode, Copilot, Antigravity) keep `/scr:` native — those hosts invoke slash-commands from subdirectories and `/scr:help` works as-is.
- Claude Code uses flat-prefixed layout (already handled via `generateClaudeCommandContent`).

### Code-block protection
- Parse content into segments split on fenced code block markers (```...``` and ~~~...~~~ )
- Only rewrite references in non-code segments
- Preserve code blocks verbatim — even if they contain `/scr:help` examples, keep them for documentation portability

### Primary fix
- `installCodexRuntime` needs to rewrite the copied command markdown files using `rewriteInstalledCommandRefs` with the Codex transform (commandRef → `$scr-*`)
- Enhance `rewriteInstalledCommandRefs` to skip code blocks

</decisions>

<code_context>
## Existing Code Insights

### Current rewriteInstalledCommandRefs (bin/install.js:439)
```js
function rewriteInstalledCommandRefs(content, transform) {
  return content.replace(/\/scr:[a-z0-9:-]+/gi, (commandRef) => transform(commandRef));
}
```
Rewrites EVERY match including inside code blocks.

### Current Codex install (bin/install.js:871-896)
```js
function installCodexRuntime(runtime, isGlobal, log) {
  // ...
  const commandCount = copyDir(path.join(PKG_ROOT, 'commands', 'scr'), commandsDir);
  // Raw copy — no rewriting applied to .codex/commands/scr/*.md files
  // Each Codex skill wrapper (skillDir/SKILL.md) DOES use the correct $scr- syntax
  // But the command markdown files copied to commandsDir still contain /scr: references
}
```

### Transform functions already exist
- `commandRefToClaudeInvocation` — `/scr:help` → `/scr-help`
- `commandRefToCodexInvocation` — `/scr:help` → `$scr-help`

</code_context>

<specifics>
## Specific Ideas

Primary gap: `installCodexRuntime`'s raw `copyDir` of commands into `.codex/commands/scr/` must be replaced with per-file rewriting using `commandRefToCodexInvocation`.

Secondary: `rewriteInstalledCommandRefs` must skip fenced code blocks.

</specifics>

<deferred>
## Deferred Ideas

None — discuss phase skipped.

</deferred>
