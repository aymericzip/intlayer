'use client';

import { useControllableState } from '@hooks/useControllableState';
import { composeRefs } from '@utils/composeRefs';
import {
  type ComponentProps,
  createContext,
  type FC,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
  useContext,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';
import { getCommandScore } from './getCommandScore';

const ITEM_SELECTOR = '[data-command-item]:not([aria-disabled="true"])';

type CommandItemRecord = {
  id: string;
  value: string;
  keywords: readonly string[];
  groupId?: string;
  onSelect: () => void;
};

/**
 * Search, selection and item registry of one command menu. External, so a
 * keystroke re-renders only the parts whose visibility or selection changed.
 */
const createCommandStore = () => {
  const items = new Map<string, CommandItemRecord>();
  const listeners = new Set<() => void>();
  let search = '';
  let selectedValue: string | undefined;

  const notify = () => {
    for (const listener of listeners) listener();
  };

  const matches = (value: string, keywords: readonly string[] = []) =>
    getCommandScore(value, search, keywords) > 0;

  const findItemByValue = (value: string | undefined) =>
    [...items.values()].find((item) => item.value === value);

  return {
    subscribe: (listener: () => void) => {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    getSearch: () => search,
    setSearch: (nextSearch: string) => {
      if (nextSearch === search) return;
      search = nextSearch;
      notify();
    },
    getSelectedValue: () => selectedValue,
    setSelectedValue: (value: string | undefined) => {
      if (value === selectedValue) return;
      selectedValue = value;
      notify();
    },
    getSelectedItemId: () => findItemByValue(selectedValue)?.id,
    selectCurrent: () => findItemByValue(selectedValue)?.onSelect(),
    matches,
    getVisibleCount: () =>
      [...items.values()].filter((item) => matches(item.value, item.keywords))
        .length,
    isGroupVisible: (groupId: string) =>
      [...items.values()].some(
        (item) => item.groupId === groupId && matches(item.value, item.keywords)
      ),
    register: (record: CommandItemRecord) => {
      items.set(record.id, record);
      notify();
      return () => {
        items.delete(record.id);
        notify();
      };
    },
  };
};

type CommandStore = ReturnType<typeof createCommandStore>;

type CommandContextValue = {
  store: CommandStore;
  listId: string;
};

const CommandContext = createContext<CommandContextValue | null>(null);

const GroupContext = createContext<string | undefined>(undefined);

const useCommandContext = (): CommandContextValue => {
  const context = useContext(CommandContext);

  if (!context)
    throw new Error('Command parts must be rendered inside <Command>');

  return context;
};

const useStoreValue = <TValue,>(
  store: CommandStore,
  getSnapshot: () => TValue
): TValue => useSyncExternalStore(store.subscribe, getSnapshot, getSnapshot);

const getSelectableItems = (root: HTMLElement | null): HTMLElement[] => [
  ...(root?.querySelectorAll<HTMLElement>(ITEM_SELECTOR) ?? []),
];

/**
 * Root of a searchable command menu: filters items by the input's text,
 * keeps the first match selected, and handles arrow/Home/End/Enter keys.
 *
 * @example
 * <CommandPrimitive>
 *   <CommandPrimitiveInput placeholder="Search..." />
 *   <CommandPrimitiveList>
 *     <CommandPrimitiveEmpty>No results</CommandPrimitiveEmpty>
 *     <CommandPrimitiveItem onSelect={run}>Calendar</CommandPrimitiveItem>
 *   </CommandPrimitiveList>
 * </CommandPrimitive>
 */
export const CommandPrimitive: FC<ComponentProps<'div'>> = ({
  children,
  ref,
  onKeyDown,
  ...props
}) => {
  const [store] = useState(createCommandStore);
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const search = useStoreValue(store, store.getSearch);
  const hasSelection = useStoreValue(
    store,
    () => store.getSelectedItemId() !== undefined
  );
  const previousSearchRef = useRef<string | null>(null);

  const selectItem = (item: HTMLElement | undefined) => {
    if (!item) return;

    store.setSelectedValue(item.dataset.value);
    item.scrollIntoView?.({ block: 'nearest' });
  };

  // Each new search, or the loss of the selected item, selects the first match.
  useLayoutEffect(() => {
    const hasSearchChanged = previousSearchRef.current !== search;
    previousSearchRef.current = search;

    if (!hasSearchChanged && hasSelection) return;

    store.setSelectedValue(
      getSelectableItems(rootRef.current)[0]?.dataset.value
    );
  }, [search, hasSelection]);

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || event.nativeEvent.isComposing) return;

    const items = getSelectableItems(rootRef.current);
    const selectedIndex = items.findIndex(
      (item) => item.dataset.value === store.getSelectedValue()
    );
    const lastIndex = items.length - 1;
    const targetIndexByKey: Record<string, number> = {
      ArrowDown: Math.min(selectedIndex + 1, lastIndex),
      ArrowUp: Math.max(selectedIndex - 1, 0),
      Home: 0,
      End: lastIndex,
    };

    const targetIndex = targetIndexByKey[event.key];

    if (targetIndex !== undefined) {
      event.preventDefault();
      selectItem(items[targetIndex]);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      store.selectCurrent();
    }
  };

  return (
    <CommandContext.Provider value={{ store, listId }}>
      <div
        ref={composeRefs(ref, rootRef)}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </div>
    </CommandContext.Provider>
  );
};

