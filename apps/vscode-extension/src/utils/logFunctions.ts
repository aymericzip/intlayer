import type { LogFunctions } from '@intlayer/types';
import { window } from 'vscode';

/** Prefix of every notification the extension shows. */
export const prefix = 'Intlayer: ';

/** Removes ANSI color codes, which notifications render literally. */
const stripANSIColors = (text: string): string =>
  // biome-ignore lint/suspicious/noControlCharactersInRegex: matches the ESC character
  text.replace(/\x1b\[[0-9;]*m/g, '');

const formatMessage = (message: unknown[]): string =>
  stripANSIColors(message.flat().join(' ')).replace(/\s+/g, ' ').trim();

/**
 * Intlayer logger output mapped to VS Code notifications, so the details of
 * a command's success or failure (build, fill, push, pull…) reach the user.
 * Passed as `logFunctions` when loading a project configuration.
 */
export const logFunctions: Required<LogFunctions> = {
  log: (...message: unknown[]) => {
    console.log(...message);
    window.showInformationMessage(formatMessage(message));
  },
  info: (...message: unknown[]) => {
    console.info(...message);
    window.showInformationMessage(formatMessage(message));
  },
  warn: (...message: unknown[]) => {
    console.warn(...message);
    window.showWarningMessage(formatMessage(message));
  },
  error: (...message: unknown[]) => {
    console.error(...message);
    window.showErrorMessage(formatMessage(message));
  },
};

/**
 * For work the user did not trigger (rebuild on save, automatic build, cached
 * configuration): only warnings and errors notify, progress stays in the
 * console so it does not stack notifications.
 */
export const backgroundLogFunctions: Required<LogFunctions> = {
  ...logFunctions,
  log: console.log,
  info: console.info,
};
