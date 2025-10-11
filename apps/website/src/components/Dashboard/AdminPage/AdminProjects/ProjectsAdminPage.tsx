'use client';

import { Link } from '@components/Link/Link';
import type { GetProjectsResult, ProjectAPI } from '@intlayer/backend';
import {
  Loader,
  NumberItemsSelector,
  Pagination,
  SearchInput,
  ShowingResultsNumberItems,
  Table,
} from '@intlayer/design-system';
import { useGetProjects, useSearch } from '@intlayer/design-system/hooks';
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { cn } from '@utils/cn';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import { type FC, useEffect } from 'react';
import { useSearchParamState } from '@/hooks/useSearchParamState';
import { PagesRoutes } from '@/Routes';

type SortOrder = 'asc' | 'desc';

export const ProjectsAdminPageContent: FC = () => {
  const { params, setParam, setParams } = useSearchParamState({
    page: { type: 'number', fallbackValue: 1 },
    pageSize: { type: 'number', fallbackValue: 10 },
    search: { type: 'string' },
    sortBy: { type: 'string' },
    sortOrder: { type: 'string', fallbackValue: 'asc' },
  });

  const { setSearch, search } = useSearch({});

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
  const { title, tableHeaders, noData, errorMessages, searchPlaceholder } =
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

  const columns: ColumnDef<ProjectAPI>[] = [
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
                <Link
                  href={PagesRoutes.Admin_Projects_Id.replace(
                    ':id',
                    project.id
                  )}
                  label={project.name}
                  color="text"
                >
                  {project.name}
                </Link>
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
    state: { sorting },
    manualSorting: true,
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
    <div className="flex flex-1 flex-col">
      <div className="mb-6">
        <h1 className="font-bold text-2xl text-neutral-900 dark:text-neutral-100">
          {title}
        </h1>
      </div>

      <SearchInput
        type="search"
        placeholder={searchPlaceholder.value}
        onChange={(e) => handleSearch(e.target.value)}
        className="max-w-md pl-10"
      />

      <Loader isLoading={isFetching}>
        {projects.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-neutral-500 dark:text-neutral-400">{noData}</p>
          </div>
        ) : (
          <div className="space-y-4">
            <Table className="w-full">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr
                    key={headerGroup.id}
                    className="border-neutral-200 border-b dark:border-neutral-700"
                  >
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className={cn(
                          'whitespace-nowrap px-4 py-3 text-left font-medium text-neutral-900 dark:text-neutral-100',
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
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="whitespace-nowrap border-neutral-100 border-b hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-800"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="whitespace-nowrap px-4 py-3">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Loader>

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
  );
};

export default ProjectsAdminPageContent;
