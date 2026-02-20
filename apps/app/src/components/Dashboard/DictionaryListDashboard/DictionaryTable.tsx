import { Loader, Table } from '@intlayer/design-system';
import { flexRender } from '@tanstack/react-table';
import { cn } from '@utils/cn';
import type { FC } from 'react';

interface DictionaryTableProps {
  table: any;
  isPending: boolean;
  dictionaries: any[];
  noDictionaryFound: string;
  setFocusedContent: (content: any) => void;
  router: any;
  PagesRoutes: any;
}

export const DictionaryTable: FC<DictionaryTableProps> = ({
  table,
  isPending,
  dictionaries,
  noDictionaryFound,
  setFocusedContent,
  router,
  PagesRoutes,
}) => (
  <div className="flex w-full max-w-screen flex-1 flex-col overflow-x-auto overflow-y-hidden">
    <Loader isLoading={isPending}>
      {dictionaries.length === 0 ? (
        <div className="flex min-h-60 items-center justify-center">
          <span className="text-neutral">{noDictionaryFound}</span>
        </div>
      ) : (
        <Table className="w-full border-separate border-spacing-0 px-10">
          <thead>
            {table.getHeaderGroups().map((headerGroup: any) => (
              <tr
                key={headerGroup.id}
                className="border-neutral-200 border-b dark:border-neutral-700"
              >
                {headerGroup.headers.map((header: any) => (
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
            {table.getRowModel().rows.map((row: any) => {
              const visibleCells = row.getVisibleCells();
              return (
                <tr
                  key={row.id}
                  className="cursor-pointer whitespace-nowrap border-card border-b transition-colors hover:bg-card/30"
                  onClick={() => {
                    setFocusedContent({
                      dictionaryKey: row.original.key,
                      dictionaryLocalId: row.original.localId,
                      keyPath: [],
                    });
                    router.push(
                      `${PagesRoutes.Dashboard_Dictionaries}/${row.original.key}`
                    );
                  }}
                >
                  {visibleCells.map((cell: any, cellIndex: number) => (
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
);
