import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export const badgeVariants = cva(
  'focus:ring-ring inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
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
      variant: {
        default: 'text-text-opposite dark:text-text-opposite-dark rounded-lg',
        none: 'border-none bg-opacity-0 text-inherit hover:bg-opacity-0 dark:bg-opacity-0 dark:text-inherit dark:hover:bg-opacity-0',
        outline:
          'rounded-lg border-[1.5px] bg-opacity-0 hover:bg-opacity-30 dark:bg-opacity-0',
        hoverable:
          'rounded-lg border-none bg-opacity-0 transition hover:bg-opacity-10 dark:border-none dark:bg-opacity-0 dark:hover:bg-opacity-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      color: 'primary',
    },
  }
);

export type BadgeProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof badgeVariants>;

export const Badge = ({ className, variant, color, ...props }: BadgeProps) => (
  <div
    className={cn(badgeVariants({ variant, color }), className)}
    {...props}
  />
);
