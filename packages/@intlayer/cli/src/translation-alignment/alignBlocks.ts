import { computeJaccardSimilarity } from './computeSimilarity';
import type { AlignmentPair, FingerprintedBlock } from './types';

export const alignEnglishAndFrenchBlocks = (
  defaultBlocks: FingerprintedBlock[],
  secondaryBlocks: FingerprintedBlock[]
): AlignmentPair[] => {
  // Needleman–Wunsch style global alignment using anchor similarity and type equality
  const defaultLength = defaultBlocks.length;
  const secondaryLength = secondaryBlocks.length;

  const scoreMatrix: number[][] = Array.from(
    { length: defaultLength + 1 },
    () => Array.from({ length: secondaryLength + 1 }, () => 0)
  );
  const traceMatrix: ('diagonal' | 'up' | 'left')[][] = Array.from(
    { length: defaultLength + 1 },
    () => Array.from({ length: secondaryLength + 1 }, () => 'diagonal')
  );

  const gapPenalty = -2;

  const computeMatchScore = (
    defaultIndex: number,
    secondaryIndex: number
  ): number => {
    const defaultBlock = defaultBlocks[defaultIndex];
    const secondaryBlock = secondaryBlocks[secondaryIndex];
    const typeBonus = defaultBlock.type === secondaryBlock.type ? 2 : 0;
    const anchorSimilarity = computeJaccardSimilarity(
      defaultBlock.anchorText,
      secondaryBlock.anchorText,
      3
    );
    const lengthRatio =
      Math.min(defaultBlock.content.length, secondaryBlock.content.length) /
      Math.max(defaultBlock.content.length, secondaryBlock.content.length);
    const lengthBonus = lengthRatio > 0.75 ? 1 : 0;
    return typeBonus + lengthBonus + anchorSimilarity * 8; // weighted toward anchor similarity
  };

  // initialize first row and column
  for (let i = 1; i <= defaultLength; i += 1) {
    scoreMatrix[i][0] = scoreMatrix[i - 1][0] + gapPenalty;
    traceMatrix[i][0] = 'up';
  }
  for (let j = 1; j <= secondaryLength; j += 1) {
    scoreMatrix[0][j] = scoreMatrix[0][j - 1] + gapPenalty;
    traceMatrix[0][j] = 'left';
  }

  // fill
  for (let i = 1; i <= defaultLength; i += 1) {
    for (let j = 1; j <= secondaryLength; j += 1) {
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
  let i = defaultLength;
  let j = secondaryLength;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && traceMatrix[i][j] === 'diagonal') {
      const englishIndex = i - 1;
      const frenchIndex = j - 1;
      const similarityScore = computeJaccardSimilarity(
        defaultBlocks[englishIndex].anchorText,
        secondaryBlocks[frenchIndex].anchorText,
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
