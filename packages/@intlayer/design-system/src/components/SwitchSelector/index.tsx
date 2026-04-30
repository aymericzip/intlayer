'use client';

import {
  type ItemSelectorOrientation,
  useItemSelector,
} from '@hooks/useItemSelector';
import { cn } from '@utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import {
  type HTMLAttributes,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';

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
  itemClassName?: string;
  hoverable?: boolean;
  disabled?: boolean;
  orientation?: ItemSelectorOrientation;
} & VariantProps<typeof switchSelectorVariant> &
  VariantProps<typeof choiceVariant>;

export enum SwitchSelectorColor {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  DESTRUCTIVE = 'destructive',
  NEUTRAL = 'neutral',
  LIGHT = 'light',
  DARK = 'dark',
  TEXT = 'text',
}

const switchSelectorVariant = cva(
  'flex h-fit w-fit cursor-pointer gap-2 border-[1.3px] p-[1.5px]',
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
      orientation: {
        horizontal: 'flex-row rounded-full',
        vertical: 'flex-col rounded-2xl',
      },
      disabled: {
        true: 'cursor-not-allowed opacity-50',
        false: '',
      },
    },
    defaultVariants: {
      color: `${SwitchSelectorColor.PRIMARY}`,
      orientation: 'horizontal',
      disabled: false,
    },
  }
);

export enum SwitchSelectorSize {
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
}

const choiceVariant = cva(
  'z-1 w-full cursor-pointer font-medium text-sm transition-all duration-300 ease-in-out aria-selected:cursor-default data-[indicator=true]:text-text-opposite motion-reduce:transition-none',
  {
    variants: {
      size: {
        [`${SwitchSelectorSize.SM}`]: 'px-2 py-1 text-xs',
        [`${SwitchSelectorSize.MD}`]: 'p-2 text-sm',
        [`${SwitchSelectorSize.LG}`]: 'p-4 text-base',
      },
      orientation: {
        horizontal: 'flex-1',
        vertical: '',
      },
    },
    defaultVariants: {
      size: `${SwitchSelectorSize.MD}`,
      orientation: 'horizontal',
    },
  }
);

const indicatorVariant = cva(
  'absolute z-0 transition-all duration-300 ease-in-out motion-reduce:transition-none',
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
      orientation: {
        horizontal: 'top-0 h-full w-auto rounded-full',
        vertical: 'left-0 h-auto w-full rounded-xl',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
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
  color = SwitchSelectorColor.PRIMARY,
  size = SwitchSelectorSize.MD,
  className,
  itemClassName,
  hoverable = true,
  disabled = false,
  orientation = 'horizontal',
}: SwitchSelectorProps<T>) => {
  const [valueState, setValue] = useState<T>(
    value ?? defaultValue ?? choices[0].value
  );
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const optionsRefs = useRef<HTMLButtonElement[]>([]);
  const indicatorRef = useRef<HTMLDivElement | null>(null);
  const { choiceIndicatorPosition } = useItemSelector(optionsRefs, {
    selector: (el) => el.getAttribute('data-indicator') === 'true',
    isHoverable: false,
    orientation,
  });

  const selectedIndex = choices.findIndex(
    (choice) => choice.value === valueState
  );

  // The indicator follows hover if hoverable, otherwise the selected option
  const indicatorIndex =
    hoverable && hoveredIndex !== null ? hoveredIndex : selectedIndex;

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
        disabled,
        orientation,
        className,
      })}
      role="tablist"
      aria-disabled={disabled ? 'true' : undefined}
    >
      <div
        className={cn(
          'relative flex w-full items-center justify-center',
          orientation === 'horizontal' ? 'h-full flex-row' : 'h-fit flex-col'
        )}
      >
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
                  orientation,
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
                orientation,
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
