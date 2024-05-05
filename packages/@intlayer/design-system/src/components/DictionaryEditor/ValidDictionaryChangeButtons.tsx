'use client';

import { Check, X } from 'lucide-react';
import type { FC } from 'react';
import tw from 'twin.macro';
import type { FileContent } from '.';

interface ValidDictionaryChangeButtonsProps {
  onValidEdition: () => void;
  onCancelEdition: () => void;
  editedContent?: FileContent[];
}

const StyledButtonsContainer = tw.div`flex flex-row items-center justify-end gap-2`;
const StyledValidIcon = tw(Check)`hover:scale-110 cursor-pointer`;
const StyledCancelIcon = tw(X)`hover:scale-110 cursor-pointer`;

export const ValidDictionaryChangeButtons: FC<
  ValidDictionaryChangeButtonsProps
> = ({ onCancelEdition, onValidEdition, ...props }) => {
  const isEditing = (props.editedContent ?? []).length > 0;

  return (
    <>
      {isEditing && (
        <StyledButtonsContainer>
          <span>Valid dictionary changes</span>
          <StyledValidIcon size={16} onClick={onValidEdition} />
          <StyledCancelIcon size={16} onClick={onCancelEdition} />
        </StyledButtonsContainer>
      )}
    </>
  );
};
