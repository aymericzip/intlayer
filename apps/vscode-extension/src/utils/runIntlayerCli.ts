import {
  detectPackageManager,
  findLockFileDir,
  type PackageManager,
} from '@intlayer/engine/cli';
import { type Terminal, window } from 'vscode';
import { getSelectedEnvironment } from './envStore';

/** Command prefix that runs the project's installed `intlayer` binary. */
const INSTALLED_BINARY_RUNNERS: Record<PackageManager, string> = {
  npm: 'npx',
  bun: 'bunx',
  pnpm: 'pnpm exec',
  yarn: 'yarn',
};

/** Command prefix that runs a package binary without installing it. */
const REMOTE_BINARY_RUNNERS: Record<PackageManager, string> = {
  npm: 'npx',
  bun: 'bunx',
  pnpm: 'pnpm dlx',
  yarn: 'yarn dlx',
};

export type IntlayerCliCommandOptions = {
  /** CLI arguments, e.g. `['fill', '--mode', 'review']`. */
  args: string[];
  /**
   * Run the `intlayer` binary without requiring it to be installed (used by
   * `init`). Defaults to the project's installed binary.
   */
  remote?: boolean;
  /**
   * Forward the environment selected in the dictionaries view as `--env`.
   * Disable for commands without configuration options (`upgrade`).
   * Defaults to `true`, except for remote runs.
   */
  forwardEnvironment?: boolean;
};

/** Wraps an argument in single quotes when the shell could split it. */
const quoteShellArgument = (argument: string): string =>
  /^[\w@%+=:,./-]+$/.test(argument)
    ? argument
    : `'${argument.replaceAll("'", `'\\''`)}'`;

/**
 * Builds the `intlayer` CLI command line for the package manager of the
 * project (resolved from the nearest lock file, so monorepo packages use the
 * workspace package manager).
 */
export const getIntlayerCliCommand = (
  projectDir: string,
  {
    args,
    remote = false,
    forwardEnvironment = !remote,
  }: IntlayerCliCommandOptions
): string => {
  const packageManager = detectPackageManager(
    findLockFileDir(projectDir) ?? projectDir
  );
  const runner = (remote ? REMOTE_BINARY_RUNNERS : INSTALLED_BINARY_RUNNERS)[
    packageManager
  ];
  const environment = forwardEnvironment
    ? getSelectedEnvironment(projectDir)
    : undefined;
  const environmentArgs = environment ? ['--env', environment] : [];

  return [
    runner,
    'intlayer',
    ...[...args, ...environmentArgs].map(quoteShellArgument),
  ].join(' ');
};

/**
 * Runs an `intlayer` CLI command in a new integrated terminal, for commands
 * that are interactive or long-running (login, visual editor, upgrade…).
 */
export const runIntlayerCliInTerminal = (
  projectDir: string,
  options: IntlayerCliCommandOptions & { terminalName: string }
): Terminal => {
  const terminal = window.createTerminal({
    name: options.terminalName,
    cwd: projectDir,
  });

  terminal.show();
  terminal.sendText(getIntlayerCliCommand(projectDir, options));

  return terminal;
};
