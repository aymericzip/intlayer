'use client';

import type { Locales } from '@intlayer/config/client';
import type { Dictionary, DictionaryValue, KeyPath } from '@intlayer/core';
import type { FC } from 'react';
import { NodeWrapper } from './NodeWrapper';
import { ValidDictionaryChangeButtons } from './ValidDictionaryChangeButtons';

type DictionaryEditorProps = {
  dictionary: Dictionary;
  onContentChange: (keyPath: KeyPath[], newValue: string) => void;
  onValidEdition: () => void;
  onCancelEdition: () => void;
  locale: Locales;
  editedContent: Dictionary;
  focusedKeyPath?: KeyPath[];
  onFocusKeyPath: (keyPath: KeyPath[]) => void;
  onClickEdit?: (keyPath: KeyPath[]) => void;
};

export const DictionaryEditor: FC<DictionaryEditorProps> = ({
  dictionary,
  onContentChange,
  focusedKeyPath,
  onCancelEdition,
  onValidEdition,
  ...props
}) => (
  <div className="flex h-full flex-col justify-between gap-2">
    <div>
      <NodeWrapper
        {...props}
        keyPath={[]}
        focusedKeyPath={focusedKeyPath}
        section={dictionary.content}
        onContentChange={(content) =>
          onContentChange(content.keyPath, content.newValue)
        }
      />
    </div>
    <ValidDictionaryChangeButtons
      onCancelEdition={onCancelEdition}
      onValidEdition={onValidEdition}
      editedContent={props.editedContent}
    />
  </div>
);
