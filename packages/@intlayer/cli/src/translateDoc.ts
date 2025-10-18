import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { readAsset } from 'utils:asset';
import type { AIOptions } from '@intlayer/api';
import {
  formatLocale,
  formatPath,
  getChunk,
  type ListGitFilesOptions,
  listGitFiles,
  parallelize,
} from '@intlayer/chokidar';
import {
  ANSIColors,
  colon,
  colorize,
  colorizeNumber,
  type GetConfigurationOptions,
  getAppLogger,
  getConfiguration,
  retryManager,
} from '@intlayer/config';
import type { IntlayerConfig, Locales } from '@intlayer/types';
import fg from 'fast-glob';
import { chunkText } from './utils/calculateChunks';
import { checkAIAccess } from './utils/checkAccess';
import { checkFileModifiedRange } from './utils/checkFileModifiedRange';
import { chunkInference } from './utils/chunkInference';
import { fixChunkStartEndChars } from './utils/fixChunkStartEndChars';
import { getOutputFilePath } from './utils/getOutputFilePath';

/**
 * Translate a single file for a given locale
 */
export const translateFile = async (
  baseFilePath: string,
  outputFilePath: string,
  locale: Locales,
  baseLocale: Locales,
  configuration: IntlayerConfig,
  aiOptions?: AIOptions,
  customInstructions?: string
) => {
  try {
    const appLogger = getAppLogger(configuration, {
      config: {
        prefix: '',
      },
    });

    // Determine the target locale file path
    const fileContent = await readFile(baseFilePath, 'utf-8');

    let fileResultContent = fileContent;

    // Prepare the base prompt for ChatGPT
    const basePrompt = readAsset('./prompts/TRANSLATE_PROMPT.md', 'utf-8')
      .replaceAll('{{localeName}}', `${formatLocale(locale, false)}`)
      .replaceAll('{{baseLocaleName}}', `${formatLocale(baseLocale, false)}`)
      .replace('{{applicationContext}}', aiOptions?.applicationContext ?? '-')
      .replace('{{customInstructions}}', customInstructions ?? '-');

    const filePrefixText = `${ANSIColors.GREY_DARK}[${formatPath(baseFilePath)}${ANSIColors.GREY_DARK}] `;
    const filePrefix = [
      colon(filePrefixText, { colSize: 40 }),
      `→ ${ANSIColors.RESET}`,
    ].join('');

    const prefixText = `${ANSIColors.GREY_DARK}[${formatPath(baseFilePath)}${ANSIColors.GREY_DARK}][${formatLocale(locale)}${ANSIColors.GREY_DARK}] `;
    const prefix = [
      colon(prefixText, { colSize: 40 }),
      `→ ${ANSIColors.RESET}`,
    ].join('');

    // 1. Chunk the file by number of lines instead of characters
    const chunks = chunkText(fileContent);
    appLogger(
      `${filePrefix}Base file splitted into ${colorizeNumber(chunks.length)} chunks`
    );

    for await (const [i, chunk] of chunks.entries()) {
      const isFirstChunk = i === 0;

      // Build the chunk-specific prompt
      const getPrevChunkPrompt = () =>
        `**CHUNK ${i} of ${chunks.length}** that has been translated in ${formatLocale(locale)}:\n` +
        `///chunkStart///` +
        getChunk(fileResultContent, chunks[i - 1]) +
        `///chunkEnd///`;

      const getBaseChunkContextPrompt = () =>
        `**CHUNK ${i + 1} to ${Math.min(i + 3, chunks.length)} of ${chunks.length}** is the base chunk in ${formatLocale(baseLocale, false)} as reference.\n` +
        `///chunksStart///` +
        (chunks[i - 1]?.content ?? '') +
        chunks[i].content +
        (chunks[i + 1]?.content ?? '') +
        `///chunksEnd///`;

      const fileToTranslateCurrentChunk = chunk.content;

      // Make the actual translation call
      const chunkTranslation = await retryManager(async () => {
        const result = await chunkInference(
          [
            { role: 'system', content: basePrompt },

            { role: 'system', content: getBaseChunkContextPrompt() },
            ...(isFirstChunk
              ? []
              : [{ role: 'system', content: getPrevChunkPrompt() } as const]),
            {
              role: 'system',
              content: `The next user message will be the **CHUNK ${colorizeNumber(i + 1)} of ${colorizeNumber(chunks.length)}** in ${formatLocale(baseLocale, false)} to translate in ${formatLocale(locale, false)}:`,
            },
            { role: 'user', content: fileToTranslateCurrentChunk },
          ],
          aiOptions,
          configuration
        );

        appLogger(
          [
            `${prefix}`,
            `${ANSIColors.GREY_DARK}[Chunk `,
            colorizeNumber(i + 1),
            `${ANSIColors.GREY_DARK} of `,
            colorizeNumber(chunks.length),
            `${ANSIColors.GREY_DARK}] →${ANSIColors.RESET} `,
            `${colorizeNumber(result.tokenUsed)} tokens used`,
          ].join('')
        );

        const fixedTranslatedChunkResult = fixChunkStartEndChars(
          result?.fileContent,
          fileToTranslateCurrentChunk
        );

        return fixedTranslatedChunkResult;
      })();

      // Replace the chunk in the file content
      fileResultContent = fileResultContent.replace(
        fileToTranslateCurrentChunk,
        chunkTranslation
      );
    }

    // 4. Write the final translation to the appropriate file path
    mkdirSync(dirname(outputFilePath), { recursive: true });
    writeFileSync(outputFilePath, fileResultContent);

    const relativePath = relative(
      configuration.content.baseDir,
      outputFilePath
    );

    appLogger(
      `${colorize('✔', ANSIColors.GREEN)} File ${formatPath(relativePath)} created/updated successfully.`
    );
  } catch (error) {
    console.error(error);
  }
};

