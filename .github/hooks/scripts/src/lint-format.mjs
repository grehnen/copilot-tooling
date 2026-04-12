// PostToolUse hook: auto-format and lint files edited by the agent.

import { existsSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

const ANSI_RE = /\u001b\[[0-9;]*[a-zA-Z]/g;

function sh(args) {
  const result = spawnSync(args[0], args.slice(1), { encoding: 'utf8' });
  return {
    success: result.status === 0,
    output: (result.stdout ?? '') + (result.stderr ?? ''),
  };
}

function parseFilePaths(input) {
  const toolName = String(input.tool_name ?? input.toolName ?? input.name ?? '');

  switch (toolName) {
    case 'replace_string_in_file':
    case 'create_file':
    case 'edit_notebook_file': {
      const fp = String(
        input.tool_input?.filePath ?? input.tool_input?.file_path ?? input.input?.filePath ?? '',
      );
      return fp ? [fp] : [];
    }
    case 'multi_replace_string_in_file': {
      const replacements = input.tool_input?.replacements ?? input.input?.replacements ?? [];
      return [...new Set(replacements.map((r) => r.filePath ?? r.file_path ?? '').filter(Boolean))];
    }
    default:
      return [];
  }
}

const input = JSON.parse(readFileSync(0, 'utf8'));
const filePaths = parseFilePaths(input)
  .filter((f) => /\.(ts|tsx|js|jsx)$/.test(f))
  .filter(existsSync);

if (filePaths.length === 0) process.exit(0);

for (const fp of filePaths) {
  sh(['bun', 'fmt', fp]); // TODO: INSERT YOUR FORMATTING COMMAND HERE
}

const issues = [];
for (const fp of filePaths) {
  const { success, output } = sh(['bun', 'lint:fix', fp]); // TODO: INSERT YOUR LINTING COMMAND HERE
  if (!success) {
    issues.push(`### ${fp}\n\`\`\`\n${output.replace(ANSI_RE, '').trim()}\n\`\`\``);
  }
}

if (issues.length > 0) {
  console.log(
    JSON.stringify({
      systemMessage: `Lint issues found in edited files — fix before continuing:\n\n${issues.join('\n\n')}`,
    }),
  );
}
