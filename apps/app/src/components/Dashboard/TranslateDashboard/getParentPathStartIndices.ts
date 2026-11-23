import { isSameKeyPath } from '@intlayer/core/utils';
import type { KeyPath } from '@intlayer/types/keyPath';

/** Minimal row shape: a dictionary key and the field's key path. */
type TranslateRowLocation = {
  dictionary: { key: string };
  keyPath: KeyPath[];
};

/**
 * Indices of the rows that open a new parent group: the first row, or a row
 * whose dictionary or parent key path (all segments but the last) differs
 * from the previous row. Those rows show the full parent breadcrumb; the
 * following rows of the same group only show their own field name.
 */
export const getParentPathStartIndices = <
  RowLocation extends TranslateRowLocation,
>(
  rows: readonly (readonly RowLocation[])[]
): Set<number> => {
  const startIndices = new Set<number>();

  // `isSameKeyPath` only checks that the first path is a prefix of the second.
  const isSameParentPath = (first: KeyPath[], second: KeyPath[]): boolean =>
    first.length === second.length && isSameKeyPath(first, second);

  rows.forEach((row, index) => {
    const currentRow = row[0];
    const previousRow = rows[index - 1]?.[0];

    if (
      !currentRow ||
      !previousRow ||
      currentRow.dictionary.key !== previousRow.dictionary.key ||
      !isSameParentPath(
        currentRow.keyPath.slice(0, -1),
        previousRow.keyPath.slice(0, -1)
      )
    ) {
      startIndices.add(index);
    }
  });

  return startIndices;
};
