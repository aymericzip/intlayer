'use client';

import { cn } from '@utils/cn';
import type { VariantProps } from 'class-variance-authority';
import {
  type FC,
  type HTMLAttributes,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { type InputVariant, inputVariants } from '../Input';

type CaretPosition = {
  line: number;
  offset: number;
};

type UseContentEditableOptions = {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
};

const ZERO_WIDTH_SPACE = '\u200B';

const getTextFromContainer = (container: HTMLDivElement): string => {
  const lineEls = container.querySelectorAll('[data-line]');
  if (lineEls.length === 0) {
    return (container.textContent ?? '').split(ZERO_WIDTH_SPACE).join('');
  }

  return Array.from(lineEls)
    .map((el) => {
      const editable = el.querySelector('[data-editable]');
      const raw = editable?.textContent ?? el.textContent ?? '';
      return raw === ZERO_WIDTH_SPACE
        ? ''
        : raw.split(ZERO_WIDTH_SPACE).join('');
    })
    .join('\n');
};

const splitLines = (text: string): string[] => {
  const lines = text.split('\n');
  return lines.length === 0 ? [''] : lines;
};

// Cached Intl.Segmenter for grapheme-aware deletion (emoji, CJK, etc.)
const graphemeSegmenter =
  typeof Intl !== 'undefined' && 'Segmenter' in Intl
    ? new Intl.Segmenter(undefined, { granularity: 'grapheme' })
    : null;

/**
 * Find the previous grapheme cluster boundary for safe deletion.
 * Falls back to code-point-aware deletion if Intl.Segmenter is unavailable.
 */
const prevGraphemeBoundary = (text: string, offset: number): number => {
  if (offset <= 0) return 0;

  if (graphemeSegmenter) {
    const segments = [...graphemeSegmenter.segment(text.slice(0, offset))];
    const last = segments[segments.length - 1];
    return last ? offset - last.segment.length : offset - 1;
  }

  // Fallback: handle surrogate pairs
  const code = text.charCodeAt(offset - 1);
  if (code >= 0xdc00 && code <= 0xdfff && offset >= 2) {
    return offset - 2;
  }
  return offset - 1;
};

/**
 * Find the next grapheme cluster boundary for safe forward deletion.
 */
const nextGraphemeBoundary = (text: string, offset: number): number => {
  if (offset >= text.length) return text.length;

  if (graphemeSegmenter) {
    const segments = [...graphemeSegmenter.segment(text.slice(offset))];
    const first = segments[0];
    return first ? offset + first.segment.length : offset + 1;
  }

  // Fallback: handle surrogate pairs
  const code = text.charCodeAt(offset);
  if (code >= 0xd800 && code <= 0xdbff && offset + 1 < text.length) {
    return offset + 2;
  }
  return offset + 1;
};

/**
 * Find the previous word boundary for Option+Backspace.
 */
const prevWordBoundary = (text: string, offset: number): number => {
  if (offset <= 0) return 0;
  let i = offset - 1;
  // Skip whitespace
  while (i > 0 && /\s/.test(text[i - 1])) i--;
  // Skip word characters
  while (i > 0 && /\S/.test(text[i - 1])) i--;
  return i;
};

/**
 * Find the next word boundary for Option+Delete.
 */
const nextWordBoundary = (text: string, offset: number): number => {
  if (offset >= text.length) return text.length;
  let i = offset;
  // Skip word characters
  while (i < text.length && /\S/.test(text[i])) i++;
  // Skip whitespace
  while (i < text.length && /\s/.test(text[i])) i++;
  return i;
};

/**
 * Find the start of the current line (for Cmd+Backspace).
 */
const lineStart = (text: string, offset: number): number => {
  const before = text.slice(0, offset);
  const lastNewline = before.lastIndexOf('\n');
  return lastNewline + 1;
};

/**
 * Find the end of the current line (for Cmd+Delete).
 */
const lineEnd = (text: string, offset: number): number => {
  const nextNewline = text.indexOf('\n', offset);
  return nextNewline === -1 ? text.length : nextNewline;
};

export const useContentEditable = ({
  value,
  defaultValue,
  onChange,
  disabled = false,
}: UseContentEditableOptions) => {
  const initialValue = value ?? defaultValue ?? '';
  const [lines, setLines] = useState<string[]>(() => splitLines(initialValue));
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pendingCaretRef = useRef<CaretPosition | null>(null);
  const isControlled = value !== undefined;

  // Keep a ref to the latest lines to avoid stale closures in rapid typing
  const linesRef = useRef(lines);
  linesRef.current = lines;

  useEffect(() => {
    if (isControlled && value !== undefined) {
      setLines(splitLines(value));
    }
  }, [value, isControlled]);

  const getText = useCallback(() => linesRef.current.join('\n'), []);

  const getCaretPosition = useCallback((): CaretPosition | null => {
    const sel = window.getSelection();
    if (!sel?.rangeCount || !containerRef.current) return null;

    const range = sel.getRangeAt(0);
    const lineEls = containerRef.current.querySelectorAll('[data-line]');

    for (let i = 0; i < lineEls.length; i++) {
      if (lineEls[i].contains(range.startContainer)) {
        return { line: i, offset: range.startOffset };
      }
    }
    return null;
  }, []);

  const getSelectionOffsets = useCallback((): {
    start: number;
    end: number;
    hasSelection: boolean;
  } | null => {
    const sel = window.getSelection();
    if (!sel?.rangeCount || !containerRef.current) return null;

    const range = sel.getRangeAt(0);
    const lineEls = containerRef.current.querySelectorAll('[data-line]');
    const currentLines = linesRef.current;

    const findOffset = (node: Node, nodeOffset: number): number => {
      for (let i = 0; i < lineEls.length; i++) {
        if (lineEls[i].contains(node)) {
          let flat = 0;
          for (let j = 0; j < i; j++) {
            flat += currentLines[j].length + 1;
          }
          return flat + Math.min(nodeOffset, currentLines[i]?.length ?? 0);
        }
      }
      // Selection is on the root container (e.g. select-all)
      if (node === containerRef.current) {
        if (nodeOffset === 0) return 0;
        return currentLines.join('\n').length;
      }
      return 0;
    };

    const start = findOffset(range.startContainer, range.startOffset);
    const end = findOffset(range.endContainer, range.endOffset);

    return {
      start: Math.min(start, end),
      end: Math.max(start, end),
      hasSelection: !range.collapsed,
    };
  }, []);

  const setCaretPosition = useCallback((pos: CaretPosition) => {
    if (!containerRef.current) return;

    const lineEls = containerRef.current.querySelectorAll('[data-line]');
    const lineEl = lineEls[pos.line];
    if (!lineEl) return;

    const editable = lineEl.querySelector('[data-editable]');
    const node =
      editable?.firstChild ?? editable ?? lineEl.firstChild ?? lineEl;

    const sel = window.getSelection();
    if (!sel) return;

    const range = document.createRange();
    const maxOff = Math.min(pos.offset, node.textContent?.length ?? 0);

    try {
      range.setStart(node, maxOff);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    } catch {
      range.selectNodeContents(node);
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }, []);

  useEffect(() => {
    if (pendingCaretRef.current && containerRef.current) {
      setCaretPosition(pendingCaretRef.current);
      pendingCaretRef.current = null;
    }
  });

  const flatOffsetFromCaret = useCallback((pos: CaretPosition): number => {
    const currentLines = linesRef.current;
    let offset = 0;
    for (let i = 0; i < pos.line; i++) {
      offset += currentLines[i].length + 1;
    }
    return offset + pos.offset;
  }, []);

  const caretFromFlatOffset = useCallback(
    (flat: number, targetLines: string[]): CaretPosition => {
      let rem = flat;
      for (let i = 0; i < targetLines.length; i++) {
        if (rem <= targetLines[i].length) {
          return { line: i, offset: rem };
        }
        rem -= targetLines[i].length + 1;
      }
      return {
        line: targetLines.length - 1,
        offset: targetLines[targetLines.length - 1]?.length ?? 0,
      };
    },
    []
  );

  const getCursorOffset = useCallback((): number => {
    const pos = getCaretPosition();
    if (!pos) return 0;
    return flatOffsetFromCaret(pos);
  }, [getCaretPosition, flatOffsetFromCaret]);

  /**
   * Applies a text mutation: computes new lines, sets pending caret, updates state.
   */
  const applyTextChange = useCallback(
    (newText: string, caretOffset: number) => {
      const newLines = splitLines(newText);
      pendingCaretRef.current = caretFromFlatOffset(caretOffset, newLines);
      setLines(newLines);
      onChange?.(newText);
    },
    [caretFromFlatOffset, onChange]
  );

  const handleInput = useCallback(() => {
    if (pendingCaretRef.current !== null) return;
    if (disabled || !containerRef.current) return;

    const caretPos = getCaretPosition();
    const newText = getTextFromContainer(containerRef.current);
    const newLines = splitLines(newText);

    pendingCaretRef.current = caretPos;
    setLines(newLines);
    onChange?.(newText);
  }, [disabled, onChange, getCaretPosition]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) {
        e.preventDefault();
        return;
      }

      // Don't intercept during IME composition (CJK input)
      if (e.nativeEvent.isComposing) return;

      // Block undo/redo — browser would mutate DOM out of sync with React
      if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
        e.preventDefault();
        return;
      }

      const selInfo = getSelectionOffsets();
      if (!selInfo) return;

      const currentText = linesRef.current.join('\n');

      if (e.key === 'Enter') {
        e.preventDefault();
        const newText =
          currentText.slice(0, selInfo.start) +
          '\n' +
          currentText.slice(selInfo.end);
        applyTextChange(newText, selInfo.start + 1);
        return;
      }

      if (e.key === 'Backspace') {
        e.preventDefault();

        if (selInfo.hasSelection) {
          const newText =
            currentText.slice(0, selInfo.start) +
            currentText.slice(selInfo.end);
          applyTextChange(newText, selInfo.start);
        } else {
          if (selInfo.start === 0) return;

          let deleteFrom: number;
          if (e.metaKey) {
            // Cmd+Backspace: delete to start of line
            deleteFrom = lineStart(currentText, selInfo.start);
          } else if (e.altKey) {
            // Option+Backspace: delete previous word
            deleteFrom = prevWordBoundary(currentText, selInfo.start);
          } else {
            // Regular backspace: delete one grapheme
            deleteFrom = prevGraphemeBoundary(currentText, selInfo.start);
          }

          const newText =
            currentText.slice(0, deleteFrom) + currentText.slice(selInfo.start);
          applyTextChange(newText, deleteFrom);
        }
        return;
      }

      if (e.key === 'Delete') {
        e.preventDefault();

        if (selInfo.hasSelection) {
          const newText =
            currentText.slice(0, selInfo.start) +
            currentText.slice(selInfo.end);
          applyTextChange(newText, selInfo.start);
        } else {
          if (selInfo.start >= currentText.length) return;

          let deleteTo: number;
          if (e.metaKey) {
            // Cmd+Delete: delete to end of line
            deleteTo = lineEnd(currentText, selInfo.start);
          } else if (e.altKey) {
            // Option+Delete: delete next word
            deleteTo = nextWordBoundary(currentText, selInfo.start);
          } else {
            // Regular delete: delete one grapheme
            deleteTo = nextGraphemeBoundary(currentText, selInfo.start);
          }

          const newText =
            currentText.slice(0, selInfo.start) + currentText.slice(deleteTo);
          applyTextChange(newText, selInfo.start);
        }
        return;
      }
    },
    [disabled, getSelectionOffsets, applyTextChange]
  );

  const handleCut = useCallback(
    (e: React.ClipboardEvent<HTMLDivElement>) => {
      if (disabled) {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      const selInfo = getSelectionOffsets();
      if (!selInfo || !selInfo.hasSelection) return;

      const currentText = linesRef.current.join('\n');
      const selectedText = currentText.slice(selInfo.start, selInfo.end);

      // Write selected text to clipboard
      e.clipboardData.setData('text/plain', selectedText);

      // Delete the selected text
      const newText =
        currentText.slice(0, selInfo.start) + currentText.slice(selInfo.end);
      applyTextChange(newText, selInfo.start);
    },
    [disabled, getSelectionOffsets, applyTextChange]
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLDivElement>) => {
      if (disabled) {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      const pastedText = e.clipboardData.getData('text/plain');
      if (!pastedText) return;

      const selInfo = getSelectionOffsets();
      if (!selInfo) return;

      const currentText = linesRef.current.join('\n');
      const newText =
        currentText.slice(0, selInfo.start) +
        pastedText +
        currentText.slice(selInfo.end);
      applyTextChange(newText, selInfo.start + pastedText.length);
    },
    [disabled, getSelectionOffsets, applyTextChange]
  );

  const handleBeforeInput = useCallback(
    (e: React.FormEvent<HTMLDivElement>) => {
      if (disabled) return;

      const inputEvent = e.nativeEvent as InputEvent;

      // Don't intercept during IME composition (CJK input)
      if (inputEvent.isComposing) return;

      const inputType = inputEvent.inputType;

      // Skip types handled by handleKeyDown (when keydown fires)
      if (inputType === 'insertParagraph' || inputType === 'insertLineBreak') {
        return;
      }

      // Handle deletions as fallback for mobile keyboards that don't fire keydown
      if (
        inputType === 'deleteContentBackward' ||
        inputType === 'deleteContentForward'
      ) {
        e.preventDefault();
        const selInfo = getSelectionOffsets();
        if (!selInfo) return;

        const currentText = linesRef.current.join('\n');

        if (selInfo.hasSelection) {
          const newText =
            currentText.slice(0, selInfo.start) +
            currentText.slice(selInfo.end);
          applyTextChange(newText, selInfo.start);
        } else if (inputType === 'deleteContentBackward') {
          if (selInfo.start === 0) return;
          const deleteFrom = prevGraphemeBoundary(currentText, selInfo.start);
          const newText =
            currentText.slice(0, deleteFrom) + currentText.slice(selInfo.start);
          applyTextChange(newText, deleteFrom);
        } else {
          if (selInfo.start >= currentText.length) return;
          const deleteTo = nextGraphemeBoundary(currentText, selInfo.start);
          const newText =
            currentText.slice(0, selInfo.start) + currentText.slice(deleteTo);
          applyTextChange(newText, selInfo.start);
        }
        return;
      }

      // Handle spell-check replacements
      if (inputType === 'insertReplacementText') {
        e.preventDefault();
        const selInfo = getSelectionOffsets();
        if (!selInfo) return;

        const currentText = linesRef.current.join('\n');
        const replacement =
          inputEvent.data ??
          inputEvent.dataTransfer?.getData('text/plain') ??
          '';
        const newText =
          currentText.slice(0, selInfo.start) +
          replacement +
          currentText.slice(selInfo.end);
        applyTextChange(newText, selInfo.start + replacement.length);
        return;
      }

      if (inputType === 'insertText' && inputEvent.data) {
        e.preventDefault();

        const selInfo = getSelectionOffsets();
        if (!selInfo) return;

        const currentText = linesRef.current.join('\n');
        const inserted = inputEvent.data;
        const newText =
          currentText.slice(0, selInfo.start) +
          inserted +
          currentText.slice(selInfo.end);
        applyTextChange(newText, selInfo.start + inserted.length);
      }
    },
    [disabled, getSelectionOffsets, applyTextChange]
  );

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    // Block drag-and-drop to prevent uncontrolled DOM mutations
    e.preventDefault();
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  return {
    lines,
    containerRef,
    getText,
    handleInput,
    handleBeforeInput,
    handleKeyDown,
    handleCut,
    handlePaste,
    handleDrop,
    handleDragOver,
    getCaretPosition,
    setCaretPosition,
    getCursorOffset,
    caretFromFlatOffset,
  };
};

