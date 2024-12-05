import { Dictionary } from '@intlayer/core';
import type { FC } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { ContentEditorTextArea } from '../ContentEditor/ContentEditorTextArea';
import { useEditedContentStore } from '../DictionaryEditor';
import { SaveForm } from './SaveForm/SaveForm';

type JSONEditorProps = {
  dictionary: Dictionary;
};

export const JSONEditor: FC<JSONEditorProps> = ({ dictionary }) => {
  const { setEditedContent, editedContent } = useEditedContentStore(
    useShallow((s) => ({
      editedContent: s.editedContent,
      setEditedContent: s.setEditedContent,
    }))
  );

  const isValidJSON = (jsonString: string): boolean => {
    try {
      JSON.parse(jsonString);
      return true; // Valid JSON
    } catch (_error) {
      return false; // Invalid JSON
    }
  };

  const displayedContent =
    editedContent[dictionary.key]?.content ?? dictionary?.content ?? {};

  return (
    <>
      <ContentEditorTextArea
        key={JSON.stringify(displayedContent)}
        onContentChange={(content) =>
          setEditedContent(dictionary.key, JSON.parse(content))
        }
        validate={isValidJSON}
        className="text-sm"
        variant="default"
      >
        {JSON.stringify(displayedContent, null, 2)}
      </ContentEditorTextArea>
      <SaveForm dictionary={dictionary} />
    </>
  );
};
