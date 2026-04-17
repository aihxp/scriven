// lib/architectural-profiles.js
// Phase 29 (v1.7) — runtime validator + default-inference for the tradition/platform project-spec keys.
// Zero dependencies. Uses only Node built-ins (fs, path).
//
// Reads authoritative seed list + defaults from data/CONSTRAINTS.json.
// Reads accepted-at-runtime list from templates/sacred/<slug>/ and templates/platforms/<slug>/
// directory listings — a contributor dropping a new subdirectory with a manifest.yaml
// extends the accepted set with no edit to this file or to CONSTRAINTS.json.

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SACRED_DIR = path.join(ROOT, 'templates', 'sacred');
const PLATFORMS_DIR = path.join(ROOT, 'templates', 'platforms');
const CONSTRAINTS_PATH = path.join(ROOT, 'data', 'CONSTRAINTS.json');
const SLUG_PATTERN = /^[a-z][a-z0-9-]*$/;

function loadConstraints() {
  // Re-read each call so tests that mutate a temp fixture see the update.
  // Cheap — file is ~45KB and hot on disk. If a perf issue ever surfaces, cache here.
  const raw = fs.readFileSync(CONSTRAINTS_PATH, 'utf8');
  return JSON.parse(raw);
}

function listProfiles(dir) {
  // Returns slugs of subdirectories of `dir` that contain a manifest.yaml.
  // Filters by SLUG_PATTERN to reject junk names (spaces, dots, etc.).
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const out = [];
  for (const e of entries) {
    if (!e.isDirectory()) continue;
    if (!SLUG_PATTERN.test(e.name)) continue;
    const manifest = path.join(dir, e.name, 'manifest.yaml');
    if (fs.existsSync(manifest)) out.push(e.name);
  }
  return out.sort();
}

function listTraditions() {
  return listProfiles(SACRED_DIR);
}

function listPlatforms() {
  return listProfiles(PLATFORMS_DIR);
}

function validateTradition(value) {
  const valid = listTraditions();
  if (valid.includes(value)) return { valid: true };
  return {
    valid: false,
    error: `Unknown tradition '${value}'. Valid options: ${valid.join(', ')}`
  };
}

function validatePlatform(value) {
  const valid = listPlatforms();
  if (valid.includes(value)) return { valid: true };
  return {
    valid: false,
    error: `Unknown platform '${value}'. Valid options: ${valid.join(', ')}`
  };
}

function inferTradition(workType) {
  try {
    const c = loadConstraints();
    const m = c.architectural_profiles && c.architectural_profiles.defaults_by_work_type && c.architectural_profiles.defaults_by_work_type.tradition;
    if (!m) return null;
    const v = m[workType];
    return v == null ? null : v;
  } catch (_err) {
    return null;
  }
}

function inferPlatform(workType) {
  try {
    const c = loadConstraints();
    const m = c.architectural_profiles && c.architectural_profiles.defaults_by_work_type && c.architectural_profiles.defaults_by_work_type.platform;
    if (!m) return null;
    const v = m[workType];
    return v == null ? null : v;
  } catch (_err) {
    return null;
  }
}

module.exports = {
  listTraditions,
  listPlatforms,
  validateTradition,
  validatePlatform,
  inferTradition,
  inferPlatform,
  // Private helpers exposed for tests:
  _paths: { SACRED_DIR, PLATFORMS_DIR, CONSTRAINTS_PATH },
  _loadConstraints: loadConstraints
};
