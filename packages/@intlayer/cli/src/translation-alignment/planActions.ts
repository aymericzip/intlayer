import type {
  AlignmentPair,
  AlignmentPlan,
  PlannedAction,
  SimilarityOptions,
} from './types';

export const planAlignmentActions = (
  alignment: AlignmentPair[],
  changedEnglishBlockIndexes: Set<number>,
  similarityOptions: SimilarityOptions
): AlignmentPlan => {
  const actions: PlannedAction[] = [];
  const seenFrench = new Set<number>();

  alignment.forEach((pair) => {
    const englishIndex = pair.englishIndex;
    const frenchIndex = pair.frenchIndex;

    if (englishIndex === -1 && frenchIndex !== null) {
      // french only -> delete
      if (!seenFrench.has(frenchIndex)) {
        actions.push({ kind: 'delete', frenchIndex });
        seenFrench.add(frenchIndex);
      }
      return;
    }

    if (englishIndex >= 0 && frenchIndex === null) {
      // new english block
      actions.push({ kind: 'insert_new', englishIndex });
      return;
    }

    if (englishIndex >= 0 && frenchIndex !== null) {
      // matched pair
      const isChanged = changedEnglishBlockIndexes.has(englishIndex);
      const isHighSimilarity =
        pair.similarityScore >= similarityOptions.minimumMatchForReuse;

      if (!isChanged && isHighSimilarity) {
        actions.push({ kind: 'reuse', englishIndex, frenchIndex });
      } else {
        actions.push({ kind: 'review', englishIndex, frenchIndex });
      }
      seenFrench.add(frenchIndex);
      return;
    }
  });

  return { actions };
};
