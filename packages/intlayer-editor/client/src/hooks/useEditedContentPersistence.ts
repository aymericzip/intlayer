import { useEditedContent } from '@intlayer/editor-react';
import { useEffect } from 'react';

/**
 * This hook is used to persist the edited content in the browser storage.
 * It is used to restore the edited content when the user reload the page.
 */
export const useEditedContentPersistence = () => {
  const { editedContent, setEditedContentState } = useEditedContent();

  const loadPersistedState = () => {
    const persistedState = localStorage?.getItem(
      'INTLAYER_EDITED_CONTENT_CHANGED'
    );

    if (persistedState) {
      try {
        const state = JSON.parse(persistedState);

        setEditedContentState(state);
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    if (typeof editedContent === 'undefined') return;

    localStorage?.setItem(
      'INTLAYER_EDITED_CONTENT_CHANGED',
      JSON.stringify(editedContent)
    );
  }, [editedContent]);

  useEffect(() => {
    if (typeof editedContent !== 'undefined') return;

    loadPersistedState();
  }, []);

  return loadPersistedState;
};
