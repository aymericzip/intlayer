import { resolveDictionaryArgument } from '@intlayer/core/dictionaryManipulator';
import {
  collectTransformCacheWrites,
  deleteTransformCacheWrites,
  type Plugins,
} from '@intlayer/core/interpreter';
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
import { createMemo, onCleanup, useContext } from 'solid-js';
import { getDictionary } from '../getDictionary';
import { type DeepTransformContent, getPlugins } from '../plugins';
import { createContentProxy } from './contentProxy';
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
  const A extends LocalesValues | DictionarySelectorForGroup<T> =
    DeclaredLocales,
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

  // Transformed content holds elements owned by the scope that built them. The
  // transform cache is keyed by plugin set, so a set of this instance's own
  // keeps it from handing those elements to another component — which, during
  // a transition, can adopt them right before their owner is disposed.
  const instancePlugins = new Map<Plugins[], Plugins[]>();
  const getInstancePlugins = (locale?: LocalesValues): Plugins[] => {
    const sharedPlugins = getPlugins(locale);
    let ownPlugins = instancePlugins.get(sharedPlugins);

    if (!ownPlugins) {
      ownPlugins = [...sharedPlugins];
      instancePlugins.set(sharedPlugins, ownPlugins);
    }

    return ownPlugins;
  };

  const interpret = () => {
    const currentLocale = context?.locale?.();

    // A dynamically loaded dictionary arrives as a per-component stand-in whose
    // content only appears once the chunk lands. Interpreting the settled
    // object instead keeps the transform stable — and cacheable — once it
    // lands, rather than tied to a stand-in that changes. While pending, the stand-in is passed through unchanged so
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
        }) as A,
        getInstancePlugins
      );
    }

    const localeTarget = (localeOrSelector ?? currentLocale) as A;

    return getDictionary<T, A>(source, localeTarget, getInstancePlugins);
  };

  const accessor = createMemo(() => {
    const { result, writes } = collectTransformCacheWrites(interpret);

    // The elements this run built belong to this memo and die with it: forget
    // their cache entries then, so they never outlive their owner (and the
    // per-instance entries never pile up).
    if (writes.length > 0) onCleanup(() => deleteTransformCacheWrites(writes));

    return result;
  });

  return createContentProxy(accessor) as DeepTransformContent<
    ResolveQualifiedDictionaryContent<T, A>,
    ExtractSelectorLocale<A>
  >;
};
