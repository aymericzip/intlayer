'use client';

import { Check, X } from 'lucide-react';
import {
  type HTMLAttributes,
  useState,
  type FC,
  type ChangeEventHandler,
  useEffect,
} from 'react';
import { TextArea } from '../TextArea';

export type ContentEditorTextAreaProps = {
  children: string;
  onContentChange: (content: string) => void;
} & Omit<HTMLAttributes<HTMLTextAreaElement>, 'children'>;

export const ContentEditorTextArea: FC<ContentEditorTextAreaProps> = ({
  children,
  onContentChange,
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
    setNewValue(e.currentTarget.value ?? '');

  useEffect(() => {
    setNewValue(children);
  }, [children]);

  return (
    <div
      className="flex size-full flex-col items-center justify-between gap-2"
      key={children}
    >
      <TextArea
        onChange={handleOnContentChange}
        key={resetIncrementor}
        variant="invisible"
        className="size-full"
        defaultValue={children}
        {...props}
      />
      {isEdited && (
        <div className="flex w-full items-center justify-end gap-2">
          <Check
            className="cursor-pointer hover:scale-110"
            size={20}
            onClick={handleValid}
          />
          <X
            className="cursor-pointer hover:scale-110"
            size={20}
            onClick={handleCancel}
          />
        </div>
      )}
    </div>
  );
};
