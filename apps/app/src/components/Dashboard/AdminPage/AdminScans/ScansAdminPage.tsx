import type {
  GetScannedHostsResult,
  GetTechnologyUsageResult,
  TechnologyUsage,
} from '@intlayer/backend-contract/scan';
import {
  useGetScannedHosts,
  useGetTechnologyUsage,
} from '@intlayer/design-system/api';
import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { SearchInput } from '@intlayer/design-system/input';
import { Modal } from '@intlayer/design-system/modal';
import {
  NumberItemsSelector,
  Pagination,
  ShowingResultsNumberItems,
} from '@intlayer/design-system/pagination';
import { Table } from '@intlayer/design-system/table';
import { X } from 'lucide-react';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { useSearchParamState } from '#hooks/useSearchParamState';
import { ScannedHostDetail } from './ScannedHostDetail';
import { TechnologyTags } from './TechnologyTags';

type TechnologyCategory = TechnologyUsage['category'];

/** Category tabs, in display order (`all` lists every technology). */
const CATEGORY_FILTERS = [
  'i18n-library',
  'tms',
  'translation-proxy',
  'framework',
  'cms',
  'all',
] as const satisfies readonly (TechnologyCategory | 'all')[];

type CategoryFilter = (typeof CATEGORY_FILTERS)[number];

/** Narrow a search-param value to a {@link CategoryFilter}. */
const toCategoryFilter = (value: string | undefined): CategoryFilter =>
  CATEGORY_FILTERS.find((category) => category === value) ?? 'i18n-library';

/**
 * Admin report of the scanned websites, stored per host: which i18n library,
 * TMS, translation proxy and framework each host uses, with its scan history.
 */
