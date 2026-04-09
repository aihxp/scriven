---
phase: 17-perplexity-runtime-support
researched: 2026-04-09
status: complete
requirements:
  - RUNTIME-05
  - RUNTIME-06
  - RUNTIME-07
---

# Phase 17 Research: Perplexity Runtime Support

## Question

What is the narrowest truthful way to add Perplexity Desktop as a Scriven runtime target without inventing unsupported install mechanics or weakening the trust model established in v1.3?

## Current Repo Truth

### The installer only models file-copy runtimes today

- `bin/install.js` currently knows two runtime shapes:
  - `commands` runtimes with command and agent directories
  - `skills` runtimes with a `SKILL.md`-style manifest path
- `test/installer.test.js` enforces those two shapes directly.

**Implication:** Perplexity Desktop should not be forced into one of those categories unless the repo can prove a real file-copy surface that matches them.

### Runtime trust framing already has a good home

- `docs/runtime-support.md` is the canonical place for install type, repo evidence, support level, and verification status.
- `test/phase16-trust-regression.test.js` already protects the runtime-support matrix row-by-row against drift from `bin/install.js`.

**Implication:** Phase 17 should extend the same matrix and regression style rather than inventing a second support-policy surface.

### Scriven's voice model is stricter than Perplexity's persistent-context posture

- Scriven's core value depends on explicit, per-unit loading of `STYLE-GUIDE.md`.
- The v1.4 milestone research warns against treating persistent profile or space memory as equivalent to Scriven's explicit voice handoff.

**Implication:** Any Perplexity support should preserve explicit voice loading and treat persistent platform memory as optional convenience, not as the drafting source of truth.

## External Surface Research (from milestone research set)

### Verified direction

- Perplexity Desktop support is most credibly framed around the **Mac app local-MCP surface**.
- The setup appears to depend on Perplexity's desktop prerequisites plus an external MCP server command, rather than a writable Scriven command directory.
- Spaces, shortcuts, and broader Perplexity surfaces may still be useful conceptually, but they are not equivalent to a first-class local installer target in the current repo model.

### What not to claim

- Do not claim Perplexity web, desktop, Comet, Spaces, and shortcuts are one interchangeable runtime.
- Do not claim host-runtime parity.
- Do not imply Scriven can install itself into a Perplexity-owned command registry unless the repo has a real documented path for that.

## Recommended Planning Split

### Plan 17-01: Installer model and runtime matrix

Own:

- `RUNTIME-05`
- `RUNTIME-06`

Likely files:

- `bin/install.js`
- `test/installer.test.js`
- `docs/runtime-support.md`

Must-haves:

- add a named Perplexity Desktop installer target
- ensure the install flow matches a guided/manual desktop-MCP setup instead of fake file copying
- extend runtime matrix language so the new target has a support level and verification status that match reality

### Plan 17-02: Docs, troubleshooting, and trust coverage

Own:

- `RUNTIME-07`

Likely files:

- `README.md`
- `docs/runtime-support.md`
- `commands/scr/troubleshoot.md`
- `test/phase16-trust-regression.test.js`
- phase-specific runtime or docs tests as needed

Must-haves:

- distinguish Perplexity Desktop support from broader Perplexity support in launch-facing docs
- explain prerequisites and failure modes in troubleshooting/help surfaces
- add regression coverage so support framing cannot drift into overclaiming

## Risks to Plan Around

- If the installer pretends Perplexity is just another `commands` runtime, the repo repeats the credibility mistake v1.3 just fixed.
- If runtime docs collapse multiple Perplexity surfaces into one row or one label, users will not know what is actually supported.
- If voice loading becomes implicit or persistent-memory-driven, the milestone violates Scriven's core value even if the setup appears convenient.
- If test coverage only checks the runtime key exists, docs and trust wording can still drift silently.

## Validation Strategy

Phase 17 should only be considered ready for execution if the plans ensure all of the following:

- the installer target and its flow are honest about what Scriven does versus what the user configures in Perplexity
- `docs/runtime-support.md` preserves a canonical matrix row for Perplexity Desktop with support framing that matches the installer behavior
- launch and troubleshooting docs clearly separate Perplexity Desktop support from broader Perplexity support
- tests fail if the runtime row, support framing, or installer strategy drift apart

## Recommendation

Plan Phase 17 as **two plans**:

1. Add the Perplexity Desktop runtime target and the installer/matrix mechanics that make it truthful.
2. Add the docs, troubleshooting, and regression coverage that keep the support claim narrow and durable.

That keeps the phase aligned with the v1.3 trust model while leaving room for broader Perplexity surfaces in a later milestone.

## RESEARCH COMPLETE
