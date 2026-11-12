import { Button } from '@intlayer/design-system/button';
import { ChevronDown, ChevronsUpDown, ChevronUp } from 'lucide-react';
import type { FC } from 'react';

type SortHeaderProps = {
  /** Column this header sorts. */
  columnId: string;
  label: string;
  /** Column currently sorted. */
  sortBy: string | undefined;
  sortOrder: string | undefined;
  onSort: (columnId: string) => void;
};

/**
 * Sortable table header button.
 *
 * Declared at module level: a component defined inside a table component is
 * a new type on every render, which remounts the header (and drops its focus).
 */
export const SortHeader: FC<SortHeaderProps> = ({
  columnId,
  label,
  sortBy,
  sortOrder,
  onSort,
}) => {
  const isSorted = sortBy === columnId;
  const SortIcon = !isSorted
    ? ChevronsUpDown
    : sortOrder === 'asc'
      ? ChevronUp
      : ChevronDown;

  return (
    <Button
      variant="hoverable"
      color="text"
      size="sm"
      className="flex items-center gap-1 font-medium"
      onClick={() => onSort(columnId)}
      Icon={SortIcon}
      label={label}
    >
      {label}
    </Button>
  );
};
