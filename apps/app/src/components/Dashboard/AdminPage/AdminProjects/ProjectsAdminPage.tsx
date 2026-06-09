import type { GetProjectsResult, ProjectAPI } from '@intlayer/backend';
import {
  useDeleteProjectById,
  useGetProjects,
} from '@intlayer/design-system/api';
import { Button } from '@intlayer/design-system/button';
import { CopyToClipboard } from '@intlayer/design-system/copy-to-clipboard';
import { useSearch } from '@intlayer/design-system/hooks';
import { Checkbox, SearchInput } from '@intlayer/design-system/input';

import {
  NumberItemsSelector,
  Pagination,
  ShowingResultsNumberItems,
} from '@intlayer/design-system/pagination';
import { getAppAdminProjectRoute } from '@intlayer/design-system/routes';
import { Table } from '@intlayer/design-system/table';
import { cn } from '@intlayer/design-system/utils';
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  type RowSelectionState,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import { type FC, useEffect, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { useLocalizedNavigate } from '#hooks/useLocalizedNavigate.ts';
import { useSearchParamState } from '#hooks/useSearchParamState';
import { ProjectsAdminSkeleton } from './ProjectsAdminSkeleton';

type SortOrder = 'asc' | 'desc';

export const ProjectsAdminPageContent: FC = () => {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const { mutateAsync: deleteProjectById, isPending: isDeleting } =
    useDeleteProjectById();

  const { params, setParam, setParams } = useSearchParamState({
    page: { type: 'number', fallbackValue: 1 },
    pageSize: { type: 'number', fallbackValue: 10 },
    search: { type: 'string' },
    sortBy: { type: 'string' },
    sortOrder: { type: 'string', fallbackValue: 'asc' },
  });

  const { setSearch, search } = useSearch({});
  const navigate = useLocalizedNavigate();

  const projectsQuery = useGetProjects(
    {
      fetchAll: 'true',
      ...(search && { search }),
      ...params,
    },
    {
      enabled: true, // Because need organization by default to fetch projects, no need organization for admin users
    }
  );

  const { data, error, isFetching } = projectsQuery;
  const { tableHeaders, noData, errorMessages, searchPlaceholder } =
    useIntlayer('project-admin-page');

  const projectsResponse = data as GetProjectsResult | undefined;
  const projects = projectsResponse?.data ?? [];
  const totalPages: number = projectsResponse?.total_pages ?? 1;
  const totalItems: number = projectsResponse?.total_items ?? 0;
  const currentPage: number = params.page;
  const itemsPerPage: number = params.pageSize;

  const sorting: SortingState = params.sortBy
    ? [{ id: params.sortBy, desc: params.sortOrder === 'desc' }]
    : [];

  const selectedProjectIds = Object.keys(rowSelection)
    .filter((k) => rowSelection[k])
    .map((idx) => projects[parseInt(idx, 10)]?.id)
    .filter(Boolean) as string[];

  const columns: ColumnDef<ProjectAPI>[] = [
    {
      id: 'selection',
      enableSorting: false,
      header: ({ table }) => (
        <Checkbox
          name="select-all"
          size="sm"
          color="text"
          checked={table.getIsAllPageRowsSelected()}
          onChange={(e) => table.toggleAllPageRowsSelected(e.target.checked)}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          name={`select-row-${row.id}`}
          size="sm"
          color="text"
          checked={row.getIsSelected()}
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
          onChange={(e) => row.toggleSelected(e.target.checked)}
        />
      ),
    },
    {
      accessorKey: 'name',
      enableSorting: true,
      header: ({ column }) => (
        <div className="group flex items-center gap-2">
          {tableHeaders.name}
          <div
            className={cn(
              'opacity-0 transition-opacity duration-300 group-hover:opacity-100',
              column.getIsSorted() && 'opacity-100'
            )}
          >
            {column.getIsSorted() === 'asc' ? (
              <ChevronUp className="h-3 w-3" />
            ) : column.getIsSorted() === 'desc' ? (
              <ChevronDown className="h-3 w-3" />
            ) : null}
          </div>
        </div>
      ),
      cell: ({ row }) => {
        const project = row.original as ProjectAPI;
        return (
          <div className="flex items-center">
            <div className="ml-3">
              {project.name ? (
                <CopyToClipboard text={project.name} size={10}>
                  {project.name}
                </CopyToClipboard>
              ) : (
                '-'
              )}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'id',
      enableSorting: true,
      header: ({ column }) => (
        <div className="group flex items-center gap-2">
          {tableHeaders.id}
          <div
            className={cn(
              'opacity-0 transition-opacity duration-300 group-hover:opacity-100',
              column.getIsSorted() && 'opacity-100'
            )}
          >
            {column.getIsSorted() === 'asc' ? (
              <ChevronUp className="h-3 w-3" />
            ) : column.getIsSorted() === 'desc' ? (
              <ChevronDown className="h-3 w-3" />
            ) : null}
          </div>
        </div>
      ),
      cell: ({ row }) => {
        const project = row.original as ProjectAPI;
        return (
          <div className="ml-3 font-mono text-sm">
            ...{project.id.slice(-5)}
          </div>
        );
      },
    },
    {
      accessorKey: 'createdAt',
      enableSorting: true,
      header: ({ column }) => (
        <div className="group flex items-center gap-2">
          {tableHeaders.createdAt}
          <div
            className={cn(
              'opacity-0 transition-opacity duration-300 group-hover:opacity-100',
              column.getIsSorted() && 'opacity-100'
            )}
          >
            {column.getIsSorted() === 'asc' ? (
              <ChevronUp className="h-3 w-3" />
            ) : column.getIsSorted() === 'desc' ? (
              <ChevronDown className="h-3 w-3" />
            ) : null}
          </div>
        </div>
      ),
      cell: ({ row }) => {
        const project = row.original as ProjectAPI;
        return (
          <div className="text-neutral-500 text-sm dark:text-neutral-400">
            {project.createdAt
              ? new Date(project.createdAt).toLocaleDateString()
              : noData}
          </div>
        );
      },
    },
    {
      accessorKey: 'updatedAt',
      enableSorting: true,
      header: ({ column }) => (
        <div className="group flex items-center gap-2">
          {tableHeaders.updatedAt}
          <div
            className={cn(
              'opacity-0 transition-opacity duration-300 group-hover:opacity-100',
              column.getIsSorted() && 'opacity-100'
            )}
          >
            {column.getIsSorted() === 'asc' ? (
              <ChevronUp className="h-3 w-3" />
            ) : column.getIsSorted() === 'desc' ? (
              <ChevronDown className="h-3 w-3" />
            ) : null}
          </div>
        </div>
      ),
      cell: ({ row }) => {
        const project = row.original as ProjectAPI;
        return (
          <div className="text-neutral-500 text-sm dark:text-neutral-400">
            {project.updatedAt
              ? new Date(project.updatedAt).toLocaleDateString()
              : noData}
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: projects,
    columns,
    state: { sorting, rowSelection },
    manualSorting: true,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: (updater) => {
      const next = typeof updater === 'function' ? updater(sorting) : updater;
      if (next.length > 0) {
        const s = next[0];
        const field = s.id;
        const order: SortOrder = s.desc ? 'desc' : 'asc';
        setParams({ sortBy: field, sortOrder: order, page: 1 });
      } else {
        setParams({ sortBy: '', sortOrder: 'asc', page: 1 });
      }
    },
    getCoreRowModel: getCoreRowModel(),
  });

  const handleSearch = (value: string) => {
    setSearch(value);
    setParams({ search: value, page: 1 });
  };

  // Keep the input's search value in sync with URL param
  useEffect(() => {
    setSearch((params.search as string) ?? '');
  }, [params.search, setSearch]);

  const handlePageSizeChange = (newPageSize: string) => {
    const size = parseInt(newPageSize, 10);
    setParams({ pageSize: size, page: 1 });
  };

  if (error) {
    return (
      <div className="p-6">
        <div className="text-error">
          {errorMessages.loadingError}:{' '}
          {error instanceof Error ? error.message : String(error)}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col items-center p-4">
      <div className="flex size-full flex-1 flex-col gap-4">
        <div className="space-y-4">
          <SearchInput
            type="search"
            placeholder={searchPlaceholder.value}
            onChange={(e) => handleSearch(e.target.value)}
            className="max-w-md"
          />
        </div>

        {selectedProjectIds.length > 0 && (
          <div className="mb-4 flex items-center justify-end gap-2">
            <Button
              color="error"
              variant="outline"
              Icon={Trash2}
              label={`Delete selected (${selectedProjectIds.length})`}
              isLoading={isDeleting}
              onClick={async () => {
                for (const id of selectedProjectIds) {
                  await deleteProjectById(id);
                }
                setRowSelection({});
              }}
            >
              Delete selected ({selectedProjectIds.length})
            </Button>
          </div>
        )}

        {isFetching && projects.length === 0 ? (
          <ProjectsAdminSkeleton showToolBar={false} />
        ) : projects.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-neutral-500 dark:text-neutral-400">{noData}</p>
          </div>
        ) : (
          <div className="flex flex-1 items-start justify-start space-y-4">
            <Table className="w-full border-separate border-spacing-0">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className={cn(
                          'whitespace-nowrap px-4 py-3 font-medium text-neutral',
                          ['selection', 'actions'].includes(header.id)
                            ? 'text-center'
                            : 'text-left',
                          header.column.getCanSort() &&
                            'cursor-pointer select-none hover:text-neutral-600'
                        )}
                        onClick={
                          header.column.getCanSort()
                            ? header.column.getToggleSortingHandler()
                            : undefined
                        }
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
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
                      onClick={() => {
                        navigate({
                          to: getAppAdminProjectRoute(row.original.id) as any,
                        });
                      }}
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
          </div>
        )}

        <div className="flex w-full flex-row items-end justify-between gap-4 pt-8">
          <div className="flex flex-col gap-4">
            <ShowingResultsNumberItems
              currentPage={currentPage}
              pageSize={itemsPerPage}
              totalItems={totalItems}
            />
            <NumberItemsSelector
              value={itemsPerPage.toString()}
              onValueChange={handlePageSizeChange}
            />
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setParam('page', page)}
            showFirstLast={true}
            showPrevNext={true}
            maxVisiblePages={5}
            color="text"
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectsAdminPageContent;
