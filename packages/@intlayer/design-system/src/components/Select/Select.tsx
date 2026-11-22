'use client';

import { inputVariants } from '@components/Input/Input';
import { useControllableState } from '@hooks/useControllableState';
import { usePresence } from '@hooks/usePresence';
import { cn } from '@utils/cn';
import { composeRefs } from '@utils/composeRefs';
import { getTypeaheadMatch } from '@utils/getTypeaheadMatch';
import { scheduleFrameTask } from '@utils/scheduleFrameTask';
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronsUpDown,
  ChevronUpIcon,
} from 'lucide-react';
import {
  type ComponentProps,
  type CSSProperties,
  createContext,
  type FC,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
  type RefObject,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';
import { createPortal } from 'react-dom';

/** Max height of the open list, matching Tailwind `max-h-96`. */
const MAX_CONTENT_HEIGHT = 384;

/** Margin kept between the list and the viewport edges. */
const VIEWPORT_PADDING = 8;

/** Typed characters are grouped into one search for this long. */
const TYPEAHEAD_RESET_DELAY = 1000;

/** Scroll distance per tick while hovering a scroll button. */
const SCROLL_BUTTON_STEP = 16;

const SCROLL_BUTTON_INTERVAL = 50;

const OPTION_SELECTOR = '[role="option"]:not([data-disabled])';

type Direction = 'ltr' | 'rtl';

type SelectItemRecord = {
  label: ReactNode;
  textValue: string;
  disabled: boolean;
};

/**
 * Registry of item labels, read by `Select.Value` and the closed-trigger
 * typeahead. An external store, so registering items re-renders only readers.
 */
const createSelectItemStore = () => {
  const items = new Map<string, SelectItemRecord>();
  const listeners = new Set<() => void>();

  const notify = () => {
    for (const listener of listeners) listener();
  };

  return {
    get: (value: string) => items.get(value),
    entries: () => [...items.entries()],
    set: (value: string, record: SelectItemRecord) => {
      items.set(value, record);
      notify();
    },
    delete: (value: string, record: SelectItemRecord) => {
      if (items.get(value) !== record) return;
      items.delete(value);
      notify();
    },
    subscribe: (listener: () => void) => {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
};

type SelectItemStore = ReturnType<typeof createSelectItemStore>;

type SelectContextValue = {
  value: string | undefined;
  setValue: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  disabled: boolean;
  required: boolean;
  dir?: Direction;
  contentId: string;
  triggerRef: RefObject<HTMLButtonElement | null>;
  itemStore: SelectItemStore;
};

const SelectContext = createContext<SelectContextValue | null>(null);

const useSelectContext = (): SelectContextValue => {
  const context = useContext(SelectContext);

  if (!context)
    throw new Error('Select parts must be rendered inside <Select>');

  return context;
};

/** Accumulates typed characters into a search that resets after a pause. */
const useTypeaheadSearch = () => {
  const searchRef = useRef('');
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(resetTimeoutRef.current), []);

  return {
    hasSearch: () => searchRef.current.length > 0,
    append: (character: string): string => {
      searchRef.current += character;
      clearTimeout(resetTimeoutRef.current);
      resetTimeoutRef.current = setTimeout(() => {
        searchRef.current = '';
      }, TYPEAHEAD_RESET_DELAY);

      return searchRef.current;
    },
  };
};

const isTypeaheadKey = (event: ReactKeyboardEvent): boolean =>
  event.key.length === 1 && !event.ctrlKey && !event.altKey && !event.metaKey;

const isEmptyValue = (value: string | undefined): boolean =>
  value === undefined || value === '';

export type SelectRootProps<TValue extends string = string> = {
  children?: ReactNode;
  /** Controlled selected value. */
  value?: TValue;
  defaultValue?: TValue;
  onValueChange?: (value: TValue) => void;
  /** Controlled open state. */
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  /** Submits the value through a hidden input when set. */
  name?: string;
  /** Marks the trigger as required for assistive technologies. */
  required?: boolean;
  dir?: Direction;
};

const SelectRoot = <TValue extends string = string>({
  children,
  value: valueProp,
  defaultValue,
  onValueChange,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  disabled = false,
  name,
  required = false,
  dir,
}: SelectRootProps<TValue>) => {
  const [value, setValue] = useControllableState<string | undefined>({
    value: valueProp,
    defaultValue,
    onChange: (nextValue) => {
      // Item values are the `TValue` options the consumer rendered.
      if (nextValue !== undefined) onValueChange?.(nextValue as TValue);
    },
  });
  const [open, setOpen] = useControllableState({
    value: openProp,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [itemStore] = useState(createSelectItemStore);
  const contentId = useId();

  return (
    <SelectContext.Provider
      value={{
        value,
        setValue,
        open,
        setOpen: (nextOpen) => setOpen(nextOpen && !disabled),
        disabled,
        required,
        dir,
        contentId,
        triggerRef,
        itemStore,
      }}
    >
      {children}
      {name && <input type="hidden" name={name} value={value ?? ''} />}
    </SelectContext.Provider>
  );
};

/** Groups related items. */
const SelectGroup: FC<ComponentProps<'div'>> = (props) => (
  <div role="group" {...props} />
);

export type SelectValueProps = Omit<ComponentProps<'span'>, 'children'> & {
  /** Shown while no value is selected. */
  placeholder?: ReactNode;
  /** Overrides the selected item's label. */
  children?: ReactNode;
};

/** Displays the selected item's label, or the placeholder. */
const SelectValue: FC<SelectValueProps> = ({
  placeholder,
  children,
  style,
  ...props
}) => {
  const { value, itemStore } = useSelectContext();
  const label = useSyncExternalStore(
    itemStore.subscribe,
    () =>
      isEmptyValue(value) ? undefined : itemStore.get(value as string)?.label,
    () => undefined
  );

  return (
    <span style={{ pointerEvents: 'none', ...style }} {...props}>
      {children ?? (isEmptyValue(value) ? placeholder : label)}
    </span>
  );
};

export type SelectTriggerProps = ComponentProps<'button'> & {
  /** Applies success/error border colors from native validity. */
  validationStyleEnabled?: boolean;
};

/**
 * Button showing the current value; opens the list on click, Enter, Space or
 * arrow keys, and selects matching items when typing while closed.
 *
 * @example
 * <Select.Trigger validationStyleEnabled>
 *   <Select.Value placeholder="Choose option..." />
 * </Select.Trigger>
 */
const SelectTrigger: FC<SelectTriggerProps> = ({
  validationStyleEnabled = false,
  className,
  children,
  ref,
  onClick,
  onKeyDown,
  disabled: disabledProp,
  ...props
}) => {
  const context = useSelectContext();
  const typeahead = useTypeaheadSearch();
  const isDisabled = context.disabled || disabledProp;

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || context.open) return;

    if (
      isTypeaheadKey(event) &&
      !(event.key === ' ' && !typeahead.hasSearch())
    ) {
      const enabledItems = context.itemStore
        .entries()
        .filter(([, record]) => !record.disabled);
      const matchIndex = getTypeaheadMatch(
        enabledItems.map(([, record]) => record.textValue),
        typeahead.append(event.key),
        enabledItems.findIndex(([itemValue]) => itemValue === context.value)
      );

      const matchedValue = enabledItems[matchIndex]?.[0];
      if (matchedValue !== undefined) context.setValue(matchedValue);
      return;
    }

    if (['Enter', ' ', 'ArrowDown', 'ArrowUp'].includes(event.key)) {
      event.preventDefault();
      context.setOpen(true);
    }
  };

  return (
    <button
      ref={composeRefs(ref, context.triggerRef)}
      type="button"
      role="combobox"
      aria-controls={context.contentId}
      aria-expanded={context.open}
      aria-autocomplete="none"
      aria-required={context.required || undefined}
      dir={context.dir}
      disabled={isDisabled}
      data-state={context.open ? 'open' : 'closed'}
      data-placeholder={isEmptyValue(context.value) ? '' : undefined}
      suppressHydrationWarning
      className={cn(
        // Same field surface as Input
        inputVariants({
          validationStyleEnabled: validationStyleEnabled
            ? 'enabled'
            : 'disabled',
        }),
        'flex cursor-pointer items-center justify-between whitespace-nowrap',
        'disabled:cursor-not-allowed [&>span]:line-clamp-1',

        className
      )}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) context.setOpen(!context.open);
      }}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {children}
      <ChevronsUpDown aria-hidden className="size-4 opacity-50" />
    </button>
  );
};