type LineProps = {
  index: number;
  text: string;
  isLast: boolean;
  ghostText?: string;
};

const Line: FC<LineProps> = memo(
  ({ index, text, isLast, ghostText }) => (
    <span data-line={index} className="block min-h-[1.5rem]">
      <span data-editable>{text || '\u200B'}</span>
      {ghostText && (
        <span
          data-ghost
          className="pointer-events-none select-none text-neutral"
          aria-hidden="true"
        >
          {ghostText}
        </span>
      )}
      {!isLast && <br />}
    </span>
  ),
  (prev, next) =>
    prev.text === next.text &&
    prev.ghostText === next.ghostText &&
    prev.index === next.index &&
    prev.isLast === next.isLast
);

Line.displayName = 'Line';

export type ContentEditableTextAreaHandle = {
  getContainer: () => HTMLDivElement | null;
  getText: () => string;
  focus: () => void;
  getCursorOffset: () => number;
  setCursorAtOffset: (offset: number) => void;
};

export type ContentEditableTextAreaProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'onChange' | 'defaultValue'
> & {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  minRows?: number;
  maxRows?: number;
  autoSize?: boolean;
  validationStyleEnabled?: boolean;
  variant?: InputVariant | `${InputVariant}`;
  ghostText?: string;
  ghostLine?: number;
  ghostOffset?: number;
  ref?: React.Ref<ContentEditableTextAreaHandle>;
  dir?: 'ltr' | 'rtl' | 'auto';
} & Omit<
    VariantProps<typeof inputVariants>,
    'validationStyleEnabled' | 'variant'
  >;

