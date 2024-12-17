import { cva, type VariantProps } from 'class-variance-authority';
import { type PropsWithChildren, forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

const containerVariants = cva(
  'flex flex-col p-10 text-text backdrop-blur dark:text-text-dark',
  {
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
      transparency: {
        none: 'bg-card dark:bg-card-dark',
        full: '',
        sm: 'bg-card/90 dark:bg-card-dark/90',
        md: 'bg-card/70 dark:bg-card-dark/70',
        lg: 'bg-card/40 dark:bg-card-dark/40',
        xl: 'bg-card/20 dark:bg-card-dark/20',
      },
      padding: {
        none: 'p-0',
        sm: 'p-1',
        md: 'p-2',
        lg: 'p-3',
        xl: 'p-4',
      },
      separator: {
        without: '',
        x: 'divide-x divide-dashed divide-text/20 dark:divide-text-dark/20',
        y: 'divide-y divide-dashed divide-text/20 dark:divide-text-dark/20',
        both: 'divide-x divide-y divide-dashed divide-text/20 dark:divide-text-dark/20',
      },
      border: {
        none: '',
        with: 'border-[1.5px]',
      },
      borderColor: {
        primary: 'border-primary dark:border-primary-dark',
        secondary: 'border-secondary dark:border-secondary-dark',
        neutral: 'border-neutral dark:border-neutral-dark',
        text: 'border-text dark:border-text-dark',
      },
      background: {
        none: 'bg-none',
        with: '',
      },
      gap: {
        none: 'gap-0',
        sm: 'gap-1',
        md: 'gap-3',
        lg: 'gap-5',
        xl: 'gap-8',
        '2xl': 'gap-10',
      },
    },

    defaultVariants: {
      roundedSize: 'md',
      border: 'none',
      borderColor: 'text',
      transparency: 'md',
      padding: 'none',
      separator: 'without',
      gap: 'none',
    },
  }
);

export type ContainerProps = PropsWithChildren<
  Omit<VariantProps<typeof containerVariants>, 'border' | 'background'>
> &
  HTMLAttributes<HTMLDivElement> & {
    border?: boolean;
    background?: boolean;
  };

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      children,
      roundedSize,
      padding,
      transparency,
      separator,
      className,
      border,
      borderColor,
      background,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        containerVariants({
          roundedSize,
          transparency,
          padding,
          separator,
          border:
            typeof border === 'boolean'
              ? border
                ? 'with'
                : 'none'
              : undefined,
          background:
            typeof background === 'boolean'
              ? background
                ? 'with'
                : 'none'
              : undefined,
          borderColor,
          className,
        })
      )}
      {...props}
    >
      {children}
    </div>
  )
);

Container.displayName = 'Container';
