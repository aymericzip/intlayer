import type {
  Dictionary,
  DictionarySelectorForGroup,
  QualifiedDictionaryGroup,
} from '@intlayer/types/dictionary';
import type {
  DeclaredLocales,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import { useDictionary as useDictionaryClient } from '../client/useDictionary';
import { createAsyncValue, trackAsyncValue } from '../solidCompat';

/**
 * Server-rendering counterpart of `useDictionaryDynamic`, emitted by the
 * optimizer in the server bundle so dynamic-mode dictionaries render
 * synchronously from static JSON.
 *
 * The second argument is either a locale or a selector object
 * (`{ item }`, `{ variant }`, optionally with `locale`),
 * forwarded to the client `useDictionary`.
 *
 * The discarded async value is load-bearing: Solid assigns hydration ids from
 * a positional counter shared by async primitives and element `data-hk` keys,
 * and the client bundle creates the same primitives per call (see
 * `useLoadDynamic`) — without the matching slots here, every subsequent
 * hydration key shifts and event bindings are silently lost.
 * `ssrLoadFrom: 'initial'` keeps the dictionary out of the Solid 1 SSR
 * serialization payload, so it is not shipped twice in the HTML.
 */
export const useDictionary = <
  const T extends Dictionary | QualifiedDictionaryGroup,
  const A extends LocalesValues | DictionarySelectorForGroup<T> =
    DeclaredLocales,
>(
  dictionary: T,
  localeOrSelector?: A
) => {
  const serverValue = createAsyncValue(
    () => dictionary,
    (resolvedDictionary) => resolvedDictionary,
    { initialValue: dictionary, ssrLoadFrom: 'initial' }
  );

  trackAsyncValue(serverValue);

  return useDictionaryClient(dictionary, localeOrSelector);
};
