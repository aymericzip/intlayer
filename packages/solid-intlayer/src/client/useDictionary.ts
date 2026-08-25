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
import { createMemo, useContext } from 'solid-js';
import { getDictionary } from '../getDictionary';
import type { DeepTransformContent } from '../plugins';
import { IntlayerClientContext, type IntlayerValue } from './IntlayerProvider';
import { unwrapLoadable } from './useLoadDynamic';

/**
 * On the client side, Hook that transforms a dictionary (or qualified
 * dictionary group) and returns its reactive content.
 *
 * The second argument is either a locale or a selector object
 * (`{ item }`, `{ variant }`, optionally with `locale`).
 *
 * If the locale is not provided (directly or through the selector), it will
 * use the locale from the client context.
 */
export const useDictionary = <
  const T extends Dictionary | QualifiedDictionaryGroup,
  const A extends
    | LocalesValues
    | DictionarySelectorForGroup<T> = DeclaredLocales,
>(
  dictionary: T,
  localeOrSelector?: A
): DeepTransformContent<
  ResolveQualifiedDictionaryContent<T, A>,
  ExtractSelectorLocale<A>
> => {
  // Reads outside a provider fall back to an empty context.
  const context: Partial<IntlayerValue> =
    useContext(IntlayerClientContext) ?? {};

  const accessor = createMemo(() => {
    const currentLocale = context?.locale?.();

    // A dynamically loaded dictionary arrives as a per-component stand-in whose
    // content only appears once the chunk lands. Interpreting the settled
    // object instead — the one every component resolves to — is what lets
    // `getDictionary` memoize the transform across components and page
    // switches. While pending, the stand-in is passed through unchanged so
    // reads stay safe, and this memo re-runs the moment it settles.
    const source = unwrapLoadable(dictionary) ?? dictionary;

    if (process.env.INTLAYER_DICTIONARY_SELECTOR !== 'false') {
      // Layers the provider's locale and variant under the call-site argument.
      // This is also the seam the build-time optimize transform lands on, which
      // rewrites `useIntlayer('key', selector)` into `useDictionary(dict, …)`.
      return getDictionary<T, A>(
        source,
        resolveDictionaryArgument({
          localeOrSelector,
          contextLocale: currentLocale,
          contextVariant: context?.variant?.(),
          dictionaryKey: dictionary.key,
        }) as A
      );
    }

    const localeTarget = (localeOrSelector ?? currentLocale) as A;

    return getDictionary<T, A>(source, localeTarget);
  });

  return new Proxy(accessor, {
    get(target, prop) {
      const content = target();
      return content?.[prop as keyof typeof content];
    },
    apply(target, thisArg, args) {
      return Reflect.apply(target, thisArg, args);
    },
  }) as DeepTransformContent<
    ResolveQualifiedDictionaryContent<T, A>,
    ExtractSelectorLocale<A>
  >;
};
