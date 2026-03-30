import { internationalization } from '@intlayer/config/built';
import type { Dictionary } from '@intlayer/types/dictionary';
import type {
  DeclaredLocales,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import type { ReactiveControllerHost } from 'lit';
import { getDictionary } from '../getDictionary';
import type { DeepTransformContent } from '../plugins';
import { IntlayerBinding, type IntlayerLitProxy } from './IntlayerBinding';
import { getIntlayerClient } from './installIntlayer';

/**
 * Returns the translated content for a raw dictionary object, wrapped in an
 * {@link IntlayerLitProxy} so the caller can subscribe to locale changes via
 * a Lit `ReactiveController`.
 *
 * This is the babel-optimized counterpart of `useIntlayer` — it accepts a
 * pre-imported dictionary object directly instead of a string key, matching
 * the same signature as `react-intlayer` and other framework adapters.
 *
 * The content is resolved synchronously on every property access via a proxy,
 * so the first render always shows the correct locale without a loading phase.
 * Chain `.observe(this)` to register a `ReactiveController` that triggers
 * `requestUpdate()` on every subsequent locale change.
 *
 * @param dictionary - The raw dictionary object (pre-imported by the build plugin).
 * @param locale     - Optional locale override.
 * @returns An {@link IntlayerLitProxy} that exposes the current locale's content
 *          together with an `.observe()` registration method.
 *
 * @example
 * ```ts
 * // Typically injected by the babel/SWC optimization plugin:
 * import _hash from '.intlayer/dictionaries/app.json' with { type: 'json' };
 * private content = useDictionary(_hash).observe(this);
 * ```
 */
export const useDictionary = <
  T extends Dictionary,
  L extends LocalesValues = DeclaredLocales,
>(
  dictionary: T,
  locale?: L
): IntlayerLitProxy<DeepTransformContent<T['content'], L>> => {
  const client = getIntlayerClient();

  const getActiveLocale = (): L =>
    (locale ?? client.locale ?? internationalization.defaultLocale) as L;

  let currentContent: DeepTransformContent<T['content'], L> = getDictionary(
    dictionary,
    getActiveLocale()
  );

  // Keep currentContent fresh so the proxy always returns the active locale.
  // requestUpdate() is handled by IntlayerBinding (ReactiveController).
  client.subscribe((newLocale) => {
    currentContent = getDictionary(
      dictionary,
      (locale ?? newLocale) as L
    ) as DeepTransformContent<T['content'], L>;
  });

  let observeFn: (
    host: ReactiveControllerHost
  ) => IntlayerLitProxy<DeepTransformContent<T['content'], L>>;

  const proxy = new Proxy({} as any, {
    get(_target, prop) {
      if (prop === 'observe') return observeFn;
      if (prop === Symbol.toPrimitive)
        return () => (currentContent as any)[Symbol.toPrimitive]?.() ?? '';
      if (prop === 'toString')
        return () => String((currentContent as any).toString?.() ?? '');
      if (prop === 'then') return undefined;
      return (currentContent as Record<string | symbol, unknown>)[prop];
    },
  }) as IntlayerLitProxy<DeepTransformContent<T['content'], L>>;

  observeFn = (host) => {
    new IntlayerBinding(host);
    return proxy;
  };

  return proxy;
};
