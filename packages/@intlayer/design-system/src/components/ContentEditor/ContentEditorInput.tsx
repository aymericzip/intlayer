'use client';

import { Check, X } from 'lucide-react';
import {
  type ChangeEventHandler,
  type FC,
  type ReactNode,
  useEffect,
  useState,
} from 'react';
import { Button, ButtonColor, ButtonSize, ButtonVariant } from '../Button';
import { type InputProps, Input, InputVariant } from '../Input';

export type ContentEditorInputProps = {
  children: InputProps['value'];
  onContentChange: (content: InputProps['value']) => void;
  disabled?: boolean;
  validate?: (content: InputProps['value']) => boolean;
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
  const [newValue, setNewValue] = useState<InputProps['value']>(children);
  const [resetIncrementor, setResetIncrementor] = useState<number>(0); // To reset the div on cancel
  const isEdited: boolean = newValue !== children;

  const handleCancel = () => {
    setNewValue(children);
    setResetIncrementor((prev) => prev + 1);
  };
  const handleValid = () => {
    onContentChange(newValue);
  };

  const handleOnContentChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNewValue(e.currentTarget.value);
  };

  useEffect(() => {
    setNewValue(children);
  }, [children]);

  const isValid = validate?.(newValue) ?? true;

  return (
    <div
      className="flex size-full flex-col items-center justify-between gap-2"
      key={String(children)}
    >
      <Input
        onChange={handleOnContentChange}
        key={resetIncrementor}
        aria-label="value"
        variant={InputVariant.INVISIBLE}
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
                variant={ButtonVariant.HOVERABLE}
                color={ButtonColor.TEXT}
                size={ButtonSize.ICON_SM}
                className="cursor-pointer hover:scale-110"
                disabled={disabled || !isValid}
                onClick={handleValid}
              />
              <Button
                Icon={X}
                label="Cancel"
                variant={ButtonVariant.HOVERABLE}
                size={ButtonSize.ICON_SM}
                color={ButtonColor.TEXT}
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
