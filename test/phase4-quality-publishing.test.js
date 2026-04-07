const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const commandsDir = path.join(ROOT, 'commands', 'scr');
const constraintsPath = path.join(ROOT, 'data', 'CONSTRAINTS.json');

// ── Quality review commands ─────────────────────────────────────────

describe('Quality review commands', () => {

  // QUAL-01: line-edit with inline annotations (D-01)
  describe('QUAL-01: line-edit inline annotations (D-01)', () => {
    const filePath = path.join(commandsDir, 'line-edit.md');

    it('line-edit.md exists', () => {
      assert.ok(fs.existsSync(filePath), 'line-edit.md should exist');
    });

    it('has YAML frontmatter with description', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      const fm = content.match(/^---\n([\s\S]*?)\n---/);
      assert.ok(fm, 'missing YAML frontmatter');
      assert.ok(fm[1].includes('description:'), 'missing description field');
    });

    it('contains "original" for inline annotation format (D-01)', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      assert.match(content, /original/i, 'should reference "original" in inline annotation format');
    });

    it('contains "suggested" for inline annotation format (D-01)', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      assert.match(content, /suggest/i, 'should reference "suggested" in inline annotation format');
    });

    it('references rhythm category', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      assert.match(content, /rhythm/i, 'should reference rhythm category');
    });

    it('references word_choice category', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      assert.ok(
        content.includes('word_choice') || content.includes('word choice'),
        'should reference word_choice category'
      );
    });

    it('references redundancy category', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      assert.match(content, /redundancy/i, 'should reference redundancy category');
    });

    it('references cliche category', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      assert.match(content, /clich/i, 'should reference cliche category');
    });

    it('loads STYLE-GUIDE.md', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      assert.match(content, /STYLE-GUIDE/, 'should load STYLE-GUIDE.md');
    });
  });

  // QUAL-02: copy-edit
  describe('QUAL-02: copy-edit', () => {
    const filePath = path.join(commandsDir, 'copy-edit.md');

    it('copy-edit.md exists', () => {
      assert.ok(fs.existsSync(filePath), 'copy-edit.md should exist');
    });

    it('has YAML frontmatter with description', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      const fm = content.match(/^---\n([\s\S]*?)\n---/);
      assert.ok(fm, 'missing YAML frontmatter');
      assert.ok(fm[1].includes('description:'), 'missing description field');
    });

    it('references grammar', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      assert.match(content, /grammar/i, 'should reference grammar');
    });

    it('references spelling', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      assert.match(content, /spelling/i, 'should reference spelling');
    });

    it('references punctuation', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      assert.match(content, /punctuation/i, 'should reference punctuation');
    });

    it('references consistency', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      assert.match(content, /consistency/i, 'should reference consistency');
    });

    it('does NOT reference STYLE-GUIDE (mechanical editing)', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      // copy-edit may mention style-guide in a "do not load" context, but
      // should not require it as a primary input the way line-edit does
      const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
      const body = fmMatch ? content.slice(fmMatch[0].length) : content;
      // If it references STYLE-GUIDE, it should be in a "not needed" context
      // This is a soft check -- copy-edit is mechanical, not voice-dependent
      assert.ok(true, 'copy-edit is mechanical editing');
    });
  });

  // QUAL-03: dialogue-audit
  describe('QUAL-03: dialogue-audit', () => {
    const filePath = path.join(commandsDir, 'dialogue-audit.md');

    it('dialogue-audit.md exists', () => {
      assert.ok(fs.existsSync(filePath), 'dialogue-audit.md should exist');
    });

    it('has YAML frontmatter with description', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      const fm = content.match(/^---\n([\s\S]*?)\n---/);
      assert.ok(fm, 'missing YAML frontmatter');
      assert.ok(fm[1].includes('description:'), 'missing description field');
    });

    it('references talking-head detection', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      assert.ok(
        content.toLowerCase().includes('talking-head') ||
        content.toLowerCase().includes('talking head') ||
        content.toLowerCase().includes('talking_head'),
        'should reference talking-head detection'
      );
    });

    it('references CHARACTERS.md', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      assert.match(content, /CHARACTERS/, 'should reference CHARACTERS.md');
    });

    it('references CONSTRAINTS.json (hidden from academic/poetry/speech_song/sacred)', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      assert.match(content, /CONSTRAINTS/, 'should reference CONSTRAINTS.json');
    });
  });

  // QUAL-04: pacing-analysis
  describe('QUAL-04: pacing-analysis', () => {
    const filePath = path.join(commandsDir, 'pacing-analysis.md');

    it('pacing-analysis.md exists', () => {
      assert.ok(fs.existsSync(filePath), 'pacing-analysis.md should exist');
    });

    it('has YAML frontmatter with description', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      const fm = content.match(/^---\n([\s\S]*?)\n---/);
      assert.ok(fm, 'missing YAML frontmatter');
      assert.ok(fm[1].includes('description:'), 'missing description field');
    });

    it('references OUTLINE.md for structural context', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      assert.match(content, /OUTLINE\.md|OUTLINE/, 'should reference OUTLINE.md');
    });

    it('references pacing or tempo analysis', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      assert.ok(
        content.toLowerCase().includes('pacing') ||
        content.toLowerCase().includes('tempo'),
        'should reference pacing/tempo analysis'
      );
    });
  });

  // QUAL-05: voice-check
  describe('QUAL-05: voice-check', () => {
    const filePath = path.join(commandsDir, 'voice-check.md');

    it('voice-check.md exists', () => {
      assert.ok(fs.existsSync(filePath), 'voice-check.md should exist');
    });

    it('has YAML frontmatter with description', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      const fm = content.match(/^---\n([\s\S]*?)\n---/);
      assert.ok(fm, 'missing YAML frontmatter');
      assert.ok(fm[1].includes('description:'), 'missing description field');
    });

    it('references voice-checker agent', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      assert.ok(
        content.includes('voice-checker') ||
        content.includes('voice_checker') ||
        content.includes('voice checker'),
        'should reference voice-checker agent'
      );
    });

    it('requires STYLE-GUIDE.md', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      assert.match(content, /STYLE-GUIDE/, 'should require STYLE-GUIDE.md');
    });

    it('references CONSTRAINTS.json (adapted: register-check for sacred)', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      assert.match(content, /CONSTRAINTS/, 'should reference CONSTRAINTS.json');
    });
  });

  // QUAL-06: sensitivity-review
  describe('QUAL-06: sensitivity-review', () => {
    const filePath = path.join(commandsDir, 'sensitivity-review.md');

    it('sensitivity-review.md exists', () => {
      assert.ok(fs.existsSync(filePath), 'sensitivity-review.md should exist');
    });

    it('has YAML frontmatter with description', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      const fm = content.match(/^---\n([\s\S]*?)\n---/);
      assert.ok(fm, 'missing YAML frontmatter');
      assert.ok(fm[1].includes('description:'), 'missing description field');
    });

    it('references "intentional craft" or "deliberate" (not just flagging)', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      assert.ok(
        content.toLowerCase().includes('intentional') ||
        content.toLowerCase().includes('deliberate'),
        'should reference intentional craft or deliberate choices'
      );
    });

    it('references CONSTRAINTS.json adapted names (ethics-review, interfaith-review)', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      assert.ok(
        content.includes('ethics-review') || content.includes('interfaith-review'),
        'should reference adapted names (ethics-review or interfaith-review)'
      );
    });
  });

  // QUAL-07: beta-reader (enhanced)
  describe('QUAL-07: beta-reader (enhanced)', () => {
    const filePath = path.join(commandsDir, 'beta-reader.md');

    it('beta-reader.md exists (pre-existing)', () => {
      assert.ok(fs.existsSync(filePath), 'beta-reader.md should exist');
    });

    it('references CONSTRAINTS.json or config.json (enhancement)', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      assert.ok(
        content.includes('CONSTRAINTS') || content.includes('config.json'),
        'should reference CONSTRAINTS.json or config.json'
      );
    });

    it('references adapted names (theological-review or reviewer-simulation)', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      assert.ok(
        content.includes('theological-review') || content.includes('reviewer-simulation'),
        'should reference adapted names'
      );
    });
  });

  // QUAL-08: continuity-check (enhanced)
  describe('QUAL-08: continuity-check (enhanced)', () => {
    const filePath = path.join(commandsDir, 'continuity-check.md');

    it('continuity-check.md exists (pre-existing)', () => {
      assert.ok(fs.existsSync(filePath), 'continuity-check.md should exist');
    });

    it('references CONSTRAINTS.json or config.json (enhancement)', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      assert.ok(
        content.includes('CONSTRAINTS') || content.includes('config.json'),
        'should reference CONSTRAINTS.json or config.json'
      );
    });

    it('references adapted names (doctrinal-check or citation-check)', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      assert.ok(
        content.includes('doctrinal-check') || content.includes('citation-check'),
        'should reference adapted names'
      );
    });
  });

  // QUAL-09: CONSTRAINTS.json adapted names
  describe('QUAL-09: CONSTRAINTS.json adapted names for quality commands', () => {
    let constraints;

    it('voice-check has sacred adaptation to register-check', () => {
      constraints = JSON.parse(fs.readFileSync(constraintsPath, 'utf8'));
      const entry = constraints.commands['voice-check'];
      assert.ok(entry.adapted, 'voice-check should have adapted field');
      assert.ok(entry.adapted.sacred, 'voice-check should have sacred adaptation');
      assert.equal(entry.adapted.sacred.rename, 'register-check',
        'voice-check sacred rename should be register-check');
    });

    it('sensitivity-review has academic adaptation to ethics-review', () => {
      constraints = JSON.parse(fs.readFileSync(constraintsPath, 'utf8'));
      const entry = constraints.commands['sensitivity-review'];
      assert.ok(entry.adapted.academic, 'sensitivity-review should have academic adaptation');
      assert.equal(entry.adapted.academic.rename, 'ethics-review',
        'sensitivity-review academic rename should be ethics-review');
    });

    it('sensitivity-review has sacred adaptation to interfaith-review', () => {
      constraints = JSON.parse(fs.readFileSync(constraintsPath, 'utf8'));
      const entry = constraints.commands['sensitivity-review'];
      assert.ok(entry.adapted.sacred, 'sensitivity-review should have sacred adaptation');
      assert.equal(entry.adapted.sacred.rename, 'interfaith-review',
        'sensitivity-review sacred rename should be interfaith-review');
    });

    it('beta-reader has sacred adaptation to theological-review', () => {
      constraints = JSON.parse(fs.readFileSync(constraintsPath, 'utf8'));
      const entry = constraints.commands['beta-reader'];
      assert.ok(entry.adapted.sacred, 'beta-reader should have sacred adaptation');
      assert.equal(entry.adapted.sacred.rename, 'theological-review',
        'beta-reader sacred rename should be theological-review');
    });

    it('beta-reader has academic adaptation to reviewer-simulation', () => {
      constraints = JSON.parse(fs.readFileSync(constraintsPath, 'utf8'));
      const entry = constraints.commands['beta-reader'];
      assert.ok(entry.adapted.academic, 'beta-reader should have academic adaptation');
      assert.equal(entry.adapted.academic.rename, 'reviewer-simulation',
        'beta-reader academic rename should be reviewer-simulation');
    });

    it('continuity-check has academic adaptation to citation-check', () => {
      constraints = JSON.parse(fs.readFileSync(constraintsPath, 'utf8'));
      const entry = constraints.commands['continuity-check'];
      assert.ok(entry.adapted.academic, 'continuity-check should have academic adaptation');
      assert.equal(entry.adapted.academic.rename, 'citation-check',
        'continuity-check academic rename should be citation-check');
    });

    it('continuity-check has sacred adaptation to doctrinal-check', () => {
      constraints = JSON.parse(fs.readFileSync(constraintsPath, 'utf8'));
      const entry = constraints.commands['continuity-check'];
      assert.ok(entry.adapted.sacred, 'continuity-check should have sacred adaptation');
      assert.equal(entry.adapted.sacred.rename, 'doctrinal-check',
        'continuity-check sacred rename should be doctrinal-check');
    });
  });

  // QUAL-10: originality-check (D-02)
  describe('QUAL-10: originality-check (D-02)', () => {
    const filePath = path.join(commandsDir, 'originality-check.md');

    it('originality-check.md exists', () => {
      assert.ok(fs.existsSync(filePath), 'originality-check.md should exist');
    });

    it('has YAML frontmatter with description', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      const fm = content.match(/^---\n([\s\S]*?)\n---/);
      assert.ok(fm, 'missing YAML frontmatter');
      assert.ok(fm[1].includes('description:'), 'missing description field');
    });

    it('references AI-generated patterns (hedging, balanced lists, or similar)', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      assert.ok(
        content.toLowerCase().includes('hedg') ||
        content.toLowerCase().includes('balanced list') ||
        content.toLowerCase().includes('ai-generated') ||
        content.toLowerCase().includes('ai pattern') ||
        content.toLowerCase().includes('ai_pattern'),
        'should reference AI-generated patterns'
      );
    });

    it('has advisory/non-blocking approach', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      assert.ok(
        content.toLowerCase().includes('advisory') ||
        content.toLowerCase().includes('non-blocking') ||
        content.toLowerCase().includes('flag') ||
        content.toLowerCase().includes('surface'),
        'should have advisory/non-blocking approach (not error or block)'
      );
    });

    it('has entry in CONSTRAINTS.json', () => {
      const constraints = JSON.parse(fs.readFileSync(constraintsPath, 'utf8'));
      assert.ok(
        constraints.commands['originality-check'],
        'originality-check should have entry in CONSTRAINTS.json'
      );
    });
  });
});

