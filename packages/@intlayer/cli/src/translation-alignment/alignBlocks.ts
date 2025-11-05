import { computeJaccardSimilarity } from './computeSimilarity';
import type { AlignmentPair, FingerprintedBlock } from './types';

export const alignEnglishAndFrenchBlocks = (
  englishBlocks: FingerprintedBlock[],
  frenchBlocks: FingerprintedBlock[]
): AlignmentPair[] => {
  // Needleman–Wunsch style global alignment using anchor similarity and type equality
  const englishLength = englishBlocks.length;
  const frenchLength = frenchBlocks.length;

  const scoreMatrix: number[][] = Array.from(
    { length: englishLength + 1 },
    () => Array.from({ length: frenchLength + 1 }, () => 0)
  );
  const traceMatrix: ('diagonal' | 'up' | 'left')[][] = Array.from(
    { length: englishLength + 1 },
    () => Array.from({ length: frenchLength + 1 }, () => 'diagonal')
  );

  const gapPenalty = -2;

  const computeMatchScore = (
    englishIndex: number,
    frenchIndex: number
  ): number => {
    const englishBlock = englishBlocks[englishIndex];
    const frenchBlock = frenchBlocks[frenchIndex];
    const typeBonus = englishBlock.type === frenchBlock.type ? 2 : 0;
    const anchorSimilarity = computeJaccardSimilarity(
      englishBlock.anchorText,
      frenchBlock.anchorText,
      3
    );
    const lengthRatio =
      Math.min(englishBlock.content.length, frenchBlock.content.length) /
      Math.max(englishBlock.content.length, frenchBlock.content.length);
    const lengthBonus = lengthRatio > 0.75 ? 1 : 0;
    return typeBonus + lengthBonus + anchorSimilarity * 8; // weighted toward anchor similarity
  };

  // initialize first row and column
  for (let i = 1; i <= englishLength; i += 1) {
    scoreMatrix[i][0] = scoreMatrix[i - 1][0] + gapPenalty;
    traceMatrix[i][0] = 'up';
  }
  for (let j = 1; j <= frenchLength; j += 1) {
    scoreMatrix[0][j] = scoreMatrix[0][j - 1] + gapPenalty;
    traceMatrix[0][j] = 'left';
  }

  // fill
  for (let i = 1; i <= englishLength; i += 1) {
    for (let j = 1; j <= frenchLength; j += 1) {
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
  let i = englishLength;
  let j = frenchLength;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && traceMatrix[i][j] === 'diagonal') {
      const englishIndex = i - 1;
      const frenchIndex = j - 1;
      const similarityScore = computeJaccardSimilarity(
        englishBlocks[englishIndex].anchorText,
        frenchBlocks[frenchIndex].anchorText,
        3
      );
      result.unshift({ englishIndex, frenchIndex, similarityScore });
      i -= 1;
      j -= 1;
    } else if (i > 0 && (j === 0 || traceMatrix[i][j] === 'up')) {
      result.unshift({
        englishIndex: i - 1,
        frenchIndex: null,
        similarityScore: 0,
      });
      i -= 1;
    } else if (j > 0 && (i === 0 || traceMatrix[i][j] === 'left')) {
      // french block has no corresponding english block (deleted)
      result.unshift({
        englishIndex: -1,
        frenchIndex: j - 1,
        similarityScore: 0,
      });
      j -= 1;
    }
  }
  return result;
};
