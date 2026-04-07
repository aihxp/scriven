# Phase 1: MVP Polish - Research

**Researched:** 2026-04-06
**Domain:** npm packaging, Node.js testing, demo content authoring
**Confidence:** HIGH

## Summary

Phase 1 is a packaging and polish phase, not a feature-building phase. The existing codebase has a working installer (`bin/install.js`), 21 command files, 5 agent files, 9 templates, and a 859-line CONSTRAINTS.json. What is missing: (1) the demo content in `data/demo/`, (2) a test suite, (3) package.json polish for publishing, and (4) the demo command needs updating to copy pre-baked files instead of generating on-the-fly.

The technical risk is low -- this is Node.js file copying, JSON validation, and markdown authoring. The creative risk is moderate -- the demo scenes must be compelling literary prose that sells the product on first impression. The testing approach uses `node:test` (built into Node 18+) with zero dependencies, which aligns with the project's no-deps philosophy.

**Primary recommendation:** Structure work as content-first (demo files), then tests (which validate the content), then package.json polish, then end-to-end verification.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Demo ships with full drafted scenes (~800-1200 words each) of actual literary prose -- 4 drafted scenes plus 1 planned-but-not-drafted scene. Real prose, not placeholders.
- **D-02:** STYLE-GUIDE.md is hand-crafted to showcase every voice dimension at its best -- demonstrates what a great style guide looks like as a teaching tool.
- **D-03:** Ship only the default watchmaker story ("A retired watchmaker in a coastal town receives a letter from a daughter he never knew he had"). Genre alternatives deferred to future work.
- **D-04:** Demo includes all context files fully populated: WORK.md, BRIEF.md, OUTLINE.md, STATE.md, STYLE-GUIDE.md, CHARACTERS.md (Elias + Petra), PLOT-GRAPH.md, THEMES.md, plus editor notes on scene 2.
- **D-05:** Use Node.js built-in test runner (`node:test`) -- zero dependencies, ships with Node 18+, matches the project's no-deps philosophy.
- **D-06:** Test suite validates four areas: (1) CONSTRAINTS.json schema integrity and internal consistency, (2) command file structure (frontmatter, required sections, naming), (3) installer dry-run (file copying works for all 3 runtimes), (4) demo file completeness (all expected files exist and are non-empty).
- **D-07:** Unscoped package name: `scriven` -- clean `npx scriven@latest` invocation.
- **D-08:** Node.js minimum version: >=18.0.0 (current LTS, `node:test` available).
- **D-09:** Package needs: correct shebang (`#!/usr/bin/env node`), `publishConfig` with access=public, `files` array verified, `engines` field, prepublish test hook.
- **D-10:** Demo files ship pre-baked in the npm package under `data/demo/` -- instant setup, no AI generation needed, consistent experience every time.
- **D-11:** `/scr:demo` creates the demo project at `./scriven-demo/` (sibling directory) by copying from `data/demo/`. Stays out of the writer's project, easy to find and delete.

### Claude's Discretion
- Prose style for the watchmaker story scenes -- Claude writes these in a literary fiction voice following the hand-crafted STYLE-GUIDE.md
- Exact test assertions and error messages
- Package.json field ordering and metadata details
- Demo directory internal structure (how files are organized under data/demo/)

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| MVP-01 | Demo sample project ships with pre-baked watchmaker story (5 scenes, full context files, voice profile, plot graph, editor notes) | Demo content architecture section; file inventory from templates and product plan section 16 |
| MVP-02 | CONSTRAINTS.json validator test ensures schema integrity and all referenced commands exist | CONSTRAINTS.json structure analysis; test patterns with node:test |
| MVP-03 | Installer dry-run test verifies file copying across Claude Code, Cursor, Gemini CLI | Installer code analysis; dry-run testing patterns |
| MVP-04 | Command structure tests verify frontmatter, required sections, and naming conventions | Command file pattern analysis; YAML frontmatter parsing |
| MVP-05 | npm package is publishable -- correct bin entry, shebang, publishConfig, engines field | Package.json gap analysis; npm publishing checklist |
| MVP-06 | `npx scriven@latest` installs and runs successfully on a clean machine | End-to-end verification approach |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `node:test` | Built-in (Node 18+) | Test runner | Zero dependencies; built into Node.js; supports describe/it/assert; matches project's no-deps philosophy |
| `node:assert` | Built-in (Node 18+) | Test assertions | Strict mode assertions; no external assertion library needed |
| `node:fs` | Built-in | File system operations | Reading/validating demo files, CONSTRAINTS.json, command files |
| `node:path` | Built-in | Path resolution | Cross-platform path handling for test file lookups |
| `node:child_process` | Built-in | Process spawning | Installer dry-run testing (spawn install.js with mock inputs) |