type ScrollButtonProps = {
  direction: 'up' | 'down';
  viewportRef: RefObject<HTMLDivElement | null>;
};

/** Scrolls the list while hovered; shown only when there is more to scroll. */
const SelectScrollButton: FC<ScrollButtonProps> = ({
  direction,
  viewportRef,
}) => {
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);

  const stopScrolling = () => clearInterval(intervalRef.current);

  useEffect(() => stopScrolling, []);

  const Icon = direction === 'up' ? ChevronUpIcon : ChevronDownIcon;

  return (
    <div
      aria-hidden
      className="flex shrink-0 cursor-default items-center justify-center py-1"
      onPointerEnter={() => {
        stopScrolling();
        intervalRef.current = setInterval(() => {
          viewportRef.current?.scrollBy({
            top: direction === 'up' ? -SCROLL_BUTTON_STEP : SCROLL_BUTTON_STEP,
          });
        }, SCROLL_BUTTON_INTERVAL);
      }}
      onPointerLeave={stopScrolling}
    >
      <Icon />
    </div>
  );
};

type ContentPosition = {
  side: 'top' | 'bottom';
  style: CSSProperties & Record<`--${string}`, string>;
};

/** Places the list below the trigger, or above when there is more room there. */
const computeContentPosition = (
  trigger: HTMLElement,
  content: HTMLElement,
  viewport: HTMLElement
): ContentPosition => {
  const triggerRect = trigger.getBoundingClientRect();
  const isRightToLeft = getComputedStyle(trigger).direction === 'rtl';

  // Natural height: the viewport's full content plus the chrome around it.
  const naturalHeight =
    viewport.scrollHeight + (content.offsetHeight - viewport.clientHeight);
  const spaceBelow = window.innerHeight - triggerRect.bottom - VIEWPORT_PADDING;
  const spaceAbove = triggerRect.top - VIEWPORT_PADDING;
  const side =
    naturalHeight <= spaceBelow || spaceBelow >= spaceAbove ? 'bottom' : 'top';

  return {
    side,
    style: {
      '--select-trigger-width': `${triggerRect.width}px`,
      ...(side === 'bottom'
        ? { top: triggerRect.bottom }
        : { bottom: window.innerHeight - triggerRect.top }),
      ...(isRightToLeft
        ? { right: window.innerWidth - triggerRect.right }
        : { left: triggerRect.left }),
      maxHeight: Math.min(
        MAX_CONTENT_HEIGHT,
        side === 'bottom' ? spaceBelow : spaceAbove
      ),
      maxWidth: isRightToLeft
        ? triggerRect.right - VIEWPORT_PADDING
        : window.innerWidth - triggerRect.left - VIEWPORT_PADDING,
    },
  };
};

