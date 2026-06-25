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
import { IntlayerClientContext } from './IntlayerProvider';

/**
 * On the client side, Hook that transforms a dictionary (or qualified
 * dictionary group) and returns its reactive content.
 *
 * The second argument is either a locale or a selector object
 * (`{ item }`, `{ variant }`, `{ id, ...meta }`, optionally with `locale`).
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
  const context = useContext(IntlayerClientContext) ?? {};

  const accessor = createMemo(() => {
    const currentLocale = context?.locale?.();

    if (
      process.env.INTLAYER_DICTIONARY_SELECTOR !== 'false' &&
      typeof localeOrSelector === 'object' &&
      localeOrSelector !== null
    ) {
      return getDictionary(dictionary, {
        ...localeOrSelector,
        locale: localeOrSelector.locale ?? currentLocale,
      } as A);
    }

    const localeTarget = (localeOrSelector ?? currentLocale) as A;

    return getDictionary<T, A>(dictionary, localeTarget);
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
