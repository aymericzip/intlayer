'use client';

import {
  type FC,
  useRef,
  useEffect,
  type ChangeEventHandler,
  useImperativeHandle,
  useCallback,
} from 'react';
import { cn } from '../../utils/cn';
import { type TextAreaProps, TextArea } from './TextArea';

export type AutoSizedTextAreaProps = TextAreaProps & {
  autoSize?: boolean;
  maxRows?: number;
};

const LINE_HEIGHT = 24; // px
const LINE_PADDING = 12; // px

export const AutoSizedTextArea: FC<AutoSizedTextAreaProps> = ({
  className,
  autoSize = true,
  onChange,
  maxRows = 999,
  ref,
  ...props
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  useImperativeHandle(ref, () => textAreaRef.current!);

  const adjustHeight = useCallback(() => {
    const textAreaEl = textAreaRef.current;

    if (!textAreaEl || !autoSize) return;

    const textAreaStyle = textAreaEl.style;

    // Reset height to get accurate scrollHeight
    textAreaStyle.height = 'auto';
    const scrollHeight = textAreaEl.scrollHeight;
    const maxHeight = LINE_HEIGHT * maxRows + LINE_PADDING;
    const minHeight = LINE_HEIGHT + LINE_PADDING;

    // Set the new height
    textAreaStyle.height =
      Math.max(Math.min(scrollHeight, maxHeight), minHeight) + 'px';
  }, [autoSize, maxRows]);

  useEffect(() => {
    adjustHeight();
  }, [props.value, props.defaultValue, adjustHeight]);

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    onChange?.(e);
    adjustHeight();
  };

  const setRef = useCallback(
    (el: HTMLTextAreaElement | null) => {
      textAreaRef.current = el;
      if (el) {
        adjustHeight();
      }
    },
    [adjustHeight]
  );

  return (
    <TextArea
      ref={setRef}
      onChange={handleChange}
      className={cn(
        'overflow-y-scroll',
        autoSize ? 'resize-none' : '',
        className
      )}
      {...props}
    />
  );
};
