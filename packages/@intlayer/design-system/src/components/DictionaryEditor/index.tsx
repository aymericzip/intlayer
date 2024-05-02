'use client';

import type { Locales } from '@intlayer/config/client';
import type { ContentModule, ContentValue, KeyPath } from '@intlayer/core';
import { Check, X } from 'lucide-react';
import type { FC } from 'react';
import tw from 'twin.macro';
import { ItemWrapper } from './ItemWrapper';

export type FileContent = {
  keyPath: KeyPath[];
  newValue: string;
};

interface DictionaryEditorProps {
  dictionary: ContentModule;
  onContentChange: (keyPath: KeyPath[], newValue: string) => void;
  onValidEdition: () => void;
  onCancelEdition: () => void;
  locale: Locales;
  editedContent?: FileContent[];
  focusedKeyPath?: KeyPath[];
  onFocusKeyPath: (keyPath: KeyPath[]) => void;
}

const StyledContainer = tw.div`flex flex-col justify-between gap-2 h-full`;
const StyledButtonsContainer = tw.div`flex flex-row items-center justify-end gap-2`;
const StyledValidIcon = tw(Check)`hover:scale-110 cursor-pointer`;
const StyledCancelIcon = tw(X)`hover:scale-110 cursor-pointer`;

export const DictionaryEditor: FC<DictionaryEditorProps> = ({
  dictionary,
  onContentChange,
  focusedKeyPath,
  onCancelEdition,
  onValidEdition,
  ...props
}) => {
  const isEditing = (props.editedContent ?? []).length > 0;

  return (
    <StyledContainer>
      <div>
        <ItemWrapper
          {...props}
          keyPath={[]}
          focusedKeyPath={focusedKeyPath}
          section={dictionary as ContentValue}
          onContentChange={(content) =>
            onContentChange(content.keyPath, content.newValue)
          }
        />
      </div>
      {isEditing && (
        <StyledButtonsContainer>
          <span>Valid dictionary changes</span>
          <StyledValidIcon size={16} onClick={onValidEdition} />
          <StyledCancelIcon size={16} onClick={onCancelEdition} />
        </StyledButtonsContainer>
      )}
    </StyledContainer>
  );
};
