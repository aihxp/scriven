# Requirements: Scriven v1.6 Installer Hardening

**Status:** Active
**Last archived milestone:** [v1.5 requirements](/Users/hprincivil/Projects/scriven/.planning/milestones/v1.5-REQUIREMENTS.md)

## Milestone Goal

Fix bugs and fragilities in Scriven's installer identified by cross-referencing GSD releases v1.33-v1.36 against the Scriven codebase. No new features -- reliability and correctness pass on the existing installer.

## Active Requirements

### File Safety

- [ ] **SAFE-01**: Installer writes all generated files (settings.json, manifests, SKILL.md, skill wrappers) atomically via temp-file-then-rename so an interrupted install never leaves a truncated file
- [ ] **SAFE-02**: Installer detects and cleans orphaned `.tmp.*` files from previous interrupted installs on startup before writing new files

### Frontmatter Parsing

- [ ] **PARSE-01**: `readFrontmatterValue` correctly extracts values containing colons (e.g., `description: "Step 1: Do this"`) by splitting only on the first colon
- [ ] **PARSE-02**: Frontmatter parser scopes extraction to the `---` delimited block only, ignoring matches in the command body
- [ ] **PARSE-03**: Frontmatter parser handles multiline values and array values if present in command files

### Config Preservation

- [ ] **PRES-01**: User's `settings.json` fields survive reinstallation via field-level merge (installer-owned fields update, user-set fields preserved)
- [ ] **PRES-02**: User-customized templates are backed up before overwrite using content-hash comparison against the shipped version

### Schema Validation

- [ ] **SCHEMA-01**: Settings read from `settings.json` are validated against a hand-written schema with clear error messages for type mismatches, unknown fields, and missing required fields
- [ ] **SCHEMA-02**: Schema validation runs after migration so old-format settings are upgraded before being rejected

### Command-Ref Rewriting

- [ ] **REWRITE-01**: Installed command files for all runtimes contain correct invocation syntax for cross-references (not just Claude Code)
- [ ] **REWRITE-02**: Command-ref rewriting preserves references inside fenced code blocks unchanged

### Test Coverage

- [ ] **QA-05**: All hardening features have regression tests that fail if atomic writes, frontmatter parsing, settings preservation, schema validation, or command-ref rewriting behavior drifts

## Notes

- Zero-dependency installer architecture must be preserved
- All hardening features use Node.js 20+ built-ins exclusively
- These are bugs or fragilities that GSD already shipped fixes for in v1.33-v1.36
- Preserve Voice DNA as the non-negotiable drafting anchor
- Preserve existing `/scr:*` command files and runtime installer behavior

## Future Requirements

- Lockfile for concurrent install protection (deferred to v1.7 if needed)
- Template manifest with per-file ownership tracking (deferred -- content-hash sufficient for now)
- `_user_overrides` sub-object in settings for explicit user/installer field boundary (deferred)

## Out of Scope

- Adding npm runtime dependencies -- zero-dependency constraint preserved
- New installer features or runtime targets -- this milestone is correctness-only
- Breaking changes to settings.json format -- migration handles old formats

## Traceability

| Requirement | Phase | Plan |
|-------------|-------|------|
| SAFE-01 | Phase 23 | — |
| SAFE-02 | Phase 23 | — |
| PARSE-01 | Phase 24 | — |
| PARSE-02 | Phase 24 | — |
| PARSE-03 | Phase 24 | — |
| PRES-01 | Phase 26 | — |
| PRES-02 | Phase 26 | — |
| SCHEMA-01 | Phase 25 | — |
| SCHEMA-02 | Phase 25 | — |
| REWRITE-01 | Phase 27 | — |
| REWRITE-02 | Phase 27 | — |
| QA-05 | Phase 28 | — |

---
*Defined: 2026-04-16 for milestone v1.6*
