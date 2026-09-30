import { type FillOptions, fill } from '@intlayer/cli';
import { getConfiguration } from '@intlayer/config/node';
import { window } from 'vscode';
import {
  type CommandSource,
  resolveProjectDirOrPick,
} from '../utils/findProjectRoot';
import { getConfigurationOptions } from '../utils/getConfiguration';
import { prefix } from '../utils/logFunctions';
import { pickContentDeclarationFiles } from '../utils/selectContentDeclaration';
import { showFillResult } from '../utils/showFillResult';

type FillMode = NonNullable<FillOptions['mode']>;

/**
 * Fill the picked content declaration files of a project.
 *
 * @param mode - `complete` fills missing translations only, `review` also
 * re-translates the existing ones.
 */
const fillProjectDictionaries = async (
  source: CommandSource | undefined,
  mode: FillMode
): Promise<void> => {
  const actionLabel = mode === 'review' ? 'Review' : 'Fill';
  const projectDir = await resolveProjectDirOrPick(
    `Select the Intlayer project to ${actionLabel.toLowerCase()}`,
    source
  );

  if (!projectDir) return;

  try {
    const configurationOptions = await getConfigurationOptions(projectDir);
    const configuration = getConfiguration(configurationOptions);

    const contentDeclarationFiles = await pickContentDeclarationFiles(
      projectDir,
      configuration,
      `Select dictionaries to ${actionLabel.toLowerCase()}`
    );

    if (!contentDeclarationFiles?.length) {
      window.showWarningMessage(`${prefix}No dictionary selected.`);
      return;
    }

    window.showInformationMessage(
      `${prefix}${actionLabel}ing ${contentDeclarationFiles.length} file(s)…`
    );

    // `fill` builds the dictionaries first, reusing the build cache
    const fillResult = await fill({
      configOptions: configurationOptions,
      file: contentDeclarationFiles,
      mode,
    });

    await showFillResult(
      fillResult,
      actionLabel,
      `${contentDeclarationFiles.length} file(s)`
    );
  } catch (error) {
    await window.showErrorMessage(
      `${prefix}${actionLabel} failed: ${(error as Error).message}`
    );
  }
};

/** `intlayer fill`: translate the missing content of the picked files. */
export const fillCommand = (source?: CommandSource): Promise<void> =>
  fillProjectDictionaries(source, 'complete');

/** `intlayer fill --mode review`: also re-translate the existing content. */
export const reviewCommand = (source?: CommandSource): Promise<void> =>
  fillProjectDictionaries(source, 'review');
