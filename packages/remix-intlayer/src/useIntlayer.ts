import {
  parseDictionarySelector,
  resolveDictionaryArgument,
} from '@intlayer/core/dictionaryManipulator';
import { getIntlayer } from '@intlayer/core/interpreter';
import type {
  DeclaredLocales,
  DictionaryKeys,
  DictionaryRegistryResult,
  DictionarySelectorForKey,
  ExtractSelectorLocale,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import { type DeepTransformContent, getPlugins } from './plugins';
import { getRequestLocale } from './requestStorage';

/**
 * Picks one dictionary by its key and returns its content for the locale of
 * the request being handled.
 *
 * The second argument is either a locale or a selector object
 * (`{ item }`, `{ variant }`, optionally with `locale`); it takes precedence
 * over the request locale.
 *
 * `md()` and `html()` nodes render to HTML strings: read `.value`, or call
 * `.use(components)` to override tags, and inject the result with `html.raw`
 * or `innerHTML`.
 *
 * @example
 * ```ts
 * router.get('/', () => {
 *   const { title } = useIntlayer('home');
 *   return new Response(title);
 * });
 * ```
 */
export const useIntlayer = <
  const T extends DictionaryKeys,
  const A extends LocalesValues | DictionarySelectorForKey<T> = DeclaredLocales,
>(
  key: T,
  localeOrSelector?: A
): DeepTransformContent<
  DictionaryRegistryResult<T, A>,
  ExtractSelectorLocale<A>
> => {
  // Selectors disabled project-wide (build-time flag) ⇒ the argument can only
  // be a locale, so the selector resolution is dropped by the bundler.
  const argument =
    process.env.INTLAYER_DICTIONARY_SELECTOR !== 'false'
      ? resolveDictionaryArgument({
          localeOrSelector,
          contextLocale: getRequestLocale(),
          dictionaryKey: key as string,
        })
      : (localeOrSelector ?? getRequestLocale());
  const locale =
    process.env.INTLAYER_DICTIONARY_SELECTOR !== 'false'
      ? parseDictionarySelector(argument).locale
      : (argument as LocalesValues | undefined);

  return getIntlayer<T, A>(
    key,
    argument as A,
    getPlugins(locale)
  ) as DeepTransformContent<
    DictionaryRegistryResult<T, A>,
    ExtractSelectorLocale<A>
  >;
};