### Supporting
No external packages. Everything uses Node.js built-ins.

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `node:test` | Jest/Vitest | Would add devDependencies, contradicts zero-deps philosophy |
| `node:assert` | Chai | More expressive syntax but adds dependency |
| Manual YAML parsing | `js-yaml` npm package | Would add dependency; simple regex/split parsing sufficient for frontmatter |

**Installation:**
```bash
# No installation needed -- all built-in to Node.js
```

## Architecture Patterns

### Demo Content Structure
The demo must mirror a real `.manuscript/` directory as defined in product plan section 16. Pre-baked files go in `data/demo/` in the npm package:

```
data/demo/
  .manuscript/
    WORK.md              # Watchmaker premise, filled in
    BRIEF.md             # Creative brief, filled in
    OUTLINE.md           # 5-scene arc, filled in
    STATE.md             # "4 of 5 drafted" so /scr:next works
    STYLE-GUIDE.md       # Hand-crafted Voice DNA showcase
    CHARACTERS.md        # Elias + Petra with full profiles
    PLOT-GRAPH.md        # Arc positions marked
    THEMES.md            # Lost time, parenthood, second chances
    config.json          # work_type: "short_story", etc.
    drafts/
      body/
        scene-1-DRAFT.md   # ~800-1200 words each
        scene-2-DRAFT.md   # Has editor notes in reviews/
        scene-3-DRAFT.md
        scene-4-DRAFT.md
    plans/
      scene-5-PLAN.md     # Planned but not drafted
    reviews/
      scene-2-REVIEW.md   # Editor notes for /scr:editor-review 2
```

**Key insight:** The naming convention for scene files must match what the demo.md command and existing commands expect. The product plan (section 16) uses `{unit}-{N}-DRAFT.md` pattern. For a short story with `command_unit: "section"` and `atomic: "beat"`, the hierarchy maps scenes as sections. However, the demo.md command references `{N}-*-DRAFT.md` and `{N}-*-PLAN.md` patterns. Use a consistent naming scheme like `1-the-letter-DRAFT.md`, `2-the-workshop-DRAFT.md`, etc.

### Test Structure
```
test/
  constraints.test.js    # MVP-02: CONSTRAINTS.json validation
  commands.test.js       # MVP-04: Command file structure
  installer.test.js      # MVP-03: Installer dry-run
  demo.test.js           # MVP-01: Demo completeness
```

### Pattern 1: node:test with describe/it blocks
**What:** Node.js built-in test runner using describe/it/assert
**When to use:** All tests in this project
**Example:**
```javascript
// Source: Node.js docs https://nodejs.org/api/test.html
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

describe('CONSTRAINTS.json', () => {
  const constraints = JSON.parse(
    fs.readFileSync(path.join(__dirname, '..', 'data', 'CONSTRAINTS.json'), 'utf-8')
  );

  it('should parse as valid JSON', () => {
    assert.ok(constraints);
    assert.equal(typeof constraints, 'object');
  });

  it('should have version matching package.json', () => {
    const pkg = JSON.parse(
      fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf-8')
    );
    assert.equal(constraints.version, pkg.version);
  });
});
```

