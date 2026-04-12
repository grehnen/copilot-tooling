#!/usr/bin/env bun
// update-gitmojis.ts
// Fetches the latest gitmoji definitions and regenerates references/gitmojis.md
// Usage: bun run update-gitmojis

import { writeFile } from 'node:fs/promises';
import { relative } from 'node:path';

const SOURCE_URL =
  'https://raw.githubusercontent.com/carloscuesta/gitmoji/master/packages/gitmojis/src/gitmojis.json';

const OUTPUT = new URL('../.agents/skills/gitmoji/references/gitmojis.md', import.meta.url)
  .pathname;
const OUTPUT_REL = relative(process.cwd(), OUTPUT);

console.log(`Fetching gitmojis from ${SOURCE_URL}`);
const response = await fetch(SOURCE_URL);
const json = (await response.json()) as { gitmojis: { emoji: string; description: string }[] };

const header = `# Gitmoji Reference

Full list of all gitmoji with emoji character and description.

| Emoji | Description |
|-------|-------------|
`;

const rows = json.gitmojis.map((g) => `| ${g.emoji} | ${g.description} |`).join('\n');

console.log(`Generating ${OUTPUT_REL}...`);
await writeFile(OUTPUT, header + rows + '\n', 'utf8');
console.log(`Done. ${OUTPUT_REL} updated with ${json.gitmojis.length} gitmojis.`);
