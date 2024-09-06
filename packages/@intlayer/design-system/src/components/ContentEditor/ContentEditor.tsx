'use client';

import { Check, X } from 'lucide-react';
import { type HTMLAttributes, useState, type FC } from 'react';
import { cn } from '../../utils/cn';

export type ContentEditorProps = {
  children: string;
  onContentChange: (content: string) => void;
  isEditing?: boolean;
} & HTMLAttributes<HTMLDivElement>;

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

  const handleOnContentChange = (e: React.FormEvent<HTMLDivElement>) =>
    setNewValue(e.currentTarget.textContent ?? '');

  return (
    <div className="flex flex-row items-center justify-between gap-2">
      <div
        className={cn(
          'break-word m-3 inline w-full bg-transparent outline-none',
          isEditing ? 'cursor-text' : 'cursor-pointer'
        )}
        role="textbox"
        contentEditable={isEditing}
        onInput={handleOnContentChange}
        suppressContentEditableWarning={true} // To suppress the warning for controlled components
        key={resetIncrementor}
        {...props}
      >
        {children}
      </div>
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
