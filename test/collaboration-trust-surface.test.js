const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), 'utf8');
}

function collectCommandCount(dir) {
  let count = 0;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      count += collectCommandCount(fullPath);
      continue;
    }

    if (entry.isFile() && entry.name.endsWith('.md')) {
      count += 1;
    }
  }

  return count;
}

describe('collaboration trust surfaces', () => {
  const gettingStarted = read('docs/getting-started.md');
  const commandReference = read('docs/command-reference.md');
  const readme = read('README.md');
  const sessionReport = read('commands/scr/session-report.md');
  const commandCount = collectCommandCount(path.join(ROOT, 'commands', 'scr'));

  it('keeps launch docs aligned to the live command inventory count', () => {
    assert.match(
      readme,
      new RegExp(`${commandCount} writing commands`),
      'README.md should keep its headline command count aligned to the live command tree'
    );
    assert.match(
      readme,
      new RegExp(`All ${commandCount} commands`),
      'README.md should keep its command-reference pointer aligned to the live command tree'
    );
  });

  it('keeps onboarding collaboration centered on /scr-track and versions distinct', () => {
    assert.match(
      gettingStarted,
      /\*\*Collaboration\*\* -- `\/scr-track` for revision tracks \(`create`, `compare`, `merge`, `propose`\)/,
      'docs/getting-started.md should teach /scr-track as the collaboration entrypoint'
    );
    assert.match(
      gettingStarted,
      /\*\*Versions\*\* -- `\/scr-save`, `\/scr-history`, `\/scr-versions`, `\/scr-compare`/,
      'docs/getting-started.md should keep save-history commands in a separate versions bucket'
    );
    assert.doesNotMatch(
      gettingStarted,
      /\*\*Collaboration\*\* -- `\/scr-save`, `\/scr-history`, `\/scr-compare`/,
      'docs/getting-started.md should not present save-history commands as the collaboration surface'
    );
  });

  it('keeps the public collaboration reference on the canon-manuscript model', () => {
    assert.match(
      commandReference,
      /Revision tracks and their collaboration subcommands/,
      'docs/command-reference.md should describe collaboration as a track-centered surface'
    );
    assert.match(
      commandReference,
      /- `merge` -- Merge a track into the canon manuscript/,
      'docs/command-reference.md should use canon-manuscript terminology for track merge'
    );
    assert.match(
      commandReference,
      /without affecting your canon manuscript\./,
      'docs/command-reference.md examples should use canon-manuscript terminology'
    );
    assert.doesNotMatch(
      commandReference,
      /main draft/,
      'docs/command-reference.md should not revert to the older main-draft terminology'
    );
  });

  it('keeps session-report duration fallback on save commits only', () => {
    assert.match(
      sessionReport,
      /git log --format="%ai\|%s" --grep="\^\(Saved\|Initial save\)" --extended-regexp \.manuscript\//,
      'session-report.md should estimate duration from save commits only'
    );
    assert.match(
      sessionReport,
      /Do not use administrative manuscript commits such as revision-track creation, proposals, or merges for session timing\./,
      'session-report.md should explicitly exclude admin commits from duration estimation'
    );
  });
});
