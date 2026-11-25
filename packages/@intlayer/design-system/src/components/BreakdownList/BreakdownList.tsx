import { ExpandCollapse } from '@intlayer/design-system/expand-collapse';
import type { FC, ReactNode } from 'react';

const BREAKDOWN_COLLAPSED_HEIGHT = 400;

type BreakdownListProps = {
  rows: { label: ReactNode; users: number; views: number }[];
  usersLabel: string;
  viewsLabel: string;
  metric: 'users' | 'views';
  locale?: string;
  /** Shown instead of the list when it has no row. */
  emptyLabel: ReactNode;
};

/**
 * Formats the counters shown next to a breakdown row. A dimension the
 * breakdown cannot carry is left out rather than printed as a zero — pages are
 * counted in views only, countries in visitors only.
 */
const formatRowCounters = (
  row: { users: number; views: number },
  usersLabel: string,
  viewsLabel: string,
  metric: 'users' | 'views',
  locale?: string
): string[] =>
  (
    [
      ['users', row.users, usersLabel],
      ['views', row.views, viewsLabel],
    ] as const
  )
    .filter(([dimension, value]) => value > 0 || dimension === metric)
    .map(([, value, label]) => `${value.toLocaleString(locale)} ${label}`);

/**
 * Ranked horizontal-bar list for a breakdown tab. Long lists (countries can run
 * to dozens of rows) collapse behind a "show all" toggle.
 */
export const BreakdownList: FC<BreakdownListProps> = ({
  rows,
  usersLabel,
  viewsLabel,
  metric,
  emptyLabel,
  locale,
}) => {
  if (rows.length === 0) {
    return (
      <p className="flex flex-1 items-center justify-center py-10 text-center text-sm text-neutral">
        {emptyLabel}
      </p>
    );
  }

  const max = Math.max(1, ...rows.map((row) => row[metric]));

  return (
    <ExpandCollapse minHeight={BREAKDOWN_COLLAPSED_HEIGHT}>
      <ul className="flex flex-col gap-3 pb-6">
        {rows.map((row, index) => {
          const value = row[metric];
          const ratio = value / max;

          return (
            <li
              // oxlint-disable-next-line react/no-array-index-key -- rows are stable per fetch and labels can repeat
              key={index}
              className="flex flex-col gap-1"
            >
              <div className="flex items-start justify-between gap-2 text-sm">
                <div className="flex min-w-0 flex-1 items-start gap-2 text-text">
                  {row.label}
                </div>
                <span className="shrink-0 text-xs text-neutral">
                  {formatRowCounters(
                    row,
                    usersLabel,
                    viewsLabel,
                    metric,
                    locale
                  ).join(' · ')}
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral/10">
                <div
                  className="h-full min-w-1 rounded-full bg-text/60 transition-all duration-500 ease-out"
                  style={{ width: `${Math.round(ratio * 100)}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </ExpandCollapse>
  );
};
