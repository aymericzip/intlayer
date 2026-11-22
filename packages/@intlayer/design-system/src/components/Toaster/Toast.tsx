'use client';

import { buttonVariants } from '@components/Button';
import { useControllableState } from '@hooks/useControllableState';
import { usePresence } from '@hooks/usePresence';
import { cn } from '@utils/cn';
import { composeRefs } from '@utils/composeRefs';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import {
  type ComponentProps,
  type CSSProperties,
  createContext,
  type FC,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactElement,
  type ReactNode,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  TOAST_STACK_PEEK,
  TOAST_STACK_SCALE_STEP,
  type ToastStackPosition,
  VISIBLE_TOAST_COUNT,
} from './toastStack';

/** Default time, in ms, a toast stays open. */
const DEFAULT_TOAST_DURATION = 5000;

/** Horizontal distance, in px, a swipe must travel to dismiss a toast. */
const DEFAULT_SWIPE_THRESHOLD = 50;

/** Distance, in px, before a pointer move counts as a swipe. */
const SWIPE_START_DISTANCE = 10;

type ToastProviderContextValue = {
  duration: number;
  swipeThreshold: number;
  /** Timers are paused while the viewport is hovered/focused or the window blurred. */
  isPaused: boolean;
  /** The stack spreads out while the viewport is hovered or focused. */
  isExpanded: boolean;
  setIsViewportActive: (isActive: boolean) => void;
};

const ToastProviderContext = createContext<ToastProviderContextValue>({
  duration: DEFAULT_TOAST_DURATION,
  swipeThreshold: DEFAULT_SWIPE_THRESHOLD,
  isPaused: false,
  isExpanded: false,
  setIsViewportActive: () => {},
});

const ToastContext = createContext<{ close: () => void }>({ close: () => {} });

export type ToastProviderProps = {
  children?: ReactNode;
  /** Default auto-dismiss delay in ms. `Infinity` disables it. */
  duration?: number;
  /** Swipe distance in px needed to dismiss. */
  swipeThreshold?: number;
};

/**
 * Shares timing settings with toasts, and pauses their timers while the
 * viewport is in use or the window is in the background.
 */
