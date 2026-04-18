const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const trackCommand = fs.readFileSync(
  path.join(__dirname, '..', 'commands', 'scr', 'track.md'),
  'utf8'
);

describe('track command safety', () => {
  it('does not embed raw writer-provided track names inside git commit commands', () => {
    assert.doesNotMatch(
      trackCommand,
      /git commit -m "[^"]*<name>[^"]*"/,
      'track.md should not interpolate raw <name> values into git commit commands'
    );
  });

  it('uses sanitized slug identifiers for git-backed create, merge, and propose commits', () => {
    assert.match(trackCommand, /git commit -m "Created revision track: track\/\{slug\}"/);
    assert.match(trackCommand, /git commit -m "Merged revision track: track\/\{slug\}"/);
    assert.match(trackCommand, /git commit -m "Merged revision track: track\/\{slug\} \(conflicts resolved\)"/);
    assert.match(trackCommand, /git commit -m "Created revision proposal: track\/\{track-slug\}"/);
  });

  it('commits track metadata updates in the same checkpoint as the create and propose flows', () => {
    assert.match(
      trackCommand,
      /Read `\.manuscript\/config\.json`[\s\S]*?git add \.manuscript\/tracks\.json \.manuscript\/config\.json[\s\S]*?git commit -m "Created revision track: track\/\{slug\}"/,
      'track create should include tracks_enabled config changes in the same commit'
    );

    assert.match(
      trackCommand,
      /Update `tracks\.json`: set `proposed_at`[\s\S]*?git add \.manuscript\/proposals\/\{track-slug\}-proposal\.md \.manuscript\/tracks\.json[\s\S]*?git commit -m "Created revision proposal: track\/\{track-slug\}"/,
      'track propose should commit proposed_at metadata together with the proposal file'
    );
  });
});
