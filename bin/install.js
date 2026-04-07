#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const readline = require('readline');

const PKG_ROOT = path.join(__dirname, '..');
const VERSION = require('../package.json').version;

const COLORS = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  gray: '\x1b[90m',
};

function c(color, text) { return `${COLORS[color]}${text}${COLORS.reset}`; }

const BANNER = `
${c('bold', 'Scriven')} ${c('gray', 'v' + VERSION)}
${c('dim', 'Spec-driven creative writing, publishing, and translation for AI coding agents.')}
`;

const RUNTIMES = {
  'claude-code': {
    label: 'Claude Code',
    commands_dir_global: path.join(os.homedir(), '.claude', 'commands', 'scr'),
    commands_dir_project: '.claude/commands/scr',
    agents_dir_global: path.join(os.homedir(), '.claude', 'agents'),
    agents_dir_project: '.claude/agents',
    detect: () => fs.existsSync(path.join(os.homedir(), '.claude')),
  },
  'cursor': {
    label: 'Cursor',
    commands_dir_global: path.join(os.homedir(), '.cursor', 'commands', 'scr'),
    commands_dir_project: '.cursor/commands/scr',
    agents_dir_global: path.join(os.homedir(), '.cursor', 'agents'),
    agents_dir_project: '.cursor/agents',
    detect: () => fs.existsSync(path.join(os.homedir(), '.cursor')),
  },
  'gemini-cli': {
    label: 'Gemini CLI',
    commands_dir_global: path.join(os.homedir(), '.gemini', 'commands', 'scr'),
    commands_dir_project: '.gemini/commands/scr',
    agents_dir_global: path.join(os.homedir(), '.gemini', 'agents'),
    agents_dir_project: '.gemini/agents',
    detect: () => fs.existsSync(path.join(os.homedir(), '.gemini')),
  },
};

function ask(rl, question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return 0;
  fs.mkdirSync(dest, { recursive: true });
  let count = 0;
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      count += copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
      count++;
    }
  }
  return count;
}

async function main() {
  console.log(BANNER);

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  const detected = Object.entries(RUNTIMES).filter(([, r]) => r.detect()).map(([k]) => k);
  const runtimeKeys = Object.keys(RUNTIMES);

  console.log(c('bold', 'Select your AI coding agent:'));
  runtimeKeys.forEach((key, i) => {
    const label = RUNTIMES[key].label;
    const badge = detected.includes(key) ? c('green', ' (detected)') : '';
    console.log(`  ${c('cyan', (i + 1) + '.')} ${label}${badge}`);
  });

  const runtimeChoice = await ask(rl, `\n${c('dim', 'Choice [1]: ')}`);
  const runtimeKey = runtimeKeys[(parseInt(runtimeChoice) || 1) - 1];
  const runtime = RUNTIMES[runtimeKey];

  console.log('\n' + c('bold', 'Install scope:'));
  console.log(`  ${c('cyan', '1.')} Global — available in all your projects`);
  console.log(`  ${c('cyan', '2.')} Project — just this directory`);
  const scopeChoice = await ask(rl, `\n${c('dim', 'Choice [1]: ')}`);
  const isGlobal = (scopeChoice || '1').trim() === '1';

  console.log('\n' + c('bold', 'Mode:'));
  console.log(`  ${c('cyan', '1.')} ${c('bold', 'Writer mode')} — git terminology hidden, friendly errors (default for non-developers)`);
  console.log(`  ${c('cyan', '2.')} ${c('bold', 'Developer mode')} — full git access, technical output`);
  const modeChoice = await ask(rl, `\n${c('dim', 'Choice [1]: ')}`);
  const developerMode = (modeChoice || '1').trim() === '2';

  rl.close();

  const commandsDir = isGlobal ? runtime.commands_dir_global : path.resolve(runtime.commands_dir_project);
  const agentsDir = isGlobal ? runtime.agents_dir_global : path.resolve(runtime.agents_dir_project);
  const dataDir = isGlobal ? path.join(os.homedir(), '.scriven') : path.resolve('.scriven');

  console.log('\n' + c('bold', 'Installing...'));

  const commandCount = copyDir(path.join(PKG_ROOT, 'commands', 'scr'), commandsDir);
  console.log(`  ${c('green', '✓')} ${commandCount} command files → ${c('dim', commandsDir)}`);

  const agentCount = copyDir(path.join(PKG_ROOT, 'agents'), agentsDir);
  console.log(`  ${c('green', '✓')} ${agentCount} agent prompts → ${c('dim', agentsDir)}`);

  fs.mkdirSync(path.join(dataDir, 'templates'), { recursive: true });
  fs.mkdirSync(path.join(dataDir, 'data'), { recursive: true });
  const templateCount = copyDir(path.join(PKG_ROOT, 'templates'), path.join(dataDir, 'templates'));
  const dataCount = copyDir(path.join(PKG_ROOT, 'data'), path.join(dataDir, 'data'));
  console.log(`  ${c('green', '✓')} ${templateCount} templates + ${dataCount} data files → ${c('dim', dataDir)}`);

  const settings = {
    version: VERSION,
    runtime: runtimeKey,
    scope: isGlobal ? 'global' : 'project',
    developer_mode: developerMode,
    data_dir: dataDir,
    installed_at: new Date().toISOString(),
  };
  fs.writeFileSync(path.join(dataDir, 'settings.json'), JSON.stringify(settings, null, 2));
  console.log(`  ${c('green', '✓')} settings.json → ${c('dim', path.join(dataDir, 'settings.json'))}`);

  console.log('\n' + c('bold', c('green', 'Installation complete!')));
  console.log('\n' + c('bold', 'Next steps:'));
  console.log(`  ${c('cyan', '1.')} Open ${runtime.label} in any directory`);
  console.log(`  ${c('cyan', '2.')} Run ${c('bold', '/scr:help')} to see available commands`);
  console.log(`  ${c('cyan', '3.')} Run ${c('bold', '/scr:new-work')} to start a new project`);
  console.log(`     or ${c('bold', '/scr:demo')} to explore a sample project first`);
  console.log('\n' + c('dim', 'Docs: https://github.com/scriven/scriven\n'));
}

// Only run interactive installer when executed directly
if (require.main === module) {
  main().catch((err) => {
    console.error(c('red', '\nInstallation failed:'), err.message);
    process.exit(1);
  });
}

module.exports = { copyDir, RUNTIMES };
