import { cva, type VariantProps } from 'class-variance-authority';
import { FC, type DetailedHTMLProps, type InputHTMLAttributes } from 'react';

export const inputVariants = cva('', {
  variants: {
    variant: {
      default: [
        'w-full select-text resize-none rounded-xl border-2 bg-input-background text-sm text-input-text shadow-none outline-0 transition-all dark:bg-input-background-dark dark:text-input-text-dark',
        'border-input-border hover:border-input-border-hover focus:border-input-border-focus focus:outline-0 focus:[box-shadow:none] dark:border-input-border-dark dark:hover:border-input-border-hover-dark dark:focus:border-input-border-focus',
        'aria-[invalid=true]:border-error dark:aria-[invalid=true]:border-error-dark',
        'disabled:opacity-50',
      ],
      invisible: [
        'w-full border-none bg-inherit text-inherit outline-none ring-0',
      ],
    },
    size: {
      md: 'px-2 py-1 max-md:py-3',
      lg: 'px-4 py-2 max-md:py-4',
    },
    validationStyleEnabled: {
      disabled: '',
      enabled:
        'valid:border-success invalid:border-error dark:valid:border-success-dark dark:invalid:border-error-dark',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
    validationStyleEnabled: 'disabled',
  },
});

export type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  validationStyleEnabled?: boolean;
} & Omit<VariantProps<typeof inputVariants>, 'validationStyleEnabled'>;

export const Input: FC<InputProps> = (
  { validationStyleEnabled = false, variant, size, className, ...props },
  ref
) => (
  <input
    ref={ref}
    className={inputVariants({
      variant,
      size,
      validationStyleEnabled: validationStyleEnabled ? 'enabled' : 'disabled',
      className,
    })}
    {...props}
  />
);
