# Phase 36: Canonical Command Inventory - Context

**Gathered:** 2026-04-17
**Status:** Completed

<domain>
## Phase Boundary

Make the installer, manifest surface, and sacred namespace derive from one file-backed command inventory so `/scr:sacred:*` remains the canonical installed sacred surface.

</domain>

<decisions>
## Implementation Decisions

### Canonical inventory
- Treat `commands/scr/**.md` as the single source of truth for installed commands.
- Keep sacred-exclusive commands namespaced as `/scr:sacred:*`.

### Manifest policy
- Generate generic manifest rows from the canonical file-backed inventory instead of synthesizing top-level sacred commands from `CONSTRAINTS.json`.

</decisions>
