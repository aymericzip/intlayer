import { cn } from '@utils/cn';
import type { DetailedHTMLProps, FC } from 'react';

/**
 * Props for the InformationTag component.
 * Extends standard HTML element attributes for maximum flexibility.
 */
type CopiedTextInformationProps = DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
>;

/**
 * InformationTag Component
 *
 * A lightweight component that displays informational text with a distinctive info icon (ⓘ).
 * Perfect for showing contextual hints, supplementary information, or subtle guidance text.
 *
 * @component
 * @example
 * Basic usage:
 * ```tsx
 * <InformationTag>This field is required</InformationTag>
 * ```
 *
 * @example
 * With custom styling:
 * ```tsx
 * <InformationTag className="text-blue-600 font-medium">
 *   Pro tip: Use keyboard shortcuts for faster navigation
 * </InformationTag>
 * ```
 *
 * @example
 * Form field context:
 * ```tsx
 * <div>
 *   <input type="email" placeholder="your@email.com" />
 *   <InformationTag>We'll never share your email address</InformationTag>
 * </div>
 * ```
 *
 * @example
 * Status information:
 * ```tsx
 * <InformationTag className="text-green-500">
 *   Changes saved automatically
 * </InformationTag>
 * ```
 *
 * Features:
 * - Lightweight and semantic HTML structure using <i> tag
 * - Distinctive info icon (ⓘ) for visual recognition
 * - Default subtle styling with neutral colors
 * - Fully customizable with className overrides
 * - Supports all standard HTML element attributes
 * - Screen reader friendly with meaningful semantic content
 *
 * Accessibility:
 * - Uses semantic <i> tag which is announced by screen readers
 * - Info icon (ⓘ) provides visual context for sighted users
 * - Text content is fully accessible and readable
 * - Supports ARIA attributes through props spreading
 *
 * @param props - Component props extending HTML element attributes
 * @param props.children - The informational text content to display
 * @param props.className - Additional CSS classes for custom styling
 * @param props.title - Optional tooltip text (HTML title attribute)
 * @param props.role - ARIA role (defaults to implicit role from <i> tag)
 * @param props.aria-label - ARIA label for screen readers
 * @param props.id - Unique identifier for the element
 * @param props.onClick - Click event handler
 * @param props.onMouseEnter - Mouse enter event handler
 * @param props.onMouseLeave - Mouse leave event handler
 * @param props.style - Inline styles object
 * @param props.data-* - Data attributes for testing or tracking
 * @param props...rest - All other standard HTML element attributes
 *
 * @returns A rendered information tag with icon and text content
 */
export const InformationTag: FC<CopiedTextInformationProps> = ({
  className,
  children,
  ...props
}) => (
  <i className={cn('text-neutral-400 text-xs', className)} {...props}>
    ⓘ {children}
  </i>
);
