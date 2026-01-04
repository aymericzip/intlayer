import { cn } from '@utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';

/**
 * Badge color variants enum
 * @description Defines the available color themes for the badge component
 */
export enum BadgeColor {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  DESTRUCTIVE = 'destructive',
  SUCCESS = 'success',
  ERROR = 'error',
  NEUTRAL = 'neutral',
  LIGHT = 'light',
  DARK = 'dark',
  TEXT = 'text',
  CUSTOM = 'custom',
}

/**
 * Badge visual variants enum
 * @description Defines the available visual styles for the badge component
 */
export enum BadgeVariant {
  DEFAULT = 'default',
  NONE = 'none',
  OUTLINE = 'outline',
  HOVERABLE = 'hoverable',
}

/**
 * Badge size variants enum
 * @description Defines the available sizes for the badge component
 */
export enum BadgeSize {
  SMALL = 'sm',
  MEDIUM = 'md',
  LARGE = 'lg',
}

/**
 * Badge component variants using class-variance-authority
 * @description Defines the styling variants for different badge combinations
 */
export const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2.5 py-0.5 font-semibold text-xs transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      color: {
        [BadgeColor.PRIMARY]:
          'border-primary bg-primary text-primary hover:bg-primary-500',
        [BadgeColor.SECONDARY]:
          'border-secondary bg-secondary text-secondary hover:bg-secondary-300',
        [BadgeColor.DESTRUCTIVE]:
          'border-destructive bg-destructive text-destructive hover:bg-destructive-500',
        [BadgeColor.SUCCESS]:
          'border-success bg-success text-success hover:bg-success-500',
        [BadgeColor.ERROR]:
          'border-error bg-error text-error hover:bg-error-500',
        [BadgeColor.NEUTRAL]:
          'border-neutral bg-neutral text-neutral hover:bg-neutral-600',
        [BadgeColor.LIGHT]:
          'border-white bg-white text-white hover:bg-neutral-500',
        [BadgeColor.DARK]:
          'border-neutral-800 bg-neutral-800 text-neutral-800 hover:bg-neutral-900',
        [BadgeColor.TEXT]: 'border-text bg-text text-text hover:opacity-80',
        [BadgeColor.CUSTOM]: '',
      },
      variant: {
        [BadgeVariant.DEFAULT]: 'rounded-lg text-text-opposite',
        [BadgeVariant.NONE]:
          'border-none bg-opacity-0 text-inherit hover:bg-opacity-0',
        [BadgeVariant.OUTLINE]:
          'rounded-lg border-[1.3px] bg-opacity-0 hover:bg-opacity-30',
        [BadgeVariant.HOVERABLE]:
          'rounded-lg border-none bg-opacity-0 transition hover:bg-opacity-10',
      },
      size: {
        [BadgeSize.SMALL]: 'px-2 py-0.5 text-xs',
        [BadgeSize.MEDIUM]: 'px-2.5 py-0.5 text-xs',
        [BadgeSize.LARGE]: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: BadgeVariant.DEFAULT,
      color: BadgeColor.PRIMARY,
      size: BadgeSize.MEDIUM,
    },
  }
);

/**
 * Badge component props interface
 * @description Comprehensive props for the Badge component with accessibility and interactive features
 */
export interface BadgeProps extends HTMLAttributes<HTMLElement> {
  /** The content to display inside the badge */
  children?: React.ReactNode;
  /** Color theme variant */
  color?: BadgeColor;
  /** Visual style variant */
  variant?: BadgeVariant;
  /** Size of the badge */
  size?: BadgeSize;
  /** Whether the badge is clickable */
  clickable?: boolean;
  /** Whether the badge is dismissible (shows close button) */
  dismissible?: boolean;
  /** Click handler for the badge */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Click handler for the dismiss button */
  onDismiss?: () => void;
  /** ARIA label for accessibility */
  'aria-label'?: string;
  /** Badge role for accessibility (default: 'status') */
  role?: 'status' | 'button' | 'generic';
  /** Whether badge should be focusable */
  tabIndex?: number;
}

/**
 * Utility type for badge variant props
 */
export type BadgeVariantProps = VariantProps<typeof badgeVariants>;

/**
 * Badge component for displaying status indicators, labels, and notifications
 *
 * @description A flexible badge component that supports multiple visual styles, colors, and interactive features.
 * It maintains accessibility standards and provides comprehensive customization options.
 *
 * @example
 * ```tsx
 * // Basic badge
 * <Badge>New</Badge>
 *
 * // Colored badge
 * <Badge color={BadgeColor.DESTRUCTIVE}>Error</Badge>
 *
 * // Clickable badge
 * <Badge clickable onClick={() => console.log('clicked')}>
 *   Clickable
 * </Badge>
 *
 * // Dismissible badge
 * <Badge dismissible onDismiss={() => console.log('dismissed')}>
 *   Dismissible
 * </Badge>
 * ```
 */
export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = BadgeVariant.DEFAULT,
  color = BadgeColor.PRIMARY,
  size = BadgeSize.MEDIUM,
  children,
  clickable = false,
  dismissible = false,
  onClick,
  onDismiss,
  role,
  tabIndex,
  'aria-label': ariaLabel,
  ...props
}) => {
  const Component = clickable ? 'button' : 'span';

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (clickable && onClick && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onClick(event as any);
    }
  };

  const handleDismiss = (event: React.MouseEvent) => {
    event.stopPropagation();
    onDismiss?.();
  };

  return (
    <Component
      className={cn(
        badgeVariants({ variant, color, size }),
        clickable &&
          'cursor-pointer hover:opacity-80 focus-visible:ring-2 focus-visible:ring-offset-2',
        dismissible && 'pr-1',
        className
      )}
      onClick={clickable ? onClick : undefined}
      onKeyDown={clickable ? handleKeyDown : undefined}
      role={role || (clickable ? 'button' : 'status')}
      tabIndex={clickable ? (tabIndex ?? 0) : tabIndex}
      aria-label={ariaLabel || (clickable ? `${children} button` : undefined)}
      {...props}
    >
      {children}
      {dismissible && (
        <button
          type="button"
          className="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full hover:bg-black/10 focus:outline-none focus:ring-1 focus:ring-offset-1"
          onClick={handleDismiss}
          aria-label={`Remove ${children} badge`}
        >
          <svg
            className="size-3"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-label="Remove badge"
          >
            <title>Remove badge</title>
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </Component>
  );
};
