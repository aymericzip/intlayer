import { MessageKey, useEditorStateManager } from '@intlayer/editor-react';
import { useLocation } from '@tanstack/react-router';
import { type FC, useEffect } from 'react';
import { visualEditorKeysManager } from '#hooks/useVisualEditorKeys';
import { DictionaryLoaderDashboard } from './DictionaryLoaderDashboard';

/**
 * Extends DictionaryLoaderDashboard for the VisualEditorDrawer context:
 * - When a field is focused in the iframe, filters tables to that dictionary key only.
 * - When focus is cleared, reverts to the full set of keys visible in the iframe.
 * - On dashboard route change, re-requests the client's current displayed keys.
 */
export const DictionaryLoaderVisualEditor: FC = () => {
  const manager = useEditorStateManager();
  const { pathname } = useLocation();

  // Re-request displayed keys from the client app whenever the dashboard route changes.
  useEffect(() => {
    if (!manager) return;
    manager.messenger.send(
      `${MessageKey.INTLAYER_DISPLAYED_DICTIONARY_KEYS}/get`
    );
  }, [pathname, manager]);

  useEffect(() => {
    if (!manager) return;

    const handler = (e: Event) => {
      const focused = (e as CustomEvent<{ dictionaryKey?: string } | null>)
        .detail;
      if (focused?.dictionaryKey) {
        visualEditorKeysManager.setKeys([focused.dictionaryKey]);
      } else {
        visualEditorKeysManager.setKeys(
          manager.displayedDictionaryKeys.value ?? []
        );
      }
    };

    manager.focusedContent.addEventListener('change', handler);
    return () => manager.focusedContent.removeEventListener('change', handler);
  }, [manager]);

  return <DictionaryLoaderDashboard />;
};
