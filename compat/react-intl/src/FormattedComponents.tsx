'use client';

import type { ReactElement } from 'react';
import type {
  FormattedDate as _FormattedDate,
  FormattedDateParts as _FormattedDateParts,
  FormattedDateTimeRange as _FormattedDateTimeRange,
  FormattedDisplayName as _FormattedDisplayName,
  FormattedList as _FormattedList,
  FormattedListParts as _FormattedListParts,
  FormattedNumber as _FormattedNumber,
  FormattedNumberParts as _FormattedNumberParts,
  FormattedPlural as _FormattedPlural,
  FormattedRelativeTime as _FormattedRelativeTime,
  FormattedTime as _FormattedTime,
  FormattedTimeParts as _FormattedTimeParts,
} from 'react-intl';
import { useIntl } from './useIntl';

const toDate = (value: Date | number | string | undefined): Date =>
  value instanceof Date
    ? value
    : typeof value === 'undefined'
      ? new Date()
      : new Date(value);

/**
 * Drop-in for react-intl's `<FormattedDate>`.
 * Renders a locale-aware date string using `Intl.DateTimeFormat`.
 */
export const FormattedDate: typeof _FormattedDate = ({
  value,
  children,
  format: _format,
  ...options
}) => {
  const intl = useIntl();
  const formatted = intl.formatDate(value, options);
  if (typeof children === 'function') {
    return (children(formatted) ?? null) as ReactElement | null;
  }
  return <>{formatted}</>;
};

/**
 * Drop-in for react-intl's `<FormattedTime>`.
 * Renders a locale-aware time string using `Intl.DateTimeFormat`.
 */
export const FormattedTime: typeof _FormattedTime = ({
  value,
  children,
  format: _format,
  ...options
}) => {
  const intl = useIntl();
  const formatted = intl.formatTime(value, options);
  if (typeof children === 'function') {
    return (children(formatted) ?? null) as ReactElement | null;
  }
  return <>{formatted}</>;
};

/**
 * Drop-in for react-intl's `<FormattedNumber>`.
 * Renders a locale-aware number string using `Intl.NumberFormat`.
 */
export const FormattedNumber: typeof _FormattedNumber = ({
  value,
  children,
  format: _format,
  ...options
}) => {
  const intl = useIntl();
  const formatted = intl.formatNumber(value, options);
  if (typeof children === 'function') {
    return (children(formatted) ?? null) as ReactElement | null;
  }
  return <>{formatted}</>;
};

/**
 * Drop-in for react-intl's `<FormattedList>`.
 * Renders a locale-aware list string using `Intl.ListFormat`.
 */
export const FormattedList: typeof _FormattedList = ({ value, ...options }) => {
  const intl = useIntl();
  const strings = (value as unknown[]).filter(
    (item): item is string => typeof item === 'string'
  );
  const formatted = intl.formatList(strings, options);
  return <>{formatted}</>;
};

/**
 * Drop-in for react-intl's `<FormattedDisplayName>`.
 * Renders a locale-aware display name using `Intl.DisplayNames`.
 */
export const FormattedDisplayName: typeof _FormattedDisplayName = ({
  value,
  ...options
}) => {
  const intl = useIntl();
  const formatted = intl.formatDisplayName(
    value,
    options as Intl.DisplayNamesOptions
  );
  return <>{formatted ?? value}</>;
};

/**
 * Drop-in for react-intl's `<FormattedRelativeTime>`.
 * Renders a locale-aware relative time string using `Intl.RelativeTimeFormat`.
 * Auto-update (`updateIntervalInSeconds`) is not implemented.
 */
export const FormattedRelativeTime: typeof _FormattedRelativeTime = ({
  value = 0,
  unit = 'second',
  children,
  updateIntervalInSeconds: _updateIntervalInSeconds,
  ...options
}) => {
  const intl = useIntl();
  const formatted = intl.formatRelativeTime(value, unit, options);
  if (typeof children === 'function') {
    return (children(formatted) ?? null) as ReactElement | null;
  }
  return <>{formatted}</>;
};

/**
 * Drop-in for react-intl's `<FormattedPlural>`.
 * Selects the matching plural slot using `Intl.PluralRules`.
 */
export const FormattedPlural: typeof _FormattedPlural = ({
  value,
  other,
  zero,
  one,
  two,
  few,
  many,
  children,
  ...options
}) => {
  const intl = useIntl();
  const rule = intl.formatPlural(value, options);
  const slots: Record<Intl.LDMLPluralRule, unknown> = {
    zero,
    one,
    two,
    few,
    many,
    other,
  };
  const selected = slots[rule] ?? other;

  if (typeof children === 'function') {
    return (children(selected as import('react').ReactNode) ??
      null) as ReactElement | null;
  }

  return <>{selected}</>;
};

/**
 * Drop-in for react-intl's `<FormattedDateTimeRange>`.
 * Renders a locale-aware date range string using `Intl.DateTimeFormat#formatRange`.
 */
export const FormattedDateTimeRange: typeof _FormattedDateTimeRange = ({
  from,
  to,
  children,
  ...options
}) => {
  const intl = useIntl();
  const formatted = intl.formatDateTimeRange(from, to, options);
  if (typeof children === 'function') {
    return (children(formatted) ?? null) as ReactElement | null;
  }
  return <>{formatted}</>;
};

/**
 * Drop-in for react-intl's `<FormattedDateParts>`.
 * Renders format parts via a `children` render-prop.
 */
export const FormattedDateParts: typeof _FormattedDateParts = ({
  value,
  children,
  format: _format,
  ...options
}) => {
  const intl = useIntl();
  const parts = intl.formatDateToParts(
    value as Parameters<Intl.DateTimeFormat['format']>[0],
    options
  );
  return <>{children(parts)}</>;
};

/**
 * Drop-in for react-intl's `<FormattedTimeParts>`.
 * Renders format parts via a `children` render-prop.
 */
export const FormattedTimeParts: typeof _FormattedTimeParts = ({
  value,
  children,
  format: _format,
  ...options
}) => {
  const intl = useIntl();
  const parts = intl.formatTimeToParts(
    value as Parameters<Intl.DateTimeFormat['format']>[0],
    options
  );
  return <>{children(parts)}</>;
};

/**
 * Drop-in for react-intl's `<FormattedNumberParts>`.
 * Renders format parts via a `children` render-prop.
 */
export const FormattedNumberParts: typeof _FormattedNumberParts = ({
  value,
  children,
  format: _format,
  ...options
}) => {
  const intl = useIntl();
  const parts = intl.formatNumberToParts(value, options);
  return <>{children(parts)}</>;
};

/**
 * Drop-in for react-intl's `<FormattedListParts>`.
 * Renders list format parts via a `children` render-prop.
 */
export const FormattedListParts: typeof _FormattedListParts = ({
  value,
  children,
  ...options
}) => {
  const intl = useIntl();
  const strings = Array.from(value).filter(
    (item): item is string => typeof item === 'string'
  );
  const parts = intl.formatListToParts(strings, options);
  return <>{children(parts)}</>;
};
