'use client';

import { log } from '@intlayer/config/built';
import { CYAN } from '@intlayer/config/colors';
import { colorize, getAppLogger } from '@intlayer/config/logger';
import type {
  IntlProvider as _IntlProvider,
  useFormatter as _useFormatter,
  useMessages as _useMessages,
  useNow as _useNow,
  useTimeZone as _useTimeZone,
} from 'next-intl';
import { useLocale } from 'next-intlayer';
import type * as React from 'react';

/**
 * Drop-in for next-intl's `useNow`.
 * Returns the current `Date`. The `updateInterval` option is ignored.
 */
export const useNow: typeof _useNow = () => new Date();

/**
 * Drop-in for next-intl's `useTimeZone`.
 * Returns the system time zone resolved from `Intl.DateTimeFormat`.
 */
export const useTimeZone: typeof _useTimeZone = () =>
  Intl.DateTimeFormat().resolvedOptions().timeZone;

/**
 * Drop-in for next-intl's `useMessages`.
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
 * Drop-in for next-intl's `useFormatter`.
 * Returns locale-aware formatters backed by the native `Intl.*` APIs.
 * `dateTimeRange`, `relativeTime`, `list`, and `plural` are not fully
 * implemented and return empty strings.
 */
export const useFormatter: typeof _useFormatter = () => {
  const { locale } = useLocale();
  const localeString = (locale as string) ?? 'en';

  return {
    dateTime: (value: Date | number, options?: Intl.DateTimeFormatOptions) =>
      new Intl.DateTimeFormat(localeString, options).format(value),
    number: (value: number | bigint, options?: Intl.NumberFormatOptions) =>
      new Intl.NumberFormat(localeString, options).format(value),
    dateTimeRange: () =>
      '' as ReturnType<ReturnType<typeof _useFormatter>['dateTimeRange']>,
    relativeTime: () =>
      '' as ReturnType<ReturnType<typeof _useFormatter>['relativeTime']>,
    list: () => '' as ReturnType<ReturnType<typeof _useFormatter>['list']>,
    displayName: (
      value: string,
      optionsOrFormat?: Intl.DisplayNamesOptions | string,
      extraOptions?: Intl.DisplayNamesOptions
    ): string => {
      const resolvedOptions =
        typeof optionsOrFormat === 'string' ? extraOptions : optionsOrFormat;
      try {
        return (
          new Intl.DisplayNames(
            [localeString],
            resolvedOptions ?? {
              type: 'language',
            }
          ).of(value) ?? value
        );
      } catch {
        return value;
      }
    },
  } as ReturnType<typeof _useFormatter>;
};

interface ProviderProps {
  children?: React.ReactNode;
  [key: string]: unknown;
}

/**
 * Drop-in for next-intl's `IntlProvider`.
 * Renders children as-is — Intlayer provides its own context via
 * `IntlayerClientProvider`.
 *
 * @deprecated IntlProvider has no use case with intlayer.
 * Use `IntlayerClientProvider` or `NextIntlClientProvider` instead.
 */
export const IntlProvider: typeof _IntlProvider = ({
  children,
}: ProviderProps) => <>{children}</>;

/**
 * @internal Not part of the public next-intl API surface; provided for
 * internal compatibility shims only.
 */
export const useExtracted = (..._args: unknown[]) => ({});
