import { getConfiguration } from '@intlayer/config/client';
import { useEditedContentStore } from './EditionPanel/useEditedContentStore';

export const useEditorServer = () => {
  const { editedContent, clearEditedContent } = useEditedContentStore();

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
