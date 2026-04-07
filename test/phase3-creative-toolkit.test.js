const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const commandsDir = path.join(ROOT, 'commands', 'scr');
const constraintsPath = path.join(ROOT, 'data', 'CONSTRAINTS.json');

// ── Character command files ──────────────────────────────────────────

describe('Character command files', () => {

  // CHAR-01: new-character has voice anchor sections
  describe('CHAR-01: new-character voice anchors (D-01)', () => {
    const filePath = path.join(commandsDir, 'new-character.md');

    it('new-character.md exists', () => {
      assert.ok(fs.existsSync(filePath), 'new-character.md should exist');
    });

    it('references speech patterns', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      assert.match(content, /speech/i, 'should reference speech patterns');
    });

    it('references vocabulary', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      assert.match(content, /vocabular/i, 'should reference vocabulary');
    });

    it('references internal monologue or voice', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      assert.ok(
        content.toLowerCase().includes('monologue') ||
        content.toLowerCase().includes('voice'),
        'should reference internal monologue or voice'
      );
    });
  });

  // CHAR-02: character-sheet with --edit flag and file_adaptations
  describe('CHAR-02: character-sheet', () => {
    const filePath = path.join(commandsDir, 'character-sheet.md');

    it('character-sheet.md exists', () => {
      assert.ok(fs.existsSync(filePath), 'character-sheet.md should exist');
    });

    it('has YAML frontmatter with description', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      const fm = content.match(/^---\n([\s\S]*?)\n---/);
      assert.ok(fm, 'missing YAML frontmatter');
      assert.ok(fm[1].includes('description:'), 'missing description field');
    });

    it('has --edit flag', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      assert.match(content, /--edit/, 'should reference --edit flag');
    });

    it('references file_adaptations or CONSTRAINTS.json', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      assert.ok(
        content.includes('file_adaptations') || content.includes('CONSTRAINTS'),
        'should reference file_adaptations or CONSTRAINTS.json'
      );
    });
  });

  // CHAR-04: character-voice-sample mentions 5 lines of dialogue
  describe('CHAR-04: character-voice-sample', () => {
    const filePath = path.join(commandsDir, 'character-voice-sample.md');

    it('character-voice-sample.md exists', () => {
      assert.ok(fs.existsSync(filePath), 'character-voice-sample.md should exist');
    });

    it('has YAML frontmatter with description', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      const fm = content.match(/^---\n([\s\S]*?)\n---/);
      assert.ok(fm, 'missing YAML frontmatter');
      assert.ok(fm[1].includes('description:'), 'missing description field');
    });

    it('mentions 5 lines or five lines of dialogue', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      assert.ok(
        content.includes('5 lines') || content.includes('five lines') ||
        content.includes('5-line') || content.includes('five-line'),
        'should mention 5 lines of dialogue'
      );
    });
  });

  // CHAR-06: cast-list with roster/table format
  describe('CHAR-06: cast-list', () => {
    const filePath = path.join(commandsDir, 'cast-list.md');

    it('cast-list.md exists', () => {
      assert.ok(fs.existsSync(filePath), 'cast-list.md should exist');
    });

    it('has YAML frontmatter with description', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      const fm = content.match(/^---\n([\s\S]*?)\n---/);
      assert.ok(fm, 'missing YAML frontmatter');
      assert.ok(fm[1].includes('description:'), 'missing description field');
    });

    it('references roster or table format', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      assert.ok(
        content.toLowerCase().includes('roster') ||
        content.toLowerCase().includes('table') ||
        content.toLowerCase().includes('list'),
        'should reference roster, table, or list format'
      );
    });
  });
});

// ── Character visualization and world commands ───────────────────────

