import { AIOptions, getOAuthAPI } from '@intlayer/api';
import { listGitFiles, ListGitFilesOptions } from '@intlayer/chokidar';
import {
  getAppLogger,
  getConfiguration,
  GetConfigurationOptions,
  Locales,
  retryManager,
} from '@intlayer/config';
import { getLocaleName } from '@intlayer/core';
import fg from 'fast-glob';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { readFile } from 'fs/promises';
import pLimit from 'p-limit';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { chunkText } from './utils/calculateChunks';
import { checkAIAccess } from './utils/checkAIAccess';
import { checkFileModifiedRange } from './utils/checkFileModifiedRange';
import { chunkInference } from './utils/chunkInference';
import { fixChunkStartEndChars } from './utils/fixChunkStartEndChars';
import { getChunk } from './utils/getChunk';
import { getOutputFilePath } from './utils/getOutputFilePath';

const isESModule = typeof import.meta.url === 'string';

const dir = isESModule ? dirname(fileURLToPath(import.meta.url)) : __dirname;

/**
 * Translate a single file for a given locale
 */
export const translateFile = async (
  baseFilePath: string,
  outputFilePath: string,
  locale: Locales,
  baseLocale: Locales,
  aiOptions?: AIOptions,
  configOptions?: GetConfigurationOptions,
  oAuth2AccessToken?: string,
  customInstructions?: string
) => {
  try {
    const configuration = getConfiguration(configOptions);
    const appLogger = getAppLogger(configuration);

    // Determine the target locale file path
    const fileContent = await readFile(baseFilePath, 'utf-8');
    let fileResultContent = fileContent;

    // Prepare the base prompt for ChatGPT
    const basePrompt = (
      await readFile(join(dir, './prompts/TRANSLATE_PROMPT.md'), 'utf-8')
    )
      .replaceAll(
        '{{localeName}}',
        `${getLocaleName(locale, Locales.ENGLISH)} (${locale})`
      )
      .replaceAll(
        '{{baseLocaleName}}',
        `${getLocaleName(baseLocale, Locales.ENGLISH)} (${baseLocale})`
      )
      .replace('{{applicationContext}}', aiOptions?.applicationContext ?? '-')
      .replace('{{customInstructions}}', customInstructions ?? '-');

    // 1. Chunk the file by number of lines instead of characters
    const chunks = chunkText(fileContent);
    appLogger(`Base file splitted into ${chunks.length} chunks`);

    for await (const [i, chunk] of chunks.entries()) {
      const isFirstChunk = i === 0;

      // Build the chunk-specific prompt
      const getPrevChunkPrompt = () =>
        `**CHUNK ${i} of ${chunks.length}** that has been translated in ${getLocaleName(locale, Locales.ENGLISH)} (${locale}):\n` +
        `///chunkStart///` +
        getChunk(fileResultContent, chunks[i - 1]) +
        `///chunkEnd///`;

      const getBaseChunkContextPrompt = () =>
        `**CHUNK ${i + 1} to ${Math.min(i + 3, chunks.length)} of ${chunks.length}** is the base chunk in ${getLocaleName(baseLocale, Locales.ENGLISH)} (${baseLocale}) as reference.\n` +
        `///chunksStart///` +
        (chunks[i - 1]?.content ?? '') +
        chunks[i].content +
        (chunks[i + 1]?.content ?? '') +
        `///chunksEnd///`;

      const fileToTranslateCurrentChunk = chunk.content;

      // Make the actual translation call
      let chunkTranslation = await retryManager(async () => {
        const result = await chunkInference(
          [
            { role: 'system', content: basePrompt },

            { role: 'system', content: getBaseChunkContextPrompt() },
            ...(isFirstChunk
              ? []
              : [{ role: 'system', content: getPrevChunkPrompt() } as const]),
            {
              role: 'system',
              content: `The next user message will be the **CHUNK ${i + 1} of ${chunks.length}** in ${getLocaleName(baseLocale, Locales.ENGLISH)} (${baseLocale}) to translate in ${getLocaleName(locale, Locales.ENGLISH)} (${locale}):`,
            },
            { role: 'user', content: fileToTranslateCurrentChunk },
          ],
          aiOptions,
          oAuth2AccessToken
        );

        appLogger(
          ` -> ${result.tokenUsed} tokens used - CHUNK ${i + 1} of ${chunks.length}`
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

    appLogger(`File ${outputFilePath} created/updated successfully.`);
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

  const limit = pLimit(nbSimultaneousFileProcessed ?? 3);

  let docList: string[] = fg.sync(docPattern, {
    ignore: excludedGlobPattern,
  });

  checkAIAccess(configuration, aiOptions);

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

  let oAuth2AccessToken: string | undefined;
  if (configuration.editor.clientId) {
    const intlayerAuthAPI = getOAuthAPI(configuration);
    const oAuth2TokenResult = await intlayerAuthAPI.getOAuth2AccessToken();

    oAuth2AccessToken = oAuth2TokenResult.data?.accessToken;
  }

  appLogger(`Base locale is ${getLocaleName(baseLocale)} (${baseLocale})`);
  appLogger(
    `Translating ${locales.length} locales: [ ${locales
      .map((locale) => `${getLocaleName(locale, baseLocale)} (${locale})`)
      .join(', ')} ]`
  );

  appLogger(`Translating ${docList.length} files:`);
  appLogger(docList.map((path) => ` - ${path}\n`));

  const tasks = docList.map((docPath) =>
    locales.flatMap((locale) =>
      limit(async () => {
        appLogger(
          `Translating file: ${docPath} to ${getLocaleName(
            locale,
            Locales.ENGLISH
          )} (${locale})`
        );

        const absoluteBaseFilePath = join(
          configuration.content.baseDir,
          docPath
        );
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
          aiOptions,
          configOptions,
          oAuth2AccessToken,
          customInstructions
        );
      })
    )
  );

  await Promise.all(tasks);
};
