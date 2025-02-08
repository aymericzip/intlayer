import { formatNodeType, NodeType } from '../../types/index';
import type { LanguageContent, TranslationContent } from './types';

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
  ContentRecord extends LanguageContent<Content> = LanguageContent<Content>,
>(
  content: ContentRecord
) =>
  formatNodeType(NodeType.Translation, content) satisfies TranslationContent<
    Content,
    ContentRecord
  >;

export { translation as t };