### Pattern 2: YAML Frontmatter Parsing (no dependencies)
**What:** Parse YAML frontmatter from markdown command files without external libraries
**When to use:** Command structure validation tests
**Example:**
```javascript
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  const yaml = match[1];
  const result = {};
  for (const line of yaml.split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx > 0) {
      const key = line.slice(0, colonIdx).trim();
      let value = line.slice(colonIdx + 1).trim();
      // Remove surrounding quotes
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      result[key] = value;
    }
  }
  return result;
}
```

### Pattern 3: Installer Dry-Run Testing
**What:** Test the installer's file copying logic without interactive prompts
**When to use:** MVP-03 validation
**Example:**
```javascript
const { copyDir } = require('../bin/install.js');
// Or extract and test copyDir directly

describe('installer dry-run', () => {
  it('should copy all command files', () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'scriven-test-'));
    const srcDir = path.join(__dirname, '..', 'commands', 'scr');
    const count = copyDir(srcDir, path.join(tmpDir, 'scr'));
    assert.ok(count > 0);
    // Verify key files exist
    assert.ok(fs.existsSync(path.join(tmpDir, 'scr', 'demo.md')));
    // Cleanup
    fs.rmSync(tmpDir, { recursive: true });
  });
});
```

**Note:** The `copyDir` function in `bin/install.js` is not currently exported. It will need to be made testable -- either by exporting it via `module.exports` when `require.main !== module`, or by extracting it to a shared utility in `lib/`.

### Anti-Patterns to Avoid
- **Generating demo content at runtime:** Demo files must be static, pre-baked markdown. Never generate via AI at install time -- this breaks offline installs and makes the experience inconsistent.
- **Adding npm dependencies for testing:** Use `node:test` and `node:assert` exclusively. No Jest, no Mocha, no Vitest.
- **Testing against live npm registry:** Dry-run tests should use local filesystem only. Never publish as part of testing.
- **Placeholder prose in demo:** "Lorem ipsum" or "Scene 1 content here" defeats the purpose. Every demo file must contain real, compelling content.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| YAML frontmatter parsing | Full YAML parser | Simple regex + line splitting | Only need key-value pairs from command frontmatter; full YAML spec is overkill |
| JSON schema validation | Custom schema validator | `node:assert` with manual checks | CONSTRAINTS.json has a known, fixed structure; asserting specific properties is clearer than a generic validator |
| Test runner | Custom test harness | `node:test` built-in | Reinventing test infrastructure wastes time and adds maintenance burden |
| File copying | Custom recursive copy | Existing `copyDir()` in install.js | Already written and working; just needs to be exported for testing |

**Key insight:** This phase has zero external dependencies. Everything is file I/O, JSON parsing, and markdown authoring. The complexity is in the content quality, not the code.

## Common Pitfalls

### Pitfall 1: Demo File Naming Mismatch
**What goes wrong:** Scene files in `data/demo/` don't match the pattern that commands like `draft.md` and `next.md` expect, so the demo project doesn't actually work with Scriven commands.
**Why it happens:** The product plan section 16 shows `{unit}-{N}-DRAFT.md` but the demo.md command references `{N}-*-DRAFT.md`. These patterns need to match.
**How to avoid:** Check what pattern the existing commands (`draft.md`, `next.md`, `editor-review.md`) actually scan for. Use that exact pattern in demo files.
**Warning signs:** Demo files exist but `/scr:next` or `/scr:draft-scene 5` can't find them.

### Pitfall 2: Installer copyDir Not Testable
**What goes wrong:** `copyDir` is defined inside `main()` scope or not exported, making it impossible to unit test without spawning the full interactive installer.
**Why it happens:** The installer was written as a standalone script, not a library.
**How to avoid:** Extract `copyDir` (and potentially other utilities) so they can be required by tests. Guard exports with `if (require.main !== module)` or unconditionally export.
**Warning signs:** Tests require mocking stdin/stdout to test basic file copying.

