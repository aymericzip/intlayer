import { useEditedContent } from '@intlayer/editor-react';
import { useEffect } from 'react';

/**
 * This hook is used to persist the edited content in the browser storage.
 * It is used to restore the edited content when the user reload the page.
 */
export const useEditedContentPersistence = () => {
  const { editedContent, setEditedContentState } = useEditedContent();

  useEffect(() => {
    const persistedState = localStorage?.getItem(
      'INTLAYER_EDITED_CONTENT_CHANGED'
    );

    if (persistedState) {
      try {
        setEditedContentState(JSON.parse(persistedState));
      } catch (e) {
        console.error(e);
      }
    }
  }, [setEditedContentState]);

  useEffect(() => {
    if (Object.keys(editedContent).length === 0) return;

    localStorage?.setItem(
      'INTLAYER_EDITED_CONTENT_CHANGED',
      JSON.stringify(editedContent)
    );
  }, [editedContent]);
};
