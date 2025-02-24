import { cva, type VariantProps } from 'class-variance-authority';
import {
  type PropsWithChildren,
  type HTMLAttributes,
  type FC,
  type DetailedHTMLProps,
} from 'react';
import { cn } from '../../utils/cn';

const containerVariants = cva('flex text-text flex-col backdrop-blur', {
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
      none: 'bg-card',
      sm: 'bg-card/90',
      md: 'bg-card/70',
      lg: 'bg-card/40',
      xl: 'bg-card/20',
      full: '',
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
      x: 'divide-x divide-dashed divide-text/20',
      y: 'divide-y divide-dashed divide-text/20',
      both: 'divide-x divide-y divide-dashed divide-text/20',
    },
    border: {
      none: '',
      with: 'border-[1.5px]',
    },
    borderColor: {
      primary: 'border-primary',
      secondary: 'border-secondary',
      neutral: 'border-neutral',
      text: 'border-text ',
      error: 'border-error',
      warning: 'border-warning',
      success: 'border-success',
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
    transparency: 'md',
    padding: 'none',
    separator: 'without',
    gap: 'none',
  },
});

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
        borderColor,
        className,
      })
    )}
    {...props}
  >
    {children}
  </div>
);