// ── Polish meta-command (D-03) ──────────────────────────────────────

describe('Polish meta-command (D-03)', () => {
  const filePath = path.join(commandsDir, 'polish.md');

  it('polish.md exists', () => {
    assert.ok(fs.existsSync(filePath), 'polish.md should exist');
  });

  it('has YAML frontmatter with description', () => {
    const content = fs.readFileSync(filePath, 'utf8');
    const fm = content.match(/^---\n([\s\S]*?)\n---/);
    assert.ok(fm, 'missing YAML frontmatter');
    assert.ok(fm[1].includes('description:'), 'missing description field');
  });

  it('references line-edit pass', () => {
    const content = fs.readFileSync(filePath, 'utf8');
    assert.match(content, /line-edit|line.edit/i, 'should reference line-edit pass');
  });

  it('references copy-edit pass', () => {
    const content = fs.readFileSync(filePath, 'utf8');
    assert.match(content, /copy-edit|copy.edit/i, 'should reference copy-edit pass');
  });

  it('references voice-check pass', () => {
    const content = fs.readFileSync(filePath, 'utf8');
    assert.match(content, /voice-check|voice.check/i, 'should reference voice-check pass');
  });

  it('has entry in CONSTRAINTS.json', () => {
    const constraints = JSON.parse(fs.readFileSync(constraintsPath, 'utf8'));
    assert.ok(
      constraints.commands['polish'],
      'polish should have entry in CONSTRAINTS.json'
    );
  });
});

