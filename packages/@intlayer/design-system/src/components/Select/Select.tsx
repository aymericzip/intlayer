'use client';

import * as SelectPrimitive from '@radix-ui/react-select';
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronsUpDown,
  ChevronUpIcon,
} from 'lucide-react';
import type { ComponentProps, FC } from 'react';
import { cn } from '../../utils/cn';

/**
 * Enum for Select content positioning strategies
 *
 * @enum SelectContentPosition
 */
export enum SelectContentPosition {
  /** Position relative to the trigger with automatic placement */
  POPPER = 'popper',
  /** Align content with the selected item */
  ITEM_ALIGNED = 'item-aligned',
}

const SelectRoot = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

/**
 * Select trigger button component that displays the current selection and opens the dropdown
 *
 * Features comprehensive styling with validation states, focus management, and accessibility support.
 * Uses design tokens for consistent theming across the application.
 *
 * @param validationStyleEnabled - Enables automatic success/error styling based on form validation state
 * @param className - Additional CSS classes for custom styling
 * @param children - Content to display inside the trigger (typically SelectValue)
 *
 * @example
 * ```tsx
 * <Select.Trigger validationStyleEnabled>
 *   <Select.Value placeholder="Choose option..." />
 * </Select.Trigger>
 * ```
 */
const SelectTrigger: FC<
  ComponentProps<typeof SelectPrimitive.Trigger> & {
    /**
     * Enables success/error border styling based on HTML5 validation state
     * @default false
     * @example
     * ```tsx
     * <Select.Trigger validationStyleEnabled>
     *   <Select.Value placeholder="Required field" />
     * </Select.Trigger>
     * ```
     */
    validationStyleEnabled?: boolean;
  }
