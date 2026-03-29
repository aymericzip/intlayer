import type { EditorStateManager } from '@intlayer/editor';
import { isEnabled } from '@intlayer/editor/isEnabled';
import type { Locale } from '@intlayer/types/allLocales';
import { onDestroy, onMount } from 'svelte';
import { intlayerStore } from '../client/intlayerStore';

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
  if (!isEnabled) return;

  let unsubscribeLocale: (() => void) | null = null;

  onMount(() => {
    import('@intlayer/editor').then(({ initEditorClient }) => {
      const manager: EditorStateManager = initEditorClient();

      // Subscribe immediately — Svelte stores call the subscriber with the
      // current value on subscription, so the initial locale is set right away.
      unsubscribeLocale = intlayerStore.subscribe(({ locale }) => {
        if (locale) manager.currentLocale.set(locale as Locale);
      });
    });
  });

  onDestroy(() => {
    unsubscribeLocale?.();
    import('@intlayer/editor').then(({ stopEditorClient }) => {
      stopEditorClient();
    });
  });
};
