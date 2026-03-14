'use client';

import { useAutocomplete } from '@hooks/reactQuery';
import { useConfiguration } from '@intlayer/editor-react';
import { type FC, useCallback, useEffect, useRef, useState } from 'react';
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
  const { mutate: autocomplete } = useAutocomplete();
  const configuration = useConfiguration();
  const [isTyped, setIsTyped] = useState(false);
  const [text, setText] = useState(defaultValue);
  const [suggestion, setSuggestion] = useState('');
  const editorRef = useRef<ContentEditableTextAreaHandle>(null);
  const [cursorAtFetch, setCursorAtFetch] = useState(-1);
  const [ghostPos, setGhostPos] = useState<{
    line: number;
    offset: number;
  } | null>(null);

  const debouncedText = useDebounce(text, 200);

  useEffect(() => {
    if (typeof props.value === 'undefined') return;
    setText(defaultValue);
  }, [props.value, props.defaultValue]);

  const _cursorToLinePos = useCallback((cursor: number, src: string) => {
    const lines = src.split('\n');
    let rem = cursor;
    for (let i = 0; i < lines.length; i++) {
      if (rem <= lines[i].length) {
        setGhostPos({ line: i, offset: rem });
        return;
      }
      rem -= lines[i].length + 1;
    }
    setGhostPos({
      line: lines.length - 1,
      offset: lines[lines.length - 1].length,
    });
  }, []);

  useEffect(() => {
    if (!isActive || !isTyped) return;

    if (debouncedText.length > 3) {
      setSuggestion('');

      // Autocomplete fetch logic — currently disabled upstream
      // const cursor = editorRef.current?.getCursorOffset() ?? debouncedText.length;
      // const before = debouncedText.slice(0, cursor);
      // const after = debouncedText.slice(cursor);
      // const beforeLines = before.split('\n');
      // const contextBefore = beforeLines.slice(Math.max(0, beforeLines.length - 6), -1).join('\n');
      // const currentLine = beforeLines[beforeLines.length - 1] ?? '';
      // const contextAfter = after.split('\n').slice(1, 6).join('\n');
      //
      // autocomplete(
      //   { text: before, contextBefore, currentLine, contextAfter,
      //     aiOptions: { apiKey: configuration.ai?.apiKey, model: configuration.ai?.model, temperature: configuration.ai?.temperature } },
      //   { onSuccess: (data: AutocompleteResponse) => {
      //       const completion = data.data?.autocompletion ?? '';
      //       setSuggestion(completion);
      //       setCursorAtFetch(cursor);
      //       if (completion) cursorToLinePos(cursor, debouncedText);
      //   }}
      // );
    } else {
      setSuggestion('');
    }
  }, [debouncedText, isActive, autocomplete, configuration]);

  const acceptSuggestion = useCallback(() => {
    const cursor = editorRef.current?.getCursorOffset() ?? cursorAtFetch;
    if (cursor !== cursorAtFetch) return;

    const active = suggestionProp ?? suggestion;
    const next = text.slice(0, cursor) + active + text.slice(cursor);
    setText(next);
    setSuggestion('');
    setCursorAtFetch(-1);
    setGhostPos(null);

    setTimeout(() => {
      editorRef.current?.focus();
      editorRef.current?.setCursorAtOffset(cursor + active.length);
    }, 0);
  }, [text, suggestion, suggestionProp, cursorAtFetch]);

  const activeGhost = suggestionProp ?? (suggestion || undefined);
  const activeLine = suggestionProp
    ? text.split('\n').length - 1
    : ghostPos?.line;
  const activeOffset = suggestionProp
    ? (text.split('\n').at(-1)?.length ?? 0)
    : ghostPos?.offset;

  return (
    <ContentEditableTextArea
      ref={editorRef}
      value={text}
      onChange={(val) => {
        setIsTyped(true);
        setText(val);
        setSuggestion('');
        setGhostPos(null);

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
      data-testid={props['data-testid']}
    />
  );
};
