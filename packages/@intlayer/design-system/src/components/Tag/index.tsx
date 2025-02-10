import { cva, VariantProps } from 'class-variance-authority';
import { FC, HTMLAttributes, PropsWithChildren } from 'react';

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
      success:
        'bg-success/10 dark:bg-success-dark/10 border-success dark:border-success-dark text-success dark:text-success-dark',
      error:
        'bg-error/10 dark:bg-error-dark/10 border-error dark:border-error-dark text-error dark:text-error-dark',
      warning:
        'bg-warning/10 dark:bg-warning-dark/10 border-warning dark:border-warning-dark text-warning dark:text-warning-dark',
      neutral:
        'bg-neutral/10 dark:bg-neutral-dark/10 border-neutral dark:border-neutral-dark text-neutral dark:text-neutral-dark',
      info: 'bg-info/10 dark:bg-info-dark/10 border-info dark:border-info-dark text-info dark:text-info-dark',
      text: 'bg-text/10 dark:bg-text-dark/10 border-text dark:border-text-dark text-text dark:text-text-dark',
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
      with: 'border-text dark:border-text-dark border-[1.5px]',
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

export const Tag: FC<TagProps> = (
  {
    children,
    color,
    roundedSize,
    size,
    border,
    background,
    className,
    ...props
  },
  ref
) => {
  return (
    <div
      ref={ref}
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
