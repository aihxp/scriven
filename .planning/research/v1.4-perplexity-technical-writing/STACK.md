# v1.4 Research — Stack

## Scope

Research for milestone `v1.4 Perplexity & Technical Writing`.

Focus:
- Perplexity runtime support
- Perplexity Desktop support
- technical-writing document support inside Scriven's existing markdown-first architecture

## Verified Findings

### Perplexity runtime surface

- Perplexity's official support article says **local MCPs are currently supported on macOS via the Perplexity Mac app**.
- The same article says **remote MCP is coming soon** and is **not yet the currently documented general surface**.
- Local MCP setup for the Mac app depends on a helper application, **PerplexityXPC**, plus a user-supplied command that launches an MCP server.

### Practical implication for Scriven

- Scriven should **not** model Perplexity support as a command-directory runtime like Claude Code or Cursor.
- The safest near-term interpretation is:
  - **Perplexity Desktop / Mac app** = a distinct runtime target with an MCP-oriented install flow
  - **Perplexity (broader/web)** = only supported if Scriven can honestly point to a real, documented Perplexity connector/runtime path

### Technical-writing stack implications

- No new runtime dependency is required just to add technical-writing work types.
- Existing stack assumptions still fit:
  - markdown command files
  - `CONSTRAINTS.json` for work-type gating and adaptations
  - existing export guidance for PDF, DOCX, HTML/EPUB-style outputs where relevant
- The milestone should avoid introducing doc-site frameworks, static-site generators, or new npm libraries unless there is a later, explicit need.

## Recommended Stack Direction

### Keep

- Node-only installer baseline
- markdown-first command system
- constraint-driven work-type modeling
- docs/runtime-support trust framing

### Add

- a **Perplexity Desktop** runtime entry if the installer can generate a useful MCP-oriented setup artifact or installation guidance
- a **Perplexity** runtime/support record only if the repo can document a real official target without overstating parity
- technical-writing work types and templates using existing markdown/template infrastructure

### Do Not Add

- npm runtime dependencies for Perplexity integration
- a bespoke Perplexity SDK dependency
- claims of verified parity across all Perplexity surfaces
- technical-writing support that assumes a full docs-site generator in this milestone

## Sources

- Perplexity Help Center — Local and Remote MCPs for Perplexity: <https://www.perplexity.ai/help-center/en/articles/11502712-local-and-remote-mcps-for-perplexity>
- Perplexity Docs — Agent API Quickstart: <https://docs.perplexity.ai/docs/agent-api/quickstart>

## Bottom Line

The stack path is conservative:
- treat **Perplexity Desktop (Mac app + local MCP)** as the concrete runtime surface
- treat broader **Perplexity support** as limited by current official connector/runtime evidence
- implement technical-writing support entirely inside the existing markdown/template/constraints system