type TranslateDocOptions = {
  docPattern: string[];
  locales: Locales[];
  excludedGlobPattern: string[];
  baseLocale: Locales;
  aiOptions?: AIOptions;
  nbSimultaneousFileProcessed?: number;
  configOptions?: GetConfigurationOptions;
  customInstructions?: string;
  skipIfModifiedBefore?: number | string | Date;
  skipIfModifiedAfter?: number | string | Date;
  gitOptions?: ListGitFilesOptions;
};

/**
 * Main translate function: scans all .md files in "en/" (unless you specified DOC_LIST),
 * then translates them to each locale in LOCALE_LIST.
 */
export const translateDoc = async ({
  docPattern,
  locales,
  excludedGlobPattern,
  baseLocale,
  aiOptions,
  nbSimultaneousFileProcessed,
  configOptions,
  customInstructions,
  skipIfModifiedBefore,
  skipIfModifiedAfter,
  gitOptions,
}: TranslateDocOptions) => {
  const configuration = getConfiguration(configOptions);
  const appLogger = getAppLogger(configuration);

  if (nbSimultaneousFileProcessed && nbSimultaneousFileProcessed > 10) {
    appLogger(
      `Warning: nbSimultaneousFileProcessed is set to ${nbSimultaneousFileProcessed}, which is greater than 10. Setting it to 10.`
    );
    nbSimultaneousFileProcessed = 10; // Limit the number of simultaneous file processed to 10
  }

  let docList: string[] = await fg(docPattern, {
    ignore: excludedGlobPattern,
  });

  const hasCMSAuth = await checkAIAccess(configuration, aiOptions);

  if (!hasCMSAuth) return;

  if (gitOptions) {
    const gitChangedFiles = await listGitFiles(gitOptions);

    if (gitChangedFiles) {
      // Convert dictionary file paths to be relative to git root for comparison

      // Filter dictionaries based on git changed files
      docList = docList.filter((path) =>
        gitChangedFiles.some((gitFile) => join(process.cwd(), path) === gitFile)
      );
    }
  }

  // OAuth handled by API proxy internally

  appLogger(`Base locale is ${formatLocale(baseLocale)}`);
  appLogger(
    `Translating ${colorizeNumber(locales.length)} locales: [ ${formatLocale(locales)} ]`
  );

  appLogger(`Translating ${colorizeNumber(docList.length)} files:`);
  appLogger(docList.map((path) => ` - ${formatPath(path)}\n`));

  // Create all tasks to be processed
  const allTasks = docList.flatMap((docPath) =>
    locales.map((locale) => async () => {
      appLogger(
        `Translating file: ${formatPath(docPath)} to ${formatLocale(locale)}`
      );

      const absoluteBaseFilePath = join(configuration.content.baseDir, docPath);
      const outputFilePath = getOutputFilePath(
        absoluteBaseFilePath,
        locale,
        baseLocale
      );

      // check if the file exist, otherwise create it
      if (!existsSync(outputFilePath)) {
        appLogger(`File ${outputFilePath} does not exist, creating it...`);
        mkdirSync(dirname(outputFilePath), { recursive: true });
        writeFileSync(outputFilePath, '');
      }

      const fileModificationData = checkFileModifiedRange(outputFilePath, {
        skipIfModifiedBefore,
        skipIfModifiedAfter,
      });

      if (fileModificationData.isSkipped) {
        appLogger(fileModificationData.message);
        return;
      }

      await translateFile(
        absoluteBaseFilePath,
        outputFilePath,
        locale as Locales,
        baseLocale,
        configuration,
        aiOptions,
        customInstructions
      );
    })
  );

  await parallelize(
    allTasks,
    (task) => task(),
    nbSimultaneousFileProcessed ?? 3
  );
};
