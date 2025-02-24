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
  'relative cursor-pointer truncate whitespace-nowrap font-medium transition focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50',
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
      color: {
        primary: 'text-primary *:text-text-light',
        secondary: 'text-secondary *:text-text-light',
        destructive: 'text-destructive *:text-text-light',
        neutral: 'text-neutral *:text-text-light',
        light: 'text-white *:text-text-light',
        dark: 'text-neutral-800 *:text-text-light',
        text: 'text-text *:text-text-opposite',
        'text-inverse': 'text-text-opposite *:text-text',
        error: 'text-error *:text-text-light',
        success: 'text-success *:text-text-light',
        custom: '',
      },
      variant: {
        default: 'rounded-lg bg-current',
        none: 'border-none bg-current/0 text-inherit hover:bg-current/0',
        outline:
          '*:!text-current rounded-lg border-[1.5px] bg-current/0 hover:bg-current/30',
        link: '*:!text-current h-auto justify-start border-inherit bg-transparent px-1 underline-offset-4 hover:bg-transparent hover:underline',
        'invisible-link':
          '*:!text-current h-auto justify-start border-inherit bg-transparent px-1 underline-offset-4 hover:bg-transparent',
        hoverable:
          '*:!text-current rounded-lg border-none bg-current/0 transition hover:bg-current/10 aria-[current]:bg-current/5',
        input: [
          '*:!text-current w-full select-text resize-none rounded-xl border-2 bg-input-background text-sm text-input-text shadow-none outline-0 transition-all',
          'border-input-border hover:border-input-border-hover focus:border-input-border-focus focus:outline-0 focus:[box-shadow:none]',
          'aria-[invalid=true]:border-error',
          'disabled:opacity-50',
        ],
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

      <span>{children}</span>

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
