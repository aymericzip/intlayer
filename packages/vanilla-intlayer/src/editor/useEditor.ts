import type { EditorStateManager } from '@intlayer/editor';
import { isEnabled } from '@intlayer/editor/isEnabled';
import type { Locale } from '@intlayer/types/allLocales';
import { getIntlayerClient } from '../client/installIntlayer';

/**
 * Initialises the Intlayer visual editor client.
 *
 * Does nothing when `INTLAYER_EDITOR_ENABLED` is `"false"` or the editor
 * package reports that it is disabled.
 *
 * Call this once at application startup.
 *
 * @returns A cleanup function that stops the editor.
 *
 * @example
 * ```ts
 * import { installIntlayer, useEditor } from 'vanilla-intlayer';
 *
 * installIntlayer('en');
 * const stopEditor = useEditor();
 * ```
 */
const TREE_SHAKE_EDITOR = process.env['INTLAYER_EDITOR_ENABLED'] === 'false';

export const useEditor = (): (() => void) => {
  if (TREE_SHAKE_EDITOR || !isEnabled) return () => {};

  let unsubscribeLocale: (() => void) | null = null;
  let stopped = false;

  import('@intlayer/editor').then(({ initEditorClient }) => {
    if (stopped) return;
    const manager: EditorStateManager = initEditorClient();
    const client = getIntlayerClient();

    manager.currentLocale.set(client.locale as Locale);

    unsubscribeLocale = client.subscribe((newLocale) => {
      manager.currentLocale.set(newLocale as Locale);
    });
  });

  return () => {
    stopped = true;
    unsubscribeLocale?.();
    import('@intlayer/editor').then(({ stopEditorClient }) => {
      stopEditorClient();
    });
  };
};
