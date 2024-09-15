import { cva, type VariantProps } from 'class-variance-authority';
import type { LucideIcon } from 'lucide-react';
import {
  forwardRef,
  type ButtonHTMLAttributes,
  type DetailedHTMLProps,
  type FC,
} from 'react';
import { cn } from '../../utils/cn';
import { Loader } from '../Loader';

const buttonIconVariants = cva('size-4', {
  variants: {
    size: {
      sm: 'w-4',
      md: 'w-6',
      lg: 'w-7',
      xl: 'w-9',
      icon: 'w-8',
    },
  },
  defaultVariants: {
    size: 'icon',
  },
});

const buttonVariants = cva(
  'flex items-center gap-3 whitespace-nowrap font-medium transition focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-9 px-6 text-base',
        lg: 'h-10 px-8 text-lg',
        xl: 'h-11 px-10 text-xl',
        icon: 'p-0',
      },
      variant: {
        default: 'text-text-opposite dark:text-text-opposite-dark rounded-lg',
        none: 'border-none bg-opacity-0 text-inherit hover:bg-opacity-0 dark:bg-opacity-0 dark:text-inherit dark:hover:bg-opacity-0',
        outline:
          'rounded-lg border-[1.5px] bg-opacity-0 hover:bg-opacity-30 dark:bg-opacity-0',
        link: 'h-auto justify-start border-inherit bg-transparent px-1 underline-offset-4 hover:bg-transparent hover:underline dark:bg-transparent hover:dark:bg-transparent',
        'invisible-link':
          'h-auto justify-start border-inherit bg-transparent px-1 underline-offset-4 hover:bg-transparent dark:bg-transparent hover:dark:bg-transparent',
        hoverable:
          'rounded-lg border-none bg-opacity-0 transition hover:bg-opacity-10 dark:border-none dark:bg-opacity-0 dark:hover:bg-opacity-10',
      },
      color: {
        primary:
          'border-primary dark:border-primary-dark bg-primary dark:bg-primary-dark text-primary dark:text-primary-dark hover:bg-primary-500 hover:dark:bg-primary-300',
        secondary:
          'border-secondary dark:border-secondary-dark bg-secondary dark:bg-secondary-dark text-secondary dark:text-secondary-dark hover:bg-secondary-300 hover:dark:bg-secondary-100',
        destructive:
          'border-destructive dark:border-destructive-dark bg-destructive dark:bg-destructive-dark text-destructive hover:bg-destructive-500 hover:dark:bg-destructive-200',
        neutral:
          'border-neutral dark:border-neutral-dark bg-neutral dark:bg-neutral-dark text-neutral dark:text-neutral-dark hover:bg-neutral-600 hover:dark:bg-neutral-400',
        light: 'border-white bg-white text-white hover:bg-neutral-500',
        dark: 'border-neutral-800 bg-neutral-800 text-neutral-800 hover:bg-neutral-900 dark:hover:bg-neutral-700',
        text: 'border-text dark:border-text-dark bg-text dark:bg-text-dark text-text dark:text-text-dark hover:opacity-80',
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
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      color: 'primary',
      textAlign: 'center',
      isFullWidth: false,
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
    Icon?: FC | LucideIcon;
    IconRight?: FC | LucideIcon;
    iconClassName?: string;
    isLoading?: boolean;
    isActive?: boolean;
    isDisabled?: boolean;
    isFullWidth?: boolean;
    label: string;
  };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'default',
      size = 'sm',
      color = 'primary',
      children,
      Icon,
      IconRight,
      iconClassName,
      isLoading = false,
      isActive,
      isFullWidth = false,
      textAlign = IconRight ? 'left' : 'center',
      disabled,
      label,
      className,
      ...props
    },
    ref
  ) => {
    const isLink = variant === 'link' || variant === 'invisible-link';

    return (
      <button
        ref={ref}
        disabled={isLoading ?? disabled}
        aria-current={isActive}
        aria-label={label}
        aria-busy={isLoading}
        role={isLink ? 'link' : undefined}
        className={buttonVariants({
          variant,
          size,
          color,
          isFullWidth,
          textAlign,
          className,
        })}
        {...props}
      >
        {Icon && !isLoading && (
          <Icon
            className={cn(
              buttonIconVariants({ size, className: iconClassName }),
              'float-start'
            )}
          />
        )}

        <Loader
          className={cn(
            buttonIconVariants({ size, className: iconClassName }),
            'float-start'
          )}
          isLoading={isLoading}
        />

        <div className="flex-1">{children}</div>

        {IconRight && (
          <IconRight
            className={cn(
              buttonIconVariants({ size, className: iconClassName }),
              ''
            )}
          />
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
