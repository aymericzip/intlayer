'use client';

import { type FC, useState, useEffect } from 'react';
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
  const { autocomplete } = useAutocomplete();
  const [isTyped, setIsTyped] = useState(false);
  const [text, setText] = useState('');
  const [suggestion, setSuggestion] = useState('');

  // Only update this “debouncedText” after the user stops typing for 500ms
  const debouncedText = useDebounce(text, 200);

  useEffect(() => {
    if (typeof props.value === 'undefined') return;
    setText(String(props.value ?? props.defaultValue ?? ''));
  }, [props.value, props.defaultValue]);

  useEffect(() => {
    if (!isActive) return;
    if (!isTyped) return;

    const fetchSuggestion = async () => {
      try {
        const response = await autocomplete({ text: debouncedText });
        // e.g. response.data.autocompletion = "Hello World"
        const autocompletion = response?.data?.autocompletion ?? '';

        // If the suggested text starts with what the user typed,
        // we only store the *remaining* part as the suggestion
        // so that we can render "ghost" text appropriately.
        if (autocompletion.startsWith(debouncedText)) {
          const remaining = autocompletion.slice(debouncedText.length);
          return setSuggestion(remaining);
        }

        return setSuggestion(autocompletion);
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
  }, [debouncedText, isActive]);

  const acceptSuggestion = () => {
    // Merge the typed text with the suggestion
    setText((prevText) => prevText + suggestion);
    setSuggestion('');
  };

  return (
    <div className="relative w-full">
      {/*
        --- Background/Ghost layer ---
        Mirrors user's typed text and shows suggestion as ghosted/gray
      */}
      <div
        className="pointer-events-none absolute inset-0 whitespace-pre-wrap break-words px-1 py-3 text-base leading-[1.45rem] md:py-1 md:text-sm"
        aria-hidden="true"
      >
        <span className="align-text-top text-transparent">{text}</span>
        {(suggestion || suggestionProp) && (
          <span className="text-neutral dark:text-neutral-dark ml-3 align-text-top">
            {suggestionProp ?? suggestion}
          </span>
        )}
      </div>
      {/*
        --- Actual editable textarea ---
        Must share the same styling (font size, line-height, etc.) so
        text lines up exactly underneath the background layer.
      */}
      <AutoSizedTextArea
        {...props}
        value={text}
        onChange={(e) => {
          setIsTyped(true);
          setText(e.target.value);
          props.onChange?.(e);
        }}
        onKeyDown={(e) => {
          // If user presses Tab and we have a suggestion, accept it
          if (e.key === 'Tab' && suggestion) {
            e.preventDefault();
            acceptSuggestion();
          }
          props.onKeyDown?.(e);
        }}
      />
    </div>
  );
};
