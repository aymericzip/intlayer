'use client';

import {
  type ChangeEvent,
  type FC,
  type KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import type { AutoSizedTextAreaProps } from './AutoSizeTextArea';
import {
  ContentEditableTextArea,
  type ContentEditableTextAreaHandle,
} from './ContentEditableTextArea';

/**
 * Props for the AutocompleteTextArea component.
 *
 * Extends AutoSizedTextAreaProps with inline autocomplete functionality
 * using a contentEditable-based textarea.
 *
 * @example
 * ```tsx
 * <AutoCompleteTextarea
 *   placeholder="Start typing..."
 *   isActive={true}
 *   autoSize={true}
 *   maxRows={10}
 * />
 * ```
 */
export type AutocompleteTextAreaProps = AutoSizedTextAreaProps & {
  /** Whether inline autocomplete ghost text is active */
  isActive?: boolean;
  /** Manual suggestion text to display as ghost text after the cursor */
  suggestion?: string;
};

/**
 * AutoCompleteTextarea Component
 *
 * A textarea with inline autocomplete ghost text, built on a contentEditable div
 * instead of a native `<textarea>`. Ghost text (suggestions) is rendered inline
 * at the cursor position and can be accepted with the Tab key.
 *
 * The component wraps `ContentEditableTextArea` and manages suggestion state.
 * When `suggestion` prop is provided it is shown as ghost text at the end of the
 * current text. When `isActive` is false, ghost text is hidden.
 *
 * @example
 * ```tsx
 * <AutoCompleteTextarea
 *   value={content}
 *   onChange={handleChange}
 *   suggestion="suggested completion..."
 *   isActive={true}
 *   autoSize={true}
 * />
 * ```
 */
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
          } as ChangeEvent<HTMLTextAreaElement>;
          props.onChange(evt);
        }
      }}
      onKeyDown={(e) => {
        if (e.key === 'Tab' && (suggestionProp ?? suggestion)) {
          e.preventDefault();
          acceptSuggestion();
        }
        props.onKeyDown?.(e as unknown as KeyboardEvent<HTMLTextAreaElement>);
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
      data-testid={(props as Record<string, unknown>)['data-testid'] as string}
    />
  );
};
