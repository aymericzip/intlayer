import { resolveDictionaryArgument } from '@intlayer/core/dictionaryManipulator';
import type {
  DeclaredLocales,
  DictionaryKeys,
  DictionaryRegistryResult,
  DictionarySelectorForKey,
  ExtractSelectorLocale,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import {
  type DeepTransformContent,
  getIntlayer,
  type WithOnChange,
} from 'vanilla-intlayer';
import { getRequestLocale } from './requestStorage';
import { withInertOnChange } from './withInertOnChange';

/**
 * Picks one dictionary by its key and returns its content for the locale of
 * the request being rendered, read from `Astro.locals.intlayer`.
 *
 * The second argument is either a locale or a selector object
 * (`{ item }`, `{ variant }`, optionally with `locale`); it takes precedence
 * over the request locale.
 *
 * Same signature and content shape as the client-side hook this entry resolves
 * to in the browser (`vanilla-intlayer`), so a call moves between the
 * frontmatter and a `<script>` unchanged.
 *
 * @example
 * ```astro
 * ---
 * import { useIntlayer } from 'astro-intlayer';
 *
 * const { title, description } = useIntlayer('home');
 * ---
 * <h1>{title}</h1>
 * ```
 */
export const useIntlayer = <
  const T extends DictionaryKeys,
  const A extends LocalesValues | DictionarySelectorForKey<T> = DeclaredLocales,
>(
  key: T,
  localeOrSelector?: A
): WithOnChange<
  DeepTransformContent<DictionaryRegistryResult<T, A>, ExtractSelectorLocale<A>>
> =>
  withInertOnChange(
    getIntlayer<T, A>(
      key,
      // Selectors disabled project-wide (build-time flag) ⇒ the argument can
      // only be a locale, so the merge is dropped by the bundler.
      (process.env.INTLAYER_DICTIONARY_SELECTOR !== 'false'
        ? resolveDictionaryArgument({
            localeOrSelector,
            contextLocale: getRequestLocale(),
            dictionaryKey: key as string,
          })
        : (localeOrSelector ?? getRequestLocale())) as A
    )
  );
