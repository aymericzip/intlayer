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

const getTextFromContainer = (container: HTMLDivElement): string => {
  const lineEls = container.querySelectorAll('[data-line]');
  if (lineEls.length === 0) return container.textContent ?? '';

  return Array.from(lineEls)
    .map((el) => {
      const editable = el.querySelector('[data-editable]');
      return editable?.textContent ?? el.textContent ?? '';
    })
    .join('\n');
};

const splitLines = (text: string): string[] => {
  const lines = text.split('\n');
  return lines.length === 0 ? [''] : lines;
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
  const isControlled = value !== undefined;

  useEffect(() => {
    if (isControlled && value !== undefined) {
      setLines(splitLines(value));
    }
  }, [value, isControlled]);

  const getText = useCallback(() => lines.join('\n'), [lines]);

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

  const getCursorOffset = useCallback((): number => {
    const pos = getCaretPosition();
    if (!pos) return 0;

    let offset = 0;
    for (let i = 0; i < pos.line; i++) {
      offset += lines[i].length + 1;
    }
    return offset + pos.offset;
  }, [getCaretPosition, lines]);

  const handleInput = useCallback(() => {
    if (disabled || !containerRef.current) return;

    const newText = getTextFromContainer(containerRef.current);
    const newLines = splitLines(newText);

    if (!isControlled) {
      setLines(newLines);
    }
    onChange?.(newText);
  }, [disabled, isControlled, onChange]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) {
        e.preventDefault();
      }
    },
    [disabled]
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLDivElement>) => {
      if (disabled) {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      const text = e.clipboardData.getData('text/plain');

      const sel = window.getSelection();
      if (!sel?.rangeCount) return;

      const range = sel.getRangeAt(0);
      range.deleteContents();
      range.insertNode(document.createTextNode(text));
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);

      handleInput();
    },
    [disabled, handleInput]
  );

  return {
    lines,
    containerRef,
    getText,
    handleInput,
    handleKeyDown,
    handlePaste,
    getCaretPosition,
    setCaretPosition,
    getCursorOffset,
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
    handleKeyDown,
    handlePaste,
    getCursorOffset,
    setCaretPosition,
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
      let rem = offset;
      for (let i = 0; i < lines.length; i++) {
        if (rem <= lines[i].length) {
          setCaretPosition({ line: i, offset: rem });
          return;
        }
        rem -= lines[i].length + 1;
      }
      setCaretPosition({
        line: lines.length - 1,
        offset: lines[lines.length - 1].length,
      });
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
          className="pointer-events-none absolute inset-0 select-none px-3 py-3 text-neutral-400"
          aria-hidden="true"
        >
          {placeholder}
        </div>
      )}

      <div
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
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
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
        {...rest}
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
