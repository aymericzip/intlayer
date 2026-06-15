import { alignBaseAndTargetBlocks } from './alignBlocks';
import { fingerprintBlock } from './fingerprintBlock';
import { mapChangedLinesToBlocks } from './mapChangedLinesToBlocks';
import { normalizeBlock } from './normalizeBlock';
import {
  identifySegmentsToReview,
  mergeReviewedSegments,
  type SegmentToReview,
} from './rebuildDocument';
import { segmentDocument, segmentSections } from './segmentDocument';
import type { Block, FingerprintedBlock, PlannedAction } from './types';

export type BuildAlignmentPlanInput = {
  /** The base (source) document, used as the translation reference. */
  baseText: string;
  /** The existing target (translated) document, possibly empty. */
  targetText: string;
  /** 1-based line numbers that changed in the base document, when known. */
  changedLines: number[] | undefined;
};

export type BuildAlignmentPlanOutput = {
  baseBlocks: FingerprintedBlock[];
  targetBlocks: FingerprintedBlock[];
  plan: AlignmentPlan;
  segmentsToReview: SegmentToReview[];
};

/** Fingerprint a list of already-segmented blocks (context = neighbours). */
const fingerprintBlockList = (blocks: Block[]): FingerprintedBlock[] => {
  const normalized = blocks.map(normalizeBlock);

  return normalized.map((block, index, array) =>
    fingerprintBlock(block, array[index - 1] ?? null, array[index + 1] ?? null)
  );
};

/**
 * Re-segment a section's own text into fine blocks, shifting their relative line
 * numbers back to absolute document positions so changed-line mapping and the
 * review report keep reporting real file coordinates.
 */
const fingerprintSectionFineBlocks = (section: Block): FingerprintedBlock[] => {
  const lineOffset = section.lineStart - 1;

  const fineBlocks = segmentDocument(section.content).map(
    (block): Block => ({
      ...block,
      lineStart: block.lineStart + lineOffset,
      lineEnd: block.lineEnd + lineOffset,
    })
  );

  return fingerprintBlockList(fineBlocks);
};

/**
 * Build the block-aware alignment plan between a base document and its
 * translation, in two levels.
 *
 * 1. **Sections** (heading-anchored) are aligned first. Because a document and
 *    its translation share the same heading structure, this alignment is robust
 *    and never drops a section just because the prose was split into a different
 *    number of paragraphs.
 * 2. Only the sections **touched by a changed line** are then re-segmented into
 *    fine blocks (paragraphs, code fences) and aligned within the section, so a
 *    small edit re-translates only the affected paragraph(s) instead of the
 *    whole section. Within a changed section a target block with no base
 *    counterpart is **kept as-is** (reused) rather than deleted, so a translation
 *    that has extra paragraphs never loses content.
 *
 * Section-level insertions and deletions stay whole: a brand-new section is
 * translated as one unit, and a target section with no base counterpart is
 * reported as `delete` for visibility but never dropped by the merge (see
 * {@link mergeReviewedSegments}), so a review can never lose translated content.
 *
 * @param input - The base/target texts and optional changed lines.
 * @returns The (flattened) blocks, the plan, and the segments that need translation.
 */
export const buildAlignmentPlan = ({
  baseText,
  targetText,
  changedLines,
}: BuildAlignmentPlanInput): BuildAlignmentPlanOutput => {
  const changedLineNumbers = Array.isArray(changedLines) ? changedLines : [];

  const baseSections = fingerprintBlockList(segmentSections(baseText));
  const targetSections = fingerprintBlockList(segmentSections(targetText));

  const sectionAlignment = alignBaseAndTargetBlocks(
    baseSections,
    targetSections
  );
  const changedSectionIndexes = mapChangedLinesToBlocks(
    baseSections,
    changedLineNumbers
  );

  // Flattened blocks the plan refers to by index. Reused/deleted/inserted
  // sections contribute their whole-section block; changed sections contribute
  // their fine sub-blocks.
  const baseBlocks: FingerprintedBlock[] = [];
  const targetBlocks: FingerprintedBlock[] = [];
  const actions: PlannedAction[] = [];

  const pushBaseBlock = (block: FingerprintedBlock): number =>
    baseBlocks.push(block) - 1;
  const pushTargetBlock = (block: FingerprintedBlock): number =>
    targetBlocks.push(block) - 1;

  for (const pair of sectionAlignment) {
    // Section present only in the target → reported as `delete` for visibility,
    // but kept verbatim by the merge (the aligner may simply have failed to
    // follow a reordered section), never silently dropped.
    if (pair.baseIndex === -1 && pair.targetIndex !== null) {
      const targetIndex = pushTargetBlock(targetSections[pair.targetIndex]!);
      actions.push({ kind: 'delete', targetIndex });
      continue;
    }

    // Section present only in the base → brand new, translate as one unit.
    if (pair.baseIndex >= 0 && pair.targetIndex === null) {
      const baseIndex = pushBaseBlock(baseSections[pair.baseIndex]!);
      actions.push({ kind: 'insert_new', baseIndex });
      continue;
    }

    if (pair.baseIndex < 0 || pair.targetIndex === null) continue;

    const baseSection = baseSections[pair.baseIndex]!;
    const targetSection = targetSections[pair.targetIndex]!;

    // Unchanged section → reuse the existing translation verbatim.
    if (!changedSectionIndexes.has(pair.baseIndex)) {
      const baseIndex = pushBaseBlock(baseSection);
      const targetIndex = pushTargetBlock(targetSection);
      actions.push({ kind: 'reuse', baseIndex, targetIndex });
      continue;
    }

    // Changed section → align its fine blocks and review only what changed.
    const baseFineBlocks = fingerprintSectionFineBlocks(baseSection);
    const targetFineBlocks = fingerprintSectionFineBlocks(targetSection);
    const fineAlignment = alignBaseAndTargetBlocks(
      baseFineBlocks,
      targetFineBlocks
    );
    const changedFineIndexes = mapChangedLinesToBlocks(
      baseFineBlocks,
      changedLineNumbers
    );

    for (const finePair of fineAlignment) {
      // Target-only fine block: keep it (no data loss), do not delete.
      if (finePair.baseIndex === -1 && finePair.targetIndex !== null) {
        const targetIndex = pushTargetBlock(
          targetFineBlocks[finePair.targetIndex]!
        );
        actions.push({ kind: 'reuse', baseIndex: -1, targetIndex });
        continue;
      }

      // Base-only fine block: a new paragraph inside the section, translate it.
      if (finePair.baseIndex >= 0 && finePair.targetIndex === null) {
        const baseIndex = pushBaseBlock(baseFineBlocks[finePair.baseIndex]!);
        actions.push({ kind: 'insert_new', baseIndex });
        continue;
      }

      if (finePair.baseIndex < 0 || finePair.targetIndex === null) continue;

      const baseIndex = pushBaseBlock(baseFineBlocks[finePair.baseIndex]!);
      const targetIndex = pushTargetBlock(
        targetFineBlocks[finePair.targetIndex]!
      );

      actions.push(
        changedFineIndexes.has(finePair.baseIndex)
          ? { kind: 'review', baseIndex, targetIndex }
          : { kind: 'reuse', baseIndex, targetIndex }
      );
    }
  }

  const plan = { actions };

  const { segmentsToReview } = identifySegmentsToReview({
    baseBlocks,
    targetBlocks,
    plan,
  });

  return { baseBlocks, targetBlocks, plan, segmentsToReview };
};

export type { SegmentToReview };
export { mergeReviewedSegments };
