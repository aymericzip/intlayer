'use client';

import { Check, X } from 'lucide-react';
import {
  useState,
  type FC,
  type ChangeEventHandler,
  useEffect,
  ReactNode,
} from 'react';
import { Button } from '../Button';
import { Input, InputProps } from '../Input';

export type ContentEditorInputProps = {
  children: number;
  onContentChange: (content: number) => void;
  disabled?: boolean;
  validate?: (content: number) => boolean;
  additionalButtons?: ReactNode;
} & Omit<InputProps, 'children'>;

export const ContentEditorInput: FC<ContentEditorInputProps> = ({
  children,
  onContentChange,
  disabled,
  validate,
  additionalButtons,
  ...props
}) => {
  const [newValue, setNewValue] = useState<number>(children);
  const [resetIncrementor, setResetIncrementor] = useState<number>(0); // To reset the div on cancel
  const isEdited: boolean = newValue !== children;

  const handleCancel = () => {
    setNewValue(children);
    setResetIncrementor((prev) => prev + 1);
  };
  const handleValid = () => {
    onContentChange(newValue);
  };

  const handleOnContentChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    setNewValue(e.currentTarget.valueAsNumber ?? 0);

  useEffect(() => {
    setNewValue(children);
  }, [children]);

  const isValid = validate?.(newValue) ?? true;

  return (
    <div
      className="flex size-full flex-col items-center justify-between gap-2"
      key={children}
    >
      <Input
        onChange={handleOnContentChange}
        key={resetIncrementor}
        variant="invisible"
        className="size-full"
        defaultValue={children}
        {...props}
      />
      {(isEdited || additionalButtons) && (
        <div className="flex w-full items-center justify-end gap-2">
          {isEdited && (
            <>
              <Button
                Icon={Check}
                label="Validate"
                variant="hoverable"
                color="text"
                size="icon-sm"
                className="cursor-pointer hover:scale-110"
                disabled={disabled || !isValid}
                onClick={handleValid}
              />
              <Button
                Icon={X}
                label="Cancel"
                variant="hoverable"
                size="icon-sm"
                color="text"
                className="cursor-pointer hover:scale-110"
                onClick={handleCancel}
              />
            </>
          )}
          {additionalButtons}
        </div>
      )}
    </div>
  );
};
