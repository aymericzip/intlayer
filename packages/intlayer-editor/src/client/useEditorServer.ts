import { getConfiguration } from '@intlayer/config/client';
import { useEditedContentStore } from './DictionaryEditionDrawer/useEditedContentStore';

export const useEditorServer = () => {
  const { editedContent, clearEditedContent } = useEditedContentStore((s) => ({
    editedContent: s.editedContent,
    clearEditedContent: s.clearEditedContent,
  }));

  const editContentRequest = async () => {
    const {
      editor: { port },
    } = getConfiguration();

    await fetch(`http://localhost:${port}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedContent),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to edit content');
        }
        clearEditedContent();
      })
      .catch((error) => {
        console.error('Failed to edit content:', error);
      });
  };

  return { editContentRequest };
};
