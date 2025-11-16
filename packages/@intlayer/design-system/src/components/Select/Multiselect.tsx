'use client';

import { Check, X as RemoveIcon } from 'lucide-react';
import {
  type ComponentProps,
  createContext,
  type Dispatch,
  type FC,
  type HTMLAttributes,
  type KeyboardEvent,
  type LegacyRef,
  type MouseEventHandler,
  type RefObject,
  type SetStateAction,
  type SyntheticEvent,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { cn } from '../../utils/cn';
import { Badge, BadgeColor } from '../Badge';
import { Command, CommandRoot } from '../Command';

/**
 * Context properties for MultiSelect component state management
 *
 * @interface MultiSelectContextProps
 */
type MultiSelectContextProps = {
  /** Array of currently selected values */
  value: string[];
  /** Handler for value changes */
  onValueChange: (value: string) => void;
  /** Whether the dropdown is currently open */
  open: boolean;
  /** Function to set the open state */
  setOpen: (value: boolean) => void;
  /** Current input field value for filtering */
  inputValue: string;
  /** Function to set the input value */
  setInputValue: Dispatch<SetStateAction<string>>;
  /** Index of currently focused option for keyboard navigation */
  activeIndex: number;
  /** Function to set the active index */
  setActiveIndex: Dispatch<SetStateAction<number>>;
  /** Ref to the input element */
  ref: RefObject<HTMLInputElement | null>;
  /** Handler for option selection */
  handleSelect: (e: SyntheticEvent<HTMLInputElement>) => void;
};

const MultiSelectContext = createContext<MultiSelectContextProps | null>(null);

/**
 * Custom hook to access MultiSelect context
 *
 * Provides access to the internal state and methods of the MultiSelect component.
 * Must be used within a MultiSelect component tree.
 *
 * @returns MultiSelectContextProps - All context properties and methods
 * @throws Error when used outside of MultiSelect component
 *
 * @example
 * ```tsx
 * function CustomMultiSelectItem() {
 *   const { value, onValueChange, open } = useMultiSelect();
 *   // Use context properties...
 * }
 * ```
 */
const useMultiSelect = () => {
  const context = useContext(MultiSelectContext);
  if (!context) {
    throw new Error('useMultiSelect must be used within MultiSelectProvider');
  }
  return context;
};

/**
 * Props interface for the main MultiSelect component
 *
 * @interface MultiSelectProps
 */
type MultiSelectProps = ComponentProps<typeof CommandRoot> & {
  /**
   * Array of selected values (controlled mode)
   * @example
   * ```tsx
   * const [selected, setSelected] = useState(['react', 'vue']);
   * <MultiSelect values={selected} onValueChange={setSelected} />
   * ```
   */
  values?: string[];

  /**
   * Default selected values for uncontrolled mode
   * @example
   * ```tsx
   * <MultiSelect defaultValues={['react']} />
   * ```
   */
  defaultValues?: string[];

  /**
   * Callback fired when selection changes
   * @param value - New array of selected values
   * @example
   * ```tsx
   * <MultiSelect onValueChange={(values) => console.log('Selected:', values)} />
   * ```
   */
  onValueChange?: (value: string[]) => void;

  /**
   * Whether keyboard navigation should loop through options
   * @default false
   * @example
   * ```tsx
   * <MultiSelect loop /> // Arrow keys wrap around at list boundaries
   * ```
   */
  loop?: boolean;
};

/**
 * MultiSelect - A comprehensive multi-selection dropdown component
 *
 * An advanced multi-select component that combines the functionality of a searchable dropdown
 * with the ability to select multiple values. Built on top of Command component primitives,
 * it provides filtering, keyboard navigation, and visual feedback through badges.
 *
 * ## Key Features
 * - **Multi-Selection**: Select multiple options with visual badge representation
 * - **Searchable**: Built-in filtering to quickly find options in large lists
 * - **Keyboard Navigation**: Full arrow key navigation with optional looping
 * - **Accessibility**: Screen reader support, ARIA attributes, and focus management
 * - **Flexible State**: Both controlled and uncontrolled usage patterns
 * - **Rich UI**: Customizable badges, icons, and content layout
 *
 * ## Use Cases
 * - Tag/category selection in forms
 * - Multi-user assignment interfaces
 * - Feature/permission selection
 * - Filter selection in search interfaces
 * - Any multi-choice selection requirement
 *
 * ## Architecture
 * The component follows a compound pattern similar to Select:
 * - `MultiSelect` (root): Manages state and provides context
 * - `MultiSelect.Trigger`: Container for input and selected badges
 * - `MultiSelect.Input`: Searchable input field with filtering
 * - `MultiSelect.Content`: Dropdown container for options
 * - `MultiSelect.List`: Options container with keyboard navigation
 * - `MultiSelect.Item`: Individual selectable options
 *
 * ## Accessibility
 * - **Keyboard Navigation**: Arrow keys, Enter to select, Backspace to remove
 * - **Screen Readers**: Proper ARIA labels and live region announcements
 * - **Focus Management**: Clear focus indicators and logical tab flow
 * - **Search**: Real-time filtering with screen reader announcements
 *
 * @example
 * Basic multi-select usage:
 * ```tsx
 * const [frameworks, setFrameworks] = useState<string[]>([]);
 *
 * <MultiSelect values={frameworks} onValueChange={setFrameworks}>
 *   <MultiSelect.Trigger>
 *     <MultiSelect.Input placeholder="Select frameworks..." />
 *   </MultiSelect.Trigger>
 *   <MultiSelect.Content>
 *     <MultiSelect.List>
 *       <MultiSelect.Item value="react">React</MultiSelect.Item>
 *       <MultiSelect.Item value="vue">Vue</MultiSelect.Item>
 *       <MultiSelect.Item value="svelte">Svelte</MultiSelect.Item>
 *     </MultiSelect.List>
 *   </MultiSelect.Content>
 * </MultiSelect>
 * ```
 *
 * @example
 * Advanced usage with keyboard looping:
 * ```tsx
 * <MultiSelect defaultValues={['react']} loop>
 *   <MultiSelect.Trigger>
 *     <MultiSelect.Input placeholder="Choose technologies..." />
 *   </MultiSelect.Trigger>
 *   <MultiSelect.Content>
 *     <MultiSelect.List>
 *       <MultiSelect.Item value="react">⚛️ React</MultiSelect.Item>
 *       <MultiSelect.Item value="vue">💚 Vue</MultiSelect.Item>
 *       <MultiSelect.Item value="angular">🔴 Angular</MultiSelect.Item>
 *     </MultiSelect.List>
 *   </MultiSelect.Content>
 * </MultiSelect>
 * ```
 *
 * @example
 * Form integration with validation:
 * ```tsx
 * <form>
 *   <MultiSelect
 *     values={selectedSkills}
 *     onValueChange={setSelectedSkills}
 *     required
 *   >
 *     <MultiSelect.Trigger className="min-h-[2.5rem]">
 *       <MultiSelect.Input placeholder="Select your skills..." />
 *     </MultiSelect.Trigger>
 *     <MultiSelect.Content>
 *       <MultiSelect.List>
 *         <MultiSelect.Item value="javascript">JavaScript</MultiSelect.Item>
 *         <MultiSelect.Item value="typescript">TypeScript</MultiSelect.Item>
 *         <MultiSelect.Item value="python">Python</MultiSelect.Item>
 *       </MultiSelect.List>
 *     </MultiSelect.Content>
 *   </MultiSelect>
 * </form>
 * ```
 */
const MultiSelectRoot: FC<MultiSelectProps> = ({
  values: valuesProp,
  defaultValues,
  onValueChange,
  loop = false,
  className,
  children,
  dir,
  ...props
}) => {
  const [value, setValue] = useState<string[]>(defaultValues ?? []);
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isValueSelected, setIsValueSelected] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  useEffect(() => {
    if (valuesProp) {
      setValue(valuesProp);
    }
  }, [valuesProp]);

  const onValueChangeHandler = useCallback(
    (val: string) => {
      if (value.includes(val)) {
        const newValue = value.filter((item) => item !== val);
        setValue(newValue);
        onValueChange?.(newValue);
      } else {
        const newValue = [...value, val];
        setValue(newValue);
        onValueChange?.(newValue);
      }
    },

    [value]
  );

  const handleSelect = useCallback(
    (e: SyntheticEvent<HTMLInputElement>) => {
      e.preventDefault();
      const target = e.currentTarget;
      const selection = target.value.substring(
        target.selectionStart ?? 0,
        target.selectionEnd ?? 0
      );

      setSelectedValue(selection);
      setIsValueSelected(selection === inputValue);
    },
    [inputValue]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      e.stopPropagation();
      const target = inputRef.current;

      if (!target) return;

      const moveNext = () => {
        const nextIndex = activeIndex + 1;
        setActiveIndex(
          nextIndex > value.length - 1 ? (loop ? 0 : -1) : nextIndex
        );
      };

      const movePrev = () => {
        const prevIndex = activeIndex - 1;
        setActiveIndex(prevIndex < 0 ? value.length - 1 : prevIndex);
      };

      const moveCurrent = () => {
        const newIndex =
          activeIndex - 1 <= 0
            ? value.length - 1 === 0
              ? -1
              : 0
            : activeIndex - 1;
        setActiveIndex(newIndex);
      };

      switch (e.key) {
        case 'ArrowLeft':
          if (dir === 'rtl') {
            if (value.length > 0 && (activeIndex !== -1 || loop)) {
              moveNext();
            }
          } else if (value.length > 0 && target.selectionStart === 0) {
            movePrev();
          }
          break;

        case 'ArrowRight':
          if (dir === 'rtl') {
            if (value.length > 0 && target.selectionStart === 0) {
              movePrev();
            }
          } else if (value.length > 0 && (activeIndex !== -1 || loop)) {
            moveNext();
          }
          break;

        case 'Backspace':
        case 'Delete':
          if (value.length > 0) {
            if (activeIndex !== -1 && activeIndex < value.length) {
              onValueChangeHandler(value[activeIndex]);
              moveCurrent();
            } else if (
              (target.selectionStart === 0 && selectedValue === inputValue) ||
              isValueSelected
            ) {
              onValueChangeHandler(value[value.length - 1]);
            }
          }
          break;

        case 'Enter':
          setOpen(true);
          break;

        case 'Escape':
          if (activeIndex !== -1) {
            setActiveIndex(-1);
          } else if (open) {
            setOpen(false);
          }
          break;
      }
    },

    [value, inputValue, activeIndex, loop]
  );

  const memoValue = useMemo(
    () => ({
      value,
      onValueChange: onValueChangeHandler,
      open,
      setOpen,
      inputValue,
      setInputValue,
      activeIndex,
      setActiveIndex,
      ref: inputRef,
      handleSelect,
    }),
    [
      value,
      onValueChangeHandler,
      open,
      setOpen,
      inputValue,
      setInputValue,
      activeIndex,
      setActiveIndex,
      inputRef,
      handleSelect,
    ]
  );

  return (
    <MultiSelectContext value={memoValue}>
      <CommandRoot
        onKeyDown={handleKeyDown}
        className={cn(
          'flex w-full flex-col gap-2 overflow-visible bg-transparent',
          className
        )}
        dir={dir}
        {...props}
      >
        {children}
      </CommandRoot>
    </MultiSelectContext>
  );
};

