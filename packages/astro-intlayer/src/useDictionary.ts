import { resolveDictionaryArgument } from '@intlayer/core/dictionaryManipulator';
import type {
  Dictionary,
  DictionarySelectorForGroup,
  QualifiedDictionaryGroup,
  ResolveQualifiedDictionaryContent,
} from '@intlayer/types/dictionary';
import type {
  DeclaredLocales,
  ExtractSelectorLocale,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import {
  type DeepTransformContent,
  getDictionary,
  type WithOnChange,
} from 'vanilla-intlayer';
import { getRequestLocale } from './requestStorage';
import { withInertOnChange } from './withInertOnChange';

/**
 * Transforms an imported dictionary (or qualified dictionary group) and returns
 * its content for the locale of the request being rendered, read from
 * `Astro.locals.intlayer`.
 *
 * The second argument is either a locale or a selector object
 * (`{ item }`, `{ variant }`, optionally with `locale`); it takes precedence
 * over the request locale.
 *
 * Same signature and content shape as the client-side hook this entry resolves
 * to in the browser (`vanilla-intlayer`).
 *
 * @example
 * ```astro
 * ---
 * import { useDictionary } from 'astro-intlayer';
 * import homeContent from '../content/home.content';
 *
 * const { title } = useDictionary(homeContent);
 * ---
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
): WithOnChange<
  DeepTransformContent<
    ResolveQualifiedDictionaryContent<T, A>,
    ExtractSelectorLocale<A>
  >
> =>
  withInertOnChange(
    getDictionary<T, A>(
      dictionary,
      resolveDictionaryArgument({
        localeOrSelector,
        contextLocale: getRequestLocale(),
        dictionaryKey: dictionary.key,
      }) as A
    )
  );
