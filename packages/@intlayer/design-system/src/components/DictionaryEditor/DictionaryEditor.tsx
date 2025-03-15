'use client';

import type { Locales } from '@intlayer/config/client';
import type { Dictionary } from '@intlayer/core';
import { useEditedContent, useFocusDictionary } from '@intlayer/editor-react';
import type { FC } from 'react';
import { SaveForm } from '../DictionaryFieldEditor/SaveForm/SaveForm';
import { NodeWrapper } from './NodeWrapper';

type DictionaryEditorProps = {
  dictionary: Dictionary;
  locale: Locales;
  mode: ('local' | 'remote')[];
};

export const DictionaryEditor: FC<DictionaryEditorProps> = ({
  dictionary,
  mode,
  ...props
}) => {
  const { editedContent, addEditedContent } = useEditedContent();
  const { focusedContent, setFocusedContentKeyPath } = useFocusDictionary();

  const focusedKeyPath = focusedContent?.keyPath;

  return (
    <div className="flex flex-1 flex-col justify-between gap-2">
      <div>
        <NodeWrapper
          {...props}
          keyPath={[]}
          dictionary={dictionary}
          key={JSON.stringify(
            (editedContent?.[dictionary.key] ?? dictionary).content
          )}
          editedContent={editedContent?.[dictionary.key]?.content}
          focusedKeyPath={focusedKeyPath}
          section={dictionary.content}
          onContentChange={(content) => {
            addEditedContent(dictionary.key, content.newValue, content.keyPath);
          }}
          onFocusKeyPath={setFocusedContentKeyPath}
        />
      </div>
      <SaveForm dictionary={dictionary} mode={mode} className="mb-4 flex-col" />
    </div>
  );
};
