import {
  forwardRef,
  type DetailedHTMLProps,
  type TextareaHTMLAttributes,
} from 'react';
import { cn } from '../../utils/cn';

type TextAreaProps = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {
  validationStyleEnabled?: boolean;
};

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, validationStyleEnabled = false, ...props }, ref) => (
    <textarea
      className={cn(
        'bg-input-background dark:bg-input-background-dark text-input-text dark:text-input-text-dark w-full select-text resize-none rounded-xl border-2 px-2 py-1 text-sm shadow-none outline-0 transition-all',
        'border-input-border dark:border-input-border-dark hover:border-input-border-hover dark:hover:border-input-border-hover-dark focus:border-input-border-focus dark:focus:border-input-border-focus focus:outline-0 focus:[box-shadow:none]',
        'aria-[invalid=true]:border-error dark:aria-[invalid=true]:border-error-dark',
        validationStyleEnabled &&
          'valid:border-success dark:valid:border-success-dark invalid:border-error dark:invalid:border-error-dark',
        className
      )}
      ref={ref}
      rows={1}
      {...props}
    />
  )
);

TextArea.displayName = 'TextArea';