> = ({ validationStyleEnabled = false, className, children, ...props }) => (
  <SelectPrimitive.Trigger
    className={cn(
      // Base layout and typography
      'flex w-full cursor-pointer items-center justify-between whitespace-nowrap',
      'select-text text-base shadow-none outline-none md:text-sm',

      // Corner shape
      'rounded-xl [corner-shape:squircle] supports-[corner-shape:squircle]:rounded-2xl',

      // Spacing
      'px-2 py-3 md:py-2',

      // Background and text
      'bg-neutral-50 dark:bg-neutral-950',
      'text-text',

      // Focus ring
      'ring-0',
      'focus-visible:outline-none',
      'focus-visible:ring-3',
      'focus-visible:ring-neutral-200',
      'dark:focus-visible:ring-neutral-500',

      'focus-visible:ring-offset-white',
      'dark:focus-visible:ring-offset-neutral-500',

      // Remove box-shadow
      '[box-shadow:none] focus:[box-shadow:none]',

      // States
      'disabled:cursor-not-allowed disabled:opacity-50',
      'aria-invalid:border-error',
      '[&>span]:line-clamp-1',

      // Validation styles
      validationStyleEnabled && 'valid:border-success invalid:border-error',

      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronsUpDown className="size-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
);

/**
 * Scroll up button for select content with long lists
 *
 * Automatically appears when content is scrollable upward, providing intuitive navigation
 * for users with large option lists.
 *
 * @param className - Additional CSS classes for custom styling
 */
const SelectScrollUpButton: FC<
  ComponentProps<typeof SelectPrimitive.ScrollUpButton>
> = ({ className, ...props }) => (
  <SelectPrimitive.ScrollUpButton
    className={cn(
      'flex cursor-default items-center justify-center py-1',
      className
    )}
    {...props}
  >
    <ChevronUpIcon />
  </SelectPrimitive.ScrollUpButton>
);

/**
 * Scroll down button for select content with long lists
 *
 * Automatically appears when content is scrollable downward, providing clear visual
 * indication of additional options below the current view.
 *
 * @param className - Additional CSS classes for custom styling
 */
const SelectScrollDownButton: FC<
  ComponentProps<typeof SelectPrimitive.ScrollDownButton>
> = ({ className, ...props }) => (
  <SelectPrimitive.ScrollDownButton
    className={cn(
      'flex cursor-default items-center justify-center py-1',
      className
    )}
    {...props}
  >
    <ChevronDownIcon />
  </SelectPrimitive.ScrollDownButton>
);

/**
 * Select dropdown content container with positioning and animation
 *
 * Provides the dropdown interface containing all selectable options. Features smooth
 * animations, flexible positioning strategies, and responsive design for optimal UX.
 *
 * @param position - Positioning strategy for the dropdown content
 * @param className - Additional CSS classes for custom styling
 * @param children - Select items, labels, and separators
 *
 * @example
 * ```tsx
 * <Select.Content position={SelectContentPosition.POPPER}>
 *   <Select.Item value="option1">Option 1</Select.Item>
 *   <Select.Item value="option2">Option 2</Select.Item>
 * </Select.Content>
 * ```
 */
export const SelectContent: FC<
  ComponentProps<typeof SelectPrimitive.Content>
> = ({
  className,
  children,
  position = SelectContentPosition.POPPER,
  ...props
}) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      className={cn(
        // Base styles
        'relative z-50 max-h-96 min-w-32 overflow-hidden',
        'rounded-xl shadow-md',

        // Background and text
        'bg-white dark:bg-neutral-950',
        'text-text',

        // Border
        'border border-neutral-200 dark:border-neutral-800',

        // Animations
        'data-[state=closed]:animate-out data-[state=open]:animate-in',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        'data-[side=bottom]:slide-in-from-top-2',
        'data-[side=left]:slide-in-from-right-2',
        'data-[side=right]:slide-in-from-left-2',
        'data-[side=top]:slide-in-from-bottom-2',

        // Positioning adjustments
        position === 'popper' &&
          'data-[side=left]:-translate-x-1 data-[side=top]:-translate-y-1 data-[side=right]:translate-x-1 data-[side=bottom]:translate-y-1',

        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          'p-1',
          position === 'popper' &&
            'h-(--radix-select-trigger-height) w-full min-w-(--radix-select-trigger-width)'
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
);

/**
 * Label component for grouping select options
 *
 * Provides semantic grouping and visual organization of related options within
 * the select dropdown. Enhances accessibility and user experience.
 *
 * @param className - Additional CSS classes for custom styling
 *
 * @example
 * ```tsx
 * <Select.Content>
 *   <Select.Label>Fruits</Select.Label>
 *   <Select.Item value="apple">Apple</Select.Item>
 *   <Select.Item value="banana">Banana</Select.Item>
 *   <Select.Separator />
 *   <Select.Label>Vegetables</Select.Label>
 *   <Select.Item value="carrot">Carrot</Select.Item>
 * </Select.Content>
 * ```
 */
export const SelectLabel: FC<ComponentProps<typeof SelectPrimitive.Label>> = ({
  className,
  ...props
}) => (
  <SelectPrimitive.Label
    className={cn('px-1 py-0.5 font-semibold text-sm', className)}
    {...props}
  />
);

/**
 * Individual selectable item within the dropdown
 *
 * Represents a single option that users can select. Features hover states,
 * selection indicators, and keyboard navigation support for accessible interaction.
 *
 * @param className - Additional CSS classes for custom styling
 * @param children - The display text/content for the option
 *
 * @example
 * ```tsx
 * <Select.Item value="dark-mode">
 *   🌙 Dark Mode
 * </Select.Item>
 * ```
 */
const SelectItem: FC<ComponentProps<typeof SelectPrimitive.Item>> = ({
  className,
  children,
  ...props
}) => (
  <SelectPrimitive.Item
    className={cn(
      'relative flex w-full cursor-pointer select-none items-center rounded-lg py-1.5 pr-8 pl-2 text-sm outline-hidden focus:bg-neutral/10 data-disabled:pointer-events-none data-disabled:opacity-50',
      className
    )}
    {...props}
  >
    <span className="absolute right-2 flex size-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <CheckIcon className="size-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
);

/**
 * Visual separator for grouping options in the dropdown
 *
 * Creates clear visual division between groups of related options,
 * improving readability and organization in complex select menus.
 *
 * @param className - Additional CSS classes for custom styling
 *
 * @example
 * ```tsx
 * <Select.Content>
 *   <Select.Item value="recent">Recent Files</Select.Item>
 *   <Select.Separator />
 *   <Select.Item value="all">All Files</Select.Item>
 * </Select.Content>
 * ```
 */
export const SelectSeparator: FC<
  ComponentProps<typeof SelectPrimitive.Separator>
> = ({ className, ...props }) => (
  <SelectPrimitive.Separator
    className={cn(
      '-mx-1 my-1 h-px',
      'bg-neutral-200 dark:bg-neutral-800',
      className
    )}
    {...props}
  />
);

/**
 * Type definition for the compound Select component with all subcomponents
 */
type SelectType = typeof SelectRoot & {
  /** Group container for organizing related options */
  Group: typeof SelectGroup;
  /** Value display component for the trigger */
  Value: typeof SelectValue;
  /** Trigger button that opens the dropdown */
  Trigger: typeof SelectTrigger;
  /** Scroll up button for long lists */
  ScrollUpButton: typeof SelectScrollUpButton;
  /** Scroll down button for long lists */
  ScrollDownButton: typeof SelectScrollDownButton;
  /** Dropdown content container */
  Content: typeof SelectContent;
  /** Label component for option groups */
  Label: typeof SelectLabel;
  /** Individual selectable item */
  Item: typeof SelectItem;
  /** Visual separator between option groups */
  Separator: typeof SelectSeparator;
};

/**
 * Select - A comprehensive dropdown selection component
 *
 * A fully-featured select component built on Radix UI primitives with extensive customization,
 * accessibility features, and design system integration. Supports single selection with
 * keyboard navigation, validation states, and flexible content positioning.
 *
 * ## Key Features
 * - **Accessibility First**: Full keyboard navigation, screen reader support, and ARIA attributes
 * - **Flexible Positioning**: Multiple positioning strategies for optimal dropdown placement
 * - **Validation Integration**: Built-in support for form validation with visual feedback
 * - **Design System**: Consistent theming with design tokens and style variants
 * - **Responsive Design**: Works seamlessly across desktop and mobile devices
 * - **Rich Content**: Support for icons, separators, labels, and complex option layouts
 *
 * ## Use Cases
 * - Form field selections (theme, language, category)
 * - Settings and configuration options
 * - Filter and sort controls
 * - User preference selections
 * - Any single-choice dropdown interface
 *
 * ## Accessibility
 * - **Keyboard Navigation**: Arrow keys, Enter, Escape, and Home/End support
 * - **Screen Readers**: Proper ARIA labels and state announcements
 * - **Focus Management**: Intuitive focus flow and visual indicators
 * - **High Contrast**: Supports system high contrast modes
 *
 * ## Architecture
 * The Select component follows a compound component pattern with the following structure:
 * - `Select` (root): Manages state and provides context
 * - `Select.Trigger`: Button that displays current value and opens dropdown
 * - `Select.Value`: Displays the selected value with placeholder support
 * - `Select.Content`: Container for the dropdown options
 * - `Select.Item`: Individual selectable options
 * - `Select.Label`: Group labels for organizing options
 * - `Select.Separator`: Visual dividers between option groups
 *
 * @example
 * Basic usage with simple options:
 * ```tsx
 * <Select defaultValue="system">
 *   <Select.Trigger>
 *     <Select.Value placeholder="Choose theme..." />
 *   </Select.Trigger>
 *   <Select.Content>
 *     <Select.Item value="light">☀️ Light</Select.Item>
 *     <Select.Item value="dark">🌙 Dark</Select.Item>
 *     <Select.Item value="system">⚙️ System</Select.Item>
 *   </Select.Content>
 * </Select>
 * ```
 *
 * @example
 * Advanced usage with groups and labels:
 * ```tsx
 * <Select>
 *   <Select.Trigger validationStyleEnabled>
 *     <Select.Value placeholder="Select category..." />
 *   </Select.Trigger>
 *   <Select.Content>
 *     <Select.Label>Web Technologies</Select.Label>
 *     <Select.Item value="react">React</Select.Item>
 *     <Select.Item value="vue">Vue</Select.Item>
 *     <Select.Separator />
 *     <Select.Label>Mobile</Select.Label>
 *     <Select.Item value="react-native">React Native</Select.Item>
 *     <Select.Item value="flutter">Flutter</Select.Item>
 *   </Select.Content>
 * </Select>
 * ```
 *
 * @example
 * Form integration with validation:
 * ```tsx
 * <form>
 *   <Select required name="country">
 *     <Select.Trigger validationStyleEnabled aria-invalid={hasError}>
 *       <Select.Value placeholder="Select country..." />
 *     </Select.Trigger>
 *     <Select.Content position={SelectContentPosition.ITEM_ALIGNED}>
 *       <Select.Item value="us">United States</Select.Item>
 *       <Select.Item value="ca">Canada</Select.Item>
 *       <Select.Item value="uk">United Kingdom</Select.Item>
 *     </Select.Content>
 *   </Select>
 * </form>
 * ```
 */
export const Select = SelectRoot as SelectType;
Select.Group = SelectGroup;
Select.Value = SelectValue;
Select.Trigger = SelectTrigger;
Select.ScrollUpButton = SelectScrollUpButton;
Select.ScrollDownButton = SelectScrollDownButton;
Select.Content = SelectContent;
Select.Label = SelectLabel;
Select.Item = SelectItem;
Select.Separator = SelectSeparator;
