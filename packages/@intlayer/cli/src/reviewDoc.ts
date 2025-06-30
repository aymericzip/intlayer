import { AIOptions, getAuthAPI } from '@intlayer/api'; // Importing only getAiAPI for now
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
export const reviewFile = async (
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
      `Auditing file: ${relativePath} in ${getLocaleName(locale)} (${locale})`
    );

    const localeFilePath = getOutputFilePath(filePath, locale, baseLocale);
    const basedFileContent = await readFile(relativePath, 'utf-8');
    const fileToReviewContent = await readFile(localeFilePath, 'utf-8');

    let updatedFileContent = fileToReviewContent;
    let fileResultContent = '';

    // Prepare the base prompt for ChatGPT
    const basePrompt = (
      await readFile(join(dir, './prompts/REVIEW_PROMPT.md'), 'utf-8')
    )
      .replaceAll('{{locale}}', locale)
      .replaceAll('{{localeName}}', getLocaleName(locale))
      .replaceAll('{{baseLocale}}', baseLocale)
      .replaceAll('{{baseLocaleName}}', getLocaleName(baseLocale))
      .replaceAll(
        '{{applicationContext}}',
        aiOptions?.applicationContext ?? '-'
      )
      .replaceAll('{{customInstructions}}', customInstructions ?? '-');

    const baseChunks = chunkText(basedFileContent, 800, 0);

    appLogger(` Base file splitted into ${baseChunks.length} chunks`);

    for (let i = 0; i < baseChunks.length; i++) {
      const baseChunkContext = baseChunks[i];

      const getBaseChunkContextPrompt = () =>
        `**CHUNK ${i + 1} to ${Math.min(i + 3, baseChunks.length)} of ${baseChunks.length}** is the base chunk in ${getLocaleName(baseLocale, Locales.ENGLISH)} (${baseLocale}) as reference.\n` +
        `///chunksStart///` +
        (baseChunks[i - 1]?.content ?? '') +
        baseChunkContext.content +
        (baseChunks[i + 1]?.content ?? '') +
        `///chunksEnd///`;

      const getChunkToReviewPrompt = () =>
        `**CHUNK ${i + 1} to ${Math.min(i + 3, baseChunks.length)} of ${baseChunks.length}** is the current chunk to review in ${getLocaleName(locale, Locales.ENGLISH)} (${locale}) as reference.\n` +
        `///chunksStart///` +
        getChunk(updatedFileContent, {
          lineStart: baseChunks[i - 1]?.lineStart ?? 0,
          lineLength:
            (baseChunks[i - 1]?.lineLength ?? 0) +
            baseChunkContext.lineLength +
            (baseChunks[i + 1]?.lineLength ?? 0),
        }) +
        `///chunksEnd///`;

      // Make the actual translation call
      let reviewedChunkResult = await retryManager(async () => {
        const result = await chunkInference(
          [
            { role: 'system', content: basePrompt },
            { role: 'system', content: getBaseChunkContextPrompt() },
            { role: 'system', content: getChunkToReviewPrompt() },
            {
              role: 'system',
              content: `The next user message will be the **CHUNK ${i + 1} of ${baseChunks.length}** that should be translated in ${getLocaleName(locale, Locales.ENGLISH)} (${locale}).`,
            },
            { role: 'user', content: baseChunkContext.content },
          ],
          aiOptions,
          configOptions,
          oAuth2AccessToken
        );

        const fixedReviewedChunkResult = fixChunkStartEndChars(
          result,
          baseChunkContext.content
        );

        return fixedReviewedChunkResult;
      })();

      updatedFileContent = updatedFileContent.replace(
        baseChunkContext.content,
        reviewedChunkResult
      );

      fileResultContent += reviewedChunkResult;
    }

    mkdirSync(dirname(localeFilePath), { recursive: true });
    writeFileSync(localeFilePath, fileResultContent);

    appLogger(` File ${localeFilePath} created/updated successfully.`);
  } catch (error) {
    console.error(error);
  }
};

type ReviewDocOptions = {
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
 * Main audit function: scans all .md files in "en/" (unless you specified DOC_LIST),
 * then audits them to each locale in LOCALE_LIST.
 */
export const reviewDoc = async ({
  docPattern,
  locales,
  excludedGlobPattern,
  baseLocale,
  aiOptions,
  nbSimultaneousFileProcessed,
  configOptions,
  customInstructions,
}: ReviewDocOptions) => {
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

  appLogger(
    `Base locale is ${getLocaleName(baseLocale, Locales.ENGLISH)} (${baseLocale})`
  );
  appLogger(
    `Reviewing ${locales.length} locales: [ ${locales
      .map((locale) => `${getLocaleName(locale, Locales.ENGLISH)} (${locale})`)
      .join(', ')} ]`
  );
  appLogger(`Reviewing ${docList.length} files:`);
  appLogger(docList.map((path) => ` - ${path}\n`));

  const tasks = docList.map((docPath) =>
    locales.flatMap((locale) =>
      limit(() =>
        reviewFile(
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
