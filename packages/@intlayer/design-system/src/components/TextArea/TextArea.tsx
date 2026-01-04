import { cn } from '@utils/cn';
import type { VariantProps } from 'class-variance-authority';
import type { DetailedHTMLProps, FC, TextareaHTMLAttributes } from 'react';
import { type InputVariant, inputVariants } from '../Input';

/**
 * Props for the TextArea component.
 *
 * Extends standard HTML textarea attributes with additional design system variants
 * and validation styling options.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <TextArea placeholder="Enter your message..." />
 *
 * // With error validation styling
 * <TextArea
 *   value={message}
 *   onChange={handleChange}
 *   variant={InputVariant.ERROR}
 *   validationStyleEnabled={true}
 *   placeholder="Message is required"
 * />
 *
 * // Large multiline input
 * <TextArea
 *   rows={6}
 *   cols={50}
 *   variant={InputVariant.DEFAULT}
 *   className="min-h-[120px]"
 *   placeholder="Write a detailed description..."
 * />
 * ```
 */
export type TextAreaProps = DetailedHTMLProps<
  DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >,
  HTMLTextAreaElement
> & {
  /** Enable validation styling based on the variant prop */
  validationStyleEnabled?: boolean;
} & Omit<
    VariantProps<typeof inputVariants>,
    'validationStyleEnabled' | 'variant'
  > & {
    /** Visual variant of the textarea (default, success, error, warning, etc.) */
    variant?: InputVariant | `${InputVariant}`;
  };

/**
 * TextArea Component
 *
 * A flexible textarea component that extends the standard HTML textarea with
 * design system styling variants, validation states, and consistent visual appearance.
 *
 * ## Features
 * - **Variant Support**: Multiple visual states (default, error, success, warning)
 * - **Validation Styling**: Optional validation feedback styling
 * - **Resize Control**: Disabled by default for consistent layout
 * - **Design System Integration**: Uses shared input variants for consistency
 * - **Accessibility**: Maintains all standard textarea accessibility features
 *
 * ## Use Cases
 * - Multi-line text input forms
 * - Comment and message composition
 * - Description and content fields
 * - Feedback and review forms
 * - Code snippet input (when combined with monospace styling)
 *
 * @example
 * ```tsx
 * // Basic textarea
 * <TextArea
 *   placeholder="Enter your thoughts..."
 *   rows={4}
 * />
 *
 * // Controlled with validation
 * const [content, setContent] = useState('');
 * const hasError = content.length < 10;
 *
 * <TextArea
 *   value={content}
 *   onChange={(e) => setContent(e.target.value)}
 *   variant={hasError ? InputVariant.ERROR : InputVariant.SUCCESS}
 *   validationStyleEnabled={true}
 *   placeholder="Minimum 10 characters required"
 *   className="min-h-[100px]"
 * />
 * ```
 */
export const TextArea: FC<TextAreaProps> = ({
  className,
  variant,
  validationStyleEnabled = false,
  ...props
}) => (
  <textarea
    className={cn(
      'resize-none',
      inputVariants({
        variant,
        validationStyleEnabled: validationStyleEnabled ? 'enabled' : 'disabled',
        className,
      })
    )}
    {...props}
  />
);
