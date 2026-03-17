import { MessageKey } from '@intlayer/types/messageKey';
import { onDestroy, onMount } from 'svelte';
import { useLocale } from '../client/useLocale';
import { createEditorStateManager } from './communicator';

export const useEditor = () => {
  if (typeof window === 'undefined') return;

  let managerCleanup: (() => void) | null = null;

  try {
    // Must be called synchronously in component context to access Svelte context
    const { locale } = useLocale();

    onMount(() => {
      createEditorStateManager().then((manager) => {
        import('@intlayer/editor').then(({ defineIntlayerElements }) => {
          defineIntlayerElements();
        });
        manager.start();

        const unsubLocale = locale.subscribe((currentLocale) => {
          if (!currentLocale) return;
          manager.messenger.send(
            `${MessageKey.INTLAYER_CURRENT_LOCALE}/post`,
            currentLocale
          );
        });

        managerCleanup = () => {
          manager.stop();
          unsubLocale();
        };
      });
    });

    onDestroy(() => {
      managerCleanup?.();
    });
  } catch {
    // Outside component context - start immediately without locale sync
    createEditorStateManager().then((manager) => {
      import('@intlayer/editor').then(({ defineIntlayerElements }) => {
        defineIntlayerElements();
      });
      manager.start();
    });
  }
};
