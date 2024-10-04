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
          'border-primary text-primary dark:border-primary-dark dark:text-primary-dark',
        secondary:
          'border-secondary text-secondary dark:border-secondary-dark dark:text-secondary-dark',
        destructive:
          'border-destructive bg-destructive text-destructive dark:border-destructive-dark dark:bg-destructive-dark',
        neutral:
          'border-neutral text-neutral dark:border-neutral-dark dark:text-neutral-dark',
        light: 'border-white text-white',
        dark: 'border-neutral-800 text-neutral-800',
        text: 'border-text text-text dark:border-text-dark dark:text-text-dark',
      },
    },
    defaultVariants: {
      color: 'primary',
    },
  }
);

const choiceVariant = cva(
  'z-1 text-sm font-medium transition-all duration-300 ease-in-out aria-selected:cursor-default aria-selected:text-text-dark motion-reduce:transition-none dark:aria-selected:text-text',
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
          'bg-primary aria-selected:text-text dark:bg-primary-dark dark:aria-selected:text-text-dark',
        secondary:
          'bg-secondary aria-selected:text-text dark:bg-secondary-dark dark:aria-selected:text-text-dark',
        destructive:
          'bg-destructive aria-selected:text-text dark:bg-destructive-dark dark:aria-selected:text-text-dark',
        neutral:
          'bg-neutral aria-selected:text-white dark:bg-neutral-dark dark:aria-selected:text-text',
        light: 'bg-white aria-selected:text-black',
        dark: 'bg-neutral-800 aria-selected:text-white',
        text: 'bg-text aria-selected:text-text-dark dark:bg-text-dark dark:aria-selected:text-text',
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
