import { cva, type VariantProps } from 'class-variance-authority';
import type { LucideIcon } from 'lucide-react';
import type { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';
import { cn } from '../../utils/cn';
import { Loader } from '../Loader';

/**
 * Button size variants for different use cases
 */
export enum ButtonSize {
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
  ICON_SM = 'icon-sm',
  ICON_MD = 'icon-md',
  ICON_LG = 'icon-lg',
  ICON_XL = 'icon-xl',
}

const buttonIconVariants = cva('flex-none shrink-0', {
  variants: {
    size: {
      [`${ButtonSize.SM}`]: 'size-3',
      [`${ButtonSize.MD}`]: 'size-4',
      [`${ButtonSize.LG}`]: 'size-5',
      [`${ButtonSize.XL}`]: 'size-6',
      [`${ButtonSize.ICON_SM}`]: 'size-3',
      [`${ButtonSize.ICON_MD}`]: 'size-4',
      [`${ButtonSize.ICON_LG}`]: 'size-5',
      [`${ButtonSize.ICON_XL}`]: 'size-6',
    },
  },
  defaultVariants: {
    size: ButtonSize.MD,
  },
});

/**
 * Button visual style variants
 */
export enum ButtonVariant {
  DEFAULT = 'default',
  NONE = 'none',
  OUTLINE = 'outline',
  LINK = 'link',
  INVISIBLE_LINK = 'invisible-link',
  HOVERABLE = 'hoverable',
  FADE = 'fade',
  INPUT = 'input',
}

/**
 * Button color themes that work with the design system
 */
export enum ButtonColor {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  DESTRUCTIVE = 'destructive',
  NEUTRAL = 'neutral',
  LIGHT = 'light',
  DARK = 'dark',
  TEXT = 'text',
  CARD = 'card',
  TEXT_INVERSE = 'text-inverse',
  CURRENT = 'current',
  ERROR = 'error',
  SUCCESS = 'success',
  CUSTOM = 'custom',
}

/**
 * Text alignment options for button content
 */
export enum ButtonTextAlign {
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right',
}

/**
 * Enhanced button variants with improved accessibility and focus states
 */
const buttonVariants = cva(
  'relative inline-flex cursor-pointer items-center justify-center font-medium ring-0 transition-all duration-300 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      size: {
        [`${ButtonSize.SM}`]: 'min-h-7 px-3 text-xs max-md:py-1',
        [`${ButtonSize.MD}`]: 'min-h-8 px-6 text-sm max-md:py-2',
        [`${ButtonSize.LG}`]: 'min-h-10 px-8 text-lg max-md:py-3',
        [`${ButtonSize.XL}`]: 'min-h-11 px-10 text-xl max-md:py-4',
        [`${ButtonSize.ICON_SM}`]: 'p-1.5',
        [`${ButtonSize.ICON_MD}`]: 'p-1.5',
        [`${ButtonSize.ICON_LG}`]: 'p-2',
        [`${ButtonSize.ICON_XL}`]: 'p-3',
      },
      color: {
        [`${ButtonColor.PRIMARY}`]:
          'hover-primary-500/20 text-primary ring-primary-500/20 *:text-text-light',
        [`${ButtonColor.SECONDARY}`]:
          'hover-secondary-500/20 text-secondary ring-secondary-500/20 *:text-text-light',
        [`${ButtonColor.DESTRUCTIVE}`]:
          'hover-destructive-500/20 text-destructive ring-destructive-500/20 *:text-text-light',
        [`${ButtonColor.NEUTRAL}`]:
          'hover-neutral-500/20 text-neutral ring-neutral-500/20 *:text-text-light',
        [`${ButtonColor.CARD}`]:
          'hover-card-500/20 text-card ring-card-500/20 *:text-text-light',
        [`${ButtonColor.LIGHT}`]:
          'hover-white-500/20 text-white ring-white/20 *:text-text-light',
        [`${ButtonColor.DARK}`]:
          'hover-neutral-500/20 text-neutral-800 ring-neutral-800/50 *:text-text-light',
        [`${ButtonColor.TEXT}`]:
          'hover-neutral-500/20 text-text ring-neutral-500/20 *:text-text-opposite',
        [`${ButtonColor.CURRENT}`]:
          'hover-current-500/20 text-current ring-current/20 *:text-text-light',
        [`${ButtonColor.TEXT_INVERSE}`]:
          'hover-neutral-500/20 text-text-opposite ring-neutral-500/20 *:text-text',
        [`${ButtonColor.ERROR}`]:
          'hover-error-500/20 text-error ring-error/20 *:text-text-light',
        [`${ButtonColor.SUCCESS}`]:
          'hover-success-500/20 text-success ring-success/20 *:text-text-light',
        [`${ButtonColor.CUSTOM}`]: '',
      },
      variant: {
        [`${ButtonVariant.DEFAULT}`]: [
          'rounded-lg bg-current',
          'hover:bg-current/90',

          // Hover ring (similar spirit to your input)
          'hover:ring-6', // width
          'aria-selected:ring-6',
        ],

        [`${ButtonVariant.OUTLINE}`]: [
          'rounded-lg border-[1.5px] border-current bg-current/0 *:text-current!',
          'hover:bg-current/10',

          // Same hover ring behavior as DEFAULT for coherence
          'hover:ring-6',
          'aria-selected:ring-6',
        ],

        [`${ButtonVariant.NONE}`]:
          'border-none bg-current/0 text-inherit hover:bg-current/0',

        [`${ButtonVariant.LINK}`]:
          'h-auto justify-start border-inherit bg-transparent px-1 underline-offset-4 *:text-current! hover:bg-transparent hover:underline',

        [`${ButtonVariant.INVISIBLE_LINK}`]:
          'h-auto justify-start border-inherit bg-transparent px-1 underline-offset-4 *:text-current! hover:bg-transparent',

        [`${ButtonVariant.HOVERABLE}`]:
          'rounded-lg border-none bg-current/0 transition *:text-current! hover:bg-current/10 aria-[current]:bg-current/5',

        [`${ButtonVariant.FADE}`]:
          'rounded-lg border-none bg-current/10 transition *:text-current! hover:bg-current/20 aria-[current]:bg-current/5',

        [`${ButtonVariant.INPUT}`]: [
          'w-full select-text resize-none rounded-xl text-base shadow-none outline-none',
          'ring-0 transition-shadow duration-100 md:text-sm',
          'bg-neutral-50 text-text dark:bg-neutral-950',
          'focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-neutral-100 dark:focus-visible:ring-neutral-700',
          'focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-700',
          '[box-shadow:none] focus:[box-shadow:none]',
          'aria-invalid:border-error',
          'disabled:opacity-50',
        ],
      },

      textAlign: {
        [`${ButtonTextAlign.LEFT}`]: 'justify-start text-left',
        [`${ButtonTextAlign.CENTER}`]: 'justify-center text-center',
        [`${ButtonTextAlign.RIGHT}`]: 'justify-end text-right',
      },

      isFullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: `${ButtonVariant.DEFAULT}`,
      size: `${ButtonSize.MD}`,
      color: `${ButtonColor.CUSTOM}`,
      textAlign: `${ButtonTextAlign.CENTER}`,
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
    label: string;

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
 * // Destructive action button
 * <Button
 *   variant={`${ButtonVariant.OUTLINE}`}
 *   color={ButtonColor.DESTRUCTIVE}
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
  isActive = false,
  isSelected = false,
  isFullWidth = false,
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
  const isLink =
    variant === `${ButtonVariant.LINK}` ||
    variant === `${ButtonVariant.INVISIBLE_LINK}`;
  const isIconOnly = !children && (Icon || IconRight);

  const accessibilityProps = {
    'aria-label': isIconOnly ? label : undefined,
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
    size === ButtonSize.ICON_SM ||
    size === ButtonSize.ICON_MD ||
    size === ButtonSize.ICON_LG ||
    size === ButtonSize.ICON_XL;

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
        textAlign:
          textAlign ??
          (IconRight ? ButtonTextAlign.LEFT : ButtonTextAlign.CENTER),
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
          'flex w-0 items-center justify-center transition-[width] duration-300',
          isLoading && size === ButtonSize.SM && 'w-3',
          isLoading && size === ButtonSize.MD && 'w-4',
          isLoading && size === ButtonSize.LG && 'w-5',
          isLoading && size === ButtonSize.XL && 'w-6'
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
