'use client';

import { type FC, useRef } from 'react';
import { AutoSizedTextArea, type AutoSizedTextAreaProps } from '../TextArea';
import { EditableFieldLayout } from './EditableFieldLayout';

export const EditableFieldTextArea: FC<AutoSizedTextAreaProps> = (props) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleSave = () => {};

  const handleCancel = () => {
    if (textAreaRef.current) {
      textAreaRef.current.value = textAreaRef.current.defaultValue ?? '';
    }
  };

  return (
    <EditableFieldLayout
      value={textAreaRef.current?.value ?? textAreaRef.current?.defaultValue}
      onCancel={handleCancel}
      onSave={handleSave}
    >
      <AutoSizedTextArea className="leading-6" ref={textAreaRef} {...props} />
    </EditableFieldLayout>
  );
};
