import type { FillResult } from '@intlayer/cli';
import { window } from 'vscode';
import { prefix } from './logFunctions';

/**
 * Notifies the outcome of a `fill` run. Warns instead of reporting success
 * when nothing was translated (no AI access, no matching dictionary).
 *
 * @param actionLabel - `Fill` or `Review`.
 * @param target - What was filled, e.g. a file name.
 */
export const showFillResult = async (
  result: FillResult,
  actionLabel: string,
  target: string
): Promise<void> => {
  if (result.status === 'no-ai-access') {
    await window.showErrorMessage(
      `${prefix}${actionLabel} skipped for ${target}: no AI access. ${
        result.error ??
        'Log in with "Intlayer: Login" or set an AI API key in your configuration.'
      }`
    );
    return;
  }

  if (result.status === 'no-dictionaries') {
    await window.showWarningMessage(
      `${prefix}${actionLabel} skipped: no dictionary found for ${target}.`
    );
    return;
  }

  if (result.writtenCount < result.taskCount) {
    await window.showWarningMessage(
      `${prefix}${actionLabel} completed for ${target} with ${
        result.taskCount - result.writtenCount
      } of ${result.taskCount} translation(s) failed. See the logs.`
    );
    return;
  }

  await window.showInformationMessage(
    `${prefix}${actionLabel} completed for ${target}.`
  );
};
