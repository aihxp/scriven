#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const readline = require('readline');
const crypto = require('crypto');

const PKG_ROOT = path.join(__dirname, '..');
const PKG = require('../package.json');
const VERSION = PKG.version;
const DOCS_URL = PKG.homepage || PKG.repository?.url || 'https://github.com/aihxp/scriven';
const MIN_NODE_MAJOR = 20;

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
function shellQuote(value) {
  return `'${String(value).replace(/'/g, `'\"'\"'`)}'`;
}

function buildFilesystemMcpCommand(allowedDirs) {
  return `npx -y @modelcontextprotocol/server-filesystem ${allowedDirs.map(shellQuote).join(' ')}`;
}

function generatePerplexitySetupGuide({ isGlobal, guideDir, dataDir, currentProjectDir }) {
  const connectorCommand = isGlobal
    ? buildFilesystemMcpCommand(['/absolute/path/to/project', dataDir])
    : buildFilesystemMcpCommand([currentProjectDir, dataDir]);
  const currentProjectCommand = buildFilesystemMcpCommand([currentProjectDir, dataDir]);

  return `# Scriven for Perplexity Desktop

This setup target prepares Scriven for **Perplexity Desktop on macOS** using Perplexity's documented **local MCP connector** flow.

## What this target supports

- Guided setup assets for Perplexity Desktop
- Local filesystem access to a Scriven project and Scriven's shared data
- Honest runtime framing: this is **not** slash-command parity with Claude Code, Codex, Cursor, or Gemini CLI

## Prerequisites

1. Install **Perplexity Desktop** from the Mac App Store
2. In Perplexity Desktop, open **Settings -> Connectors**
3. Install the **PerplexityXPC** helper when prompted
4. Ensure Node.js 20+ is available so \`npx\` can run the filesystem MCP server

## Add the connector

In Perplexity Desktop:

1. Open **Settings -> Connectors**
2. Click **Add Connector**
3. In the **Simple** tab, choose any server name such as \`Scriven Project Files\`
4. Paste this command:

\`\`\`bash
${connectorCommand}
\`\`\`

5. Save and wait for the connector to show **Running**
6. Toggle the connector on from **Sources** when you want Perplexity to access your Scriven files

## Current project command

This installer was run from:

\`\`\`
${currentProjectDir}
\`\`\`

If you want a command that is ready for this specific project right now, use:

\`\`\`bash
${currentProjectCommand}
\`\`\`

## Notes

- ${isGlobal ? 'Global install stores shared setup assets under your home directory, but the MCP connector itself still needs a project path.' : 'Project install points the connector at this project and its local .scriven directory.'}
- Keep the allowed directories narrow. Prefer the project root and the matching Scriven data directory only.
- Voice-critical drafting still depends on explicit \`STYLE-GUIDE.md\` loading per unit. Perplexity memory or spaces are not a substitute for Scriven's Voice DNA pipeline.

## Installed assets

- Guide directory: \`${guideDir}\`
- Scriven data directory: \`${dataDir}\`
`;
}

const BANNER = `
${c('bold', 'Scriven')} ${c('gray', 'v' + VERSION)}
${c('dim', 'Spec-driven creative writing, publishing, and translation for AI coding agents.')}
`;

const RUNTIME_SUPPORT_NOTE = c(
  'dim',
  'Installer requires Node.js 20+. The runtimes below are installer targets with varying support evidence.'
);

