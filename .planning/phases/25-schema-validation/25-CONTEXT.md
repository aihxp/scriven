# Phase 25: Schema Validation - Context

**Gathered:** 2026-04-16
**Status:** Ready for planning
**Mode:** Auto-generated (discuss skipped via workflow.skip_discuss)

<domain>
## Phase Boundary

Settings read from `.scriven/settings.json` are validated against a hand-written schema. Type mismatches, unknown fields, and missing required fields produce clear error messages. Old-format settings are migrated before validation so upgrades don't break.

**Requirements:** SCHEMA-01, SCHEMA-02

**Success Criteria:**
1. Schema validates every field with human-readable messages
2. Old-format settings migrated before validation
3. Invalid field causes loud failure with field name and expected type

</domain>

<decisions>
## Implementation Decisions

### Claude's Discretion
All implementation choices are at Claude's discretion. Hand-written validator per research guidance — no Ajv, no dependencies.

Key research-derived guidance:
- Settings object is flat (~10 fields) with known types
- Hand-written validator with explicit type checks and enum constraints
- Migration MUST run before validation (bootstrap deadlock anti-pattern)
- Use `readJsonIfExists` raw read as the foundation for migration
- Error messages should include field name, expected type, and received value

### Known settings schema (from writeSharedAssets)
```js
{
  version: string,           // required, semver
  runtime: string,           // required, known runtime key OR empty
  runtimes: string[],        // required, array of known runtime keys
  scope: 'global' | 'project',  // required enum
  developer_mode: boolean,   // required
  data_dir: string,          // required, absolute path
  install_mode: 'interactive' | 'non-interactive',  // required enum
  installed_at: string,      // required, ISO 8601 timestamp
}
```

</decisions>

<code_context>
## Existing Code Insights

### Current Read Path
- `readJsonIfExists(filePath)` returns parsed JSON or null (no validation)
- `writeSharedAssets` constructs settings object and writes it
- No read/validate code currently exists — settings are written but never read back with validation

### Integration Point
- New `readSettings(dataDir)` function that reads, migrates, validates, returns typed object
- Used by future phases (26 — Settings Preservation) and any new code that needs to read settings
- Schema validation runs AFTER migration so old settings don't get rejected

</code_context>

<specifics>
## Specific Ideas

No specific requirements — discuss phase skipped.

</specifics>

<deferred>
## Deferred Ideas

Bootstrap deadlock prevention — migration must precede validation (called out explicitly in research PITFALLS.md).

</deferred>
