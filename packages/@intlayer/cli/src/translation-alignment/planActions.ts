import type { AlignmentPair, AlignmentPlan, PlannedAction } from './types';

export const planAlignmentActions = (
  alignment: AlignmentPair[],
  changedEnglishBlockIndexes: Set<number>
): AlignmentPlan => {
  const actions: PlannedAction[] = [];
  const seenFrench = new Set<number>();

  alignment.forEach((pair) => {
    const englishIndex = pair.englishIndex;
    const frenchIndex = pair.frenchIndex;

    // Case 1: Deletion (Exists in FR, not in EN)
    if (englishIndex === -1 && frenchIndex !== null) {
      if (!seenFrench.has(frenchIndex)) {
        actions.push({ kind: 'delete', frenchIndex });
        seenFrench.add(frenchIndex);
      }
      return;
    }

    // Case 2: New Insertion (Exists in EN, not in FR)
    if (englishIndex >= 0 && frenchIndex === null) {
      actions.push({ kind: 'insert_new', englishIndex });
      return;
    }

    // Case 3: Alignment (Exists in both)
    if (englishIndex >= 0 && frenchIndex !== null) {
      const isChanged = changedEnglishBlockIndexes.has(englishIndex);

      // If the block is NOT marked as changed by Git, we REUSE it.
      // We assume the existing translation is correct because the source hasn't been touched.
      // We ignore 'similarityScore' here because EN vs UK text will always have low similarity.
      if (!isChanged) {
        actions.push({ kind: 'reuse', englishIndex, frenchIndex });
      } else {
        // If the block IS changed, we normally Review.
        // OPTIONAL: You could add a check here for 'similarityScore > 0.99'
        // to detect whitespace-only changes, but generally, if Git says changed, we Review.
        actions.push({ kind: 'review', englishIndex, frenchIndex });
      }

      seenFrench.add(frenchIndex);
      return;
    }
  });

  return { actions };
};
