import { cn } from '@utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import type {
  DetailedHTMLProps,
  FC,
  HTMLAttributes,
  PropsWithChildren,
} from 'react';

/**
 * Container component variants using class-variance-authority
 * Provides flexible styling options for background, padding, borders, and layout
 */
export const containerVariants = cva('flex flex-col text-text backdrop-blur', {
  variants: {
    roundedSize: {
      none: 'rounded-none',
      sm: 'rounded-sm [corner-shape:squircle] supports-[corner-shape:squircle]:rounded-md',
      md: 'rounded-md [corner-shape:squircle] supports-[corner-shape:squircle]:rounded-lg',
      lg: 'rounded-lg [corner-shape:squircle] supports-[corner-shape:squircle]:rounded-xl',
      xl: 'rounded-xl [corner-shape:squircle] supports-[corner-shape:squircle]:rounded-2xl',
      '2xl':
        'rounded-2xl [corner-shape:squircle] supports-[corner-shape:squircle]:rounded-3xl',
      '3xl':
        'rounded-3xl [corner-shape:squircle] supports-[corner-shape:squircle]:rounded-4xl',
      '4xl':
        'rounded-4xl [corner-shape:squircle] supports-[corner-shape:squircle]:rounded-[2.5rem]',
      full: 'rounded-full',
    },
    transparency: {
      none: 'bg-card',
      xs: 'bg-card/95',
      sm: 'bg-card/90',
      md: 'bg-card/70',
      lg: 'bg-card/40',
      xl: 'bg-card/20',
      full: '',
    },
    padding: {
      none: 'p-0',
      sm: 'px-3 py-2',
      md: 'px-4 py-3',
      lg: 'px-6 py-4',
      xl: 'px-8 py-6',
      '2xl': 'px-10 py-8',
    },
    separator: {
      without: '',
      x: 'divide-x divide-dashed divide-text/20',
      y: 'divide-y divide-dashed divide-text/20',
      both: 'divide-x divide-y divide-dashed divide-text/20',
    },
    border: {
      none: '',
      with: 'border-[1.3px]',
    },
    borderColor: {
      primary: 'border-primary',
      secondary: 'border-secondary',
      neutral: 'border-neutral/20',
      card: 'border-card',
      text: 'border-text',
      error: 'border-error',
      warning: 'border-warning',
      success: 'border-success',
    },
    background: {
      none: 'backdrop-blur-none',
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
    roundedSize: 'lg',
    border: 'none',
    borderColor: 'text',
    transparency: 'md',
    padding: 'none',
    separator: 'without',
    gap: 'none',
  },
  compoundVariants: [
    {
      background: 'none',
      class: 'bg-transparent',
    },
  ],
});

/** Available rounded corner sizes for the container */
export type ContainerRoundedSize = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

/** Background transparency levels for the container */
export type ContainerTransparency = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

/** Padding sizes for container content */
export type ContainerPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';

/** Separator options for dividing container children */
export type ContainerSeparator = 'without' | 'x' | 'y' | 'both';

/** Border color options for the container */
export type ContainerBorderColor =
  | 'primary'
  | 'secondary'
  | 'neutral'
  | 'card'
  | 'text'
  | 'error'
  | 'warning'
  | 'success';

/** Background interaction states for the container */
export type ContainerBackground = 'none' | 'hoverable' | 'with';

/** Gap sizes between container children */
export type ContainerGap = 'none' | 'sm' | 'md' | 'lg' | 'xl';

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
      }),
      className
    )}
    {...props}
  >
    {children}
  </div>
);
