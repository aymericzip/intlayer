import {
  Button,
  Loader,
  NumberItemsSelector,
  Pagination,
  ShowingResultsNumberItems,
} from '@intlayer/design-system';
import { useSearch } from '@intlayer/design-system/hooks';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { getIntlayer, getLocalizedUrl, getMultilingualUrls } from 'intlayer';
import { useEffect } from 'react';
import { useIntlayer } from 'react-intlayer';
import { FiltersBar } from '@/components/FiltersBar';
import { ProjectCard } from '@/components/ProjectCard';
import { ShowcaseHeader } from '@/components/ShowcaseHeader';
import { useSearchParamState } from '@/hooks/useSearchParamState';
import { SITE_URL } from '@/lib/site';
import { getProjects } from '@/server/projectActions/projectActions';

type ProjectSearchParams = {
  page?: number;
  pageSize?: number;
  search?: string;
  selectedUseCases?: string[];
  isOpenSource?: boolean;
};

export const Route = createFileRoute('/{-$locale}/')({
  component: App,
  validateSearch: (search: Record<string, unknown>): ProjectSearchParams => {
    return {
      page: search.page ? Number(search.page) : 1,
      pageSize: search.pageSize ? Number(search.pageSize) : 20,
      search: search.search ? String(search.search) : '',
      selectedUseCases: Array.isArray(search.selectedUseCases)
        ? search.selectedUseCases.map(String)
        : typeof search.selectedUseCases === 'string'
          ? [search.selectedUseCases]
          : [],
      isOpenSource:
        search.isOpenSource === 'true' || search.isOpenSource === true,
    };
  },
  loaderDeps: ({
    search: { page, pageSize, search, selectedUseCases, isOpenSource },
  }) => ({
    page,
    pageSize,
    search,
    selectedUseCases,
    isOpenSource,
  }),
  loader: async ({ context, deps }) => {
    await context.queryClient.ensureQueryData({
      queryKey: [
        'projects',
        {
          page: deps.page ?? 1,
          pageSize: deps.pageSize ?? 20,
          search: deps.search ?? '',
          selectedUseCases: deps.selectedUseCases ?? [],
          isOpenSource: deps.isOpenSource ?? false,
        },
      ],
      queryFn: () =>
        getProjects({
          data: {
            page: deps.page ?? 1,
            pageSize: deps.pageSize ?? 20,
            search: deps.search ?? '',
            selectedUseCases: deps.selectedUseCases ?? [],
            isOpenSource: deps.isOpenSource ?? false,
          },
        }),
    });
  },
  head: ({ params }) => {
    const { locale } = params;
    const content = getIntlayer('app', locale);
    const canonicalUrl = `${SITE_URL}${getLocalizedUrl('/', locale)}`;
    const multilingualUrls = getMultilingualUrls('/');

    return {
      meta: [
        { title: content.metadata.title },
        { name: 'description', content: content.metadata.description },
        {
          name: 'keywords',
          content: (content.metadata.keywords as string[]).join(', '),
        },
        { property: 'og:title', content: content.metadata.openGraph.title },
        { property: 'og:description', content: content.metadata.description },
        { property: 'og:url', content: canonicalUrl },
        { name: 'twitter:title', content: content.metadata.title },
        { name: 'twitter:description', content: content.metadata.description },
      ],
      links: [
        { rel: 'canonical', href: canonicalUrl },
        ...Object.entries(multilingualUrls).map(([lang, path]) => ({
          rel: 'alternate',
          hrefLang: lang,
          href: `${SITE_URL}${path}`,
        })),
        { rel: 'alternate', hrefLang: 'x-default', href: SITE_URL },
      ],
    };
  },
});

function App() {
  const content = useIntlayer('app');
  const { params, setParam, setParams } = useSearchParamState({
    page: { type: 'number', fallbackValue: 1 },
    pageSize: { type: 'number', fallbackValue: 20 },
    search: { type: 'string', fallbackValue: '' },
    selectedUseCases: { type: 'stringArray', fallbackValue: [] },
    isOpenSource: { type: 'boolean', fallbackValue: false },
  });

  const { search, setSearch } = useSearch({
    minChars: 2,
    defaultValue: params.search ?? '',
  });

  useEffect(() => {
    setSearch(params.search ?? '');
  }, [params.search, setSearch]);

  const { data: response, isPending } = useQuery({
    queryKey: [
      'projects',
      {
        page: params.page,
        pageSize: params.pageSize,
        search: search,
        selectedUseCases: params.selectedUseCases,
        isOpenSource: params.isOpenSource,
      },
    ],
    queryFn: () =>
      getProjects({
        data: {
          page: params.page,
          pageSize: params.pageSize,
          search: search,
          selectedUseCases: params.selectedUseCases,
          isOpenSource: params.isOpenSource,
        },
      }),
  });

  const projects = response?.data ?? [];
  const totalItems = response?.total_items ?? 0;
  const totalPages = response?.total_pages ?? 1;

  const isFiltering =
    search !== '' || params.selectedUseCases.length > 0 || params.isOpenSource;

  const clearFilters = () => {
    setSearch('');
    setParams({
      search: '',
      selectedUseCases: [],
      isOpenSource: false,
      page: 1,
    });
  };

  return (
    <div className="flex w-full flex-1 flex-col">
      <ShowcaseHeader />

      <FiltersBar
        searchQuery={params.search ?? ''}
        onSearchChange={(query) => {
          setSearch(query);
          setParams({ search: query, page: 1 });
        }}
        selectedUseCases={params.selectedUseCases}
        onUseCasesChange={(cases) => {
          setParams({ selectedUseCases: cases, page: 1 });
        }}
        isOpenSource={params.isOpenSource}
        onOpenSourceChange={(isOpen) => {
          setParams({ isOpenSource: isOpen, page: 1 });
        }}
      />

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.length > 0 ? (
            projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center gap-4 py-12 text-center text-neutral text-sm">
              <p>
                {isFiltering
                  ? content.showcase.noProjectsWithFilters
                  : content.showcase.noProjects}
              </p>
              {isFiltering && (
                <Button
                  variant="outline"
                  color="text"
                  onClick={clearFilters}
                  label={content.showcase.clearFilters.value}
                >
                  {content.showcase.clearFilters}
                </Button>
              )}
            </div>
          )}
        </div>
        <Loader isLoading={isPending} />
      </div>

      <div className="mx-auto mt-8 mb-12 w-full max-w-7xl px-4">
        <div className="flex w-full flex-row items-end justify-between gap-4 pt-8">
          <div className="flex flex-col gap-4">
            <ShowingResultsNumberItems
              currentPage={params.page}
              pageSize={params.pageSize}
              totalItems={totalItems}
            />
            <NumberItemsSelector
              value={params.pageSize.toString()}
              onValueChange={(val) => {
                setParams({ pageSize: Number(val), page: 1 });
              }}
            />
          </div>
          <Pagination
            currentPage={params.page}
            totalPages={totalPages}
            onPageChange={(newPage) => {
              setParam('page', newPage);
            }}
          />
        </div>
      </div>
    </div>
  );
}
