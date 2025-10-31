'use client';

import {
  useEditedContent,
  useFocusUnmergedDictionary,
} from '@intlayer/editor-react';
import type { Dictionary, Locale } from '@intlayer/types';
import { type FC, useMemo } from 'react';
import { SaveForm } from '../DictionaryFieldEditor/SaveForm/SaveForm';
import { NodeWrapper } from './NodeWrapper';

type DictionaryEditorProps = {
  dictionary: Dictionary;
  locale: Locale;
  mode: ('local' | 'remote')[];
  onDelete?: () => void;
};

export const DictionaryEditor: FC<DictionaryEditorProps> = ({
  dictionary,
  mode,
  onDelete,
  ...props
}) => {
  const { editedContent, addEditedContent } = useEditedContent();
  const { focusedContent, setFocusedContentKeyPath, setFocusedContent } =
    useFocusUnmergedDictionary();

  const focusedKeyPath = useMemo(
    () => focusedContent?.keyPath,
    [focusedContent?.keyPath]
  );

  return (
    <div className="flex flex-1 flex-col justify-between gap-2">
      <div>
        <NodeWrapper
          {...props}
          keyPath={[]}
          dictionary={dictionary}
          key={JSON.stringify(
            (editedContent?.[dictionary.localId!] ?? dictionary).content
          )}
          editedContent={editedContent?.[dictionary.localId!]?.content}
          focusedKeyPath={focusedKeyPath}
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
      <SaveForm
        dictionary={dictionary}
        mode={mode}
        className="mb-4 flex-col"
        onDelete={() => {
          setFocusedContent(null);
          onDelete?.();
        }}
      />
    </div>
  );
};
