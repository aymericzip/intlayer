import { computeJaccardSimilarity } from './computeSimilarity';
import type { AlignmentPair, FingerprintedBlock } from './types';

/** Cost of leaving a block unaligned (an insertion or a deletion). */
const GAP_PENALTY = -2;

/**
 * Score of a pair that structural evidence rules out.
 *
 * Strictly below the cost of two gaps (`2 * GAP_PENALTY`) so the aligner always
 * prefers reporting an insertion plus a deletion over such a pair. Every other
 * score is positive, which means that without an explicit veto the aligner would
 * rather pair two unrelated blocks than leave them unaligned — and a bogus pair
 * is planned as `reuse`, which keeps the stale translation verbatim *and*
 * inserts the freshly translated base block next to it, producing the duplicated
 * headings this penalty exists to prevent.
 */
const STRUCTURAL_MISMATCH_PENALTY = GAP_PENALTY * 2 - 1;

/** Reward for two blocks opened by a heading of the very same depth. */
const HEADING_DEPTH_MATCH_BONUS = 3;

/** Minimum length ratio for the (small) "comparable size" reward. */
const COMPARABLE_LENGTH_RATIO = 0.75;

/**
 * Body length from which a section is considered to carry content of its own.
 *
 * Kept above a single sentence so a translator's short lead-in paragraph is not
 * mistaken for a whole section body.
 */
const SUBSTANTIAL_BODY_LENGTH = 80;

/**
 * Length of the body a block carries below its opening heading.
 *
 * A section that only holds its heading (because subsections carry all of its
 * content) is structurally different from one that holds a full body, and that
 * difference survives translation.
 *
 * @param block - The block to measure.
 * @returns The trimmed length of everything below the opening heading line.
 */
const measureBodyLength = (block: FingerprintedBlock): number => {
  if (block.headingDepth === null) return block.content.trim().length;

  const [, ...bodyLines] = block.content.split('\n');

  return bodyLines.join('\n').trim().length;
};

/**
 * Align the blocks of a base document with the blocks of its translation using a
 * Needleman–Wunsch global alignment over heading depth, anchor similarity and
 * block type.
 *
 * Because prose differs across languages, the score is weighted toward the
 * structural signals — heading depth first, then the anchor (digits and symbols)
 * — rather than the words themselves.
 *
 * @param baseBlocks - Blocks of the base (source) document.
 * @param targetBlocks - Blocks of the target (translated) document.
 * @returns The ordered list of alignment pairs, including insertions and deletions.
 */
export const alignBaseAndTargetBlocks = (
  baseBlocks: FingerprintedBlock[],
  targetBlocks: FingerprintedBlock[]
): AlignmentPair[] => {
  const baseLength = baseBlocks.length;
  const targetLength = targetBlocks.length;

  const scoreMatrix: number[][] = Array.from({ length: baseLength + 1 }, () =>
    Array.from({ length: targetLength + 1 }, () => 0)
  );
  const traceMatrix: ('diagonal' | 'up' | 'left')[][] = Array.from(
    { length: baseLength + 1 },
    () => Array.from({ length: targetLength + 1 }, () => 'diagonal')
  );

  const computeMatchScore = (
    baseIndex: number,
    targetIndex: number
  ): number => {
    const baseBlock = baseBlocks[baseIndex]!;
    const targetBlock = targetBlocks[targetIndex]!;

    // Translating a document never changes its heading depths, so two headings
    // of different depths cannot be counterparts, however similar their content.
    const hasComparableHeadingDepths =
      baseBlock.headingDepth !== null && targetBlock.headingDepth !== null;

    if (
      hasComparableHeadingDepths &&
      baseBlock.headingDepth !== targetBlock.headingDepth
    ) {
      return STRUCTURAL_MISMATCH_PENALTY;
    }

    // A section reduced to its bare heading (its content living in subsections)
    // is not the translation of a section holding a full body. Pairing them
    // reuses that whole body while the base heading is translated again right
    // next to it — which is exactly how a duplicated heading appears.
    const baseBodyLength = measureBodyLength(baseBlock);
    const targetBodyLength = measureBodyLength(targetBlock);
    const isBodyPresenceMismatched =
      (baseBodyLength === 0 && targetBodyLength >= SUBSTANTIAL_BODY_LENGTH) ||
      (targetBodyLength === 0 && baseBodyLength >= SUBSTANTIAL_BODY_LENGTH);

    if (isBodyPresenceMismatched) return STRUCTURAL_MISMATCH_PENALTY;

    const lengthRatio =
      Math.min(baseBlock.content.length, targetBlock.content.length) /
      Math.max(baseBlock.content.length, targetBlock.content.length);

    const headingDepthBonus = hasComparableHeadingDepths
      ? HEADING_DEPTH_MATCH_BONUS
      : 0;
    const typeBonus = baseBlock.type === targetBlock.type ? 2 : 0;
    const anchorSimilarity = computeJaccardSimilarity(
      baseBlock.anchorText,
      targetBlock.anchorText,
      3
    );
    const lengthBonus = lengthRatio > COMPARABLE_LENGTH_RATIO ? 1 : 0;

    // weighted toward the structural signals (heading depth, then anchor)
    return headingDepthBonus + typeBonus + lengthBonus + anchorSimilarity * 8;
  };

  // initialize first row and column
  for (let i = 1; i <= baseLength; i += 1) {
    scoreMatrix[i][0] = scoreMatrix[i - 1][0] + GAP_PENALTY;
    traceMatrix[i][0] = 'up';
  }
  for (let j = 1; j <= targetLength; j += 1) {
    scoreMatrix[0][j] = scoreMatrix[0][j - 1] + GAP_PENALTY;
    traceMatrix[0][j] = 'left';
  }

  // fill
  for (let i = 1; i <= baseLength; i += 1) {
    for (let j = 1; j <= targetLength; j += 1) {
      const match = scoreMatrix[i - 1][j - 1] + computeMatchScore(i - 1, j - 1);
      const deleteGap = scoreMatrix[i - 1][j] + GAP_PENALTY;
      const insertGap = scoreMatrix[i][j - 1] + GAP_PENALTY;

      const best = Math.max(match, deleteGap, insertGap);
      scoreMatrix[i][j] = best;
      traceMatrix[i][j] =
        best === match ? 'diagonal' : best === deleteGap ? 'up' : 'left';
    }
  }

  // traceback
  const result: AlignmentPair[] = [];
  let i = baseLength;
  let j = targetLength;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && traceMatrix[i][j] === 'diagonal') {
      const baseIndex = i - 1;
      const targetIndex = j - 1;
      const similarityScore = computeJaccardSimilarity(
        baseBlocks[baseIndex].anchorText,
        targetBlocks[targetIndex].anchorText,
        3
      );
      result.unshift({ baseIndex, targetIndex, similarityScore });
      i -= 1;
      j -= 1;
    } else if (i > 0 && (j === 0 || traceMatrix[i][j] === 'up')) {
      result.unshift({
        baseIndex: i - 1,
        targetIndex: null,
        similarityScore: 0,
      });
      i -= 1;
    } else if (j > 0 && (i === 0 || traceMatrix[i][j] === 'left')) {
      // target block has no corresponding base block (deleted)
      result.unshift({
        baseIndex: -1,
        targetIndex: j - 1,
        similarityScore: 0,
      });
      j -= 1;
    }
  }
  return result;
};