describe('Character visualization and world commands', () => {

  // CHAR-03: character-arc references PLOT-GRAPH.md (D-03)
  describe('CHAR-03: character-arc (D-03)', () => {
    const filePath = path.join(commandsDir, 'character-arc.md');

    it('character-arc.md exists', () => {
      assert.ok(fs.existsSync(filePath), 'character-arc.md should exist');
    });

    it('has YAML frontmatter with description', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      const fm = content.match(/^---\n([\s\S]*?)\n---/);
      assert.ok(fm, 'missing YAML frontmatter');
      assert.ok(fm[1].includes('description:'), 'missing description field');
    });

    it('references PLOT-GRAPH.md (D-03)', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      assert.ok(
        content.includes('PLOT-GRAPH') || content.includes('PLOT_GRAPH'),
        'should cross-reference PLOT-GRAPH.md per D-03'
      );
    });
  });

  // CHAR-05: relationship-map with ASCII graph (D-02)
  describe('CHAR-05: relationship-map (D-02)', () => {
    const filePath = path.join(commandsDir, 'relationship-map.md');

    it('relationship-map.md exists', () => {
      assert.ok(fs.existsSync(filePath), 'relationship-map.md should exist');
    });

    it('has YAML frontmatter with description', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      const fm = content.match(/^---\n([\s\S]*?)\n---/);
      assert.ok(fm, 'missing YAML frontmatter');
      assert.ok(fm[1].includes('description:'), 'missing description field');
    });

    it('contains ASCII graph instructions (D-02)', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      assert.ok(
        content.includes('ASCII') || content.includes('ascii'),
        'should contain ASCII graph instructions per D-02'
      );
    });

    it('contains labeled edge example', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      assert.ok(
        content.includes('--[') || content.includes('-->'),
        'should show labeled edge example (e.g., --[relation]-->)'
      );
    });
  });

  // CHAR-07: build-world with --area flag (D-05) and WORLD.md template (D-04)
  describe('CHAR-07: build-world (D-04, D-05)', () => {
    const filePath = path.join(commandsDir, 'build-world.md');

    it('build-world.md exists', () => {
      assert.ok(fs.existsSync(filePath), 'build-world.md should exist');
    });

    it('has YAML frontmatter with description', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      const fm = content.match(/^---\n([\s\S]*?)\n---/);
      assert.ok(fm, 'missing YAML frontmatter');
      assert.ok(fm[1].includes('description:'), 'missing description field');
    });

    it('contains --area flag (D-05)', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      assert.match(content, /--area/, 'should contain --area flag per D-05');
    });

    it('references COSMOLOGY adaptation for sacred (D-05)', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      assert.ok(
        content.includes('COSMOLOGY'),
        'should reference COSMOLOGY.md adaptation for sacred work types'
      );
    });
  });

  // WORLD.md template (D-04)
  describe('WORLD.md template (D-04)', () => {
    const worldPath = path.join(ROOT, 'templates', 'WORLD.md');

    it('WORLD.md template exists', () => {
      assert.ok(fs.existsSync(worldPath), 'templates/WORLD.md should exist');
    });

    it('has Geography section', () => {
      const content = fs.readFileSync(worldPath, 'utf8');
      assert.match(content, /Geography/i, 'should have Geography section');
    });

    it('has Culture section', () => {
      const content = fs.readFileSync(worldPath, 'utf8');
      assert.match(content, /Culture/i, 'should have Culture section');
    });

    it('has Technology or Magic section', () => {
      const content = fs.readFileSync(worldPath, 'utf8');
      assert.ok(
        content.includes('Technology') || content.includes('Magic'),
        'should have Technology/Magic section'
      );
    });

    it('has Rules or Laws section', () => {
      const content = fs.readFileSync(worldPath, 'utf8');
      assert.ok(
        content.includes('Rules') || content.includes('Laws'),
        'should have Rules/Laws section'
      );
    });

    it('has History section', () => {
      const content = fs.readFileSync(worldPath, 'utf8');
      assert.match(content, /History/i, 'should have History section');
    });
  });
});

// ── Structure visualization commands ─────────────────────────────────