const MultiSelectTrigger: FC<
  HTMLAttributes<HTMLDivElement> & {
    getBadgeValue?: (value: string) => string;
    validationStyleEnabled?: boolean;
  }
> = ({
  className,
  getBadgeValue = (value) => value,
  validationStyleEnabled = false,
  children,
  ...props
}) => {
  const { value, onValueChange, activeIndex } = useMultiSelect();

  const mousePreventDefault: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
    },
    []
  );

  return (
    <div
      className={cn(
        // Base layout
        'flex w-full flex-col gap-3',
        'cursor-pointer select-text text-base shadow-none outline-none md:text-sm',

        // Corner shape
        'rounded-xl [supports-[corner-shape:squircle]:rounded-2xl]',
        '[supports-[corner-shape:squircle]:rounded-4xl]',

        // Spacing
        'px-2 py-3 md:py-2',

        // Background and text
        'bg-neutral-50 dark:bg-neutral-950',
        'text-text',

        // Focus ring
        'ring-0',
        'focus-within:outline-none',
        'focus-within:ring-3',
        'focus-within:ring-neutral-200',
        'dark:focus-within:ring-neutral-500',

        'focus-within:ring-offset-white',
        'dark:focus-within:ring-offset-neutral-500',

        // Remove box-shadow
        '[box-shadow:none]',

        // States
        'disabled:cursor-not-allowed disabled:opacity-50',
        'aria-invalid:border-error',

        // Validation styles
        validationStyleEnabled && 'valid:border-success invalid:border-error',

        className
      )}
      {...props}
    >
      {value.length > 0 && (
        <div className="flex w-full flex-wrap gap-1">
          {value.map((item, index) => (
            <Badge
              key={item}
              className={cn(
                'flex items-center gap-1 rounded-xl px-1',
                activeIndex === index && 'ring-2 ring-muted-foreground'
              )}
              color={BadgeColor.TEXT}
            >
              <span className="text-xs">{getBadgeValue(item)}</span>
              <button
                aria-label={`Remove ${item} option`}
                aria-roledescription="button to remove option"
                onMouseDown={mousePreventDefault}
                onClick={() => onValueChange(item)}
              >
                <span className="sr-only">Remove {item} option</span>
                <RemoveIcon className="size-4 cursor-pointer" />
              </button>
            </Badge>
          ))}
        </div>
      )}
      {children}
    </div>
  );
};