const RUNTIMES = {
  'claude-code': {
    label: 'Claude Code',
    type: 'commands',
    commands_dir_global: path.join(os.homedir(), '.claude', 'commands'),
    commands_dir_project: '.claude/commands',
    agents_dir_global: path.join(os.homedir(), '.claude', 'agents'),
    agents_dir_project: '.claude/agents',
    command_layout: 'flat-prefixed',
    detect: () => fs.existsSync(path.join(os.homedir(), '.claude')),
  },
  'cursor': {
    label: 'Cursor',
    type: 'commands',
    commands_dir_global: path.join(os.homedir(), '.cursor', 'commands', 'scr'),
    commands_dir_project: '.cursor/commands/scr',
    agents_dir_global: path.join(os.homedir(), '.cursor', 'agents'),
    agents_dir_project: '.cursor/agents',
    detect: () => fs.existsSync(path.join(os.homedir(), '.cursor')),
  },
  'gemini-cli': {
    label: 'Gemini CLI',
    type: 'commands',
    commands_dir_global: path.join(os.homedir(), '.gemini', 'commands', 'scr'),
    commands_dir_project: '.gemini/commands/scr',
    agents_dir_global: path.join(os.homedir(), '.gemini', 'agents'),
    agents_dir_project: '.gemini/agents',
    detect: () => fs.existsSync(path.join(os.homedir(), '.gemini')),
  },
  'codex': {
    label: 'Codex',
    type: 'skills',
    skills_dir_global: path.join(os.homedir(), '.codex', 'skills'),
    skills_dir_project: '.codex/skills',
    commands_dir_global: path.join(os.homedir(), '.codex', 'commands', 'scr'),
    commands_dir_project: '.codex/commands/scr',
    agents_dir_global: path.join(os.homedir(), '.codex', 'agents'),
    agents_dir_project: '.codex/agents',
    skill_style: 'per-command',
    detect: () => fs.existsSync(path.join(os.homedir(), '.codex')),
  },
  'opencode': {
    label: 'OpenCode',
    type: 'commands',
    commands_dir_global: path.join(os.homedir(), '.config', 'opencode', 'commands', 'scr'),
    commands_dir_project: '.config/opencode/commands/scr',
    agents_dir_global: path.join(os.homedir(), '.config', 'opencode', 'agents'),
    agents_dir_project: '.config/opencode/agents',
    detect: () => fs.existsSync(path.join(os.homedir(), '.config', 'opencode')),
  },
  'copilot': {
    label: 'GitHub Copilot',
    type: 'commands',
    commands_dir_global: path.join(os.homedir(), '.github', 'commands', 'scr'),
    commands_dir_project: '.github/commands/scr',
    agents_dir_global: path.join(os.homedir(), '.github', 'agents'),
    agents_dir_project: '.github/agents',
    detect: () => fs.existsSync(path.join(os.homedir(), '.github')),
  },
  'windsurf': {
    label: 'Windsurf',
    type: 'commands',
    commands_dir_global: path.join(os.homedir(), '.windsurf', 'commands', 'scr'),
    commands_dir_project: '.windsurf/commands/scr',
    agents_dir_global: path.join(os.homedir(), '.windsurf', 'agents'),
    agents_dir_project: '.windsurf/agents',
    detect: () => fs.existsSync(path.join(os.homedir(), '.windsurf')),
  },
  'antigravity': {
    label: 'Antigravity',
    type: 'commands',
    commands_dir_global: path.join(os.homedir(), '.gemini', 'antigravity', 'commands', 'scr'),
    commands_dir_project: '.gemini/antigravity/commands/scr',
    agents_dir_global: path.join(os.homedir(), '.gemini', 'antigravity', 'agents'),
    agents_dir_project: '.gemini/antigravity/agents',
    detect: () => fs.existsSync(path.join(os.homedir(), '.gemini', 'antigravity')),
  },
  'manus': {
    label: 'Manus Desktop',
    type: 'skills',
    skills_dir_global: path.join(os.homedir(), '.manus', 'skills', 'scriven'),
    skills_dir_project: '.manus/skills/scriven',
    detect: () => fs.existsSync(path.join(os.homedir(), '.manus')) || fs.existsSync('/Applications/Manus.app') || fs.existsSync(path.join(os.homedir(), 'Applications', 'Manus.app')),
  },
  'perplexity-desktop': {
    label: 'Perplexity Desktop',
    type: 'guided-mcp',
    guide_dir_global: path.join(os.homedir(), '.scriven', 'perplexity'),
    guide_dir_project: '.scriven/perplexity',
    detect: () => fs.existsSync('/Applications/Perplexity.app') || fs.existsSync(path.join(os.homedir(), 'Applications', 'Perplexity.app')),
  },
  'generic': {
    label: 'Generic (SKILL.md)',
    type: 'skills',
    skills_dir_global: path.join(os.homedir(), '.scriven', 'skills'),
    skills_dir_project: '.scriven/skills',
    detect: () => false,
  },
};

function generateSkillManifest(constraintsPath) {
  const constraints = JSON.parse(fs.readFileSync(constraintsPath, 'utf8'));
  const commands = constraints.commands;

  // Read sacred subcommand files to include them
  const sacredDir = path.join(PKG_ROOT, 'commands', 'scr', 'sacred');
  const sacredCommands = [];
  if (fs.existsSync(sacredDir)) {
    for (const file of fs.readdirSync(sacredDir)) {
      if (file.endsWith('.md')) {
        const name = file.replace(/\.md$/, '');
        // Look up in commands object for category/description, fall back to sacred_exclusive
        const cmdData = commands[name] || {};
        sacredCommands.push({
          name: `/scr:sacred:${name}`,
          category: cmdData.category || 'sacred_exclusive',
          description: cmdData.description || name.replace(/-/g, ' '),
        });
      }
    }
  }

  // Build entries from commands object
  const entries = [];
  for (const [name, cmd] of Object.entries(commands)) {
    entries.push({
      name: `/scr:${name}`,
      category: cmd.category || 'uncategorized',
      description: cmd.description || name.replace(/-/g, ' '),
    });
  }

  // Add sacred subcommands as /scr:sacred:name entries
  // These represent the sacred/ subdirectory path for discovery
  for (const sc of sacredCommands) {
    entries.push(sc);
  }

  // Sort by category, then alphabetically by name within category
  entries.sort((a, b) => {
    if (a.category < b.category) return -1;
    if (a.category > b.category) return 1;
    return a.name.localeCompare(b.name);
  });

  // Build markdown table
  const tableRows = entries.map(e => `| ${e.name} | ${e.category} | ${e.description} |`);

  return `# Scriven — AI Creative Writing Skills

Version: ${VERSION}

Scriven is a spec-driven creative writing, publishing, and translation pipeline.

## Available Commands

| Command | Category | Description |
|---------|----------|-------------|
${tableRows.join('\n')}

## Usage

Each command above has a detailed instruction file in the \`commands/scr/\` subdirectory.
To use a command, read the corresponding \`.md\` file and follow its instructions.

## Quick Start

1. Run \`/scr:help\` to see commands grouped by stage
2. Run \`/scr:new-work\` to start a new project
3. Run \`/scr:demo\` to explore a sample project
`;
}

function stripWrappingQuotes(value) {
  if (!value) return '';
  const trimmed = value.trim();
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith('\'') && trimmed.endsWith('\''))) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function extractFrontmatterBlock(content) {
  if (typeof content !== 'string' || content.length === 0) return null;
  // Strip a leading UTF-8 BOM if present so the first-line check is robust.
  const stripped = content.charCodeAt(0) === 0xFEFF ? content.slice(1) : content;
  const lines = stripped.split(/\r?\n/);
  if (lines.length === 0 || lines[0] !== '---') return null;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i] === '---' || lines[i] === '...') {
      return lines.slice(1, i);
    }
  }
  // No closing fence — treat as malformed / no frontmatter.
  return null;
}

