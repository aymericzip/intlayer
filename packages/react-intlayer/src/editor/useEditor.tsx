'use client';

import type { EditorStateManager } from '@intlayer/editor';
import { isEnabled } from '@intlayer/editor/isEnabled';
import type { Locale } from '@intlayer/types/allLocales';
import { useContext, useEffect, useRef } from 'react';
import { IntlayerClientContext } from '../client/IntlayerProvider';

/**
 * Initializes the Intlayer editor client singleton when the editor is enabled.
 * Syncs the current locale from the Intlayer context into the editor manager so
 * the editor always knows which locale the app is displaying.
 */
export const useEditor = () => {
  const { locale, setLocale } = useContext(IntlayerClientContext) ?? {};
  const managerRef = useRef<EditorStateManager | null>(null);
  // Read through a ref: the subscription outlives the render that created it
  const setLocaleRef = useRef(setLocale);
  setLocaleRef.current = setLocale;

  useEffect(() => {
    if (process.env.INTLAYER_EDITOR_ENABLED === 'false' || !isEnabled) return;

    let unsubscribeLocaleRequest: (() => void) | null = null;
    let isStopped = false;

    import('@intlayer/editor')
      .then(({ initEditorClient }) => {
        if (isStopped) return;

        const manager = initEditorClient();
        managerRef.current = manager;

        if (locale) manager.currentLocale.set(locale as Locale);

        unsubscribeLocaleRequest = manager.onLocaleChangeRequested(
          (requestedLocale) => setLocaleRef.current?.(requestedLocale)
        );
      })
      .catch(() => {});

    return () => {
      isStopped = true;
      unsubscribeLocaleRequest?.();
      managerRef.current = null;
      import('@intlayer/editor')
        .then(({ stopEditorClient }) => {
          stopEditorClient();
        })
        .catch(() => {});
    };
  }, []);

  useEffect(() => {
    if (!locale || !managerRef.current) return;

    managerRef.current.currentLocale.set(locale as Locale);
  }, [locale]);
};
