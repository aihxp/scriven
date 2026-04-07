const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const os = require('os');

const { copyDir, RUNTIMES, generateSkillManifest } = require('../bin/install.js');

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
  it('has entries for all supported runtimes', () => {
    assert.ok('claude-code' in RUNTIMES, 'missing claude-code runtime');
    assert.ok('cursor' in RUNTIMES, 'missing cursor runtime');
    assert.ok('gemini-cli' in RUNTIMES, 'missing gemini-cli runtime');
    assert.ok('codex' in RUNTIMES, 'missing codex runtime');
    assert.ok('opencode' in RUNTIMES, 'missing opencode runtime');
    assert.ok('copilot' in RUNTIMES, 'missing copilot runtime');
    assert.ok('windsurf' in RUNTIMES, 'missing windsurf runtime');
    assert.ok('antigravity' in RUNTIMES, 'missing antigravity runtime');
    assert.ok('manus' in RUNTIMES, 'missing manus runtime');
  });

  it('each runtime has required directory properties for its type', () => {
    for (const [name, runtime] of Object.entries(RUNTIMES)) {
      assert.ok('type' in runtime, `runtime "${name}" missing property "type"`);
      assert.ok('detect' in runtime, `runtime "${name}" missing property "detect"`);
      assert.equal(
        typeof runtime.detect,
        'function',
        `runtime "${name}" detect should be a function`
      );

      if (runtime.type === 'commands') {
        const commandProps = [
          'commands_dir_global',
          'commands_dir_project',
          'agents_dir_global',
          'agents_dir_project',
        ];
        for (const prop of commandProps) {
          assert.ok(prop in runtime, `commands runtime "${name}" missing property "${prop}"`);
        }
      } else if (runtime.type === 'skills') {
        const skillProps = ['skills_dir_global', 'skills_dir_project'];
        for (const prop of skillProps) {
          assert.ok(prop in runtime, `skills runtime "${name}" missing property "${prop}"`);
        }
      }
    }
  });
});

describe('RUNTIMES type classification', () => {
  it('every entry has a type property of commands or skills', () => {
    for (const [name, runtime] of Object.entries(RUNTIMES)) {
      assert.ok(
        runtime.type === 'commands' || runtime.type === 'skills',
        `runtime "${name}" has invalid type "${runtime.type}"`
      );
    }
  });

  it('command-directory runtimes have type commands', () => {
    const commandRuntimes = [
      'claude-code', 'cursor', 'gemini-cli', 'codex',
      'opencode', 'copilot', 'windsurf', 'antigravity',
    ];
    for (const name of commandRuntimes) {
      assert.ok(name in RUNTIMES, `missing runtime "${name}"`);
      assert.equal(RUNTIMES[name].type, 'commands', `runtime "${name}" should have type "commands"`);
      assert.ok('commands_dir_global' in RUNTIMES[name], `runtime "${name}" missing commands_dir_global`);
      assert.ok('commands_dir_project' in RUNTIMES[name], `runtime "${name}" missing commands_dir_project`);
      assert.ok('agents_dir_global' in RUNTIMES[name], `runtime "${name}" missing agents_dir_global`);
      assert.ok('agents_dir_project' in RUNTIMES[name], `runtime "${name}" missing agents_dir_project`);
    }
  });

  it('skill-file runtimes have type skills with skills_dir properties', () => {
    const skillRuntimes = ['manus', 'generic'];
    for (const name of skillRuntimes) {
      assert.ok(name in RUNTIMES, `missing runtime "${name}"`);
      assert.equal(RUNTIMES[name].type, 'skills', `runtime "${name}" should have type "skills"`);
      assert.ok('skills_dir_global' in RUNTIMES[name], `runtime "${name}" missing skills_dir_global`);
      assert.ok('skills_dir_project' in RUNTIMES[name], `runtime "${name}" missing skills_dir_project`);
    }
  });

  it('generic runtime has correct label and detect returns false', () => {
    assert.equal(RUNTIMES.generic.label, 'Generic (SKILL.md)');
    assert.equal(RUNTIMES.generic.detect(), false);
  });

  it('generic runtime is the last entry in RUNTIMES', () => {
    const keys = Object.keys(RUNTIMES);
    assert.equal(keys[keys.length - 1], 'generic');
  });

  it('manus runtime has type skills and detects via ~/.manus/ or Manus.app', () => {
    assert.equal(RUNTIMES.manus.type, 'skills');
    assert.equal(typeof RUNTIMES.manus.detect, 'function');
    // detect() returns a boolean (may be true or false depending on environment)
    assert.equal(typeof RUNTIMES.manus.detect(), 'boolean');
  });
});

