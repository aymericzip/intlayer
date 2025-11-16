import { cva, type VariantProps } from 'class-variance-authority';
import type { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';

// Optional: your own cn helper to merge class names
const cn = (...classes: (string | undefined | false | null)[]) =>
  classes.filter(Boolean).join(' ');

export const inputVariants = cva(
  [
    // base styles
    'w-full select-text resize-none text-base shadow-none outline-none',
    'transition-shadow duration-100 md:text-sm',
    'ring-0', // base ring
    'disabled:opacity-50',

    // Corner shape
    'rounded-xl [supports-[corner-shape:squircle]:rounded-2xl]',
    '[supports-[corner-shape:squircle]:rounded-4xl]',
  ].join(' '),
  {
    variants: {
      variant: {
        default: [
          'text-text',
          'bg-neutral-50 dark:bg-neutral-950',
          'ring-neutral-100 dark:ring-neutral-700',
          'ring-offset-neutral-100 dark:ring-offset-neutral-700',

          // Focus ring + animation
          'focus-visible:outline-none',

          'disabled:ring-0',
          'focus-visible:ring-3',

          // Remove any weird box-shadow
          '[box-shadow:none] focus:[box-shadow:none]',

          // aria-invalid border color
          'aria-invalid:border-error',
        ].join(' '),
        invisible: [
          'border-none bg-inherit text-inherit outline-none ring-0',
        ].join(' '),
      },
      size: {
        md: 'px-2 py-3 md:py-2',
        lg: 'p-4',
      },
      validationStyleEnabled: {
        disabled: '',
        enabled: 'valid:border-success invalid:border-error',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      validationStyleEnabled: 'disabled',
    },
  }
);

export enum InputVariant {
  DEFAULT = 'default',
  INVISIBLE = 'invisible',
}

export enum InputSize {
  MD = 'md',
  LG = 'lg',
}

export type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  validationStyleEnabled?: boolean;
} & Omit<
    VariantProps<typeof inputVariants>,
    'validationStyleEnabled' | 'variant' | 'size'
  > & {
    variant?: InputVariant;
    size?: InputSize;
  };

export const Input: FC<InputProps> = ({
  validationStyleEnabled = false,
  variant,
  size,
  className,
  ...props
}) => (
  <input
    className={cn(
      inputVariants({
        variant,
        size,
        validationStyleEnabled: validationStyleEnabled ? 'enabled' : 'disabled',
      }),
      className // <- merged *outside* cva
    )}
    {...props}
  />
);
