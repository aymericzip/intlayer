import { cn } from '@utils/cn';
import type { FC, LabelHTMLAttributes } from 'react';

/**
 * Props for the Label component
 */
export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * The ID of the form control this label is associated with.
   * This creates the accessible relationship between the label and its control.
   * @example "email-input"
   * @example "password-field"
   */
  htmlFor?: string;

  /**
   * Whether the associated form control is required.
   * Adds visual indicator and updates ARIA attributes.
   * @default false
   */
  required?: boolean;

  /**
   * Whether the associated form control is disabled.
   * Updates styling to indicate disabled state.
   * @default false
   */
  disabled?: boolean;

  /**
   * Additional CSS classes for custom styling
   * @example "text-red-600 font-bold"
   */
  className?: string;
}

/**
 * Label Component
 *
 * A form label component that provides accessible labeling for form controls.
 * Establishes proper relationships between labels and their associated form elements
 * with visual indicators for required and disabled states.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Label htmlFor="email">Email Address</Label>
 * <input id="email" type="email" />
 *
 * // Required field
 * <Label htmlFor="password" required>Password</Label>
 * <input id="password" type="password" required />
 *
 * // Disabled field
 * <Label htmlFor="disabled-field" disabled>Disabled Field</Label>
 * <input id="disabled-field" type="text" disabled />
 *
 * // With custom styling
 * <Label htmlFor="custom" className="text-blue-600 font-semibold">
 *   Custom Styled Label
 * </Label>
 * ```
 *
 * @component
 * @accessibility
 * - Uses semantic HTML <label> element
 * - Properly associates with form controls via htmlFor/id relationship
 * - Supports click-to-focus behavior automatically
 * - Visual indicators for required and disabled states
 * - Screen reader compatible with proper ARIA relationships
 */
export const Label: FC<LabelProps> = ({
  htmlFor,
  required = false,
  disabled = false,
  className,
  children,
  ...props
}) => (
  <label
    className={cn(
      'select-none font-medium text-sm leading-none',
      'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      disabled && 'cursor-not-allowed text-muted-foreground opacity-70',
      className
    )}
    htmlFor={htmlFor}
    {...props}
  >
    {children}
    {required && (
      <span
        className="ml-1 text-destructive"
        aria-label="required"
        title="This field is required"
      >
        *
      </span>
    )}
  </label>
);
