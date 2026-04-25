#!/usr/bin/env bun
/**
 * skills-patch — Create and apply patches for skills managed by skills-lock.json.
 *
 * Commands:
 *   create <skill>    Capture uncommitted edits to a skill as a patch file
 *   apply  [skill]    Apply all patches (or one) after a skills update
 *   list              List available patches
 *   status            Show which patches apply cleanly vs have conflicts
 *
 * Patches live in patches/<skill-name>.patch, resolved relative to the repo root,
 * so they survive upstream skill updates and re-installs.
 */

import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, unlinkSync } from 'node:fs';
import { basename, join } from 'node:path';

// ── repo root ────────────────────────────────────────────────────────────────

function findRepoRoot(): string {
  const result = spawnSync('git', ['rev-parse', '--show-toplevel'], {
    encoding: 'utf8',
    cwd: import.meta.dir,
  });
  if (result.status !== 0) die('Not inside a git repository.');
  return result.stdout.trim();
}

const REPO_ROOT = findRepoRoot();
const PATCHES_DIR = join(REPO_ROOT, 'patches');
const SKILLS_DIR = join(REPO_ROOT, '.agents', 'skills');

// ── helpers ──────────────────────────────────────────────────────────────────

function die(msg: string): never {
  console.error(`error: ${msg}`);
  process.exit(1);
  throw new Error(msg); // unreachable, satisfies TypeScript's never return
}

function patchFileFor(skill: string): string {
  return join(PATCHES_DIR, `${skill}.patch`);
}

function requireSkill(skill: string): void {
  if (!existsSync(join(SKILLS_DIR, skill))) {
    die(`skill '${skill}' not found in ${SKILLS_DIR}`);
  }
}

function listPatches(): string[] {
  if (!existsSync(PATCHES_DIR)) return [];
  return readdirSync(PATCHES_DIR)
    .filter((f) => f.endsWith('.patch'))
    .sort()
    .map((f) => join(PATCHES_DIR, f));
}

function changedLines(patchPath: string): number {
  const content = readFileSync(patchPath, 'utf8');
  return content.split('\n').filter((l) => l.startsWith('+') || l.startsWith('-')).length;
}

function runPatch(args: string[], stdin: string): { success: boolean; output: string } {
  const result = spawnSync('patch', args, {
    input: stdin,
    encoding: 'utf8',
    cwd: REPO_ROOT,
  });
  const output = (result.stdout ?? '') + (result.stderr ?? '');
  return { success: result.status === 0, output };
}

// ── commands ─────────────────────────────────────────────────────────────────

function cmdCreate(skill: string | undefined): void {
  if (!skill) die('Usage: skills-patch create <skill-name>');
  requireSkill(skill);

  const skillPath = `.agents/skills/${skill}`; // repo-root-relative, for git diff

  const result = spawnSync('git', ['diff', 'HEAD', '--', skillPath], {
    encoding: 'utf8',
    cwd: REPO_ROOT,
  });

  const diff = result.stdout.trim();
  if (!diff) {
    console.log(`No uncommitted changes found for '${skill}'.`);
    console.log(`Modify files in ${join(SKILLS_DIR, skill)}, then run this command again.`);
    process.exit(1);
  }

  mkdirSync(PATCHES_DIR, { recursive: true });
  const patchFile = patchFileFor(skill);
  Bun.write(patchFile, diff + '\n');

  const lines = diff.split('\n').filter((l) => l.startsWith('+') || l.startsWith('-')).length;
  console.log(`Created: ${patchFile}`);
  console.log(`  ${lines} changed lines`);
  console.log();
  console.log(
    "Next: commit the patch file, then run 'skills-patch apply' after any skills update.",
  );
}