describe('Structure visualization commands', () => {

  // STRUCT-01: plot-graph with all 9 arc types and auto-detection (D-06)
  describe('STRUCT-01: plot-graph (D-06)', () => {
    const filePath = path.join(commandsDir, 'plot-graph.md');

    it('plot-graph.md exists', () => {
      assert.ok(fs.existsSync(filePath), 'plot-graph.md should exist');
    });

    it('has YAML frontmatter with description', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      const fm = content.match(/^---\n([\s\S]*?)\n---/);
      assert.ok(fm, 'missing YAML frontmatter');
      assert.ok(fm[1].includes('description:'), 'missing description field');
    });

    const arcTypes = [
      'three-act', 'five-act', 'hero-journey', 'save-the-cat',
      'kishotenketsu', 'freytag', 'seven-point', 'fichtean-curve', 'custom'
    ];

    for (const arcType of arcTypes) {
      it(`supports ${arcType} arc type`, () => {
        const content = fs.readFileSync(filePath, 'utf8');
        assert.ok(
          content.includes(arcType),
          `plot-graph.md should list ${arcType} arc type`
        );
      });
    }

    it('has auto-detection logic (D-06)', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      assert.ok(
        content.toLowerCase().includes('auto-detect') ||
        content.toLowerCase().includes('auto detect') ||
        content.includes('AUTO-DETECTION'),
        'should have auto-detection logic per D-06'
      );
    });

    it('has --type flag (D-06)', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      assert.match(content, /--type/, 'should have --type flag per D-06');
    });
  });

  // STRUCT-02: timeline references OUTLINE.md
  describe('STRUCT-02: timeline', () => {
    const filePath = path.join(commandsDir, 'timeline.md');

    it('timeline.md exists', () => {
      assert.ok(fs.existsSync(filePath), 'timeline.md should exist');
    });

    it('has YAML frontmatter with description', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      const fm = content.match(/^---\n([\s\S]*?)\n---/);
      assert.ok(fm, 'missing YAML frontmatter');
      assert.ok(fm[1].includes('description:'), 'missing description field');
    });

    it('references OUTLINE.md', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      assert.match(content, /OUTLINE\.md/, 'should reference OUTLINE.md');
    });
  });

  // STRUCT-03: theme-tracker with suggest-not-auto-add (D-08)
  describe('STRUCT-03: theme-tracker (D-08)', () => {
    const filePath = path.join(commandsDir, 'theme-tracker.md');

    it('theme-tracker.md exists', () => {
      assert.ok(fs.existsSync(filePath), 'theme-tracker.md should exist');
    });

    it('has YAML frontmatter with description', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      const fm = content.match(/^---\n([\s\S]*?)\n---/);
      assert.ok(fm, 'missing YAML frontmatter');
      assert.ok(fm[1].includes('description:'), 'missing description field');
    });

    it('contains suggest pattern (D-08)', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      assert.match(content, /suggest/i, 'should contain suggest pattern per D-08');
    });

    it('contains never-auto-add instruction (D-08)', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      assert.ok(
        content.toLowerCase().includes('never auto') ||
        content.toLowerCase().includes('never automatically') ||
        content.toLowerCase().includes('approval') ||
        content.toLowerCase().includes('confirm'),
        'should instruct to never auto-add themes per D-08'
      );
    });

    it('has --detect flag for separation of display/detect modes', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      assert.match(content, /--detect/, 'should have --detect flag');
    });
  });

  // STRUCT-04: subplot-map mentions multiple threads
  describe('STRUCT-04: subplot-map', () => {
    const filePath = path.join(commandsDir, 'subplot-map.md');

    it('subplot-map.md exists', () => {
      assert.ok(fs.existsSync(filePath), 'subplot-map.md should exist');
    });

    it('has YAML frontmatter with description', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      const fm = content.match(/^---\n([\s\S]*?)\n---/);
      assert.ok(fm, 'missing YAML frontmatter');
      assert.ok(fm[1].includes('description:'), 'missing description field');
    });

    it('references threads or subplots', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      assert.ok(
        content.toLowerCase().includes('thread') ||
        content.toLowerCase().includes('subplot'),
        'should reference threads or subplots'
      );
    });
  });

  // STRUCT-05: outline with --edit and hierarchy
  describe('STRUCT-05: outline', () => {
    const filePath = path.join(commandsDir, 'outline.md');

    it('outline.md exists', () => {
      assert.ok(fs.existsSync(filePath), 'outline.md should exist');
    });

    it('has YAML frontmatter with description', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      const fm = content.match(/^---\n([\s\S]*?)\n---/);
      assert.ok(fm, 'missing YAML frontmatter');
      assert.ok(fm[1].includes('description:'), 'missing description field');
    });

    it('has --edit flag', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      assert.match(content, /--edit/, 'should have --edit flag');
    });

    it('references hierarchy', () => {
      const content = fs.readFileSync(filePath, 'utf8');
      assert.match(content, /hierarch/i, 'should reference structural hierarchy');
    });
  });
});

