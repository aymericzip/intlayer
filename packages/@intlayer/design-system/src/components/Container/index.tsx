import { cva, type VariantProps } from 'class-variance-authority';
import type {
  DetailedHTMLProps,
  FC,
  HTMLAttributes,
  PropsWithChildren,
} from 'react';
import { cn } from '../../utils/cn';

/**
 * Container component variants using class-variance-authority
 * Provides flexible styling options for background, padding, borders, and layout
 */
export const containerVariants = cva('flex flex-col text-text backdrop-blur', {
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
      sm: 'bg-card/95',
      md: 'bg-card/70',
      lg: 'bg-card/40',
      xl: 'bg-card/20',
      full: '',
    },
    padding: {
      none: 'p-0',
      sm: 'px-2 py-4',
      md: 'px-4 py-6',
      lg: 'px-6 py-8',
      xl: 'px-8 py-10',
      '2xl': 'px-10 py-12',
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
      text: 'border-text',
      error: 'border-error',
      warning: 'border-warning',
      success: 'border-success',
    },
    background: {
      none: 'bg-inherit',
      hoverable:
        'bg-opacity-5! backdrop-blur-0 hover:bg-opacity-10! hover:backdrop-blur focus:bg-opacity-10! focus:backdrop-blur aria-selected:bg-opacity-15! aria-selected:backdrop-blur',
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
    padding: 'md',
    separator: 'without',
    gap: 'none',
  },
});

/** Available rounded corner sizes for the container */
export enum ContainerRoundedSize {
  NONE = 'none',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
  TWO_XL = '2xl',
  THREE_XL = '3xl',
  FULL = 'full',
}

/** Background transparency levels for the container */
export enum ContainerTransparency {
  NONE = 'none',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
  FULL = 'full',
}

/** Padding sizes for container content */
export enum ContainerPadding {
  NONE = 'none',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
}

/** Separator options for dividing container children */
export enum ContainerSeparator {
  WITHOUT = 'without',
  X = 'x',
  Y = 'y',
  BOTH = 'both',
}

/** Border color options for the container */
export enum ContainerBorderColor {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  NEUTRAL = 'neutral',
  TEXT = 'text',
  ERROR = 'error',
  WARNING = 'warning',
  SUCCESS = 'success',
}

/** Background interaction states for the container */
export enum ContainerBackground {
  NONE = 'none',
  HOVERABLE = 'hoverable',
  WITH = 'with',
}

/** Gap sizes between container children */
export enum ContainerGap {
  NONE = 'none',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
  TWO_XL = '2xl',
}

/** Container component props extending HTML div attributes */
export type ContainerProps = PropsWithChildren<
  Omit<VariantProps<typeof containerVariants>, 'border'>
> &
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    /** Whether to show a border around the container */
    border?: boolean;
  };

/**
 * Container Component
 *
 * A flexible container component for organizing content with customizable styling options.
 * Supports various visual states, layouts, and accessibility features.
 *
 * ## Features
 * - **Flexible Layout**: Supports different padding, gap, and separator options
 * - **Visual Variants**: Multiple background transparency levels and border styles
 * - **Responsive Design**: Configurable rounded corners and spacing
 * - **Semantic HTML**: Proper div element with extensible attributes
 *
 * ## Accessibility
 * - Inherits all standard div accessibility features
 * - Supports ARIA attributes through spread props
 * - Maintains proper semantic structure for screen readers
 *
 * @param children - The content to display inside the container
 * @param roundedSize - Border radius size (default: 'md')
 * @param transparency - Background transparency level (default: 'md')
 * @param padding - Internal padding size (default: 'none')
 * @param separator - Divider lines between children (default: 'without')
 * @param border - Whether to show border (default: false)
 * @param borderColor - Color of the border (default: 'text')
 * @param background - Background interaction behavior (default: 'none')
 * @param gap - Space between child elements (default: 'none')
 * @param className - Additional CSS classes
 * @param props - Additional HTML div attributes including ARIA attributes
 */
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
  gap,
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
        gap,
        className,
      })
    )}
    {...props}
  >
    {children}
  </div>
);
