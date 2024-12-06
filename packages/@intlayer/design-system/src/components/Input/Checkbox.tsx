import { cva, type VariantProps } from 'class-variance-authority';
import {
  forwardRef,
  useId,
  type DetailedHTMLProps,
  type InputHTMLAttributes,
} from 'react';

export const checkboxVariants = cva('', {
  variants: {
    variant: {
      default: [
        'pointer rounded border-2 bg-input-background text-input-text shadow-none outline-0 transition-all',
        'border-input-border hover:border-input-border-hover focus:border-input-border-focus focus:outline-0 focus:[box-shadow:none]',
        'checked:bg-checkbox-checked checked:border-checkbox-checked-border',
        'disabled:opacity-50',
      ],
    },
    size: {
      sm: 'size-4',
      md: 'size-5',
      lg: 'size-6',
    },
    color: {
      primary: 'accent-primary dark:accent-primary-dark',
      secondary: 'accent-secondary dark:accent-secondary-dark',
      destructive: 'accent-destructive dark:accent-destructive-dark',
      neutral: 'accent-neutral dark:accent-neutral-dark',
      light: 'accent-light dark:accent-light-dark',
      text: 'accent-text dark:accent-text-dark',
      dark: 'accent-dark dark:accent-dark-dark',
      error: 'accent-error dark:accent-error-dark',
      success: 'accent-success dark:accent-success-dark',
      custom: 'accent-custom dark:accent-custom-dark',
    },
    validationStyleEnabled: {
      disabled: '',
      enabled: 'valid:border-success invalid:border-error',
    },
  },
  defaultVariants: {
    variant: 'default',
    color: 'primary',
    validationStyleEnabled: 'disabled',
    size: 'md',
  },
});

export type CheckboxProps = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'size'
> & {
  validationStyleEnabled?: boolean;
  label?: string;
} & Omit<VariantProps<typeof checkboxVariants>, 'validationStyleEnabled'>;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      validationStyleEnabled = false,
      label,
      size,
      color,
      variant,
      className,
      ...props
    },
    ref
  ) => {
    const id = useId();
    return (
      <>
        <input
          ref={ref}
          type="checkbox"
          className={checkboxVariants({
            variant,
            size,
            color,
            validationStyleEnabled: validationStyleEnabled
              ? 'enabled'
              : 'disabled',
            className,
          })}
          id={id}
          {...props}
        />
        <label htmlFor={id}>{label}</label>
      </>
    );
  }
);

Checkbox.displayName = 'Checkbox';
