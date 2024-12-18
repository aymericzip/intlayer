import { Dictionary } from '@intlayer/core';
import { useMemo, type FC } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useEditedContentStore } from '../DictionaryEditor';
import { MonacoCode } from '../IDE/MonacoCode';
import { SaveForm } from './SaveForm/SaveForm';

type JSONEditorProps = {
  dictionary: Dictionary;
  isDarkMode?: boolean;
};

export const JSONEditor: FC<JSONEditorProps> = ({ dictionary, isDarkMode }) => {
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

  const displayedContent = useMemo(
    () => editedContent[dictionary.key]?.content ?? dictionary?.content ?? {},
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dictionary]
  );

  return (
    <div className="overflow-hidden rounded-md">
      <MonacoCode
        language="json"
        onChange={(content) => {
          if (isValidJSON(content ?? '{}')) {
            setEditedContent(dictionary.key, JSON.parse(content ?? '{}'));
          }
        }}
        isDarkMode={isDarkMode}
      >
        {JSON.stringify(displayedContent, null, 2)}
      </MonacoCode>
      <SaveForm dictionary={dictionary} />
    </div>
  );
};
