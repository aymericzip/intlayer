import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import * as p from '@clack/prompts';
import {
  installSkills,
  type Platform,
  SKILLS,
  SKILLS_METADATA,
} from '@intlayer/chokidar/cli';
import enquirer from 'enquirer';
import { findProjectRoot } from './init';

// --- Constants ---

const PLATFORM_CHECKS: Array<{ check: () => boolean; platform: Platform }> = [
  {
    check: () =>
      process.env.CURSOR === 'true' || process.env.TERM_PROGRAM === 'cursor',
    platform: 'Cursor',
  },
  {
    check: () =>
      process.env.WINDSURF === 'true' ||
      process.env.TERM_PROGRAM === 'windsurf',
    platform: 'Windsurf',
  },
  {
    check: () =>
      process.env.TRAE === 'true' || process.env.TERM_PROGRAM === 'trae',
    platform: 'Trae',
  },
  { check: () => process.env.TRAE_CN === 'true', platform: 'TraeCN' },
  {
    check: () =>
      process.env.VSCODE === 'true' || process.env.TERM_PROGRAM === 'vscode',
    platform: 'VSCode',
  },
  { check: () => process.env.OPENCODE === 'true', platform: 'OpenCode' },
  { check: () => process.env.CLAUDE === 'true', platform: 'Claude' },
  {
    check: () =>
      process.env.GITHUB_ACTIONS === 'true' || !!process.env.GITHUB_WORKSPACE,
    platform: 'GitHub',
  },
];

const PLATFORM_OPTIONS: Array<{
  value: Platform;
  label: string;
  hint: string;
}> = [
  { value: 'Cursor', label: 'Cursor', hint: '(.cursor/skills)' },
  { value: 'Windsurf', label: 'Windsurf', hint: '(.windsurf/skills)' },
  { value: 'Trae', label: 'Trae', hint: '(.trae/skills)' },
  { value: 'TraeCN', label: 'Trae CN', hint: '(.trae/skills)' },
  { value: 'VSCode', label: 'VS Code', hint: '(.github/skills)' },
  { value: 'OpenCode', label: 'OpenCode', hint: '(.opencode/skills)' },
  { value: 'Claude', label: 'Claude Code', hint: '(.claude/skills)' },
  {
    value: 'GitHub',
    label: 'GitHub Copilot Workspace',
    hint: '(.github/skills)',
  },
  { value: 'Antigravity', label: 'Antigravity', hint: '(.agent/skills)' },
  { value: 'Augment', label: 'Augment', hint: '(.augment/skills)' },
  { value: 'OpenClaw', label: 'OpenClaw', hint: '(skills)' },
  { value: 'Cline', label: 'Cline', hint: '(.cline/skills)' },
  { value: 'CodeBuddy', label: 'CodeBuddy', hint: '(.codebuddy/skills)' },
  {
    value: 'CommandCode',
    label: 'Command Code',
    hint: '(.commandcode/skills)',
  },
  { value: 'Continue', label: 'Continue', hint: '(.continue/skills)' },
  { value: 'Crush', label: 'Crush', hint: '(.crush/skills)' },
  { value: 'Droid', label: 'Droid', hint: '(.factory/skills)' },
  { value: 'Goose', label: 'Goose', hint: '(.goose/skills)' },
  { value: 'IFlow', label: 'iFlow CLI', hint: '(.iflow/skills)' },
  { value: 'Junie', label: 'Junie', hint: '(.junie/skills)' },
  { value: 'KiloCode', label: 'Kilo Code', hint: '(.kilocode/skills)' },
  { value: 'Kiro', label: 'Kiro CLI', hint: '(.kiro/skills)' },
  { value: 'Kode', label: 'Kode', hint: '(.kode/skills)' },
  { value: 'MCPJam', label: 'MCPJam', hint: '(.mcpjam/skills)' },
  { value: 'MistralVibe', label: 'Mistral Vibe', hint: '(.vibe/skills)' },
  { value: 'Mux', label: 'Mux', hint: '(.mux/skills)' },
  { value: 'OpenHands', label: 'OpenHands', hint: '(.openhands/skills)' },
  { value: 'Pi', label: 'Pi', hint: '(.pi/skills)' },
  { value: 'Qoder', label: 'Qoder', hint: '(.qoder/skills)' },
  { value: 'Qwen', label: 'Qwen Code', hint: '(.qwen/skills)' },
  { value: 'RooCode', label: 'Roo Code', hint: '(.roo/skills)' },
  { value: 'Zencoder', label: 'Zencoder', hint: '(.zencoder/skills)' },
  { value: 'Neovate', label: 'Neovate', hint: '(.neovate/skills)' },
  { value: 'Pochi', label: 'Pochi', hint: '(.pochi/skills)' },
  { value: 'Other', label: 'Other', hint: '(skills)' },
];

