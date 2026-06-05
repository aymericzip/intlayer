import type {
  IntlProvider as _IntlProvider,
  useFormatter as _useFormatter,
  useMessages as _useMessages,
  useNow as _useNow,
  useTimeZone as _useTimeZone,
} from 'next-intl';
import type * as React from 'react';

export const useNow = (() => new Date()) as unknown as typeof _useNow;

export const useTimeZone = (() =>
  Intl.DateTimeFormat().resolvedOptions()
    .timeZone) as unknown as typeof _useTimeZone;

export const useMessages = (() => ({})) as unknown as typeof _useMessages;

export const useFormatter = (() => ({
  dateTime: (val: Date | number, options?: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat('en', options).format(val),
  number: (val: number | bigint, options?: Intl.NumberFormatOptions) =>
    new Intl.NumberFormat('en', options).format(val),
  dateTimeRange: (
    _start: Date | number,
    _end: Date | number,
    _options?: unknown
  ) => '',
  relativeTime: (_val: number, _unit: string, _options?: unknown) => '',
  list: (_val: unknown[], _options?: unknown) => '',
  plural: (_val: number, _options?: unknown) => '',
})) as unknown as typeof _useFormatter;

interface ProviderProps {
  children?: React.ReactNode;
  [key: string]: unknown;
}

const _IntlProviderImpl: React.FC<ProviderProps> = ({ children }) => (
  <>{children}</>
);
export const IntlProvider =
  _IntlProviderImpl as unknown as typeof _IntlProvider;

export const useExtracted = (..._args: unknown[]) => ({});
