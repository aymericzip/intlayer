'use client';

import { Check, X } from 'lucide-react';
import type { FC } from 'react';
import type { FileContent } from '.';

interface ValidDictionaryChangeButtonsProps {
  onValidEdition: () => void;
  onCancelEdition: () => void;
  editedContent?: FileContent[];
}

export const ValidDictionaryChangeButtons: FC<
  ValidDictionaryChangeButtonsProps
> = ({ onCancelEdition, onValidEdition, ...props }) => {
  const isEditing = (props.editedContent ?? []).length > 0;

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
