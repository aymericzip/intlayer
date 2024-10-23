/* eslint-disable sonarjs/no-nested-conditional */
/* eslint-disable sonarjs/cognitive-complexity */
'use client';

import { X as RemoveIcon, Check } from 'lucide-react';
import {
  type ComponentPropsWithoutRef,
  type Dispatch,
  type ElementRef,
  type FC,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEventHandler,
  type RefObject,
  type SetStateAction,
  type SyntheticEvent,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { cn } from '../../utils/cn';
import { Badge } from '../Badge';
import { Command, CommandRoot } from '../Command';

type MultiSelectContextProps = {
  value: string[];
  onValueChange: (value: string) => void;
  open: boolean;
  setOpen: (value: boolean) => void;
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
  ref: RefObject<HTMLInputElement>;
  handleSelect: (e: SyntheticEvent<HTMLInputElement>) => void;
};

const MultiSelectContext = createContext<MultiSelectContextProps | null>(null);

const useMultiSelect = () => {
  const context = useContext(MultiSelectContext);
  if (!context) {
    throw new Error('useMultiSelect must be used within MultiSelectProvider');
  }
  return context;
};

/**
 * MultiSelect Docs: {@link: https://shadcn-extension.vercel.app/docs/multi-select}
 */

type MultiSelectProps = ComponentPropsWithoutRef<typeof CommandRoot> & {
  values?: string[];
  defaultValues?: string[];
  onValueChange?: (value: string[]) => void;
  loop?: boolean;
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
 *   <MultiSelectTrigger>
 *     <MultiSelectInput placeholder="Select your framework" />
 *   </MultiSelectTrigger>
 *   <MultiSelectContent>
 *     <MultiSelectList>
 *       <MultiSelectItem value={"React"}>React</MultiSelectItem>
 *       <MultiSelectItem value={"Vue"}>Vue</MultiSelectItem>
 *       <MultiSelectItem value={"Svelte"}>Svelte</MultiSelectItem>
 *     </MultiSelectList>
 *   </MultiSelectContent>
 * </MultiSelect>
 * ```
 */
const MultiSelectRoot: FC<MultiSelectProps> = ({
  values: valuesProp,
  defaultValues,
  onValueChange: onValueChange,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <MultiSelectContext.Provider value={memoValue}>
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
    </MultiSelectContext.Provider>
  );
};

const MultiSelectTrigger = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & {
    getBadgeValue?: (value: string) => string;
    validationStyleEnabled?: boolean;
  }
>(
  (
    {
      className,
      getBadgeValue = (value) => value,
      validationStyleEnabled = false,
      children,
      ...props
    },
    ref
  ) => {
    const { value, onValueChange, activeIndex } = useMultiSelect();

    const mousePreventDefault: MouseEventHandler<HTMLButtonElement> =
      useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
      }, []);

    return (
      <div
        ref={ref}
        className={cn(
          'flex w-full flex-col gap-3 rounded-lg p-1 py-2',
          'border-input ring-offset-background placeholder:text-muted-foreground focus:ring-ring flex w-full items-center justify-between whitespace-nowrap border px-3 py-2 text-sm focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
          'bg-input-background dark:bg-input-background-dark text-input-text dark:text-input-text-dark w-full select-text resize-none rounded-xl border-2 px-2 py-1 text-sm shadow-none outline-0 transition-all',
          'border-input-border dark:border-input-border-dark hover:border-input-border-hover dark:hover:border-input-border-hover-dark focus:border-input-border-focus dark:focus:border-input-border-focus focus:outline-0 focus:[box-shadow:none]',
          'aria-[invalid=true]:border-error dark:aria-[invalid=true]:border-error-dark',
          validationStyleEnabled &&
            'valid:border-success dark:valid:border-success-dark invalid:border-error dark:invalid:border-error-dark',
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
                  activeIndex === index && 'ring-muted-foreground ring-2'
                )}
                color="text"
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
  }
);

MultiSelectTrigger.displayName = 'MultiSelectTrigger';

const MultiSelectInput: FC<ComponentPropsWithoutRef<typeof Command.Input>> = ({
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
      ref={inputRef}
      value={inputValue}
      onValueChange={activeIndex === -1 ? setInputValue : undefined}
      onSelect={handleSelect}
      onBlur={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onClick={() => setActiveIndex(-1)}
      className={cn(
        'ml-2 flex-1 cursor-pointer outline-none',
        className,
        activeIndex !== -1 && 'caret-transparent'
      )}
    />
  );
};

MultiSelectInput.displayName = 'MultiSelectInput';

const MultiSelectContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ children }, ref) => {
  const { open } = useMultiSelect();
  return (
    <div ref={ref} className="relative">
      {open && children}
    </div>
  );
});

MultiSelectContent.displayName = 'MultiSelectContent';

const MultiSelectList = forwardRef<
  ElementRef<typeof Command.List>,
  ComponentPropsWithoutRef<typeof Command.List>
>(({ className, children }, ref) => (
  <Command.List
    ref={ref}
    className={cn(
      'border-muted bg-input-background dark:bg-input-background-dark absolute top-0 z-10 flex w-full flex-col gap-2 rounded-lg border p-2 shadow-md transition-colors',
      className
    )}
  >
    {children}
    <Command.Empty>
      <span className="text-muted-foreground">No results found</span>
    </Command.Empty>
  </Command.List>
));

MultiSelectList.displayName = 'MultiSelectList';

const MultiSelectItem = forwardRef<
  ElementRef<typeof Command.Item>,
  { value: string } & ComponentPropsWithoutRef<typeof Command.Item>
>(({ className, value, children, ...props }, ref) => {
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
      ref={ref}
      {...props}
      onSelect={() => {
        onValueChange(value);
        setInputValue('');
      }}
      className={cn(
        'flex cursor-pointer justify-between rounded-lg px-2 py-1 transition-colors',
        'hover:bg-neutral/10 dark:hover:bg-neutral-dark/10',
        className,
        isIncluded && 'opacity-50',
        props.disabled && 'cursor-not-allowed opacity-50'
      )}
      onMouseDown={mousePreventDefault}
    >
      {children}
      {isIncluded && <Check className="size-4" />}
    </Command.Item>
  );
});

MultiSelectItem.displayName = 'MultiSelectItem';

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