const LINE_HEIGHT = 24;
const LINE_PADDING = 12;

export const ContentEditableTextArea: FC<ContentEditableTextAreaProps> = ({
  value,
  defaultValue,
  onChange,
  placeholder,
  disabled = false,
  minRows = 1,
  maxRows = 999,
  autoSize = true,
  validationStyleEnabled = false,
  variant,
  ghostText,
  ghostLine,
  ghostOffset,
  onClick,
  className,
  dir = 'auto',
  ref,
  ...rest
}) => {
  const {
    lines,
    containerRef,
    getText,
    handleInput,
    handleBeforeInput,
    handleKeyDown,
    handleCut,
    handlePaste,
    handleDrop,
    handleDragOver,
    getCursorOffset,
    setCaretPosition,
    caretFromFlatOffset,
  } = useContentEditable({ value, defaultValue, onChange, disabled });

  const elRef = useRef<HTMLDivElement | null>(null);

  const setRef = useCallback(
    (el: HTMLDivElement | null) => {
      elRef.current = el;
      (containerRef as React.MutableRefObject<HTMLDivElement | null>).current =
        el;
    },
    [containerRef]
  );

  useImperativeHandle(ref, () => ({
    getContainer: () => elRef.current,
    getText,
    focus: () => elRef.current?.focus(),
    getCursorOffset,
    setCursorAtOffset: (offset: number) => {
      setCaretPosition(caretFromFlatOffset(offset, lines));
    },
  }));

  useEffect(() => {
    if (!autoSize || !elRef.current) return;

    const el = elRef.current;
    const max = LINE_HEIGHT * maxRows + LINE_PADDING;
    const min = LINE_HEIGHT * minRows + LINE_PADDING;

    el.style.height = 'auto';
    const sh = el.scrollHeight;
    el.style.height = `${Math.max(Math.min(sh, max), min)}px`;
    el.style.overflowY = sh > max ? 'auto' : 'hidden';
  }, [lines, autoSize, maxRows, minRows]);

  const isEmpty = lines.length === 1 && lines[0] === '';
  const hasGhost =
    ghostText && ghostLine !== undefined && ghostOffset !== undefined;

  return (
    <div className="relative w-full">
      {isEmpty && placeholder && (
        <div
          className="pointer-events-none absolute inset-0 select-none px-2 py-3 text-base text-neutral-400 leading-[1.5rem] md:py-2 md:text-sm"
          aria-hidden="true"
        >
          {placeholder}
        </div>
      )}

      <div
        {...rest}
        ref={setRef}
        role="textbox"
        aria-multiline="true"
        aria-placeholder={placeholder}
        aria-disabled={disabled}
        aria-autocomplete={hasGhost ? 'inline' : undefined}
        tabIndex={disabled ? -1 : 0}
        contentEditable={!disabled}
        suppressContentEditableWarning
        dir={dir}
        onInput={handleInput}
        onBeforeInput={handleBeforeInput}
        onKeyDown={handleKeyDown}
        onCut={handleCut}
        onPaste={handlePaste}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={onClick}
        data-testid={rest['data-testid']}
        className={cn(
          'resize-none whitespace-pre-wrap break-words outline-none',
          inputVariants({
            variant,
            validationStyleEnabled: validationStyleEnabled
              ? 'enabled'
              : 'disabled',
          }),
          autoSize && 'overflow-y-auto',
          className
        )}
      >
        {lines.map((text, i) => (
          <Line
            key={i}
            index={i}
            text={text}
            isLast={i === lines.length - 1}
            ghostText={hasGhost && ghostLine === i ? ghostText : undefined}
          />
        ))}
      </div>
    </div>
  );
};
