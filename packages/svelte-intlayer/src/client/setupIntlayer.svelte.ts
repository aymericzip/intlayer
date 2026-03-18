import configuration from '@intlayer/config/built';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import { useEditor } from '../editor/useEditor';
import { setIntlayerContext } from './intlayerContext';
import { intlayerStore } from './intlayerStore';

/**
 * Setups Intlayer in your Svelte application.
 *
 * This function initializes the Intlayer context and reactive state (using Svelte 5 runes).
 * It should be called at the root of your application (e.g., in a top-level layout).
 *
 * @param initialLocale - The initial locale to use.
 * @returns An object containing the reactive locale and a setter function.
 *
 * @example
 * ```svelte
 * <script>
 *   import { setupIntlayer } from 'svelte-intlayer';
 *   const { locale } = setupIntlayer('en');
 * </script>
 * ```
 */
export const setupIntlayer = (initialLocale?: LocalesValues) => {
  useEditor();

  // Create Reactive State (Svelte 5)
  // We make the locale a "rune" so updates propagate
  let locale = $state(initialLocale);

  // Keep intlayerStore in sync so useEditor can subscribe to it
  if (initialLocale) {
    intlayerStore.setLocale(initialLocale);
  }

  // Define the Context Object
  const contextValue = {
    get locale() {
      return locale ?? configuration.internationalization.defaultLocale;
    },
    setLocale: (newLocale: LocalesValues) => {
      locale = newLocale;
      intlayerStore.setLocale(newLocale);
    },
  };

  // Set the Context
  setIntlayerContext(contextValue);

  // Return the state if you need it immediately in the layout
  return contextValue;
};
