import { User } from 'lucide-react';
import type { ComponentProps, FC, HTMLAttributes } from 'react';
import { forwardRef, useMemo } from 'react';
import { cn } from '../../utils/cn';
import { Loader } from '../Loader';

/**
 * Props for the Avatar component
 */
export interface AvatarProps extends Omit<ComponentProps<'button'>, 'onClick'> {
  /** Image source URL for the avatar */
  src?: string;
  /** Full name used to generate initials and alt text */
  fullname?: string;
  /** Displays a loading spinner when true */
  isLoading?: boolean;
  /** Whether the user is authenticated */
  isLoggedIn?: boolean;
  /** Size variant of the avatar */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Click handler - when provided, makes the avatar clickable */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Alternative text for accessibility */
  alt?: string;
  /** Whether the avatar should be focusable when not clickable */
  focusable?: boolean;
}

/**
 * Size variants for the avatar
 */
const sizeVariants = {
  sm: 'size-6',
  md: 'size-9',
  lg: 'size-12',
  xl: 'size-16',
} as const;

/**
 * @description Gets the capital letters from a name.
 * @param name - The name to extract capitals from.
 * @param separator - The separator to split the name (default is an empty string, which splits by each character).
 * @returns {string[]} An array of capital letters from the name.
 */
export const getCapitals = (name: string, separator = ' '): string[] => {
  if (!name) return [];

  const parts =
    separator === ' '
      ? name.trim().split(/\s+/) // handle multiple spaces
      : name.split(separator);

  return parts.filter(Boolean).map((word) => word.charAt(0).toUpperCase());
};

/**
 * Container component that renders either a button or div based on interactivity
 */
const Container = forwardRef<
  HTMLElement,
  HTMLAttributes<HTMLElement> & {
    isClickable: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  }
>(({ isClickable, onClick, ...props }, ref) => {
  if (isClickable && onClick) {
    return (
      <button
        {...(props as ComponentProps<'button'>)}
        ref={ref as React.Ref<HTMLButtonElement>}
        onClick={onClick}
        type="button"
      />
    );
  }

  return (
    <div
      {...(props as ComponentProps<'div'>)}
      ref={ref as React.Ref<HTMLDivElement>}
      role={
        props.tabIndex !== undefined || props['aria-label'] ? 'img' : undefined
      }
    />
  );
});

Container.displayName = 'AvatarContainer';

/**
 * Avatar component that displays user profile images, initials, or a default user icon.
 * Supports loading states, authentication states, and accessibility features.
 *
 * @example
 * ```tsx
 * // With image
 * <Avatar src="https://example.com/avatar.jpg" fullname="John Doe" />
 *
 * // With initials
 * <Avatar fullname="John Doe" />
 *
 * // Clickable avatar
 * <Avatar
 *   fullname="John Doe"
 *   onClick={(e) => console.log('Avatar clicked')}
 * />
 *
 * // Loading state
 * <Avatar isLoading fullname="John Doe" />
 * ```
 */
export const Avatar: FC<AvatarProps> = ({
  fullname,
  className,
  isLoading = false,
  isLoggedIn = true,
  src,
  onClick,
  size = 'md',
  alt,
  focusable = false,
  ...props
}) => {
  const isImageDefined = Boolean(src);
  const isNameDefined = Boolean((fullname ?? '').length > 0);
  const capitals = fullname ? getCapitals(fullname) : undefined;

  // Display logic
  const displayLoader = isLoading;
  const displayAvatar = isLoggedIn && !displayLoader && isImageDefined;
  const displayInitials =
    isLoggedIn && !displayLoader && !displayAvatar && isNameDefined;
  const displayUserIcon =
    isLoggedIn && !displayLoader && !displayAvatar && !displayInitials;

  const isClickable = onClick !== undefined;
  const sizeClass = sizeVariants[size];

  // Accessibility attributes
  const accessibilityProps = useMemo(() => {
    const baseProps: Record<string, any> = {};

    if (displayAvatar && alt) {
      baseProps['aria-label'] = alt;
    } else if (displayAvatar && fullname) {
      baseProps['aria-label'] = `Avatar of ${fullname}`;
    } else if (displayInitials && fullname) {
      baseProps['aria-label'] = `Avatar initials for ${fullname}`;
    } else if (displayUserIcon) {
      baseProps['aria-label'] = 'Default user avatar';
    } else if (displayLoader) {
      baseProps['aria-label'] = 'Loading avatar';
      baseProps['aria-busy'] = true;
    }

    if (!isClickable && focusable) {
      baseProps.tabIndex = 0;
    }

    if (isClickable) {
      baseProps['aria-describedby'] = 'avatar-description';
    }

    return baseProps;
  }, [
    displayAvatar,
    displayInitials,
    displayUserIcon,
    displayLoader,
    alt,
    fullname,
    isClickable,
    focusable,
  ]);

  return (
    <Container
      isClickable={isClickable}
      className={cn(
        `border-text border-[1.5px] rounded-full p-[1.5px]`,
        sizeClass,
        isClickable &&
          `cursor-pointer hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`,
        !isClickable &&
          focusable &&
          `focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`,
        displayLoader && 'animate-pulse',
        className
      )}
      onClick={onClick}
      {...accessibilityProps}
      {...props}
    >
      <div className="relative flex size-full flex-row items-center justify-center">
        <div className="bg-text text-text-opposite absolute left-0 top-0 flex size-full flex-col items-center justify-center rounded-full">
          {displayLoader && (
            <Loader className="w-3/4" aria-label="Loading user avatar" />
          )}

          {displayAvatar && (
            <img
              className="size-full rounded-full object-cover"
              src={src}
              srcSet={src}
              alt={alt || `Avatar of ${fullname}`}
              width={59}
              height={59}
              loading="lazy"
            />
          )}

          {displayInitials && (
            <div
              className="flex size-full items-center justify-center gap-[0.1rem] text-sm font-bold max-md:py-1"
              aria-label={`Initials for ${fullname}`}
            >
              {capitals?.map((capital, index) => (
                <span key={`${capital}-${index}`}>{capital}</span>
              ))}
            </div>
          )}

          {displayUserIcon && (
            <User
              size={
                size === 'sm'
                  ? 14
                  : size === 'md'
                    ? 25
                    : size === 'lg'
                      ? 30
                      : 40
              }
              aria-label="Default user icon"
            />
          )}
        </div>
      </div>

      {isClickable && (
        <span id="avatar-description" className="sr-only">
          Click to view profile
        </span>
      )}
    </Container>
  );
};
