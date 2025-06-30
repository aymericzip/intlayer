import { AIOptions, getAuthAPI } from '@intlayer/api';
import {
  getAppLogger,
  getConfiguration,
  GetConfigurationOptions,
  Locales,
  retryManager,
} from '@intlayer/config';
import { getLocaleName } from '@intlayer/core';
import fg from 'fast-glob';
import { mkdirSync, writeFileSync } from 'fs';
import { readFile } from 'fs/promises';
import pLimit from 'p-limit';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { chunkText } from './utils/calculateChunks';
import { checkAIAccess } from './utils/checkAIAccess';
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
  filePath: string,
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

    const relativePath = join(configuration.content.baseDir, filePath);

    appLogger(
      `Translating file: ${relativePath} to ${getLocaleName(locale)} (${locale})`
    );

    // Determine the target locale file path
    const localeFilePath = getOutputFilePath(filePath, locale, baseLocale);
    const fileContent = await readFile(relativePath, 'utf-8');
    let fileResultContent = fileContent;

    // Prepare the base prompt for ChatGPT
    const basePrompt = (
      await readFile(join(dir, './prompts/TRANSLATE_PROMPT.md'), 'utf-8')
    )
      .replaceAll('{{locale}}', locale)
      .replaceAll('{{localeName}}', getLocaleName(locale, Locales.ENGLISH))
      .replaceAll('{{baseLocale}}', baseLocale)
      .replaceAll(
        '{{baseLocaleName}}',
        getLocaleName(baseLocale, Locales.ENGLISH)
      )
      .replaceAll(
        '{{applicationContext}}',
        aiOptions?.applicationContext ?? '-'
      )
      .replaceAll('{{customInstructions}}', customInstructions ?? '-');

    // 1. Chunk the file by number of lines instead of characters
    const chunks = chunkText(fileContent);
    appLogger(`Base file splitted into ${chunks.length} chunks`);

    for (let i = 0; i < chunks.length; i++) {
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

      const fileToTranslateCurrentChunk = chunks[i].content;

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
              content: `The next user message will be the **CHUNK ${i + 1} of ${chunks.length}** in ${getLocaleName(baseLocale, Locales.ENGLISH)} (${baseLocale}) to translate in ${getLocaleName(locale)} (${locale}):`,
            },
            { role: 'user', content: fileToTranslateCurrentChunk },
          ],
          aiOptions,
          configOptions,
          oAuth2AccessToken
        );

        const fixedTranslatedChunkResult = fixChunkStartEndChars(
          result,
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
    mkdirSync(dirname(localeFilePath), { recursive: true });
    writeFileSync(localeFilePath, fileResultContent);

    appLogger(`File ${localeFilePath} created/updated successfully.`);
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
}: TranslateDocOptions) => {
  const configuration = getConfiguration(configOptions);
  const appLogger = getAppLogger(configuration);
  const limit = pLimit(nbSimultaneousFileProcessed ?? 3);

  const docList: string[] = fg.sync(docPattern, {
    ignore: excludedGlobPattern,
  });

  checkAIAccess(configuration, aiOptions);

  let oAuth2AccessToken: string | undefined;
  if (configuration.editor.clientId) {
    const intlayerAuthAPI = getAuthAPI(undefined, configuration);
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
      limit(() =>
        translateFile(
          docPath,
          locale as Locales,
          baseLocale,
          aiOptions,
          configOptions,
          oAuth2AccessToken,
          customInstructions
        )
      )
    )
  );

  await Promise.all(tasks);
};
