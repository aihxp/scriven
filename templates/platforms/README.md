# Publishing Platform Profiles

This directory is the drop-in extension point for per-platform publishing configs. Each subdirectory ships as a self-contained profile; Scriven's runtime reads the directory listing at load time — no core-template edits are required to add a platform.

## Adding a new platform

1. Create `templates/platforms/<your-platform-slug>/`.
2. Inside, add a `manifest.yaml` declaring: `platform`, `label`, `trim_sizes`, `max_pages`, `epub_variant`, `metadata_shape`, `formats_accepted`, `status`. See any of the shipped manifests for the shape.
3. Set `status: active` once the manifest is populated. Profiles with `status: placeholder` are recognized by the validator but signal "schema present, content pending."
4. Optional: add sibling files alongside `manifest.yaml` (per-platform CSS, metadata YAML, Typst snippets) as Phase 32 defines conventions.

## Currently seeded platforms (placeholders)

kdp, ingram, d2d, apple, kobo, google, bn, smashwords.

All 8 ship with `status: placeholder` in v1.7 Phase 29. Phase 32 populates their real content (trim sizes, page limits, metadata shapes, accepted formats).
