# Phase 17: Perplexity Runtime Support - Context

**Gathered:** 2026-04-09
**Status:** Ready for planning

<domain>
## Phase Boundary

Phase 17 adds a named **Perplexity Desktop** runtime target with an install flow and support framing that match the currently documented platform surface. This phase does not add broad "Perplexity everywhere" support, does not claim host-runtime parity, and does not change Scriven's core voice-preservation model.

</domain>

<decisions>
## Implementation Decisions

### Support boundary
- **D-01:** Scope this phase to **Perplexity Desktop (Mac app local-MCP surface)** only. Broader Perplexity web, Spaces, Tasks, and Comet support stay explicitly out of scope for phase 17 unless the repo can prove an equivalent install surface.
- **D-02:** Runtime docs must distinguish **Perplexity Desktop support** from broader **Perplexity support** in plain language so a user can tell exactly what is and is not supported without reading source code.

### Installer strategy
- **D-03:** Perplexity Desktop should be modeled as a **guided/manual MCP-oriented installer target**, not as a fake `commands` or `skills` file-copy runtime. The install flow should match the real platform surface even if that means the installer guides setup instead of copying command files.
- **D-04:** The install flow should assume Perplexity's own desktop prerequisites are external: the Mac app, PerplexityXPC helper, and an external MCP server command such as the filesystem server. Scriven should guide this setup, not vendor or install a custom runtime service.

### Voice and trust guardrails
- **D-05:** Perplexity support must preserve Scriven's Voice DNA discipline: `STYLE-GUIDE.md` remains an explicit per-unit input for drafting workflows. Persistent Perplexity memory, Spaces, or profile settings are convenience layers only and cannot replace the explicit voice handoff.
- **D-06:** Phase 17 must keep the v1.3 trust posture: installer target does not imply runtime parity, support level must be conservative, and every new claim must be backed by installer behavior, docs, and tests.

### Help and troubleshooting
- **D-07:** Help, runtime-support, and troubleshooting surfaces should explain the Perplexity path as a **desktop setup recipe** with prerequisites, support level, and likely failure modes, not as a drop-in copy install identical to Claude/Codex/Cursor.
- **D-08:** Any recommended filesystem MCP command examples should stay narrow and least-privilege by default, preferring the project root and only the relevant Scriven data directory when needed.

### Auto-selected gray areas
- **[auto] Runtime surface:** chose the narrowest provable surface: Perplexity Desktop local-MCP only.
- **[auto] Install model:** chose guided/manual MCP setup instead of inventing a command-directory or SKILL.md path.
- **[auto] Trust framing:** chose explicit "installer target, not parity proof" wording aligned with `docs/runtime-support.md`.
- **[auto] Voice model:** kept explicit `STYLE-GUIDE.md` loading as non-negotiable for any Perplexity drafting path.

### the agent's Discretion
- Exact naming for the Perplexity support level and install type, as long as it stays honest and distinct from existing `commands` / `skills` targets.
- Whether the installer registry uses a new runtime type or a guided/manual branch within the existing runtime model.
- The exact docs split across README, runtime matrix, troubleshooting, and installer output.

</decisions>

<specifics>
## Specific Ideas

- Perplexity Desktop should feel like a **supported guided setup**, not a fake parity claim.
- If a user sees "Perplexity" in the installer, they should immediately understand they are getting a **Mac desktop + local MCP** workflow, not a promise that every Perplexity surface behaves like Claude Code.
- Technical-writing work in Phase 18 should build on this same trust discipline: research first, then model the real document families.

</specifics>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Milestone and phase scope
- `.planning/PROJECT.md` — milestone goal, product constraints, and non-negotiable Voice DNA architecture
- `.planning/REQUIREMENTS.md` — `RUNTIME-05`, `RUNTIME-06`, and `RUNTIME-07` for phase 17
- `.planning/ROADMAP.md` — phase 17 goal, success criteria, and plan breakdown

### Research for this milestone
- `.planning/research/v1.4-perplexity-technical-writing/SUMMARY.md` — milestone-level research summary and recommended milestone shape
- `.planning/research/v1.4-perplexity-technical-writing/STACK.md` — source-backed recommendation for Perplexity Desktop local-MCP posture and no-new-dependency architecture
- `.planning/research/v1.4-perplexity-technical-writing/PITFALLS.md` — trust, scope, and architecture risks to avoid while adding Perplexity support
- `.planning/research/v1.4-perplexity-technical-writing/ARCHITECTURE.md` — touched files, likely integration surfaces, and build order

### Existing runtime trust model
- `docs/runtime-support.md` — canonical runtime matrix, support levels, and verification-status framing
- `bin/install.js` — current installer runtime registry and install strategy model
- `test/phase16-trust-regression.test.js` — canonical runtime-support matrix regression coverage pattern
- `commands/scr/troubleshoot.md` — current troubleshooting voice and problem-diagnosis expectations

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `bin/install.js`: current runtime registry, interactive runtime selection, Node baseline enforcement, and installer messaging
- `docs/runtime-support.md`: established matrix structure for install type, repo evidence, support level, and verification status
- `test/phase16-trust-regression.test.js`: row-level regression pattern already exists for protecting runtime-support claims
- `commands/scr/troubleshoot.md`: lightweight pattern for explaining setup problems and next-step fixes

### Established Patterns
- Runtime claims are centralized in `docs/runtime-support.md`, not spread ad hoc across launch docs.
- Installer targets currently fall into `commands` or `skills`; Perplexity likely needs a third posture or a guided branch so the installer does not pretend a file-copy path exists.
- v1.3 established a strong separation between **installer target evidence** and **host-runtime parity proof**. Phase 17 must reuse that model instead of weakening it.

### Integration Points
- `bin/install.js` will need the new Perplexity Desktop choice and its setup flow.
- `docs/runtime-support.md` will need a new row and probably clarified evidence/support labels for the new guided surface.
- README and troubleshooting/help surfaces will need wording that matches the matrix exactly.
- Tests should extend the existing runtime-support and installer coverage rather than adding disconnected assertions.

</code_context>

<deferred>
## Deferred Ideas

- Broader Perplexity web / Spaces / Tasks / Comet workflow support — separate future phase once there is a source-backed install or operating model
- Perplexity smoke verification across multiple host surfaces — later runtime-expansion work
- Scriven-authored MCP server or any new executable service surface — out of scope for this milestone

</deferred>

---

*Phase: 17-perplexity-runtime-support*
*Context gathered: 2026-04-09*
