import type { VariantProps } from 'class-variance-authority';
import {
  forwardRef,
  type TextareaHTMLAttributes,
  type DetailedHTMLProps,
} from 'react';
import { cn } from '../../utils/cn';
import { inputVariants } from '../Input';

export type TextAreaProps = DetailedHTMLProps<
  DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >,
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
      {...props}
    />
  )
);

TextArea.displayName = 'TextArea';
