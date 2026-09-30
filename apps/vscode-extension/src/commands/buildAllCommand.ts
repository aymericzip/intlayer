import { basename } from 'node:path';
import { getConfiguration } from '@intlayer/config/node';
import { prepareIntlayer } from '@intlayer/engine/build';
import { window } from 'vscode';
import {
  type CommandSource,
  resolveProjectDirOrPick,
} from '../utils/findProjectRoot';
import { getConfigurationOptions } from '../utils/getConfiguration';
import { prefix } from '../utils/logFunctions';

/**
 * Build the dictionaries of a single Intlayer project.
 *
 * `forceRun` is required: `prepareIntlayer` otherwise skips the run while the
 * `intlayer-prepared.lock` sentinel is still fresh, which is exactly the state
 * left behind by the production build that dropped the unmerged dictionaries.
 *
 * @param projectDir - Root directory of the project to build.
 * @param options.silent - Skip the progress toasts, and only notify the build
 * logger's warnings and errors. Used when the build is triggered
 * automatically rather than by the user.
 * @returns Whether the build completed without throwing.
 */
export const buildProjectDictionaries = async (
  projectDir: string,
  options?: { silent?: boolean }
): Promise<boolean> => {
  try {
    const configuration = getConfiguration(
      await getConfigurationOptions(projectDir, {
        isBackground: options?.silent,
      })
    );

    if (!options?.silent) {
      await window.showInformationMessage(`${prefix}Building dictionaries...`);
    }

    await prepareIntlayer(configuration, { forceRun: true });

    if (!options?.silent) {
      await window.showInformationMessage(
        `${prefix}Build completed successfully in ${basename(projectDir)}`
      );
    }

    return true;
  } catch (error) {
    await window.showErrorMessage(
      `${prefix}Build failed: ${(error as Error).message}`
    );

    return false;
  }
};

export const buildCommand = async (source?: CommandSource) => {
  const projectDir = await resolveProjectDirOrPick(
    'Select the Intlayer project to build',
    source
  );

  if (!projectDir) return;

  await buildProjectDictionaries(projectDir);
};
