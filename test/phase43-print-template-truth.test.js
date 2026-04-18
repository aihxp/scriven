const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), 'utf8');
}

describe('Phase 43: print template truth', () => {
  const coverArt = read('commands/scr/cover-art.md');
  const exportDoc = read('commands/scr/export.md');
  const publishing = read('docs/publishing.md');

  it('locks the ebook cover spec to the front-only RGB asset contract', () => {
    for (const doc of [coverArt, publishing]) {
      assert.match(doc, /1600 x 2560/i);
      assert.match(doc, /RGB/i);
      assert.match(doc, /front cover only/i);
    }
  });

  it('locks paperback and hardcover to PDF/X-1a CMYK print requirements', () => {
    for (const doc of [coverArt, exportDoc, publishing]) {
      assert.match(doc, /PDF\/X-1a:2001/i);
      assert.match(doc, /CMYK/i);
      assert.match(doc, /300 DPI/i);
    }

    assert.match(coverArt, /0\.125"/i);
    assert.match(coverArt, /0\.75"/i);
  });

  it('treats exact print geometry as template-driven instead of hard-coded paper math', () => {
    for (const doc of [coverArt, exportDoc, publishing]) {
      assert.match(doc, /template generator/i);
      assert.doesNotMatch(doc, /0\.002252|paper_factor|spine_width\s*=/i);
    }
  });
});