export type CommandPrimitiveInputProps = Omit<
  ComponentProps<'input'>,
  'value' | 'onChange'
> & {
  /** Controlled search text. */
  value?: string;
  onValueChange?: (search: string) => void;
};

/** Search field filtering the items. */
export const CommandPrimitiveInput: FC<CommandPrimitiveInputProps> = ({
  value: valueProp,
  onValueChange,
  ...props
}) => {
  const { store, listId } = useCommandContext();
  const [search, setSearch] = useControllableState({
    value: valueProp,
    defaultValue: '',
    onChange: onValueChange,
  });
  const selectedItemId = useStoreValue(store, store.getSelectedItemId);

  useLayoutEffect(() => {
    store.setSearch(search);
  }, [search]);

  return (
    <input
      type="text"
      role="combobox"
      autoComplete="off"
      autoCorrect="off"
      spellCheck={false}
      aria-autocomplete="list"
      aria-expanded
      aria-controls={listId}
      aria-activedescendant={selectedItemId}
      value={search}
      onChange={(event) => setSearch(event.target.value)}
      {...props}
    />
  );
};

/** Scrollable listbox holding the items. */
export const CommandPrimitiveList: FC<ComponentProps<'div'>> = (props) => {
  const { listId } = useCommandContext();

  return <div role="listbox" id={listId} {...props} />;
};

/** Rendered only when no item matches the search. */
export const CommandPrimitiveEmpty: FC<ComponentProps<'div'>> = (props) => {
  const { store } = useCommandContext();
  const visibleCount = useStoreValue(store, store.getVisibleCount);

  if (visibleCount > 0) return null;

  return <div role="presentation" {...props} />;
};

export type CommandPrimitiveGroupProps = Omit<
  ComponentProps<'div'>,
  'children'
> & {
  heading?: ReactNode;
  children?: ReactNode;
};

/** Titled group of items, hidden when none of them match. */
export const CommandPrimitiveGroup: FC<CommandPrimitiveGroupProps> = ({
  heading,
  children,
  ...props
}) => {
  const { store } = useCommandContext();
  const groupId = useId();
  const headingId = useId();
  const isVisible = useStoreValue(store, () => store.isGroupVisible(groupId));

  return (
    <div role="presentation" hidden={!isVisible} {...props}>
      {heading && (
        <div id={headingId} aria-hidden data-command-group-heading="">
          {heading}
        </div>
      )}
      <div role="group" aria-labelledby={heading ? headingId : undefined}>
        <GroupContext.Provider value={groupId}>
          {children}
        </GroupContext.Provider>
      </div>
    </div>
  );
};

/** Divider, hidden while searching. */
export const CommandPrimitiveSeparator: FC<ComponentProps<'div'>> = (props) => {
  const { store } = useCommandContext();
  const search = useStoreValue(store, store.getSearch);

  if (search) return null;

  return <div role="separator" {...props} />;
};

export type CommandPrimitiveItemProps = Omit<
  ComponentProps<'div'>,
  'onSelect'
> & {
  /** Value used for filtering and passed to `onSelect`; defaults to the text. */
  value?: string;
  /** Extra terms the search may match. */
  keywords?: readonly string[];
  disabled?: boolean;
  onSelect?: (value: string) => void;
};

/** A selectable command, selected on hover and run on click or Enter. */
export const CommandPrimitiveItem: FC<CommandPrimitiveItemProps> = ({
  value,
  keywords,
  disabled = false,
  onSelect,
  ref,
  onClick,
  onPointerMove,
  ...props
}) => {
  const { store } = useCommandContext();
  const groupId = useContext(GroupContext);
  const id = useId();
  const elementRef = useRef<HTMLDivElement>(null);
  const [textValue, setTextValue] = useState(value ?? '');
  const itemValue = (value ?? textValue).trim();

  const onSelectRef = useRef(onSelect);

  useLayoutEffect(() => {
    onSelectRef.current = onSelect;
  });

  // Without a `value`, the rendered text is the value.
  useLayoutEffect(() => {
    const textContent = elementRef.current?.textContent;

    // Hidden (filtered out) items keep their last known text.
    if (value === undefined && textContent) setTextValue(textContent);
  });

  useLayoutEffect(() => {
    if (!itemValue) return;

    return store.register({
      id,
      value: itemValue,
      keywords: keywords ?? [],
      groupId,
      onSelect: () => {
        if (!disabled) onSelectRef.current?.(itemValue);
      },
    });
  }, [itemValue, keywords?.join(), groupId, disabled]);

  const isVisible = useStoreValue(
    store,
    () => !itemValue || store.matches(itemValue, keywords)
  );
  const isSelected = useStoreValue(
    store,
    () => !!itemValue && store.getSelectedValue() === itemValue
  );

  if (!isVisible) return null;

  return (
    // Focus stays in the input, which points here via aria-activedescendant.
    // oxlint-disable-next-line jsx-a11y/interactive-supports-focus -- see above
    <div
      ref={composeRefs(ref, elementRef)}
      id={id}
      role="option"
      aria-selected={isSelected}
      aria-disabled={disabled}
      data-command-item=""
      data-value={itemValue}
      data-selected={isSelected}
      data-disabled={disabled}
      onPointerMove={(event) => {
        onPointerMove?.(event);
        if (!disabled) store.setSelectedValue(itemValue);
      }}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented && !disabled) onSelect?.(itemValue);
      }}
      {...props}
    />
  );
};
