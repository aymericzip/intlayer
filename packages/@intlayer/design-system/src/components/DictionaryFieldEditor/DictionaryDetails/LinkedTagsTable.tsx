'use client';

import { Table } from '@components/Table';
import { cn } from '@utils/cn';
import type { FC, ReactNode } from 'react';
import {
  EmptyCell,
  getLinkedRowCellClassName,
} from './LinkedDictionariesTable';

/** Tag of the edited dictionary; `name`/`description` absent when unknown. */
export type LinkedTag = {
  key: string;
  name?: string;
  description?: string;
};

type LinkedTagColumn = 'key' | 'name' | 'description';

export type LinkedTagsTableProps = {
  title: ReactNode;
  tags: LinkedTag[];
  /** Rows are clickable only when provided. */
  onSelectTag?: (tagKey: string) => void;
  labels: Record<LinkedTagColumn, ReactNode>;
};

/** Tags of the edited dictionary; columns no row fills are dropped. */
export const LinkedTagsTable: FC<LinkedTagsTableProps> = ({
  title,
  tags,
  onSelectTag,
  labels,
}) => {
  const columns = (['key', 'name', 'description'] as const).filter((column) =>
    tags.some((tag) => Boolean(tag[column]))
  );
  const isSelectable = Boolean(onSelectTag);

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
            {tags.map((tag) => (
              <tr
                key={tag.key}
                tabIndex={isSelectable ? 0 : undefined}
                onClick={() => onSelectTag?.(tag.key)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    onSelectTag?.(tag.key);
                  }
                }}
                className={cn('group', isSelectable && 'cursor-pointer')}
              >
                {columns.map((column, columnIndex) => (
                  <td
                    key={column}
                    className={getLinkedRowCellClassName({
                      columnIndex,
                      columnCount: columns.length,
                      isSelectable,
                    })}
                  >
                    {column === 'key' ? (
                      <span className="font-mono" dir="ltr">
                        {tag.key}
                      </span>
                    ) : column === 'description' && tag.description ? (
                      <span className="line-clamp-2 max-w-xs text-neutral">
                        {tag.description}
                      </span>
                    ) : (
                      (tag[column] ?? <EmptyCell />)
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
