import {
  getInitialSkills,
  installSkills,
  PLATFORMS,
  PLATFORMS_METADATA,
  type Platform,
  SKILLS,
  SKILLS_METADATA,
  type Skill,
} from '@intlayer/engine/cli';
import enquirer from 'enquirer';
import { getProjectDependencies, resolveProjectRoot } from './init';
import { loadPrompts } from './loadPrompts';
import { isInteractiveTerminal } from './utils/isInteractiveTerminal';
import { parseChoice } from './utils/parseChoice';

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

/** Options of {@link initSkills}; anything omitted is prompted for. */
export type InitSkillsOptions = {
  /** AI platform to install the skills for. */
  platform?: Platform;
  /** Skills to install. Defaults to the ones matching the project stack. */
  skills?: Skill[];
};

/** Validates a `--platform` value, ignoring case. */
export const parsePlatform = (value: string): Platform =>
  parseChoice(value, PLATFORMS, '--platform');

/** Validates the `--skills` values, ignoring case. */
export const parseSkills = (values: string[]): Skill[] =>
  values
    .flatMap((value) => value.split(','))
    .filter((value) => value.trim() !== '')
    .map((value) => parseChoice(value, SKILLS, '--skills'));

/**
 * Resolves the platform without prompting: the given one, else the detected
 * one. Logs how to pass it and sets a failing exit code when neither exists.
 */
export const resolvePlatformWithoutPrompt = async (
  platform: Platform | undefined,
  command: string
): Promise<Platform | undefined> => {
  const resolvedPlatform = platform ?? getDetectedPlatform();

  if (!resolvedPlatform) {
    const p = await loadPrompts();

    p.log.error(
      `No AI platform detected. Pass it explicitly: ${command} --platform <platform>\nPlatforms: ${PLATFORMS.join(', ')}`
    );
    process.exitCode = 1;
  }

  return resolvedPlatform;
};

/**
 * Installs the Intlayer documentation skills. The skills are picked first, then
 * the platform. Without a terminal (AI agents, CI), nothing is prompted: the
 * skills default to the project stack and the platform to the detected one.
 * Resolves to the platform used, so a following step (e.g. MCP) can reuse it
 * without asking again.
 */
export const initSkills = async (
  projectRoot?: string,
  options: InitSkillsOptions = {}
): Promise<Platform | undefined> => {
  const p = await loadPrompts();

  const root = resolveProjectRoot(projectRoot);
  const isInteractive = isInteractiveTerminal();

  p.intro('Initializing Intlayer skills');

  const initialSkills = getInitialSkills(getProjectDependencies(root));

  const selectedSkills =
    options.skills ??
    (isInteractive
      ? await p.multiselect({
          message: 'Select the documentation skills to provide to your AI:',
          initialValues: initialSkills,
          options: SKILLS.map((skill) => ({
            value: skill,
            label: skill,
            hint: SKILLS_METADATA[skill],
          })),
          required: false,
        })
      : initialSkills);

  if (p.isCancel(selectedSkills) || selectedSkills.length === 0) {
    p.cancel('Operation cancelled. No skills selected.');
    return;
  }

  const platform = isInteractive
    ? (options.platform ?? (await promptPlatform()))
    : await resolvePlatformWithoutPrompt(
        options.platform,
        'intlayer init skills'
      );

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
    process.exitCode = 1;
  }

  p.outro('Intlayer skills initialization complete');

  return platform;
};
