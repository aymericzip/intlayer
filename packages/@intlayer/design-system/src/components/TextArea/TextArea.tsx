import type { VariantProps } from 'class-variance-authority';
import {
  forwardRef,
  type DetailedHTMLProps,
  type TextareaHTMLAttributes,
} from 'react';
import { cn } from '../../utils/cn';
import { inputVariants } from '../Input';

export type TextAreaProps = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {
  validationStyleEnabled?: boolean;
} & Omit<VariantProps<typeof inputVariants>, 'validationStyleEnabled'>;

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, variant, validationStyleEnabled = false, ...props }, ref) => (
    <textarea
      className={cn(
        'resize-none',
        inputVariants({
          variant,
          validationStyleEnabled: validationStyleEnabled
            ? 'enabled'
            : 'disabled',
          className,
        })
      )}
      ref={ref}
      rows={1}
      {...props}
    />
  )
);

TextArea.displayName = 'TextArea';
