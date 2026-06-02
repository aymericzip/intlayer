import { cn } from '@utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import type { LucideIcon } from 'lucide-react';
import type { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';
import { Loader } from '../Loader';

/**
 * Button size variants for different use cases
 */
export type ButtonSize =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | 'icon-sm'
  | 'icon-md'
  | 'icon-lg'
  | 'icon-xl';

const buttonIconVariants = cva('flex-none shrink-0', {
  variants: {
    size: {
      xs: 'size-2',
      sm: 'size-3',
      md: 'size-4',
      lg: 'size-5',
      xl: 'size-6',
      'icon-sm': 'size-3',
      'icon-md': 'size-4',
      'icon-lg': 'size-5',
      'icon-xl': 'size-6',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

/**
 * Button visual style variants
 */
export type ButtonVariant =
  | 'default'
  | 'none'
  | 'outline'
  | 'link'
  | 'invisible-link'
  | 'hoverable'
  | 'fade'
  | 'input';

/**
 * Button color themes that work with the design system
 */
export type ButtonColor =
  | 'primary'
  | 'secondary'
  | 'neutral'
  | 'light'
  | 'dark'
  | 'text'
  | 'card'
  | 'text-inverse'
  | 'current'
  | 'error'
  | 'success'
  | 'custom';

/**
 * Text alignment options for button content
 */
export type ButtonTextAlign = 'left' | 'center' | 'right';

/**
 * Enhanced button variants with improved accessibility and focus states
 */
export const buttonVariants = cva(
  'relative inline-flex cursor-pointer items-center justify-center font-medium ring-0 transition-all duration-300 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      size: {
        xs: 'min-h-7 px-3 text-xs max-md:py-1',
        sm: 'min-h-7 px-3 text-xs max-md:py-1',
        md: 'min-h-8 px-6 text-sm max-md:py-2',
        lg: 'min-h-10 px-8 text-lg max-md:py-3',
        xl: 'min-h-11 px-10 text-xl max-md:py-4',
        'icon-sm': 'p-1.5',
        'icon-md': 'p-1.5',
        'icon-lg': 'p-1.5',
        'icon-xl': 'p-3',
      },
      color: {
        primary:
          'hover-primary-500/20 text-primary ring-primary-500/20 *:text-text-light',
        secondary:
          'hover-secondary-500/20 text-secondary ring-secondary-500/20 *:text-text-light',
        neutral: 'text-neutral ring-neutral-500/5 *:text-text-light',
        card: 'hover-card-500/20 text-card ring-card-500/20 *:text-text-light',
        light: 'hover-white-500/20 text-white ring-white/20 *:text-text-light',
        dark: 'text-neutral-800 ring-text-light/50 *:text-text-light',
        text: 'text-text ring-text/20 *:text-text-opposite',
        current:
          'hover-current-500/10 text-current ring-current/10 *:text-text-light',
        'text-inverse': 'text-text-opposite ring-text-opposite/20 *:text-text',
        error: 'hover-error-500/20 text-error ring-error/20 *:text-text-light',
        success:
          'hover-success-500/20 text-success ring-success/20 *:text-text-light',
        custom: '',
      },
      roundedSize: {
        none: 'rounded-none',
        sm: 'rounded-lg [corner-shape:squircle] supports-[corner-shape:squircle]:rounded-xl',
        md: 'rounded-xl [corner-shape:squircle] supports-[corner-shape:squircle]:rounded-2xl',
        lg: 'rounded-2xl [corner-shape:squircle] supports-[corner-shape:squircle]:rounded-3xl',
        xl: 'rounded-3xl [corner-shape:squircle] supports-[corner-shape:squircle]:rounded-4xl',
        '2xl':
          'rounded-4xl [corner-shape:squircle] supports-[corner-shape:squircle]:rounded-[2.5rem]',
        '3xl':
          'rounded-[2.5rem] [corner-shape:squircle] supports-[corner-shape:squircle]:rounded-[3rem]',
        '4xl':
          'rounded-[3rem] [corner-shape:squircle] supports-[corner-shape:squircle]:rounded-[4rem]',
        '5xl':
          'rounded-[4rem] [corner-shape:squircle] supports-[corner-shape:squircle]:rounded-[5rem]',
        full: 'rounded-full',
      },
      variant: {
        default: [
          'bg-current',
          'hover:bg-current/90',
          'hover:ring-5',
          'aria-selected:ring-5',
        ],

        outline: [
          'rounded-2xl border-[1.3px] border-current bg-current/0 *:text-current!',
          'hover:bg-current/20 focus-visible:bg-current/20',
          'hover:ring-5 focus-visible:ring-5',
          'aria-selected:ring-5',
        ],

        none: 'border-none bg-current/0 text-inherit hover:bg-current/0',

        link: 'h-auto justify-start border-inherit bg-transparent px-1 underline-offset-4 *:text-current! hover:bg-transparent hover:underline',

        'invisible-link':
          'h-auto justify-start border-inherit bg-transparent px-1 underline-offset-4 *:text-current! hover:bg-transparent',

        hoverable:
          'rounded-lg border-none bg-current/0 transition *:text-current! hover:bg-current/20 aria-[current]:bg-current/5',

        fade: [
          'rounded-lg border-none bg-current/10 ring-current/5 transition *:text-current! hover:bg-current/20 aria-[current]:bg-current/5',
          'hover:ring-5 focus-visible:ring-5',
          'aria-selected:ring-5',
        ],
        input: [
          // base styles
          'text-text',
          'w-full select-text resize-none rounded-2xl text-base shadow-none outline-none supports-[corner-shape:squircle]:rounded-4xl',
          'transition-shadow duration-100 md:text-sm',
          'ring-0', // base ring
          'disabled:opacity-50',

          'text-text',
          'bg-neutral-50 dark:bg-neutral-950',
          'ring-neutral-100 dark:ring-neutral-700',

          // Hover ring (similar spirit to your input)
          'hover:ring-3', // width
          'aria-selected:ring-4',
          'focus-visible:ring-3',
          'disabled:ring-0',

          // Focus ring + animation
          'focus-visible:outline-none',

          // Remove any weird box-shadow
          '[box-shadow:none] focus:[box-shadow:none]',

          // aria-invalid border color
          'aria-invalid:border-error',
        ],
      },

      textAlign: {
        left: 'justify-start text-left',
        center: 'justify-center text-center',
        right: 'justify-end text-right',
      },

      isFullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      color: 'text',
      roundedSize: 'md',
      textAlign: 'center',
      isFullWidth: false,
    },
  }
);

/**
 * Enhanced Button component props with comprehensive type safety and accessibility features
 */
export type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  VariantProps<typeof buttonVariants> & {
    /**
     * Accessible label for screen readers and assistive technologies.
     * This is required for accessibility compliance.
     */
    label: string | null;

    /**
     * Optional icon to display on the left side of the button
     */
    Icon?: FC | LucideIcon;

    /**
     * Optional icon to display on the right side of the button
     */
    IconRight?: FC | LucideIcon;

    /**
     * Additional CSS classes for icon styling
     */
    iconClassName?: string;

    /**
     * Shows loading spinner and disables button interaction when true
     */
    isLoading?: boolean;

    /**
     * Marks the button as active (useful for navigation or toggle states)
     */
    isActive?: boolean;

    /**
     * Marks the button as selected
     */
    isSelected?: boolean;

    /**
     * Makes the button span the full width of its container
     */
    isFullWidth?: boolean;

    /**
     * Additional description for complex buttons (optional)
     */
    'aria-describedby'?: string;

    /**
     * Expanded state for collapsible sections (optional)
     */
    'aria-expanded'?: boolean;

    /**
     * Controls whether the button has popup/menu (optional)
     */
    'aria-haspopup'?:
      | boolean
      | 'true'
      | 'false'
      | 'menu'
      | 'listbox'
      | 'tree'
      | 'grid'
      | 'dialog';

    /**
     * Indicates if button controls are currently pressed (for toggle buttons)
     */
    'aria-pressed'?: boolean;
  };

/**
 * Button Component - A comprehensive, accessible button component
 *
 * Features:
 * - Full accessibility compliance with ARIA attributes
 * - Multiple variants and sizes for different use cases
 * - Icon support (left and right positioning)
 * - Loading states with spinner
 * - Keyboard navigation support
 * - Focus management with visible indicators
 * - Responsive design adaptations
 *
 * @example
 * ```tsx
 * // Basic button
 * <Button label="Click me">Click me</Button>
 *
 * // Button with icon and loading state
 * <Button
 *   label="Save document"
 *   Icon={SaveIcon}
 *   isLoading={saving}
 *   disabled={!hasChanges}
 * >
 *   Save
 * </Button>
 *
 * // Error action button
 * <Button
 *   variant="outline"
 *   color="error"
 *   label="Delete item permanently"
 *   aria-describedby="delete-warning"
 * >
 *   Delete
 * </Button>
 * ```
 */
export const Button: FC<ButtonProps> = ({
  variant,
  size,
  color,
  children,
  Icon,
  IconRight,
  iconClassName,
  isLoading = false,
  isActive,
  isSelected,
  isFullWidth,
  roundedSize,
  textAlign,
  disabled,
  label,
  className,
  type = 'button',
  'aria-describedby': ariaDescribedBy,
  'aria-expanded': ariaExpanded,
  'aria-haspopup': ariaHasPopup,
  'aria-pressed': ariaPressed,
  ...props
}) => {
  const isLink = variant === 'link' || variant === 'invisible-link';
  const isIconOnly = !children && (Icon || IconRight);

  const accessibilityProps = {
    'aria-label': isIconOnly ? (label ?? undefined) : undefined,
    'aria-labelledby': !isIconOnly ? undefined : undefined,
    'aria-describedby': ariaDescribedBy,
    'aria-expanded': ariaExpanded,
    'aria-haspopup': ariaHasPopup,
    'aria-pressed': isActive !== undefined ? isActive : ariaPressed,
    'aria-busy': isLoading,
    'aria-current': (isActive ? 'page' : undefined) as 'page' | undefined,
    'aria-disabled': disabled || isLoading,
    'aria-selected': isSelected,
  };

  const isSquareButton =
    size === 'icon-sm' ||
    size === 'icon-md' ||
    size === 'icon-lg' ||
    size === 'icon-xl';

  return (
    <button
      disabled={isLoading || disabled}
      role={isLink ? 'link' : 'button'}
      type={type}
      className={buttonVariants({
        variant,
        size,
        color,
        isFullWidth,
        roundedSize,
        textAlign: textAlign ?? (IconRight ? 'left' : 'center'),
        className,
      })}
      {...accessibilityProps}
      {...props}
    >
      {Icon && !isLoading && (
        <Icon
          className={buttonIconVariants({
            size,
            className: cn(!isSquareButton && 'mr-3', iconClassName),
          })}
          aria-hidden="true"
        />
      )}

      <div
        className={cn(
          'flex items-center justify-center transition-[width] duration-300',
          isLoading && size === 'sm' && 'w-3',
          isLoading && size === 'md' && 'w-4',
          isLoading && size === 'lg' && 'w-6',
          isLoading && size === 'xl' && 'w-8'
        )}
      >
        <Loader
          className={buttonIconVariants({
            size,
            className: cn(!isSquareButton && 'mr-3', iconClassName),
          })}
          isLoading={isLoading}
          aria-hidden="true"
          data-testid="loader"
        />
      </div>

      {children && (
        <span className="flex-1 truncate whitespace-nowrap">{children}</span>
      )}

      {!children && isIconOnly && <span className="sr-only">{label}</span>}

      {IconRight && (
        <IconRight
          className={buttonIconVariants({
            size,
            className: cn(!isSquareButton && 'ml-3', iconClassName),
          })}
          aria-hidden="true"
        />
      )}
    </button>
  );
};
