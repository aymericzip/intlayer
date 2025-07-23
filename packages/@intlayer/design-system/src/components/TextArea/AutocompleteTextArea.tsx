'use client';

import { useConfiguration } from '@intlayer/editor-react';
import { type FC, useEffect, useRef, useState } from 'react';
import { useAutocomplete } from '../../hooks';
import {
  type AutoSizedTextAreaProps,
  AutoSizedTextArea,
} from './AutoSizeTextArea';

export const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup the timer if value changes before 'delay' ms
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
  const { autocomplete } = useAutocomplete();
  const configuration = useConfiguration();
  const [isTyped, setIsTyped] = useState(false);
  const [text, setText] = useState(defaultValue);
  const [suggestion, setSuggestion] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const placeholderRef = useRef<HTMLSpanElement>(null);
  const ghostLayerRef = useRef<HTMLDivElement>(null);
  const [suggestionPosition, setSuggestionPosition] = useState<{
    left: number;
    top: number;
  } | null>(null);
  const [cursorAtFetch, setCursorAtFetch] = useState(-1);

  // Only update this “debouncedText” after the user stops typing for 200ms
  const debouncedText = useDebounce(text, 200);

  useEffect(() => {
    if (typeof props.value === 'undefined') return;
    setText(defaultValue);
  }, [props.value, props.defaultValue]);

  useEffect(() => {
    if (!isActive) return;
    if (!isTyped) return;

    const fetchSuggestion = async () => {
      try {
        const cursor =
          textareaRef.current?.selectionStart ?? debouncedText.length;
        const before = debouncedText.slice(0, cursor);
        const after = debouncedText.slice(cursor);
        const numLines = 5;
        const beforeLines = before.split('\n');
        const contextBeforeLines = beforeLines.slice(
          Math.max(0, beforeLines.length - numLines - 1),
          -1
        );
        const contextBefore = contextBeforeLines.join('\n');
        const currentLine = beforeLines[beforeLines.length - 1] ?? '';
        const afterLines = after.split('\n');
        const contextAfter = afterLines.slice(1, numLines + 1).join('\n');

        const response = await autocomplete({
          text: before,
          contextBefore,
          currentLine,
          contextAfter,
          aiOptions: {
            apiKey: configuration.editor.openAiApiKey,
            model: configuration.editor.openAiApiModel,
            temperature: configuration.editor.openAiApiTemperature,
          },
        });
        const autocompletion = response?.data?.autocompletion ?? '';

        setSuggestion(autocompletion);
        setCursorAtFetch(cursor);
      } catch (err) {
        console.error('Autocomplete error:', err);
      }
    };

    if (debouncedText.length > 3) {
      // Only fetch if user typed more than 3 chars and has paused
      setSuggestion('');
      fetchSuggestion();
    } else {
      // If typed less than threshold, clear the suggestion
      setSuggestion('');
    }
  }, [debouncedText, isActive, autocomplete, configuration]);

  useEffect(() => {
    if (
      !suggestion ||
      cursorAtFetch === -1 ||
      !placeholderRef.current ||
      !ghostLayerRef.current
    ) {
      setSuggestionPosition(null);
      return;
    }

    const rect = placeholderRef.current.getBoundingClientRect();
    const parentRect = ghostLayerRef.current.getBoundingClientRect();
    setSuggestionPosition({
      left: rect.left - parentRect.left,
      top: rect.top - parentRect.top,
    });
  }, [suggestion, cursorAtFetch, text]);

  const acceptSuggestion = () => {
    const currentCursor = textareaRef.current?.selectionStart ?? cursorAtFetch;
    if (currentCursor !== cursorAtFetch) return;
    const newText =
      text.slice(0, currentCursor) + suggestion + text.slice(currentCursor);
    setText(newText);
    setSuggestion('');
    setCursorAtFetch(-1);
    setTimeout(() => {
      textareaRef.current?.focus();
      const newCursorPos = currentCursor + suggestion.length;
      textareaRef.current?.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  return (
    <div className="relative w-full">
      <div
        ref={ghostLayerRef}
        className="pointer-events-none absolute inset-0 whitespace-pre-wrap break-words px-1 py-3 text-base leading-[1.45rem] md:py-1 md:text-sm md:leading-[1.23rem]"
        aria-hidden="true"
      >
        {suggestion && cursorAtFetch !== -1 ? (
          <>
            <span className="align-text-top text-transparent">
              {text.slice(0, cursorAtFetch)}
            </span>
            <span
              ref={placeholderRef}
              style={{ visibility: 'hidden' }}
              aria-hidden="true"
            >
              {suggestion}
            </span>
            <span className="align-text-top text-transparent">
              {text.slice(cursorAtFetch)}
            </span>
          </>
        ) : (
          <span className="align-text-top text-transparent">{text}</span>
        )}
        {suggestionProp && (
          <span className="text-neutral align-text-top">{suggestionProp}</span>
        )}
      </div>
      {suggestion && suggestionPosition && (
        <div
          className="pointer-events-none text-neutral whitespace-pre-wrap break-words text-base leading-[1.45rem] md:text-sm md:leading-[1.23rem]"
          style={{
            position: 'absolute',
            left: suggestionPosition.left,
            top: suggestionPosition.top,
          }}
        >
          {suggestion}
        </div>
      )}
      <AutoSizedTextArea
        {...props}
        ref={textareaRef}
        value={text}
        onChange={(e) => {
          setIsTyped(true);
          setText(e.target.value);
          setSuggestion('');
          props.onChange?.(e);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Tab' && suggestion) {
            e.preventDefault();
            acceptSuggestion();
          }
          props.onKeyDown?.(e);
        }}
        onSelect={(e) => {
          if (
            suggestion &&
            (e.target as HTMLTextAreaElement).selectionStart !== cursorAtFetch
          ) {
            setSuggestion('');
            setCursorAtFetch(-1);
          }
          props.onSelect?.(e);
        }}
      />
    </div>
  );
};
