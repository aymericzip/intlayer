import { usePersistedStore } from '@intlayer/design-system/hooks';
import { DictionaryContent, useEditedContent } from '@intlayer/editor-react';
import { useEffect } from 'react';

/**
 * This hook is used to persist the edited content in the browser storage.
 * It is used to restore the edited content when the user reload the page.
 */
export const useEditedContentPersistence = () => {
  const [persistedEditedContent, setPersistedEditedContentState] =
    usePersistedStore<DictionaryContent>('INTLAYER_EDITED_CONTENT_CHANGED', {});
  const { editedContent, setEditedContentState } = useEditedContent();

  useEffect(() => {
    if (persistedEditedContent) {
      setEditedContentState(persistedEditedContent);
    }
  }, [persistedEditedContent, setEditedContentState]);

  useEffect(() => {
    setPersistedEditedContentState(editedContent);
  }, [editedContent, setPersistedEditedContentState]);
};
