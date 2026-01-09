import { mkdirSync, writeFileSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { dirname, relative } from 'node:path';
import { performance } from 'node:perf_hooks';
import { readAsset } from 'utils:asset';
import { formatLocale, formatPath, getChunk } from '@intlayer/chokidar';
import {
  ANSIColors,
  colon,
  colorize,
  colorizeNumber,
  getAppLogger,
  retryManager,
} from '@intlayer/config';
import { chunkText } from '../utils/calculateChunks';
import { chunkInference } from '../utils/chunkInference';
import { fixChunkStartEndChars } from '../utils/fixChunkStartEndChars';
import type { TranslateFileOptions } from './types';
import { sanitizeChunk, validateTranslation } from './validation';

export const translateFile = async ({
  baseFilePath,
  outputFilePath,
  locale,
  baseLocale,
  configuration,
  errorState,
  aiOptions,
  customInstructions,
  aiClient,
  aiConfig,
  flushStrategy = 'incremental',
  onChunkReceive,
}: TranslateFileOptions): Promise<string | null> => {
  if (errorState.shouldStop) return null;

  const appLogger = getAppLogger(configuration, { config: { prefix: '' } });
  const fileStartTime = performance.now();

  try {
    const fileContent = await readFile(baseFilePath, 'utf-8');
    const chunks = chunkText(fileContent);
    const totalChunks = chunks.length;

    // Logging setup
    const filePrefixText = `${ANSIColors.GREY_DARK}[${formatPath(baseFilePath)}${ANSIColors.GREY_DARK}] `;
    const filePrefix = `${colon(filePrefixText, { colSize: 40 })} → ${ANSIColors.RESET}`;
    const prefixText = `${ANSIColors.GREY_DARK}[${formatPath(baseFilePath)}${ANSIColors.GREY_DARK}][${formatLocale(locale)}${ANSIColors.GREY_DARK}] `;
    const prefix = `${colon(prefixText, { colSize: 40 })} → ${ANSIColors.RESET}`;

    appLogger(
      `${filePrefix}Splitted into ${colorizeNumber(totalChunks)} chunks`
    );

    const translatedParts: string[] = [];

    const basePrompt = readAsset('./prompts/TRANSLATE_PROMPT.md', 'utf-8')
      .replaceAll('{{localeName}}', `${formatLocale(locale, false)}`)
      .replaceAll('{{baseLocaleName}}', `${formatLocale(baseLocale, false)}`)
      .replace('{{applicationContext}}', aiOptions?.applicationContext ?? '-')
      .replace('{{customInstructions}}', customInstructions ?? '-');

    for await (const [i, chunk] of chunks.entries()) {
      if (errorState.shouldStop) return null;

      const chunkStartTime = performance.now();
      const isFirstChunk = i === 0;
      const fileToTranslateCurrentChunk = chunk.content;

      const getPrevChunkPrompt = () =>
        `>>> CONTEXT: PREVIOUSLY TRANSLATED <<<\n\`\`\`\n` +
        getChunk(translatedParts.join(''), chunks[i - 1]) +
        `\n\`\`\`\n>>> END PREVIOUS CONTEXT <<<`;

      const getBaseChunkContextPrompt = () =>
        `>>> CONTEXT: NEXT CONTENT <<<\n\`\`\`\n` +
        (chunks[i + 1]?.content ?? '') +
        `\n\`\`\`\n>>> END NEXT CONTEXT <<<`;

      const chunkTranslation = retryManager(async () => {
        const result = await chunkInference(
          [
            { role: 'system', content: basePrompt },
            ...(chunks[i + 1]
              ? [
                  {
                    role: 'system',
                    content: getBaseChunkContextPrompt(),
                  } as const,
                ]
              : []),
            ...(isFirstChunk
              ? []
              : [{ role: 'system', content: getPrevChunkPrompt() } as const]),
            {
              role: 'system',
              content: [
                `You are translating TARGET CHUNK (${i + 1}/${totalChunks}).`,
                `Translate ONLY the target chunk. Preserve frontmatter/code exactly.`,
              ].join('\n'),
            },
            {
              role: 'user',
              content: `>>> TARGET CHUNK START <<<\n${fileToTranslateCurrentChunk}\n>>> TARGET CHUNK END <<<`,
            },
          ],
          aiOptions,
          configuration,
          aiClient,
          aiConfig
        );

        let processedChunk = sanitizeChunk(
          result?.fileContent,
          fileToTranslateCurrentChunk
        );
        processedChunk = fixChunkStartEndChars(
          processedChunk,
          fileToTranslateCurrentChunk
        );
        validateTranslation(
          fileToTranslateCurrentChunk,
          processedChunk,
          appLogger
        );

        return { content: processedChunk, tokens: result.tokenUsed };
      });

      const { content: translatedChunk, tokens } = await chunkTranslation();
      const chunkEndTime = performance.now();
      const chunkDuration = (chunkEndTime - chunkStartTime).toFixed(0);

      translatedParts.push(translatedChunk);

      // 1. Streaming Callback
      if (onChunkReceive) {
        onChunkReceive(translatedChunk, i, totalChunks);
      }

      // 2. File System Flush
      if (flushStrategy === 'incremental') {
        const currentContent = translatedParts.join('');
        mkdirSync(dirname(outputFilePath), { recursive: true });
        writeFileSync(outputFilePath, currentContent);
      }

      appLogger(
        [
          `${prefix}`,
          `${ANSIColors.GREY_DARK}[${i + 1}/${totalChunks}] `,
          `${colorizeNumber(tokens)} tokens used `,
          `${ANSIColors.GREY_DARK}in ${colorizeNumber(chunkDuration)}ms${ANSIColors.RESET}`,
        ].join('')
      );
    }

    if (flushStrategy === 'end') {
      const fullContent = translatedParts.join('');
      mkdirSync(dirname(outputFilePath), { recursive: true });
      writeFileSync(outputFilePath, fullContent);
    }

    const fileEndTime = performance.now();
    const totalDuration = ((fileEndTime - fileStartTime) / 1000).toFixed(2);
    const relativePath = relative(
      configuration.content.baseDir,
      outputFilePath
    );

    appLogger(
      `${colorize('✔', ANSIColors.GREEN)} File ${formatPath(relativePath)} completed in ${colorizeNumber(totalDuration)}s.`
    );

    return translatedParts.join('');
  } catch (error: any) {
    errorState.count++;
    const errorMessage = error?.message ?? JSON.stringify(error);
    appLogger(`${colorize('✖', ANSIColors.RED)} Error: ${errorMessage}`);
    if (errorState.count >= errorState.maxErrors) errorState.shouldStop = true;
    return null;
  }
};
