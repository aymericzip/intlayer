import { internationalization } from '@intlayer/config/built';
import { setIntlayerIdentifier } from '@intlayer/config/client';
import type {
  LocalesValues,
  ProviderVariant,
} from '@intlayer/types/module_augmentation';
import { useAnalytics } from '../analytics/useAnalytics';
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
 * @param variant - Ambient variant applied to every dictionary read below this
 *   setup — for a dimension fixed for the whole session (tenant, school type,
 *   plan tier…) that no component should have to pass by hand. Accepts a name
 *   (`'school1'`), an ordered preference chain (`['school1', 'default']`), or a
 *   per-key map (`{ key1: 'school1', default: 'base' }`). A plain object is
 *   always the per-key map; nest a structured variant as
 *   `{ default: { id: 'prod_abc' } }`. A call-site selector always wins.
 * @returns An object containing the reactive locale and a setter function.
 *
 * @example
 * ```svelte
 * <script>
 *   import { setupIntlayer } from 'svelte-intlayer';
 *   const { locale } = setupIntlayer('en');
 *   // ambient variant for the whole app
 *   setupIntlayer('en', 'school1');
 * </script>
 * ```
 */
export const setupIntlayer = (
  initialLocale?: LocalesValues,
  initialVariant?: ProviderVariant
) => {
  setIntlayerIdentifier();
  useEditor();
  useAnalytics();

  // Create Reactive State (Svelte 5)
  // We make the locale a "rune" so updates propagate
  let locale = $state(initialLocale);
  let variant = $state(initialVariant);

  // Keep intlayerStore in sync so useEditor can subscribe to it
  if (initialLocale) {
    intlayerStore.setLocale(initialLocale);
  }

  // Define the Context Object
  const contextValue = {
    get locale() {
      return locale ?? internationalization.defaultLocale;
    },
    setLocale: (newLocale: LocalesValues) => {
      locale = newLocale;
      intlayerStore.setLocale(newLocale);
    },
    get variant() {
      return variant;
    },
    setVariant: (newVariant: ProviderVariant | undefined) => {
      variant = newVariant;
    },
  };

  // Set the Context
  setIntlayerContext(contextValue);

  // Return the state if you need it immediately in the layout
  return contextValue;
};
