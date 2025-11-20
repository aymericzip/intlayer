import type { LocalesValues } from '@intlayer/types';
import { createCommunicator } from '../editor/communicator';
import { createEditorEnabledClient } from '../editor/editorEnabled';
import { createFocusDictionaryClient } from '../editor/focusDictionary';
import { useEditor } from '../editor/useEditor';
// Assuming setIntlayerContext exports a specific key or symbol
import { setIntlayerContext } from './intlayerContext';

export const setupIntlayer = (initialLocale: LocalesValues) => {
  // 1. Initialize your side effects
  // Note: If these need to run only in the browser, wrap them in $effect or onMount
  // inside your side-effect logic if they aren't already safe.
  createCommunicator();
  createEditorEnabledClient();
  createFocusDictionaryClient();
  useEditor();

  // 2. Create Reactive State (Svelte 5)
  // We make the locale a "rune" so updates propagate
  let locale = $state(initialLocale);

  // 3. Define the Context Object
  const contextValue = {
    get locale() {
      return locale;
    },
    setLocale: (newLocale: LocalesValues) => {
      locale = newLocale;
    },
  };

  // 4. Set the Context
  // setIntlayerContext internal logic usually wraps setContext(KEY, value)
  setIntlayerContext(contextValue);

  // Return the state if you need it immediately in the layout
  return contextValue;
};
