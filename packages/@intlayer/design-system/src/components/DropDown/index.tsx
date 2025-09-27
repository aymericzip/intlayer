import type { FC, HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import { Button, ButtonProps } from '../Button';
import { MaxHeightSmoother } from '../MaxHeightSmoother';

/**
 * Props for the DropDown component
 */
export interface DropDownProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Unique identifier that links the trigger and panel for accessibility.
   * This is used to generate proper ARIA attributes.
   * @example "user-menu"
   * @example "language-selector"
   */
  identifier: string;
}

export type DropDownType = FC<DropDownProps> & {
  Trigger: FC<TriggerProps>;
  Panel: FC<PanelProps>;
};

/**
 * DropDown Component
 *
 * A compound component that provides dropdown/popover functionality with flexible trigger mechanisms.
 * Supports hover, focus, and controlled visibility states with proper accessibility features.
 *
 * @example
 * ```tsx
 * // Basic hover dropdown
 * <DropDown identifier="menu">
 *   <DropDown.Trigger identifier="menu">
 *     Open Menu
 *   </DropDown.Trigger>
 *   <DropDown.Panel identifier="menu" isOverable>
 *     <div>Menu content</div>
 *   </DropDown.Panel>
 * </DropDown>
 *
 * // Focus-based dropdown for accessibility
 * <DropDown identifier="accessible-menu">
 *   <DropDown.Trigger identifier="accessible-menu">
 *     Keyboard Accessible Menu
 *   </DropDown.Trigger>
 *   <DropDown.Panel identifier="accessible-menu" isFocusable>
 *     <div>Accessible content</div>
 *   </DropDown.Panel>
 * </DropDown>
 *
 * // Controlled dropdown
 * <DropDown identifier="controlled">
 *   <DropDown.Trigger identifier="controlled">
 *     Controlled Menu
 *   </DropDown.Trigger>
 *   <DropDown.Panel identifier="controlled" isHidden={!isOpen}>
 *     <div>Controlled content</div>
 *   </DropDown.Panel>
 * </DropDown>
 * ```
 *
 * @component
 * @accessibility
 * - Uses proper ARIA attributes (aria-haspopup, aria-labelledby, etc.)
 * - Supports keyboard navigation with focus management
 * - Screen reader compatible with proper role and labeling
 * - Maintains focus trap within dropdown when needed
 */
export const DropDown: DropDownType = ({
  children,
  className,
  identifier,
  ...props
}) => (
  <div
    className={cn(`group/dropdown relative flex`, className)}
    aria-label={`DropDown ${identifier}`}
    id={`dropdown-container-${identifier}`}
    {...props}
  >
    {children}
  </div>
);

/**
 * Props for the DropDown.Trigger component
 */
export interface TriggerProps extends Partial<ButtonProps> {
  /**
   * Unique identifier that matches the parent DropDown identifier
   * @example "user-menu"
   */
  identifier: string;
}

/**
 * DropDown.Trigger Component
 *
 * The clickable/focusable element that controls the dropdown panel visibility.
 * Built on top of the Button component with enhanced dropdown-specific behaviors.
 *
 * @example
 * ```tsx
 * <DropDown.Trigger identifier="menu">
 *   <div>Click to open</div>
 * </DropDown.Trigger>
 * ```
 *
 * @component
 * @accessibility
 * - Automatically generates appropriate ARIA attributes
 * - Maintains proper focus management across browsers
 * - Works with keyboard navigation (Tab, Enter, Space)
 * - Announces dropdown state to screen readers
 *
 * @note Don't nest Button components inside the Trigger - it's already a button
 */
const Trigger: FC<TriggerProps> = ({
  children,
  identifier,
  className,
  label,
  ...props
}) => (
  <Button
    className={cn('w-full cursor-pointer', className)}
    label={label ?? `Open panel ${identifier}`}
    aria-haspopup="true"
    aria-controls={`dropdown-panel-${identifier}`}
    id={`dropdown-trigger-${identifier}`}
    onClick={(e) => {
      // Ensure focus behavior is consistent across all mobile browsers
      (e.currentTarget as HTMLButtonElement).focus();
    }}
    // onBlur={(e) => {
    //   // Default behavior: ensure the trigger is unfocused when leaving the dropdown
    //   e.currentTarget.blur();
    // }}
    variant="none"
    {...props}
  >
    {children}
  </Button>
);

