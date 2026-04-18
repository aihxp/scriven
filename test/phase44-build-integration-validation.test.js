const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), 'utf8');
}

describe('Phase 44: build integration and validation', () => {
  const buildEbook = read('commands/scr/build-ebook.md');
  const buildPrint = read('commands/scr/build-print.md');
  const exportDoc = read('commands/scr/export.md');
  const commandReference = read('docs/command-reference.md');
  const shippedAssets = read('docs/shipped-assets.md');

  it('build and export commands point EPUB cover embedding at the canonical ebook asset', () => {
    assert.match(buildEbook, /\.manuscript\/build\/ebook-cover\.jpg/i);
    assert.match(exportDoc, /\.manuscript\/build\/ebook-cover\.jpg/i);
    assert.doesNotMatch(buildEbook, /\.manuscript\/output\/cover\.jpg/i);
    assert.doesNotMatch(exportDoc, /\.manuscript\/output\/cover\.jpg/i);
  });

  it('print build and packaging flows point at the canonical print-cover files', () => {
    for (const doc of [buildPrint, exportDoc, commandReference]) {
      assert.match(doc, /\.manuscript\/build\/paperback-cover\.pdf/i);
    }

    assert.match(buildPrint, /\.manuscript\/build\/hardcover-cover\.pdf/i);
    assert.match(exportDoc, /\.manuscript\/build\/hardcover-cover\.pdf/i);
  });

  it('build and reference surfaces explain that print covers come from external templates', () => {
    for (const doc of [buildPrint, exportDoc, commandReference]) {
      assert.match(doc, /template generator|wrap geometry|hard-coded wrap geometry/i);
    }
  });

  it('trust-facing docs distinguish bundled templates from cover build assets', () => {
    assert.match(commandReference, /kdp-paperback/i);
    assert.match(commandReference, /\.manuscript\/build\/paperback-cover\.pdf/i);
    assert.doesNotMatch(commandReference, /generate cover template/i);

    assert.match(shippedAssets, /\.manuscript\/build\/ebook-cover\.(jpg|png)/i);
    assert.match(shippedAssets, /\.manuscript\/build\/paperback-cover\.pdf/i);
    assert.match(shippedAssets, /\.manuscript\/build\/hardcover-cover\.pdf/i);
    assert.match(shippedAssets, /not bundled export templates/i);
    assert.match(shippedAssets, /template generator/i);
  });
});
