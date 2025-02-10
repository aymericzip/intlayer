'use client';

import { useRef, useImperativeHandle, type FC, type Ref } from 'react';
import { AutoSizedTextArea, type AutoSizedTextAreaProps } from '../TextArea';
import { EditableFieldLayout } from './EditableFieldLayout';

type EditableFieldTextAreaProps = AutoSizedTextAreaProps & {
  onSave?: (value: string) => void;
  onCancel?: () => void;
};

export const EditableFieldTextArea: FC<EditableFieldTextAreaProps> = ({
  onSave,
  onCancel,
  ref,
  ...props
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // Expose the text area ref to parent components
  useImperativeHandle(ref as Ref<HTMLElement>, () => textAreaRef.current!);

  const handleSave = () => {
    // Your save logic here
    onSave?.(textAreaRef.current?.value ?? '');
  };

  const handleCancel = () => {
    if (textAreaRef.current) {
      textAreaRef.current.value = textAreaRef.current.defaultValue ?? '';
    }
    onCancel?.();
  };

  const memoValue =
    (props.value as string) ??
    textAreaRef.current?.value ??
    (props.defaultValue as string) ??
    '';

  return (
    <EditableFieldLayout
      value={memoValue}
      onCancel={handleCancel}
      onSave={handleSave}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <AutoSizedTextArea
        className="leading-6"
        ref={textAreaRef}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        {...props}
      />
    </EditableFieldLayout>
  );
};
