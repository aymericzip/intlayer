import { resolveDictionaryArgument } from '@intlayer/core/dictionaryManipulator';
import type {
  DeclaredLocales,
  DictionaryKeys,
  DictionaryRegistryResult,
  DictionarySelectorForKey,
  ExtractSelectorLocale,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import { getIntlayer } from '../getIntlayer';
import type { DeepTransformContent } from '../plugins';
import { createContentProxy, type IntlayerLitProxy } from './IntlayerBinding';

/**
 * Returns the translated content for the given dictionary key, wrapped in an
 * {@link IntlayerLitProxy} so the caller can subscribe to locale changes via
 * a Lit `ReactiveController`.
 *
 * Matches the same signature as `react-intlayer` and all other framework
 * adapters:
 * ```ts
 * private content = useIntlayer('my-component').observe(this);
 * ```
 *
 * The babel/SWC optimization plugin transforms this at build time into either:
 * - static mode:  `useDictionary(_hash)` — synchronous JSON import
 * - dynamic mode: `useDictionaryDynamic(_dyn, 'key')` — lazy locale split
 *
 * In non-optimized builds (dev without babel) the content is read from
 * `getIntlayer`, again whenever the client locale or variant changes.
 */
export const useIntlayer = <
  const T extends DictionaryKeys,
  const A extends LocalesValues | DictionarySelectorForKey<T> = DeclaredLocales,
>(
  key: T,
  localeOrSelector?: A
): IntlayerLitProxy<
  DeepTransformContent<DictionaryRegistryResult<T, A>, ExtractSelectorLocale<A>>
> =>
  // Layers the client's locale and ambient variant under the call-site argument
  createContentProxy(({ contextLocale, contextVariant }) => ({
    content:
      process.env.INTLAYER_DICTIONARY_SELECTOR !== 'false'
        ? getIntlayer(
            key,
            resolveDictionaryArgument({
              localeOrSelector,
              contextLocale,
              contextVariant,
              dictionaryKey: key as string,
            }) as A
          )
        : getIntlayer(key, (localeOrSelector ?? contextLocale) as A),
  }));