describe('generateSkillManifest', () => {
  const manifest = generateSkillManifest(path.join(ROOT, 'data', 'CONSTRAINTS.json'));

  it('returns a string', () => {
    assert.equal(typeof manifest, 'string');
  });

  it('contains Scriven header', () => {
    assert.ok(manifest.includes('# Scriven'), 'manifest should contain "# Scriven" header');
  });

  it('contains markdown table header', () => {
    assert.ok(
      manifest.includes('| Command | Category | Description |'),
      'manifest should contain table header'
    );
  });

  it('includes /scr:new-work command', () => {
    assert.ok(manifest.includes('/scr:new-work'), 'manifest should include /scr:new-work');
  });

  it('includes /scr:draft command', () => {
    assert.ok(manifest.includes('/scr:draft'), 'manifest should include /scr:draft');
  });

  it('includes /scr:help command', () => {
    assert.ok(manifest.includes('/scr:help'), 'manifest should include /scr:help');
  });

  it('includes sacred subcommands like /scr:sacred:concordance', () => {
    assert.ok(
      manifest.includes('/scr:sacred:concordance'),
      'manifest should include /scr:sacred:concordance'
    );
  });

  it('has at least 80 command rows', () => {
    const commandRows = manifest.split('\n').filter(line => line.includes('| `/scr:') || (line.includes('| /scr:') && line.includes(' | ')));
    assert.ok(
      commandRows.length >= 80,
      `expected at least 80 command rows, got ${commandRows.length}`
    );
  });

  it('includes category names from CONSTRAINTS.json', () => {
    const categories = ['core', 'navigation', 'quality'];
    for (const cat of categories) {
      assert.ok(
        manifest.includes(cat),
        `manifest should include category "${cat}"`
      );
    }
  });
});

describe('Skill-file install simulation', () => {
  it('creates SKILL.md and command files in target directory', () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'scriven-skill-test-'));
    try {
      // Generate and write SKILL.md
      const manifest = generateSkillManifest(path.join(ROOT, 'data', 'CONSTRAINTS.json'));
      fs.mkdirSync(tmpDir, { recursive: true });
      fs.writeFileSync(path.join(tmpDir, 'SKILL.md'), manifest);

      // Copy command files
      copyDir(
        path.join(ROOT, 'commands', 'scr'),
        path.join(tmpDir, 'commands', 'scr')
      );

      // Verify SKILL.md exists and has content
      assert.ok(
        fs.existsSync(path.join(tmpDir, 'SKILL.md')),
        'SKILL.md should exist in target directory'
      );
      const content = fs.readFileSync(path.join(tmpDir, 'SKILL.md'), 'utf8');
      assert.ok(content.length > 0, 'SKILL.md should have content');
      assert.ok(content.includes('# Scriven'), 'SKILL.md should contain Scriven header');

      // Verify command files exist
      assert.ok(
        fs.existsSync(path.join(tmpDir, 'commands', 'scr', 'demo.md')),
        'demo.md should exist in commands/scr/'
      );
    } finally {
      fs.rmSync(tmpDir, { recursive: true });
    }
  });
});
