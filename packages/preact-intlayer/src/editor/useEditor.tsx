import type { EditorStateManager } from '@intlayer/editor';
import { isEnabled } from '@intlayer/editor/isEnabled';
import type { Locale } from '@intlayer/types/allLocales';
import { useContext, useEffect, useRef } from 'preact/hooks';
import { IntlayerClientContext } from '../client/IntlayerProvider';

const TREE_SHAKE_EDITOR = process.env['INTLAYER_EDITOR_ENABLED'] === 'false';

/**
 * Initialises the Intlayer editor client singleton when the editor is enabled.
 * Syncs the current locale from the Intlayer context into the editor manager so
 * the editor always knows which locale the app is displaying.
 */
export const useEditor = () => {
  const { locale } = useContext(IntlayerClientContext) ?? {};
  const managerRef = useRef<EditorStateManager | null>(null);

  useEffect(() => {
    if (TREE_SHAKE_EDITOR || !isEnabled) return;

    import('@intlayer/editor').then(({ initEditorClient }) => {
      const manager = initEditorClient();
      managerRef.current = manager;

      if (locale) manager.currentLocale.set(locale as Locale);
    });

    return () => {
      managerRef.current = null;
      import('@intlayer/editor').then(({ stopEditorClient }) => {
        stopEditorClient();
      });
    };
  }, []);

  useEffect(() => {
    if (TREE_SHAKE_EDITOR || !locale || !managerRef.current) return;

    managerRef.current.currentLocale.set(locale as Locale);
  }, [locale]);
};