// ── Structure management commands ────────────────────────────────────

describe('Structure management commands', () => {
  const structureCommands = [
    'add-unit', 'insert-unit', 'remove-unit',
    'split-unit', 'merge-units', 'reorder-units'
  ];

  // STRUCT-06: all 6 commands exist with frontmatter
  for (const cmd of structureCommands) {
    describe(`STRUCT-06: ${cmd}`, () => {
      const filePath = path.join(commandsDir, cmd + '.md');

      it(`${cmd}.md exists`, () => {
        assert.ok(fs.existsSync(filePath), `${cmd}.md should exist`);
      });

      it('has YAML frontmatter with description', () => {
        const content = fs.readFileSync(filePath, 'utf8');
        const fm = content.match(/^---\n([\s\S]*?)\n---/);
        assert.ok(fm, `${cmd}.md missing YAML frontmatter`);
        assert.ok(fm[1].includes('description:'),
          `${cmd}.md frontmatter missing description field`);
      });

      it('references CONSTRAINTS.json hierarchy', () => {
        const content = fs.readFileSync(filePath, 'utf8');
        assert.ok(
          content.includes('CONSTRAINTS') || content.includes('hierarchy'),
          `${cmd}.md should reference CONSTRAINTS.json hierarchy`
        );
      });
    });
  }

  // STRUCT-06/D-07: draft-safety in destructive commands
  describe('D-07: draft-safety warnings', () => {
    const destructiveCommands = ['remove-unit', 'split-unit', 'merge-units', 'reorder-units'];

    for (const cmd of destructiveCommands) {
      it(`${cmd}.md contains draft-safety instructions`, () => {
        const content = fs.readFileSync(path.join(commandsDir, cmd + '.md'), 'utf8');
        assert.ok(
          /confirm|warn|draft|archive/i.test(content),
          `${cmd}.md should contain draft-safety instructions (confirm/warn/draft/archive)`
        );
      });
    }
  });
});

// ── CONSTRAINTS.json Phase 3 entries ─────────────────────────────────

