import type {
  getFormatter as _getFormatter,
  getNow as _getNow,
  getTimeZone as _getTimeZone,
} from 'next-intl/server';
import { createFormatter } from '../createFormatter';
import { getLocale } from './getLocale';

/**
 * Drop-in for next-intl's server `getFormatter()`.
 * Returns locale-aware formatters backed by the native `Intl.*` APIs.
 */
export const getFormatter: typeof _getFormatter = (async (options?: {
  locale?: string;
}) => {
  const locale = options?.locale ?? (await getLocale());
  return createFormatter(locale as string);
}) as typeof _getFormatter;

/**
 * Drop-in for next-intl's server `getNow()`.
 * Returns the current `Date`.
 */
export const getNow: typeof _getNow = (async () =>
  new Date()) as typeof _getNow;

/**
 * Drop-in for next-intl's server `getTimeZone()`.
 * Returns the system time zone resolved from `Intl.DateTimeFormat`.
 */
export const getTimeZone: typeof _getTimeZone = (async () =>
  Intl.DateTimeFormat().resolvedOptions().timeZone) as typeof _getTimeZone;
