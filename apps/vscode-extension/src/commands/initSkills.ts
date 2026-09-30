import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import {
  getInitialSkills,
  installSkills,
  SKILLS,
  SKILLS_METADATA,
  type Skill,
} from '@intlayer/engine/cli';
import { ProgressLocation, window } from 'vscode';
import { findProjectRoot } from '../utils/findProjectRoot';
import { formatResult } from '../utils/formatResult';
import { getPlatformQuickPickItems } from '../utils/platformQuickPick';

/** Dependencies and dev dependencies of the project, `{}` when unreadable. */
const readProjectDependencies = async (
  projectDir: string
): Promise<Record<string, string>> => {
  try {
    const { dependencies, devDependencies } = JSON.parse(
      await readFile(join(projectDir, 'package.json'), 'utf8')
    );

    return { ...dependencies, ...devDependencies };
  } catch {
    return {};
  }
};

export const initSkills = async () => {
  const projectDir = findProjectRoot();

  if (!projectDir) {
    await window.showErrorMessage('Could not find project root.');
    return;
  }

  const selectedPlatform = await window.showQuickPick(
    getPlatformQuickPickItems(),
    { placeHolder: 'Which platforms are you using?' }
  );

  if (!selectedPlatform) return;

  // Preselect the skills of the frameworks the project depends on
  const initialSkills: Skill[] = getInitialSkills(
    await readProjectDependencies(projectDir)
  );

  const selectedSkills = await window.showQuickPick(
    SKILLS.map((skill: Skill) => ({
      label: skill,
      detail: SKILLS_METADATA[skill],
      value: skill,
      picked: initialSkills.includes(skill),
    })),
    {
      placeHolder: 'Select the documentation skills to provide to your AI',
      canPickMany: true,
    }
  );

  if (!selectedSkills?.length) return;

  await window.withProgress(
    {
      location: ProgressLocation.Notification,
      title: 'Installing Intlayer skills...',
    },
    async () => {
      const originalWorkingDirectory = process.cwd();

      try {
        process.chdir(projectDir);

        const result = await installSkills(
          projectDir,
          selectedPlatform.value,
          selectedSkills.map((skill) => skill.value)
        );

        await window.showInformationMessage(
          `Skills installed successfully: ${formatResult(result)}`
        );
      } catch (error) {
        await window.showErrorMessage(
          `Failed to install skills: ${String(error)}`
        );
      } finally {
        process.chdir(originalWorkingDirectory);
      }
    }
  );
};
