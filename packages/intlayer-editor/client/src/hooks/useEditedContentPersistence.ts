import {
  useEditedContent,
  useEditedContentState,
} from '@intlayer/editor-react';
import { useCallback, useEffect } from 'react';

/**
 * This hook is used to persist the edited content in the browser storage.
 * It is used to restore the edited content when the user reload the page.
 */
export const useEditedContentPersistence = () => {
  const [, setEditedContent] = useEditedContentState();
  const { editedContent } = useEditedContent();

  const loadPersistedState = useCallback(() => {
    const persistedState = localStorage?.getItem(
      'INTLAYER_EDITED_CONTENT_CHANGED'
    );

    if (persistedState) {
      try {
        setEditedContent(JSON.parse(persistedState));
      } catch (e) {
        console.error(e);
      }
    }
  }, [setEditedContent]);

  useEffect(() => {
    loadPersistedState();
  }, [loadPersistedState]);

  useEffect(() => {
    if (typeof editedContent === 'undefined') return;

    localStorage?.setItem(
      'INTLAYER_EDITED_CONTENT_CHANGED',
      JSON.stringify(editedContent)
    );
  }, [editedContent]);

  return loadPersistedState;
};
