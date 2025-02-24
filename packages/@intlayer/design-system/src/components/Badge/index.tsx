import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export const badgeVariants = cva(
  'focus:ring-ring inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      color: {
        primary: 'border-primary bg-primary text-primary hover:bg-primary-500',
        secondary:
          'border-secondary bg-secondary text-secondary hover:bg-secondary-300',
        destructive:
          'border-destructive bg-destructive text-destructive hover:bg-destructive-500',
        neutral: 'border-neutral bg-neutral text-neutral hover:bg-neutral-600',
        light: 'border-white bg-white text-white hover:bg-neutral-500',
        dark: 'border-neutral-800 bg-neutral-800 text-neutral-800 hover:bg-neutral-900',
        text: 'border-text bg-text text-text hover:opacity-80',
        custom: '',
      },
      variant: {
        default: 'rounded-lg text-text-opposite',
        none: 'border-none bg-opacity-0 text-inherit hover:bg-opacity-0',
        outline: 'rounded-lg border-[1.5px] bg-opacity-0 hover:bg-opacity-30',
        hoverable:
          'rounded-lg border-none bg-opacity-0 transition hover:bg-opacity-10',
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
