# Phase 24: Frontmatter Parsing - Context

**Gathered:** 2026-04-16
**Status:** Ready for planning
**Mode:** Auto-generated (discuss skipped via workflow.skip_discuss)

<domain>
## Phase Boundary

Frontmatter extraction from command files handles real-world content correctly instead of silently truncating or misreading values. Fix `readFrontmatterValue` to handle colons in values (split on first colon only), scope parsing to the `---` delimited block only, and support multiline/array values if needed.

**Requirements:** PARSE-01, PARSE-02, PARSE-03

**Success Criteria:**
1. Values containing colons (e.g., `description: "Step 1: Do this"`) parsed without truncation
2. Extraction scoped to `---` block only, ignoring matches in command body
3. Multiline and array values returned intact

</domain>

<decisions>
## Implementation Decisions

### Claude's Discretion
All implementation choices are at Claude's discretion. Use research/SUMMARY.md guidance.

Key research-derived guidance:
- Line-based parser that splits on first `:` using `line.indexOf(':')`
- Scope parsing to content between opening `---` and closing `---` at start of file
- Zero new dependencies — Node.js built-ins only
- Preserve existing export signature so tests and Codex skill generator don't break
- Verify actual command files for multiline/array needs — if no command uses them, PARSE-03 is a defensive fix only

</decisions>

<code_context>
## Existing Code Insights

### Current Implementation (bin/install.js:292-295)
```js
function readFrontmatterValue(content, key) {
  const match = content.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
  return match ? stripWrappingQuotes(match[1]) : '';
}
```

### Problems
1. Matches `^key:\s*(.+)$` against entire file body — could match body text like "description:" in command content
2. Greedy `.+` captures everything after `key: ` including colons (actually may not be truncation — verify)
3. No multiline value support (YAML `|`, `>`, or continuation lines)
4. No array value support (`[a, b, c]` or `- item` list)

### Call Sites
- `collectCommandEntries` reads `description` and `argument-hint` from command frontmatter
- Both exported for test consumption

</code_context>

<specifics>
## Specific Ideas

No specific requirements — discuss phase skipped. Refer to ROADMAP phase description, REQUIREMENTS.md (PARSE-01, PARSE-02, PARSE-03), and research/SUMMARY.md.

</specifics>

<deferred>
## Deferred Ideas

None — discuss phase skipped.

</deferred>
