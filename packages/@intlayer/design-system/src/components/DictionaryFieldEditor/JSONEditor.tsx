import type { Dictionary } from '@intlayer/core';
import { useEditedContent } from '@intlayer/editor-react';
import { type FC, useMemo } from 'react';
import { Container } from '../Container';
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
    () =>
      editedContent?.[dictionary.localId!]?.content ??
      dictionary?.content ??
      {},

    [dictionary]
  );

  return (
    <Container
      background="none"
      border
      roundedSize="xl"
      className="w-full overflow-hidden p-3"
    >
      <MonacoCode
        language="json"
        onChange={(content) => {
          if (isValidJSON(content ?? '{}')) {
            setEditedContent(dictionary.localId!, JSON.parse(content ?? '{}'));
          }
        }}
        isDarkMode={isDarkMode}
      >
        {JSON.stringify(displayedContent, null, 2)}
      </MonacoCode>
    </Container>
  );
};
