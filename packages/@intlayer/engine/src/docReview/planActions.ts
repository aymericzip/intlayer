import type { AlignmentPair, AlignmentPlan, PlannedAction } from './types';

/**
 * Turn raw alignment pairs into an ordered list of merge actions.
 *
 * A block aligned in both documents is reused when its base counterpart is not
 * marked as changed, and reviewed otherwise. Blocks present only in the base are
 * inserted, blocks present only in the target are deleted.
 *
 * @param alignment - The alignment pairs produced by the aligner.
 * @param changedBaseBlockIndexes - Indexes of base blocks reported as changed.
 * @returns The plan of actions to merge the documents.
 */
export const planAlignmentActions = (
  alignment: AlignmentPair[],
  changedBaseBlockIndexes: Set<number>
): AlignmentPlan => {
  const actions: PlannedAction[] = [];
  const seenTarget = new Set<number>();

  alignment.forEach((pair) => {
    const baseIndex = pair.baseIndex;
    const targetIndex = pair.targetIndex;

    // Case 1: Deletion (Exists in target, not in base)
    if (baseIndex === -1 && targetIndex !== null) {
      if (!seenTarget.has(targetIndex)) {
        actions.push({ kind: 'delete', targetIndex });
        seenTarget.add(targetIndex);
      }
      return;
    }

    // Case 2: New Insertion (Exists in base, not in target)
    if (baseIndex >= 0 && targetIndex === null) {
      actions.push({ kind: 'insert_new', baseIndex });
      return;
    }

    // Case 3: Alignment (Exists in both)
    if (baseIndex >= 0 && targetIndex !== null) {
      const isChanged = changedBaseBlockIndexes.has(baseIndex);

      // If the block is NOT marked as changed, we REUSE it. We assume the existing
      // translation is correct because the source hasn't been touched. We ignore
      // 'similarityScore' here because base vs target text will always have low
      // similarity.
      if (!isChanged) {
        actions.push({ kind: 'reuse', baseIndex, targetIndex });
      } else {
        // If the block IS changed, we Review it.
        actions.push({ kind: 'review', baseIndex, targetIndex });
      }

      seenTarget.add(targetIndex);
      return;
    }
  });

  return { actions };
};
