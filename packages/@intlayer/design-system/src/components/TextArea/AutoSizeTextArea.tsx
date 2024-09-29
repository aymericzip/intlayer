'use client';

import {
  useRef,
  useState,
  type FC,
  useEffect,
  type ChangeEventHandler,
} from 'react';
import { cn } from '../../utils/cn';
import { TextArea, type TextAreaProps } from './TextArea';

type AutoSizedTextAreaProps = TextAreaProps & {
  autoSize?: boolean;
  maxRows?: number;
};

const LINE_HEIGHT = 24; // px
const LINE_PADDING = 12; // px

export const AutoSizedTextArea: FC<AutoSizedTextAreaProps> = ({
  className,
  autoSize = true,
  onChange,
  defaultValue,
  maxRows = 999,
  ...props
}) => {
  const [value, setValue] = useState<string>(defaultValue?.toString() ?? '');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textAreaEl = textAreaRef.current;

    if (!textAreaEl || !autoSize) return;

    const textAreaStyle = textAreaEl.style;

    // We need to reset the height momentarily to get the correct scrollHeight for the textarea
    textAreaStyle.height = 'auto';
    const scrollHeight = textAreaEl.scrollHeight;
    const maxHeight = LINE_HEIGHT * maxRows + LINE_PADDING;
    const minHeight = LINE_HEIGHT + LINE_PADDING;

    // We then set the height directly, outside of the render loop
    // Trying to set this with state or a ref will product an incorrect value.
    textAreaStyle.height =
      Math.max(Math.min(scrollHeight, maxHeight), minHeight) + 'px';

    if (scrollHeight > maxHeight) {
      textAreaStyle.overflowY = 'scroll';
    } else {
      textAreaStyle.overflowY = 'hidden';
    }
  }, [textAreaRef, value, autoSize, maxRows]);

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const val = e.target?.value;

    setValue(val);
    onChange?.(e);
  };

  return (
    <TextArea
      onChange={handleChange}
      ref={textAreaRef}
      className={cn(autoSize ? 'resize-none' : '', className)}
      defaultValue={defaultValue}
      {...props}
    />
  );
};