const focusOption = (option: HTMLElement | undefined) => {
  if (!option) return;

  option.focus({ preventScroll: true });
  option.scrollIntoView?.({ block: 'nearest' });
};

type SelectPopupProps = ComponentProps<'div'> & {
  presenceRef: (element: HTMLDivElement | null) => void;
};

/** The open list: positioned, focus-managed and dismissable. */
const SelectPopup: FC<SelectPopupProps> = ({
  className,
  children,
  style,
  presenceRef,
  onKeyDown,
  ...props
}) => {
  const context = useSelectContext();
  const typeahead = useTypeaheadSearch();
  const contentRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<ContentPosition | null>(null);
  const [scrollState, setScrollState] = useState({
    canScrollUp: false,
    canScrollDown: false,
  });

  const getOptions = (): HTMLElement[] => [
    ...(contentRef.current?.querySelectorAll<HTMLElement>(OPTION_SELECTOR) ??
      []),
  ];

  const updateScrollState = () => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const canScrollUp = viewport.scrollTop > 0;
    const canScrollDown =
      Math.ceil(viewport.scrollTop + viewport.clientHeight) <
      viewport.scrollHeight;

    setScrollState((previous) =>
      previous.canScrollUp === canScrollUp &&
      previous.canScrollDown === canScrollDown
        ? previous
        : { canScrollUp, canScrollDown }
    );
  };

  const updatePosition = () => {
    const trigger = context.triggerRef.current;
    const content = contentRef.current;
    const viewport = viewportRef.current;
    if (!trigger || !content || !viewport) return;

    setPosition(computeContentPosition(trigger, content, viewport));
  };

  // Measured before paint so the list never flashes at the wrong spot.
  useLayoutEffect(updatePosition, []);

  // Focus the selected option (or the first one) once placed.
  useLayoutEffect(() => {
    if (!position || !context.open) return;

    const options = getOptions();
    focusOption(
      options.find((option) => option.dataset.state === 'checked') ?? options[0]
    );
    updateScrollState();
  }, [position === null]);

  // Hand focus back to the trigger when the list closes or unmounts.
  const restoreTriggerFocus = () => {
    const activeElement = document.activeElement;
    const hasLostFocus =
      !activeElement ||
      activeElement === document.body ||
      contentRef.current?.contains(activeElement);

    if (hasLostFocus)
      context.triggerRef.current?.focus({ preventScroll: true });
  };

  useEffect(() => {
    if (!context.open) restoreTriggerFocus();
  }, [context.open]);

  useEffect(() => restoreTriggerFocus, []);

  // Dismiss on outside press, resize or window blur; follow scrolling.
  useEffect(() => {
    if (!context.open) return;

    let cancelScheduledUpdate: (() => void) | null = null;

    const close = () => context.setOpen(false);

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      const isInside =
        contentRef.current?.contains(target) ||
        context.triggerRef.current?.contains(target);

      if (!isInside) close();
    };

    const handleScroll = (event: Event) => {
      if (event.target === viewportRef.current) return;

      cancelScheduledUpdate ??= scheduleFrameTask(() => {
        cancelScheduledUpdate = null;
        updatePosition();
      });
    };

    document.addEventListener('pointerdown', handlePointerDown, true);
    window.addEventListener('scroll', handleScroll, {
      capture: true,
      passive: true,
    });
    window.addEventListener('resize', close);
    window.addEventListener('blur', close);

    return () => {
      cancelScheduledUpdate?.();
      document.removeEventListener('pointerdown', handlePointerDown, true);
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', close);
      window.removeEventListener('blur', close);
    };
  }, [context.open]);

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;

    const options = getOptions();
    const activeIndex = options.indexOf(document.activeElement as HTMLElement);
    const isSpaceTypeahead = event.key === ' ' && typeahead.hasSearch();

    if (isTypeaheadKey(event) && (event.key !== ' ' || isSpaceTypeahead)) {
      const matchIndex = getTypeaheadMatch(
        options.map((option) => option.textContent ?? ''),
        typeahead.append(event.key),
        activeIndex
      );

      if (matchIndex !== -1) focusOption(options[matchIndex]);
      return;
    }

    const lastIndex = options.length - 1;
    const targetIndexByKey: Record<string, number> = {
      ArrowDown: Math.min(activeIndex + 1, lastIndex),
      ArrowUp: activeIndex === -1 ? lastIndex : Math.max(activeIndex - 1, 0),
      Home: 0,
      End: lastIndex,
      PageDown: lastIndex,
      PageUp: 0,
    };

    const targetIndex = targetIndexByKey[event.key];

    if (targetIndex !== undefined) {
      event.preventDefault();
      focusOption(options[targetIndex]);
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      options[activeIndex]?.click();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      context.setOpen(false);
    } else if (event.key === 'Tab') {
      // Focus stays trapped in the list until it closes.
      event.preventDefault();
    }
  };

  return (
    <div
      ref={composeRefs(contentRef, presenceRef)}
      id={context.contentId}
      role="listbox"
      tabIndex={-1}
      dir={context.dir}
      data-state={context.open ? 'open' : 'closed'}
      data-side={position?.side}
      className={cn(
        // Base styles
        'fixed z-50 flex min-w-32 flex-col overflow-hidden',
        'rounded-xl shadow-md',

        // Background and text
        'bg-white dark:bg-neutral-950',
        'text-foreground',

        // Border
        'border border-neutral-200 dark:border-neutral-800',

        // Animations
        'data-[state=closed]:animate-out data-[state=open]:animate-in',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        'data-[side=bottom]:slide-in-from-top-2',
        'data-[side=top]:slide-in-from-bottom-2',

        // Gap with the trigger
        'data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1',

        // Hidden until positioned
        !position && 'invisible',

        className
      )}
      style={{ ...position?.style, ...style }}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {scrollState.canScrollUp && (
        <SelectScrollButton direction="up" viewportRef={viewportRef} />
      )}
      <div
        ref={viewportRef}
        className="min-h-0 w-full min-w-(--select-trigger-width) flex-1 [scrollbar-width:none] overflow-y-auto p-1 [&::-webkit-scrollbar]:hidden"
        onScroll={updateScrollState}
      >
        {children}
      </div>
      {scrollState.canScrollDown && (
        <SelectScrollButton direction="down" viewportRef={viewportRef} />
      )}
    </div>
  );
};