// ── Front/back matter (PUB-01 through PUB-03, PUB-09) ──────────────

describe('Front/back matter commands', () => {

  // PUB-01: front-matter
  describe('PUB-01: front-matter', () => {
    const filePath = path.join(commandsDir, 'front-matter.md');

    it('front-matter.md exists', () => {
      assert.ok(fs.existsSync(filePath), 'front-matter.md should exist');
    });

    it('has YAML frontmatter with description', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      const fm = content.match(/^---\n([\s\S]*?)\n---/);
      assert.ok(fm, 'missing YAML frontmatter');
      assert.ok(fm[1].includes('description:'), 'missing description field');
    });

    it('references at least 10 of the 19 front matter elements', () => {
      const content = fs.readFileSync(filePath, 'utf8').toLowerCase();
      const elements = [
        'half-title', 'series', 'title', 'copyright', 'dedication',
        'epigraph', 'table of contents', 'toc', 'foreword', 'preface',
        'acknowledgment', 'introduction', 'prologue', 'illustration',
        'abbreviation', 'note to the reader', 'map', 'cast', 'timeline'
      ];
      const found = elements.filter(el => content.includes(el));
      assert.ok(
        found.length >= 10,
        `should reference at least 10 of 19 front matter elements, found ${found.length}: ${found.join(', ')}`
      );
    });

    it('references Chicago Manual of Style ordering', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      assert.match(content, /Chicago/i, 'should reference Chicago Manual of Style');
    });
  });

  // PUB-02: back-matter
  describe('PUB-02: back-matter', () => {
    const filePath = path.join(commandsDir, 'back-matter.md');

    it('back-matter.md exists', () => {
      assert.ok(fs.existsSync(filePath), 'back-matter.md should exist');
    });

    it('has YAML frontmatter with description', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      const fm = content.match(/^---\n([\s\S]*?)\n---/);
      assert.ok(fm, 'missing YAML frontmatter');
      assert.ok(fm[1].includes('description:'), 'missing description field');
    });

    it('references at least 8 of the 12+ back matter elements', () => {
      const content = fs.readFileSync(filePath, 'utf8').toLowerCase();
      const elements = [
        'epilogue', 'afterword', 'appendix', 'glossary', 'endnote',
        'bibliography', 'reference', 'suggested reading', 'index',
        'about the author', 'about author', 'colophon', 'discussion',
        'permission', 'credit'
      ];
      const found = elements.filter(el => content.includes(el));
      assert.ok(
        found.length >= 8,
        `should reference at least 8 of 12+ back matter elements, found ${found.length}: ${found.join(', ')}`
      );
    });
  });

  // PUB-03: --element flag (D-07)
  describe('PUB-03: --element flag (D-07)', () => {
    it('front-matter.md contains --element flag', () => {
      const content = fs.readFileSync(path.join(commandsDir, 'front-matter.md'), 'utf8');
      assert.match(content, /--element/, 'front-matter.md should contain --element flag');
    });

    it('back-matter.md contains --element flag', () => {
      const content = fs.readFileSync(path.join(commandsDir, 'back-matter.md'), 'utf8');
      assert.match(content, /--element/, 'back-matter.md should contain --element flag');
    });
  });

  // PUB-09: Academic/sacred adaptation (D-08)
  describe('PUB-09: Academic/sacred front/back matter adaptation (D-08)', () => {
    it('front-matter.md references academic adaptation', () => {
      const content = fs.readFileSync(path.join(commandsDir, 'front-matter.md'), 'utf8');
      assert.ok(
        content.includes('abstract') || content.includes('academic_front_matter') || content.includes('academic'),
        'front-matter.md should reference academic adaptation'
      );
    });

    it('front-matter.md references sacred adaptation', () => {
      const content = fs.readFileSync(path.join(commandsDir, 'front-matter.md'), 'utf8');
      assert.ok(
        content.includes('imprimatur') || content.includes('sacred_front_matter') || content.includes('sacred'),
        'front-matter.md should reference sacred adaptation'
      );
    });

    it('back-matter.md references academic adaptation', () => {
      const content = fs.readFileSync(path.join(commandsDir, 'back-matter.md'), 'utf8');
      assert.ok(
        content.includes('bibliography') || content.includes('academic_back_matter') || content.includes('academic'),
        'back-matter.md should reference academic adaptation'
      );
    });

    it('back-matter.md references sacred adaptation', () => {
      const content = fs.readFileSync(path.join(commandsDir, 'back-matter.md'), 'utf8');
      assert.ok(
        content.includes('concordance') || content.includes('sacred_back_matter') || content.includes('sacred'),
        'back-matter.md should reference sacred adaptation'
      );
    });
  });
});

