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

export enum SwitchSelectorColor {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  DESTRUCTIVE = 'destructive',
  NEUTRAL = 'neutral',
  LIGHT = 'light',
  DARK = 'dark',
  TEXT = 'text',
}

export enum SwitchSelectorSize {
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
}

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
  'flex h-fit w-fit cursor-pointer flex-row gap-2 rounded-full border-[1.3px] p-[1.5px]',
  {
    variants: {
      color: {
        [`${SwitchSelectorColor.PRIMARY}`]: 'border-primary text-primary',
        [`${SwitchSelectorColor.SECONDARY}`]: 'border-secondary text-secondary',
        [`${SwitchSelectorColor.DESTRUCTIVE}`]:
          'border-destructive bg-destructive text-destructive',
        [`${SwitchSelectorColor.NEUTRAL}`]: 'border-neutral text-neutral',
        [`${SwitchSelectorColor.LIGHT}`]: 'border-white text-white',
        [`${SwitchSelectorColor.DARK}`]: 'border-neutral-800 text-neutral-800',
        [`${SwitchSelectorColor.TEXT}`]: 'border-text text-text',
      },
      disabled: {
        true: 'cursor-not-allowed opacity-50',
        false: '',
      },
    },
    defaultVariants: {
      color: `${SwitchSelectorColor.PRIMARY}`,
      disabled: false,
    },
  }
);

export const choiceVariant = cva(
  'z-1 flex-1 cursor-pointer font-medium text-sm transition-all duration-300 ease-in-out aria-selected:cursor-default data-[indicator=true]:text-text-opposite motion-reduce:transition-none',
  {
    variants: {
      size: {
        [`${SwitchSelectorSize.SM}`]: 'px-2 py-1 text-xs',
        [`${SwitchSelectorSize.MD}`]: 'p-2 text-sm',
        [`${SwitchSelectorSize.LG}`]: 'p-4 text-base',
      },
    },
    defaultVariants: {
      size: `${SwitchSelectorSize.MD}`,
    },
  }
);

export const indicatorVariant = cva(
  'absolute top-0 z-0 h-full w-auto rounded-full transition-all duration-300 ease-in-out motion-reduce:transition-none',
  {
    variants: {
      color: {
        [`${SwitchSelectorColor.PRIMARY}`]:
          'bg-primary data-[indicator=true]:text-text',
        [`${SwitchSelectorColor.SECONDARY}`]:
          'bg-secondary data-[indicator=true]:text-text',
        [`${SwitchSelectorColor.DESTRUCTIVE}`]:
          'bg-destructive data-[indicator=true]:text-text',
        [`${SwitchSelectorColor.NEUTRAL}`]:
          'bg-neutral data-[indicator=true]:text-white',
        [`${SwitchSelectorColor.LIGHT}`]:
          'bg-white data-[indicator=true]:text-black',
        [`${SwitchSelectorColor.DARK}`]:
          'bg-neutral-800 data-[indicator=true]:text-white',
        [`${SwitchSelectorColor.TEXT}`]:
          'bg-text data-[indicator=true]:text-text-opposite',
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
    color = SwitchSelectorColor.PRIMARY,
    size = SwitchSelectorSize.MD,
    className,
    itemClassName,
    ...baseProps
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
      <div className="relative flex h-full w-full flex-row items-center justify-center">
        {choices.map((choice, index) => {
          const { content, value, ...buttonProps } = choice;

          const isKeyOfKey =
            typeof value === 'string' || typeof value === 'number';

          const isSelected = index === selectedIndex;
          const isIndicatorOwner = index === indicatorIndex;

          return (
            <button
              {...buttonProps}
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
              disabled={disabled || isSelected}
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