/** True for items rendered off-screen to register their labels while closed. */
const SelectCollectionContext = createContext(false);

/**
 * The option list, portaled to `document.body` while open. While closed, its
 * items still render into a detached fragment so `Select.Value` can show the
 * selected label.
 *
 * @example
 * <Select.Content>
 *   <Select.Item value="light">Light</Select.Item>
 * </Select.Content>
 */
export const SelectContent: FC<ComponentProps<'div'>> = ({
  children,
  ...props
}) => {
  const { open } = useSelectContext();
  const { isMounted, ref: presenceRef } = usePresence<HTMLDivElement>(open);
  const [collectionFragment, setCollectionFragment] =
    useState<DocumentFragment | null>(null);

  useLayoutEffect(() => {
    setCollectionFragment(document.createDocumentFragment());
  }, []);

  if (isMounted) {
    return createPortal(
      <SelectPopup presenceRef={presenceRef} {...props}>
        {children}
      </SelectPopup>,
      document.body
    );
  }

  if (!collectionFragment) return null;

  return createPortal(
    <SelectCollectionContext.Provider value>
      <div>{children}</div>
    </SelectCollectionContext.Provider>,
    collectionFragment
  );
};

/** Non-interactive heading for a group of items. */
export const SelectLabel: FC<ComponentProps<'div'>> = ({
  className,
  ...props
}) => (
  <div
    className={cn('px-1 py-0.5 text-sm font-semibold', className)}
    {...props}
  />
);

