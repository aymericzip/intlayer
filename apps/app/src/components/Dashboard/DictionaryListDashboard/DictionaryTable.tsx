import { Loader, Table } from '@intlayer/design-system';
import type { Dictionary } from '@intlayer/types';
import {
  flexRender,
  type Table as ReactTableType,
  type Row,
} from '@tanstack/react-table';
import { cn } from '@utils/cn';
import { type FC, memo } from 'react';

interface DictionaryTableProps {
  table: ReactTableType<Dictionary>;
  isPending: boolean;
  noDictionaryFound: string;
  onRowClick: (row: Row<Dictionary>) => void;
}

export const DictionaryTable: FC<DictionaryTableProps> = memo(
  ({ table, isPending, noDictionaryFound, onRowClick }) => (
    <div className="flex w-full max-w-screen flex-1 flex-col overflow-x-auto overflow-y-hidden">
      <Loader isLoading={isPending}>
        {table.getRowModel().rows.length === 0 ? (
          <div className="flex min-h-60 items-center justify-center">
            <span className="text-neutral">{noDictionaryFound}</span>
          </div>
        ) : (
          <Table className="w-full border-separate border-spacing-0 px-10">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className="border-neutral-200 border-b dark:border-neutral-700"
                >
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="whitespace-nowrap px-4 py-3 text-left font-medium text-neutral-900 dark:text-neutral-100"
                    >
                      <div
                        className={cn(
                          'flex items-center',
                          ['selection', 'actions'].includes(header.column.id)
                            ? 'justify-center'
                            : 'justify-start'
                        )}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => {
                const visibleCells = row.getVisibleCells();
                return (
                  <tr
                    key={row.id}
                    className="cursor-pointer whitespace-nowrap rounded-xl border-card border-b transition-colors hover:bg-card/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-card"
                    onClick={() => onRowClick(row)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onRowClick(row);
                      }

                      if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        const nextRow = e.currentTarget
                          .nextElementSibling as HTMLElement | null;
                        nextRow?.focus();
                      }

                      if (e.key === 'ArrowUp') {
                        e.preventDefault();
                        const prevRow = e.currentTarget
                          .previousElementSibling as HTMLElement | null;
                        prevRow?.focus();
                      }
                    }}
                    tabIndex={0}
                  >
                    {visibleCells.map((cell, cellIndex) => (
                      <td
                        key={cell.id}
                        className={cn(
                          'whitespace-nowrap px-4 py-3',
                          cellIndex === 0 && 'first:rounded-l-2xl',
                          cellIndex === visibleCells.length - 1 &&
                            'last:rounded-r-2xl'
                        )}
                      >
                        <div
                          className={cn(
                            'flex items-center',
                            ['selection', 'actions'].includes(cell.column.id)
                              ? 'justify-center'
                              : 'justify-start'
                          )}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </Loader>
    </div>
  )
);
