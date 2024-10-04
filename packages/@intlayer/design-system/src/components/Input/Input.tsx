import { cva, type VariantProps } from 'class-variance-authority';
import {
  forwardRef,
  type DetailedHTMLProps,
  type InputHTMLAttributes,
} from 'react';

export const inputVariants = cva('', {
  variants: {
    variant: {
      default: [
        'w-full select-text resize-none rounded-xl border-2 bg-input-background px-2 py-1 text-sm text-input-text shadow-none outline-0 transition-all dark:bg-input-background-dark dark:text-input-text-dark',
        'border-input-border hover:border-input-border-hover focus:border-input-border-focus focus:outline-0 focus:[box-shadow:none] dark:border-input-border-dark dark:hover:border-input-border-hover-dark dark:focus:border-input-border-focus',
        'aria-[invalid=true]:border-error dark:aria-[invalid=true]:border-error-dark',
      ],
      invisible: [
        'w-full border-none bg-inherit text-inherit outline-none ring-0',
      ],
    },
    validationStyleEnabled: {
      disabled: '',
      enabled:
        'valid:border-success invalid:border-error dark:valid:border-success-dark dark:invalid:border-error-dark',
    },
  },
  defaultVariants: {
    variant: 'default',
    validationStyleEnabled: 'disabled',
  },
});

export type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  validationStyleEnabled?: boolean;
} & Omit<VariantProps<typeof inputVariants>, 'validationStyleEnabled'>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ validationStyleEnabled = false, variant, className, ...props }, ref) => (
    <input
      ref={ref}
      className={inputVariants({
        variant,
        validationStyleEnabled: validationStyleEnabled ? 'enabled' : 'disabled',
        className,
      })}
      {...props}
    />
  )
);

Input.displayName = 'Input';
