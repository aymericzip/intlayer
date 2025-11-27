import { join, relative } from 'node:path';
import { buildDictionary, writeContentDeclaration } from '@intlayer/chokidar';
import { getConfiguration } from '@intlayer/config';
import type { Dictionary } from '@intlayer/types';
import type {
  ExtractPluginOptions,
  ExtractResult,
} from './babel-plugin-intlayer-extract';

/**
 * Get the options for the Intlayer Babel extraction plugin
 * This function loads the Intlayer configuration and sets up the onExtract callback
 * to write dictionaries to the filesystem.
 */
export const getCompilerOptions = (): ExtractPluginOptions => {
  const config = getConfiguration();
  const { baseDir } = config.content;
  const compilerDir = join(baseDir, config.compiler?.outputDir ?? 'compiler');

  const handleExtractedContent = async (result: ExtractResult) => {
    const { dictionaryKey, content, locale } = result;

    try {
      // Create a dictionary from the extracted content
      // Note: This logic assumes we want to overwrite/update the dictionary
      // Ideally we would merge, but for a simple Babel setup, direct write is a start.
      // The IntlayerCompilerPlugin has more robust merging logic.

      const dictionary: Dictionary = {
        key: dictionaryKey,
        content: Object.entries(content).reduce(
          (acc, [key, value]) => {
            acc[key] = {
              nodeType: 'translation',
              translation: {
                [locale]: value,
              },
            };
            return acc;
          },
          {} as Record<string, any>
        ),
        filePath: join(
          relative(baseDir, compilerDir),
          `${dictionaryKey}.content.json`
        ),
      };

      const writeResult = await writeContentDeclaration(dictionary, config, {
        newDictionariesPath: relative(baseDir, compilerDir),
      });

      // Build the dictionary immediately
      const dictionaryToBuild: Dictionary = {
        ...dictionary,
        filePath: relative(baseDir, writeResult.path),
      };

      await buildDictionary([dictionaryToBuild], config);
    } catch (error) {
      console.error(
        `[intlayer] Failed to process extracted content for ${dictionaryKey}:`,
        error
      );
    }
  };

  return {
    defaultLocale: config.internationalization.defaultLocale,
    // filesList can be passed if needed, but usually handled by include/exclude in build tool
    onExtract: handleExtractedContent,
  };
};
