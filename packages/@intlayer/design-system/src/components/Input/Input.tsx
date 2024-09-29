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
        'bg-input-background dark:bg-input-background-dark text-input-text dark:text-input-text-dark w-full select-text resize-none rounded-xl border-2 px-2 py-1 text-sm shadow-none outline-0 transition-all',
        'border-input-border dark:border-input-border-dark hover:border-input-border-hover dark:hover:border-input-border-hover-dark focus:border-input-border-focus dark:focus:border-input-border-focus focus:outline-0 focus:[box-shadow:none]',
        'aria-[invalid=true]:border-error dark:aria-[invalid=true]:border-error-dark',
      ],
      invisible: [
        'w-full border-none bg-inherit text-inherit outline-none ring-0',
      ],
    },
    validationStyleEnabled: {
      disabled: '',
      enabled:
        'valid:border-success dark:valid:border-success-dark invalid:border-error dark:invalid:border-error-dark',
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
