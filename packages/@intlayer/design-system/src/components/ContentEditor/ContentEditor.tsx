'use client';

import { Check, X } from 'lucide-react';
import { useState, type FC, type ChangeEventHandler } from 'react';
import { cn } from '../../utils/cn';
import {
  AutoSizedTextArea,
  AutoSizedTextAreaProps,
} from '../TextArea/AutoSizeTextArea';

export type ContentEditorProps = {
  children: string;
  onContentChange: (content: string) => void;
  isEditing?: boolean;
} & AutoSizedTextAreaProps;

export const ContentEditor: FC<ContentEditorProps> = ({
  children,
  onContentChange,
  isEditing,
  ...props
}) => {
  const [newValue, setNewValue] = useState<string>(children);
  const [resetIncrementor, setResetIncrementor] = useState<number>(0); // To reset the div on cancel
  const isEdited: boolean = newValue !== children;

  const handleCancel = () => {
    setNewValue(children);
    setResetIncrementor((prev) => prev + 1);
  };
  const handleValid = () => {
    onContentChange(newValue);
  };

  const handleOnContentChange: ChangeEventHandler<HTMLTextAreaElement> = (e) =>
    setNewValue(e.target.value ?? '');

  return (
    <div className="flex flex-row items-center justify-between gap-2">
      <AutoSizedTextArea
        className={cn(
          'break-word outline-hidden m-3 inline w-full bg-transparent',
          isEditing ? 'cursor-text' : 'cursor-pointer'
        )}
        onChange={handleOnContentChange}
        key={resetIncrementor}
        variant="invisible"
        defaultValue={children}
        {...props}
      />
      {isEdited && (
        <div className="flex flex-row items-center justify-between gap-2">
          <Check
            className="cursor-pointer hover:scale-110"
            size={16}
            onClick={handleValid}
          />
          <X
            className="cursor-pointer hover:scale-110"
            size={16}
            onClick={handleCancel}
          />
        </div>
      )}
    </div>
  );
};
