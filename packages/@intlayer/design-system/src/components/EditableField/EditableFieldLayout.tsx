'use client';

import { Check, Pencil, X } from 'lucide-react';
import {
  type FC,
  type HTMLAttributes,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { cn } from '../../utils/cn';
import { Button, ButtonColor, ButtonSize, ButtonVariant } from '../Button';

type EditableFieldLayoutProps = {
  value?: string | null | undefined;
  onCancel: () => void;
  onSave: () => void;
  children: ReactNode;
  isDisabled?: boolean;
} & HTMLAttributes<HTMLSpanElement>;

export const EditableFieldLayout: FC<EditableFieldLayoutProps> = ({
  value = '',
  onCancel,
  onSave,
  onClick,
  children,
  isDisabled,
  ...props
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const editableFieldRef = useRef<HTMLSpanElement>(null);

  const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsEditing(false);
    onSave();
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsEditing(false);
    onCancel();
  };

  const result = !value || value === '' ? '-' : value;

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      // Check if there's any text selected
      const selection = window.getSelection();
      if (selection && selection.toString().trim() !== '') {
        // If there is a selection, do not trigger the save and exit early.
        return;
      }

      // Proceed if the click is truly outside the component.
      if (
        editableFieldRef.current &&
        !editableFieldRef.current.contains(e.target as Node)
      ) {
        setIsEditing(false);
        onSave();
      }
    },
    [onSave]
  );

  useEffect(() => {
    if (isEditing) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => document.removeEventListener('click', handleClickOutside);
  }, [handleClickOutside, isEditing]);

  return (
    <span
      className="group/editable-field flex gap-2"
      role="button"
      tabIndex={0}
      onClick={(e) => {
        setIsEditing(true);
        onClick?.(e);
      }}
      ref={editableFieldRef}
      {...props}
    >
      <div
        className={cn('flex flex-1 gap-2', isEditing ? 'display' : 'hidden')}
        key={String(isEditing)}
      >
        {children}
        <Button
          label="Save"
          variant={ButtonVariant.HOVERABLE}
          size={ButtonSize.ICON_SM}
          color={ButtonColor.TEXT}
          Icon={Check}
          onClick={handleSave}
          disabled={isDisabled}
          className="!text-current"
          role="button"
          tabIndex={0}
          aria-label="Save changes"
          data-testid="editable-field-save-button"
        />
        <Button
          label="Cancel"
          color={ButtonColor.TEXT}
          variant={ButtonVariant.HOVERABLE}
          className="!text-current"
          size={ButtonSize.ICON_SM}
          Icon={X}
          onClick={handleCancel}
          disabled={isDisabled}
          role="button"
          tabIndex={0}
          aria-label="Cancel changes"
          data-testid="editable-field-cancel-button"
        />
      </div>

      <div
        className={cn('flex flex-1 gap-2', isEditing ? 'hidden' : 'display')}
      >
        <span className="ml-2 flex w-full whitespace-pre-wrap p-1 text-sm leading-6">
          {result}
        </span>
        <Button
          label="Edit"
          Icon={Pencil}
          color={ButtonColor.TEXT}
          variant={ButtonVariant.HOVERABLE}
          size={ButtonSize.ICON_SM}
          className="invisible !text-current group-hover/editable-field:visible"
          disabled={isDisabled}
          onClick={(e) => {
            e.stopPropagation();
            setIsEditing(true);
          }}
        />
      </div>
    </span>
  );
};
