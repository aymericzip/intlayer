import { getConfiguration } from '@intlayer/config/client';
import { useEditedContentStore } from '../useEditedContentStore';

export const useEditorServer = () => {
  const { editedContent } = useEditedContentStore();

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
    });
  };

  return { editContentRequest };
};
