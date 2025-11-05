import { mkdirSync, writeFileSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { readAsset } from 'utils:asset';
import type { AIOptions } from '@intlayer/api';
import { formatLocale, formatPath } from '@intlayer/chokidar';
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
import { getLocaleName } from '@intlayer/core';
import { type Locale, Locales } from '@intlayer/types';
import {
  buildAlignmentPlan,
  mergeReviewedSegments,
} from './translation-alignment/pipeline';
import { chunkInference } from './utils/chunkInference';
import { fixChunkStartEndChars } from './utils/fixChunkStartEndChars';

/**
 * Review a file using block-aware alignment.
 * This approach:
 * 1. Segments both English and French documents into semantic blocks
 * 2. Aligns blocks using structure (special chars, numbers) and context
 * 3. Detects which blocks changed, were added, or deleted
 * 4. Only sends changed/new blocks to AI for translation
 * 5. Handles reordering automatically
 */
export const reviewFileBlockAware = async (
  baseFilePath: string,
  outputFilePath: string,
  locale: Locale,
  baseLocale: Locale,
  aiOptions?: AIOptions,
  configOptions?: GetConfigurationOptions,
  customInstructions?: string,
  changedLines?: number[]
) => {
  const configuration = getConfiguration(configOptions);
  const applicationLogger = getAppLogger(configuration);

  const englishText = await readFile(baseFilePath, 'utf-8');
  const frenchText = await readFile(outputFilePath, 'utf-8').catch(() => '');

  const basePrompt = readAsset('./prompts/REVIEW_PROMPT.md', 'utf-8')
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

  // Build block-aware alignment and plan
  const { englishBlocks, frenchBlocks, plan, segmentsToReview } =
    buildAlignmentPlan({
      englishText,
      frenchText,
      changedLines,
    });

  applicationLogger(
    `${filePrefix}Block-aware alignment complete. Total blocks: EN=${colorizeNumber(englishBlocks.length)}, FR=${colorizeNumber(frenchBlocks.length)}`
  );
  applicationLogger(
    `${filePrefix}Actions: reuse=${colorizeNumber(plan.actions.filter((a) => a.kind === 'reuse').length)}, review=${colorizeNumber(plan.actions.filter((a) => a.kind === 'review').length)}, new=${colorizeNumber(plan.actions.filter((a) => a.kind === 'insert_new').length)}, delete=${colorizeNumber(plan.actions.filter((a) => a.kind === 'delete').length)}`
  );

  if (segmentsToReview.length === 0) {
    applicationLogger(
      `${filePrefix}No segments need review, reusing existing translation`
    );
    mkdirSync(dirname(outputFilePath), { recursive: true });
    writeFileSync(
      outputFilePath,
      mergeReviewedSegments(plan, frenchBlocks, new Map())
    );
    applicationLogger(
      `${colorize('✔', ANSIColors.GREEN)} File ${formatPath(outputFilePath)} updated successfully (no changes needed).`
    );
    return;
  }

  applicationLogger(
    `${filePrefix}Segments to review: ${colorizeNumber(segmentsToReview.length)}`
  );

  // Review segments that need AI translation
  const reviewedSegmentsMap = new Map<number, string>();

  for (const segment of segmentsToReview) {
    const segmentNumber = segmentsToReview.indexOf(segment) + 1;
    const englishBlock = segment.englishBlock;

    const getBaseChunkContextPrompt = () =>
      `**BLOCK ${segmentNumber} of ${segmentsToReview.length}** is the base block in ${formatLocale(baseLocale, false)} as reference.\n` +
      `///chunksStart///\n` +
      englishBlock.content +
      `///chunksEnd///`;

    const getFrenchChunkPrompt = () =>
      `**BLOCK ${segmentNumber} of ${segmentsToReview.length}** is the current block to review in ${formatLocale(locale, false)}.\n` +
      `///chunksStart///\n` +
      (segment.frenchBlockText ?? '') +
      `///chunksEnd///`;

    const reviewedChunkResult = await retryManager(async () => {
      const result = await chunkInference(
        [
          { role: 'system', content: basePrompt },
          { role: 'system', content: getBaseChunkContextPrompt() },
          { role: 'system', content: getFrenchChunkPrompt() },
          {
            role: 'system',
            content: `The next user message will be the **BLOCK ${colorizeNumber(segmentNumber)} of ${colorizeNumber(segmentsToReview.length)}** that should be translated in ${getLocaleName(locale, Locales.ENGLISH)} (${locale}).`,
          },
          { role: 'user', content: englishBlock.content },
        ],
        aiOptions,
        configuration
      );

      applicationLogger(
        `${prefix}${colorizeNumber(result.tokenUsed)} tokens used - Block ${colorizeNumber(segmentNumber)} of ${colorizeNumber(segmentsToReview.length)}`
      );

      const fixed = fixChunkStartEndChars(
        result?.fileContent,
        englishBlock.content
      );
      return fixed;
    })();

    reviewedSegmentsMap.set(segment.actionIndex, reviewedChunkResult);
  }

  // Merge reviewed segments back into final document
  const finalFrenchOutput = mergeReviewedSegments(
    plan,
    frenchBlocks,
    reviewedSegmentsMap
  );

  mkdirSync(dirname(outputFilePath), { recursive: true });
  writeFileSync(outputFilePath, finalFrenchOutput);

  applicationLogger(
    `${colorize('✔', ANSIColors.GREEN)} File ${formatPath(outputFilePath)} created/updated successfully.`
  );
};
