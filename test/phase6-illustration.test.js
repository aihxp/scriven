const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const commandsDir = path.join(ROOT, 'commands', 'scr');
const constraintsPath = path.join(ROOT, 'data', 'CONSTRAINTS.json');

const ILLUSTRATION_COMMANDS = [
  'cover-art',
  'art-direction',
  'illustrate-scene',
  'character-ref',
  'chapter-header',
  'map-illustration',
  'spread-layout',
  'panel-layout',
  'storyboard',
];

// ── D-01: Structured prompt format ──────────────────────────────

describe('D-01: Structured prompt format', () => {
  const promptSections = /Subject|Composition|Style|Color Palette|Mood|Technical Spec/i;

  for (const cmd of ILLUSTRATION_COMMANDS) {
    const filePath = path.join(commandsDir, `${cmd}.md`);

    it(`${cmd}.md exists`, () => {
      assert.ok(fs.existsSync(filePath), `${cmd}.md should exist in commands/scr/`);
    });

    it(`${cmd}.md contains structured prompt sections`, () => {
      const content = fs.readFileSync(filePath, 'utf8');
      const sections = ['Subject', 'Composition', 'Style', 'Color Palette', 'Mood', 'Technical Spec'];
      const matches = sections.filter(s => new RegExp(s, 'i').test(content));
      // Layout-focused commands (panel-layout, spread-layout) use fewer prompt sections
      const minSections = ['panel-layout', 'spread-layout'].includes(cmd) ? 2 : 3;
      assert.ok(matches.length >= minSections,
        `${cmd}.md should contain at least ${minSections} structured prompt sections, found ${matches.length}: ${matches.join(', ')}`);
    });

    it(`${cmd}.md contains illustrations/ output path`, () => {
      const content = fs.readFileSync(filePath, 'utf8');
      assert.match(content, /illustrations\//, `${cmd}.md should contain illustrations/ output path`);
    });
  }
});

// ── D-02: Genre-specific cover conventions ──────────────────────

describe('D-02: Genre-specific cover conventions', () => {
  const filePath = path.join(commandsDir, 'cover-art.md');

  it('cover-art.md contains genre keywords (romance, thriller, or fantasy)', () => {
    const content = fs.readFileSync(filePath, 'utf8');
    assert.ok(
      /romance|thriller|fantasy/i.test(content),
      'cover-art.md should contain genre-specific keywords'
    );
  });

  it('cover-art.md contains generic genre reference', () => {
    const content = fs.readFileSync(filePath, 'utf8');
    assert.match(content, /genre/i, 'cover-art.md should contain "genre" reference');
  });
});

// ── D-03: Series consistency via art-direction ──────────────────

describe('D-03: Series consistency via art-direction', () => {
  const filePath = path.join(commandsDir, 'cover-art.md');

  it('cover-art.md contains --series or series flag', () => {
    const content = fs.readFileSync(filePath, 'utf8');
    assert.ok(
      /--series|series/i.test(content),
      'cover-art.md should contain series flag'
    );
  });

  it('cover-art.md contains ART-DIRECTION reference', () => {
    const content = fs.readFileSync(filePath, 'utf8');
    assert.match(content, /ART-DIRECTION/, 'cover-art.md should reference ART-DIRECTION');
  });
});

// ── D-04: Spread layout ASCII grid zones ────────────────────────

describe('D-04: Spread layout ASCII grid zones', () => {
  const filePath = path.join(commandsDir, 'spread-layout.md');

  it('spread-layout.md contains TEXT and ILLUSTRATION zone labels', () => {
    const content = fs.readFileSync(filePath, 'utf8');
    assert.match(content, /TEXT/, 'should contain TEXT zone label');
    assert.match(content, /ILLUSTRATION/, 'should contain ILLUSTRATION zone label');
  });

  it('spread-layout.md contains BLEED or bleed', () => {
    const content = fs.readFileSync(filePath, 'utf8');
    assert.ok(
      /BLEED|bleed/.test(content),
      'spread-layout.md should contain bleed reference'
    );
  });
});

// ── D-05: Storyboard camera direction ───────────────────────────

describe('D-05: Storyboard camera direction', () => {
  const filePath = path.join(commandsDir, 'storyboard.md');

  it('storyboard.md contains shot type reference', () => {
    const content = fs.readFileSync(filePath, 'utf8');
    assert.match(content, /shot/i, 'storyboard.md should contain "shot"');
  });

  it('storyboard.md contains camera reference', () => {
    const content = fs.readFileSync(filePath, 'utf8');
    assert.ok(
      /camera|Camera/.test(content),
      'storyboard.md should contain camera reference'
    );
  });

  it('storyboard.md contains transition reference', () => {
    const content = fs.readFileSync(filePath, 'utf8');
    assert.ok(
      /transition|Transition/.test(content),
      'storyboard.md should contain transition reference'
    );
  });
});

// ── Cover art KDP specs (ILL-02) ────────────────────────────────

describe('Cover art KDP specs (ILL-02)', () => {
  const filePath = path.join(commandsDir, 'cover-art.md');

  it('cover-art.md contains spine width paper factor', () => {
    const content = fs.readFileSync(filePath, 'utf8');
    assert.ok(
      /0\.002252|paper_factor|paper\.factor/i.test(content),
      'cover-art.md should contain spine width calculation reference'
    );
  });

  it('cover-art.md contains 300 DPI reference', () => {
    const content = fs.readFileSync(filePath, 'utf8');
    assert.match(content, /300/, 'should contain 300');
    assert.ok(
      /DPI|dpi/.test(content),
      'should contain DPI reference'
    );
  });

  it('cover-art.md contains bleed reference', () => {
    const content = fs.readFileSync(filePath, 'utf8');
    assert.match(content, /bleed/i, 'should contain bleed reference');
  });

  it('cover-art.md contains trim reference', () => {
    const content = fs.readFileSync(filePath, 'utf8');
    assert.match(content, /trim/i, 'should contain trim size reference');
  });
});

// ── CONSTRAINTS.json illustration commands ──────────────────────

describe('CONSTRAINTS.json illustration commands', () => {
  let constraints;

  it('CONSTRAINTS.json is valid JSON', () => {
    const raw = fs.readFileSync(constraintsPath, 'utf8');
    constraints = JSON.parse(raw);
    assert.equal(typeof constraints, 'object');
  });

  for (const cmd of ILLUSTRATION_COMMANDS) {
    it(`${cmd} exists in CONSTRAINTS.json commands`, () => {
      constraints = JSON.parse(fs.readFileSync(constraintsPath, 'utf8'));
      assert.ok(constraints.commands[cmd], `${cmd} should exist in CONSTRAINTS.json`);
    });

    it(`${cmd} has category "illustration"`, () => {
      constraints = JSON.parse(fs.readFileSync(constraintsPath, 'utf8'));
      assert.equal(constraints.commands[cmd].category, 'illustration',
        `${cmd} category should be illustration`);
    });
  }

  it('cover-art available includes prose and visual', () => {
    constraints = JSON.parse(fs.readFileSync(constraintsPath, 'utf8'));
    const avail = constraints.commands['cover-art'].available;
    assert.ok(avail.includes('prose'), 'cover-art should be available for prose');
    assert.ok(avail.includes('visual'), 'cover-art should be available for visual');
  });

  it('spread-layout available is visual only', () => {
    constraints = JSON.parse(fs.readFileSync(constraintsPath, 'utf8'));
    const avail = constraints.commands['spread-layout'].available;
    assert.deepEqual(avail, ['visual'], 'spread-layout should be available for visual only');
  });

  it('panel-layout has constraint comic_only', () => {
    constraints = JSON.parse(fs.readFileSync(constraintsPath, 'utf8'));
    assert.equal(constraints.commands['panel-layout'].constraint, 'comic_only',
      'panel-layout should have constraint comic_only');
  });

  it('storyboard available includes script', () => {
    constraints = JSON.parse(fs.readFileSync(constraintsPath, 'utf8'));
    const avail = constraints.commands['storyboard'].available;
    assert.ok(avail.includes('script'), 'storyboard should be available for script');
  });

  it('character-ref adapted.sacred.rename is figure-ref', () => {
    constraints = JSON.parse(fs.readFileSync(constraintsPath, 'utf8'));
    assert.equal(constraints.commands['character-ref'].adapted.sacred.rename, 'figure-ref',
      'character-ref should be renamed to figure-ref for sacred');
  });
});

// ── Command prerequisites ───────────────────────────────────────

describe('Command prerequisites', () => {
  let constraints;

  it('illustrate-scene requires ART-DIRECTION.md', () => {
    constraints = JSON.parse(fs.readFileSync(constraintsPath, 'utf8'));
    const requires = constraints.commands['illustrate-scene'].requires;
    assert.ok(requires.includes('ART-DIRECTION.md'),
      'illustrate-scene should require ART-DIRECTION.md');
  });

  it('cover-art requires WORK.md', () => {
    constraints = JSON.parse(fs.readFileSync(constraintsPath, 'utf8'));
    const requires = constraints.commands['cover-art'].requires;
    assert.ok(requires.includes('WORK.md'),
      'cover-art should require WORK.md');
  });

  it('character-ref command file references CHARACTERS.md', () => {
    const content = fs.readFileSync(path.join(commandsDir, 'character-ref.md'), 'utf8');
    assert.match(content, /CHARACTERS/,
      'character-ref should reference CHARACTERS.md');
  });

  it('map-illustration requires WORLD.md', () => {
    constraints = JSON.parse(fs.readFileSync(constraintsPath, 'utf8'));
    const requires = constraints.commands['map-illustration'].requires;
    assert.ok(requires.includes('WORLD.md'),
      'map-illustration should require WORLD.md');
  });
});

// ── Art direction command (ILL-03) ──────────────────────────────

describe('Art direction command (ILL-03)', () => {
  const filePath = path.join(commandsDir, 'art-direction.md');

  it('art-direction.md contains ART-DIRECTION', () => {
    const content = fs.readFileSync(filePath, 'utf8');
    assert.match(content, /ART-DIRECTION/, 'should contain ART-DIRECTION');
  });

  it('art-direction.md contains color palette section', () => {
    const content = fs.readFileSync(filePath, 'utf8');
    assert.match(content, /color/i, 'should contain color reference');
  });

  it('art-direction.md contains CHARACTERS or FIGURES reference', () => {
    const content = fs.readFileSync(filePath, 'utf8');
    assert.ok(
      /CHARACTERS|FIGURES/.test(content),
      'should reference CHARACTERS or FIGURES'
    );
  });

  it('art-direction.md contains visual and style', () => {
    const content = fs.readFileSync(filePath, 'utf8');
    assert.match(content, /visual/i, 'should contain visual');
    assert.match(content, /style/i, 'should contain style');
  });
});

// ── Interior illustration commands (ILL-04, ILL-05, ILL-06, ILL-07) ──

describe('Interior illustration commands (ILL-04, ILL-05, ILL-06, ILL-07)', () => {

  it('illustrate-scene.md contains scene and ART-DIRECTION', () => {
    const content = fs.readFileSync(path.join(commandsDir, 'illustrate-scene.md'), 'utf8');
    assert.match(content, /scene/i, 'should contain scene');
    assert.match(content, /ART-DIRECTION/, 'should reference ART-DIRECTION');
  });

  it('character-ref.md contains CHARACTERS and appearance or physical', () => {
    const content = fs.readFileSync(path.join(commandsDir, 'character-ref.md'), 'utf8');
    assert.match(content, /CHARACTERS/, 'should reference CHARACTERS');
    assert.ok(
      /appearance|physical/i.test(content),
      'should contain appearance or physical reference'
    );
  });

  it('character-ref.md contains figure-ref sacred adaptation', () => {
    const content = fs.readFileSync(path.join(commandsDir, 'character-ref.md'), 'utf8');
    assert.match(content, /figure-ref/i, 'should contain figure-ref reference');
  });

  it('chapter-header.md contains ornament, decorative, or header', () => {
    const content = fs.readFileSync(path.join(commandsDir, 'chapter-header.md'), 'utf8');
    assert.ok(
      /ornament|decorative|header/i.test(content),
      'should contain ornament, decorative, or header'
    );
  });

  it('map-illustration.md contains WORLD and geography or geographic', () => {
    const content = fs.readFileSync(path.join(commandsDir, 'map-illustration.md'), 'utf8');
    assert.match(content, /WORLD/, 'should reference WORLD');
    assert.ok(
      /geography|geographic/i.test(content),
      'should contain geography or geographic'
    );
  });
});

// ── Specialized format commands (ILL-08, ILL-09, ILL-10) ────────

describe('Specialized format commands (ILL-08, ILL-09, ILL-10)', () => {

  it('spread-layout.md exists and contains spread', () => {
    const filePath = path.join(commandsDir, 'spread-layout.md');
    assert.ok(fs.existsSync(filePath), 'spread-layout.md should exist');
    const content = fs.readFileSync(filePath, 'utf8');
    assert.match(content, /spread/i, 'should contain spread');
  });

  it('panel-layout.md exists and contains panel and gutter', () => {
    const filePath = path.join(commandsDir, 'panel-layout.md');
    assert.ok(fs.existsSync(filePath), 'panel-layout.md should exist');
    const content = fs.readFileSync(filePath, 'utf8');
    assert.match(content, /panel/i, 'should contain panel');
    assert.match(content, /gutter/i, 'should contain gutter');
  });

  it('storyboard.md exists and contains frame and shot', () => {
    const filePath = path.join(commandsDir, 'storyboard.md');
    assert.ok(fs.existsSync(filePath), 'storyboard.md should exist');
    const content = fs.readFileSync(filePath, 'utf8');
    assert.match(content, /frame/i, 'should contain frame');
    assert.match(content, /shot/i, 'should contain shot');
  });
});
