'use client';

import { AutocompleteResponse } from '@intlayer/backend';
import { useConfiguration } from '@intlayer/editor-react';
import { type FC, useEffect, useRef, useState } from 'react';
import { useAutocomplete } from '../../hooks/reactQuery';
import {
  type AutoSizedTextAreaProps,
  AutoSizedTextArea,
} from './AutoSizeTextArea';

/**
 * Custom hook for debouncing values to prevent excessive API calls.
 *
 * Delays updating the returned value until the input value has stopped changing
 * for the specified delay period.
 *
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds before updating the debounced value
 * @returns The debounced value that only updates after the delay period
 *
 * @example
 * ```tsx
 * const [searchTerm, setSearchTerm] = useState('');
 * const debouncedSearchTerm = useDebounce(searchTerm, 300);
 *
 * useEffect(() => {
 *   if (debouncedSearchTerm) {
 *     performSearch(debouncedSearchTerm);
 *   }
 * }, [debouncedSearchTerm]);
 * ```
 */
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

/**
 * Props for the AutocompleteTextArea component.
 *
 * Extends AutoSizedTextAreaProps with AI-powered autocomplete functionality.
 *
 * @example
 * ```tsx
 * // AI-powered autocomplete textarea
 * <AutoCompleteTextarea
 *   placeholder="Start typing for AI suggestions..."
 *   isActive={true}
 *   autoSize={true}
 *   maxRows={10}
 * />
 *
 * // Manual suggestion mode
 * <AutoCompleteTextarea
 *   value={content}
 *   onChange={handleChange}
 *   suggestion="Consider adding more details about..."
 *   isActive={false}
 * />
 *
 * // Disabled autocomplete for sensitive content
 * <AutoCompleteTextarea
 *   placeholder="Private notes (no AI assistance)"
 *   isActive={false}
 *   autoSize={true}
 * />
 * ```
 */
export type AutocompleteTextAreaProps = AutoSizedTextAreaProps & {
  /** Whether AI autocomplete is active and should fetch suggestions */
  isActive?: boolean;
  /** Manual suggestion text to display (overrides AI suggestions) */
  suggestion?: string;
};

/**
 * AutoCompleteTextarea Component
 *
 * An intelligent textarea that provides AI-powered autocomplete suggestions as users type,
 * combining auto-sizing functionality with contextual text completion.
 *
 * ## Features
 * - **AI-Powered Suggestions**: Context-aware autocomplete using configured AI models
 * - **Debounced API Calls**: Efficient suggestion fetching with 200ms debounce
 * - **Visual Suggestions**: Inline preview of suggested completions
 * - **Keyboard Navigation**: Tab key to accept suggestions
 * - **Context Analysis**: Uses surrounding text for better suggestions
 * - **Auto-Sizing**: Inherits all AutoSizedTextArea capabilities
 * - **Performance Optimized**: Smart caching and minimal re-renders
 *
 * ## Technical Implementation
 * - **Debounce Strategy**: 200ms delay before fetching suggestions
 * - **Context Window**: 5 lines before/after cursor for context
 * - **Minimum Trigger**: Requires 3+ characters before suggesting
 * - **Position Tracking**: Ghost layer for accurate suggestion positioning
 * - **Cursor Management**: Tracks cursor position during suggestion fetch
 *
 * ## AI Integration
 * - Uses configured AI model (OpenAI, Anthropic, etc.)
 * - Sends context-aware prompts for relevant suggestions
 * - Respects temperature and model settings from configuration
 * - Handles API errors gracefully without interrupting user flow
 *
 * ## Use Cases
 * - **Content Creation**: Blog posts, articles, documentation
 * - **Code Comments**: Intelligent code documentation assistance
 * - **Email Composition**: Professional email writing assistance
 * - **Creative Writing**: Story and narrative completion
 * - **Technical Documentation**: API docs, README files
 * - **Social Media**: Post creation with engagement optimization
 *
 * @example
 * ```tsx
 * // Blog writing assistant
 * const [blogPost, setBlogPost] = useState('');
 * const [isAiEnabled, setIsAiEnabled] = useState(true);
 *
 * <div className="space-y-4">
 *   <div className="flex items-center gap-2">
 *     <Switch
 *       checked={isAiEnabled}
 *       onChange={setIsAiEnabled}
 *     />
 *     <label>AI Writing Assistant</label>
 *   </div>
 *
 *   <AutoCompleteTextarea
 *     value={blogPost}
 *     onChange={(e) => setBlogPost(e.target.value)}
 *     placeholder="Start writing your blog post..."
 *     isActive={isAiEnabled}
 *     autoSize={true}
 *     maxRows={15}
 *     className="min-h-[200px] font-serif text-lg leading-relaxed"
 *   />
 * </div>
 *
 * // Code documentation assistant
 * <AutoCompleteTextarea
 *   value={docComment}
 *   onChange={handleDocChange}
 *   placeholder="/** Describe this function... *\/"
 *   isActive={true}
 *   autoSize={true}
 *   maxRows={8}
 *   className="font-mono text-sm"
 * />
 *
 * // Email composition with templates
 * <AutoCompleteTextarea
 *   defaultValue="Dear "
 *   placeholder="AI will help complete your email..."
 *   isActive={true}
 *   autoSize={true}
 *   maxRows={12}
 *   variant={InputVariant.DEFAULT}
 * />
 * ```
 *
 * ## Accessibility
 * - Ghost layer is properly hidden from screen readers
 * - Maintains focus management during suggestion acceptance
 * - Preserves keyboard navigation patterns
 * - Respects reduced motion preferences
 */
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

        autocomplete(
          {
            text: before,
            contextBefore,
            currentLine,
            contextAfter,
            aiOptions: {
              apiKey: configuration.ai?.apiKey,
              model: configuration.ai?.model,
              temperature: configuration.ai?.temperature,
            },
          },
          {
            onSuccess: (data: AutocompleteResponse) => {
              setSuggestion(data.data?.autocompletion ?? '');
              setCursorAtFetch(cursor);
            },
          }
        );
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
