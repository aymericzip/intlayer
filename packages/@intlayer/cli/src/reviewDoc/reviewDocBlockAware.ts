import { mkdirSync, writeFileSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { readAsset } from 'utils:asset';
import type { AIConfig } from '@intlayer/ai';
import type { AIOptions } from '@intlayer/api';
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
import {
  buildAlignmentPlan,
  mergeReviewedSegments,
} from '@intlayer/engine/docReview';
import { formatLocale, formatPath } from '@intlayer/engine/utils';
import type { Locale } from '@intlayer/types/allLocales';
import { ENGLISH } from '@intlayer/types/locales';
import { sanitizeChunk, validateTranslation } from '../translateDoc/validation';
import { chunkInference } from '../utils/chunkInference';
import { fixChunkStartEndChars } from '../utils/fixChunkStartEndChars';
import type { AIClient } from '../utils/setupAI';

/**
 * Review a file using block-aware alignment.
 *
 * 1. Segments both base and target documents into semantic blocks.
 * 2. Aligns blocks using structure (special chars, numbers) and context.
 * 3. Detects which blocks changed, were added, or deleted.
 * 4. Applies deletions immediately without AI.
 * 5. Sends changed/new blocks to AI in bottom-up order (last block first), so
 *    line numbers of earlier blocks are not shifted by edits below them.
 * 6. Rewrites the file after each block so progress is persisted incrementally.
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
  const applicationLogger = getAppLogger({
    log: { ...configuration.log, prefix: '' },
  });

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

  const deleteCount = plan.actions.filter((a) => a.kind === 'delete').length;

  applicationLogger(
    `${filePrefix}Block-aware alignment complete. Total blocks: base=${colorizeNumber(baseBlocks.length)}, target=${colorizeNumber(targetBlocks.length)}`
  );
  applicationLogger(
    `${filePrefix}Actions: reuse=${colorizeNumber(plan.actions.filter((a) => a.kind === 'reuse').length)}, review=${colorizeNumber(plan.actions.filter((a) => a.kind === 'review').length)}, new=${colorizeNumber(plan.actions.filter((a) => a.kind === 'insert_new').length)}, delete=${colorizeNumber(deleteCount)}`
  );

  // Map shared across the entire run: each entry overrides the default behavior
  // of mergeReviewedSegments for that action index.
  const reviewedSegmentsMap = new Map<number, string>();

  // --- Step 1: apply deletions immediately (no AI needed) ---
  for (const [actionIndex, action] of plan.actions.entries()) {
    if (action.kind === 'delete') {
      reviewedSegmentsMap.set(actionIndex, '');
    }
  }

  const writeCurrentState = (): void => {
    const output = mergeReviewedSegments(
      plan,
      targetBlocks,
      reviewedSegmentsMap
    );
    mkdirSync(dirname(outputFilePath), { recursive: true });
    writeFileSync(outputFilePath, output);
  };

  if (deleteCount > 0) {
    writeCurrentState();
    applicationLogger(
      `${filePrefix}${colorizeNumber(deleteCount)} block(s) deleted without AI.`
    );
  }

  if (segmentsToReview.length === 0) {
    if (deleteCount === 0) {
      applicationLogger(
        `${filePrefix}No segments need review, reusing existing translation`
      );
      writeCurrentState();
    }
    applicationLogger(
      `${colorize('✔', ANSIColors.GREEN)} File ${formatPath(outputFilePath)} updated successfully (no AI changes needed).`
    );
    return;
  }

  applicationLogger(
    `${filePrefix}Segments to review: ${colorizeNumber(segmentsToReview.length)} (processing bottom-up)`
  );

  // --- Step 2: process AI segments in bottom-up order ---
  // Reversing ensures edits near the end of the file don't shift line numbers
  // that matter for blocks higher up, and each intermediate file write is valid.
  const segmentsBottomUp = segmentsToReview
    .map((segment, originalIndex) => ({
      segment,
      displayNumber: originalIndex + 1,
    }))
    .reverse();

  for (const { segment, displayNumber } of segmentsBottomUp) {
    const baseBlock = segment.baseBlock;

    const getBaseChunkContextPrompt = () =>
      `**BLOCK ${displayNumber} of ${segmentsToReview.length}** is the base block in ${formatLocale(baseLocale, false)} as reference.\n` +
      `///chunksStart///\n` +
      baseBlock.content +
      `///chunksEnd///`;

    const getTargetChunkPrompt = () =>
      `**BLOCK ${displayNumber} of ${segmentsToReview.length}** is the current block to review in ${formatLocale(locale, false)}.\n` +
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
            content: `The next user message will be the **BLOCK ${colorizeNumber(displayNumber)} of ${colorizeNumber(segmentsToReview.length)}** that should be translated in ${getLocaleName(locale, ENGLISH)} (${locale}).`,
          },
        ],
        [{ role: 'user', content: baseBlock.content }],
        aiOptions,
        configuration,
        aiClient,
        aiConfig
      );

      applicationLogger(
        `${prefix}${colorizeNumber(result.tokenUsed)} tokens used - Block ${colorizeNumber(displayNumber)} of ${colorizeNumber(segmentsToReview.length)}`
      );

      let processedChunk = sanitizeChunk(
        result?.fileContent,
        baseBlock.content
      );
      processedChunk = fixChunkStartEndChars(processedChunk, baseBlock.content);

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

    // Rewrite the file after every block so progress is never lost.
    writeCurrentState();
  }

  applicationLogger(
    `${colorize('✔', ANSIColors.GREEN)} File ${formatPath(outputFilePath)} created/updated successfully.`
  );
};
