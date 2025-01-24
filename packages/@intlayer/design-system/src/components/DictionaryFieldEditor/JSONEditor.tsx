import { Dictionary } from '@intlayer/core';
import { useEditedContent } from '@intlayer/editor-react';
import { useMemo, type FC } from 'react';
import { MonacoCode } from '../IDE/MonacoCode';

type JSONEditorProps = {
  dictionary: Dictionary;
  isDarkMode?: boolean;
};

export const JSONEditor: FC<JSONEditorProps> = ({ dictionary, isDarkMode }) => {
  const { setEditedContent, editedContent } = useEditedContent();

  const isValidJSON = (jsonString: string): boolean => {
    try {
      JSON.parse(jsonString);
      return true; // Valid JSON
    } catch (_error) {
      return false; // Invalid JSON
    }
  };

  const displayedContent = useMemo(
    () => editedContent?.[dictionary.key]?.content ?? dictionary?.content ?? {},
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
    </div>
  );
};
