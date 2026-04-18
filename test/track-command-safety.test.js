const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const trackCommand = fs.readFileSync(
  path.join(__dirname, '..', 'commands', 'scr', 'track.md'),
  'utf8'
);

describe('track command safety', () => {
  it('persists and reuses an explicit canon branch instead of assuming main/master', () => {
    assert.match(
      trackCommand,
      /"canon_branch": "trunk"/,
      'track.md should document canon_branch in tracks.json'
    );
    assert.match(
      trackCommand,
      /git rev-list --left-right --count \{canon_branch\}\.\.\.\{branch\}/,
      'track list should compare against the resolved canon branch'
    );
    assert.match(
      trackCommand,
      /git checkout \{canon_branch\}/,
      'track switch and merge should target the resolved canon branch'
    );
    assert.match(
      trackCommand,
      /git diff \{canon_branch\}\.\.\.\{branch\} -- \.manuscript\//,
      'track compare and propose should diff against the resolved canon branch'
    );
    assert.match(
      trackCommand,
      /If there is exactly one non-`track\/` local branch, use it as canon/i,
      'track.md should reuse the only local non-track branch for older repos without canon metadata'
    );
    assert.match(
      trackCommand,
      /fall back to `trunk` if it exists locally, then `main`, then `master`/i,
      'track.md should probe trunk before main/master in local fallback resolution'
    );
  });

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

  it('blocks fast-forward merges so merged metadata can land in the same final checkpoint', () => {
    assert.match(
      trackCommand,
      /git merge \{branch\} --no-ff --no-commit/,
      'track merge should block fast-forward so tracks.json updates can be committed in the same final merge checkpoint'
    );
  });

  it('resolves slug collisions before creating the revision-track branch', () => {
    assert.match(
      trackCommand,
      /Generate the slug identifier: lowercase, spaces to hyphens, strip special chars\. Do not add the `track\/` prefix yet;/,
      'track create should treat the slug as a bare identifier before branch-name prefixing'
    );
    assert.match(
      trackCommand,
      /Check whether `track\/\{slug\}` already exists as a branch[\s\S]*?append `-2`, `-3`, and so on to the slug identifier until you find an unused branch name[\s\S]*?Run `git checkout -b track\/\{slug\}`/,
      'track create should resolve branch-name collisions before running git checkout -b'
    );
    assert.doesNotMatch(
      trackCommand,
      /Generate the slugified branch name: lowercase, spaces to hyphens, strip special chars, prefix `track\/`\./,
      'track create should not describe the slug itself as already prefixed with track/'
    );
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
