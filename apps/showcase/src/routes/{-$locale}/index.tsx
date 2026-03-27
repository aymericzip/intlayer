import { getIntlayerAPI } from '@intlayer/api';
import {
  Button,
  NumberItemsSelector,
  Pagination,
  ShowingResultsNumberItems,
} from '@intlayer/design-system';
import {
  useGetShowcaseProjects,
  useSearch,
} from '@intlayer/design-system/hooks';
import { Showcase_Root_Path } from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import {
  defaultLocale,
  getIntlayer,
  getLocalizedUrl,
  localeMap,
} from 'intlayer';
import { useEffect } from 'react';
import { useIntlayer } from 'react-intlayer';
import type { ShowcaseProject } from '#/utils/projectActions/types';
import { FiltersBar } from '@/components/FiltersBar';
import { ProjectCard } from '@/components/ProjectCard';
import { ProjectCardSkeleton } from '@/components/ProjectCardSkeleton';
import { ShowcaseHeader } from '@/components/ShowcaseHeader';
import { useSearchParamState } from '@/hooks/useSearchParamState';

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
    const result: ProjectSearchParams = {};

    if (search.page !== undefined) result.page = Number(search.page);

    if (search.pageSize !== undefined)
      result.pageSize = Number(search.pageSize);

    if (search.search !== undefined) result.search = String(search.search);

    if (search.selectedUseCases !== undefined) {
      result.selectedUseCases = Array.isArray(search.selectedUseCases)
        ? search.selectedUseCases.map(String)
        : typeof search.selectedUseCases === 'string'
          ? [search.selectedUseCases]
          : [];
    }

    if (search.isOpenSource !== undefined) {
      result.isOpenSource =
        search.isOpenSource === 'true' || search.isOpenSource === true;
    }
    return result;
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
        getIntlayerAPI().showcaseProject.getShowcaseProjects({
          page: deps.page ?? 1,
          pageSize: deps.pageSize ?? 20,
          search: deps.search ?? '',
          selectedUseCases: deps.selectedUseCases ?? [],
          isOpenSource: deps.isOpenSource ?? false,
        }),
    });
  },
  head: ({ params }) => {
    const { locale } = params;
    const path = Showcase_Root_Path;
    const content = getIntlayer('app', locale);

    const canonicalUrl = getLocalizedUrl(path, locale);

    return {
      links: [
        // Canonical link: Points to the current localized page
        { rel: 'canonical', href: getLocalizedUrl(path, locale) },

        // Hreflang: Tell Google about all localized versions
        ...localeMap(({ locale: mapLocale }) => ({
          rel: 'alternate',
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: For users in unmatched languages
        // Define the default fallback locale (usually your primary language)
        {
          rel: 'alternate',
          hrefLang: 'x-default',
          href: getLocalizedUrl(path, defaultLocale),
        },
      ],
      meta: [
        { title: content.metadata.title },
        { name: 'description', content: content.metadata.description },
        {
          name: 'keywords',
          content: content.metadata.keywords.join(', '),
        },
        { property: 'og:title', content: content.metadata.openGraph.title },
        { property: 'og:description', content: content.metadata.description },
        { property: 'og:url', content: canonicalUrl },
        { name: 'twitter:title', content: content.metadata.title },
        { name: 'twitter:description', content: content.metadata.description },
      ],

      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: content.metadata.title,
            description: content.metadata.description,
            url: canonicalUrl,
          }),
        },
      ],
    };
  },
});

function App() {
  const content = useIntlayer('app');
  const { params, setParam, setParams } = useSearchParamState({
    page: { type: 'number', fallbackValue: 1 },
    pageSize: { type: 'number', fallbackValue: 20 },
    search: { type: 'string' },
    selectedUseCases: { type: 'stringArray' },
    isOpenSource: { type: 'boolean' },
  });

  const { search, setSearch } = useSearch({
    minChars: 2,
    defaultValue: params.search ?? '',
  });

  useEffect(() => {
    setSearch(params.search ?? '');
  }, [params.search, setSearch]);

  const { data: response, isPending } = useGetShowcaseProjects({
    page: params.page,
    pageSize: params.pageSize,
    search: search,
    selectedUseCases: params.selectedUseCases,
    isOpenSource: params.isOpenSource,
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
    <div className="flex w-full flex-1 flex-col px-6">
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
          {isPending ? (
            Array.from({ length: 5 }, (_, i) => (
              <ProjectCardSkeleton key={`skeleton-${i}`} />
            ))
          ) : projects.length > 0 ? (
            projects.map((project: any) => (
              <ProjectCard
                key={project._id}
                project={project as unknown as ShowcaseProject}
              />
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
      </div>

      <div className="mx-auto mt-8 mb-12 w-full max-w-7xl px-4">
        <div className="flex w-full flex-row items-end justify-between gap-4">
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
