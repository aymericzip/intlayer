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
   * Version of the `intlayer` package to run remotely (e.g. `9.6.0`).
   * Ignored for the installed binary. Defaults to the latest version.
   */
  version?: string;
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
    version,
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
  const packageSpecifier =
    remote && version ? `intlayer@${version}` : 'intlayer';

  return [
    runner,
    packageSpecifier,
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

/**
 * Runs the package manager install in a new integrated terminal, from the
 * workspace root holding the lock file, so edited `package.json` ranges are
 * resolved and the lock file updated (as `intlayer upgrade` does).
 */
export const runPackageInstallInTerminal = (projectDir: string): Terminal => {
  const installDir = findLockFileDir(projectDir) ?? projectDir;
  const packageManager = detectPackageManager(installDir);
  const terminal = window.createTerminal({
    name: 'Intlayer install',
    cwd: installDir,
  });

  terminal.show();
  terminal.sendText(`${packageManager} install`);

  return terminal;
};