### Pitfall 3: package.json `files` Array Missing Demo Content
**What goes wrong:** `npm pack` or `npm publish` excludes `data/demo/` because the `files` array only includes `data/` at the top level but the demo directory doesn't exist yet when the array was written.
**Why it happens:** The `files` array currently includes `"data/"` which should cover `data/demo/`, but the actual demo directory and its `.manuscript/` subdirectory need to exist. The `.manuscript/` name starts with a dot which can cause issues.
**How to avoid:** Run `npm pack --dry-run` and verify every expected demo file appears in the tarball. Consider whether `.manuscript/` naming with dot prefix causes npm to exclude it.
**Warning signs:** Package publishes successfully but `data/demo/` is empty or missing after install.

### Pitfall 4: Shebang Line Missing or Wrong
**What goes wrong:** `npx scriven@latest` fails with "permission denied" or doesn't execute as Node.js.
**Why it happens:** Missing `#!/usr/bin/env node` shebang or incorrect file permissions.
**How to avoid:** Verify `bin/install.js` starts with `#!/usr/bin/env node` (it does -- confirmed in codebase). Ensure `npm pack` preserves the executable bit.
**Warning signs:** Works with `node bin/install.js` but fails with `npx scriven`.

### Pitfall 5: STATE.md Not Realistic Enough
**What goes wrong:** Demo STATE.md has placeholder values or timestamps that look obviously fake, breaking the illusion of a real project.
**Why it happens:** Treating STATE.md as just another file to fill in rather than a living document that tells a story.
**How to avoid:** Write STATE.md as if a real writer used Scriven for a week. Include realistic timestamps, action history, and pending items that connect to the actual draft state (4 of 5 drafted, editor notes on scene 2).
**Warning signs:** `/scr:next` reads STATE.md and gives nonsensical recommendations.

### Pitfall 6: npm Dotfile Exclusion
**What goes wrong:** Files or directories starting with `.` (like `.manuscript/`) may be excluded by npm's default packing rules.
**Why it happens:** npm ignores dotfiles by default unless explicitly included in the `files` array.
**How to avoid:** Either (a) don't use a dot prefix for the demo manuscript directory (use `manuscript/` instead of `.manuscript/`), or (b) ensure the `files` array explicitly includes the dotfile path, or (c) test with `npm pack --dry-run` to verify inclusion.
**Warning signs:** `npm pack --dry-run` shows fewer files than expected.

**Critical note on this pitfall:** The demo ships inside `data/demo/` which is already in the `files` array. But the demo's internal structure uses `.manuscript/` (with dot prefix). npm's `files` whitelist applies at the package level, and once `data/` is whitelisted, subdirectory dotfiles *should* be included -- but this MUST be verified with `npm pack --dry-run` before publishing.

## Code Examples

### Running tests with node:test
```bash
# Run all tests
node --test test/*.test.js

# Run a specific test file
node --test test/constraints.test.js

# package.json script
# "test": "node --test test/*.test.js"
```

