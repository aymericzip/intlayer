import { cva, type VariantProps } from 'class-variance-authority';
import type { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';

// Optional: your own cn helper to merge class names
const cn = (...classes: (string | undefined | false | null)[]) =>
  classes.filter(Boolean).join(' ');

export const inputVariants = cva(
  [
    // base styles
    'w-full select-text resize-none text-base shadow-none outline-none',
    'transition-all duration-300 md:text-sm',
    'ring-0', // base ring
    'disabled:opacity-50',

    // Corner shape
    'rounded-xl [corner-shape:squircle] supports-[corner-shape:squircle]:rounded-2xl',
  ].join(' '),
  {
    variants: {
      variant: {
        default: [
          'text-text',
          'bg-neutral-50 dark:bg-neutral-950',
          'ring-text/20',

          // Focus ring
          'disabled:ring-0',
          'hover:ring-3',
          'focus-visible:outline-none focus-visible:ring-4',

          // Remove any weird box-shadow
          '[box-shadow:none] focus:[box-shadow:none]',

          // aria-invalid border color
          'aria-invalid:border-error',
        ].join(' '),
        invisible: 'border-none bg-inherit text-inherit outline-none ring-0',
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
    variant?: InputVariant | `${InputVariant}`;
    size?: InputSize | `${InputSize}`;
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
      className
    )}
    {...props}
  />
);
