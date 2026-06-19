import { internationalization } from '@intlayer/config/built';
import type { DictionarySelector } from '@intlayer/types/dictionary';
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
import { IntlayerBinding, type IntlayerLitProxy } from './IntlayerBinding';
import { getIntlayerClient } from './installIntlayer';

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
 * In non-optimized builds (dev without babel) the content is re-fetched from
 * `getIntlayer` on every property access, caching by locale.
 */
export const useIntlayer = <
  const T extends DictionaryKeys,
  const A extends LocalesValues | DictionarySelectorForKey<T> = DeclaredLocales,
>(
  key: T,
  localeOrSelector?: A
): IntlayerLitProxy<
  DeepTransformContent<DictionaryRegistryResult<T, A>, ExtractSelectorLocale<A>>
> => {
  const client = getIntlayerClient();

  const isSelector =
    process.env['INTLAYER_DICTIONARY_SELECTOR'] !== 'false' &&
    typeof localeOrSelector === 'object' &&
    localeOrSelector !== null;
  const explicitLocale = isSelector
    ? (localeOrSelector as DictionarySelector).locale
    : (localeOrSelector as LocalesValues | undefined);

  const compute = (currentLocale: string): unknown =>
    isSelector
      ? getIntlayer(key, {
          ...(localeOrSelector as DictionarySelector),
          locale: currentLocale,
        } as A)
      : getIntlayer(key, currentLocale as A);

  let cachedLocale: string | undefined;
  let cachedDictionary: unknown;
  let hasComputed = false;

  const proxy = new Proxy({} as any, {
    get(_target, prop) {
      if (prop === 'observe') {
        return (host: import('lit').ReactiveControllerHost) => {
          new IntlayerBinding(host);
          return proxy;
        };
      }

      // Prevent Lit internals from crashing (see useDictionaryDynamic for details)
      if (prop === Symbol.toPrimitive) return () => '';
      if (prop === 'toString') return () => '';
      if (prop === 'then') return undefined;
      if (
        typeof prop === 'symbol' ||
        (typeof prop === 'string' && prop.startsWith('_$'))
      )
        return undefined;

      const currentLocale = (explicitLocale ??
        client.locale ??
        internationalization.defaultLocale) as string;

      // Recompute dictionary only when locale changed.
      if (!hasComputed || cachedLocale !== currentLocale) {
        cachedDictionary = compute(currentLocale);
        cachedLocale = currentLocale;
        hasComputed = true;
      }

      // A selector can resolve to null (variant/meta miss).
      if (cachedDictionary == null) return undefined;

      return (cachedDictionary as Record<string, unknown>)[prop as string];
    },
  });

  return proxy;
};
