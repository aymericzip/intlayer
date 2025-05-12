'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import {
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { useItemSelector } from '../../hooks';
import { cn } from '../../utils/cn';

export type SwitchSelectorChoice<T = boolean> = {
  content: ReactNode;
  value: T;
} & HTMLAttributes<HTMLButtonElement>;
export type SwitchSelectorChoices<T> = SwitchSelectorChoice<T>[];

const defaultChoices: SwitchSelectorChoices<boolean> = [
  { content: 'Off', value: false },
  { content: 'On', value: true },
];

export type SwitchSelectorProps<T = boolean> = {
  choices?: SwitchSelectorChoices<T>;
  value?: T;
  defaultValue?: T;
  onChange?: (choice: T) => void;
  className?: string;
} & VariantProps<typeof switchSelectorVariant> &
  VariantProps<typeof choiceVariant>;

const switchSelectorVariant = cva(
  'flex flex-row gap-2 rounded-full w-fit border-[1.5px] p-[1.5px]',
  {
    variants: {
      color: {
        primary: 'border-primary text-primary',
        secondary: 'border-secondary text-secondary',
        destructive: 'border-destructive bg-destructive text-destructive',
        neutral: 'border-neutral text-neutral ',
        light: 'border-white text-white',
        dark: 'border-neutral-800 text-neutral-800',
        text: 'border-text text-text',
      },
    },
    defaultVariants: {
      color: 'primary',
    },
  }
);

const choiceVariant = cva(
  'z-1 w-full flex-1 text-sm font-medium transition-all duration-300 ease-in-out cursor-pointer aria-selected:cursor-default aria-selected:text-text-opposite motion-reduce:transition-none',
  {
    variants: {
      size: {
        sm: 'py-1 px-2 text-xs',
        md: 'p-2 text-sm',
        lg: 'p-4 text-base',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const indicatorVariant = cva(
  'absolute top-0 z-[-1] h-full w-auto rounded-full transition-[left,width] duration-300 ease-in-out motion-reduce:transition-none',
  {
    variants: {
      color: {
        primary: 'bg-primary aria-selected:text-text',
        secondary: 'bg-secondary aria-selected:text-text',
        destructive: 'bg-destructive aria-selected:text-text',
        neutral: 'bg-neutral aria-selected:text-white ',
        light: 'bg-white aria-selected:text-black',
        dark: 'bg-neutral-800 aria-selected:text-white',
        text: 'bg-text aria-selected:text-text-opposite',
      },
    },
  }
);

/**
 *
 * Component that allows the user to select one of the provided choices.
 *
 * Example:
 * ```jsx
 * <SwitchSelector
 *   choices={[
 *     { content: 'Option 1', value: 'option1' },
 *     { content: 'Option 2', value: 'option2' },
 *     { content: 'Option 3', value: 'option3' },
 *   ]}
 *   value="option1"
 *   onChange={(choice) => console.log(choice)}
 * />
 * ```
 */
export const SwitchSelector = <T,>({
  choices = defaultChoices as SwitchSelectorChoices<T>,
  value,
  defaultValue,
  onChange,
  color = 'primary',
  size = 'md',
  className,
}: SwitchSelectorProps<T>) => {
  const [valueState, setValue] = useState<T>(
    value ?? defaultValue ?? choices[0].value
  );
  const optionsRefs = useRef<HTMLButtonElement[]>([]);
  const indicatorRef = useRef<HTMLDivElement | null>(null);
  const { choiceIndicatorPosition } = useItemSelector(optionsRefs);

  const handleChange = (newValue: T) => {
    setValue(newValue);
    onChange?.(newValue);
  };

  useEffect(() => {
    if (value === undefined) return;
    setValue(value);
  }, [value]);

  return (
    <div
      className={switchSelectorVariant({
        color,
        className,
      })}
      role="tablist"
    >
      <div className="relative flex size-full flex-row items-center justify-center">
        {choices.map((choice, index) => {
          const { content, value, ...buttonProps } = choice;

          const isKeyOfKey =
            typeof value === 'string' || typeof value === 'number';

          const isSelected = value === valueState;

          return (
            <button
              {...buttonProps}
              className={cn(
                choiceVariant({
                  size,
                })
              )}
              key={isKeyOfKey ? value : index}
              role="tab"
              onClick={() => handleChange(value)}
              aria-selected={isSelected}
              disabled={isSelected}
              ref={(el) => {
                optionsRefs.current[index] = el!;
              }}
            >
              {content}
            </button>
          );
        })}
        {choiceIndicatorPosition && (
          <div
            className={cn(
              indicatorVariant({
                color,
              })
            )}
            style={choiceIndicatorPosition}
            ref={indicatorRef}
          />
        )}
      </div>
    </div>
  );
};
