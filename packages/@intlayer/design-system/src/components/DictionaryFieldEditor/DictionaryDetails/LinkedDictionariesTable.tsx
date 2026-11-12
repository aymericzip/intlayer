'use client';

import { Table } from '@components/Table';
import { Tag } from '@components/Tag';
import type { Dictionary } from '@intlayer/types/dictionary';
import { cn } from '@utils/cn';
import type { FC, ReactNode } from 'react';
import { getDictionaryVariantTagLabels } from '../dictionaryVariant';
import { isSameDictionary } from '../SiblingSwitcher/siblingSelection';

type LinkedDictionaryColumn =
  | 'key'
  | 'locale'
  | 'variant'
  | 'item'
  | 'tags'
  | 'title';

export type LinkedDictionariesTableProps = {
  title: ReactNode;
  dictionaries: Dictionary[];
  /** Highlighted row, not clickable. */
  currentDictionary: Dictionary;
  /** Rows are clickable only when provided. */
  onSelectDictionary?: (dictionary: Dictionary) => void;
  labels: Record<LinkedDictionaryColumn | 'current', ReactNode>;
};

/** True when at least one dictionary fills the column. */
const getIsColumnFilled = (
  dictionaries: Dictionary[],
  column: LinkedDictionaryColumn
): boolean =>
  dictionaries.some((dictionary) => {
    if (column === 'locale') return Boolean(dictionary.locale);
    if (column === 'variant') return dictionary.variant !== undefined;
    if (column === 'item') return dictionary.item !== undefined;
    if (column === 'tags') return (dictionary.tags?.length ?? 0) > 0;
    if (column === 'title') return Boolean(dictionary.title);

    return Boolean(dictionary.key);
  });

/**
 * Cell classes of a linked-entity row: the row is drawn as one rounded,
 * bordered pill, so background and borders live on the cells.
 */
export const getLinkedRowCellClassName = ({
  columnIndex,
  columnCount,
  isCurrent = false,
  isSelectable = false,
}: {
  columnIndex: number;
  columnCount: number;
  isCurrent?: boolean;
  isSelectable?: boolean;
}): string =>
  cn(
    'border-y border-neutral/30 px-3 py-2 transition-colors',
    isCurrent && 'bg-text/10',
    isSelectable && 'group-hover:bg-neutral/20',
    columnIndex === 0 && 'rounded-s-xl border-s',
    columnIndex === columnCount - 1 && 'rounded-e-xl border-e'
  );

export const EmptyCell: FC = () => <span className="text-neutral">-</span>;

/**
 * Table of dictionaries linked to the edited one. Columns no row fills are
 * dropped, so a key without variants shows no variant column.
 */
export const LinkedDictionariesTable: FC<LinkedDictionariesTableProps> = ({
  title,
  dictionaries,
  currentDictionary,
  onSelectDictionary,
  labels,
}) => {
  const columns = (
    ['key', 'locale', 'variant', 'item', 'tags', 'title'] as const
  ).filter((column) => getIsColumnFilled(dictionaries, column));

  const renderCell = (
    dictionary: Dictionary,
    column: LinkedDictionaryColumn
  ): ReactNode => {
    if (column === 'key')
      return (
        <span className="font-mono" dir="ltr">
          {dictionary.key}
        </span>
      );

    if (column === 'locale')
      return dictionary.locale ? (
        <Tag color="neutral" size="xs" dir="ltr">
          {String(dictionary.locale)}
        </Tag>
      ) : (
        <EmptyCell />
      );

    if (column === 'variant') {
      const variantTagLabels = getDictionaryVariantTagLabels(
        dictionary.variant
      );
      if (variantTagLabels.length === 0) return <EmptyCell />;

      return (
        <div className="flex flex-wrap gap-1" dir="ltr">
          {variantTagLabels.map((variantTagLabel) => (
            <Tag key={variantTagLabel} color="warning" size="xs">
              {variantTagLabel}
            </Tag>
          ))}
        </div>
      );
    }

    if (column === 'item')
      return dictionary.item === undefined ? (
        <EmptyCell />
      ) : (
        <Tag color="neutral" size="xs">
          {dictionary.item}
        </Tag>
      );

    if (column === 'tags')
      return dictionary.tags?.length ? (
        <div className="flex flex-wrap gap-1">
          {dictionary.tags.map((tag) => (
            <Tag key={tag} color="neutral" size="xs">
              {tag}
            </Tag>
          ))}
        </div>
      ) : (
        <EmptyCell />
      );

    return dictionary.title || <EmptyCell />;
  };

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-medium tracking-wide text-muted uppercase">
        {title}
      </p>
      <div className="max-h-96 w-full overflow-auto">
        <Table className="border-spacing-y-1 text-xs">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  className="px-3 py-2 font-medium whitespace-nowrap text-neutral"
                >
                  {labels[column]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dictionaries.map((dictionary) => {
              const isCurrent = isSameDictionary(dictionary, currentDictionary);
              const isSelectable = Boolean(onSelectDictionary) && !isCurrent;

              return (
                <tr
                  key={dictionary.id ?? dictionary.localId ?? dictionary.key}
                  aria-current={isCurrent}
                  tabIndex={isSelectable ? 0 : undefined}
                  onClick={() =>
                    isSelectable && onSelectDictionary?.(dictionary)
                  }
                  onKeyDown={(event) => {
                    if (
                      isSelectable &&
                      (event.key === 'Enter' || event.key === ' ')
                    ) {
                      event.preventDefault();
                      onSelectDictionary?.(dictionary);
                    }
                  }}
                  className={cn(
                    'group',
                    isSelectable && 'cursor-pointer',
                    isCurrent && 'font-semibold'
                  )}
                >
                  {columns.map((column, columnIndex) => (
                    <td
                      key={column}
                      className={getLinkedRowCellClassName({
                        columnIndex,
                        columnCount: columns.length,
                        isCurrent,
                        isSelectable,
                      })}
                    >
                      <span className="flex items-center gap-2">
                        {renderCell(dictionary, column)}
                        {isCurrent && columnIndex === 0 && (
                          <Tag color="text" size="xs">
                            {labels.current}
                          </Tag>
                        )}
                      </span>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
