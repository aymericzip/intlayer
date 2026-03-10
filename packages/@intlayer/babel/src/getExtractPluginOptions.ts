import { ANSIColors, colorize, getAppLogger } from '@intlayer/config/logger';
import { getConfiguration } from '@intlayer/config/node';
import type {
  ExtractPluginOptions,
  ExtractResult,
} from './babel-plugin-intlayer-extract';
import { writeContentHelper } from './extractContent/contentWriter';

/**
 * Get the options for the Intlayer Babel extraction plugin
 * This function loads the Intlayer configuration and sets up the onExtract callback
 * to write dictionaries to the filesystem.
 */
export const getExtractPluginOptions = (
  isDev = process.env.INTLAYER_IS_DEV_COMMAND
): ExtractPluginOptions => {
  const config = getConfiguration();

  const outputPattern = config.compiler?.output;

  const handleExtractedContent = async (result: ExtractResult) => {
    const { dictionaryKey, content } = result;

    try {
      await writeContentHelper(
        content,
        dictionaryKey,
        result.filePath,
        config,
        outputPattern
      );
    } catch (error: any) {
      console.error(
        `[intlayer] Failed to process extracted content for ${dictionaryKey}:`,
        error
      );
    }
  };

  const isDevBoolean = String(isDev) === 'true';
  const isEnabled =
    config.compiler?.enabled === 'build-only'
      ? !isDevBoolean
      : (config.compiler?.enabled ?? true);

  const logger = getAppLogger(config);

  if (config.compiler?.enabled === 'build-only' && isDevBoolean) {
    logger(
      `${colorize('Compiler:', ANSIColors.GREY_DARK)} i18n function is not inserted in the code in dev mode to optimize build time. (to test i18n in dev mode set compiler.enabled to true)`
    );
  }

  return {
    enabled: isEnabled,
    defaultLocale: config.internationalization.defaultLocale,
    prefix: config.compiler?.dictionaryKeyPrefix,
    saveComponents: config.compiler?.saveComponents,
    // filesList can be passed if needed, but usually handled by include/exclude in build tool
    onExtract: handleExtractedContent,
  };
};
