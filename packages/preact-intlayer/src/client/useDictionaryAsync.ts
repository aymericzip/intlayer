import { loadDynamicDictionary } from '@intlayer/core/dictionaryManipulator';
import { resolveInterpreterLocale } from '@intlayer/core/interpreter';
import type { Dictionary } from '@intlayer/types/dictionary';
import type {
  LocalesValues,
  StrictModeLocaleMap,
} from '@intlayer/types/module_augmentation';
import { useContext } from 'preact/hooks';
import { getDictionary } from '../getDictionary';
import { IntlayerClientContext } from './IntlayerProvider';

/**
 * Hook that loads the locale chunk of a dictionary and returns its content.
 *
 * If the locale is not provided, it will use the locale from the client context
 */
export const useDictionaryAsync = async <const T extends Dictionary>(
  dictionaryPromise: StrictModeLocaleMap<() => Promise<T>>,
  locale?: LocalesValues
): Promise<T> => {
  // Read before the first `await`: a hook only runs synchronously in render
  const { locale: currentLocale } = useContext(IntlayerClientContext) ?? {};
  const localeTarget = locale ?? currentLocale ?? resolveInterpreterLocale();

  const dictionary = (await loadDynamicDictionary(
    dictionaryPromise,
    localeTarget
  )) as T;

  return getDictionary(dictionary, localeTarget) as any;
};
