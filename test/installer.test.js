const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const os = require('os');

const { copyDir, RUNTIMES } = require('../bin/install.js');

const ROOT = path.join(__dirname, '..');

describe('Installer copyDir', () => {
  it('copies files to temp directory', () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'scriven-test-'));
    try {
      const src = path.join(ROOT, 'commands', 'scr');
      const dest = path.join(tmpDir, 'scr');
      const count = copyDir(src, dest);
      assert.ok(count > 0, `Expected files to be copied, got count ${count}`);
      assert.ok(
        fs.existsSync(path.join(dest, 'demo.md')),
        'demo.md should exist in copied output'
      );
    } finally {
      fs.rmSync(tmpDir, { recursive: true });
    }
  });

  it('returns 0 for non-existent source', () => {
    const count = copyDir('/tmp/nonexistent-scriven-path', '/tmp/nonexistent-scriven-dest');
    assert.equal(count, 0);
  });

  it('copies nested directories', () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'scriven-test-'));
    try {
      const src = path.join(ROOT, 'commands');
      const dest = path.join(tmpDir, 'commands');
      const count = copyDir(src, dest);
      assert.ok(count > 0, `Expected files to be copied, got count ${count}`);
      // Verify nested sacred/ subdirectory was copied
      assert.ok(
        fs.existsSync(path.join(dest, 'scr', 'sacred', 'concordance.md')),
        'nested sacred/concordance.md should exist'
      );
    } finally {
      fs.rmSync(tmpDir, { recursive: true });
    }
  });
});

describe('Installer RUNTIMES', () => {
  it('has entries for all three runtimes', () => {
    assert.ok('claude-code' in RUNTIMES, 'missing claude-code runtime');
    assert.ok('cursor' in RUNTIMES, 'missing cursor runtime');
    assert.ok('gemini-cli' in RUNTIMES, 'missing gemini-cli runtime');
  });

  it('each runtime has required directory properties', () => {
    const requiredProps = [
      'commands_dir_global',
      'commands_dir_project',
      'agents_dir_global',
      'agents_dir_project',
      'detect',
    ];

    for (const [name, runtime] of Object.entries(RUNTIMES)) {
      for (const prop of requiredProps) {
        assert.ok(
          prop in runtime,
          `runtime "${name}" missing property "${prop}"`
        );
      }
      assert.equal(
        typeof runtime.detect,
        'function',
        `runtime "${name}" detect should be a function`
      );
    }
  });
});
