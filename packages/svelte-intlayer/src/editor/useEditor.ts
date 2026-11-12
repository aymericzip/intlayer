import type { EditorStateManager } from '@intlayer/editor';
import { isEnabled } from '@intlayer/editor/isEnabled';
import type { Locale } from '@intlayer/types/allLocales';
import { onDestroy, onMount } from 'svelte';
import { intlayerStore } from '../client/intlayerStore';
import { setLocaleInStorage } from '../client/useLocaleStorage';

/**
 * Initialises the Intlayer editor client singleton when the editor is enabled.
 * Syncs the current locale from intlayerStore into the editor manager so the
 * editor always knows which locale the app is displaying.
 *
 * setupIntlayer keeps intlayerStore in sync whenever setLocale is called, so
 * subscribing to the store gives us reactive locale updates without needing
 * direct access to the Svelte 5 rune state.
 */
export const useEditor = () => {
  if (process.env.INTLAYER_EDITOR_ENABLED === 'false' || !isEnabled) return;

  let unsubscribeLocale: (() => void) | null = null;
  let unsubscribeLocaleRequest: (() => void) | null = null;

  onMount(() => {
    import('@intlayer/editor')
      .then(({ initEditorClient }) => {
        const manager: EditorStateManager = initEditorClient();

        // Subscribe immediately — Svelte stores call the subscriber with the
        // current value on subscription, so the initial locale is set right away.
        unsubscribeLocale = intlayerStore.subscribe(({ locale }) => {
          if (locale) manager.currentLocale.set(locale as Locale);
        });

        unsubscribeLocaleRequest = manager.onLocaleChangeRequested(
          (requestedLocale) => {
            intlayerStore.setLocale(requestedLocale);
            setLocaleInStorage(requestedLocale, true);
          }
        );
      })
      .catch(() => {});
  });

  onDestroy(() => {
    unsubscribeLocale?.();
    unsubscribeLocaleRequest?.();
    import('@intlayer/editor')
      .then(({ stopEditorClient }) => {
        stopEditorClient();
      })
      .catch(() => {});
  });
};
