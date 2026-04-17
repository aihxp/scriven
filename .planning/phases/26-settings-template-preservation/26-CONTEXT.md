# Phase 26: Settings & Template Preservation - Context

**Gathered:** 2026-04-16
**Status:** Ready for planning
**Mode:** Auto-generated (discuss skipped via workflow.skip_discuss)

<domain>
## Phase Boundary

Users who customize their settings or templates do not lose customizations when reinstalling. Settings use field-level merge (installer-owned fields update, user-set fields preserved). User-customized templates are backed up before overwrite via content-hash comparison.

**Requirements:** PRES-01, PRES-02

**Success Criteria:**
1. User-set settings.json fields preserved across reinstall; installer fields updated
2. User-customized templates backed up before overwrite at predictable path
3. Unmodified templates silently replaced without backup

</domain>

<decisions>
## Implementation Decisions

### Claude's Discretion
All implementation choices are at Claude's discretion.

Key research-derived guidance:
- SHA-256 content hashing to detect user modifications (timestamps are unreliable)
- Backup path: `<target>.backup.<timestamp>` or similar predictable pattern
- Settings merge: installer-owned fields (version, runtime, runtimes, scope, installed_at, data_dir, install_mode) OVERWRITE; user fields (developer_mode, and any unknown fields) PRESERVE
- Use Phase 25's readSettings/validateSettings for the read side
- Use Phase 23's atomicWriteFileSync for all writes
- Remove the destructive `removePathIfExists(path.join(dataDir, 'templates'))` and `removePathIfExists(path.join(dataDir, 'data'))` calls in writeSharedAssets

### Installer-owned vs User-owned settings fields
- **Installer-owned (overwrite):** version, runtime, runtimes, scope, data_dir, install_mode, installed_at
- **User-owned (preserve):** developer_mode, any unknown fields

</decisions>

<code_context>
## Existing Code Insights

### Current Destructive Pattern (writeSharedAssets at bin/install.js:922)
```js
function writeSharedAssets(dataDir, runtimeKeys, isGlobal, developerMode, installMode, log) {
  removePathIfExists(path.join(dataDir, 'templates'));
  removePathIfExists(path.join(dataDir, 'data'));
  fs.mkdirSync(path.join(dataDir, 'templates'), { recursive: true });
  fs.mkdirSync(path.join(dataDir, 'data'), { recursive: true });
  const templateCount = copyDir(...);
  const dataCount = copyDir(...);
  // writes settings.json (already atomic after Phase 23)
}
```

### Change Required
Replace destructive copy with per-file preservation logic:
1. For each template file, compute SHA-256 of source and destination
2. If hashes match → no-op (template unmodified by user, replace with latest)
3. If destination doesn't exist → copy source (fresh install)
4. If hashes differ → back up destination to `<dest>.backup.<timestamp>`, then copy source
5. For settings: read existing, merge user fields onto new installer fields, write atomically

</code_context>

<specifics>
## Specific Ideas

No specific requirements — discuss phase skipped.

</specifics>

<deferred>
## Deferred Ideas

None — discuss phase skipped.

</deferred>
