import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import * as p from '@clack/prompts';
import {
  getInitialSkills,
  installSkills,
  PLATFORMS,
  PLATFORMS_METADATA,
  type Platform,
  SKILLS,
  SKILLS_METADATA,
} from '@intlayer/chokidar/cli';
import enquirer from 'enquirer';
import { findProjectRoot } from './init';

const PLATFORM_CHECKS: Array<{ check: () => boolean; platform: Platform }> =
  PLATFORMS.filter((platform) => PLATFORMS_METADATA[platform].check).map(
    (platform) => ({
      check: PLATFORMS_METADATA[platform].check ?? (() => false),
      platform,
    })
  );

export const PLATFORM_OPTIONS: Array<{
  value: Platform;
  label: string;
  hint: string;
}> = PLATFORMS.map((platform) => ({
  value: platform,
  label: PLATFORMS_METADATA[platform].label,
  hint: `(${PLATFORMS_METADATA[platform].dir})`,
}));

export const getDetectedPlatform = (): Platform | undefined =>
  PLATFORM_CHECKS.find(({ check }) => check())?.platform;

const getDependencies = (root: string): Record<string, string> => {
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
};

export const initSkills = async (projectRoot?: string) => {
  const root = findProjectRoot(
    projectRoot ? resolve(projectRoot) : process.cwd()
  );

  p.intro('Initializing Intlayer skills');

  const detectedPlatform = getDetectedPlatform();

  let platform: Platform;
  try {
    const response = await enquirer.prompt<{ platforms: Platform }>({
      type: 'autocomplete',
      name: 'platforms',
      message: 'Which platforms are you using? (Type to search)',
      multiple: false,
      initial: detectedPlatform
        ? PLATFORMS.indexOf(detectedPlatform)
        : undefined,
      choices: PLATFORM_OPTIONS.map((opt) => ({
        name: opt.value,
        message: opt.label,
        hint: opt.hint,
      })),
    });
    platform = response.platforms;
  } catch {
    p.cancel('Operation cancelled.');
    return;
  }

  if (!platform) {
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
    const result = await installSkills(root, platform, selectedSkills);

    s.stop('Skills installed successfully');

    p.note(result, 'Success');
  } catch (error) {
    s.stop('Failed to install skills');
    p.log.error(error instanceof Error ? error.message : String(error));
  }

  p.outro('Intlayer skills initialization complete');
};