export const ToastProvider: FC<ToastProviderProps> = ({
  children,
  duration = DEFAULT_TOAST_DURATION,
  swipeThreshold = DEFAULT_SWIPE_THRESHOLD,
}) => {
  const [isViewportActive, setIsViewportActive] = useState(false);
  const [isWindowBlurred, setIsWindowBlurred] = useState(false);

  useEffect(() => {
    const handleBlur = () => setIsWindowBlurred(true);
    const handleFocus = () => setIsWindowBlurred(false);

    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  return (
    <ToastProviderContext.Provider
      value={{
        duration,
        swipeThreshold,
        isPaused: isViewportActive || isWindowBlurred,
        isExpanded: isViewportActive,
        setIsViewportActive,
      }}
    >
      {children}
    </ToastProviderContext.Provider>
  );
};

/**
 * Fixed list the toasts render into; announces new toasts politely.
 * Anchored to the top on mobile and the bottom-end corner from `sm`;
 * `--toast-direction` tells stacked toasts which way to grow.
 */
export const ToastViewport: FC<ComponentProps<'ol'>> = ({
  className,
  onPointerEnter,
  onPointerLeave,
  onFocus,
  onBlur,
  ...props
}) => {
  const { isExpanded, setIsViewportActive } = useContext(ToastProviderContext);
  const isHoveredRef = useRef(false);
  const isFocusedRef = useRef(false);

  const updateActivity = () =>
    setIsViewportActive(isHoveredRef.current || isFocusedRef.current);

  return (
    <ol
      aria-label="Notifications"
      aria-live="polite"
      aria-relevant="additions"
      tabIndex={-1}
      data-expanded={isExpanded || undefined}
      className={cn(
        'fixed inset-x-4 top-4 z-100 [--toast-direction:1] sm:top-auto sm:bottom-4 sm:[--toast-direction:-1] md:inset-s-auto md:w-97',
        className
      )}
      onPointerEnter={(event) => {
        onPointerEnter?.(event);
        isHoveredRef.current = true;
        updateActivity();
      }}
      onPointerLeave={(event) => {
        onPointerLeave?.(event);
        isHoveredRef.current = false;
        updateActivity();
      }}
      onFocus={(event) => {
        onFocus?.(event);
        isFocusedRef.current = true;
        updateActivity();
      }}
      onBlur={(event) => {
        onBlur?.(event);
        // Focus moving between two toasts keeps the viewport active.
        isFocusedRef.current = event.currentTarget.contains(
          event.relatedTarget as Node | null
        );
        updateActivity();
      }}
      {...props}
    />
  );
};

/**
 * Toast variant styles.
 *
 * @example
 * <Toast variant="error">Error message</Toast>
 */
export const toastVariants = cva(
  'group pointer-events-auto relative flex w-full cursor-grab touch-pan-y items-center justify-between space-x-2 overflow-hidden rounded-xl p-4 pe-6 shadow-[0_0_10px_-15px_rgba(0,0,0,0.3)] backdrop-blur transition-[transform,translate,scale,opacity,height] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] [corner-shape:squircle] *:transition-opacity hover:scale-102 data-collapsed:*:opacity-0 data-hidden:pointer-events-none data-hidden:opacity-0 data-[state=closed]:translate-x-full data-[state=closed]:opacity-0 data-[swipe=cancel]:translate-x-0 data-[swipe=move]:translate-x-(--toast-swipe-move-x) data-[swipe=move]:cursor-grabbing data-[swipe=move]:transition-none data-[swipe=move]:select-none supports-[corner-shape:squircle]:rounded-3xl motion-reduce:transition-none starting:translate-y-[calc(var(--toast-direction,1)*-100%)] starting:opacity-0',
  {
    variants: {
      variant: {
        error: 'bg-error/40 text-foreground',
        success: 'bg-success/30 text-foreground',
        default: 'bg-card/80 text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

type SwipeGesture = {
  pointerId: number;
  startX: number;
  startY: number;
  deltaX: number;
  isSwiping: boolean;
};

export type ToastRootProps = Omit<ComponentProps<'li'>, 'onOpenChange'> &
  VariantProps<typeof toastVariants> & {
    /** Controlled open state. */
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    /** Auto-dismiss delay in ms, overriding the provider. `Infinity` disables it. */
    duration?: number;
    /** Position in a stack of toasts; without it the toast sits in the flow. */
    stack?: ToastStackPosition;
    /** Reports the toast's natural height, needed to lay out the stack. */
    onHeightChange?: (height: number) => void;
  };

/**
 * A notification that closes itself after `duration`, on Escape, or when
 * swiped to the right. Slides in from the viewport edge and stays mounted
 * until its exit transition ends. With `stack`, older toasts collapse behind
 * the newest one and spread out while the viewport is hovered.
 *
 * @example
 * <Toast variant="error" onOpenChange={setOpen}>
 *   <ToastTitle>Upload failed</ToastTitle>
 *   <ToastAction onClick={retry}>Retry</ToastAction>
 *   <ToastClose />
 * </Toast>
 */
export const Toast: FC<ToastRootProps> = ({
  className,
  variant,
  open: openProp,
  defaultOpen = true,
  onOpenChange,
  duration: durationProp,
  stack,
  onHeightChange,
  ref,
  style,
  onKeyDown,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
  onClickCapture,
  ...props
}) => {
  const provider = useContext(ToastProviderContext);
  const duration = durationProp ?? provider.duration;
  const [open, setOpen] = useControllableState({
    value: openProp,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });
  const { isMounted, ref: presenceRef } = usePresence<HTMLLIElement>(open);

  const elementRef = useRef<HTMLLIElement>(null);
  const remainingTimeRef = useRef(duration);
  const swipeGestureRef = useRef<SwipeGesture | null>(null);
  const hasSwipedRef = useRef(false);

  const close = () => setOpen(false);

  const isCollapsedBehind = !!stack && !provider.isExpanded && stack.index > 0;

  // Keep the latest callback without re-subscribing the observer.
  const onHeightChangeRef = useRef(onHeightChange);
  useLayoutEffect(() => {
    onHeightChangeRef.current = onHeightChange;
  });

  const hasHeightListener = !!onHeightChange;

  // Collapsed toasts borrow the front toast's height, so only measure the
  // natural height while it is not overridden.
  useLayoutEffect(() => {
    const element = elementRef.current;
    if (!element || !hasHeightListener || isCollapsedBehind) return;

    const reportHeight = () =>
      onHeightChangeRef.current?.(element.offsetHeight);
    reportHeight();

    if (typeof ResizeObserver === 'undefined') return;

    const resizeObserver = new ResizeObserver(reportHeight);
    resizeObserver.observe(element);

    return () => resizeObserver.disconnect();
  }, [hasHeightListener, isCollapsedBehind, isMounted]);

  // Auto-dismiss, resuming with the time left after each pause.
  useEffect(() => {
    if (!open || provider.isPaused || !Number.isFinite(duration)) return;

    const startedAt = Date.now();
    const timeout = setTimeout(close, remainingTimeRef.current);

    return () => {
      clearTimeout(timeout);
      remainingTimeRef.current -= Date.now() - startedAt;
    };
  }, [open, provider.isPaused, duration]);

  if (!isMounted) return null;

  const setSwipe = (
    state: 'move' | 'cancel' | 'end',
    variableName?: string,
    offset?: number
  ) => {
    const element = elementRef.current;
    if (!element) return;

    element.setAttribute('data-swipe', state);
    if (variableName) element.style.setProperty(variableName, `${offset}px`);
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLLIElement>) => {
    onPointerDown?.(event);
    if (event.button !== 0) return;

    swipeGestureRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      deltaX: 0,
      isSwiping: false,
    };
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLLIElement>) => {
    onPointerMove?.(event);
    const gesture = swipeGestureRef.current;
    if (!gesture || gesture.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - gesture.startX;
    const deltaY = event.clientY - gesture.startY;

    if (!gesture.isSwiping) {
      const isHorizontal = Math.abs(deltaX) > Math.abs(deltaY);
      if (Math.abs(deltaX) < SWIPE_START_DISTANCE || !isHorizontal) return;

      gesture.isSwiping = true;
      // A mouse drag that began beside the text may have started a selection.
      window.getSelection()?.removeAllRanges();
      // jsdom and older WebViews lack pointer capture.
      event.currentTarget.setPointerCapture?.(event.pointerId);
    }

    // Only a rightward swipe dismisses; leftward drags stay pinned.
    gesture.deltaX = Math.max(0, deltaX);
    setSwipe('move', '--toast-swipe-move-x', gesture.deltaX);
  };

  const handlePointerEnd = (event: ReactPointerEvent<HTMLLIElement>) => {
    const gesture = swipeGestureRef.current;
    swipeGestureRef.current = null;
    if (!gesture?.isSwiping) return;

    hasSwipedRef.current = true;

    if (gesture.deltaX >= provider.swipeThreshold) {
      // The closed state carries the toast off from where the swipe ended.
      setSwipe('end');
      close();
    } else {
      setSwipe('cancel');
    }

    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLLIElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || event.key !== 'Escape') return;

    event.preventDefault();
    close();
  };

  const getStackStyle = (position: ToastStackPosition): CSSProperties => {
    const offset = provider.isExpanded
      ? position.expandedOffset
      : position.index * TOAST_STACK_PEEK;
    const scale = provider.isExpanded
      ? 1
      : 1 - position.index * TOAST_STACK_SCALE_STEP;

    return {
      transform: `translateY(calc(var(--toast-direction, 1) * ${offset}px)) scale(${scale})`,
      height: isCollapsedBehind ? position.frontHeight : undefined,
      // A closing toast stays above the one taking its slot.
      zIndex:
        Math.max(0, 2 * (VISIBLE_TOAST_COUNT - position.index)) +
        (open ? 0 : 1),
    };
  };

  return (
    <ToastContext.Provider value={{ close }}>
      <li
        ref={composeRefs(ref, elementRef, presenceRef)}
        aria-atomic
        data-state={open ? 'open' : 'closed'}
        data-collapsed={isCollapsedBehind || undefined}
        data-hidden={(stack && stack.index >= VISIBLE_TOAST_COUNT) || undefined}
        className={cn(
          toastVariants({ variant }),
          // Pinned to the viewport edge; the far edge stays put when scaled.
          stack &&
            'absolute inset-x-0 top-0 origin-bottom sm:top-auto sm:bottom-0 sm:origin-top',
          className
        )}
        style={stack ? { ...getStackStyle(stack), ...style } : style}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={(event) => {
          onPointerUp?.(event);
          handlePointerEnd(event);
        }}
        onPointerCancel={(event) => {
          onPointerCancel?.(event);
          handlePointerEnd(event);
        }}
        onClickCapture={(event) => {
          onClickCapture?.(event);
          // The click that ends a swipe must not trigger the toast's buttons.
          if (!hasSwipedRef.current) return;

          hasSwipedRef.current = false;
          event.preventDefault();
          event.stopPropagation();
        }}
        {...props}
      />
    </ToastContext.Provider>
  );
};

/**
 * Action button of a toast (retry, undo, view…), styled as an outline
 * `Button`. Closes the toast on click
 * unless the handler calls `event.preventDefault()`.
 *
 * @example
 * <ToastAction onClick={retry}>Retry</ToastAction>
 */
export const ToastAction: FC<ComponentProps<'button'>> = ({
  className,
  onClick,
  ...props
}) => {
  const { close } = useContext(ToastContext);

  return (
    <button
      type="button"
      className={cn(
        buttonVariants({ variant: 'outline', size: 'sm' }),
        'shrink-0',
        className
      )}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) close();
      }}
      {...props}
    />
  );
};

/** Close button revealed on toast hover or focus. */
export const ToastClose: FC<ComponentProps<'button'>> = ({
  className,
  onClick,
  ...props
}) => {
  const { close } = useContext(ToastContext);

  return (
    <button
      type="button"
      aria-label="Close"
      className={cn(
        'absolute inset-e-1 top-1 cursor-pointer rounded-md p-1 text-foreground/50 opacity-0 transition-opacity group-hover:opacity-100 group-[.error]:text-red-300 hover:text-foreground/80 group-[.error]:hover:text-red-50 focus:opacity-100 focus:ring-1 focus:outline-hidden group-[.error]:focus:ring-red-400 group-[.error]:focus:ring-offset-red-600',
        className
      )}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) close();
      }}
      {...props}
    >
      <X className="size-5" />
    </button>
  );
};

