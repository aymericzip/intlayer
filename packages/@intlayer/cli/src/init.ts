import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import * as p from '@clack/prompts';
import {
  initIntlayer,
  installSkills,
  type Platform,
  SKILLS,
  SKILLS_METADATA,
} from '@intlayer/chokidar';
// @ts-ignore
import { AutoComplete } from 'enquirer';

const findProjectRoot = (startDir: string) => {
  let currentDir = startDir;

  while (currentDir !== resolve(currentDir, '..')) {
    if (existsSync(join(currentDir, 'package.json'))) {
      return currentDir;
    }
    currentDir = resolve(currentDir, '..');
  }

  // If no package.json is found, return the start directory.
  // The initIntlayer function will handle the missing package.json error.
  return startDir;
};

export const init = async (projectRoot?: string) => {
  const root = projectRoot
    ? findProjectRoot(resolve(projectRoot))
    : findProjectRoot(process.cwd());

  await initIntlayer(root);
};

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

export const getDetectedPlatform = (): Platform | undefined =>
  PLATFORM_CHECKS.find(({ check }) => check())?.platform;

export const initSkills = async (projectRoot?: string) => {
  const root = projectRoot
    ? findProjectRoot(resolve(projectRoot))
    : findProjectRoot(process.cwd());

  p.intro('Initializing Intlayer skills');

  // Detect if running in a specific platform
  const detectedPlatform = getDetectedPlatform();

  const PLATFORM_OPTIONS = [
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
  ] as { value: Platform; label: string; hint: string }[];

  // Confirm or choose platforms
  const prompt = new AutoComplete({
    name: 'platforms',
    message: 'Which platforms are you using?',
    limit: 10,
    initial: detectedPlatform
      ? PLATFORM_OPTIONS.findIndex((p) => p.value === detectedPlatform)
      : undefined,
    multiple: true,
    choices: PLATFORM_OPTIONS.map((p) => ({
      name: p.value,
      message: p.label,
      hint: p.hint,
    })),
  });

  let platforms: Platform[];
  try {
    platforms = (await prompt.run()) as Platform[];
  } catch (error) {
    p.cancel('Operation cancelled');
    return;
  }

  if (platforms.length === 0) {
    p.log.warn('No platform selected. Nothing to install.');
    return;
  }

  // Detect framework skills
  let dependencies: Record<string, string> = {};
  try {
    const packageJsonPath = join(root, 'package.json');
    if (existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
      dependencies = {
        ...packageJson.dependencies,
        ...packageJson.devDependencies,
      };
    }
  } catch {
    // Ignore errors reading package.json
  }

  const initialValues: (keyof typeof SKILLS_METADATA)[] = [
    'Usage',
    'Config',
    'Content',
    'RemoteContent',
  ];

  if (dependencies.react || dependencies.next) {
    initialValues.push('React');
  }
  if (dependencies.next) {
    initialValues.push('NextJS');
  }
  if (dependencies.preact) {
    initialValues.push('Preact');
  }
  if (dependencies['solid-js']) {
    initialValues.push('Solid');
  }
  if (dependencies.vue || dependencies.nuxt) {
    initialValues.push('Vue');
  }
  if (dependencies.svelte || dependencies['@sveltejs/kit']) {
    initialValues.push('Svelte');
  }
  if (dependencies.astro) {
    initialValues.push('Astro');
  }

  // Show list of available skills and allow selecting multiple
  const selectedSkills = (await p.multiselect({
    message: 'Select the documentation skills to provide to your AI:',
    initialValues,
    options: SKILLS.map((skill) => ({
      value: skill,
      label: skill,
      hint: SKILLS_METADATA[skill],
    })),
  })) as (keyof typeof SKILLS_METADATA)[];

  if (p.isCancel(selectedSkills)) {
    p.cancel('Operation cancelled');
    return;
  }

  if (selectedSkills.length === 0) {
    p.log.warn('No skills selected. Nothing to install.');
    return;
  }

  // Call installSkills for each platform
  const s = p.spinner();
  s.start('Installing skills...');
  try {
    const results: string[] = [];
    for (const platform of platforms) {
      const result = await installSkills(root, platform, selectedSkills);
      results.push(result);
    }
    s.stop('Skills installed successfully');

    // Show success messages
    for (const result of results) {
      p.note(result, 'Success');
    }
  } catch (error) {
    s.stop('Failed to install skills');
    p.log.error(String(error));
  }

  p.outro('Intlayer skills initialization complete');
};
