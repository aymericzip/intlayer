import { promises as fs } from 'node:fs';
import path from 'node:path';

const VSCODE_DIR = '.vscode';
const SETTINGS_FILENAME = 'settings.json';

const LSP_COMMAND_KEY = 'intlayer.languageServer.command';
const LSP_ARGS_KEY = 'intlayer.languageServer.args';
const LSP_COMMAND_VALUE = 'npx';
const LSP_ARGS_VALUE = ['@intlayer/lsp'];

/**
 * Writes the Intlayer LSP configuration to `.vscode/settings.json`.
 * Creates the file (and the `.vscode/` directory) if they don't exist.
 * Does not overwrite keys that are already present.
 *
 * Returns a human-readable summary of what was done plus next-step instructions.
 */
export const installLSP = async (projectRoot: string): Promise<string> => {
  const settingsPath = path.join(projectRoot, VSCODE_DIR, SETTINGS_FILENAME);

  await fs.mkdir(path.dirname(settingsPath), { recursive: true });

  let settings: Record<string, unknown> = {};
  try {
    const raw = await fs.readFile(settingsPath, 'utf-8');
    settings = JSON.parse(raw);
  } catch {
    // File does not exist or is invalid JSON — start from an empty object.
  }

  const updated: string[] = [];

  if (!settings[LSP_COMMAND_KEY]) {
    settings[LSP_COMMAND_KEY] = LSP_COMMAND_VALUE;
    updated.push(LSP_COMMAND_KEY);
  }

  if (!settings[LSP_ARGS_KEY]) {
    settings[LSP_ARGS_KEY] = LSP_ARGS_VALUE;
    updated.push(LSP_ARGS_KEY);
  }

  await fs.writeFile(settingsPath, JSON.stringify(settings, null, 2), 'utf-8');

  const configSummary =
    updated.length > 0
      ? `Added to ${settingsPath}:\n${updated.map((k) => `  "${k}"`).join('\n')}`
      : `${settingsPath} already contains the LSP configuration — no changes made.`;

  return [
    configSummary,
    '',
    'Next steps:',
    '',
    '1. Install the language server binary (required once):',
    '   npm install -g @intlayer/lsp',
    '',
    '2. (Optional) Register the Intlayer Claude Code plugin and enable Go-to-Definition inside Claude Code:',
    '   claude plugin marketplace add intlayer@github:aymericzip/intlayer',
    '   claude plugin install intlayer-lsp@intlayer',
    '   claude plugin enable intlayer-lsp@intlayer',
    '',
    '3. Reload your editor window so the new settings take effect.',
  ].join('\n');
};
