const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const { RUNTIMES } = require('../bin/install.js');

const ROOT = path.join(__dirname, '..');

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), 'utf8');
}

function exists(relativePath) {
  return fs.existsSync(path.join(ROOT, relativePath));
}

describe('trust-critical shipped assets', () => {
  const shippedAssets = read('docs/shipped-assets.md');

  it('matches the currently shipped export templates on disk', () => {
    const shippedTemplates = [
      'data/export-templates/scriven-book.typst',
      'data/export-templates/scriven-epub.css',
      'data/export-templates/scriven-academic.latex',
    ];

    for (const templatePath of shippedTemplates) {
      assert.ok(
        shippedAssets.includes(path.basename(templatePath)),
        `docs/shipped-assets.md should list ${path.basename(templatePath)}`
      );
      assert.ok(exists(templatePath), `Expected shipped template to exist: ${templatePath}`);
    }
  });

  it('still marks planned-but-unshipped templates as absent', () => {
    const absentTemplates = [
      'data/export-templates/scriven-manuscript.docx',
      'data/export-templates/scriven-formatted.docx',
      'data/export-templates/scriven-kdp-cover.typst',
      'data/export-templates/scriven-ingram-cover.typst',
    ];

    for (const templatePath of absentTemplates) {
      assert.ok(
        shippedAssets.includes(path.basename(templatePath)),
        `docs/shipped-assets.md should mention ${path.basename(templatePath)} as not shipped`
      );
      assert.ok(!exists(templatePath), `Expected template to remain absent: ${templatePath}`);
    }
  });

  it('lists trust-critical launch files that still exist', () => {
    const trustCriticalFiles = [
      'README.md',
      'docs/proof-artifacts.md',
      'docs/runtime-support.md',
      'data/proof/watchmaker-flow/README.md',
      'commands/scr/export.md',
      'docs/publishing.md',
      'docs/contributing.md',
      'AGENTS.md',
      'CLAUDE.md',
    ];

    for (const relativePath of trustCriticalFiles) {
      assert.ok(
        shippedAssets.includes(`\`${relativePath}\``),
        `docs/shipped-assets.md should inventory ${relativePath}`
      );
      assert.ok(exists(relativePath), `Trust-critical file is missing: ${relativePath}`);
    }
  });
});

describe('launch-surface regression checks', () => {
  const readme = read('README.md');
  const gettingStarted = read('docs/getting-started.md');

  it('keeps proof and runtime links visible from launch and onboarding docs', () => {
    assert.match(readme, /\[Proof Artifacts\]\(docs\/proof-artifacts\.md\)/);
    assert.match(readme, /\[Runtime Support\]\(docs\/runtime-support\.md\)/);
    assert.match(readme, /\[Shipped Assets\]\(docs\/shipped-assets\.md\)/);
    assert.match(gettingStarted, /\[Proof Artifacts\]\(proof-artifacts\.md\)/);
    assert.match(gettingStarted, /\[Runtime Support\]\(runtime-support\.md\)/);
  });

  it('does not reintroduce forbidden absolute launch claims', () => {
    const forbiddenPhrases = [
      /\bAll features shipped\b/i,
      /\bfull support\b/i,
    ];

    for (const pattern of forbiddenPhrases) {
      assert.ok(!pattern.test(readme), `README.md should not contain forbidden phrase: ${pattern}`);
    }
  });
});

describe('canonical proof hub integrity', () => {
  const proofArtifacts = read('docs/proof-artifacts.md');

  it('references proof artifact files that exist', () => {
    const canonicalArtifacts = [
      'data/proof/watchmaker-flow/README.md',
      'data/proof/voice-dna/README.md',
      'data/proof/voice-dna/STYLE-GUIDE-EXCERPT.md',
      'data/proof/voice-dna/UNGUIDED-SAMPLE.md',
      'data/proof/voice-dna/GUIDED-SAMPLE.md',
    ];

    for (const relativePath of canonicalArtifacts) {
      assert.ok(
        proofArtifacts.includes(`\`${relativePath}\``),
        `docs/proof-artifacts.md should reference ${relativePath}`
      );
      assert.ok(exists(relativePath), `Proof artifact is missing: ${relativePath}`);
    }
  });
});

describe('runtime support regression checks', () => {
  const runtimeSupport = read('docs/runtime-support.md');

  it('keeps the Node 20+ baseline visible', () => {
    assert.match(runtimeSupport, /Node\.js 20\+/);
    assert.match(runtimeSupport, />=20\.0\.0/);
  });

  it('covers every installer runtime label from bin/install.js', () => {
    for (const runtime of Object.values(RUNTIMES)) {
      assert.ok(
        runtimeSupport.includes(`| ${runtime.label} |`),
        `docs/runtime-support.md should include a matrix row for ${runtime.label}`
      );
    }
  });
});
