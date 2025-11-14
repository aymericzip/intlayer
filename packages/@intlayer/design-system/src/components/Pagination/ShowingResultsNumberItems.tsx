'use client';

import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { useNumber } from 'react-intlayer/format';

export type ShowingResultsNumberItemsProps = {
  currentPage: number;
  pageSize: number;
  totalItems: number;
};

export const ShowingResultsNumberItems: FC<ShowingResultsNumberItemsProps> = ({
  currentPage,
  pageSize,
  totalItems,
}) => {
  const { showingResults } = useIntlayer('pagination');
  const number = useNumber();

  // Guard against weird inputs
  const safePageSize = Math.max(1, pageSize);
  const totalPages = Math.max(1, Math.ceil(totalItems / safePageSize));
  const page = Math.min(Math.max(1, currentPage), totalPages);

  const start =
    totalItems === 0 ? 0 : Math.min((page - 1) * safePageSize + 1, totalItems);
  const end = totalItems === 0 ? 0 : Math.min(page * safePageSize, totalItems);

  return (
    <div className="text-neutral-600 text-sm dark:text-neutral-400">
      {showingResults({
        start: number(start),
        end: number(end),
        total: number(totalItems),
      })}
    </div>
  );
};