// --- Utilities ---

export const getDetectedPlatform = (): Platform | undefined =>
  PLATFORM_CHECKS.find(({ check }) => check())?.platform;

function getDependencies(root: string): Record<string, string> {
  try {
    const packageJsonPath = join(root, 'package.json');
    if (!existsSync(packageJsonPath)) return {};

    const { dependencies = {}, devDependencies = {} } = JSON.parse(
      readFileSync(packageJsonPath, 'utf-8')
    );
    return { ...dependencies, ...devDependencies };
  } catch {
    return {};
  }
}

function getInitialSkills(
  deps: Record<string, string>
): (keyof typeof SKILLS_METADATA)[] {
  const skills: (keyof typeof SKILLS_METADATA)[] = [
    'Usage',
    'Config',
    'Content',
    'RemoteContent',
    'Compiler',
  ];

  if (deps.react || deps.next) skills.push('React');
  if (deps.next) skills.push('NextJS');
  if (deps.preact) skills.push('Preact');
  if (deps['solid-js']) skills.push('Solid');
  if (deps.vue || deps.nuxt) skills.push('Vue');
  if (deps.svelte || deps['@sveltejs/kit']) skills.push('Svelte');
  if (deps.astro) skills.push('Astro');

  return skills;
}

// --- Main CLI Action ---

export const initSkills = async (projectRoot?: string) => {
  const root = findProjectRoot(
    projectRoot ? resolve(projectRoot) : process.cwd()
  );

  p.intro('Initializing Intlayer skills');

  const detectedPlatform = getDetectedPlatform();

  let platforms: Platform[];
  try {
    const response = await enquirer.prompt<{ platforms: Platform[] }>({
      type: 'autocomplete',
      name: 'platforms',
      message: 'Which platforms are you using? (Type to search)',
      multiple: true,
      initial: detectedPlatform
        ? PLATFORM_OPTIONS.findIndex((p) => p.value === detectedPlatform)
        : undefined,
      choices: PLATFORM_OPTIONS.map((p) => ({
        name: p.value,
        message: p.label,
        hint: p.hint,
      })),
    });
    platforms = response.platforms;
  } catch {
    p.cancel('Operation cancelled.');
    return;
  }

  if (!platforms || platforms.length === 0) {
    p.log.warn('No platform selected. Nothing to install.');
    return;
  }

  const dependencies = getDependencies(root);
  const initialValues = getInitialSkills(dependencies);

  const selectedSkills = await p.multiselect({
    message: 'Select the documentation skills to provide to your AI:',
    initialValues,
    options: SKILLS.map((skill) => ({
      value: skill,
      label: skill,
      hint: SKILLS_METADATA[skill],
    })),
    required: false,
  });

  if (
    p.isCancel(selectedSkills) ||
    !selectedSkills ||
    (selectedSkills as string[]).length === 0
  ) {
    p.cancel('Operation cancelled. No skills selected.');
    return;
  }

  const s = p.spinner();
  s.start('Installing skills...');

  try {
    const installPromises = platforms.map((platform) =>
      installSkills(
        root,
        platform,
        selectedSkills as (keyof typeof SKILLS_METADATA)[]
      )
    );

    const results = await Promise.all(installPromises);
    s.stop('Skills installed successfully');

    for (const result of results) {
      p.note(result, 'Success');
    }
  } catch (error) {
    s.stop('Failed to install skills');
    p.log.error(error instanceof Error ? error.message : String(error));
  }

  p.outro('Intlayer skills initialization complete');
};
