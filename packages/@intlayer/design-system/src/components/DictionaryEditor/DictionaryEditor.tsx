'use client';

import type { Locales } from '@intlayer/config/client';
import type { Dictionary, KeyPath } from '@intlayer/core';
import type { FC } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { NodeWrapper } from './NodeWrapper';
import { useEditedContentStore } from './useEditedContentStore';
import { useEditionPanelStore } from './useEditionPanelStore';
import { ValidDictionaryChangeButtons } from './ValidDictionaryChangeButtons';

type DictionaryEditorProps = {
  dictionary: Dictionary;
  locale: Locales;
  onClickEdit?: (keyPath: KeyPath[]) => void;
};

export const DictionaryEditor: FC<DictionaryEditorProps> = ({
  dictionary,
  ...props
}) => {
  const { addEditedContent, editedContent } = useEditedContentStore(
    useShallow((s) => ({
      addEditedContent: s.addEditedContent,
      editedContent: s.editedContent,
    }))
  );
  const { focusedContent, setFocusedContentKeyPath } = useEditionPanelStore(
    useShallow((s) => ({
      focusedContent: s.focusedContent,
      setFocusedContentKeyPath: s.setFocusedContentKeyPath,
    }))
  );

  const focusedKeyPath = focusedContent?.keyPath;

  return (
    <div className="flex h-full flex-col justify-between gap-2">
      <div>
        <NodeWrapper
          {...props}
          keyPath={[]}
          key={JSON.stringify(
            (editedContent[dictionary.key] ?? dictionary).content
          )}
          editedContent={editedContent[dictionary.key]?.content}
          focusedKeyPath={focusedKeyPath}
          section={dictionary.content}
          onContentChange={(content) => {
            addEditedContent(dictionary.key, content.newValue, content.keyPath);
          }}
          onFocusKeyPath={setFocusedContentKeyPath}
        />
      </div>
      <ValidDictionaryChangeButtons dictionary={dictionary} />
    </div>
  );
};
