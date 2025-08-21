import configuration from '@intlayer/config/built';
import { type LocalesValues } from '@intlayer/config/client';
import { Intl as CachedIntl } from '../utils/intl';

type RelativeTimeUnit = Intl.RelativeTimeFormatUnit;

/**
 * Calculate the difference between 2 dates in the given unit.
 */
const diffInUnit = (from: Date, to: Date, unit: RelativeTimeUnit): number => {
  const msDiff = to.getTime() - from.getTime();
  const sec = msDiff / 1000;

  switch (unit) {
    case 'second':
      return sec;
    case 'minute':
      return sec / 60;
    case 'hour':
      return sec / 3600;
    case 'day':
      return sec / 86400;
    case 'month':
      return sec / (30 * 86400); // approx
    case 'quarter':
      return sec / (3 * 30 * 86400); // 3 months approx
    case 'year':
      return sec / (365 * 86400); // approx
    default:
      return sec;
  }
};

export const relativeTime = (
  from: Date | string | number,
  to: Date | string | number = new Date(),
  options?: Intl.RelativeTimeFormatOptions & {
    locale?: LocalesValues;
    unit?: RelativeTimeUnit;
  }
): string => {
  const fromDate = new Date(from);
  const toDate = new Date(to);
  const unit = options?.unit ?? 'second';

  const value = diffInUnit(fromDate, toDate, unit);

  return new CachedIntl.RelativeTimeFormat(
    options?.locale ?? configuration.internationalization.defaultLocale,
    options
  ).format(Math.round(value), unit);
};
