/**
 * Re-exports of use-intl's public types so that existing
 * `import type { … } from 'use-intl'` statements keep resolving after the
 * package is aliased to `@intlayer/use-intl`.
 *
 * These are type-only and erased at build time; the real definitions are
 * pulled from the `use-intl` peer dependency.
 */
export type {
  AbstractIntlMessages,
  AppConfig,
  DateTimeFormatOptions,
  Formats,
  ICUArgs,
  ICUTags,
  IntlConfig,
  Locale,
  MarkupTagsFunction,
  MarkupTranslationValues,
  MessageKeys,
  Messages,
  NamespaceKeys,
  NestedKeyOf,
  NestedValueOf,
  NumberFormatOptions,
  RelativeTimeFormatOptions,
  RichTagsFunction,
  RichTranslationValues,
  Timezone,
  TranslationValues,
} from 'use-intl';
