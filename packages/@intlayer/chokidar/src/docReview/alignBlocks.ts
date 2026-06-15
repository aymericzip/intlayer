import { computeJaccardSimilarity } from './computeSimilarity';
import type { AlignmentPair, FingerprintedBlock } from './types';

/**
 * Align the blocks of a base document with the blocks of its translation using a
 * Needleman–Wunsch global alignment over anchor similarity and block type.
 *
 * Because prose differs across languages, the score is weighted toward the
 * structural anchor (digits and symbols) rather than the words themselves.
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

  const gapPenalty = -2;

  const computeMatchScore = (
    baseIndex: number,
    targetIndex: number
  ): number => {
    const baseBlock = baseBlocks[baseIndex];
    const targetBlock = targetBlocks[targetIndex];
    const typeBonus = baseBlock.type === targetBlock.type ? 2 : 0;
    const anchorSimilarity = computeJaccardSimilarity(
      baseBlock.anchorText,
      targetBlock.anchorText,
      3
    );
    const lengthRatio =
      Math.min(baseBlock.content.length, targetBlock.content.length) /
      Math.max(baseBlock.content.length, targetBlock.content.length);
    const lengthBonus = lengthRatio > 0.75 ? 1 : 0;
    return typeBonus + lengthBonus + anchorSimilarity * 8; // weighted toward anchor similarity
  };

  // initialize first row and column
  for (let i = 1; i <= baseLength; i += 1) {
    scoreMatrix[i][0] = scoreMatrix[i - 1][0] + gapPenalty;
    traceMatrix[i][0] = 'up';
  }
  for (let j = 1; j <= targetLength; j += 1) {
    scoreMatrix[0][j] = scoreMatrix[0][j - 1] + gapPenalty;
    traceMatrix[0][j] = 'left';
  }

  // fill
  for (let i = 1; i <= baseLength; i += 1) {
    for (let j = 1; j <= targetLength; j += 1) {
      const match = scoreMatrix[i - 1][j - 1] + computeMatchScore(i - 1, j - 1);
      const deleteGap = scoreMatrix[i - 1][j] + gapPenalty;
      const insertGap = scoreMatrix[i][j - 1] + gapPenalty;

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
