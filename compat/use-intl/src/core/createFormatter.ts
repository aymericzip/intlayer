import type { createFormatter as _createFormatter } from 'use-intl';
import { buildIntlFormatter } from '../shared/intlFormatter';

/**
 * Drop-in for use-intl's `createFormatter`.
 *
 * Returns locale-aware formatters backed by the native `Intl.*` APIs:
 * `dateTime`, `number`, `dateTimeRange`, `relativeTime`, `list`, and
 * `displayName`. `now`, `timeZone`, `formats`, and `onError` are accepted for
 * API compatibility but only `locale` influences the output.
 *
 * @example
 * ```ts
 * const format = createFormatter({ locale: 'en' });
 * format.number(1234.5, { style: 'currency', currency: 'USD' });
 * ```
 */
export const createFormatter: typeof _createFormatter = ({ locale }) =>
  buildIntlFormatter(locale);
