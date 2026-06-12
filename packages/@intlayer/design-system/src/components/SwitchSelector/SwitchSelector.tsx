'use client';

import { cn } from '@utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes, ReactNode } from 'react';
import { useSwitchSelector } from './useSwitchSelector';

export type SwitchSelectorChoice<T = boolean> = {
  content: ReactNode;
  value: T;
} & HTMLAttributes<HTMLButtonElement>;
export type SwitchSelectorChoices<T> = SwitchSelectorChoice<T>[];

export const defaultChoices: SwitchSelectorChoices<boolean> = [
  { content: 'Off', value: false },
  { content: 'On', value: true },
];

export type SwitchSelectorColor =
  | 'primary'
  | 'secondary'
  | 'neutral'
  | 'light'
  | 'dark'
  | 'text';

export type SwitchSelectorSize = 'xs' | 'sm' | 'md' | 'lg';

export type SwitchSelectorBaseProps<T = boolean> = {
  choices?: SwitchSelectorChoices<T>;
  value?: T;
  defaultValue?: T;
  onChange?: (choice: T) => void;
  className?: string;
  itemClassName?: string;
  hoverable?: boolean;
  disabled?: boolean;
  [key: string]: any;
};

export type SwitchSelectorProps<T = boolean> = SwitchSelectorBaseProps<T> &
  VariantProps<typeof switchSelectorVariant> &
  VariantProps<typeof choiceVariant>;

export const switchSelectorVariant = cva(
  'flex h-fit w-fit cursor-pointer flex-row gap-2 rounded-full border-[1.3px] p-0.38',
  {
    variants: {
      color: {
        primary: 'border-primary text-primary',
        secondary: 'border-secondary text-secondary',
        neutral: 'border-neutral text-neutral',
        light: 'border-white text-white',
        dark: 'border-neutral-800 text-neutral-800',
        text: 'border-text text-text',
      },
      disabled: {
        true: 'cursor-not-allowed opacity-50',
        false: '',
      },
    },
    defaultVariants: {
      color: `${'text'}`,
      disabled: false,
    },
  }
);

export const choiceVariant = cva(
  'z-1 flex-1 cursor-pointer font-medium text-sm transition-all duration-300 ease-in-out aria-selected:cursor-default data-[indicator=true]:text-text-opposite motion-reduce:transition-none',
  {
    variants: {
      size: {
        xs: 'px-2 py-0.5 text-xs',
        sm: 'px-2 py-1 text-xs',
        md: 'p-2 text-sm',
        lg: 'p-4 text-base',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export const indicatorVariant = cva(
  'absolute top-0 z-0 h-full w-auto rounded-full transition-all duration-300 ease-in-out motion-reduce:transition-none',
  {
    variants: {
      color: {
        primary: 'bg-primary data-[indicator=true]:text-text',
        secondary: 'bg-secondary data-[indicator=true]:text-text',
        error: 'bg-error data-[indicator=true]:text-text',
        neutral: 'bg-neutral data-[indicator=true]:text-white',
        light: 'bg-white data-[indicator=true]:text-black',
        dark: 'bg-neutral-800 data-[indicator=true]:text-white',
        text: 'bg-text data-[indicator=true]:text-text-opposite',
      },
    },
  }
);

/**
 * Component that allows the user to select one of the provided choices.
 * This component is horizontal.
 */
export const SwitchSelector = <T,>(props: SwitchSelectorProps<T>) => {
  const {
    choices = defaultChoices as SwitchSelectorChoices<T>,
    color = 'primary',
    size = 'md',
    className,
    itemClassName,
  } = props;

  const {
    selectedIndex,
    indicatorIndex,
    handleChange,
    optionsRefs,
    indicatorRef,
    choiceIndicatorPosition,
    setHoveredIndex,
    disabled,
  } = useSwitchSelector(
    {
      choices,
      value: props.value,
      defaultValue: props.defaultValue,
      onChange: props.onChange,
      hoverable: props.hoverable,
      disabled: props.disabled,
    },
    'horizontal'
  );

  return (
    <div
      className={switchSelectorVariant({
        color,
        disabled,
        className,
      })}
      role="tablist"
      aria-disabled={disabled ? 'true' : undefined}
    >
      <div className="relative flex size-full flex-row items-center justify-center">
        {choices.map((choice, index) => {
          const { content, value, ...buttonProps } = choice;

          const isKeyOfKey =
            typeof value === 'string' || typeof value === 'number';

          const isSelected = index === selectedIndex;
          const isIndicatorOwner = index === indicatorIndex;

          return (
            <button
              {...buttonProps}
              type="button"
              className={cn(
                choiceVariant({
                  size,
                }),
                disabled && 'cursor-not-allowed',
                itemClassName
              )}
              key={isKeyOfKey ? value : index}
              role="tab"
              onClick={() => handleChange(value)}
              aria-selected={isSelected ? 'true' : undefined}
              data-indicator={isIndicatorOwner ? 'true' : undefined}
              disabled={disabled}
              tabIndex={isSelected ? 0 : -1}
              ref={(el) => {
                optionsRefs.current[index] = el!;
              }}
              onMouseEnter={() => !disabled && setHoveredIndex(index)}
              onMouseLeave={() => !disabled && setHoveredIndex(null)}
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
