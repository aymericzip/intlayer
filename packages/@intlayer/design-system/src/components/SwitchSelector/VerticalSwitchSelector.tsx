'use client';

import { cn } from '@utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import {
  defaultChoices,
  type SwitchSelectorBaseProps,
  type SwitchSelectorChoices,
} from './SwitchSelector';
import { useSwitchSelector } from './useSwitchSelector';

const verticalSwitchSelectorVariant = cva(
  'flex h-fit w-fit cursor-pointer flex-col gap-2 rounded-2xl border-[1.3px] p-1',
  {
    variants: {
      color: {
        primary: 'border-primary text-primary',
        secondary: 'border-secondary text-secondary',
        [`${'error'}`]: 'border-error bg-error text-error',
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
      color: `${'primary'}`,
      disabled: false,
    },
  }
);

const verticalChoiceVariant = cva(
  'z-1 w-full cursor-pointer font-medium text-sm transition-all duration-300 ease-in-out aria-selected:cursor-default data-[indicator=true]:text-text-opposite motion-reduce:transition-none',
  {
    variants: {
      size: {
        sm: 'px-2 py-1 text-xs',
        md: 'p-2 text-sm',
        lg: 'p-4 text-base',
      },
    },
    defaultVariants: {
      size: `${'md'}`,
    },
  }
);

const verticalIndicatorVariant = cva(
  'absolute left-0 z-0 h-auto w-full rounded-xl transition-all duration-300 ease-in-out motion-reduce:transition-none',
  {
    variants: {
      color: {
        primary: 'bg-primary data-[indicator=true]:text-text',
        secondary: 'bg-secondary data-[indicator=true]:text-text',
        [`${'error'}`]: 'bg-error data-[indicator=true]:text-text',
        neutral: 'bg-neutral data-[indicator=true]:text-white',
        light: 'bg-white data-[indicator=true]:text-black',
        dark: 'bg-neutral-800 data-[indicator=true]:text-white',
        text: 'bg-text data-[indicator=true]:text-text-opposite',
      },
    },
  }
);

export type VerticalSwitchSelectorProps<T = boolean> =
  SwitchSelectorBaseProps<T> &
    VariantProps<typeof verticalSwitchSelectorVariant> &
    VariantProps<typeof verticalChoiceVariant>;

/**
 * Component that allows the user to select one of the provided choices.
 * This component is vertical.
 */
export const VerticalSwitchSelector = <T,>(
  props: VerticalSwitchSelectorProps<T>
) => {
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
    'vertical'
  );

  return (
    <div
      className={verticalSwitchSelectorVariant({
        color,
        disabled,
        className,
      })}
      role="tablist"
      aria-disabled={disabled ? 'true' : undefined}
    >
      <div className="relative flex h-fit w-full flex-col items-center justify-center">
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
                verticalChoiceVariant({
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
              verticalIndicatorVariant({
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
