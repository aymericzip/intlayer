import { buildFilesList } from '@intlayer/chokidar/utils';
import {
  ANSIColors,
  colorize,
  colorizeKey,
  getAppLogger,
} from '@intlayer/config/logger';
import { DefaultValues, getConfiguration } from '@intlayer/config/node';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { ExtractPluginOptions } from './babel-plugin-intlayer-extract';
import { writeContentHelper } from './extractContent/contentWriter';

/**
 * Mode of the compiler
 * - 'dev': Development mode with HMR support
 * - 'build': Production build mode
 */
export type CompilerMode = 'dev' | 'build';

/**
 * Get the options for the Intlayer Babel extraction plugin
 * This function loads the Intlayer configuration and sets up the onExtract callback
 * to write dictionaries to the filesystem.
 */
export const getExtractPluginOptions = (
  configuration: IntlayerConfig = getConfiguration(),
  isDev = process.env.INTLAYER_IS_DEV_COMMAND
): ExtractPluginOptions => {
  const isDevBoolean = String(isDev) === 'true';

  const compilerMode: CompilerMode = isDevBoolean ? 'dev' : 'build';

  const logger = getAppLogger(configuration);

  if (configuration.compiler?.enabled === 'build-only' && isDevBoolean) {
    logger(
      `${colorize('Compiler:', ANSIColors.GREY_DARK)} i18n function is not inserted in the code in dev mode to optimize build time. (to test i18n in dev mode set compiler.enabled to true)`
    );
  }

  let enabled =
    configuration.compiler?.enabled ?? DefaultValues.Compiler.COMPILER_ENABLED;

  if (enabled === 'build-only') {
    if (compilerMode) {
      enabled = compilerMode === 'build';
    } else {
      // Fallback if mode isn't explicitly provided (e.g. pure babel plugin context)
      enabled = process.env.NODE_ENV === 'production';
    }
  }

  const transformPattern =
    configuration.build.traversePattern ??
    configuration.compiler?.transformPattern;

  const excludePattern = [
    // Ensure extensions are treated as glob patterns (e.g., **/*.ts)
    ...configuration.content.fileExtensions.map((ext) => `**/*${ext}`),

    ...(Array.isArray(configuration.compiler.excludePattern)
      ? configuration.compiler.excludePattern
      : [configuration.compiler.excludePattern]),
  ] as string[];

  const filesList = buildFilesList({
    transformPattern,
    excludePattern,
    baseDir: configuration.system.baseDir,
  });

  return {
    enabled,
    configuration,
    filesList,
    onExtract: async ({ dictionaryKey, content, filePath }) => {
      try {
        await writeContentHelper(
          content,
          dictionaryKey,
          filePath,
          configuration
        );
      } catch (error) {
        logger(
          [
            `Failed to process extracted content for ${colorizeKey(dictionaryKey)}:`,
            error,
          ],
          { level: 'error' }
        );
      }
    },
  };
};
