import { cva, type VariantProps } from 'class-variance-authority';
import type { LucideIcon } from 'lucide-react';
import type { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';
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

/**
 * Icon positioning within the button
 */
export enum ButtonIconPosition {
  LEFT = 'left',
  RIGHT = 'right',
}

const buttonIconVariants = cva('', {
  variants: {
    size: {
      [`${ButtonSize.SM}`]: '-translate-y-1/2 absolute top-1/2 size-3',
      [`${ButtonSize.MD}`]: '-translate-y-1/2 absolute top-1/2 size-4',
      [`${ButtonSize.LG}`]: '-translate-y-1/2 absolute top-1/2 size-5',
      [`${ButtonSize.XL}`]: '-translate-y-1/2 absolute top-1/2 size-6',
      [`${ButtonSize.ICON_SM}`]: 'size-3',
      [`${ButtonSize.ICON_MD}`]: 'size-4',
      [`${ButtonSize.ICON_LG}`]: 'size-5',
      [`${ButtonSize.ICON_XL}`]: 'size-6',
    },
    position: {
      [`${ButtonIconPosition.LEFT}`]: 'left-3',
      [`${ButtonIconPosition.RIGHT}`]: 'right-3',
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
  TEXT_INVERSE = 'text-inverse',
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
  'relative cursor-pointer truncate whitespace-nowrap font-medium transition-all duration-200 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
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
          'text-primary *:text-text-light focus:ring-primary-500',
        [`${ButtonColor.SECONDARY}`]:
          'text-secondary *:text-text-light focus:ring-secondary-500',
        [`${ButtonColor.DESTRUCTIVE}`]:
          'text-destructive *:text-text-light focus:ring-destructive-500',
        [`${ButtonColor.NEUTRAL}`]:
          'text-neutral *:text-text-light focus:ring-neutral-500',
        [`${ButtonColor.LIGHT}`]:
          'text-white *:text-text-light focus:ring-white/50',
        [`${ButtonColor.DARK}`]:
          'text-neutral-800 *:text-text-light focus:ring-neutral-800/50',
        [`${ButtonColor.TEXT}`]:
          'text-text *:text-text-opposite focus:ring-neutral-500',
        [`${ButtonColor.TEXT_INVERSE}`]:
          'text-text-opposite *:text-text focus:ring-neutral-500',
        [`${ButtonColor.ERROR}`]:
          'text-error *:text-text-light focus:ring-error/50',
        [`${ButtonColor.SUCCESS}`]:
          'text-success *:text-text-light focus:ring-success/50',
        [`${ButtonColor.CUSTOM}`]: 'focus:ring-primary-500',
      },
      variant: {
        [`${ButtonVariant.DEFAULT}`]:
          'rounded-lg bg-current hover:bg-current/90',
        [`${ButtonVariant.NONE}`]:
          'border-none bg-current/0 text-inherit hover:bg-current/0',
        [`${ButtonVariant.OUTLINE}`]:
          '*:!text-current rounded-lg border-[1.5px] border-current bg-current/0 hover:bg-current/30',
        [`${ButtonVariant.LINK}`]:
          '*:!text-current h-auto justify-start border-inherit bg-transparent px-1 underline-offset-4 hover:bg-transparent hover:underline',
        [`${ButtonVariant.INVISIBLE_LINK}`]:
          '*:!text-current h-auto justify-start border-inherit bg-transparent px-1 underline-offset-4 hover:bg-transparent',
        [`${ButtonVariant.HOVERABLE}`]:
          '*:!text-current rounded-lg border-none bg-current/0 transition hover:bg-current/10 aria-[current]:bg-current/5',
        [`${ButtonVariant.INPUT}`]: [
          '*:!text-current w-full select-text resize-none rounded-xl border-2 bg-input-background text-input-text text-sm shadow-none outline-0 transition-all',
          'border-input-border hover:border-input-border-hover focus:border-input-border-focus focus:outline-0 focus:[box-shadow:none]',
          'aria-[invalid=true]:border-error',
          'disabled:opacity-50',
        ],
      },

      textAlign: {
        [`${ButtonTextAlign.LEFT}`]: 'text-left',
        [`${ButtonTextAlign.CENTER}`]: 'text-center',
        [`${ButtonTextAlign.RIGHT}`]: 'text-right',
      },

      isFullWidth: {
        true: 'w-full',
        false: '',
      },

      hasIconLeft: {
        true: 'px-12',
        false: '',
      },
      hasIconRight: {
        true: 'pr-8',
        false: '',
      },
    },
    defaultVariants: {
      variant: ButtonVariant.DEFAULT,
      size: ButtonSize.MD,
      color: ButtonColor.CUSTOM,
      textAlign: ButtonTextAlign.CENTER,
      isFullWidth: false,
      hasIconRight: false,
      hasIconLeft: false,
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
 *   variant={ButtonVariant.OUTLINE}
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
    variant === ButtonVariant.LINK || variant === ButtonVariant.INVISIBLE_LINK;
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
  };

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
        hasIconLeft: Boolean(
          typeof children !== 'undefined' &&
            (typeof Icon !== 'undefined' || isLoading)
        ),
        hasIconRight: Boolean(
          typeof children !== 'undefined' && typeof IconRight !== 'undefined'
        ),
        className,
      })}
      {...accessibilityProps}
      {...props}
    >
      {Icon && !isLoading && (
        <Icon
          className={buttonIconVariants({
            size,
            className: iconClassName,
            position: ButtonIconPosition.LEFT,
          })}
          aria-hidden="true"
        />
      )}

      <Loader
        className={buttonIconVariants({
          size,
          className: iconClassName,
          position: ButtonIconPosition.LEFT,
        })}
        isLoading={isLoading}
        aria-hidden="true"
        data-testid="loader"
      />

      {children && <span>{children}</span>}

      {!children && isIconOnly && <span className="sr-only">{label}</span>}

      {IconRight && (
        <IconRight
          className={buttonIconVariants({
            size,
            className: iconClassName,
            position: ButtonIconPosition.RIGHT,
          })}
          aria-hidden="true"
        />
      )}
    </button>
  );
};
