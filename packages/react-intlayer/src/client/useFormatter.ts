'use client';

import { useCompact } from './useCompact';
import { useCurrency } from './useCurrency';
import { useDate } from './useDate';
import { useList } from './useList';
import { useListFormatter } from './useListFormatter';
import { useNumber } from './useNumber';
import { usePercentage } from './usePercentage';
import { useRelativeTime } from './useRelativeTime';
import { useUnit } from './useUnit';

export const useFormatter = () => {
  const currency = useCurrency();
  const compact = useCompact();
  const unit = useUnit();
  const number = useNumber();
  const percentage = usePercentage();
  const date = useDate();
  const relativeTime = useRelativeTime();
  const list = useList();
  const listFormatter = useListFormatter();

  return {
    currency,
    compact,
    unit,
    number,
    percentage,
    date,
    relativeTime,
    list,
    listFormatter,
  };
};
