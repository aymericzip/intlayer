'use client';

/**
 * This component is a fork of https://github.com/guilhermerodz/input-otp
 */

import { cva } from 'class-variance-authority';
import { MinusIcon } from 'lucide-react';
import {
  type ChangeEvent,
  type ClipboardEvent,
  type ComponentProps,
  type CSSProperties,
  createContext,
  type FC,
  type InputHTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
  type RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { cn } from '../../utils/cn';
import { Button, type ButtonProps } from '../Button';

// ---------------- Utilities ----------------

const syncTimeouts = (cb: (...args: any[]) => unknown): number[] => {
  const t1 = setTimeout(cb, 0); // For faster machines
  const t2 = setTimeout(cb, 1_0);
  const t3 = setTimeout(cb, 5_0);
  return [t1, t2, t3];
};

const safeInsertRule = (sheet: CSSStyleSheet, rule: string) => {
  try {
    sheet.insertRule(rule);
  } catch {
    console.error('input-otp could not insert CSS rule:', rule);
  }
};

// Decided to go with <noscript>
// instead of `scripting` CSS media query
// because it's a fallback for initial page load
// and the <script> tag won't be loaded
// unless the user has JS disabled.
const NOSCRIPT_CSS_FALLBACK = `
[data-input-otp] {
  --nojs-bg: white !important;
  --nojs-fg: black !important;

  background-color: var(--nojs-bg) !important;
  color: var(--nojs-fg) !important;
  caret-color: var(--nojs-fg) !important;
  letter-spacing: .25em !important;
  text-align: center !important;
  border: 1px solid var(--nojs-fg) !important;
  border-radius: 4px !important;
  width: 100% !important;
}
@media (prefers-color-scheme: dark) {
  [data-input-otp] {
    --nojs-bg: black !important;
    --nojs-fg: white !important;
  }
}`;

// ---------------- Constants ----------------

const PWM_BADGE_MARGIN_RIGHT = 18;
const PWM_BADGE_SPACE_WIDTH_PX = 40;
const PWM_BADGE_SPACE_WIDTH = `${PWM_BADGE_SPACE_WIDTH_PX}px` as const;

const PASSWORD_MANAGERS_SELECTORS = [
  '[data-lastpass-icon-root]', // LastPass
  'com-1password-button', // 1Password
  '[data-dashlanecreated]', // Dashlane
  '[style$="2147483647 !important;"]', // Bitwarden
].join(',');

// ---------------- Types ----------------

export type SlotProps = {
  isActive: boolean;
  char: string | null;
  placeholderChar: string | null;
  hasFakeCaret: boolean;
};

export type RenderProps = {
  slots: SlotProps[];
  isFocused: boolean;
  isHovering: boolean;
  setSelection: (index: number) => void;
};

type OverrideProps<T, R> = Omit<T, keyof R> & R;

type OTPInputBaseProps = OverrideProps<
  InputHTMLAttributes<HTMLInputElement>,
  {
    value?: string;
    onChange?: (newValue: string) => unknown;

    maxLength: number;

    onComplete?: (...args: any[]) => unknown;
    onActiveSlotChange?: (activeSlotIndex: number | null) => unknown;
    pushPasswordManagerStrategy?: 'increase-width' | 'none';
    pasteTransformer?: (pasted: string) => string;

    containerClassName?: string;

    noScriptCSSFallback?: string | null;
  }
>;

type InputOTPRenderFn = (props: RenderProps) => ReactNode;

export type OTPInputProps = OTPInputBaseProps &
  (
    | {
        render: InputOTPRenderFn;
        children?: never;
      }
    | {
        render?: never;
        children: ReactNode;
      }
  );

// ---------------- Hooks ----------------

export const usePasswordManagerBadge = ({
  containerRef,
  inputRef,
  pushPasswordManagerStrategy,
  isFocused,
}: {
  containerRef: RefObject<HTMLDivElement | null>;
  inputRef: RefObject<HTMLInputElement | null>;
  pushPasswordManagerStrategy: OTPInputProps['pushPasswordManagerStrategy'];
  isFocused: boolean;
}) => {
  /** Password managers have a badge
   *  and I'll use this state to push them
   *  outside the input */
  const [hasPWMBadge, setHasPWMBadge] = useState(false);
  const [hasPWMBadgeSpace, setHasPWMBadgeSpace] = useState(false);
  const [done, setDone] = useState(false);

  const willPushPWMBadge =
    pushPasswordManagerStrategy === 'none'
      ? false
      : (pushPasswordManagerStrategy === 'increase-width' ||
          // TODO: remove 'experimental-no-flickering' support in 2.0.0
          pushPasswordManagerStrategy === 'experimental-no-flickering') &&
        hasPWMBadge &&
        hasPWMBadgeSpace;

  const trackPWMBadge = () => {
    const container = containerRef.current;
    const input = inputRef.current;
    if (
      !container ||
      !input ||
      done ||
      pushPasswordManagerStrategy === 'none'
    ) {
      return;
    }

    const elementToCompare = container;

    // Get the top right-center point of the container.
    // That is usually where most password managers place their badge.
    const rightCornerX =
      elementToCompare.getBoundingClientRect().left +
      elementToCompare.offsetWidth;
    const centereredY =
      elementToCompare.getBoundingClientRect().top +
      elementToCompare.offsetHeight / 2;
    const x = rightCornerX - PWM_BADGE_MARGIN_RIGHT;
    const y = centereredY;

    // Do an extra search to check for famous password managers
    const pmws = document.querySelectorAll(PASSWORD_MANAGERS_SELECTORS);

    // If no password manager is automatically detect,
    // we'll try to dispatch document.elementFromPoint
    // to identify badges
    if (pmws.length === 0) {
      const maybeBadgeEl = document.elementFromPoint(x, y);

      // If the found element is the input itself,
      // then we assume it's not a password manager badge.
      // We are not sure. Most times that means there isn't a badge.
      if (maybeBadgeEl === container) {
        return;
      }
    }

    setHasPWMBadge(true);
    setDone(true);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container || pushPasswordManagerStrategy === 'none') {
      return;
    }

    // Check if the PWM area is 100% visible
    const checkHasSpace = () => {
      const viewportWidth = window.innerWidth;
      const distanceToRightEdge =
        viewportWidth - container.getBoundingClientRect().right;
      setHasPWMBadgeSpace(distanceToRightEdge >= PWM_BADGE_SPACE_WIDTH_PX);
    };

    checkHasSpace();
    const interval = setInterval(checkHasSpace, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [containerRef, pushPasswordManagerStrategy]);

  useEffect(() => {
    const _isFocused = isFocused || document.activeElement === inputRef.current;

    if (pushPasswordManagerStrategy === 'none' || !_isFocused) {
      return;
    }
    const t1 = setTimeout(trackPWMBadge, 0);
    const t2 = setTimeout(trackPWMBadge, 2000);
    const t3 = setTimeout(trackPWMBadge, 5000);
    const t4 = setTimeout(() => {
      setDone(true);
    }, 6000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [inputRef, isFocused, pushPasswordManagerStrategy]);

  return { hasPWMBadge, willPushPWMBadge, PWM_BADGE_SPACE_WIDTH };
};

export const usePrevious = <T,>(value: T): T | undefined => {
  const ref = useRef<T | undefined>(undefined);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

// ---------------- Context ----------------

export const OTPInputContext = createContext<RenderProps>({} as RenderProps);

// ---------------- Core Component ----------------

export const OTPInput: FC<OTPInputProps> = ({
  value: uncheckedValue,
  onChange: uncheckedOnChange,
  maxLength,
  pattern,
  placeholder,
  inputMode = 'numeric',
  onComplete,
  onActiveSlotChange,
  pushPasswordManagerStrategy = 'increase-width',
  pasteTransformer,
  containerClassName,
  noScriptCSSFallback = NOSCRIPT_CSS_FALLBACK,
  render,
  children,
  ...props
}) => {
  // Only used when `value` state is not provided
  const [internalValue, setInternalValue] = useState(
    typeof props.defaultValue === 'string' ? props.defaultValue : ''
  );

  // Definitions
  const value = uncheckedValue ?? internalValue;
  const previousValue = usePrevious(value);
  const onChange = (newValue: string) => {
    uncheckedOnChange?.(newValue);
    setInternalValue(newValue);
  };
  const regexp =
    pattern !== undefined
      ? typeof pattern === 'string'
        ? new RegExp(pattern)
        : pattern
      : null;

  /** useRef */
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const initialLoadRef = useRef({
    value,
    onChange,
    isIOS:
      typeof window !== 'undefined' &&
      window?.CSS?.supports?.('-webkit-touch-callout', 'none'),
  });
  const inputMetadataRef = useRef<{
    prev: [number | null, number | null, 'none' | 'forward' | 'backward'];
  }>({
    prev: [
      inputRef.current?.selectionStart ?? null,
      inputRef.current?.selectionEnd ?? null,
      inputRef.current?.selectionDirection ?? 'none',
    ],
  });
  useEffect(() => {
    const input = inputRef.current;
    const container = containerRef.current;

    if (!input || !container) {
      return;
    }

    // Sync input value
    if (initialLoadRef.current.value !== input.value) {
      initialLoadRef.current.onChange(input.value);
    }

    // Previous selection
    inputMetadataRef.current.prev = [
      input.selectionStart,
      input.selectionEnd,
      input.selectionDirection ?? 'none',
    ];
    const onDocumentSelectionChange = () => {
      if (document.activeElement !== input) {
        setMirrorSelectionStart(null);
        setMirrorSelectionEnd(null);
        setActualCaretPosition(null);
        return;
      }

      const selectionStart = input.selectionStart;
      const selectionEnd = input.selectionEnd;
      const selectionDirection = input.selectionDirection;
      const maxLength = input.maxLength;
      const value = input.value;
      const previousSelection = inputMetadataRef.current.prev;

      let calculatedStart = -1;
      let calculatedEnd = -1;
      let calculatedDirection: 'forward' | 'backward' | 'none' =
        selectionDirection ?? 'none';

      if (
        value.length !== 0 &&
        selectionStart !== null &&
        selectionEnd !== null
      ) {
        const isSingleCaret = selectionStart === selectionEnd;
        const isInsertMode =
          selectionStart === value.length && value.length < maxLength;

        if (isSingleCaret && !isInsertMode) {
          const caretPosition = selectionStart;
          if (caretPosition === 0) {
            calculatedStart = 0;
            calculatedEnd = 1;
            calculatedDirection = 'forward';
          } else if (caretPosition === maxLength) {
            calculatedStart = caretPosition - 1;
            calculatedEnd = caretPosition;
            calculatedDirection = 'backward';
          } else if (maxLength > 1 && value.length > 1) {
            let offset = 0;
            if (
              previousSelection[0] !== null &&
              previousSelection[1] !== null
            ) {
              calculatedDirection =
                caretPosition < previousSelection[1] ? 'backward' : 'forward';
              const wasPreviouslyInserting =
                previousSelection[0] === previousSelection[1] &&
                previousSelection[0] < maxLength;
              if (
                calculatedDirection === 'backward' &&
                !wasPreviouslyInserting
              ) {
                offset = -1;
              }
            }

            calculatedStart = offset + caretPosition;
            calculatedEnd = offset + caretPosition + 1;
          }
        }

        if (
          calculatedStart !== -1 &&
          calculatedEnd !== -1 &&
          calculatedStart !== calculatedEnd
        ) {
          inputRef.current?.setSelectionRange(
            calculatedStart,
            calculatedEnd,
            calculatedDirection
          );
        }
      }

      const finalSelectionStart =
        calculatedStart !== -1 ? calculatedStart : selectionStart;
      const finalSelectionEnd =
        calculatedEnd !== -1 ? calculatedEnd : selectionEnd;
      const finalDirection = calculatedDirection;

      // Track actual caret position (before expansion) for active slot detection
      if (selectionStart !== null && selectionEnd !== null) {
        const isSingleCaret = selectionStart === selectionEnd;
        if (isSingleCaret) {
          setActualCaretPosition(selectionStart);
        } else {
          // When selection is expanded, use the start position as the caret
          setActualCaretPosition(finalSelectionStart);
        }
      } else {
        setActualCaretPosition(null);
      }

      setMirrorSelectionStart(finalSelectionStart);
      setMirrorSelectionEnd(finalSelectionEnd);
      inputMetadataRef.current.prev = [
        finalSelectionStart,
        finalSelectionEnd,
        finalDirection,
      ];
    };
    document.addEventListener('selectionchange', onDocumentSelectionChange, {
      capture: true,
    });

    // Set initial mirror state
    onDocumentSelectionChange();
    if (document.activeElement === input) {
      setIsFocused(true);
    }

    // Apply needed styles
    if (!document.getElementById('input-otp-style')) {
      const styleEl = document.createElement('style');
      styleEl.id = 'input-otp-style';
      document.head.appendChild(styleEl);

      if (styleEl.sheet) {
        const autofillStyles =
          'background: transparent !important; color: transparent !important; border-color: transparent !important; opacity: 0 !important; box-shadow: none !important; -webkit-box-shadow: none !important; -webkit-text-fill-color: transparent !important;';

        safeInsertRule(
          styleEl.sheet,
          '[data-input-otp]::selection { background: transparent !important; color: transparent !important; }'
        );
        safeInsertRule(
          styleEl.sheet,
          `[data-input-otp]:autofill { ${autofillStyles} }`
        );
        safeInsertRule(
          styleEl.sheet,
          `[data-input-otp]:-webkit-autofill { ${autofillStyles} }`
        );
        // iOS
        safeInsertRule(
          styleEl.sheet,
          `@supports (-webkit-touch-callout: none) { [data-input-otp] { letter-spacing: -.6em !important; font-weight: 100 !important; font-stretch: ultra-condensed; font-optical-sizing: none !important; left: -1px !important; right: 1px !important; } }`
        );
        // PWM badges
        safeInsertRule(
          styleEl.sheet,
          `[data-input-otp] + * { pointer-events: all !important; }`
        );
      }
    }
    // Track root height
    const updateRootHeight = () => {
      if (container) {
        container.style.setProperty('--root-height', `${input.clientHeight}px`);
      }
    };
    updateRootHeight();
    const resizeObserver = new ResizeObserver(updateRootHeight);
    resizeObserver.observe(input);

    return () => {
      document.removeEventListener(
        'selectionchange',
        onDocumentSelectionChange,
        { capture: true }
      );
      resizeObserver.disconnect();
    };
  }, []);

  /** Mirrors for UI rendering purpose only */
  const [isHoveringInput, setIsHoveringInput] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [mirrorSelectionStart, setMirrorSelectionStart] = useState<
    number | null
  >(null);
  const [mirrorSelectionEnd, setMirrorSelectionEnd] = useState<number | null>(
    null
  );
  const [actualCaretPosition, setActualCaretPosition] = useState<number | null>(
    null
  );

  /** Effects */
  useEffect(() => {
    syncTimeouts(() => {
      // Forcefully remove :autofill state
      inputRef.current?.dispatchEvent(new Event('input'));

      // Update the selection state
      const s = inputRef.current?.selectionStart ?? null;
      const e = inputRef.current?.selectionEnd ?? null;
      const dir = inputRef.current?.selectionDirection ?? 'none';
      if (s !== null && e !== null) {
        setMirrorSelectionStart(s);
        setMirrorSelectionEnd(e);
        // Track actual caret position (use start position as caret)
        setActualCaretPosition(s);
        inputMetadataRef.current.prev = [s, e, dir];
      }
    });
  }, [value, isFocused]);

  useEffect(() => {
    if (previousValue === undefined) {
      return;
    }

    if (
      value !== previousValue &&
      previousValue.length < maxLength &&
      value.length === maxLength
    ) {
      onComplete?.(value);
    }
  }, [maxLength, onComplete, previousValue, value]);

  // Track active slot changes
  const previousActiveSlot = useRef<number | null>(null);
  useEffect(() => {
    const activeSlotIndex =
      isFocused && actualCaretPosition !== null ? actualCaretPosition : null;

    if (activeSlotIndex !== previousActiveSlot.current) {
      previousActiveSlot.current = activeSlotIndex;
      onActiveSlotChange?.(activeSlotIndex);
    }
  }, [isFocused, actualCaretPosition, onActiveSlotChange]);

  const pwmb = usePasswordManagerBadge({
    containerRef,
    inputRef,
    pushPasswordManagerStrategy,
    isFocused,
  });

  /** Event handlers */
  const _changeListener = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value.slice(0, maxLength);
    if (newValue.length > 0 && regexp && !regexp.test(newValue)) {
      e.preventDefault();
      return;
    }
    const maybeHasDeleted =
      typeof previousValue === 'string' &&
      newValue.length < previousValue.length;
    if (maybeHasDeleted) {
      // Since cutting/deleting text doesn't trigger
      // selectionchange event, we'll have to dispatch it manually.
      // NOTE: The following line also triggers when cmd+A then pasting
      // a value with smaller length, which is not ideal for performance.
      document.dispatchEvent(new Event('selectionchange'));
    }
    onChange(newValue);
  };
  const _focusListener = () => {
    if (inputRef.current) {
      const start = Math.min(inputRef.current.value.length, maxLength - 1);
      const end = inputRef.current.value.length;
      inputRef.current?.setSelectionRange(start, end);
      setMirrorSelectionStart(start);
      setMirrorSelectionEnd(end);
    }
    setIsFocused(true);
  };
  // Fix iOS pasting
  const _pasteListener = (e: ClipboardEvent<HTMLInputElement>) => {
    const input = inputRef.current;
    if (
      !pasteTransformer &&
      (!initialLoadRef.current.isIOS || !e.clipboardData || !input)
    ) {
      return;
    }

    const _content = e.clipboardData.getData('text/plain');
    const content = pasteTransformer ? pasteTransformer(_content) : _content;
    e.preventDefault();

    const start = inputRef.current?.selectionStart;
    const end = inputRef.current?.selectionEnd;

    const isReplacing = start !== end;

    const newValueUncapped = isReplacing
      ? value.slice(0, start ?? 0) + content + value.slice(end ?? 0) // Replacing
      : value.slice(0, start ?? 0) + content + value.slice(start ?? 0); // Inserting
    const newValue = newValueUncapped.slice(0, maxLength);

    if (newValue.length > 0 && regexp && !regexp.test(newValue)) {
      return;
    }

    if (input) {
      input.value = newValue;
      onChange(newValue);

      const _start = Math.min(newValue.length, maxLength - 1);
      const _end = newValue.length;

      input.setSelectionRange(_start, _end);
      setMirrorSelectionStart(_start);
      setMirrorSelectionEnd(_end);
    }
  };

  /** Styles - dynamic styles that can't be converted to Tailwind */
  const dynamicInputStyle: CSSProperties = {
    width: pwmb.willPushPWMBadge
      ? `calc(100% + ${pwmb.PWM_BADGE_SPACE_WIDTH})`
      : '100%',
    clipPath: pwmb.willPushPWMBadge
      ? `inset(0 ${pwmb.PWM_BADGE_SPACE_WIDTH} 0 0)`
      : undefined,
    fontSize: 'var(--root-height)',
  };

  /** Rendering */
  const renderedInput = (
    <input
      autoComplete={props.autoComplete || 'one-time-code'}
      {...props}
      data-input-otp
      data-input-otp-placeholder-shown={value.length === 0 || undefined}
      data-input-otp-mss={mirrorSelectionStart}
      data-input-otp-mse={mirrorSelectionEnd}
      inputMode={inputMode}
      pattern={regexp?.source}
      aria-placeholder={placeholder}
      className="-z-10 pointer-events-auto absolute inset-0 flex h-full border-0 border-transparent bg-transparent text-center font-mono text-transparent tabular-nums leading-none tracking-[-.5em] caret-transparent opacity-100 shadow-none outline-none"
      style={dynamicInputStyle}
      maxLength={maxLength}
      value={value}
      ref={inputRef}
      onPaste={(e) => {
        _pasteListener(e);
        props.onPaste?.(e);
      }}
      onChange={_changeListener}
      onMouseOver={(e) => {
        setIsHoveringInput(true);
        props.onMouseOver?.(e);
      }}
      onMouseLeave={(e) => {
        setIsHoveringInput(false);
        props.onMouseLeave?.(e);
      }}
      onKeyDown={(e) => {
        // Track arrow key navigation to ensure active slot updates correctly
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
          // Use requestAnimationFrame to check selection after browser has processed the key
          requestAnimationFrame(() => {
            const input = inputRef.current;
            if (input && document.activeElement === input) {
              const s = input.selectionStart;
              const end = input.selectionEnd;
              if (s !== null && end !== null) {
                // Update actual caret position - use start position as caret
                setActualCaretPosition(s);
              }
            }
          });
        }
        props.onKeyDown?.(e);
      }}
      onFocus={(e) => {
        _focusListener();
        props.onFocus?.(e);
      }}
      onBlur={(e) => {
        setIsFocused(false);
        props.onBlur?.(e);
      }}
    />
  );

  const setSelection = (index: number) => {
    const input = inputRef.current;
    if (!input || props.disabled) {
      return;
    }

    // Clamp index to valid range
    const clampedIndex = Math.max(0, Math.min(index, maxLength - 1));

    // Focus the input if not already focused
    if (document.activeElement !== input) {
      input.focus();
    }

    // Set selection to the clicked slot
    // If there's a character at that position, select it; otherwise just position the caret
    const hasChar = value[clampedIndex] !== undefined;
    const start = clampedIndex;
    const end = hasChar ? clampedIndex + 1 : clampedIndex;

    input.setSelectionRange(start, end);
    setMirrorSelectionStart(start);
    setMirrorSelectionEnd(end);
    setIsFocused(true);
  };

  const contextValue: RenderProps = {
    slots: Array.from({ length: maxLength }).map((_, slotIdx) => {
      const isActive =
        isFocused &&
        mirrorSelectionStart !== null &&
        mirrorSelectionEnd !== null &&
        ((mirrorSelectionStart === mirrorSelectionEnd &&
          slotIdx === mirrorSelectionStart) ||
          (slotIdx >= mirrorSelectionStart && slotIdx < mirrorSelectionEnd));

      const char = value[slotIdx] !== undefined ? value[slotIdx] : null;
      const placeholderChar =
        value[0] !== undefined ? null : (placeholder?.[slotIdx] ?? null);

      return {
        char,
        placeholderChar,
        isActive,
        hasFakeCaret: isActive && char === null,
      };
    }),
    isFocused,
    isHovering: !props.disabled && isHoveringInput,
    setSelection,
  };

  const renderedChildren =
    render !== undefined ? (
      render(contextValue)
    ) : (
      <OTPInputContext.Provider value={contextValue}>
        {children}
      </OTPInputContext.Provider>
    );

  return (
    <>
      {noScriptCSSFallback !== null && (
        <noscript>
          <style>{noScriptCSSFallback}</style>
        </noscript>
      )}

      <div
        ref={containerRef}
        className={cn(
          'relative',
          props.disabled ? 'cursor-default' : 'cursor-text',
          containerClassName
        )}
      >
        {renderedChildren}

        <div className="absolute inset-0">{renderedInput}</div>
      </div>
    </>
  );
};

// ---------------- Root ----------------

type InputOTPProps = Omit<ComponentProps<typeof OTPInput>, 'children'>;

export const inputSlotVariants = cva('block text-center', {
  variants: {
    size: {
      sm: 'h-4 w-3 text-sm',
      md: 'h-5 w-4 text-base',
      lg: 'h-6 w-5 text-lg',
      xl: 'h-7 w-6 text-xl',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const InputOTP: FC<InputOTPProps> = ({
  className,
  render,
  ...props
}) => (
  <OTPInput
    containerClassName="relative flex items-center gap-2 has-disabled:opacity-50"
    className={cn('disabled:cursor-not-allowed', className)}
    render={render!}
    {...props}
  />
);

// ---------------- Group ----------------

export const InputOTPGroup = ({
  className,
  ...props
}: ComponentProps<'div'>) => (
  <div className={cn('z-10 flex items-center gap-3', className)} {...props} />
);

// ---------------- Slot ----------------

type InputOTPSlotProps = Omit<ButtonProps, 'variant' | 'label'> & {
  index: number;
};

export const InputOTPSlot: FC<InputOTPSlotProps> = ({
  index,
  className,
  onClick,
  onKeyDown,
  ...props
}) => {
  const inputOTPContext = useContext(OTPInputContext);
  const { char, isActive } = inputOTPContext?.slots[index] ?? {};
  const { setSelection } = inputOTPContext ?? {};

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    setSelection?.(index);
    onClick?.(e);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelection?.(index);
    }
    onKeyDown?.(e);
  };

  return (
    <Button
      aria-active={isActive}
      variant="input"
      color="custom"
      tabIndex={-1}
      className={cn('relative z-10 px-2!', isActive && 'ring-4!', className)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      label={null}
      {...props}
    >
      {/* value */}
      <span className="relative z-10 flex h-6 w-4 items-center justify-center">
        {char}
      </span>
    </Button>
  );
};

// ---------------- Separator ----------------

export const InputOTPSeparator: FC<ComponentProps<'div'>> = (props) => (
  <div
    aria-hidden
    className="z-0 table h-0.5 w-3 rounded-full bg-border text-neutral"
    {...props}
  >
    <MinusIcon />
  </div>
);

export const InputIndicator: FC<
  ComponentProps<'div'> & { ref: RefObject<HTMLDivElement | null> }
> = ({ ref, ...props }) => (
  <div
    data-indicator
    className="absolute top-0 z-0 h-8 h-full w-auto rounded-xl bg-neutral-100 ring-4 ring-neutral-100 transition-[left,width] duration-300 ease-in-out [corner-shape:squircle] supports-[corner-shape:squircle]:rounded-2xl motion-reduce:transition-none dark:bg-neutral-700 dark:ring-neutral-700"
    ref={ref}
    {...props}
  />
);
