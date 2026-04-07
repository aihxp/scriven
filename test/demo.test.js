const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const demoDir = path.join(__dirname, '..', 'data', 'demo', '.manuscript');

const EXPECTED_FILES = [
  'WORK.md',
  'BRIEF.md',
  'OUTLINE.md',
  'STATE.md',
  'STYLE-GUIDE.md',
  'CHARACTERS.md',
  'PLOT-GRAPH.md',
  'THEMES.md',
  'config.json',
  'drafts/body/1-the-letter-DRAFT.md',
  'drafts/body/2-the-workshop-DRAFT.md',
  'drafts/body/3-the-pier-DRAFT.md',
  'drafts/body/4-the-clock-DRAFT.md',
  'plans/5-the-reunion-PLAN.md',
  'reviews/2-the-workshop-REVIEW.md',
];

describe('demo project completeness', () => {
  it('all expected demo files exist', () => {
    for (const file of EXPECTED_FILES) {
      const filePath = path.join(demoDir, file);
      assert.ok(
        fs.existsSync(filePath),
        `Missing demo file: ${file}`
      );
    }
  });

  it('all demo files are non-empty', () => {
    for (const file of EXPECTED_FILES) {
      const filePath = path.join(demoDir, file);
      const stat = fs.statSync(filePath);
      assert.ok(
        stat.size > 0,
        `Demo file is empty: ${file}`
      );
    }
  });

  it('STYLE-GUIDE.md has no unfilled placeholders', () => {
    const content = fs.readFileSync(
      path.join(demoDir, 'STYLE-GUIDE.md'),
      'utf-8'
    );
    assert.ok(
      !/\{\{[A-Z_]+\}\}/.test(content),
      'STYLE-GUIDE.md contains unfilled {{PLACEHOLDER}} tokens'
    );
  });

  it('STATE.md references 4 of 5 drafted', () => {
    const content = fs.readFileSync(
      path.join(demoDir, 'STATE.md'),
      'utf-8'
    );
    assert.ok(
      content.includes('4 of 5') || content.includes('4/5'),
      'STATE.md should reference 4 of 5 scenes drafted'
    );
  });

  it('config.json is valid JSON with work_type', () => {
    const raw = fs.readFileSync(
      path.join(demoDir, 'config.json'),
      'utf-8'
    );
    const config = JSON.parse(raw);
    assert.equal(
      config.work_type,
      'short_story',
      'config.json work_type should be "short_story"'
    );
  });

  it('drafted scenes have substantial content', () => {
    const draftFiles = [
      'drafts/body/1-the-letter-DRAFT.md',
      'drafts/body/2-the-workshop-DRAFT.md',
      'drafts/body/3-the-pier-DRAFT.md',
      'drafts/body/4-the-clock-DRAFT.md',
    ];
    for (const file of draftFiles) {
      const content = fs.readFileSync(path.join(demoDir, file), 'utf-8');
      const wordCount = content.split(/\s+/).filter(Boolean).length;
      assert.ok(
        wordCount >= 500,
        `${file} has only ${wordCount} words (expected >= 500)`
      );
    }
  });

  it('scene 5 is a plan, not a draft', () => {
    const content = fs.readFileSync(
      path.join(demoDir, 'plans', '5-the-reunion-PLAN.md'),
      'utf-8'
    );
    const hasPlanMarkers =
      content.includes('Scene goal') ||
      content.includes('Emotional arc') ||
      content.includes('Key beats');
    assert.ok(
      hasPlanMarkers,
      'Scene 5 should be a plan with structural markers, not prose'
    );
  });
});
