'use client';

import type { Locales } from '@intlayer/config/client';
import type { Dictionary, DictionaryValue, KeyPath } from '@intlayer/core';
import type { FC } from 'react';
import tw from 'twin.macro';
import { NodeWrapper } from './NodeWrapper';
import { ValidDictionaryChangeButtons } from './ValidDictionaryChangeButtons';

export type FileContent = {
  keyPath: KeyPath[];
  newValue: string;
};

interface DictionaryEditorProps {
  dictionary: Dictionary;
  onContentChange: (keyPath: KeyPath[], newValue: string) => void;
  onValidEdition: () => void;
  onCancelEdition: () => void;
  locale: Locales;
  editedContent?: FileContent[];
  focusedKeyPath?: KeyPath[];
  onFocusKeyPath: (keyPath: KeyPath[]) => void;
}

const StyledContainer = tw.div`flex flex-col justify-between gap-2 h-full`;

export const DictionaryEditor: FC<DictionaryEditorProps> = ({
  dictionary,
  onContentChange,
  focusedKeyPath,
  onCancelEdition,
  onValidEdition,
  ...props
}) => (
  <StyledContainer>
    <div>
      <NodeWrapper
        {...props}
        keyPath={[]}
        focusedKeyPath={focusedKeyPath}
        section={dictionary as DictionaryValue}
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
  </StyledContainer>
);