function cmdApply(targetSkill: string | undefined): void {
  const patches: string[] = targetSkill
    ? (() => {
        const pf = patchFileFor(targetSkill);
        if (!existsSync(pf)) die(`no patch found for '${targetSkill}' (expected: ${pf})`);
        return [pf];
      })()
    : listPatches();

  if (patches.length === 0) {
    console.log(`No patches found in ${PATCHES_DIR}`);
    return;
  }

  let ok = 0;
  let failed = 0;

  for (const pf of patches) {
    const skillName = basename(pf, '.patch');
    const rejFile = join(PATCHES_DIR, `${skillName}.rej`);
    const patchContent = readFileSync(pf, 'utf8');

    console.log(`Applying: ${skillName}`);

    // --forward: idempotent — skip already-applied patches
    // --fuzz=3:  tolerate minor context drift from upstream updates
    const { success, output } = runPatch(
      [
        '--forward',
        '--strip=1',
        `--fuzz=3`,
        `--reject-file=${rejFile}`,
        `--directory=${REPO_ROOT}`,
      ],
      patchContent,
    );
    const alreadyApplied = output.includes('Reversed (or previously applied) patch detected!');

    const indented = output
      .trimEnd()
      .split('\n')
      .map((l) => `  ${l}`)
      .join('\n');
    if (indented) console.log(indented);

    if (success || alreadyApplied) {
      if (alreadyApplied && !success) {
        console.log(`  ~ ${skillName} (already applied)`);
      } else {
        console.log(`  ✓ ${skillName}`);
      }

      // `patch --forward` may still leave a reject file behind when it skips
      // hunks because the patch is already present.
      if (existsSync(rejFile)) unlinkSync(rejFile);

      ok++;
    } else {
      console.error(`  ✗ ${skillName} — check ${rejFile} for failed hunks`);
      failed++;
    }
    console.log();
  }

  console.log(`Done: ${ok} applied, ${failed} failed.`);
  if (failed > 0) process.exit(1);
}

function cmdList(): void {
  const patches = listPatches();
  if (patches.length === 0) {
    console.log("No patches found. Run 'skills-patch create <skill-name>' to create one.");
    return;
  }
  for (const pf of patches) {
    const skillName = basename(pf, '.patch');
    const lines = changedLines(pf);
    console.log(`  ${skillName.padEnd(30)} ${lines} lines changed`);
  }
}

function cmdStatus(): void {
  const patches = listPatches();
  if (patches.length === 0) {
    console.log('No patches found.');
    return;
  }

  for (const pf of patches) {
    const skillName = basename(pf, '.patch');
    const patchContent = readFileSync(pf, 'utf8');

    const dryRun = runPatch(
      ['--dry-run', '--forward', '--strip=1', '--fuzz=3', `--directory=${REPO_ROOT}`],
      patchContent,
    );

    if (dryRun.success) {
      console.log(`  ✓ ${skillName} (applies cleanly)`);
      continue;
    }

    const reverse = runPatch(
      ['--dry-run', '--reverse', '--strip=1', '--fuzz=3', `--directory=${REPO_ROOT}`],
      patchContent,
    );

    if (reverse.success) {
      console.log(`  ~ ${skillName} (already applied)`);
    } else {
      console.error(`  ✗ ${skillName} (conflicts — may need manual merge after upstream update)`);
    }
  }
}

function printHelp(): void {
  console.log(`Usage: skills-patch <command> [skill-name]

Commands:
  create <skill>   Capture your edits to a skill as a .patch file
  apply  [skill]   Apply all patches (or one) — run after 'bun x skills update'
  list             List patches and how many lines they change
  status           Dry-run all patches and report which apply cleanly

Workflow:
  1. Edit files in .agents/skills/<name>/
  2. bun run skills-patch create <name>    # saves patches/<name>.patch
  3. git add patches/<name>.patch && git commit
  4. bun x skills update                   # upstream updates overwrite files
  5. bun run skills-patch apply            # re-apply your customisations

If a patch has conflicts after an upstream bump, check patches/<name>.rej
and adjust patches/<name>.patch manually, then re-run 'skills-patch apply'.`);
}

// ── dispatch ─────────────────────────────────────────────────────────────────

const [cmd, arg] = process.argv.slice(2);

switch (cmd) {
  case 'create':
    cmdCreate(arg);
    break;
  case 'apply':
    cmdApply(arg);
    break;
  case 'list':
    cmdList();
    break;
  case 'status':
    cmdStatus();
    break;
  default:
    printHelp();
    process.exit(cmd ? 1 : 0);
}
