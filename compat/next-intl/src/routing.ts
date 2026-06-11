import { internationalization, routing } from '@intlayer/config/built';
import type { LocalesValues } from '@intlayer/types/module_augmentation';

export type Routing = {
  locales: LocalesValues[];
  defaultLocale: LocalesValues;
  localePrefix?: 'always' | 'as-needed' | 'never';
  pathnames?: Record<string, string | Record<string, string>>;
};

/**
 * Drop-in replacement for next-intl's `defineRouting()`.
 *
 * Merges the provided config with Intlayer's own routing / internationalization
 * configuration so you don't have to repeat locale lists. All fields are
 * optional — omitted values are read from the Intlayer config at runtime.
 *
 * @example
 * ```ts
 * export default defineRouting({
 *   locales: ['en', 'fr'],
 *   defaultLocale: 'en',
 * });
 * ```
 */
export const defineRouting: (config?: Partial<Routing>) => Routing = (
  config?: Partial<Routing>
): Routing => ({
  locales:
    config?.locales ??
    ((internationalization?.locales ?? []) as LocalesValues[]),
  defaultLocale:
    config?.defaultLocale ??
    (internationalization?.defaultLocale as LocalesValues),
  localePrefix:
    config?.localePrefix ?? (routing?.prefixDefault ? 'always' : 'as-needed'),
  ...config,
});
