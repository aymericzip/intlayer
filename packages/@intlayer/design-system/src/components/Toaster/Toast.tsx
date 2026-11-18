'use client';

import { useControllableState } from '@hooks/useControllableState';
import { usePresence } from '@hooks/usePresence';
import { cn } from '@utils/cn';
import { composeRefs } from '@utils/composeRefs';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import {
  type ComponentProps,
  createContext,
  type FC,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactElement,
  type ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

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
  setIsViewportActive: (isActive: boolean) => void;
};

const ToastProviderContext = createContext<ToastProviderContextValue>({
  duration: DEFAULT_TOAST_DURATION,
  swipeThreshold: DEFAULT_SWIPE_THRESHOLD,
  isPaused: false,
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
        setIsViewportActive,
      }}
    >
      {children}
    </ToastProviderContext.Provider>
  );
};

/** Fixed list the toasts render into; announces new toasts politely. */
export const ToastViewport: FC<ComponentProps<'ol'>> = ({
  className,
  onPointerEnter,
  onPointerLeave,
  onFocus,
  onBlur,
  ...props
}) => {
  const { setIsViewportActive } = useContext(ToastProviderContext);
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
      className={cn(
        'fixed top-0 z-100 flex max-h-screen w-full flex-col-reverse p-4 sm:inset-e-0 sm:top-auto sm:bottom-0 sm:flex-col md:max-w-105',
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
  'group data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full data-[state=closed]:animate-out data-[state=open]:animate-in data-[swipe=end]:animate-out pointer-events-auto relative flex w-full touch-pan-y items-center justify-between space-x-2 overflow-hidden rounded-xl p-4 pe-6 shadow-[0_0_10px_-15px_rgba(0,0,0,0.3)] backdrop-blur transition-all [corner-shape:squircle] data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-(--toast-swipe-end-x) data-[swipe=move]:translate-x-(--toast-swipe-move-x) data-[swipe=move]:transition-none supports-[corner-shape:squircle]:rounded-3xl',
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
  };

/**
 * A notification that closes itself after `duration`, on Escape, or when
 * swiped to the right. Stays mounted until its exit animation ends.
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
  ref,
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
      setSwipe('end', '--toast-swipe-end-x', gesture.deltaX);
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

  return (
    <ToastContext.Provider value={{ close }}>
      <li
        ref={composeRefs(ref, elementRef, presenceRef)}
        aria-atomic
        data-state={open ? 'open' : 'closed'}
        className={cn(toastVariants({ variant }), className)}
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
 * Action button of a toast (retry, undo, view…). Closes the toast on click
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
        'group-[.error]:hover:text-error-foreground inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors group-[.error]:border-card/40 hover:bg-text group-[.error]:hover:border-error/30 group-[.error]:hover:bg-error focus:ring-1 focus:ring-ring focus:outline-hidden group-[.error]:focus:ring-error disabled:pointer-events-none disabled:opacity-50',
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
        'absolute inset-e-1 top-1 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity group-hover:opacity-100 group-[.error]:text-red-300 hover:text-foreground/80 group-[.error]:hover:text-red-50 focus:opacity-100 focus:ring-1 focus:outline-hidden group-[.error]:focus:ring-red-400 group-[.error]:focus:ring-offset-red-600',
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

/**
 * Stops a pointer down on text from starting a swipe, so the text stays
 * selectable while the rest of the toast remains swipeable.
 */
const preventSwipeOnText = (
  event: ReactPointerEvent<HTMLDivElement>,
  onPointerDown?: (event: ReactPointerEvent<HTMLDivElement>) => void
) => {
  onPointerDown?.(event);
  event.stopPropagation();
};

/** Heading of a toast. */
export const ToastTitle: FC<ComponentProps<'div'>> = ({
  className,
  onPointerDown,
  ...props
}) => (
  <div
    className={cn(
      'cursor-text text-sm font-semibold wrap-break-word select-text [&+div]:text-xs',
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
      'max-h-60 cursor-text overflow-y-auto text-sm wrap-break-word opacity-90 select-text',
      className
    )}
    onPointerDown={(event) => preventSwipeOnText(event, onPointerDown)}
    {...props}
  />
);

export type ToastProps = ComponentProps<typeof Toast>;

export type ToastActionElement = ReactElement<typeof ToastAction>;