const MultiSelectInput: FC<ComponentProps<typeof Command.Input>> = ({
  className,
  ...props
}) => {
  const {
    setOpen,
    inputValue,
    setInputValue,
    activeIndex,
    setActiveIndex,
    handleSelect,
    ref: inputRef,
  } = useMultiSelect();

  return (
    <Command.Input
      {...props}
      tabIndex={0}
      ref={inputRef as LegacyRef<HTMLInputElement>}
      value={inputValue}
      onValueChange={activeIndex === -1 ? setInputValue : undefined}
      onSelect={handleSelect}
      onBlur={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onClick={() => setActiveIndex(-1)}
      className={cn(
        'ml-2 flex-1 cursor-pointer outline-hidden',
        className,
        activeIndex !== -1 && 'caret-transparent'
      )}
    />
  );
};

const MultiSelectContent: FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
}) => {
  const { open } = useMultiSelect();
  return <div className="relative">{open && children}</div>;
};

const MultiSelectList: typeof Command.List = ({ className, children }) => (
  <Command.List
    className={cn(
      // Base layout
      'absolute top-0 z-10 flex w-full flex-col gap-2',
      'rounded-xl p-2 shadow-md',

      // Background and text
      'bg-white dark:bg-neutral-950',
      'text-text',

      // Border
      'border border-neutral-200 dark:border-neutral-800',

      // Transitions
      'transition-colors',

      className
    )}
  >
    {children}
    <Command.Empty>
      <span className="text-muted-foreground">No results found</span>
    </Command.Empty>
  </Command.List>
);

