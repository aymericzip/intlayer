import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import {
  getInitialSkills,
  installSkills,
  PLATFORMS,
  PLATFORMS_METADATA,
  type Platform,
  SKILLS,
  SKILLS_METADATA,
} from '@intlayer/engine/cli';
import enquirer from 'enquirer';
import { findProjectRoot } from './init';
import { loadPrompts } from './loadPrompts';

const PLATFORM_CHECKS: Array<{ check: () => boolean; platform: Platform }> =
  PLATFORMS.filter((platform) => PLATFORMS_METADATA[platform]?.check).map(
    (platform) => ({
      check: PLATFORMS_METADATA[platform]?.check ?? (() => false),
      platform,
    })
  );

export const PLATFORM_OPTIONS: Array<{
  value: Platform;
  label: string;
  hint: string;
}> = PLATFORMS.map((platform) => ({
  value: platform,
  label: PLATFORMS_METADATA[platform]?.label ?? '',
  hint: `(${PLATFORMS_METADATA[platform]?.dir})`,
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

/**
 * Asks which AI platform the user is using, preselecting the detected one.
 * Resolves to `undefined` when the prompt is cancelled.
 */
export const promptPlatform = async (): Promise<Platform | undefined> => {
  const detectedPlatform = getDetectedPlatform();

  try {
    const response = await enquirer.prompt<{ platform: Platform }>({
      type: 'autocomplete',
      name: 'platform',
      message: 'Which platform are you using? (Type to search)',
      multiple: false,
      initial: detectedPlatform
        ? PLATFORMS.indexOf(detectedPlatform)
        : undefined,
      choices: PLATFORM_OPTIONS.map((option) => ({
        name: option.value,
        message: option.label,
        hint: option.hint,
      })),
    });

    return response.platform;
  } catch {
    return undefined;
  }
};

/**
 * Installs the Intlayer documentation skills. The skills are picked first, then
 * the platform (unless preselected). Resolves to the platform used, so a
 * following step (e.g. MCP) can reuse it without asking again.
 */
export const initSkills = async (
  projectRoot?: string,
  preselectedPlatform?: Platform
): Promise<Platform | undefined> => {
  const p = await loadPrompts();

  const root = findProjectRoot(
    projectRoot ? resolve(projectRoot) : process.cwd()
  );

  p.intro('Initializing Intlayer skills');

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

  const platform = preselectedPlatform ?? (await promptPlatform());

  if (!platform) {
    p.cancel('Operation cancelled. No platform selected.');
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

  return platform;
};
