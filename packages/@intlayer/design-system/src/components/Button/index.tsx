import { cva, type VariantProps } from 'class-variance-authority';
import type { LucideIcon } from 'lucide-react';
import {
  forwardRef,
  type ButtonHTMLAttributes,
  type DetailedHTMLProps,
  type FC,
} from 'react';
import { styled } from 'styled-components';
import { Loader, type LoaderProps } from '../Loader';

const buttonVariants = cva(
  [
    'inline-flex items-center whitespace-nowrap text-sm font-medium focus-visible:outline-none',
    'gap-2 transition disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 gap-1 px-3 text-xs',
        lg: 'h-10 px-8',
        icon: 'size-9',
      },
      color: {
        primary:
          'border-primary bg-primary text-primary decoration-primary hover:bg-primary/90',
        secondary:
          'border-secondary bg-secondary text-secondary decoration-secondary hover:bg-secondary/90',
        destructive:
          'border-destructive bg-destructive-500 text-destructive decoration-destructive hover:bg-destructive-500/90',
        neutral:
          'border-neutral bg-neutral text-neutral decoration-neutral hover:bg-neutral/90',
        light:
          'border-white bg-white text-white decoration-white hover:bg-white/90',
        dark: 'border-neutral-950 bg-neutral-950 text-neutral-950 decoration-neutral-950 hover:bg-neutral-950/90',
        text: 'border-text bg-text text-text decoration-text hover:bg-text/90',
      },

      variant: {
        default:
          'decoration-none text-text-opposite justify-center rounded-md border-none shadow',
        outline:
          'hover:bg-accent  hover:text-accent-foreground decoration-none justify-center rounded-md border bg-inherit shadow-sm',
        link: 'h-auto justify-start border-inherit bg-transparent p-0 underline-offset-4 hover:bg-transparent hover:underline',
        'invisible-link':
          'h-auto justify-start border-inherit bg-inherit p-0 font-normal hover:bg-inherit',
        'list-item':
          'w-full rounded border-none border-inherit bg-inherit text-inherit hover:bg-neutral-400/10 aria-[current="true"]:bg-neutral-400/10',
      },
    },
    compoundVariants: [
      {
        variant: 'default',
        color: ['light', 'primary', 'secondary', 'destructive', 'text'],
        class: 'text-text dark:text-text-opposite',
      },
      {
        variant: 'default',
        color: ['dark', 'neutral'],
        class: 'text-text-opposite dark:text-text',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
      color: 'primary',
    },
  }
);

const iconVariants = cva('', {
  variants: {
    size: {
      default: 'h-auto w-4',
      sm: 'h-auto w-3',
      lg: 'h-auto w-5',
      icon: 'h-auto w-6',
      none: '',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

export type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  VariantProps<typeof buttonVariants> & {
    /**
     * Optional icon to be displayed on the button
     */
    Icon?: FC | LucideIcon;
    iconClassName?: string;
    isLoading?: boolean;
    isActive?: boolean;
    isDisabled?: boolean;
    label: string;
  };

const StyledButton = styled.button<VariantProps<typeof buttonVariants>>(
  ({ variant, color, size, className }) =>
    buttonVariants({ variant, color, size, className })
);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant,
      size,
      color,
      children,
      Icon,
      iconClassName,
      isLoading,
      isActive,
      disabled,
      label,
      ...props
    },
    ref
  ) => {
    const isLink = variant === 'link' || variant === 'invisible-link';

    const ButtonIcon = (isLoading ? Loader : Icon) as FC<LoaderProps>;

    const StyledButtonIcon = styled(ButtonIcon)<
      VariantProps<typeof iconVariants>
    >(({ size, className }) => iconVariants({ size, className }));

    return (
      <StyledButton
        ref={ref}
        disabled={isLoading ?? disabled}
        aria-current={isActive}
        aria-label={label}
        aria-busy={isLoading}
        role={isLink ? 'link' : undefined}
        variant={variant}
        color={color}
        size={size}
        {...props}
      >
        {StyledButtonIcon ? (
          <>
            <StyledButtonIcon className={iconClassName} />
            {children}
          </>
        ) : (
          children
        )}
      </StyledButton>
    );
  }
);

Button.displayName = 'Button';
