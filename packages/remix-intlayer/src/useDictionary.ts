import { resolveDictionaryArgument } from '@intlayer/core/dictionaryManipulator';
import { getDictionary } from '@intlayer/core/interpreter';
import type {
  Dictionary,
  DictionarySelectorForGroup,
  QualifiedDictionaryGroup,
} from '@intlayer/types/dictionary';
import type {
  DeclaredLocales,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import { getRequestLocale } from './requestStorage';

/**
 * Transforms an imported dictionary (or qualified dictionary group) and returns
 * its content for the locale of the request being handled.
 *
 * The second argument is either a locale or a selector object
 * (`{ item }`, `{ variant }`, optionally with `locale`); it takes precedence
 * over the request locale.
 *
 * @example
 * ```ts
 * import homeContent from './home.content';
 *
 * router.get('/', () => {
 *   const { title } = useDictionary(homeContent);
 *   return new Response(title);
 * });
 * ```
 */
export const useDictionary = <
  const T extends Dictionary | QualifiedDictionaryGroup,
  const A extends
    | LocalesValues
    | DictionarySelectorForGroup<T> = DeclaredLocales,
>(
  dictionary: T,
  localeOrSelector?: A
) =>
  getDictionary<T, A>(
    dictionary,
    resolveDictionaryArgument({
      localeOrSelector,
      contextLocale: getRequestLocale(),
      dictionaryKey: dictionary.key,
    }) as A
  );
