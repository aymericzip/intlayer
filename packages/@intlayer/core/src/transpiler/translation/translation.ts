import type { StrictModeLocaleMap } from '@intlayer/types/module_augmentation';
import type { TypedNodeModel } from '@intlayer/types/nodeType';
import { formatNodeType, TRANSLATION } from '@intlayer/types/nodeType';

export type TranslationContent<
  Content = unknown,
  RecordContent extends
    StrictModeLocaleMap<Content> = StrictModeLocaleMap<Content>,
> = TypedNodeModel<typeof TRANSLATION, RecordContent>;

/**
 *
 * Function intended to be used to build intlayer dictionaries.
 *
 * Get the content of a translation based on the locale.
 *
 * Usage:
 *
 * ```ts
 * translation<string>({
 *   "en": "Hello",
 *   "fr": "Bonjour",
 *   // ... any other available locale
 * })
 * ```
 *
 * Using TypeScript:
 * - this function require each locale to be defined if defined in the project configuration.
 * - If a locale is missing, it will make each existing locale optional and raise an error if the locale is not found.
 */
const translation = <
  Content = unknown,
  ContentRecord extends
    StrictModeLocaleMap<Content> = StrictModeLocaleMap<Content>,
>(
  content: ContentRecord
): TranslationContent<Content, ContentRecord> =>
  formatNodeType(TRANSLATION, content) satisfies TranslationContent<
    Content,
    ContentRecord
  >;

export { translation as t };
