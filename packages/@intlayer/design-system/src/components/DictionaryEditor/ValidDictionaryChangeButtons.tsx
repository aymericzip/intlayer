'use client';

import type { Dictionary } from '@intlayer/core';
import { Check, X } from 'lucide-react';
import type { FC } from 'react';

interface ValidDictionaryChangeButtonsProps {
  onValidEdition: () => void;
  onCancelEdition: () => void;
  editedContent?: Dictionary;
  dictionaryId?: string;
}

export const ValidDictionaryChangeButtons: FC<
  ValidDictionaryChangeButtonsProps
> = ({ onCancelEdition, onValidEdition, dictionaryId, ...props }) => {
  const isEditing = Object.keys(props.editedContent ?? {}).length > 0;

  return (
    <>
      {isEditing && (
        <div className="flex flex-row items-center justify-end gap-2">
          <span>Valid dictionary changes</span>
          <Check
            className="cursor-pointer hover:scale-110"
            size={16}
            onClick={onValidEdition}
          />
          <X
            className="cursor-pointer hover:scale-110"
            size={16}
            onClick={onCancelEdition}
          />
        </div>
      )}
    </>
  );
};
