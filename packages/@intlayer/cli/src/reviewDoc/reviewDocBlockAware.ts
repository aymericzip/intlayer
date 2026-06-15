import { mkdirSync, writeFileSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { readAsset } from 'utils:asset';
import type { AIConfig } from '@intlayer/ai';
import type { AIOptions } from '@intlayer/api';
import {
  buildAlignmentPlan,
  mergeReviewedSegments,
} from '@intlayer/chokidar/docReview';
import { formatLocale, formatPath } from '@intlayer/chokidar/utils';
import * as ANSIColors from '@intlayer/config/colors';
import {
  colon,
  colorize,
  colorizeNumber,
  getAppLogger,
} from '@intlayer/config/logger';
import {
  type GetConfigurationOptions,
  getConfiguration,
} from '@intlayer/config/node';
import { retryManager } from '@intlayer/config/utils';
import { getLocaleName } from '@intlayer/core/localization';
import type { Locale } from '@intlayer/types/allLocales';
import { ENGLISH } from '@intlayer/types/locales';
import { sanitizeChunk, validateTranslation } from '../translateDoc/validation';
import { chunkInference } from '../utils/chunkInference';
import { fixChunkStartEndChars } from '../utils/fixChunkStartEndChars';
import type { AIClient } from '../utils/setupAI';

/**
 * Review a file using block-aware alignment.
 * This approach:
 * 1. Segments both base and target documents into semantic blocks
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
  changedLines?: number[],
  aiClient?: AIClient,
  aiConfig?: AIConfig
) => {
  const configuration = getConfiguration(configOptions);
  const applicationLogger = getAppLogger(configuration);

  const baseText = await readFile(baseFilePath, 'utf-8');
  const targetText = await readFile(outputFilePath, 'utf-8').catch(() => '');

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
  const { baseBlocks, targetBlocks, plan, segmentsToReview } =
    buildAlignmentPlan({
      baseText,
      targetText,
      changedLines,
    });

  applicationLogger(
    `${filePrefix}Block-aware alignment complete. Total blocks: base=${colorizeNumber(baseBlocks.length)}, target=${colorizeNumber(targetBlocks.length)}`
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
      mergeReviewedSegments(plan, targetBlocks, new Map())
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
    const baseBlock = segment.baseBlock;

    const getBaseChunkContextPrompt = () =>
      `**BLOCK ${segmentNumber} of ${segmentsToReview.length}** is the base block in ${formatLocale(baseLocale, false)} as reference.\n` +
      `///chunksStart///\n` +
      baseBlock.content +
      `///chunksEnd///`;

    const getTargetChunkPrompt = () =>
      `**BLOCK ${segmentNumber} of ${segmentsToReview.length}** is the current block to review in ${formatLocale(locale, false)}.\n` +
      `///chunksStart///\n` +
      (segment.targetBlockText ?? '') +
      `///chunksEnd///`;

    const reviewedChunkResult = await retryManager(async () => {
      const result = await chunkInference(
        [
          { role: 'system', content: basePrompt },
          { role: 'system', content: getBaseChunkContextPrompt() },
          { role: 'system', content: getTargetChunkPrompt() },
          {
            role: 'system',
            content: `The next user message will be the **BLOCK ${colorizeNumber(segmentNumber)} of ${colorizeNumber(segmentsToReview.length)}** that should be translated in ${getLocaleName(locale, ENGLISH)} (${locale}).`,
          },
        ],
        [{ role: 'user', content: baseBlock.content }],
        aiOptions,
        configuration,
        aiClient,
        aiConfig
      );

      applicationLogger(
        `${prefix}${colorizeNumber(result.tokenUsed)} tokens used - Block ${colorizeNumber(segmentNumber)} of ${colorizeNumber(segmentsToReview.length)}`
      );

      // Sanitize artifacts (e.g. Markdown code block wrappers)
      let processedChunk = sanitizeChunk(
        result?.fileContent,
        baseBlock.content
      );

      // Fix start/end characters
      processedChunk = fixChunkStartEndChars(processedChunk, baseBlock.content);

      // Validate Translation (YAML, Code fences, Length ratio)
      const isValid = validateTranslation(
        baseBlock.content,
        processedChunk,
        applicationLogger
      );

      if (!isValid) {
        throw new Error(
          'Validation failed for chunk (structure or length mismatch). Retrying...'
        );
      }

      return processedChunk;
    })();

    reviewedSegmentsMap.set(segment.actionIndex, reviewedChunkResult);
  }

  // Merge reviewed segments back into final document
  const finalTargetOutput = mergeReviewedSegments(
    plan,
    targetBlocks,
    reviewedSegmentsMap
  );

  mkdirSync(dirname(outputFilePath), { recursive: true });
  writeFileSync(outputFilePath, finalTargetOutput);

  applicationLogger(
    `${colorize('✔', ANSIColors.GREEN)} File ${formatPath(outputFilePath)} created/updated successfully.`
  );
};
