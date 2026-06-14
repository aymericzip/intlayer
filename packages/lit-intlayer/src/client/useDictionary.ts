import { internationalization } from '@intlayer/config/built';
import type {
  Dictionary,
  DictionarySelector,
  DictionarySelectorForGroup,
  QualifiedDictionaryGroup,
  ResolveQualifiedDictionaryContent,
} from '@intlayer/types/dictionary';
import type {
  DeclaredLocales,
  ExtractSelectorLocale,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import type { ReactiveControllerHost } from 'lit';
import { getDictionary } from '../getDictionary';
import type { DeepTransformContent } from '../plugins';
import { IntlayerBinding, type IntlayerLitProxy } from './IntlayerBinding';
import { getIntlayerClient } from './installIntlayer';

/**
 * Returns the content for a raw dictionary (or qualified dictionary group),
 * wrapped in an {@link IntlayerLitProxy} so the caller can subscribe to locale
 * changes via a Lit `ReactiveController`.
 *
 * The second argument is either a locale or a selector object (`{ item }`,
 * `{ variant }`, `{ id, ...meta }`, optionally combined with `locale`).
 *
 * @param dictionary - The raw dictionary (or qualified group) object.
 * @param localeOrSelector - Optional locale or selector.
 * @returns An {@link IntlayerLitProxy} with an `.observe()` registration method.
 */
export const useDictionary = <
  const T extends Dictionary | QualifiedDictionaryGroup,
  const A extends
    | LocalesValues
    | DictionarySelectorForGroup<T> = DeclaredLocales,
>(
  dictionary: T,
  localeOrSelector?: A
): IntlayerLitProxy<
  DeepTransformContent<
    ResolveQualifiedDictionaryContent<T, A>,
    ExtractSelectorLocale<A>
  >
> => {
  const client = getIntlayerClient();

  const isSelector =
    typeof localeOrSelector === 'object' && localeOrSelector !== null;
  const explicitLocale = isSelector
    ? (localeOrSelector as DictionarySelector).locale
    : (localeOrSelector as LocalesValues | undefined);

  const compute = (currentLocale: LocalesValues): unknown =>
    isSelector
      ? getDictionary(dictionary, {
          ...(localeOrSelector as DictionarySelector),
          locale: currentLocale,
        } as A)
      : getDictionary(dictionary, currentLocale as A);

  const getActiveLocale = (): LocalesValues =>
    (explicitLocale ??
      client.locale ??
      internationalization.defaultLocale) as LocalesValues;

  let currentContent: unknown = compute(getActiveLocale());

  // Keep currentContent fresh so the proxy always returns the active locale.
  // requestUpdate() is handled by IntlayerBinding (ReactiveController).
  client.subscribe((newLocale) => {
    currentContent = compute((explicitLocale ?? newLocale) as LocalesValues);
  });

  let observeFn: (host: ReactiveControllerHost) => any;

  const proxy = new Proxy({} as any, {
    get(_target, prop) {
      if (prop === 'observe') return observeFn;
      if (prop === Symbol.toPrimitive)
        return () => (currentContent as any)?.[Symbol.toPrimitive]?.() ?? '';
      if (prop === 'toString')
        return () => String((currentContent as any)?.toString?.() ?? '');
      if (prop === 'then') return undefined;
      // A selector can resolve to null (variant/meta miss).
      if (currentContent == null) return undefined;
      return (currentContent as Record<string | symbol, unknown>)[prop];
    },
  }) as IntlayerLitProxy<
    DeepTransformContent<
      ResolveQualifiedDictionaryContent<T, A>,
      ExtractSelectorLocale<A>
    >
  >;

  observeFn = (host) => {
    new IntlayerBinding(host);
    return proxy;
  };

  return proxy;
};
