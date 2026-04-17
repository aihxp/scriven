const { describe, it, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const os = require('os');

const {
  atomicWriteFileSync,
  cleanOrphanedTempFiles,
} = require('../bin/install.js');

function mkTmp(label) {
  return fs.mkdtempSync(path.join(os.tmpdir(), `scriven-atomic-${label}-`));
}

describe('atomicWriteFileSync', () => {
  it('writes the expected content to the target path', () => {
    const tmpDir = mkTmp('write');
    try {
      const target = path.join(tmpDir, 'out.txt');
      atomicWriteFileSync(target, 'hello world');
      assert.equal(fs.readFileSync(target, 'utf8'), 'hello world');
    } finally {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });

  it('leaves no *.tmp.<uuid> sibling after successful write', () => {
    const tmpDir = mkTmp('notmp');
    try {
      const target = path.join(tmpDir, 'out.txt');
      atomicWriteFileSync(target, 'data');
      const entries = fs.readdirSync(tmpDir);
      assert.deepEqual(entries, ['out.txt']);
    } finally {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });

  it('creates missing parent directories recursively', () => {
    const tmpDir = mkTmp('mkdir');
    try {
      const target = path.join(tmpDir, 'a', 'b', 'c', 'out.txt');
      atomicWriteFileSync(target, 'nested');
      assert.equal(fs.readFileSync(target, 'utf8'), 'nested');
    } finally {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });

  it('accepts Buffer content', () => {
    const tmpDir = mkTmp('buffer');
    try {
      const target = path.join(tmpDir, 'buf.bin');
      const buf = Buffer.from([0x00, 0x01, 0x02, 0x03]);
      atomicWriteFileSync(target, buf);
      const read = fs.readFileSync(target);
      assert.ok(read.equals(buf));
    } finally {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });

  it('cleans up the temp file and rethrows when write fails', () => {
    const tmpDir = mkTmp('failwrite');
    try {
      // parent is a file, not a directory — writeFileSync will fail on the tmp path
      const parentAsFile = path.join(tmpDir, 'actually-a-file');
      fs.writeFileSync(parentAsFile, 'blocking');
      const target = path.join(parentAsFile, 'child.txt');

      assert.throws(() => atomicWriteFileSync(target, 'x'));

      // No .tmp. siblings left in the tmpDir
      const leftovers = fs.readdirSync(tmpDir).filter((n) => /\.tmp\./.test(n));
      assert.deepEqual(leftovers, []);
    } finally {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });
});

describe('cleanOrphanedTempFiles', () => {
  it('returns 0 when directory does not exist (no throw)', () => {
    const nonexistent = path.join(os.tmpdir(), 'scriven-absent-' + Date.now());
    assert.equal(cleanOrphanedTempFiles(nonexistent), 0);
  });

  it('removes *.tmp.<uuid> files and returns the count', () => {
    const tmpDir = mkTmp('orphans');
    try {
      const uuid1 = '00000000-0000-0000-0000-000000000000';
      const uuid2 = 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee';
      fs.writeFileSync(path.join(tmpDir, `settings.json.tmp.${uuid1}`), 'x');
      fs.writeFileSync(path.join(tmpDir, `SKILL.md.tmp.${uuid2}`), 'y');
      fs.writeFileSync(path.join(tmpDir, 'keep.txt'), 'keep');

      const removed = cleanOrphanedTempFiles(tmpDir);
      assert.equal(removed, 2);
      assert.deepEqual(fs.readdirSync(tmpDir).sort(), ['keep.txt']);
    } finally {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });

  it('leaves non-matching files untouched', () => {
    const tmpDir = mkTmp('nomatch');
    try {
      fs.writeFileSync(path.join(tmpDir, 'regular.txt'), 'x');
      fs.writeFileSync(path.join(tmpDir, 'something.tmp.notauuid'), 'y');
      fs.writeFileSync(path.join(tmpDir, 'file.tmp'), 'z');
      fs.writeFileSync(path.join(tmpDir, 'settings.json'), 'w');

      const removed = cleanOrphanedTempFiles(tmpDir);
      assert.equal(removed, 0);
      assert.deepEqual(fs.readdirSync(tmpDir).sort(), [
        'file.tmp',
        'regular.txt',
        'settings.json',
        'something.tmp.notauuid',
      ]);
    } finally {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });

  it('does not recurse into subdirectories', () => {
    const tmpDir = mkTmp('norecurse');
    try {
      const uuid = '12345678-1234-1234-1234-123456789abc';
      const subdir = path.join(tmpDir, 'sub');
      fs.mkdirSync(subdir);
      fs.writeFileSync(path.join(subdir, `nested.tmp.${uuid}`), 'nested');
      // Also put a matching file at root so we know the fn ran
      fs.writeFileSync(path.join(tmpDir, `root.tmp.${uuid}`), 'root');

      const removed = cleanOrphanedTempFiles(tmpDir);
      assert.equal(removed, 1);
      // Nested orphan survives
      assert.ok(fs.existsSync(path.join(subdir, `nested.tmp.${uuid}`)));
    } finally {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });

  it('ignores directory entries even if their name matches', () => {
    const tmpDir = mkTmp('dirmatch');
    try {
      const uuid = '87654321-4321-4321-4321-cba987654321';
      // A directory whose name matches the pattern — must NOT be removed
      fs.mkdirSync(path.join(tmpDir, `fakedir.tmp.${uuid}`));
      const removed = cleanOrphanedTempFiles(tmpDir);
      assert.equal(removed, 0);
      assert.ok(fs.existsSync(path.join(tmpDir, `fakedir.tmp.${uuid}`)));
    } finally {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });
});