export const ScansAdminPageContent: FC = () => {
  const {
    categories,
    usageTitle,
    usageDescription,
    hostCount,
    hostsTitle,
    clearTechnologyFilter,
    searchPlaceholder,
    tableHeaders,
    modalTitle,
    noData,
    loadingError,
  } = useIntlayer('scans-admin-page');

  const { params, setParam, setParams } = useSearchParamState({
    category: { type: 'string', fallbackValue: 'i18n-library' },
    technologyId: { type: 'string', fallbackValue: undefined },
    search: { type: 'string', fallbackValue: undefined },
    host: { type: 'string', fallbackValue: undefined },
    page: { type: 'number', fallbackValue: 1 },
    pageSize: { type: 'number', fallbackValue: 20 },
  });

  const categoryFilter = toCategoryFilter(params.category);
  const technologyId = params.technologyId || undefined;
  const category = categoryFilter === 'all' ? undefined : categoryFilter;
  const selectedHost = params.host || undefined;

  const technologyUsageQuery = useGetTechnologyUsage({ category });
  const scannedHostsQuery = useGetScannedHosts({
    ...(technologyId ? { technologyId } : category ? { category } : {}),
    ...(params.search ? { search: params.search } : {}),
    page: params.page.toString(),
    pageSize: params.pageSize.toString(),
  });

  const technologyUsage =
    (technologyUsageQuery.data as GetTechnologyUsageResult | undefined)?.data ??
    [];
  const scannedHostsResponse = scannedHostsQuery.data as
    | GetScannedHostsResult
    | undefined;
  const scannedHosts = scannedHostsResponse?.data ?? [];

  const queryError = technologyUsageQuery.error ?? scannedHostsQuery.error;

  if (queryError) {
    return (
      <p className="p-6 text-error">
        {loadingError}:{' '}
        {queryError instanceof Error ? queryError.message : String(queryError)}
      </p>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-8 p-4">
      <div className="flex flex-wrap gap-2">
        {CATEGORY_FILTERS.map((categoryKey) => (
          <Button
            key={categoryKey}
            label={categories[categoryKey].value}
            variant="outline"
            color="text"
            size="sm"
            roundedSize="full"
            isActive={categoryKey === categoryFilter}
            className="aria-[current=page]:bg-current/15"
            onClick={() =>
              setParams({ category: categoryKey, technologyId: '', page: 1 })
            }
          >
            {categories[categoryKey]}
          </Button>
        ))}
      </div>

      <section className="flex flex-col gap-3">
        <div>
          <h2 className="font-semibold text-lg">{usageTitle}</h2>
          <p className="text-neutral text-sm">{usageDescription}</p>
        </div>

        {technologyUsage.length === 0 && !technologyUsageQuery.isFetching ? (
          <p className="text-neutral text-sm">{noData}</p>
        ) : (
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(12rem,1fr))] gap-3">
            {technologyUsage.map((technology) => (
              <li key={technology.id}>
                <Button
                  label={technology.name}
                  variant="outline"
                  color="text"
                  roundedSize="2xl"
                  isFullWidth
                  textAlign="left"
                  isActive={technology.id === technologyId}
                  className="flex-col items-start gap-0.5 py-3 aria-[current=page]:bg-current/15"
                  onClick={() =>
                    setParams({
                      technologyId:
                        technology.id === technologyId ? '' : technology.id,
                      page: 1,
                    })
                  }
                >
                  <span className="font-semibold">{technology.name}</span>
                  <span className="text-xs opacity-70">
                    {hostCount({ count: technology.hostCount })}
                  </span>
                </Button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-semibold text-lg">{hostsTitle}</h2>
          <div className="flex items-center gap-2">
            {technologyId && (
              <Button
                label={clearTechnologyFilter.value}
                variant="hoverable"
                color="text"
                size="sm"
                Icon={X}
                onClick={() => setParams({ technologyId: '', page: 1 })}
              >
                {technologyUsage.find(({ id }) => id === technologyId)?.name ??
                  technologyId}
              </Button>
            )}
            <SearchInput
              placeholder={searchPlaceholder.value}
              defaultValue={params.search ?? ''}
              onChange={(event) =>
                setParams({ search: event.target.value, page: 1 })
              }
              className="max-w-xs"
            />
          </div>
        </div>

        {scannedHosts.length === 0 && !scannedHostsQuery.isFetching ? (
          <p className="py-12 text-center text-neutral">{noData}</p>
        ) : (
          <Container
            roundedSize="2xl"
            border
            borderColor="neutral"
            className="overflow-x-auto"
          >
            <Table className="w-full border-separate border-spacing-0 text-sm">
              <thead>
                <tr className="text-start text-neutral">
                  <th className="px-4 py-3 font-medium">{tableHeaders.host}</th>
                  <th className="px-4 py-3 font-medium">
                    {tableHeaders.technologies}
                  </th>
                  <th className="px-4 py-3 font-medium">
                    {tableHeaders.routing}
                  </th>
                  <th className="px-4 py-3 font-medium">
                    {tableHeaders.locales}
                  </th>
                  <th className="px-4 py-3 text-end font-medium">
                    {tableHeaders.score}
                  </th>
                  <th className="px-4 py-3 text-end font-medium">
                    {tableHeaders.scanCount}
                  </th>
                  <th className="px-4 py-3 font-medium">
                    {tableHeaders.scannedAt}
                  </th>
                </tr>
              </thead>
              <tbody>
                {scannedHosts.map((scannedHost) => (
                  <tr
                    key={scannedHost.id}
                    className="cursor-pointer border-neutral/20 border-t align-top transition-colors hover:bg-text/5"
                    onClick={() => setParam('host', scannedHost.host)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        setParam('host', scannedHost.host);
                      }
                    }}
                    tabIndex={0}
                  >
                    <td className="px-4 py-3">
                      <span className="font-medium">{scannedHost.host}</span>
                      {scannedHost.title && (
                        <p className="max-w-60 truncate text-neutral text-xs">
                          {scannedHost.title}
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <TechnologyTags
                        technologies={scannedHost.technologies}
                        className="max-w-md"
                      />
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-xs">
                      {scannedHost.routingStrategy}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs">
                      {scannedHost.locales?.join(', ')}
                    </td>
                    <td className="px-4 py-3 text-end font-semibold">
                      {scannedHost.lastScore}
                    </td>
                    <td className="px-4 py-3 text-end">
                      {scannedHost.scanCount}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-neutral text-xs">
                      {new Date(scannedHost.lastScannedAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>
        )}

        <div className="flex w-full flex-row items-end justify-between gap-4 pt-4">
          <div className="flex flex-col gap-4">
            <ShowingResultsNumberItems
              currentPage={params.page}
              pageSize={params.pageSize}
              totalItems={scannedHostsResponse?.total_items ?? 0}
            />
            <NumberItemsSelector
              value={params.pageSize.toString()}
              onValueChange={(pageSize) =>
                setParams({ pageSize: Number(pageSize), page: 1 })
              }
            />
          </div>
          <Pagination
            currentPage={params.page}
            totalPages={scannedHostsResponse?.total_pages ?? 1}
            onPageChange={(page) => setParam('page', page)}
          />
        </div>
      </section>

      <Modal
        isOpen={Boolean(selectedHost)}
        onClose={() => setParam('host', '')}
        title={modalTitle({ host: selectedHost ?? '' }).value}
        size="xl"
        hasCloseButton
        isScrollable
      >
        {selectedHost && <ScannedHostDetail host={selectedHost} />}
      </Modal>
    </div>
  );
};
