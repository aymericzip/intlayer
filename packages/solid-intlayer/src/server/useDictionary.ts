import type { Dictionary } from '@intlayer/types/dictionary';
import type {
  DeclaredLocales,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import { createResource } from 'solid-js';
import { useDictionary as useDictionaryClient } from '../client/useDictionary';

/**
 * Server-rendering counterpart of `useDictionaryDynamic`, emitted by the
 * optimizer in the server bundle so dynamic-mode dictionaries render
 * synchronously from static JSON.
 *
 * The discarded `createResource` is load-bearing: Solid assigns hydration
 * ids from a positional counter shared by resources and element `data-hk`
 * keys, and the client bundle consumes one resource slot per call (see
 * `useLoadDynamic`) — without the matching slot here, every subsequent
 * hydration key shifts and event bindings are silently lost.
 * `ssrLoadFrom: 'initial'` keeps the dictionary out of the SSR serialization
 * payload, so it is not shipped twice in the HTML.
 */
export const useDictionary = <
  const T extends Dictionary,
  const L extends LocalesValues = DeclaredLocales,
>(
  dictionary: T,
  locale?: L
) => {
  createResource(() => dictionary, {
    initialValue: dictionary,
    ssrLoadFrom: 'initial',
  });

  return useDictionaryClient(dictionary, locale);
};
