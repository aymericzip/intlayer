import { useGetReviewerMarketplace } from '@intlayer/design-system/hooks';
import { Loader } from '@intlayer/design-system/loader';
import { App_ReviewerMarketplace_Reviewer_Path } from '@intlayer/design-system/routes';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { FC } from 'react';
import { useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Link } from '#components/Link/Link';
import { ReviewerProfileCard } from '#components/ReviewerDashboardPage/ReviewerProfileCard';
import type { ReviewerFiltersValue } from './ReviewerFilters';
import { ReviewerFilters } from './ReviewerFilters';

const PAGE_SIZE = 20;

const buildPageWindow = (
  current: number,
  total: number
): Array<number | '…'> => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: Array<number | '…'> = [1];
  if (current > 3) pages.push('…');
  for (
    let p = Math.max(2, current - 1);
    p <= Math.min(total - 1, current + 1);
    p++
  ) {
    pages.push(p);
  }
  if (current < total - 2) pages.push('…');
  pages.push(total);
  return pages;
};

export const ReviewerMarketplacePage: FC = () => {
  const {
    title,
    description,
    noReviewersFound,
    filtersAriaLabel,
    resultsAriaLabel,
    loadingAriaLabel,
    paginationAriaLabel,
    previousPageAriaLabel,
    nextPageAriaLabel,
    reviewersFound,
  } = useIntlayer('find-reviewer-page');
  const [filters, setFilters] = useState<ReviewerFiltersValue>({});
  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetReviewerMarketplace({
    ...filters,
    page,
    pageSize: PAGE_SIZE,
  });

  const reviewers = data?.data ?? [];
  const totalPages = data?.total_pages ?? 1;

  const handleFilterChange = (newFilters: ReviewerFiltersValue) => {
    setFilters(newFilters);
    setPage(1); // reset to first page on filter change
  };

  return (
    <div className="m-auto flex h-full w-full flex-1 flex-col gap-8 p-8">
      <header>
        <h1 className="font-bold text-3xl">{title}</h1>
        <p className="text-neutral text-sm">{description}</p>
      </header>

      <div className="flex flex-col gap-6 md:flex-row">
        <aside
          aria-label={filtersAriaLabel.value}
          className="w-full shrink-0 md:w-72"
        >
          <ReviewerFilters value={filters} onChange={handleFilterChange} />
        </aside>

        <section
          aria-label={resultsAriaLabel.value}
          aria-live="polite"
          aria-busy={isLoading}
          className="flex flex-1 flex-col gap-6"
        >
          {isLoading ? (
            <div
              className="flex justify-center py-12"
              role="status"
              aria-label={loadingAriaLabel.value}
            >
              <Loader />
            </div>
          ) : reviewers.length === 0 ? (
            <p role="status" className="py-12 text-center text-neutral">
              {noReviewersFound}
            </p>
          ) : (
            <ul
              aria-label={String(reviewersFound({ count: reviewers.length }))}
              className="grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3"
            >
              {reviewers.map((reviewer) => (
                <li key={reviewer.id}>
                  <Link
                    to={App_ReviewerMarketplace_Reviewer_Path as any}
                    params={{ reviewerId: reviewer.id }}
                    label=""
                    color="text"
                    variant="invisible-link"
                    className="block"
                  >
                    <ReviewerProfileCard profile={reviewer} size="sm" />
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {totalPages > 1 && (
            <nav
              aria-label={paginationAriaLabel.value}
              className="flex items-center justify-center gap-1"
            >
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                aria-label={previousPageAriaLabel.value}
                className="flex size-8 items-center justify-center rounded-lg border border-neutral/20 transition-colors hover:bg-neutral/10 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={16} aria-hidden="true" />
              </button>

              {buildPageWindow(page, totalPages).map((item, i) =>
                item === '…' ? (
                  <span
                    key={`ellipsis-${String(i)}`}
                    className="flex size-8 items-center justify-center text-neutral text-sm"
                  >
                    …
                  </span>
                ) : (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setPage(item)}
                    aria-current={item === page ? 'page' : undefined}
                    className={`flex size-8 items-center justify-center rounded-lg border text-sm transition-colors ${item === page ? 'border-text bg-text font-semibold text-background' : 'border-neutral/20 hover:bg-neutral/10'}`}
                  >
                    {item}
                  </button>
                )
              )}

              <button
                type="button"
                onClick={() =>
                  setPage((page) => Math.min(totalPages, page + 1))
                }
                disabled={page >= totalPages}
                aria-label={nextPageAriaLabel.value}
                className="flex size-8 items-center justify-center rounded-lg border border-neutral/20 transition-colors hover:bg-neutral/10 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight size={16} aria-hidden="true" />
              </button>
            </nav>
          )}
        </section>
      </div>
    </div>
  );
};
