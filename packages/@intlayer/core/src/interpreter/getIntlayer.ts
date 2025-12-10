import configuration from '@intlayer/config/built';
import { getAppLogger } from '@intlayer/config/client';
import { getDictionaries } from '@intlayer/dictionaries-entry';
import type {
  DeclaredLocales,
  DictionaryKeys,
  DictionaryRegistryContent,
  DictionaryRegistryElement,
  LocalesValues,
} from '@intlayer/types';
import type {
  DeepTransformContent,
  IInterpreterPluginState,
  Plugins,
} from './getContent';
import { getDictionary } from './getDictionary';

export const getIntlayer = <
  T extends DictionaryKeys,
  L extends LocalesValues = DeclaredLocales,
>(
  key: T,
  locale?: L,
  plugins?: Plugins[]
): DeepTransformContent<
  DictionaryRegistryContent<T>,
  IInterpreterPluginState,
  L
> => {
  const dictionaries = getDictionaries();
  const dictionary = dictionaries[key as T] as DictionaryRegistryElement<T>;

  if (!dictionary) {
    if (
      configuration.build.optimize === true ||
      (configuration.build.optimize === undefined &&
        process.env.NODE_ENV === 'production')
    ) {
      const logger = getAppLogger(configuration);

      logger(
        'Build optimization is enabled, the dictionary may have been purged. You can disable build optimization, or configure the traversePattern to include the current component.',
        {
          level: 'error',
          isVerbose: true,
        }
      );
      throw new Error(
        `Dictionary ${key as string} not found - Build optimization is enabled, the dictionary may have been purged. You can disable build optimization, or configure the 'traversePattern' to include the current component.`,
        dictionaries
      );
    }
    throw new Error(`Dictionary ${key as string} not found`, dictionaries);
  }

  return getDictionary<DictionaryRegistryElement<T>, L>(
    dictionary,
    locale,
    plugins
  );
};
