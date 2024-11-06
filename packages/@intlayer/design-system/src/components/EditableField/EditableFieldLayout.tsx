/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client';

import { Pencil, Check, X } from 'lucide-react';
import {
  type FC,
  type ReactNode,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { cn } from '../../utils/cn';
import { Button } from '../Button';

type EditableFieldLayoutProps = {
  value: string | null | undefined;
  onCancel: () => void;
  onSave: () => void;
  children: ReactNode;
  isDisabled?: boolean;
};

export const EditableFieldLayout: FC<EditableFieldLayoutProps> = ({
  value = '',
  onCancel,
  onSave,
  children,
  isDisabled,
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
      onClick={() => setIsEditing(true)}
      ref={editableFieldRef}
    >
      <div
        className={cn('flex flex-1 gap-2', isEditing ? 'display' : 'hidden')}
        key={String(isEditing)}
      >
        {children}
        <Button
          label="Save"
          variant="hoverable"
          size="icon-sm"
          color="custom"
          Icon={Check}
          onClick={handleSave}
          disabled={isDisabled}
          className="!text-current"
        />
        <Button
          label="Cancel"
          color="custom"
          variant="hoverable"
          className="!text-current"
          size="icon-sm"
          Icon={X}
          onClick={handleCancel}
          disabled={isDisabled}
        />
      </div>

      <div
        className={cn('flex flex-1 gap-2', isEditing ? 'hidden' : 'display')}
      >
        <span className="ml-2 whitespace-pre-wrap p-1 text-sm leading-6">
          {result}
        </span>
        <Button
          label="Edit"
          Icon={Pencil}
          color="custom"
          variant="hoverable"
          size="icon-sm"
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
