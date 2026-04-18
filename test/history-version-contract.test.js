const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), 'utf8');
}

describe('history and versions command contracts', () => {
  it('history only queries save commits and enforces its default limit', () => {
    const history = read('commands/scr/history.md');

    assert.match(
      history,
      /git log --format="%H\|%ai\|%s" --grep="\^\(Saved\|Initial save\)" --extended-regexp -n \{limit\} \.manuscript\//,
      'history.md should retrieve only save commits and apply the requested/default limit'
    );
    assert.match(
      history,
      /exclude administrative manuscript commits such as revision-track creation, proposals, and merges/i,
      'history.md should explicitly exclude non-save manuscript commits'
    );
  });

  it('versions enforces its default limit and excludes non-save manuscript commits', () => {
    const versions = read('commands/scr/versions.md');

    assert.match(
      versions,
      /git log --format="%H\|%ai\|%s" --grep="\^\(Saved\|Initial save\)" --extended-regexp -n 10 \.manuscript\//,
      'versions.md should enforce the documented default limit of 10 save versions'
    );
    assert.match(
      versions,
      /drop the `-n 10` limit and retrieve the complete save-version list instead/i,
      'versions.md should explain how --all removes the default limit'
    );
    assert.match(
      versions,
      /exclude administrative manuscript commits such as revision-track creation, proposals, and merges/i,
      'versions.md should explicitly exclude non-save manuscript commits'
    );
  });

  it('release notes include the current 1.5.2 package release', () => {
    const releaseNotes = read('docs/release-notes.md');

    assert.match(
      releaseNotes,
      /## 1\.5\.2 - 2026-04-09/,
      'release-notes.md should document the current 1.5.2 package release'
    );
  });
});
