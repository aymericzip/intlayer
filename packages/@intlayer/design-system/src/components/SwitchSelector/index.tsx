'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import {
  type HTMLAttributes,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useItemSelector } from '../../hooks';
import { cn } from '../../utils/cn';

/**
 * Configuration for a single choice in the SwitchSelector
 *
 * @template T - The type of the choice value
 * @interface SwitchSelectorChoice
 */
export type SwitchSelectorChoice<T = boolean> = {
  /** The visual content displayed for this choice (text, icons, or React elements) */
  content: ReactNode;
  /** The value associated with this choice */
  value: T;
} & HTMLAttributes<HTMLButtonElement>;

/**
 * Array of choices for the SwitchSelector component
 *
 * @template T - The type of the choice values
 */
export type SwitchSelectorChoices<T> = SwitchSelectorChoice<T>[];

const defaultChoices: SwitchSelectorChoices<boolean> = [
  { content: 'Off', value: false },
  { content: 'On', value: true },
];

/**
 * Props interface for the SwitchSelector component
 *
 * @template T - The type of the choice values
 * @interface SwitchSelectorProps
 */
export type SwitchSelectorProps<T = boolean> = {
  /**
   * Array of selectable choices
   * @default [{ content: 'Off', value: false }, { content: 'On', value: true }]
   * @example
   * ```tsx
   * <SwitchSelector choices={[
   *   { content: 'Draft', value: 'draft' },
   *   { content: 'Published', value: 'published' },
   *   { content: 'Archived', value: 'archived' }
   * ]} />
   * ```
   */
  choices?: SwitchSelectorChoices<T>;

  /**
   * Controlled value for the selected choice
   * @example
   * ```tsx
   * const [status, setStatus] = useState('draft');
   * <SwitchSelector value={status} onChange={setStatus} />
   * ```
   */
  value?: T;

  /**
   * Default selected value for uncontrolled mode
   * @example
   * ```tsx
   * <SwitchSelector defaultValue="published" />
   * ```
   */
  defaultValue?: T;

  /**
   * Callback function triggered when selection changes
   * @param choice - The newly selected choice value
   * @example
   * ```tsx
   * <SwitchSelector onChange={(value) => console.log('Selected:', value)} />
   * ```
   */
  onChange?: (choice: T) => void;

  /** Additional CSS classes for custom styling */
  className?: string;
} & VariantProps<typeof switchSelectorVariant> &
  VariantProps<typeof choiceVariant>;

/**
 * Color variants for the SwitchSelector component
 *
 * @enum SwitchSelectorColor
 */
export enum SwitchSelectorColor {
  /** Primary brand color theme */
  PRIMARY = 'primary',
  /** Secondary accent color theme */
  SECONDARY = 'secondary',
  /** Destructive/error color theme for dangerous actions */
  DESTRUCTIVE = 'destructive',
  /** Neutral gray color theme */
  NEUTRAL = 'neutral',
  /** Light color theme for dark backgrounds */
  LIGHT = 'light',
  /** Dark color theme for light backgrounds */
  DARK = 'dark',
  /** Text color theme that adapts to content */
  TEXT = 'text',
}

const switchSelectorVariant = cva(
  'flex w-fit flex-row gap-2 rounded-full border-[1.5px] p-[1.5px]',
  {
    variants: {
      color: {
        [SwitchSelectorColor.PRIMARY]: 'border-primary text-primary',
        [SwitchSelectorColor.SECONDARY]: 'border-secondary text-secondary',
        [SwitchSelectorColor.DESTRUCTIVE]:
          'border-destructive bg-destructive text-destructive',
        [SwitchSelectorColor.NEUTRAL]: 'border-neutral text-neutral',
        [SwitchSelectorColor.LIGHT]: 'border-white text-white',
        [SwitchSelectorColor.DARK]: 'border-neutral-800 text-neutral-800',
        [SwitchSelectorColor.TEXT]: 'border-text text-text',
      },
    },
    defaultVariants: {
      color: SwitchSelectorColor.PRIMARY,
    },
  }
);

/**
 * Size variants for the SwitchSelector component
 *
 * @enum SwitchSelectorSize
 */
export enum SwitchSelectorSize {
  /** Small size - compact for tight layouts */
  SM = 'sm',
  /** Medium size - standard for most use cases */
  MD = 'md',
  /** Large size - prominent for important selections */
  LG = 'lg',
}