function stripInlineComment(rawValue) {
  const trimmedLeading = rawValue.replace(/^\s+/, '');
  if (trimmedLeading.startsWith('"') || trimmedLeading.startsWith('\'')) {
    // Preserve `#` inside quoted values; do not attempt to parse quote escaping beyond
    // the simple wrapping-quote behavior already handled by stripWrappingQuotes.
    return rawValue;
  }
  // YAML inline comments require whitespace before `#`.
  const idx = rawValue.search(/\s#/);
  if (idx === -1) return rawValue;
  return rawValue.slice(0, idx);
}

function readFrontmatterValues(content) {
  const lines = extractFrontmatterBlock(content);
  const result = {};
  if (!lines) return result;

  for (const line of lines) {
    if (line.length === 0) continue;
    const leading = line.replace(/^\s+/, '');
    if (leading.length === 0) continue;
    if (leading.startsWith('#')) continue; // YAML comment line

    const idx = line.indexOf(':');
    if (idx === -1) continue;

    const key = line.slice(0, idx).trim();
    if (!key) continue;
    if (Object.prototype.hasOwnProperty.call(result, key)) continue; // first occurrence wins

    let value = line.slice(idx + 1);
    value = stripInlineComment(value);
    value = stripWrappingQuotes(value);
    // Defensive: surface block-scalar introducers verbatim rather than trying to parse them.
    // (No shipped command file uses `|` or `>` for description/argument-hint today.)
    result[key] = value;
  }

  return result;
}

function readFrontmatterValue(content, key) {
  const values = readFrontmatterValues(content);
  return Object.prototype.hasOwnProperty.call(values, key) ? values[key] : '';
}

function commandRefToCodexSkillName(commandRef) {
  return commandRef
    .replace(/^\/scr:/, 'scr-')
    .replace(/:/g, '-');
}

function commandRefToClaudeInvocation(commandRef) {
  return `/${commandRefToCodexSkillName(commandRef)}`;
}

function commandRefToCodexInvocation(commandRef) {
  return `$${commandRefToCodexSkillName(commandRef)}`;
}

function commandEntryToFlatCommandFileName(entry) {
  return `${commandRefToCodexSkillName(entry.commandRef)}.md`;
}

function collectCommandEntries(commandsRoot) {
  const entries = [];

  function walk(dir, segments = []) {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        walk(path.join(dir, entry.name), segments.concat(entry.name));
        continue;
      }
      if (!entry.name.endsWith('.md')) continue;

      const relSegments = segments.concat(entry.name.replace(/\.md$/, ''));
      const relPath = path.join(...segments, entry.name);
      const filePath = path.join(dir, entry.name);
      const content = fs.readFileSync(filePath, 'utf8');
      const commandTail = relSegments.join(':');
      const commandRef = `/scr:${commandTail}`;
      const description = readFrontmatterValue(content, 'description') || commandTail.replace(/[:\-]/g, ' ');
      const argumentHint = readFrontmatterValue(content, 'argument-hint');

      entries.push({
        commandRef,
        skillName: commandRefToCodexSkillName(commandRef),
        description,
        argumentHint,
        relativePath: relPath,
      });
    }
  }

  walk(commandsRoot);
  entries.sort((a, b) => a.commandRef.localeCompare(b.commandRef));
  return entries;
}

function generateCodexSkill(entry, commandPath) {
  const invocation = commandRefToCodexInvocation(entry.commandRef);
  const shortDescription = entry.description.length > 120
    ? `${entry.description.slice(0, 117)}...`
    : entry.description;
  const argumentsLine = entry.argumentHint
    ? `- Treat any text after \`${invocation}\` as the arguments for the underlying Scriven command ${entry.argumentHint}.`
    : `- Treat any text after \`${invocation}\` as the arguments for the underlying Scriven command.`;

  return `---
name: "${entry.skillName}"
description: "${entry.description.replace(/"/g, '\\"')}"
metadata:
  short-description: "${shortDescription.replace(/"/g, '\\"')}"
---

<codex_skill_adapter>
## Invocation
- This skill is invoked by mentioning \`${invocation}\`.
${argumentsLine}
- When the installed Scriven command file mentions \`/scr:...\`, rewrite that command surface for Codex users as \`$scr-...\`.
  - Example: \`/scr:help\` becomes \`$scr-help\`
  - Example: \`/scr:new-work\` becomes \`$scr-new-work\`
  - Example: \`/scr:sacred:concordance\` becomes \`$scr-sacred-concordance\`
</codex_skill_adapter>

<objective>
Execute Scriven's \`${entry.commandRef}\` command inside Codex by reading the installed Scriven command file below as the source of truth.
</objective>

<context>
Installed command file: ${commandPath}
</context>

<process>
1. Read \`${commandPath}\`.
2. Execute that command file exactly as written.
3. Treat text after \`${invocation}\` as the command arguments.
4. When suggesting other Scriven commands to Codex users, translate \`/scr:...\` references to the \`$scr-...\` surface.
</process>
`;
}

function listRelativeFiles(dir, prefix = '') {
  if (!fs.existsSync(dir)) return [];
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = path.join(prefix, entry.name);
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...listRelativeFiles(abs, rel));
    } else {
      files.push(rel);
    }
  }
  return files;
}

function cleanMirroredFiles(srcDir, destDir) {
  if (!fs.existsSync(srcDir) || !fs.existsSync(destDir)) return 0;
  let removed = 0;
  for (const relPath of listRelativeFiles(srcDir)) {
    const destPath = path.join(destDir, relPath);
    if (fs.existsSync(destPath)) {
      fs.rmSync(destPath, { force: true });
      removed++;
    }
  }
  return removed;
}

function removePathIfExists(targetPath) {
  if (!fs.existsSync(targetPath)) return false;
  fs.rmSync(targetPath, { recursive: true, force: true });
  return true;
}

