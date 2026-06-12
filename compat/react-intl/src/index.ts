'use client';

// ── Type re-exports ───────────────────────────────────────────────────────────
export type {
  CustomFormats,
  FormatDateOptions,
  FormatDisplayNameOptions,
  FormatListOptions,
  FormatNumberOptions,
  FormatPluralOptions,
  FormatRelativeTimeOptions,
  Formatters,
  IntlCache,
  IntlConfig,
  IntlFormatters,
  IntlShape,
  MessageDescriptor,
  MessageFormatElement,
  PrimitiveType,
  ResolvedIntlConfig,
} from 'react-intl';
// ── Context & provider ───────────────────────────────────────────────────────
export { IntlContext, RawIntlProvider } from './context';
export { createIntl, createIntlCache } from './createIntl';
// ── Utilities ─────────────────────────────────────────────────────────────────
export { defineMessage, defineMessages } from './defineMessages';
// ── Error stubs ───────────────────────────────────────────────────────────────
export {
  InvalidConfigError,
  MessageFormatError,
  MissingDataError,
  MissingTranslationError,
  ReactIntlError,
  ReactIntlErrorCode,
  UnsupportedFormatterError,
} from './errors';
export {
  FormattedDate,
  FormattedDateParts,
  FormattedDateTimeRange,
  FormattedDisplayName,
  FormattedList,
  FormattedListParts,
  FormattedNumber,
  FormattedNumberParts,
  FormattedPlural,
  FormattedRelativeTime,
  FormattedTime,
  FormattedTimeParts,
} from './FormattedComponents';
// ── Components ───────────────────────────────────────────────────────────────
export { FormattedMessage } from './FormattedMessage';
export { IntlProvider } from './IntlProvider';
// ── Hook ─────────────────────────────────────────────────────────────────────
export { useIntl } from './useIntl';
