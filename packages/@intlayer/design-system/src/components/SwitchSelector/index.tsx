'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { useRef, type ReactNode, type HTMLAttributes } from 'react';
import { useItemSelector } from '../../hooks';
import { cn } from '../../utils/cn';

export type SwitchSelectorChoice<T> = {
  content: ReactNode;
  value: T;
} & HTMLAttributes<HTMLButtonElement>;
export type SwitchSelectorChoices<T> = SwitchSelectorChoice<T>[];

type SwitchSelectorProps<T = string> = {
  choices: SwitchSelectorChoices<T>;
  selectedChoice: T;
  onChange: (choice: T) => void;
} & VariantProps<typeof switchSelectorVariant> &
  VariantProps<typeof choiceVariant>;

const switchSelectorVariant = cva(
  'flex flex-row gap-2 rounded-full border-[1.5px] p-[1.5px]',
  {
    variants: {
      color: {
        primary:
          'border-primary dark:border-primary-dark text-primary dark:text-primary-dark',
        secondary:
          'border-secondary dark:border-secondary-dark text-secondary dark:text-secondary-dark',
        destructive:
          'border-destructive dark:border-destructive-dark bg-destructive dark:bg-destructive-dark text-destructive',
        neutral:
          'border-neutral dark:border-neutral-dark text-neutral dark:text-neutral-dark',
        light: 'border-white text-white',
        dark: 'border-neutral-800 text-neutral-800',
        text: 'border-text dark:border-text-dark text-text dark:text-text-dark',
      },
    },
    defaultVariants: {
      color: 'primary',
    },
  }
);

const choiceVariant = cva(
  'z-1 aria-selected:text-text-dark dark:aria-selected:text-text text-sm font-medium transition-all duration-300 ease-in-out aria-selected:cursor-default motion-reduce:transition-none',
  {
    variants: {
      size: {
        sm: 'p-1',
        md: 'p-2',
        lg: 'p-4',
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
        primary:
          'bg-primary dark:bg-primary-dark aria-selected:text-text dark:aria-selected:text-text-dark',
        secondary:
          'bg-secondary dark:bg-secondary-dark aria-selected:text-text dark:aria-selected:text-text-dark',
        destructive:
          'bg-destructive dark:bg-destructive-dark aria-selected:text-text dark:aria-selected:text-text-dark',
        neutral:
          'bg-neutral dark:bg-neutral-dark dark:aria-selected:text-text aria-selected:text-white',
        light: 'bg-white aria-selected:text-black',
        dark: 'bg-neutral-800 aria-selected:text-white',
        text: 'bg-text dark:bg-text-dark aria-selected:text-text-dark dark:aria-selected:text-text',
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
 *   selectedChoice="option1"
 *   onChange={(choice) => console.log(choice)}
 * />
 * ```
 */
export const SwitchSelector = <T,>({
  choices,
  selectedChoice,
  onChange,
  color = 'primary',
  size = 'md',
}: SwitchSelectorProps<T>) => {
  const optionsRefs = useRef<HTMLButtonElement[]>([]);
  const indicatorRef = useRef<HTMLDivElement | null>(null);
  const { choiceIndicatorPosition } = useItemSelector(optionsRefs);

  return (
    <div
      className={cn(
        switchSelectorVariant({
          color,
        })
      )}
      role="tablist"
    >
      <div className="relative flex size-full flex-row items-center justify-center">
        {choices.map((choice, index) => {
          const { content, value, ...buttonProps } = choice;

          const isKeyOfKey =
            typeof value === 'string' || typeof value === 'number';

          const isSelected = selectedChoice === value;

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
              onClick={() => onChange(value)}
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