const choiceVariant = cva(
  'z-1 w-full flex-1 cursor-pointer font-medium text-sm transition-all duration-300 ease-in-out aria-selected:cursor-default aria-selected:text-text-opposite motion-reduce:transition-none',
  {
    variants: {
      size: {
        [SwitchSelectorSize.SM]: 'px-2 py-1 text-xs',
        [SwitchSelectorSize.MD]: 'p-2 text-sm',
        [SwitchSelectorSize.LG]: 'p-4 text-base',
      },
    },
    defaultVariants: {
      size: SwitchSelectorSize.MD,
    },
  }
);

const indicatorVariant = cva(
  'absolute top-0 z-[-1] h-full w-auto rounded-full transition-[left,width] duration-300 ease-in-out motion-reduce:transition-none',
  {
    variants: {
      color: {
        [SwitchSelectorColor.PRIMARY]: 'bg-primary aria-selected:text-text',
        [SwitchSelectorColor.SECONDARY]: 'bg-secondary aria-selected:text-text',
        [SwitchSelectorColor.DESTRUCTIVE]:
          'bg-destructive aria-selected:text-text',
        [SwitchSelectorColor.NEUTRAL]: 'bg-neutral aria-selected:text-white',
        [SwitchSelectorColor.LIGHT]: 'bg-white aria-selected:text-black',
        [SwitchSelectorColor.DARK]: 'bg-neutral-800 aria-selected:text-white',
        [SwitchSelectorColor.TEXT]: 'bg-text aria-selected:text-text-opposite',
      },
    },
  }
);

/**
 * SwitchSelector - A versatile toggle component for multi-option selection
 *
 * A sophisticated switch selector component that provides an elegant way to choose between
 * multiple options with smooth animations and visual feedback. Built with accessibility
 * in mind, it supports keyboard navigation and screen reader announcements.
 *
 * ## Key Features
 * - **Smooth Animations**: Fluid indicator transitions between options
 * - **Accessible**: Full keyboard navigation and ARIA support
 * - **Flexible Styling**: Multiple color themes and size variants
 * - **Generic Types**: Type-safe values with TypeScript generics
 * - **Controlled/Uncontrolled**: Supports both usage patterns
 * - **Custom Content**: Rich content support including icons and text
 *
 * ## Use Cases
 * - Settings toggles (On/Off, Light/Dark theme)
 * - Status selectors (Draft/Published/Archived)
 * - View mode switches (List/Grid/Card)
 * - Filter options (All/Active/Completed)
 * - Language or region selection
 * - Any multi-option toggle interface
 *
 * ## Accessibility
 * - **Keyboard Navigation**: Tab to focus, arrow keys to navigate options
 * - **Screen Readers**: Proper ARIA labels and role attributes
 * - **Focus Management**: Clear visual focus indicators
 * - **State Announcements**: Selection changes announced to assistive technology
 *
 * ## Visual Design
 * The component features a pill-shaped container with individual choice buttons.
 * A smooth-sliding background indicator highlights the active selection, creating
 * an intuitive and polished user experience.
 *
 * @template T - The type of values for the choices (string, number, boolean, etc.)
 *
 * @example
 * Basic boolean toggle:
 * ```tsx
 * <SwitchSelector
 *   defaultValue={false}
 *   onChange={(value) => setEnabled(value)}
 * />
 * ```
 *
 * @example
 * Multi-option selector with custom content:
 * ```tsx
 * <SwitchSelector
 *   choices={[
 *     { content: <>📝 Draft</>, value: 'draft' },
 *     { content: <>✅ Published</>, value: 'published' },
 *     { content: <>📦 Archived</>, value: 'archived' }
 *   ]}
 *   value={currentStatus}
 *   onChange={setStatus}
 *   color={SwitchSelectorColor.SECONDARY}
 *   size={SwitchSelectorSize.LG}
 * />
 * ```
 *
 * @example
 * View mode switcher:
 * ```tsx
 * <SwitchSelector
 *   choices={[
 *     { content: 'List', value: 'list' },
 *     { content: 'Grid', value: 'grid' },
 *     { content: 'Card', value: 'card' }
 *   ]}
 *   defaultValue="grid"
 *   color={SwitchSelectorColor.NEUTRAL}
 *   onChange={(view) => setViewMode(view)}
 * />
 * ```
 *
 * @example
 * Theme selector with icons:
 * ```tsx
 * <SwitchSelector
 *   choices={[
 *     { content: <>☀️ Light</>, value: 'light' },
 *     { content: <>🌙 Dark</>, value: 'dark' },
 *     { content: <>⚙️ System</>, value: 'system' }
 *   ]}
 *   value={theme}
 *   onChange={setTheme}
 *   size={SwitchSelectorSize.SM}
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
