const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), 'utf8');
}

describe('Phase 42: cover asset contract', () => {
  const coverArt = read('commands/scr/cover-art.md');
  const publish = read('commands/scr/publish.md');
  const publishing = read('docs/publishing.md');

  it('defines canonical build-surface cover asset paths', () => {
    for (const doc of [coverArt, publish, publishing]) {
      assert.match(doc, /\.manuscript\/build\/ebook-cover\.(jpg|png)/i);
      assert.match(doc, /\.manuscript\/build\/paperback-cover\.pdf/i);
      assert.match(doc, /\.manuscript\/build\/hardcover-cover\.pdf/i);
    }
  });

  it('keeps editable source files under the build/source contract', () => {
    assert.match(coverArt, /\.manuscript\/build\/source\//i);
    assert.match(publishing, /\.manuscript\/build\/source\//i);
  });

  it('keeps prompt outputs separate from final cover deliverables', () => {
    assert.match(coverArt, /\.manuscript\/illustrations\/cover\//i);
    assert.match(coverArt, /final packaged cover files/i);
    assert.match(coverArt, /\.manuscript\/build\//i);
  });
});
