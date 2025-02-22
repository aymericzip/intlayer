import { cva, type VariantProps } from 'class-variance-authority';
import type { LucideIcon } from 'lucide-react';
import {
  type ButtonHTMLAttributes,
  type DetailedHTMLProps,
  type FC,
} from 'react';
import { Loader } from '../Loader';

const buttonIconVariants = cva('', {
  variants: {
    size: {
      sm: 'size-3 absolute top-1/2 -translate-y-1/2',
      md: 'size-4 absolute top-1/2 -translate-y-1/2',
      lg: 'size-5 absolute top-1/2 -translate-y-1/2',
      xl: 'size-6 absolute top-1/2 -translate-y-1/2',
      'icon-sm': 'size-3',
      'icon-md': 'size-4',
      'icon-lg': 'size-5',
      'icon-xl': 'size-6',
    },
    position: {
      left: 'left-3',
      right: 'right-3',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const buttonVariants = cva(
  'relative truncate whitespace-nowrap font-medium transition focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'min-h-7 px-3 max-md:py-1 text-xs',
        md: 'min-h-8 px-6 max-md:py-2 text-sm',
        lg: 'min-h-10 px-8 max-md:py-3 text-lg',
        xl: 'min-h-11 px-10 max-md:py-4 text-xl',
        'icon-sm': 'p-1.5',
        'icon-md': 'p-1.5',
        'icon-lg': 'p-2',
        'icon-xl': 'p-3',
      },
      variant: {
        default: 'rounded-lg text-text-opposite dark:text-text-opposite-dark',
        none: 'border-none bg-opacity-0 text-inherit hover:bg-opacity-0 dark:bg-opacity-0 dark:text-inherit dark:hover:bg-opacity-0',
        outline:
          'rounded-lg border-[1.5px] bg-opacity-0 hover:bg-opacity-30 dark:bg-opacity-0',
        link: 'h-auto justify-start border-inherit bg-transparent px-1 underline-offset-4 hover:bg-transparent hover:underline dark:bg-transparent hover:dark:bg-transparent',
        'invisible-link':
          'h-auto justify-start border-inherit bg-transparent px-1 underline-offset-4 hover:bg-transparent dark:bg-transparent hover:dark:bg-transparent',
        hoverable:
          'rounded-lg border-none bg-opacity-0 transition hover:bg-opacity-10 aria-[current]:bg-opacity-5 dark:border-none dark:bg-opacity-0 dark:hover:bg-opacity-10',
        input: [
          'w-full select-text resize-none rounded-xl border-2 bg-input-background text-sm text-input-text shadow-none outline-0 transition-all dark:bg-input-background-dark dark:text-input-text-dark',
          'border-input-border hover:border-input-border-hover focus:border-input-border-focus focus:outline-0 focus:[box-shadow:none] dark:border-input-border-dark dark:hover:border-input-border-hover-dark dark:focus:border-input-border-focus',
          'aria-[invalid=true]:border-error dark:aria-[invalid=true]:border-error-dark',
          'disabled:opacity-50',
        ],
      },
      color: {
        primary:
          'border-primary bg-primary text-primary hover:bg-primary-500 dark:border-primary-dark dark:bg-primary-dark dark:text-primary-dark hover:dark:bg-primary-300',
        secondary:
          'border-secondary bg-secondary text-secondary hover:bg-secondary-300 dark:border-secondary-dark dark:bg-secondary-dark dark:text-secondary-dark hover:dark:bg-secondary-100',
        destructive:
          'border-destructive bg-destructive text-destructive hover:bg-destructive-500 dark:border-destructive-dark dark:bg-destructive-dark hover:dark:bg-destructive-200',
        neutral:
          'border-neutral bg-neutral text-neutral hover:bg-neutral-600 dark:border-neutral-dark dark:bg-neutral-dark dark:text-neutral-dark hover:dark:bg-neutral-400',
        light: 'border-white bg-white text-white hover:bg-neutral-500',
        dark: 'border-neutral-800 bg-neutral-800 text-neutral-800 hover:bg-neutral-900 dark:hover:bg-neutral-700',
        text: 'border-text bg-text text-text hover:opacity-80 dark:border-text-dark dark:bg-text-dark dark:text-text-dark',
        'text-inverse':
          'border-text-dark dark:border-text bg-text-dark dark:bg-text text-text-dark dark:text-text hover:opacity-80',
        error:
          'border-error bg-error text-error hover:bg-error-500 dark:border-error-dark dark:bg-error-dark dark:text-error-dark hover:dark:bg-error-300',
        success:
          'border-success bg-success text-success hover:bg-success-500 dark:border-success-dark dark:bg-success-dark dark:text-success-dark hover:dark:bg-success-300',
        custom: '',
      },

      textAlign: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      },

      isFullWidth: {
        true: 'w-full',
        false: '',
      },

      hasIconLeft: {
        true: 'px-12',
        false: '',
      },
      hasIconRight: {
        true: 'pr-8',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      color: 'primary',
      textAlign: 'center',
      isFullWidth: false,
      hasIconRight: false,
      hasIconLeft: false,
    },
  }
);

export type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  VariantProps<typeof buttonVariants> & {
    /**
     * Optional icon to be displayed on the button
     */
    label: string;
    Icon?: FC | LucideIcon;
    IconRight?: FC | LucideIcon;
    iconClassName?: string;
    isLoading?: boolean;
    isActive?: boolean;
    isFullWidth?: boolean;
  };

export const Button: FC<ButtonProps> = ({
  variant,
  size,
  color,
  children,
  Icon,
  IconRight,
  iconClassName,
  isLoading,
  isActive,
  isFullWidth = false,
  textAlign,
  disabled,
  label,
  className,
  type = 'button',
  ...props
}) => {
  const isLink = variant === 'link' || variant === 'invisible-link';

  return (
    <button
      disabled={isLoading || disabled}
      aria-current={isActive ? 'page' : undefined}
      aria-label={label}
      aria-busy={isLoading}
      role={isLink ? 'link' : undefined}
      type={type}
      className={buttonVariants({
        variant,
        size,
        color,
        isFullWidth,
        textAlign: textAlign ?? (IconRight ? 'left' : 'center'),
        hasIconLeft: Boolean(
          typeof children !== 'undefined' &&
            (typeof Icon !== 'undefined' || typeof isLoading !== 'undefined')
        ),
        hasIconRight: Boolean(
          typeof children !== 'undefined' && typeof IconRight !== 'undefined'
        ),
        className,
      })}
      {...props}
    >
      {Icon && !isLoading && (
        <Icon
          className={buttonIconVariants({
            size,
            className: iconClassName,
            position: 'left',
          })}
        />
      )}

      <Loader
        className={buttonIconVariants({
          size,
          className: iconClassName,
          position: 'left',
        })}
        isLoading={isLoading ?? false}
      />

      {children}

      {IconRight && (
        <IconRight
          className={buttonIconVariants({
            size,
            className: iconClassName,
            position: 'right',
          })}
        />
      )}
    </button>
  );
};