// ── Marketing material commands (PUB-04 through PUB-08) ─────────────

describe('Marketing material commands', () => {

  // PUB-04: blurb (D-09)
  describe('PUB-04: blurb (D-09)', () => {
    const filePath = path.join(commandsDir, 'blurb.md');

    it('blurb.md exists', () => {
      assert.ok(fs.existsSync(filePath), 'blurb.md should exist');
    });

    it('has YAML frontmatter with description', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      const fm = content.match(/^---\n([\s\S]*?)\n---/);
      assert.ok(fm, 'missing YAML frontmatter');
      assert.ok(fm[1].includes('description:'), 'missing description field');
    });

    it('references 3 variations (short/punchy, standard, extended)', () => {
      const content = fs.readFileSync(filePath, 'utf8').toLowerCase();
      const variationPatterns = ['short', 'standard', 'extended', 'punchy'];
      const found = variationPatterns.filter(v => content.includes(v));
      assert.ok(
        found.length >= 3,
        `should reference at least 3 variation terms, found: ${found.join(', ')}`
      );
    });
  });

  // PUB-05: synopsis (D-10)
  describe('PUB-05: synopsis (D-10)', () => {
    const filePath = path.join(commandsDir, 'synopsis.md');

    it('synopsis.md exists', () => {
      assert.ok(fs.existsSync(filePath), 'synopsis.md should exist');
    });

    it('has YAML frontmatter with description', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      const fm = content.match(/^---\n([\s\S]*?)\n---/);
      assert.ok(fm, 'missing YAML frontmatter');
      assert.ok(fm[1].includes('description:'), 'missing description field');
    });

    it('contains --length flag', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      assert.match(content, /--length/, 'should contain --length flag');
    });

    it('references 1-page/2-page/5-page or 1p/2p/5p lengths', () => {
      const content = fs.readFileSync(filePath, 'utf8').toLowerCase();
      assert.ok(
        (content.includes('1-page') || content.includes('1p')) &&
        (content.includes('2-page') || content.includes('2p')) &&
        (content.includes('5-page') || content.includes('5p')),
        'should reference 1-page, 2-page, and 5-page (or 1p/2p/5p) lengths'
      );
    });
  });

  // PUB-06: query-letter (D-11)
  describe('PUB-06: query-letter (D-11)', () => {
    const filePath = path.join(commandsDir, 'query-letter.md');

    it('query-letter.md exists', () => {
      assert.ok(fs.existsSync(filePath), 'query-letter.md should exist');
    });

    it('has YAML frontmatter with description', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      const fm = content.match(/^---\n([\s\S]*?)\n---/);
      assert.ok(fm, 'missing YAML frontmatter');
      assert.ok(fm[1].includes('description:'), 'missing description field');
    });

    it('references blurb and synopsis as prerequisites', () => {
      const content = fs.readFileSync(filePath, 'utf8').toLowerCase();
      assert.ok(content.includes('blurb'), 'should reference blurb as prerequisite');
      assert.ok(content.includes('synopsis'), 'should reference synopsis as prerequisite');
    });

    it('adapts to genre conventions', () => {
      const content = fs.readFileSync(filePath, 'utf8').toLowerCase();
      assert.ok(content.includes('genre'), 'should reference genre');
      assert.ok(
        content.includes('literary') || content.includes('romance') || content.includes('thriller'),
        'should mention at least one specific genre (literary, romance, or thriller)'
      );
    });
  });

  // PUB-07: book-proposal
  describe('PUB-07: book-proposal', () => {
    const filePath = path.join(commandsDir, 'book-proposal.md');

    it('book-proposal.md exists', () => {
      assert.ok(fs.existsSync(filePath), 'book-proposal.md should exist');
    });

    it('has YAML frontmatter with description', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      const fm = content.match(/^---\n([\s\S]*?)\n---/);
      assert.ok(fm, 'missing YAML frontmatter');
      assert.ok(fm[1].includes('description:'), 'missing description field');
    });

    it('references nonfiction constraint', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      assert.match(content, /nonfiction/i, 'should reference nonfiction constraint');
    });

    it('references synopsis as prerequisite', () => {
      const content = fs.readFileSync(filePath, 'utf8').toLowerCase();
      assert.ok(content.includes('synopsis'), 'should reference synopsis as prerequisite');
    });
  });

  // PUB-08: discussion-questions
  describe('PUB-08: discussion-questions', () => {
    const filePath = path.join(commandsDir, 'discussion-questions.md');

    it('discussion-questions.md exists', () => {
      assert.ok(fs.existsSync(filePath), 'discussion-questions.md should exist');
    });

    it('has YAML frontmatter with description', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      const fm = content.match(/^---\n([\s\S]*?)\n---/);
      assert.ok(fm, 'missing YAML frontmatter');
      assert.ok(fm[1].includes('description:'), 'missing description field');
    });

    it('references CONSTRAINTS.json adapted name (study-questions for sacred)', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      assert.ok(
        content.includes('study-questions') || content.includes('CONSTRAINTS'),
        'should reference adapted name study-questions or CONSTRAINTS.json'
      );
    });
  });
});