/**
 * Alignment options for the dropdown panel relative to the trigger
 */
export enum DropDownAlign {
  /** Align panel to the start (left in LTR, right in RTL) of the trigger */
  START = 'start',
  /** Align panel to the end (right in LTR, left in RTL) of the trigger */
  END = 'end',
}

/**
 * Props for the DropDown.Panel component
 */
export interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Whether the panel should be visible when the trigger is focused.
   * Enables keyboard accessibility for the dropdown.
   * @default false
   */
  isFocusable?: boolean;

  /**
   * Controls panel visibility explicitly.
   * - `true`: Panel is hidden
   * - `false`: Panel is visible
   * - `undefined`: Panel visibility controlled by hover/focus states
   * @default undefined
   */
  isHidden?: boolean;

  /**
   * Whether the panel should be visible when hovering over the trigger.
   * Provides quick access via mouse interaction.
   * @default false
   */
  isOverable?: boolean;

  /**
   * Unique identifier that matches the parent DropDown identifier
   * @example "user-menu"
   */
  identifier: string;

  /**
   * Horizontal alignment of the panel relative to the trigger
   * @default DropDownAlign.START
   */
  align?: DropDownAlign | `${DropDownAlign}`;
}

/**
 * DropDown.Panel Component
 *
 * The content area that appears when the dropdown is triggered.
 * Supports multiple trigger methods (hover, focus, controlled) with smooth animations.
 *
 * @example
 * ```tsx
 * // Hover-triggered panel
 * <DropDown.Panel identifier="menu" isOverable>
 *   <div>Content appears on hover</div>
 * </DropDown.Panel>
 *
 * // Focus-triggered panel (accessible)
 * <DropDown.Panel identifier="menu" isFocusable>
 *   <div>Content appears on focus</div>
 * </DropDown.Panel>
 *
 * // Controlled panel
 * <DropDown.Panel identifier="menu" isHidden={!isOpen}>
 *   <div>Content visibility controlled externally</div>
 * </DropDown.Panel>
 *
 * // Right-aligned panel
 * <DropDown.Panel identifier="menu" align={DropDownAlign.END} isOverable>
 *   <div>Right-aligned content</div>
 * </DropDown.Panel>
 * ```
 *
 * @component
 * @accessibility
 * - Proper ARIA attributes (role, aria-labelledby, aria-hidden)
 * - Smooth height transitions with MaxHeightSmoother
 * - Keyboard navigation support when isFocusable is enabled
 * - Screen reader announcements for state changes
 */
const Panel: FC<PanelProps> = ({
  children,
  isHidden = undefined,
  isOverable = false,
  isFocusable = false,
  align = DropDownAlign.START,
  identifier,
  className,
  ...props
}) => (
  <div
    className={cn(
      'absolute top-[calc(100%+0.5rem)] z-[1000] min-w-full',
      align === DropDownAlign.START && 'left-0',
      align === DropDownAlign.END && 'right-0',
      className
    )}
    aria-hidden={isHidden}
    role="region"
    aria-labelledby={`dropdown-trigger-${identifier}`}
    id={`dropdown-panel-${identifier}`}
  >
    <MaxHeightSmoother
      isHidden={isHidden}
      className={cn(
        'overflow-x-visible',
        isHidden === false && 'invisible',
        isHidden === true && 'visible',
        isOverable &&
          'group-hover/dropdown:visible group-hover/dropdown:grid-rows-[1fr]',
        isFocusable &&
          'group-focus-within/dropdown:visible group-focus-within/dropdown:grid-rows-[1fr]'
      )}
      {...props}
    >
      {children}
    </MaxHeightSmoother>
  </div>
);

DropDown.Trigger = Trigger;
DropDown.Panel = Panel;