function atomicWriteFileSync(targetPath, content) {
  const dir = path.dirname(targetPath);
  fs.mkdirSync(dir, { recursive: true });
  const tmpPath = `${targetPath}.tmp.${crypto.randomUUID()}`;
  const buffer = Buffer.isBuffer(content) ? content : Buffer.from(String(content));
  let fd;
  try {
    fd = fs.openSync(tmpPath, 'w');
    fs.writeSync(fd, buffer, 0, buffer.length, 0);
    fs.fsyncSync(fd);
    fs.closeSync(fd);
    fd = undefined;
    fs.renameSync(tmpPath, targetPath);
  } catch (err) {
    if (fd !== undefined) {
      try { fs.closeSync(fd); } catch { /* best effort */ }
    }
    try { fs.unlinkSync(tmpPath); } catch { /* best effort */ }
    throw err;
  }
}

function cleanOrphanedTempFiles(dir) {
  if (!fs.existsSync(dir)) return 0;
  const TMP_PATTERN = /\.tmp\.[0-9a-f-]{36}$/i;
  let removed = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isFile()) continue;
    if (!TMP_PATTERN.test(entry.name)) continue;
    try {
      fs.unlinkSync(path.join(dir, entry.name));
      removed++;
    } catch { /* best effort */ }
  }
  return removed;
}

function insertMarkerComment(content, comment) {
  if (content.startsWith('---\n')) {
    const frontmatterEnd = content.indexOf('\n---\n', 4);
    if (frontmatterEnd !== -1) {
      const insertAt = frontmatterEnd + '\n---\n'.length;
      return `${content.slice(0, insertAt)}${comment}\n${content.slice(insertAt)}`;
    }
  }
  return `${comment}\n${content}`;
}

function rewriteInstalledCommandRefs(content, transform) {
  return content.replace(/\/scr:[a-z0-9:-]+/gi, (commandRef) => transform(commandRef));
}

function markInstalledCommand(content, runtimeKey, commandRef, sourcePath) {
  const marker = `<!-- scriven-cli-installed-command runtime:${runtimeKey} command:${commandRef} source:${sourcePath} -->`;
  return insertMarkerComment(content, marker);
}

function generateClaudeCommandContent(entry, sourceContent) {
  const rewritten = rewriteInstalledCommandRefs(sourceContent, commandRefToClaudeInvocation);
  return markInstalledCommand(rewritten, 'claude-code', commandRefToClaudeInvocation(entry.commandRef), entry.relativePath);
}

function isScrivenInstalledCommandFile(filePath) {
  if (!fs.existsSync(filePath)) return false;
  const content = fs.readFileSync(filePath, 'utf8');
  return content.includes('scriven-cli-installed-command');
}

function cleanFlatCommandFiles(commandsDir, currentFileNames, legacyDirs = []) {
  if (!fs.existsSync(commandsDir)) return 0;

  const manifestPath = path.join(commandsDir, '.scriven-installed.json');
  const manifest = readJsonIfExists(manifestPath);
  const currentFileSet = new Set(currentFileNames);
  const knownFileNames = new Set(Array.isArray(manifest?.files) ? manifest.files : []);
  let removed = 0;

  for (const entry of fs.readdirSync(commandsDir, { withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith('.md')) continue;
    const filePath = path.join(commandsDir, entry.name);
    if (isScrivenInstalledCommandFile(filePath)) {
      knownFileNames.add(entry.name);
    }
  }

  removePathIfExists(manifestPath);

  for (const legacyDir of legacyDirs) {
    if (removePathIfExists(path.join(commandsDir, legacyDir))) {
      removed++;
    }
  }

  for (const fileName of knownFileNames) {
    if (!currentFileSet.has(fileName) && removePathIfExists(path.join(commandsDir, fileName))) {
      removed++;
    }
  }

  for (const fileName of currentFileNames) {
    if (removePathIfExists(path.join(commandsDir, fileName))) {
      removed++;
    }
  }

  return removed;
}

function writeInstalledCommandManifest(commandsDir, runtimeKey, fileNames) {
  const manifestPath = path.join(commandsDir, '.scriven-installed.json');
  const manifest = {
    installer: 'scriven-cli',
    version: VERSION,
    runtime: runtimeKey,
    files: fileNames,
    generated_at: new Date().toISOString(),
  };
  atomicWriteFileSync(manifestPath, JSON.stringify(manifest, null, 2));
}

function printHelp() {
  console.log(BANNER);
  console.log(`Usage:
  scriven
  scriven --runtimes codex,claude-code --global --writer --silent

Options:
  --runtimes <list>   Comma-separated runtime keys to install (for example: codex,claude-code)
  --runtime <key>     Repeatable single-runtime selector
  --detected          Install to every detected runtime
  --global            Install for all projects (default)
  --project           Install only in the current directory
  --writer            Use writer mode (default)
  --developer         Use developer mode
  --silent            Skip prompts and reduce output
  --help              Show this help text
  --version           Show the Scriven package version

Runtime keys:
  ${Object.keys(RUNTIMES).join(', ')}
`);
}

function parseArgs(argv) {
  const options = {
    runtimeKeys: [],
    installDetected: false,
    isGlobal: null,
    developerMode: null,
    silent: false,
    showHelp: false,
    showVersion: false,
  };

  function addRuntimeList(value) {
    for (const key of String(value).split(',').map((item) => item.trim()).filter(Boolean)) {
      if (!Object.prototype.hasOwnProperty.call(RUNTIMES, key)) {
        throw new Error(`Unknown runtime "${key}". Expected one of: ${Object.keys(RUNTIMES).join(', ')}`);
      }
      if (!options.runtimeKeys.includes(key)) {
        options.runtimeKeys.push(key);
      }
    }
  }

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--help' || arg === '-h') {
      options.showHelp = true;
    } else if (arg === '--version' || arg === '-v') {
      options.showVersion = true;
    } else if (arg === '--silent' || arg === '--yes') {
      options.silent = true;
    } else if (arg === '--detected') {
      options.installDetected = true;
    } else if (arg === '--global') {
      options.isGlobal = true;
    } else if (arg === '--project') {
      options.isGlobal = false;
    } else if (arg === '--writer') {
      options.developerMode = false;
    } else if (arg === '--developer') {
      options.developerMode = true;
    } else if (arg === '--runtime') {
      const value = argv[i + 1];
      if (!value) throw new Error('--runtime requires a value');
      addRuntimeList(value);
      i++;
    } else if (arg.startsWith('--runtime=')) {
      addRuntimeList(arg.slice('--runtime='.length));
    } else if (arg === '--runtimes') {
      const value = argv[i + 1];
      if (!value) throw new Error('--runtimes requires a value');
      addRuntimeList(value);
      i++;
    } else if (arg.startsWith('--runtimes=')) {
      addRuntimeList(arg.slice('--runtimes='.length));
    } else {
      throw new Error(`Unknown argument "${arg}"`);
    }
  }

  return options;
}

