import { App_Dashboard_Dictionaries_Path } from '@intlayer/design-system/routes';
import { MessageKey, useEditorStateManager } from '@intlayer/editor-react';
import { useLocation, useParams } from '@tanstack/react-router';
import { type FC, useEffect } from 'react';
import { useLocalizedNavigate } from '#hooks/useLocalizedNavigate.ts';
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
  const { dictionaryKey: currentDictionaryKey } = useParams({
    strict: false,
  }) as { dictionaryKey?: string };
  const navigate = useLocalizedNavigate();

  // Re-request displayed keys from the client app whenever the dashboard route changes.
  useEffect(() => {
    if (!manager) return;
    manager.messenger.send(
      `${MessageKey.INTLAYER_DISPLAYED_DICTIONARY_KEYS}/get`
    );
  }, [pathname, manager]);

  useEffect(() => {
    if (!manager) return;

    // Initialize keys based on current manager state
    const currentFocused = manager.focusedContent.value?.dictionaryKey;
    if (currentFocused) {
      visualEditorKeysManager.setKeys([currentFocused]);
    } else if (manager.displayedDictionaryKeys.value) {
      visualEditorKeysManager.setKeys(manager.displayedDictionaryKeys.value);
    }

    const handleFocusedChange = (e: Event) => {
      const focused = (e as CustomEvent<{ dictionaryKey?: string } | null>)
        .detail;
      if (focused?.dictionaryKey) {
        visualEditorKeysManager.setKeys([focused.dictionaryKey]);

        if (
          currentDictionaryKey &&
          focused.dictionaryKey !== currentDictionaryKey
        ) {
          navigate({
            to: `${App_Dashboard_Dictionaries_Path}/$dictionaryKey`,
            params: {
              dictionaryKey: focused.dictionaryKey,
            },
          });
        }
      } else {
        visualEditorKeysManager.setKeys(
          manager.displayedDictionaryKeys.value ?? []
        );
      }
    };

    const handleDisplayedKeysChange = (e: Event) => {
      // If a dictionary is currently focused, do not overwrite the focused filter
      if (manager.focusedContent.value?.dictionaryKey) return;

      const keys = (e as CustomEvent<string[]>).detail ?? [];
      visualEditorKeysManager.setKeys(keys);
    };

    manager.focusedContent.addEventListener('change', handleFocusedChange);
    manager.displayedDictionaryKeys.addEventListener(
      'change',
      handleDisplayedKeysChange
    );

    return () => {
      manager.focusedContent.removeEventListener('change', handleFocusedChange);
      manager.displayedDictionaryKeys.removeEventListener(
        'change',
        handleDisplayedKeysChange
      );
      visualEditorKeysManager.setKeys([]);
    };
  }, [manager, currentDictionaryKey, navigate]);

  return <DictionaryLoaderDashboard />;
};