export type SelectItemProps = ComponentProps<'div'> & {
  value: string;
  disabled?: boolean;
  /** Text used by typeahead; defaults to the rendered text. */
  textValue?: string;
};

/**
 * A selectable option. Focus follows the mouse, and the selected option shows
 * a check mark.
 *
 * @example
 * <Select.Item value="dark">🌙 Dark</Select.Item>
 */
const SelectItem: FC<SelectItemProps> = ({
  value,
  disabled = false,
  textValue,
  className,
  children,
  onClick,
  onPointerMove,
  onPointerLeave,
  ...props
}) => {
  const context = useSelectContext();
  const isInCollection = useContext(SelectCollectionContext);
  const textRef = useRef<HTMLSpanElement>(null);
  const isSelected = context.value === value;

  useLayoutEffect(() => {
    const record: SelectItemRecord = {
      label: children,
      textValue: textValue ?? textRef.current?.textContent ?? '',
      disabled,
    };

    context.itemStore.set(value, record);

    return () => context.itemStore.delete(value, record);
  }, [value, children, textValue, disabled]);

  if (isInCollection) return <span ref={textRef}>{children}</span>;

  return (
    <div
      role="option"
      aria-selected={isSelected}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? undefined : -1}
      data-state={isSelected ? 'checked' : 'unchecked'}
      data-disabled={disabled ? '' : undefined}
      className={cn(
        'relative flex w-full cursor-pointer items-center rounded-lg py-1.5 ps-2 pe-8 text-sm outline-hidden select-none focus:bg-neutral/10 data-disabled:pointer-events-none data-disabled:opacity-50',
        className
      )}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || disabled) return;

        context.setValue(value);
        context.setOpen(false);
      }}
      onPointerMove={(event) => {
        onPointerMove?.(event);
        if (disabled || event.pointerType !== 'mouse') return;
        if (document.activeElement !== event.currentTarget) {
          event.currentTarget.focus({ preventScroll: true });
        }
      }}
      onPointerLeave={(event) => {
        onPointerLeave?.(event);
        if (document.activeElement !== event.currentTarget) return;

        // Keep keyboard handling alive on the list itself.
        event.currentTarget
          .closest<HTMLElement>('[role="listbox"]')
          ?.focus({ preventScroll: true });
      }}
      {...props}
    >
      <span className="absolute inset-e-2 flex size-3.5 items-center justify-center">
        {isSelected && <CheckIcon className="size-4" />}
      </span>
      <span ref={textRef}>{children}</span>
    </div>
  );
};

