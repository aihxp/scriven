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
    const commandReference = read('docs/command-reference.md');

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
    assert.match(
      commandReference,
      /- `--all` -- Remove the default 10-version limit and show the complete save-version list/,
      'command-reference.md should describe versions --all as removing the default limit only'
    );
    assert.doesNotMatch(
      commandReference,
      /including archived drafts/i,
      'command-reference.md should not promise archived-draft support for versions --all'
    );
  });

  it('compare resolves numbered saves from filtered save history instead of raw HEAD offsets', () => {
    const compare = read('commands/scr/compare.md');

    assert.match(
      compare,
      /git log --format="%H\|%s" --grep="\^\(Saved\|Initial save\)" --extended-regexp \.manuscript\//,
      'compare.md should load save history from filtered save commits only'
    );
    assert.match(
      compare,
      /Do not count administrative manuscript commits such as revision-track creation, proposals, or merges/i,
      'compare.md should explicitly exclude non-save manuscript commits from save indexing'
    );
    assert.match(
      compare,
      /git diff \{save-hash-1\} -- \.manuscript\//,
      'compare.md should diff against the resolved most-recent save hash, not HEAD~1'
    );
    assert.match(
      compare,
      /git diff \{save-hash-N\} \{save-hash-M\} -- \.manuscript\//,
      'compare.md should diff historical saves by their resolved save hashes'
    );
    assert.doesNotMatch(
      compare,
      /HEAD~1|HEAD~N/,
      'compare.md should not resolve save numbers with raw HEAD offsets'
    );
  });

  it('undo targets the most recent filtered save checkpoint instead of raw manuscript history', () => {
    const undo = read('commands/scr/undo.md');

    assert.match(
      undo,
      /git log --format="%H\|%s" --grep="\^\(Saved\|Initial save\)" --extended-regexp \.manuscript\//,
      'undo.md should count save checkpoints from filtered save history only'
    );
    assert.match(
      undo,
      /git log -1 --format="%H\|%s" --grep="\^\(Saved\|Initial save\)" --extended-regexp \.manuscript\//,
      'undo.md should select the most recent actual save as its revert target'
    );
    assert.match(
      undo,
      /Do not treat revision-track creation, proposals, merges, or other administrative manuscript commits as undo targets/i,
      'undo.md should explicitly exclude administrative manuscript commits from undo targeting'
    );
    assert.doesNotMatch(
      undo,
      /git rev-list --count HEAD -- \.manuscript\//,
      'undo.md should not count raw manuscript commits when deciding whether undo is available'
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
