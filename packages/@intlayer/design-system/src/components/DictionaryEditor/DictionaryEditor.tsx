'use client';

import { useEditedContent, useFocusDictionary } from '@intlayer/editor-react';
import type { Dictionary, Locales } from '@intlayer/types';
import type { FC } from 'react';
import { SaveForm } from '../DictionaryFieldEditor/SaveForm/SaveForm';
import { NodeWrapper } from './NodeWrapper';

type DictionaryEditorProps = {
  dictionary: Dictionary;
  locale: Locales;
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
    useFocusDictionary();

  const focusedKeyPath = focusedContent?.keyPath;

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
