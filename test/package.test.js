const { describe, it, before } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { execSync } = require('node:child_process');

const pkgPath = path.join(__dirname, '..', 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));

describe('package.json fields', () => {
  it('has correct name', () => {
    assert.equal(pkg.name, 'scriven');
  });

  it('has bin entry pointing to install.js', () => {
    assert.equal(pkg.bin.scriven, './bin/install.js');
  });

  it('has engines field', () => {
    assert.ok(pkg.engines.node, 'engines.node should be defined');
    assert.ok(
      pkg.engines.node.startsWith('>='),
      `engines.node should start with ">=" but got "${pkg.engines.node}"`
    );
  });

  it('has publishConfig with public access', () => {
    assert.equal(pkg.publishConfig.access, 'public');
  });

  it('has files array', () => {
    assert.ok(Array.isArray(pkg.files), 'files should be an array');
    assert.ok(
      pkg.files.includes('data/'),
      'files should include "data/"'
    );
  });

  it('has test script', () => {
    assert.ok(
      pkg.scripts.test.includes('node --test'),
      'test script should use node --test'
    );
  });

  it('has prepublishOnly script', () => {
    assert.equal(pkg.scripts.prepublishOnly, 'npm test');
  });
});

describe('bin/install.js', () => {
  it('has shebang line', () => {
    const installPath = path.join(__dirname, '..', 'bin', 'install.js');
    const firstLine = fs.readFileSync(installPath, 'utf-8').split('\n')[0];
    assert.equal(firstLine, '#!/usr/bin/env node');
  });
});

describe('npm pack dry-run', () => {
  let packOutput;

  // Run npm pack once and reuse output
  before(() => {
    packOutput = execSync('npm pack --dry-run 2>&1', {
      encoding: 'utf-8',
      cwd: path.join(__dirname, '..'),
    });
  });

  it('includes all critical directories', () => {
    const expectedEntries = [
      'bin/install.js',
      'data/CONSTRAINTS.json',
      'commands/scr/demo.md',
      'templates/STYLE-GUIDE.md',
      'agents/',
    ];
    for (const entry of expectedEntries) {
      assert.ok(
        packOutput.includes(entry),
        `npm pack output should include "${entry}"`
      );
    }
  });

  it('includes demo manuscript files', () => {
    assert.ok(
      packOutput.includes('data/demo/.manuscript/STYLE-GUIDE.md'),
      'npm pack should include dotfile directory data/demo/.manuscript/'
    );
  });
});
