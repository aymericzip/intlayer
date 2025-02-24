import { type VariantProps, cva } from 'class-variance-authority';
import type { FC, HTMLAttributes, PropsWithChildren } from 'react';

type TagProps = PropsWithChildren<VariantProps<typeof containerVariants>> &
  HTMLAttributes<HTMLDivElement>;

const containerVariants = cva('backdrop-blur w-fit', {
  variants: {
    roundedSize: {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      '2xl': 'rounded-2xl',
      '3xl': 'rounded-3xl',
      full: 'rounded-full',
    },
    color: {
      success: 'bg-success/10 border-success text-success ',
      error: 'bg-error/10 border-error text-error',
      warning: 'bg-warning/10 border-warning text-warning',
      neutral: 'bg-neutral/10 /10 border-neutral text-neutral ',
      text: 'bg-text/10  border-text  text-text',
    },
    size: {
      xs: 'py-0.5 px-2 text-xs border-[1.2px]',
      sm: 'py-0.5 px-2 text-sm border-[1.5px]',
      md: 'py-1 px-2 text-base border-2',
      lg: 'py-2 px-3 text-lg border-2',
      xl: 'py-4 px-5 text-xl border-2',
    },
    border: {
      none: 'border-none',
      with: 'border-text  border-[1.5px]',
    },
    background: {
      none: 'bg-none',
      with: '',
    },
  },

  defaultVariants: {
    roundedSize: 'full',
    border: 'none',
    color: 'text',
    size: 'md',
  },
});

export const Tag: FC<TagProps> = ({
  children,
  color,
  roundedSize,
  size,
  border,
  background,
  className,
  ...props
}) => {
  return (
    <div
      className={containerVariants({
        color,
        roundedSize,
        size,
        border,
        background,
        className,
      })}
      {...props}
    >
      {children}
    </div>
  );
};