### CONSTRAINTS.json Validation Pattern
```javascript
// Source: Verified from codebase analysis of data/CONSTRAINTS.json
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

describe('CONSTRAINTS.json schema integrity', () => {
  const constraints = JSON.parse(
    fs.readFileSync(path.join(__dirname, '..', 'data', 'CONSTRAINTS.json'), 'utf-8')
  );

  it('every work_type references a valid group', () => {
    const groups = Object.keys(constraints.work_type_groups);
    for (const [typeName, typeObj] of Object.entries(constraints.work_types)) {
      assert.ok(
        groups.includes(typeObj.group),
        `work_type "${typeName}" references unknown group "${typeObj.group}"`
      );
    }
  });

  it('every group member exists in work_types', () => {
    for (const [groupName, groupObj] of Object.entries(constraints.work_type_groups)) {
      for (const member of groupObj.members) {
        assert.ok(
          constraints.work_types[member],
          `group "${groupName}" lists member "${member}" not found in work_types`
        );
      }
    }
  });

  it('every command references valid availability groups', () => {
    const groups = Object.keys(constraints.work_type_groups);
    for (const [cmdName, cmdObj] of Object.entries(constraints.commands)) {
      for (const avail of cmdObj.available) {
        if (avail === 'all') continue;
        assert.ok(
          groups.includes(avail),
          `command "${cmdName}" references unknown group "${avail}" in available`
        );
      }
    }
  });
});
```

### Command File Structure Validation
```javascript
// Source: Pattern analysis from commands/scr/*.md
describe('command file structure', () => {
  const commandsDir = path.join(__dirname, '..', 'commands', 'scr');
  const files = fs.readdirSync(commandsDir)
    .filter(f => f.endsWith('.md') && !f.startsWith('.'));

  for (const file of files) {
    describe(file, () => {
      const content = fs.readFileSync(path.join(commandsDir, file), 'utf-8');

      it('has YAML frontmatter', () => {
        assert.match(content, /^---\n[\s\S]*?\n---/);
      });

      it('has description in frontmatter', () => {
        const fm = content.match(/^---\n([\s\S]*?)\n---/);
        assert.ok(fm, 'No frontmatter found');
        assert.match(fm[1], /description:/);
      });

      it('has a markdown heading after frontmatter', () => {
        const afterFm = content.split(/^---\n[\s\S]*?\n---\n/)[1];
        assert.ok(afterFm, 'No content after frontmatter');
        assert.match(afterFm.trim(), /^#\s+/);
      });
    });
  }
});
```

### Package.json publishConfig
```json
{
  "publishConfig": {
    "access": "public"
  },
  "scripts": {
    "test": "node --test test/*.test.js",
    "prepublishOnly": "npm test"
  }
}
```

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | node:test (built-in, Node 18+) |
| Config file | none -- uses CLI flags only |
| Quick run command | `node --test test/*.test.js` |
| Full suite command | `node --test test/*.test.js` |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| MVP-01 | Demo files exist and are non-empty, all expected context files present | unit | `node --test test/demo.test.js` | Wave 0 |
| MVP-02 | CONSTRAINTS.json parses, schema integrity, cross-references valid | unit | `node --test test/constraints.test.js` | Wave 0 |
| MVP-03 | copyDir works, all 3 runtime configs produce correct paths, files land correctly | unit | `node --test test/installer.test.js` | Wave 0 |
| MVP-04 | All command .md files have frontmatter with description, heading after frontmatter | unit | `node --test test/commands.test.js` | Wave 0 |
| MVP-05 | package.json has bin, shebang, publishConfig, engines, files array covers all content | unit | `node --test test/package.test.js` | Wave 0 |
| MVP-06 | npm pack produces tarball with all expected files, npx dry-run works | integration | `node --test test/package.test.js` | Wave 0 |

### Sampling Rate
- **Per task commit:** `node --test test/*.test.js`
- **Per wave merge:** `node --test test/*.test.js`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `test/constraints.test.js` -- covers MVP-02
- [ ] `test/commands.test.js` -- covers MVP-04
- [ ] `test/installer.test.js` -- covers MVP-03
- [ ] `test/demo.test.js` -- covers MVP-01
- [ ] `test/package.test.js` -- covers MVP-05, MVP-06
- [ ] package.json `"test"` script needs to be added

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Classic npm tokens | Granular access tokens (90-day max) | Feb 2026 | All classic tokens revoked; must use granular tokens for publishing |
| Node 18 minimum | Node 20+ recommended | Node 18 EOL April 2025 | `engines` field says >=18 but 20+ is the realistic floor; `node:test` works in both |
| `npm pack` for verification | `npm pack --dry-run` | Stable | Best practice to verify package contents before publishing |

