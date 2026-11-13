import { execSync } from 'node:child_process';
import { getProjectRequire } from '@intlayer/config/utils';
import type { IntlayerConfig } from '@intlayer/types/config';

let cachedFormatCommand: string | undefined | null = null;

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
 * Runs the configured or auto-detected formatter on `filePath` if one is
 * available. Errors from the formatter are caught and logged without throwing.
 */
export const runFormatCommand = (
  filePath: string,
  configuration: IntlayerConfig
): void => {
  const formatCommand = detectFormatCommand(configuration);

  if (!formatCommand) return;

  try {
    execSync(buildFormatCommand(formatCommand, filePath), {
      stdio: 'inherit',
      cwd: configuration.system.baseDir,
    });
  } catch (error) {
    console.error(error);
  }
};

export const detectFormatCommand = (
  configuration: IntlayerConfig,
  projectRequireProp?: NodeJS.Require
) => {
  const { baseDir } = configuration.system;
  const { formatCommand } = configuration.content;
  const projectRequire = projectRequireProp ?? getProjectRequire(baseDir);

  // Priority: Explicit configuration
  // We do not cache this because the user might change their config file active-session.
  if (formatCommand) {
    return formatCommand;
  }

  // Priority: Cached detection
  // If not null, we have already performed the expensive checks.
  if (cachedFormatCommand !== null) {
    return cachedFormatCommand;
  }

  // Perform Detection

  // Try Prettier
  try {
    projectRequire.resolve('prettier');
    cachedFormatCommand = 'prettier --write "{{file}}" --log-level silent';
    return cachedFormatCommand;
  } catch (_error) {
    // Prettier not found, continue
  }

  // Try Biome
  try {
    projectRequire.resolve('biome');
    cachedFormatCommand = 'biome format "{{file}}" --write --log-level none';
    return cachedFormatCommand;
  } catch (_error) {
    // Biome not found, continue
  }

  // Try ESLint
  try {
    projectRequire.resolve('eslint');
    cachedFormatCommand =
      'eslint --fix "{{file}}" --quiet || node -e "process.exit(0)"';
    return cachedFormatCommand;
  } catch (_error) {
    // ESLint not found
  }

  // No formatter found
  // Set to undefined (not null) so we know we checked and found nothing.
  cachedFormatCommand = undefined;
  return undefined;
};
