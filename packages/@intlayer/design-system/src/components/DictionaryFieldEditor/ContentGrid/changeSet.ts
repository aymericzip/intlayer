import type { ContentNode } from '@intlayer/types/dictionary';
import type { KeyPath } from '@intlayer/types/keyPath';
import { indexCells, isSameContentValue } from './cellStatus';
import type { ContentRow } from './flattenContentRows';

/** One unsaved modification of a leaf value. */
export type ChangeSetEntry = {
  /** Cell id, e.g. `title::fr`. */
  cellId: string;
  /** Display path of the row, e.g. `title`. */
  rowId: string;
  /** Locale, or `*` when the value is shared by every locale. */
  cellKey: string;
  /** Key path to write back on revert. */
  keyPath: KeyPath[];
  kind: 'added' | 'removed' | 'changed';
  previousValue: ContentNode | undefined;
  nextValue: ContentNode | undefined;
};

const splitCellId = (cellId: string): { rowId: string; cellKey: string } => {
  const separatorIndex = cellId.lastIndexOf('::');

  return {
    rowId: cellId.slice(0, separatorIndex),
    cellKey: cellId.slice(separatorIndex + 2),
  };
};

/**
 * Lists every leaf value that differs between the saved and the edited
 * dictionary, so unsaved work reads like a staging area.
 */
export const computeChangeSet = (
  originalRows: ContentRow[],
  editedRows: ContentRow[]
): ChangeSetEntry[] => {
  const originalCells = indexCells(originalRows);
  const editedCells = indexCells(editedRows);
  const entries: ChangeSetEntry[] = [];

  for (const [cellId, editedCell] of editedCells) {
    const originalCell = originalCells.get(cellId);
    const isOriginalMissing = !originalCell || originalCell.isMissing;

    if (isOriginalMissing && editedCell.isMissing) continue;
    if (
      !isOriginalMissing &&
      !editedCell.isMissing &&
      isSameContentValue(originalCell?.value, editedCell.value)
    ) {
      continue;
    }

    entries.push({
      cellId,
      ...splitCellId(cellId),
      keyPath: editedCell.keyPath,
      kind: isOriginalMissing ? 'added' : 'changed',
      previousValue: isOriginalMissing ? undefined : originalCell?.value,
      nextValue: editedCell.value,
    });
  }

  for (const [cellId, originalCell] of originalCells) {
    if (editedCells.has(cellId) || originalCell.isMissing) continue;

    entries.push({
      cellId,
      ...splitCellId(cellId),
      keyPath: originalCell.keyPath,
      kind: 'removed',
      previousValue: originalCell.value,
      nextValue: undefined,
    });
  }

  return entries;
};
