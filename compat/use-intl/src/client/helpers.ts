'use client';

import { log } from '@intlayer/config/built';
import { CYAN } from '@intlayer/config/colors';
import { colorize, getAppLogger } from '@intlayer/config/logger';
import { useLocale as useLocaleIntlayer } from 'react-intlayer';
import type {
  useFormatter as _useFormatter,
  useMessages as _useMessages,
  useNow as _useNow,
  useTimeZone as _useTimeZone,
} from 'use-intl';
import { buildIntlFormatter } from '../shared/intlFormatter';

/**
 * Drop-in for use-intl's `useNow`.
 * Returns the current `Date`. The `updateInterval` option is ignored.
 */
export const useNow: typeof _useNow = () => new Date();

/**
 * Drop-in for use-intl's `useTimeZone`.
 * Returns the system time zone resolved from `Intl.DateTimeFormat`.
 */
export const useTimeZone: typeof _useTimeZone = () =>
  Intl.DateTimeFormat().resolvedOptions().timeZone;

/**
 * Drop-in for use-intl's `useMessages`.
 *
 * @deprecated useMessages has no use case with intlayer.
 * Messages are loaded automatically under the hood.
 * @returns An empty object.
 */
export const useMessages: typeof _useMessages = () => {
  if (process.env.NODE_ENV === 'development') {
    const appLogger = getAppLogger({ log });
    appLogger(
      `${colorize('useMessages', CYAN)} has no use case with intlayer. Messages are loaded automatically under the hood for bundle optimization reason`
    );
  }

  return {} as ReturnType<typeof _useMessages>;
};

/**
 * Drop-in for use-intl's `useFormatter`.
 * Returns locale-aware formatters backed by the native `Intl.*` APIs:
 * `dateTime`, `number`, `dateTimeRange`, `relativeTime`, `list`, and
 * `displayName`.
 */
export const useFormatter: typeof _useFormatter = () => {
  const { locale } = useLocaleIntlayer();
  return buildIntlFormatter((locale as string) ?? 'en');
};
