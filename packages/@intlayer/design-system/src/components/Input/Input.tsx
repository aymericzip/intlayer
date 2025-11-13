import { cva, type VariantProps } from 'class-variance-authority';
import type { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';

// Optional: your own cn helper to merge class names
const cn = (...classes: (string | undefined | false | null)[]) =>
  classes.filter(Boolean).join(' ');

export const inputVariants = cva(
  [
    // base styles
    'w-full select-text resize-none rounded-xl text-base shadow-none outline-none',
    'transition-shadow duration-100 md:text-sm',
    'ring-0', // base ring
    'disabled:opacity-50',
  ].join(' '),
  {
    variants: {
      variant: {
        default: [
          'text-text',
          'bg-white dark:bg-neutral-950',

          // Focus ring + animation
          'focus-visible:outline-none',

          'focus-visible:ring-3',
          'focus-visible:ring-neutral-200',
          'dark:focus-visible:ring-neutral-500',

          'focus-visible:ring-offset-2',
          'focus-visible:ring-offset-white',
          'dark:focus-visible:ring-offset-neutral-500',

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
        md: 'px-2 py-3',
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
