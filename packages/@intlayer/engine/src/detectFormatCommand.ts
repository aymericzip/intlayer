import { execSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { colorizePath, getAppLogger } from '@intlayer/config/logger';
import type { IntlayerConfig } from '@intlayer/types/config';

/**
 * Configuration fields read to detect and run the formatter.
 */
export type FormatCommandConfiguration = {
  system: Pick<IntlayerConfig['system'], 'baseDir'>;
  content: Pick<IntlayerConfig['content'], 'formatCommand'>;
  log: IntlayerConfig['log'];
};

/**
 * Formatter Intlayer can run on the files it writes.
 */
type FormatterDefinition = {
  /** Package that has to be declared in a `package.json` of the project. */
  packageName: string;
  /** Executable name inside `node_modules/.bin`. */
  binaryName: string;
  /** Arguments appended to the binary path. `{{file}}` is the file to format. */
  commandArguments: string;
  /**
   * Run from the top-most directory declaring the package (the workspace
   * root) instead of `baseDir`.
   */
  runsFromWorkspaceRoot?: boolean;
};

/**
 * Formatter resolved for a project.
 */
export type DetectedFormatter = {
  /** Command template, `{{file}}` being the file to format. */
  command: string;
  /** Directory the command runs from. */
  workingDirectory: string;
};

/**
 * Supported formatters, by priority.
 *
 * A formatter is only picked when the project declares its package. A copy
 * pulled in transitively (e.g. exposed through pnpm's `NODE_PATH`) is never
 * used: it may not be runnable, and would format with a foreign style.
 */
const FORMATTERS: FormatterDefinition[] = [
  {
    packageName: 'oxfmt',
    binaryName: 'oxfmt',
    commandArguments: '"{{file}}" --no-error-on-unmatched-pattern',
  },
  {
    packageName: 'prettier',
    binaryName: 'prettier',
    commandArguments: '--write "{{file}}" --log-level silent',
  },
  {
    packageName: '@biomejs/biome',
    binaryName: 'biome',
    commandArguments: 'format "{{file}}" --write --log-level none',
  },
  {
    // Vite+ runs oxfmt with the `fmt` field of the `vite.config.ts` found from
    // its working directory. An app config is loaded in full (plugins
    // included, seconds per file), the workspace root one holds `fmt`.
    packageName: 'vite-plus',
    binaryName: 'vp',
    commandArguments: 'fmt "{{file}}" --no-error-on-unmatched-pattern',
    runsFromWorkspaceRoot: true,
  },
  {
    packageName: 'eslint',
    binaryName: 'eslint',
    commandArguments: '--fix "{{file}}" --quiet || node -e "process.exit(0)"',
  },
];

const DEPENDENCY_FIELDS = [
  'dependencies',
  'devDependencies',
  'optionalDependencies',
] as const;

/** Exit codes of a shell that could not find the command (POSIX, cmd.exe). */
const COMMAND_NOT_FOUND_EXIT_CODES = new Set([127, 9009]);

/** Auto-detected formatter per `baseDir`, `undefined` when none is usable. */
const detectedFormatterCache = new Map<string, DetectedFormatter | undefined>();

/** Commands whose binary is missing, skipped after a single warning. */
const unavailableFormatCommands = new Set<string>();

/**
 * Escapes shell variable/command-substitution markers (`$` and `` ` ``) in a
 * file path before interpolating it into a shell command string.
 *
 * Route segments like TanStack Start's `{-$locale}` or `$locale` contain `$`,
 * which POSIX shells (`sh`/`zsh`/`bash`) expand inside double-quoted strings
 * (`"{-$locale}"` → `"{-}"`). On Windows (`cmd.exe`), `%` is the variable
 * marker, not `$`, so leaving `$` unescaped is required there.
 */
export const escapeShellFilePath = (
  filePath: string,
  platform: NodeJS.Platform = process.platform
): string => {
  if (platform === 'win32') {
    return filePath;
  }

  return filePath.replace(/[$`]/g, '\\$&');
};

/**
 * Interpolates `filePath` into a `formatCommand` template (`{{file}}`),
 * escaping shell expansion characters so dynamic route segments (e.g.
 * `{-$locale}`, `$id`) survive double-quoted shell execution.
 *
 * Note: `String.prototype.replace` treats `$` in replacement strings as a
 * special pattern (`$&`, `$'`, `` $` ``), so a replacement function is used.
 */
export const buildFormatCommand = (
  formatCommand: string,
  filePath: string,
  platform: NodeJS.Platform = process.platform
): string => {
  const escapedPath = escapeShellFilePath(filePath, platform);
  return formatCommand.replaceAll('{{file}}', () => escapedPath);
};

/**
 * Lists `directory` and all its parents, up to the filesystem root.
 */
const getAncestorDirectories = (directory: string): string[] => {
  const parentDirectory = dirname(directory);

  return parentDirectory === directory
    ? [directory]
    : [directory, ...getAncestorDirectories(parentDirectory)];
};

/**
 * Reads the packages declared by the `package.json` of `directory`.
 * Returns an empty set when there is none or it cannot be parsed.
 */
const getDeclaredPackageNames = (directory: string): Set<string> => {
  const packageJsonPath = join(directory, 'package.json');

  if (!existsSync(packageJsonPath)) return new Set();

  try {
    const packageJson: Partial<
      Record<(typeof DEPENDENCY_FIELDS)[number], Record<string, string>>
    > = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));

    return new Set(
      DEPENDENCY_FIELDS.flatMap((dependencyField) =>
        Object.keys(packageJson[dependencyField] ?? {})
      )
    );
  } catch {
    return new Set();
  }
};

/**
 * Finds the closest `node_modules/.bin` executable named `binaryName`.
 */
const findLocalBinary = (
  directories: string[],
  binaryName: string,
  platform: NodeJS.Platform
): string | undefined => {
  const fileName = platform === 'win32' ? `${binaryName}.cmd` : binaryName;

  return directories
    .map((directory) => join(directory, 'node_modules', '.bin', fileName))
    .find((binaryPath) => existsSync(binaryPath));
};

/**
 * Detects the formatter of the project located at `baseDir`, looking at the
 * `package.json` of `baseDir` and of its parents (monorepo workspace root).
 *
 * The command calls the local binary by its absolute path, so it runs
 * whatever the `PATH` is. Returns `undefined` when no declared formatter is
 * installed.
 */
export const detectProjectFormatter = (
  baseDir: string,
  platform: NodeJS.Platform = process.platform
): DetectedFormatter | undefined => {
  const directories = getAncestorDirectories(baseDir);
  const declaredPackageNamesByDirectory = directories.map(
    getDeclaredPackageNames
  );

  for (const formatter of FORMATTERS) {
    const declaringDirectories = directories.filter((_directory, index) =>
      declaredPackageNamesByDirectory[index]?.has(formatter.packageName)
    );

    if (declaringDirectories.length === 0) continue;

    const binaryPath = findLocalBinary(
      directories,
      formatter.binaryName,
      platform
    );

    if (!binaryPath) continue;

    return {
      command: `"${escapeShellFilePath(binaryPath, platform)}" ${formatter.commandArguments}`,
      workingDirectory: formatter.runsFromWorkspaceRoot
        ? (declaringDirectories.at(-1) ?? baseDir)
        : baseDir,
    };
  }

  return undefined;
};

/**
 * Resolves the formatter to run: the configured `content.formatCommand`
 * (never cached, the configuration can change during the session), or else
 * the auto-detected project formatter.
 */
const resolveFormatter = (
  configuration: FormatCommandConfiguration
): DetectedFormatter | undefined => {
  const { baseDir } = configuration.system;
  const { formatCommand } = configuration.content;

  if (formatCommand) {
    return { command: formatCommand, workingDirectory: baseDir };
  }

  if (!detectedFormatterCache.has(baseDir)) {
    detectedFormatterCache.set(baseDir, detectProjectFormatter(baseDir));
  }

  return detectedFormatterCache.get(baseDir);
};

/**
 * Returns the command template used to format written files: the configured
 * `content.formatCommand`, or else the auto-detected project formatter.
 */
export const detectFormatCommand = (
  configuration: FormatCommandConfiguration
): string | undefined => resolveFormatter(configuration)?.command;

/**
 * Reads the exit status and the output of a failed `execSync` call.
 */
const getCommandFailure = (
  error: unknown
): { exitCode: number | undefined; output: string } => {
  if (typeof error !== 'object' || error === null) {
    return { exitCode: undefined, output: String(error) };
  }

  const { status, stderr, stdout, message } = error as {
    status?: number | null;
    stderr?: Buffer | string | null;
    stdout?: Buffer | string | null;
    message?: string;
  };

  const output = [stderr, stdout, message]
    .map((value) => value?.toString().trim())
    .find(Boolean);

  return { exitCode: status ?? undefined, output: output ?? '' };
};

/**
 * Runs the configured or auto-detected formatter on `filePath`, if any.
 *
 * Never throws: a formatter failure is logged as a warning, and a command
 * whose binary is missing is skipped for the rest of the session.
 */
export const runFormatCommand = (
  filePath: string,
  configuration: FormatCommandConfiguration
): void => {
  const formatter = resolveFormatter(configuration);

  if (!formatter || unavailableFormatCommands.has(formatter.command)) return;

  const { command: formatCommand, workingDirectory } = formatter;
  // The working directory may differ from `baseDir` (workspace root)
  const absoluteFilePath = resolve(configuration.system.baseDir, filePath);

  try {
    execSync(buildFormatCommand(formatCommand, absoluteFilePath), {
      stdio: 'pipe',
      cwd: workingDirectory,
    });
  } catch (error) {
    const appLogger = getAppLogger(configuration);
    const { exitCode, output } = getCommandFailure(error);

    if (exitCode !== undefined && COMMAND_NOT_FOUND_EXIT_CODES.has(exitCode)) {
      unavailableFormatCommands.add(formatCommand);

      appLogger(
        `Format command not found, formatting skipped: ${formatCommand}`,
        { level: 'warn' }
      );
      return;
    }

    appLogger(`Failed to format ${colorizePath(filePath)}: ${output}`, {
      level: 'warn',
    });
  }
};
