const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const { RUNTIMES } = require('../bin/install.js');

const ROOT = path.join(__dirname, '..');
const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), 'utf8');
}

describe('phase 14 installer baseline', () => {
  const installJs = read('bin/install.js');

  it('keeps package metadata and installer guidance on the same Node floor', () => {
    assert.equal(pkg.engines.node, '>=20.0.0');
    assert.match(installJs, /Node\.js 20\+/);
    assert.match(installJs, /varying support evidence/);
  });
});

describe('phase 14 runtime matrix', () => {
  const runtimeSupport = read('docs/runtime-support.md');

  it('keeps the canonical runtime-support sections intact', () => {
    const expectedHeadings = [
      '# Runtime Support',
      '## Node.js Baseline',
      '## Evidence Levels',
      '## Support Levels',
      '## Verification Status',
      '## Runtime Compatibility Matrix',
      '## What Scriven Proves Today',
    ];

    for (const heading of expectedHeadings) {
      assert.match(runtimeSupport, new RegExp(heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    }
  });

  it('keeps every installer runtime represented in the compatibility matrix', () => {
    for (const runtime of Object.values(RUNTIMES)) {
      assert.match(
        runtimeSupport,
        new RegExp(`\\| ${runtime.label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')} \\|`),
        `docs/runtime-support.md should include a row for ${runtime.label}`
      );
    }
  });
});

describe('phase 14 runtime credibility wiring', () => {
  const architectureDoc = read('docs/architecture.md');
  const shippedAssets = read('docs/shipped-assets.md');
  const readme = read('README.md');
  const gettingStarted = read('docs/getting-started.md');
  const agentsDoc = read('AGENTS.md');
  const claudeDoc = read('CLAUDE.md');

  it('keeps architecture and trust inventory pointed at the canonical matrix', () => {
    assert.match(architectureDoc, /\[`docs\/runtime-support\.md`\]\(runtime-support\.md\)/);
    assert.match(shippedAssets, /docs\/runtime-support\.md/);
  });

  it('keeps launch and onboarding docs on installer-target language', () => {
    assert.match(readme, /Node\.js 20\+/);
    assert.match(readme, /\[Runtime Support\]\(docs\/runtime-support\.md\)/);
    assert.match(readme, /installer targets/);
    assert.doesNotMatch(readme, /\bfull support\b/i);

    assert.match(gettingStarted, /Node\.js 20\+/);
    assert.match(gettingStarted, /\[Runtime Support\]\(runtime-support\.md\)/);
    assert.match(gettingStarted, /installer targets/);
    assert.doesNotMatch(gettingStarted, /\bsupported runtimes\b/i);
  });

  it('keeps root instruction docs aligned to runtime-credibility policy', () => {
    for (const [name, doc] of [['AGENTS.md', agentsDoc], ['CLAUDE.md', claudeDoc]]) {
      assert.match(doc, /Node 20\+/, `${name} should state the Node 20+ baseline`);
      assert.match(doc, /docs\/runtime-support\.md/, `${name} should reference the canonical matrix`);
      assert.match(doc, /host-runtime parity/, `${name} should preserve the parity caveat`);
      assert.doesNotMatch(doc, /consider bumping/i, `${name} should not treat Node 20 as tentative`);
    }
  });
});
