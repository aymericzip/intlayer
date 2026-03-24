import configuration from '@intlayer/config/built';
import type {
  DictionaryKeys,
  DictionaryRegistryContent,
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
export const useIntlayer = <T extends DictionaryKeys>(
  key: T,
  locale?: LocalesValues
): IntlayerLitProxy<DeepTransformContent<DictionaryRegistryContent<T>>> => {
  const client = getIntlayerClient();

  let cachedLocale: string | undefined;
  let cachedDictionary: DeepTransformContent<
    DictionaryRegistryContent<T>
  > | null = null;

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

      const currentLocale = (locale ??
        client.locale ??
        configuration.internationalization.defaultLocale) as string;

      // Recompute dictionary only when locale changed.
      if (cachedLocale !== currentLocale || cachedDictionary === null) {
        cachedDictionary = getIntlayer(key, currentLocale as LocalesValues);
        cachedLocale = currentLocale;
      }

      return (cachedDictionary as Record<string, unknown>)[prop as string];
    },
  });

  return proxy;
};
