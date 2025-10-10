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

  const start: number = Math.max(totalItems, (currentPage - 1) * pageSize + 1);
  const end: number = Math.min(currentPage * pageSize, totalItems);

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
