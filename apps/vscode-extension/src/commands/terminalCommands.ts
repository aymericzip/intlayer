import { window } from 'vscode';
import {
  type CommandSource,
  resolveProjectDirOrPick,
} from '../utils/findProjectRoot';
import {
  type IntlayerCliCommandOptions,
  runIntlayerCliInTerminal,
} from '../utils/runIntlayerCli';

type TerminalCommandDefinition = IntlayerCliCommandOptions & {
  /** Quick pick prompt shown when several projects match. */
  placeHolder: string;
  terminalName: string;
};

/**
 * Creates a command that runs an interactive or long-running `intlayer` CLI
 * command in an integrated terminal of the resolved project.
 */
const createTerminalCommand =
  ({ placeHolder, ...cliCommandOptions }: TerminalCommandDefinition) =>
  async (source?: CommandSource): Promise<void> => {
    const projectDir = await resolveProjectDirOrPick(placeHolder, source);

    if (!projectDir) return;

    runIntlayerCliInTerminal(projectDir, cliCommandOptions);
  };

/** `intlayer login`: browser login that stores CMS access-key credentials. */
export const loginCommand = createTerminalCommand({
  placeHolder: 'Select the Intlayer project to log in to',
  terminalName: 'Intlayer login',
  args: ['login'],
});

/** `intlayer configuration push`: sync the configuration with the CMS. */
export const pushConfigurationCommand = createTerminalCommand({
  placeHolder: 'Select the Intlayer project whose configuration to push',
  terminalName: 'Intlayer configuration push',
  args: ['configuration', 'push'],
});

/** `intlayer editor start`: serve the visual editor. */
export const startEditorCommand = createTerminalCommand({
  placeHolder: 'Select the Intlayer project to edit',
  terminalName: 'Intlayer visual editor',
  args: ['editor', 'start'],
});

/** `intlayer upgrade`: upgrade every Intlayer package of the project. */
export const upgradeCommand = createTerminalCommand({
  placeHolder: 'Select the Intlayer project to upgrade',
  terminalName: 'Intlayer upgrade',
  args: ['upgrade'],
  // `upgrade` takes no configuration options
  forwardEnvironment: false,
});

/** `intlayer doc translate`: translate the documentation files. */
export const translateDocCommand = createTerminalCommand({
  placeHolder: 'Select the Intlayer project whose docs to translate',
  terminalName: 'Intlayer doc translate',
  args: ['doc', 'translate'],
});

/** `intlayer doc review`: review the translated documentation files. */
export const reviewDocCommand = createTerminalCommand({
  placeHolder: 'Select the Intlayer project whose docs to review',
  terminalName: 'Intlayer doc review',
  args: ['doc', 'review'],
});

/** `intlayer standalone`: bundle the application content in one file. */
export const standaloneCommand = createTerminalCommand({
  placeHolder: 'Select the Intlayer project to bundle',
  terminalName: 'Intlayer standalone',
  args: ['standalone'],
});

/** `intlayer init lsp`: configure the language server in `.vscode`. */
export const initLSPCommand = createTerminalCommand({
  placeHolder: 'Select the Intlayer project to set up the LSP in',
  terminalName: 'Intlayer init lsp',
  args: ['init', 'lsp'],
  // `init` subcommands take no configuration options
  forwardEnvironment: false,
});

/** `intlayer init eslint`: enable the Intlayer lint rules. */
export const initESLintCommand = createTerminalCommand({
  placeHolder: 'Select the Intlayer project to set up the lint rules in',
  terminalName: 'Intlayer init eslint',
  args: ['init', 'eslint'],
  forwardEnvironment: false,
});

/** `intlayer init github-actions`: scaffold the fill / test workflows. */
export const initGitHubActionsCommand = createTerminalCommand({
  placeHolder: 'Select the Intlayer project to set up GitHub Actions in',
  terminalName: 'Intlayer init github-actions',
  args: ['init', 'github-actions'],
  forwardEnvironment: false,
});

/** `intlayer scan <url>`: audit the page size and i18n / SEO of a website. */
export const scanCommand = async (source?: CommandSource): Promise<void> => {
  const projectDir = await resolveProjectDirOrPick(
    'Select the Intlayer project to scan with',
    source
  );

  if (!projectDir) return;

  const url = await window.showInputBox({
    prompt: 'URL of the website to scan',
    placeHolder: 'https://example.com',
    validateInput: (value) =>
      URL.canParse(value) ? undefined : 'Enter a full URL (https://…)',
  });

  if (!url) return;

  runIntlayerCliInTerminal(projectDir, {
    terminalName: 'Intlayer scan',
    args: ['scan', url],
  });
};