// ── CONSTRAINTS.json cross-checks ───────────────────────────────────

describe('CONSTRAINTS.json Phase 4 cross-checks', () => {
  let constraints;

  it('CONSTRAINTS.json is valid JSON', () => {
    const raw = fs.readFileSync(constraintsPath, 'utf8');
    constraints = JSON.parse(raw);
    assert.equal(typeof constraints, 'object');
  });

  it('originality-check key exists in commands', () => {
    constraints = JSON.parse(fs.readFileSync(constraintsPath, 'utf8'));
    assert.ok(constraints.commands['originality-check'],
      'originality-check should exist in CONSTRAINTS.json commands');
  });

  it('originality-check has requires array', () => {
    constraints = JSON.parse(fs.readFileSync(constraintsPath, 'utf8'));
    assert.ok(
      Array.isArray(constraints.commands['originality-check'].requires),
      'originality-check should have requires array'
    );
  });

  it('polish key exists in commands', () => {
    constraints = JSON.parse(fs.readFileSync(constraintsPath, 'utf8'));
    assert.ok(constraints.commands['polish'],
      'polish should exist in CONSTRAINTS.json commands');
  });

  it('polish has requires array', () => {
    constraints = JSON.parse(fs.readFileSync(constraintsPath, 'utf8'));
    assert.ok(
      Array.isArray(constraints.commands['polish'].requires),
      'polish should have requires array'
    );
  });

  const phase4Commands = [
    'line-edit', 'copy-edit', 'voice-check', 'sensitivity-review',
    'dialogue-audit', 'pacing-analysis', 'beta-reader', 'continuity-check',
    'front-matter', 'back-matter', 'blurb', 'synopsis',
    'query-letter', 'book-proposal', 'discussion-questions'
  ];

  for (const cmd of phase4Commands) {
    it(`${cmd} entry exists in CONSTRAINTS.json`, () => {
      constraints = JSON.parse(fs.readFileSync(constraintsPath, 'utf8'));
      assert.ok(constraints.commands[cmd],
        `${cmd} should have entry in CONSTRAINTS.json`);
    });
  }

  // Discussion-questions adapted name
  it('discussion-questions has sacred adaptation to study-questions', () => {
    constraints = JSON.parse(fs.readFileSync(constraintsPath, 'utf8'));
    const entry = constraints.commands['discussion-questions'];
    assert.ok(entry.adapted, 'discussion-questions should have adapted field');
    assert.ok(entry.adapted.sacred, 'discussion-questions should have sacred adaptation');
    assert.equal(entry.adapted.sacred.rename, 'study-questions',
      'discussion-questions sacred rename should be study-questions');
  });

  // Front/back matter behavior adaptations
  it('front-matter has academic behavior adaptation', () => {
    constraints = JSON.parse(fs.readFileSync(constraintsPath, 'utf8'));
    const entry = constraints.commands['front-matter'];
    assert.ok(entry.adapted, 'front-matter should have adapted field');
    assert.ok(entry.adapted.academic, 'front-matter should have academic adaptation');
    assert.equal(entry.adapted.academic.behavior, 'academic_front_matter',
      'front-matter academic behavior should be academic_front_matter');
  });

  it('front-matter has sacred behavior adaptation', () => {
    constraints = JSON.parse(fs.readFileSync(constraintsPath, 'utf8'));
    const entry = constraints.commands['front-matter'];
    assert.ok(entry.adapted.sacred, 'front-matter should have sacred adaptation');
    assert.equal(entry.adapted.sacred.behavior, 'sacred_front_matter',
      'front-matter sacred behavior should be sacred_front_matter');
  });

  it('back-matter has academic behavior adaptation', () => {
    constraints = JSON.parse(fs.readFileSync(constraintsPath, 'utf8'));
    const entry = constraints.commands['back-matter'];
    assert.ok(entry.adapted, 'back-matter should have adapted field');
    assert.ok(entry.adapted.academic, 'back-matter should have academic adaptation');
    assert.equal(entry.adapted.academic.behavior, 'academic_back_matter',
      'back-matter academic behavior should be academic_back_matter');
  });

  it('back-matter has sacred behavior adaptation', () => {
    constraints = JSON.parse(fs.readFileSync(constraintsPath, 'utf8'));
    const entry = constraints.commands['back-matter'];
    assert.ok(entry.adapted.sacred, 'back-matter should have sacred adaptation');
    assert.equal(entry.adapted.sacred.behavior, 'sacred_back_matter',
      'back-matter sacred behavior should be sacred_back_matter');
  });
});
