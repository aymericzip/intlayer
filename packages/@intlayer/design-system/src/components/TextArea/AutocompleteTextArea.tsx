'use client';

import { type FC, useEffect, useRef, useState } from 'react';
import type { AutoSizedTextAreaProps } from './AutoSizeTextArea';
import {
  ContentEditableTextArea,
  type ContentEditableTextAreaHandle,
} from './ContentEditableTextArea';

export const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

export type AutocompleteTextAreaProps = AutoSizedTextAreaProps & {
  isActive?: boolean;
  suggestion?: string;
};

export const AutoCompleteTextarea: FC<AutocompleteTextAreaProps> = ({
  isActive = true,
  suggestion: suggestionProp,
  ...props
}) => {
  const defaultValue = String(props.value ?? props.defaultValue ?? '');
  const [text, setText] = useState(defaultValue);
  const [suggestion, setSuggestion] = useState('');
  const editorRef = useRef<ContentEditableTextAreaHandle>(null);

  useEffect(() => {
    if (typeof props.value === 'undefined') return;
    setText(String(props.value ?? props.defaultValue ?? ''));
  }, [props.value, props.defaultValue]);

  const acceptSuggestion = () => {
    const active = suggestionProp ?? suggestion;
    if (!active) return;

    const cursor = editorRef.current?.getCursorOffset() ?? text.length;
    const next = text.slice(0, cursor) + active + text.slice(cursor);
    setText(next);
    setSuggestion('');

    setTimeout(() => {
      editorRef.current?.focus();
      editorRef.current?.setCursorAtOffset(cursor + active.length);
    }, 0);
  };

  const activeGhost = isActive
    ? (suggestionProp ?? (suggestion || undefined))
    : undefined;
  const textLines = text.split('\n');
  const activeLine = suggestionProp ? textLines.length - 1 : undefined;
  const activeOffset = suggestionProp
    ? (textLines[textLines.length - 1]?.length ?? 0)
    : undefined;

  return (
    <ContentEditableTextArea
      ref={editorRef}
      value={text}
      onChange={(val) => {
        setText(val);
        setSuggestion('');

        if (props.onChange) {
          const evt = {
            target: { value: val },
            currentTarget: { value: val },
          } as React.ChangeEvent<HTMLTextAreaElement>;
          props.onChange(evt);
        }
      }}
      onKeyDown={(e) => {
        if (e.key === 'Tab' && (suggestionProp ?? suggestion)) {
          e.preventDefault();
          acceptSuggestion();
        }
        props.onKeyDown?.(
          e as unknown as React.KeyboardEvent<HTMLTextAreaElement>
        );
      }}
      ghostText={activeGhost}
      ghostLine={activeLine}
      ghostOffset={activeOffset}
      placeholder={props.placeholder}
      disabled={props.disabled}
      autoSize={props.autoSize}
      maxRows={props.maxRows}
      minRows={props.rows}
      variant={props.variant}
      validationStyleEnabled={props.validationStyleEnabled}
      className={props.className}
      dir={props.dir as 'ltr' | 'rtl' | 'auto'}
      aria-label={props['aria-label']}
      aria-invalid={props['aria-invalid']}
      aria-describedby={props['aria-describedby']}
      data-testid={props['data-testid']}
    />
  );
};
