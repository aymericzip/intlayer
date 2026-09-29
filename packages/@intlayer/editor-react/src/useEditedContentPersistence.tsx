'use client';

import { useEffect } from 'react';
import { useEditedContent } from './EditedContentContext';

const EDITED_CONTENT_STORAGE_KEY = 'INTLAYER_EDITED_CONTENT_CHANGED';

/**
 * Persists the edited content in localStorage, and restores it on mount so
 * unsaved edits survive a page reload.
 */
export const useEditedContentPersistence = (): void => {
  const { editedContent, setEditedContentState } = useEditedContent();

  useEffect(() => {
    if (editedContent !== undefined) return;

    const persistedState = localStorage.getItem(EDITED_CONTENT_STORAGE_KEY);
    if (!persistedState) return;

    try {
      setEditedContentState(JSON.parse(persistedState));
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (editedContent === undefined) return;

    localStorage.setItem(
      EDITED_CONTENT_STORAGE_KEY,
      JSON.stringify(editedContent)
    );
  }, [editedContent]);
};