/** Thin divider between groups of items. */
export const SelectSeparator: FC<ComponentProps<'div'>> = ({
  className,
  ...props
}) => (
  <div
    aria-hidden
    className={cn(
      '-mx-1 my-1 h-px',
      'bg-neutral-200 dark:bg-neutral-800',
      className
    )}
    {...props}
  />
);

type SelectType = typeof SelectRoot & {
  Group: typeof SelectGroup;
  Value: typeof SelectValue;
  Trigger: typeof SelectTrigger;
  Content: typeof SelectContent;
  Label: typeof SelectLabel;
  Item: typeof SelectItem;
  Separator: typeof SelectSeparator;
};

/**
 * Single-choice dropdown (compound component).
 *
 * Keyboard: Enter/Space/arrows open it; arrows, Home/End and typeahead move
 * through options; Enter/Space selects; Escape closes.
 *
 * @example
 * <Select defaultValue="system" onValueChange={setTheme}>
 *   <Select.Trigger>
 *     <Select.Value placeholder="Choose theme..." />
 *   </Select.Trigger>
 *   <Select.Content>
 *     <Select.Label>Theme</Select.Label>
 *     <Select.Item value="light">☀️ Light</Select.Item>
 *     <Select.Item value="dark">🌙 Dark</Select.Item>
 *     <Select.Separator />
 *     <Select.Item value="system">⚙️ System</Select.Item>
 *   </Select.Content>
 * </Select>
 */
export const Select = SelectRoot as SelectType;
Select.Group = SelectGroup;
Select.Value = SelectValue;
Select.Trigger = SelectTrigger;
Select.Content = SelectContent;
Select.Label = SelectLabel;
Select.Item = SelectItem;
Select.Separator = SelectSeparator;
