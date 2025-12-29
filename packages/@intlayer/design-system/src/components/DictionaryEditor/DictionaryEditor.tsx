'use client';

import {
  useEditedContent,
  useFocusUnmergedDictionary,
} from '@intlayer/editor-react';
import type { Dictionary, Locale } from '@intlayer/types';
import type { FC } from 'react';
import { NodeWrapper } from './NodeWrapper';

type DictionaryEditorProps = {
  dictionary: Dictionary;
  locale: Locale;
  onDelete?: () => void;
};

export const DictionaryEditor: FC<DictionaryEditorProps> = ({
  dictionary,
  ...props
}) => {
  const { editedContent, addEditedContent } = useEditedContent();
  const { focusedContent, setFocusedContentKeyPath } =
    useFocusUnmergedDictionary();

  return (
    <div className="flex flex-col gap-2">
      <NodeWrapper
        {...props}
        keyPath={[]}
        dictionary={dictionary}
        key={JSON.stringify(
          (editedContent?.[dictionary.localId!] ?? dictionary).content
        )}
        editedContent={editedContent?.[dictionary.localId!]?.content}
        focusedKeyPath={focusedContent?.keyPath}
        section={dictionary.content}
        onContentChange={(content) => {
          addEditedContent(
            dictionary.localId!,
            content.newValue,
            content.keyPath
          );
        }}
        onFocusKeyPath={setFocusedContentKeyPath}
      />
    </div>
  );
};
