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

export const initSkills = async (projectRoot?: string) => {
  const root = projectRoot
    ? findProjectRoot(resolve(projectRoot))
    : findProjectRoot(process.cwd());

  p.intro('Initializing Intlayer skills');

  // Detect platform
  let detectedPlatform: Platform = 'Other';

  if (process.env.OPENCODE) {
    detectedPlatform = 'OpenCode';
  } else if (process.env.CLAUDE_CODE) {
    detectedPlatform = 'Claude';
  } else if (existsSync(join(root, 'claude', 'skills'))) {
    detectedPlatform = 'Claude';
  } else if (existsSync(join(root, '.windsurf'))) {
    detectedPlatform = 'Windsurf';
  } else if (existsSync(join(root, '.trae'))) {
    detectedPlatform = 'Trae';
  } else if (existsSync(join(root, '.cursorrules'))) {
    detectedPlatform = 'Cursor';
  } else if (process.env.TERM_PROGRAM === 'vscode') {
    detectedPlatform = 'VSCode';
  }

  // Confirm or choose platform
  const platform = (await p.select({
    message: 'Which platform are you using?',
    initialValue: detectedPlatform,
    options: [
      { value: 'Cursor', label: 'Cursor' },
      { value: 'Windsurf', label: 'Windsurf' },
      { value: 'Trae', label: 'Trae' },
      { value: 'VSCode', label: 'VS Code' },
      { value: 'OpenCode', label: 'OpenCode' },
      { value: 'GitHub', label: 'GitHub Copilot Workspace' },
      { value: 'Claude', label: 'Claude Code' },
      { value: 'Other', label: 'Other' },
    ],
  })) as Platform;

  if (p.isCancel(platform)) {
    p.cancel('Operation cancelled');
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

  // Call installSkills
  const s = p.spinner();
  s.start('Installing skills...');
  try {
    const result = await installSkills(root, platform, selectedSkills);
    s.stop('Skills installed successfully');

    // 6. Show success message
    p.note(result, 'Success');
  } catch (error) {
    s.stop('Failed to install skills');
    p.log.error(String(error));
  }

  p.outro('Intlayer skills initialization complete');
};
