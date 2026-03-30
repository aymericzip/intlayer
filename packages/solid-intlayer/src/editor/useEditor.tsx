import type { EditorStateManager } from '@intlayer/editor';
import { isEnabled } from '@intlayer/editor/isEnabled';
import type { Locale } from '@intlayer/types/allLocales';
import { createEffect, createSignal, onCleanup, onMount } from 'solid-js';
import { useIntlayerContext } from '../client';

const TREE_SHAKE_EDITOR = process.env['INTLAYER_EDITOR_ENABLED'] === 'false';

/**
 * Initialises the Intlayer editor client singleton when the editor is enabled.
 * Syncs the current locale from the Intlayer context into the editor manager so
 * the editor always knows which locale the app is displaying.
 */
export const useEditor = () => {
  if (TREE_SHAKE_EDITOR || !isEnabled) return;

  const { locale } = useIntlayerContext();
  const [manager, setManager] = createSignal<EditorStateManager | null>(null);

  onMount(() => {
    import('@intlayer/editor').then(({ initEditorClient }) => {
      const managerInstance = initEditorClient();

      setManager(managerInstance);
    });
  });

  createEffect(() => {
    const managerInstance = manager();
    const currentLocale = locale();

    if (managerInstance && currentLocale) {
      managerInstance.currentLocale.set(currentLocale as Locale);
    }
  });

  onCleanup(() => {
    import('@intlayer/editor').then(({ stopEditorClient }) => {
      stopEditorClient();
    });
  });
};