describe('CONSTRAINTS.json Phase 3 entries', () => {
  let constraints;

  const phase3Commands = [
    'character-sheet', 'character-arc', 'character-voice-sample',
    'cast-list', 'relationship-map', 'build-world',
    'plot-graph', 'timeline', 'theme-tracker', 'subplot-map', 'outline',
    'add-unit', 'insert-unit', 'remove-unit',
    'split-unit', 'merge-units', 'reorder-units'
  ];

  it('CONSTRAINTS.json parses as valid JSON', () => {
    const raw = fs.readFileSync(constraintsPath, 'utf8');
    constraints = JSON.parse(raw);
    assert.equal(typeof constraints, 'object');
  });

  for (const cmd of phase3Commands) {
    it(`has entry for ${cmd}`, () => {
      constraints = JSON.parse(fs.readFileSync(constraintsPath, 'utf8'));
      assert.ok(
        constraints.commands[cmd],
        `CONSTRAINTS.json should have entry for ${cmd}`
      );
    });
  }

  // Required fields for all phase 3 commands
  for (const cmd of phase3Commands) {
    it(`${cmd} has category field`, () => {
      constraints = JSON.parse(fs.readFileSync(constraintsPath, 'utf8'));
      assert.ok(
        constraints.commands[cmd].category,
        `${cmd} should have category field`
      );
    });

    it(`${cmd} has available field`, () => {
      constraints = JSON.parse(fs.readFileSync(constraintsPath, 'utf8'));
      assert.ok(
        Array.isArray(constraints.commands[cmd].available),
        `${cmd} should have available array`
      );
    });
  }

  // CHAR-08: sacred adaptations for character commands
  describe('CHAR-08: sacred adaptations', () => {
    const sacredAdaptations = {
      'character-sheet': 'figure-sheet',
      'character-arc': 'figure-arc',
      'cast-list': 'figures-list',
      'relationship-map': 'lineage-map',
      'character-voice-sample': 'register-sample'
    };

    for (const [cmd, sacredName] of Object.entries(sacredAdaptations)) {
      it(`${cmd} has sacred adaptation to "${sacredName}"`, () => {
        constraints = JSON.parse(fs.readFileSync(constraintsPath, 'utf8'));
        const cmdEntry = constraints.commands[cmd];
        assert.ok(cmdEntry.adapted, `${cmd} should have adapted field`);
        assert.ok(cmdEntry.adapted.sacred, `${cmd} should have sacred adaptation`);
        assert.equal(
          cmdEntry.adapted.sacred.rename,
          sacredName,
          `${cmd} sacred rename should be "${sacredName}"`
        );
      });
    }
  });

  // CHAR-08: academic adaptation for character-sheet
  describe('CHAR-08: academic adaptations', () => {
    it('character-sheet has academic adaptation to "concept-sheet"', () => {
      constraints = JSON.parse(fs.readFileSync(constraintsPath, 'utf8'));
      const cmdEntry = constraints.commands['character-sheet'];
      assert.ok(cmdEntry.adapted.academic, 'character-sheet should have academic adaptation');
      assert.equal(
        cmdEntry.adapted.academic.rename,
        'concept-sheet',
        'character-sheet academic rename should be "concept-sheet"'
      );
    });
  });

  // file_adaptations entries for sacred
  describe('file_adaptations for sacred work types', () => {
    it('has sacred file_adaptations section', () => {
      constraints = JSON.parse(fs.readFileSync(constraintsPath, 'utf8'));
      assert.ok(constraints.file_adaptations, 'should have file_adaptations');
      assert.ok(constraints.file_adaptations.sacred, 'should have sacred file_adaptations');
    });

    it('sacred adapts CHARACTERS.md to FIGURES.md', () => {
      constraints = JSON.parse(fs.readFileSync(constraintsPath, 'utf8'));
      assert.equal(
        constraints.file_adaptations.sacred['CHARACTERS.md'],
        'FIGURES.md',
        'sacred should adapt CHARACTERS.md to FIGURES.md'
      );
    });

    it('sacred adapts WORLD.md to COSMOLOGY.md', () => {
      constraints = JSON.parse(fs.readFileSync(constraintsPath, 'utf8'));
      assert.equal(
        constraints.file_adaptations.sacred['WORLD.md'],
        'COSMOLOGY.md',
        'sacred should adapt WORLD.md to COSMOLOGY.md'
      );
    });
  });
});

// ── Work-type adaptation coverage ────────────────────────────────────

describe('Work-type adaptation coverage', () => {
  const allPhase3CommandFiles = [
    'character-sheet', 'character-arc', 'character-voice-sample',
    'cast-list', 'relationship-map', 'build-world',
    'plot-graph', 'timeline', 'theme-tracker', 'subplot-map', 'outline',
    'add-unit', 'insert-unit', 'remove-unit',
    'split-unit', 'merge-units', 'reorder-units'
  ];

  for (const cmd of allPhase3CommandFiles) {
    it(`${cmd}.md contains work-type awareness`, () => {
      const content = fs.readFileSync(path.join(commandsDir, cmd + '.md'), 'utf8');
      assert.ok(
        content.includes('CONSTRAINTS') ||
        content.includes('file_adaptations') ||
        content.includes('config.json') ||
        content.includes('work_type'),
        `${cmd}.md should reference CONSTRAINTS.json, file_adaptations, config.json, or work_type`
      );
    });
  }

  it('build-world references COSMOLOGY.md adaptation for sacred', () => {
    const content = fs.readFileSync(path.join(commandsDir, 'build-world.md'), 'utf8');
    assert.ok(
      content.includes('COSMOLOGY'),
      'build-world.md should reference COSMOLOGY.md for sacred adaptation'
    );
  });

  it('cast-list references FIGURES.md adaptation for sacred', () => {
    const content = fs.readFileSync(path.join(commandsDir, 'cast-list.md'), 'utf8');
    assert.ok(
      content.includes('FIGURES'),
      'cast-list.md should reference FIGURES.md for sacred adaptation'
    );
  });
});
