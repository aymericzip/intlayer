import { mkdirSync, writeFileSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { dirname, relative } from 'node:path';
import { performance } from 'node:perf_hooks';
import { readAsset } from 'utils:asset';
import { formatLocale, formatPath } from '@intlayer/chokidar';
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
  limit, // The Global Limiter
}: TranslateFileOptions): Promise<string | null> => {
  if (errorState.shouldStop) return null;

  const appLogger = getAppLogger(configuration, { config: { prefix: '' } });
  const fileStartTime = performance.now();

  try {
    const fileContent = await readFile(baseFilePath, 'utf-8');
    const chunks = chunkText(fileContent);
    const totalChunks = chunks.length;

    const filePrefixText = `${ANSIColors.GREY_DARK}[${formatPath(baseFilePath)}${ANSIColors.GREY_DARK}] `;
    const filePrefix = `${colon(filePrefixText, { colSize: 40 })}${ANSIColors.RESET}`;
    const prefixText = `${ANSIColors.GREY_DARK}[${formatPath(baseFilePath)}${ANSIColors.GREY_DARK}][${formatLocale(locale)}${ANSIColors.GREY_DARK}] `;
    const prefix = `${colon(prefixText, { colSize: 40 })}${ANSIColors.RESET}`;

    appLogger(
      `${filePrefix}Split into ${colorizeNumber(totalChunks)} chunks. Queuing...`
    );

    const basePrompt = readAsset('./prompts/TRANSLATE_PROMPT.md', 'utf-8')
      .replaceAll('{{localeName}}', `${formatLocale(locale, false)}`)
      .replaceAll('{{baseLocaleName}}', `${formatLocale(baseLocale, false)}`)
      .replace('{{applicationContext}}', aiOptions?.applicationContext ?? '-')
      .replace('{{customInstructions}}', customInstructions ?? '-');

    const translatedParts: string[] = new Array(totalChunks).fill('');

    // Fallback if no limiter is provided (runs immediately)
    const runTask = limit ?? ((fn) => fn());

    // MAP CHUNKS TO GLOBAL TASKS
    // This pushes ALL chunks for this file into the Global Queue immediately.
    // They will execute whenever the global concurrency slots open up.
    const tasks = chunks.map((chunk, i) =>
      runTask(async () => {
        if (errorState.shouldStop) return null;

        const chunkLogger = getAppLogger(configuration, {
          config: {
            prefix: `${prefix}  ${ANSIColors.GREY_DARK}[${i + 1}/${totalChunks}] ${ANSIColors.RESET}`,
          },
        });

        const chunkStartTime = performance.now();
        const isFirstChunk = i === 0;
        const fileToTranslateCurrentChunk = chunk.content;

        // Context Preparation
        const getPrevChunkPrompt = () =>
          `>>> CONTEXT: PREVIOUS SOURCE CONTENT <<<\n\`\`\`\n` +
          (chunks[i - 1]?.content ?? '') +
          `\n\`\`\`\n>>> END PREVIOUS CONTEXT <<<`;

        const getBaseChunkContextPrompt = () =>
          `>>> CONTEXT: NEXT CONTENT <<<\n\`\`\`\n` +
          (chunks[i + 1]?.content ?? '') +
          `\n\`\`\`\n>>> END NEXT CONTEXT <<<`;

        chunkLogger('Process started');

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

          const isValid = validateTranslation(
            fileToTranslateCurrentChunk,
            processedChunk,
            chunkLogger
          );

          if (!isValid) {
            // Throwing an error here signals retryManager to try again
            throw new Error(
              `Validation failed for chunk ${i + 1}/${totalChunks}`
            );
          }

          return { content: processedChunk, tokens: result.tokenUsed };
        });

        const { content: translatedChunk, tokens } = await chunkTranslation();
        const chunkEndTime = performance.now();
        const chunkDuration = (chunkEndTime - chunkStartTime).toFixed(0);

        // Store Result
        translatedParts[i] = translatedChunk;

        if (onChunkReceive) {
          onChunkReceive(translatedChunk, i, totalChunks);
        }

        // Incremental Flush Strategy
        if (flushStrategy === 'incremental') {
          const isContiguous = translatedParts
            .slice(0, i + 1)
            .every((p) => p && p !== '');

          if (isContiguous) {
            let endIdx = 0;
            while (
              endIdx < totalChunks &&
              translatedParts[endIdx] &&
              translatedParts[endIdx] !== ''
            ) {
              endIdx++;
            }
            const currentContent = translatedParts.slice(0, endIdx).join('');
            // Write asynchronously/sync is fine here as node handles file locks reasonably well for single process
            mkdirSync(dirname(outputFilePath), { recursive: true });
            writeFileSync(outputFilePath, currentContent);
          }
        }

        chunkLogger(
          [
            `${colorizeNumber(tokens)} tokens used `,
            `${ANSIColors.GREY_DARK}in ${colorizeNumber(chunkDuration)}ms${ANSIColors.RESET}`,
          ].join('')
        );
      })
    );

    // Wait for all chunks for this specific file/locale to finish
    await Promise.all(tasks);

    // Final Flush
    const fullContent = translatedParts.join('');
    if (flushStrategy === 'end' || flushStrategy === 'incremental') {
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

    return fullContent;
  } catch (error: any) {
    errorState.count++;
    const errorMessage = error?.message ?? JSON.stringify(error);
    appLogger(`${colorize('✖', ANSIColors.RED)} Error: ${errorMessage}`);
    if (errorState.count >= errorState.maxErrors) errorState.shouldStop = true;
    return null;
  }
};
