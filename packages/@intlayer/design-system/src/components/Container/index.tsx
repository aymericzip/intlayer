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
        sm: 'bg-card/80 dark:bg-card-dark/80',
        md: 'bg-card/60 dark:bg-card-dark/60',
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
      transparency: 'md',
      padding: 'none',
      separator: 'without',
      gap: 'none',
    },
  }
);

// css`
//   -webkit-backdrop-filter: var(--tw-backdrop-blur)
//     var(--tw-backdrop-brightness) var(--tw-backdrop-contrast)
//     var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate)
//     var(--tw-backdrop-invert) var(--tw-backdrop-opacity)
//     var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);
// `,

type ContainerProps = PropsWithChildren<
  VariantProps<typeof containerVariants>
> &
  HTMLAttributes<HTMLDivElement>;

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      children,
      roundedSize,
      padding,
      transparency,
      separator,
      className,
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
