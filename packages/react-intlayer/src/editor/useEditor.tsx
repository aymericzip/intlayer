'use client';

import type { EditorStateManager } from '@intlayer/editor';
import { isEnabled } from '@intlayer/editor/isEnabled';
import type { Locale } from '@intlayer/types/allLocales';
import { useEffect, useRef } from 'react';
import { useIntlayerContext } from '../client/IntlayerContext';

/**
 * Initializes the Intlayer editor client singleton when the editor is enabled.
 * Syncs the current locale from the Intlayer context into the editor manager so
 * the editor always knows which locale the app is displaying.
 */
export const useEditor = () => {
  const { locale } = useIntlayerContext() ?? {};
  const managerRef = useRef<EditorStateManager | null>(null);

  useEffect(() => {
    if (process.env['INTLAYER_EDITOR_ENABLED'] === 'false' || !isEnabled)
      return;

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
    if (!locale || !managerRef.current) return;

    managerRef.current.currentLocale.set(locale as Locale);
  }, [locale]);
};