function resolveInstallRequest(parsed, detectedRuntimeKeys, { isTTY }) {
  const hasRuntimeDirective = parsed.runtimeKeys.length > 0 || parsed.installDetected;
  const hasModifierOverrides = parsed.isGlobal !== null || parsed.developerMode !== null;

  if (!isTTY && !hasRuntimeDirective) {
    return {
      action: 'usage_error',
      message: 'Non-interactive use requires --runtimes <list> or --detected.',
    };
  }

  if (parsed.silent && !hasRuntimeDirective) {
    return {
      action: 'usage_error',
      message: 'Silent installs require --runtimes <list>, --runtime <key>, or --detected.',
    };
  }

  if (hasRuntimeDirective) {
    return {
      action: 'install',
      runtimeKeys: parsed.runtimeKeys.length > 0
        ? parsed.runtimeKeys
        : detectedRuntimeKeys,
      isGlobal: parsed.isGlobal ?? true,
      developerMode: parsed.developerMode ?? false,
      silent: parsed.silent,
      installMode: 'non-interactive',
    };
  }

  return {
    action: 'interactive',
    isGlobal: parsed.isGlobal,
    developerMode: parsed.developerMode,
    hasModifierOverrides,
  };
}

function ask(rl, question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

function requireSupportedNode() {
  const major = Number.parseInt(process.versions.node.split('.')[0], 10);
  if (!Number.isInteger(major) || major < MIN_NODE_MAJOR) {
    console.error(c('red', `Scriven's installer requires Node.js 20+. You are running ${process.versions.node}.`));
    console.error(c('dim', 'See the repository README for the full runtime support matrix and current installer guidance.'));
    process.exit(1);
  }
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

function readJsonIfExists(filePath) {
  if (!fs.existsSync(filePath)) return null;
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return null;
  }
}

function isScrivenCodexSkillDir(skillDir) {
  const skillFile = path.join(skillDir, 'SKILL.md');
  if (!fs.existsSync(skillFile)) return false;
  const content = fs.readFileSync(skillFile, 'utf8');
  return content.includes('<codex_skill_adapter>')
    && content.includes("Execute Scriven's `")
    && content.includes('Installed command file:');
}

function cleanCodexSkillDirs(skillsDir, currentSkillNames) {
  if (!fs.existsSync(skillsDir)) return 0;

  const manifestPath = path.join(skillsDir, '.scriven-installed.json');
  const manifest = readJsonIfExists(manifestPath);
  const currentSkillSet = new Set(currentSkillNames);
  const knownScrivenSkillNames = new Set(Array.isArray(manifest?.skills) ? manifest.skills : []);

  for (const entry of fs.readdirSync(skillsDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const skillDir = path.join(skillsDir, entry.name);
    if (isScrivenCodexSkillDir(skillDir)) {
      knownScrivenSkillNames.add(entry.name);
    }
  }

  let removed = 0;
  removePathIfExists(path.join(skillsDir, 'scriven'));
  removePathIfExists(manifestPath);

  for (const skillName of knownScrivenSkillNames) {
    if (!currentSkillSet.has(skillName)) {
      if (removePathIfExists(path.join(skillsDir, skillName))) {
        removed++;
      }
    }
  }

  for (const skillName of currentSkillNames) {
    if (removePathIfExists(path.join(skillsDir, skillName))) {
      removed++;
    }
  }

  return removed;
}

function writeCodexSkillManifest(skillsDir, skillNames) {
  const manifestPath = path.join(skillsDir, '.scriven-installed.json');
  const manifest = {
    installer: 'scriven-cli',
    version: VERSION,
    skills: skillNames,
    generated_at: new Date().toISOString(),
  };
  atomicWriteFileSync(manifestPath, JSON.stringify(manifest, null, 2));
}

async function main() {
  const parsed = parseArgs(process.argv.slice(2));
  if (parsed.showHelp) {
    printHelp();
    return;
  }
  if (parsed.showVersion) {
    console.log(VERSION);
    return;
  }

  const detectedRuntimeKeys = Object.entries(RUNTIMES).filter(([, runtime]) => runtime.detect()).map(([key]) => key);
  const installRequest = resolveInstallRequest(parsed, detectedRuntimeKeys, { isTTY: Boolean(process.stdin.isTTY) });

  if (installRequest.action === 'usage_error') {
    printHelp();
    console.log(c('yellow', `\n${installRequest.message}`));
    process.exitCode = 1;
    return;
  }

  if (installRequest.action === 'install') {
    runInstall(installRequest);
    return;
  }

  console.log(BANNER);
  console.log(RUNTIME_SUPPORT_NOTE + '\n');

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const runtimeKeys = Object.keys(RUNTIMES);

  console.log(c('bold', 'Select your AI coding agent:'));
  runtimeKeys.forEach((key, i) => {
    const label = RUNTIMES[key].label;
    const badge = detectedRuntimeKeys.includes(key) ? c('green', ' (detected)') : '';
    console.log(`  ${c('cyan', (i + 1) + '.')} ${label}${badge}`);
  });

  const runtimeChoice = await ask(rl, `\n${c('dim', 'Choice [1]: ')}`);
  const parsedRuntimeChoice = Number.parseInt((runtimeChoice || '1').trim(), 10);
  const validRuntimeChoice = Number.isInteger(parsedRuntimeChoice)
    && parsedRuntimeChoice >= 1
    && parsedRuntimeChoice <= runtimeKeys.length;
  if ((runtimeChoice || '').trim() && !validRuntimeChoice) {
    console.log(c('yellow', `Invalid choice "${runtimeChoice.trim()}". Defaulting to 1 (${RUNTIMES[runtimeKeys[0]].label}).`));
  }
  const runtimeKey = runtimeKeys[validRuntimeChoice ? parsedRuntimeChoice - 1 : 0];
  const runtime = RUNTIMES[runtimeKey];

  let isGlobal;
  if (installRequest.isGlobal !== null) {
    isGlobal = installRequest.isGlobal;
    console.log('\n' + c('bold', 'Install scope:'));
    console.log(`  ${c('green', '✓')} Preset via CLI flag: ${isGlobal ? 'Global' : 'Project'}`);
  } else {
    console.log('\n' + c('bold', 'Install scope:'));
    console.log(`  ${c('cyan', '1.')} Global — available in all your projects`);
    console.log(`  ${c('cyan', '2.')} Project — just this directory`);
    if (runtime.type === 'guided-mcp') {
      console.log(c('dim', '  Note: Perplexity Desktop connectors still point at specific project paths even when you choose Global scope.'));
    }
    const scopeChoice = await ask(rl, `\n${c('dim', 'Choice [1]: ')}`);
    isGlobal = (scopeChoice || '1').trim() === '1';
  }

  let developerMode;
  if (installRequest.developerMode !== null) {
    developerMode = installRequest.developerMode;
    console.log('\n' + c('bold', 'Mode:'));
    console.log(`  ${c('green', '✓')} Preset via CLI flag: ${developerMode ? 'Developer mode' : 'Writer mode'}`);
  } else {
    console.log('\n' + c('bold', 'Mode:'));
    console.log(`  ${c('cyan', '1.')} ${c('bold', 'Writer mode')} — git terminology hidden, friendly errors (default for non-developers)`);
    console.log(`  ${c('cyan', '2.')} ${c('bold', 'Developer mode')} — full git access, technical output`);
    const modeChoice = await ask(rl, `\n${c('dim', 'Choice [1]: ')}`);
    developerMode = (modeChoice || '1').trim() === '2';
  }
  rl.close();

  runInstall({
    runtimeKeys: [runtimeKey],
    isGlobal,
    developerMode,
    silent: false,
    detectedRuntimeKeys,
    installMode: 'interactive',
  });
}

function installCommandRuntime(runtime, isGlobal, log) {
  const commandsDir = isGlobal ? runtime.commands_dir_global : path.resolve(runtime.commands_dir_project);
  const agentsDir = isGlobal ? runtime.agents_dir_global : path.resolve(runtime.agents_dir_project);
  removePathIfExists(commandsDir);
  const removedAgentFiles = cleanMirroredFiles(path.join(PKG_ROOT, 'agents'), agentsDir);
  const commandCount = copyDir(path.join(PKG_ROOT, 'commands', 'scr'), commandsDir);
  const agentCount = copyDir(path.join(PKG_ROOT, 'agents'), agentsDir);
  log(`  ${c('green', '✓')} ${runtime.label}: ${commandCount} command files → ${c('dim', commandsDir)}`);
  log(`  ${c('green', '✓')} ${runtime.label}: ${agentCount} agent prompts → ${c('dim', agentsDir)}${removedAgentFiles ? c('dim', ` (cleaned ${removedAgentFiles} stale files)`) : ''}`);
}

function installClaudeCommandRuntime(runtime, isGlobal, log) {
  const commandsDir = isGlobal ? runtime.commands_dir_global : path.resolve(runtime.commands_dir_project);
  const agentsDir = isGlobal ? runtime.agents_dir_global : path.resolve(runtime.agents_dir_project);
  const commandsRoot = path.join(PKG_ROOT, 'commands', 'scr');
  const commandEntries = collectCommandEntries(commandsRoot);
  const fileNames = commandEntries.map((entry) => commandEntryToFlatCommandFileName(entry));

  fs.mkdirSync(commandsDir, { recursive: true });
  const removedCommandFiles = cleanFlatCommandFiles(commandsDir, fileNames, ['scr']);
  const removedAgentFiles = cleanMirroredFiles(path.join(PKG_ROOT, 'agents'), agentsDir);

  for (const entry of commandEntries) {
    const sourcePath = path.join(commandsRoot, entry.relativePath);
    const sourceContent = fs.readFileSync(sourcePath, 'utf8');
    const fileName = commandEntryToFlatCommandFileName(entry);
    const targetPath = path.join(commandsDir, fileName);
    atomicWriteFileSync(targetPath, generateClaudeCommandContent(entry, sourceContent));
  }

  writeInstalledCommandManifest(commandsDir, 'claude-code', fileNames);
  const agentCount = copyDir(path.join(PKG_ROOT, 'agents'), agentsDir);

  log(`  ${c('green', '✓')} ${runtime.label}: ${commandEntries.length} /scr-* command files → ${c('dim', commandsDir)}${removedCommandFiles ? c('dim', ` (cleaned ${removedCommandFiles} stale items)`) : ''}`);
  log(`  ${c('green', '✓')} ${runtime.label}: ${agentCount} agent prompts → ${c('dim', agentsDir)}${removedAgentFiles ? c('dim', ` (cleaned ${removedAgentFiles} stale files)`) : ''}`);
}

function installManifestSkillRuntime(runtime, isGlobal, log) {
  const skillsDir = isGlobal ? runtime.skills_dir_global : path.resolve(runtime.skills_dir_project);
  removePathIfExists(skillsDir);
  const manifest = generateSkillManifest(path.join(PKG_ROOT, 'data', 'CONSTRAINTS.json'));
  fs.mkdirSync(skillsDir, { recursive: true });
  atomicWriteFileSync(path.join(skillsDir, 'SKILL.md'), manifest);
  const commandCount = copyDir(path.join(PKG_ROOT, 'commands', 'scr'), path.join(skillsDir, 'commands', 'scr'));
  const agentCount = copyDir(path.join(PKG_ROOT, 'agents'), path.join(skillsDir, 'agents'));
  log(`  ${c('green', '✓')} ${runtime.label}: SKILL.md manifest → ${c('dim', path.join(skillsDir, 'SKILL.md'))}`);
  log(`  ${c('green', '✓')} ${runtime.label}: ${commandCount} command files → ${c('dim', path.join(skillsDir, 'commands', 'scr'))}`);
  log(`  ${c('green', '✓')} ${runtime.label}: ${agentCount} agent prompts → ${c('dim', path.join(skillsDir, 'agents'))}`);
}

function installCodexRuntime(runtime, isGlobal, log) {
  const skillsDir = isGlobal ? runtime.skills_dir_global : path.resolve(runtime.skills_dir_project);
  const commandsDir = isGlobal ? runtime.commands_dir_global : path.resolve(runtime.commands_dir_project);
  const agentsDir = isGlobal ? runtime.agents_dir_global : path.resolve(runtime.agents_dir_project);
  const commandEntries = collectCommandEntries(path.join(PKG_ROOT, 'commands', 'scr'));
  const skillNames = commandEntries.map((entry) => entry.skillName);

  removePathIfExists(commandsDir);
  fs.mkdirSync(skillsDir, { recursive: true });
  const removedSkillDirs = cleanCodexSkillDirs(skillsDir, skillNames);
  const removedAgentFiles = cleanMirroredFiles(path.join(PKG_ROOT, 'agents'), agentsDir);
  const commandCount = copyDir(path.join(PKG_ROOT, 'commands', 'scr'), commandsDir);
  const agentCount = copyDir(path.join(PKG_ROOT, 'agents'), agentsDir);

  for (const entry of commandEntries) {
    const skillDir = path.join(skillsDir, entry.skillName);
    fs.mkdirSync(skillDir, { recursive: true });
    const commandPath = path.join(commandsDir, entry.relativePath);
    atomicWriteFileSync(path.join(skillDir, 'SKILL.md'), generateCodexSkill(entry, commandPath));
  }
  writeCodexSkillManifest(skillsDir, skillNames);

  log(`  ${c('green', '✓')} ${runtime.label}: ${commandEntries.length} \$scr-* skills → ${c('dim', skillsDir)}${removedSkillDirs ? c('dim', ` (cleaned ${removedSkillDirs} stale dirs)`) : ''}`);
  log(`  ${c('green', '✓')} ${runtime.label}: ${commandCount} command files → ${c('dim', commandsDir)}`);
  log(`  ${c('green', '✓')} ${runtime.label}: ${agentCount} agent prompts → ${c('dim', agentsDir)}${removedAgentFiles ? c('dim', ` (cleaned ${removedAgentFiles} stale files)`) : ''}`);
}

function installGuidedRuntime(runtime, isGlobal, dataDir, log) {
  const guideDir = isGlobal ? runtime.guide_dir_global : path.resolve(runtime.guide_dir_project);
  const currentProjectDir = path.resolve('.');
  const setupGuide = generatePerplexitySetupGuide({
    isGlobal,
    guideDir,
    dataDir,
    currentProjectDir,
  });
  const connectorCommand = isGlobal
    ? buildFilesystemMcpCommand(['/absolute/path/to/project', dataDir])
    : buildFilesystemMcpCommand([currentProjectDir, dataDir]);
  const currentProjectCommand = buildFilesystemMcpCommand([currentProjectDir, dataDir]);

  removePathIfExists(guideDir);
  fs.mkdirSync(guideDir, { recursive: true });
  atomicWriteFileSync(path.join(guideDir, 'SETUP.md'), setupGuide);
  atomicWriteFileSync(path.join(guideDir, 'connector-command.txt'), connectorCommand + '\n');
  atomicWriteFileSync(path.join(guideDir, 'connector-command.current-project.txt'), currentProjectCommand + '\n');

  log(`  ${c('green', '✓')} ${runtime.label}: setup guide → ${c('dim', path.join(guideDir, 'SETUP.md'))}`);
  log(`  ${c('green', '✓')} ${runtime.label}: connector recipe → ${c('dim', path.join(guideDir, 'connector-command.txt'))}`);
}

function writeSharedAssets(dataDir, runtimeKeys, isGlobal, developerMode, installMode, log) {
  removePathIfExists(path.join(dataDir, 'templates'));
  removePathIfExists(path.join(dataDir, 'data'));
  fs.mkdirSync(path.join(dataDir, 'templates'), { recursive: true });
  fs.mkdirSync(path.join(dataDir, 'data'), { recursive: true });
  const templateCount = copyDir(path.join(PKG_ROOT, 'templates'), path.join(dataDir, 'templates'));
  const dataCount = copyDir(path.join(PKG_ROOT, 'data'), path.join(dataDir, 'data'));
  log(`  ${c('green', '✓')} ${templateCount} templates + ${dataCount} data files → ${c('dim', dataDir)}`);

  const settings = {
    version: VERSION,
    runtime: runtimeKeys[0],
    runtimes: runtimeKeys,
    scope: isGlobal ? 'global' : 'project',
    developer_mode: developerMode,
    data_dir: dataDir,
    install_mode: installMode,
    installed_at: new Date().toISOString(),
  };
  atomicWriteFileSync(path.join(dataDir, 'settings.json'), JSON.stringify(settings, null, 2));
  log(`  ${c('green', '✓')} settings.json → ${c('dim', path.join(dataDir, 'settings.json'))}`);
}

function printNextSteps(runtimeKeys) {
  console.log('\n' + c('bold', 'Next steps:'));
  let step = 1;
  if (runtimeKeys.includes('codex')) {
    console.log(`  ${c('cyan', `${step}.`)} In Codex, run ${c('bold', '$scr-help')} to see available commands`);
    step++;
    console.log(`  ${c('cyan', `${step}.`)} Start with ${c('bold', '$scr-new-work')} or ${c('bold', '$scr-demo')}`);
    step++;
  }
  if (runtimeKeys.includes('claude-code')) {
    console.log(`  ${c('cyan', `${step}.`)} In Claude Code, run ${c('bold', '/scr-help')}`);
    step++;
  }
  if (runtimeKeys.some((key) => key !== 'codex' && key !== 'claude-code' && RUNTIMES[key].type !== 'guided-mcp')) {
    console.log(`  ${c('cyan', `${step}.`)} In another command-directory runtime, run ${c('bold', '/scr:help')}`);
    step++;
  }
  if (runtimeKeys.includes('perplexity-desktop')) {
    console.log(`  ${c('cyan', `${step}.`)} Open the generated Perplexity Desktop setup guide and add the connector recipe`);
  }
  console.log('\n' + c('dim', `Docs: ${DOCS_URL}\n`));
}

function collectTargetDirsForSweep(runtimeKeys, isGlobal, dataDir) {
  const dirs = new Set([dataDir]);
  for (const runtimeKey of runtimeKeys) {
    const runtime = RUNTIMES[runtimeKey];
    if (!runtime) continue;
    const resolve = (g, p) => isGlobal ? g : (p ? path.resolve(p) : null);
    if (runtime.commands_dir_global || runtime.commands_dir_project) {
      const d = resolve(runtime.commands_dir_global, runtime.commands_dir_project);
      if (d) dirs.add(d);
    }
    if (runtime.skills_dir_global || runtime.skills_dir_project) {
      const d = resolve(runtime.skills_dir_global, runtime.skills_dir_project);
      if (d) dirs.add(d);
    }
    if (runtime.agents_dir_global || runtime.agents_dir_project) {
      const d = resolve(runtime.agents_dir_global, runtime.agents_dir_project);
      if (d) dirs.add(d);
    }
    if (runtime.guide_dir_global || runtime.guide_dir_project) {
      const d = resolve(runtime.guide_dir_global, runtime.guide_dir_project);
      if (d) dirs.add(d);
    }
  }
  return Array.from(dirs);
}

function runInstall({ runtimeKeys, isGlobal, developerMode, silent, installMode }) {
  const dataDir = isGlobal ? path.join(os.homedir(), '.scriven') : path.resolve('.scriven');
  const log = silent ? () => {} : (message) => console.log(message);

  if (!runtimeKeys.length) {
    throw new Error('No runtimes selected for installation');
  }

  let totalOrphansRemoved = 0;
  for (const dir of collectTargetDirsForSweep(runtimeKeys, isGlobal, dataDir)) {
    totalOrphansRemoved += cleanOrphanedTempFiles(dir);
  }
  if (totalOrphansRemoved > 0) {
    log(c('dim', `  Cleaned ${totalOrphansRemoved} orphaned temp file(s) from prior interrupted install`));
  }

  if (!silent) {
    console.log('\n' + c('bold', 'Installing...'));
  }

  for (const runtimeKey of runtimeKeys) {
    const runtime = RUNTIMES[runtimeKey];
    if (!runtime) {
      throw new Error(`Unknown runtime "${runtimeKey}"`);
    }
    if (runtimeKey === 'codex') {
      installCodexRuntime(runtime, isGlobal, log);
    } else if (runtime.command_layout === 'flat-prefixed') {
      installClaudeCommandRuntime(runtime, isGlobal, log);
    } else if (runtime.type === 'skills') {
      installManifestSkillRuntime(runtime, isGlobal, log);
    } else if (runtime.type === 'guided-mcp') {
      installGuidedRuntime(runtime, isGlobal, dataDir, log);
    } else {
      installCommandRuntime(runtime, isGlobal, log);
    }
  }

  writeSharedAssets(dataDir, runtimeKeys, isGlobal, developerMode, installMode, log);

  if (silent) {
    console.log(`Installed Scriven ${VERSION} to ${runtimeKeys.join(', ')} (${isGlobal ? 'global' : 'project'}, ${developerMode ? 'developer' : 'writer'} mode).`);
    return;
  }

  console.log('\n' + c('bold', c('green', 'Installation complete!')));
  printNextSteps(runtimeKeys);
}

// Only run interactive installer when executed directly
if (require.main === module) {
  requireSupportedNode();
  main().catch((err) => {
    console.error(c('red', '\nInstallation failed:'), err.message);
    process.exit(1);
  });
}

module.exports = {
  copyDir,
  RUNTIMES,
  parseArgs,
  resolveInstallRequest,
  collectCommandEntries,
  cleanCodexSkillDirs,
  commandRefToCodexSkillName,
  commandRefToClaudeInvocation,
  commandRefToCodexInvocation,
  commandEntryToFlatCommandFileName,
  generateClaudeCommandContent,
  cleanFlatCommandFiles,
  generateCodexSkill,
  generateSkillManifest,
  buildFilesystemMcpCommand,
  generatePerplexitySetupGuide,
  atomicWriteFileSync,
  cleanOrphanedTempFiles,
  collectTargetDirsForSweep,
  readFrontmatterValue,
  readFrontmatterValues,
};
