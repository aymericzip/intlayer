import type { LocalesValues } from '@intlayer/types/module_augmentation';
import type {
  createIntl as _createIntl,
  createIntlCache as _createIntlCache,
  IntlCache,
  IntlConfig,
  IntlShape,
} from 'react-intl';
import { createIntlObject } from './createIntlObject';

/**
 * Drop-in for react-intl's `createIntlCache`.
 *
 * Returns an empty cache token. In the intlayer compat adapter, formatter
 * instances are not pooled (all backed by native `Intl.*` constructors), so
 * the cache object serves only as an API-compatibility token.
 *
 * @deprecated
 * Has no practical effect with intlayer — no formatter pooling is needed.
 */
export const createIntlCache: typeof _createIntlCache = (): IntlCache =>
  ({
    dateTime: {},
    number: {},
    message: {},
    relativeTime: {},
    pluralRules: {},
    list: {},
    displayNames: {},
  }) as IntlCache;

/**
 * Drop-in for react-intl's `createIntl`.
 *
 * Creates an `IntlShape` instance backed by intlayer compiled dictionaries
 * for the given `locale`. Use this in non-React contexts (e.g. server-side
 * route handlers).
 *
 * `messages`, `formats`, `timeZone`, `onError`, and `cache` are accepted for
 * API compatibility but have no effect — Intlayer uses its own compiled
 * dictionaries.
 *
 * @example
 * ```ts
 * const intl = createIntl({ locale: 'en' });
 * intl.formatMessage({ id: 'home.title' });
 * ```
 */
export const createIntl: typeof _createIntl = (
  { locale }: IntlConfig,
  _cache?: IntlCache
): IntlShape => createIntlObject(locale as LocalesValues);
