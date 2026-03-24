import { isEnabled } from '@intlayer/editor/isEnabled';
import type { Locale } from '@intlayer/types/allLocales';
import { getIntlayerClient } from '../client/installIntlayer';

/**
 * Starts the editor client and syncs the current locale into it.
 * Returns a cleanup function.
 */
const startEditor = (locale: string): (() => void) => {
  let stopped = false;
  let stopLocaleWatch: (() => void) | null = null;

  import('@intlayer/editor').then(({ initEditorClient }) => {
    if (stopped) return;
    const manager = initEditorClient();

    const client = getIntlayerClient();
    manager.currentLocale.set(locale as Locale);

    stopLocaleWatch = client.subscribe((newLocale) => {
      manager.currentLocale.set(newLocale as Locale);
    });
  });

  return () => {
    stopped = true;
    stopLocaleWatch?.();
    import('@intlayer/editor').then(({ stopEditorClient }) => {
      stopEditorClient();
    });
  };
};

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
export const useEditor = (): (() => void) => {
  if (process.env.INTLAYER_EDITOR_ENABLED === 'false' || !isEnabled)
    return () => {};

  const client = getIntlayerClient();
  return startEditor(client.locale);
};