**Deprecated/outdated:**
- Classic npm tokens: Revoked Feb 2026. Use granular access tokens only.
- Node 18: EOL April 2025. Still listed as minimum in package.json but practically, users will have 20+.

## Open Questions

1. **Demo `.manuscript/` dot prefix in npm tarball**
   - What we know: `data/` is in the `files` array, which should include all subdirectories including those starting with dots
   - What's unclear: Whether npm's packing logic treats dot-prefixed subdirectories differently when they're nested inside a whitelisted directory
   - Recommendation: Add a test that runs `npm pack --dry-run` and verifies `.manuscript/` files appear; if they don't, rename to `manuscript/` (no dot) inside `data/demo/`

2. **Scene file naming convention**
   - What we know: demo.md says `{N}-*-DRAFT.md`, product plan section 16 says `{unit}-{N}-DRAFT.md` with files under `drafts/body/`
   - What's unclear: Whether existing commands expect the flat pattern or the nested `drafts/body/` pattern
   - Recommendation: Use the product plan section 16 structure (nested `drafts/body/`, `plans/`, `reviews/`) since that is canonical per project constraint "plan is canonical"

3. **install.js testability**
   - What we know: `copyDir()` is a standalone function but not exported
   - What's unclear: Best way to make it testable without breaking the interactive installer
   - Recommendation: Add `module.exports = { copyDir }` at the bottom of install.js, guarded or unconditional (it won't affect CLI execution since `main()` runs on require)

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Everything | Yes | v24.13.0 (at /opt/homebrew/bin/node) | -- |
| npm | Publishing | Yes (ships with Node) | -- | -- |

**Missing dependencies with no fallback:** None.

**Missing dependencies with fallback:** None.

This phase is purely code, content, and config -- no external tools required beyond Node.js.

## Sources

### Primary (HIGH confidence)
- Codebase analysis: `bin/install.js`, `package.json`, `data/CONSTRAINTS.json`, `commands/scr/*.md`, `templates/*.md`
- Product plan: `SCRIVEN-PRODUCT-PLAN-v0.3.md` sections 16 (file structure) and 19.4 (demo mode)
- Node.js test runner docs: https://nodejs.org/api/test.html
- npm publishing docs: https://docs.npmjs.com/cli/v10/commands/npm-publish

### Secondary (MEDIUM confidence)
- npm dotfile handling in `files` array: General npm documentation indicates whitelisted directories include all contents including dotfiles, but edge cases exist
- STATE.md project reference (STACK.md): npm token deprecation timeline, granular access tokens

### Tertiary (LOW confidence)
- None

## Project Constraints (from CLAUDE.md)

Key directives extracted from CLAUDE.md that apply to this phase:

- **Architecture**: Must remain a pure skill/command system -- no compiled code, no runtime dependencies beyond Node.js for the installer
- **Voice fidelity**: Every feature must preserve the Voice DNA pipeline -- demo STYLE-GUIDE.md must exemplify this
- **Backward compatibility**: Existing 28 commands and templates must continue working
- **Plan authority**: If a command file contradicts the product plan, fix the command -- plan is canonical
- **Progressive disclosure**: Onboarding asks 3 questions max
- **GSD Workflow Enforcement**: Before using Edit, Write, or other file-changing tools, start work through a GSD command

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - node:test is built-in, zero dependency decision is locked
- Architecture: HIGH - file structure well-defined by product plan and templates
- Pitfalls: HIGH - identified from direct codebase analysis of install.js, package.json, npm conventions
- Demo content: MEDIUM - prose quality is subjective; structure is certain but voice execution is creative work

**Research date:** 2026-04-06
**Valid until:** 2026-05-06 (stable domain, no fast-moving dependencies)
