import { resolveDictionaryArgument } from '@intlayer/core/dictionaryManipulator';
import { getIntlayer } from '@intlayer/core/interpreter';
import type {
  DeclaredLocales,
  DictionaryKeys,
  DictionarySelectorForKey,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import { getRequestLocale } from './requestStorage';

/**
 * Picks one dictionary by its key and returns its content for the locale of
 * the request being handled.
 *
 * The second argument is either a locale or a selector object
 * (`{ item }`, `{ variant }`, optionally with `locale`); it takes precedence
 * over the request locale.
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
) =>
  getIntlayer<T, A>(
    key,
    resolveDictionaryArgument({
      localeOrSelector,
      contextLocale: getRequestLocale(),
      dictionaryKey: key as string,
    }) as A
  );