/** Whether a point lies on a rendered glyph of the element's text. */
const isPointOnText = (element: HTMLElement, x: number, y: number): boolean => {
  const textWalker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  const range = document.createRange();

  for (let node = textWalker.nextNode(); node; node = textWalker.nextNode()) {
    range.selectNodeContents(node);

    // jsdom has no layout, so ranges there lack client rects.
    for (const rect of range.getClientRects?.() ?? []) {
      if (
        x >= rect.left &&
        x <= rect.right &&
        y >= rect.top &&
        y <= rect.bottom
      )
        return true;
    }
  }

  return false;
};

/**
 * Stops a pointer down on the text itself from starting a swipe, so the text
 * stays selectable. Blank space around it still drags the toast, with a
 * mouse as with touch.
 */
const preventSwipeOnText = (
  event: ReactPointerEvent<HTMLDivElement>,
  onPointerDown?: (event: ReactPointerEvent<HTMLDivElement>) => void
) => {
  onPointerDown?.(event);

  if (isPointOnText(event.currentTarget, event.clientX, event.clientY)) {
    event.stopPropagation();
  }
};

/** Heading of a toast. */
export const ToastTitle: FC<ComponentProps<'div'>> = ({
  className,
  onPointerDown,
  ...props
}) => (
  <div
    className={cn(
      'cursor-auto text-sm font-semibold wrap-break-word select-text [&+div]:text-xs',
      className
    )}
    onPointerDown={(event) => preventSwipeOnText(event, onPointerDown)}
    {...props}
  />
);

/** Supporting text of a toast; scrolls when long. */
export const ToastDescription: FC<ComponentProps<'div'>> = ({
  className,
  onPointerDown,
  ...props
}) => (
  <div
    className={cn(
      'max-h-60 cursor-auto overflow-y-auto text-sm wrap-break-word opacity-90 select-text',
      className
    )}
    onPointerDown={(event) => preventSwipeOnText(event, onPointerDown)}
    {...props}
  />
);

export type ToastProps = ComponentProps<typeof Toast>;

export type ToastActionElement = ReactElement<typeof ToastAction>;