const MultiSelectItem: FC<
  { value: string } & ComponentProps<typeof Command.Item>
> = ({ className, value, children, ...props }) => {
  const { value: Options, onValueChange, setInputValue } = useMultiSelect();

  const mousePreventDefault: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
    },
    []
  );

  const isIncluded = Options.includes(value);
  return (
    <Command.Item
      {...props}
      onSelect={() => {
        onValueChange(value);
        setInputValue('');
      }}
      className={cn(
        // Base layout
        'flex cursor-pointer justify-between',
        'rounded-lg px-2 py-1',

        // Hover and transitions
        'transition-colors',
        'hover:bg-neutral/10',

        // States
        isIncluded && 'opacity-50',
        props.disabled && 'cursor-not-allowed opacity-50',

        className
      )}
      onMouseDown={mousePreventDefault}
    >
      {children}
      {isIncluded && <Check className="size-4" />}
    </Command.Item>
  );
};

type MultiSelectType = typeof MultiSelectRoot & {
  Trigger: typeof MultiSelectTrigger;
  Input: typeof MultiSelectInput;
  Content: typeof MultiSelectContent;
  List: typeof MultiSelectList;
  Item: typeof MultiSelectItem;
};

/**
 *
 * Usage example:
 * ```jsx
 * <MultiSelect
 *   values={value}
 *   onValuesChange={setValue}
 *   loop
 * >
 *   <MultiSelect.Trigger>
 *     <MultiSelect.Input placeholder="Select your framework" />
 *   </MultiSelect.Trigger>
 *   <MultiSelect.Content>
 *     <MultiSelect.List>
 *       <MultiSelect.Item value={"React"}>React</MultiSelect.Item>
 *       <MultiSelect.Item value={"Vue"}>Vue</MultiSelect.Item>
 *       <MultiSelect.Item value={"Svelte"}>Svelte</MultiSelect.Item>
 *     </MultiSelect.List>
 *   </MultiSelect.Content>
 * </MultiSelect>
 * ```
 */
export const MultiSelect = MultiSelectRoot as MultiSelectType;
MultiSelect.Trigger = MultiSelectTrigger;
MultiSelect.Input = MultiSelectInput;
MultiSelect.Content = MultiSelectContent;
MultiSelect.List = MultiSelectList;
MultiSelect.Item = MultiSelectItem;
