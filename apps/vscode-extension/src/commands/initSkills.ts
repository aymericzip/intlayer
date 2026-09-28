import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
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
import { type QuickPickItem, window } from 'vscode';
import { findProjectRoot } from '../utils/findProjectRoot';
import { formatResult } from '../utils/formatResult';

interface QuickPickItemWithValue<T> extends QuickPickItem {
  value: T;
}

export const PLATFORM_OPTIONS: Array<{
  value: Platform;
  label: string;
  hint: string;
}> = PLATFORMS.map((platform) => ({
  value: platform,
  label: PLATFORMS_METADATA[platform].label,
  hint: `(${PLATFORMS_METADATA[platform].dir})`,
}));

export const initSkills = async () => {
  const root = findProjectRoot();

  if (!root) {
    await window.showErrorMessage('Could not find project root.');
    return;
  }

  const selectedPlatforms = await window.showQuickPick<
    QuickPickItemWithValue<Platform>
  >(
    PLATFORM_OPTIONS.map((platform) => ({
      label: platform.label,
      detail: platform.hint,
      value: platform.value,
      picked: platform.value === 'VSCode',
    })),
    {
      placeHolder: 'Which platforms are you using?',
      canPickMany: false,
    }
  );

  if (!selectedPlatforms) {
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

  const initialValues: Skill[] = getInitialSkills(dependencies);

  const selectedSkills = await window.showQuickPick<
    QuickPickItemWithValue<Skill>
  >(
    SKILLS.map((skill: Skill) => ({
      label: skill,
      detail: SKILLS_METADATA[skill],
      value: skill,
      picked: initialValues.includes(skill),
    })),
    {
      placeHolder: 'Select the documentation skills to provide to your AI',
      canPickMany: true,
    }
  );

  if (!selectedSkills || selectedSkills.length === 0) {
    return;
  }

  // Call installSkills for each platform
  await window.withProgress(
    {
      location: 15, // Notification
      title: 'Installing Intlayer skills...',
      cancellable: false,
    },
    async () => {
      const originalCwd = process.cwd();

      try {
        process.chdir(root);

        const result = await installSkills(
          root,
          selectedPlatforms.value,
          selectedSkills.map((skill) => skill.value)
        );

        await window.showInformationMessage(
          `Skills installed successfully: ${formatResult(result)}`
        );
      } catch (error) {
        await window.showErrorMessage(
          `Failed to install skills: ${String(error)}`
        );

        process.chdir(originalCwd);
      }
    }
  );
};
