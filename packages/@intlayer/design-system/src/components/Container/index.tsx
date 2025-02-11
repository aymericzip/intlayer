import { cva, type VariantProps } from 'class-variance-authority';
import {
  type PropsWithChildren,
  type HTMLAttributes,
  type FC,
  type DetailedHTMLProps,
} from 'react';
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
        none: '',
        full: 'bg-none',
        sm: 'dark:bg-opacity-90',
        md: 'dark:bg-opacity-70',
        lg: 'dark:bg-opacity-40',
        xl: 'dark:bg-opacity-20',
      },
      backgroundColor: {
        none: 'bg-card dark:bg-card-dark',
        primary: 'bg-primary dark:bg-primary-dark',
        secondary: 'bg-secondary dark:bg-secondary-dark',
        neutral: 'bg-neutral dark:bg-neutral-dark',
        text: 'bg-text dark:bg-text-dark',
        card: 'bg-card dark:bg-card-dark',
        contrast: 'bg-background-dark dark:bg-background',
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
        none: 'bg-inherit',
        hoverable:
          '!bg-opacity-5 backdrop-blur-0 hover:!bg-opacity-10 hover:backdrop-blur focus:!bg-opacity-10 focus:backdrop-blur aria-selected:!bg-opacity-15 aria-selected:backdrop-blur',
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
      backgroundColor: 'card',
      transparency: 'md',
      padding: 'none',
      separator: 'without',
      gap: 'none',
    },
  }
);

export type ContainerProps = PropsWithChildren<
  Omit<VariantProps<typeof containerVariants>, 'border'>
> &
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    border?: boolean;
  };

export const Container: FC<ContainerProps> = ({
  children,
  roundedSize,
  padding,
  transparency,
  separator,
  className,
  border,
  borderColor,
  backgroundColor,
  background,
  ...props
}) => (
  <div
    className={cn(
      containerVariants({
        roundedSize,
        transparency,
        padding,
        separator,
        border:
          typeof border === 'boolean' ? (border ? 'with' : 'none') : undefined,
        background,
        backgroundColor,
        borderColor,
        className,
      })
    )}
    {...props}
  >
    {children}
  </div>
);

Container.displayName = 'Container';
