import { User } from 'lucide-react';
import type { ComponentProps, FC, HTMLAttributes } from 'react';
import { useMemo } from 'react';
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
 * @description Gets the capital letters from a name.
 * @param name - The name to extract capitals from.
 * @param separator - The separator to split the name (default is an empty string, which splits by each character).
 * @returns {string[]} An array of capital letters from the name.
 */
export const getCapitals = (name: string, separator = ' '): string[] => {
  if (!name) return [];

  const parts =
    separator === ' '
      ? name
          .trim()
          .split(/\s+/) // handle multiple spaces
      : name.split(separator);

  return parts.filter(Boolean).map((word) => word.charAt(0).toUpperCase());
};

/**
 * Container component that renders either a button or div based on interactivity
 */
const Container: FC<
  HTMLAttributes<HTMLElement> & {
    isClickable: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  }
> = ({ isClickable, onClick, ...props }) => {
  if (isClickable && onClick) {
    return (
      <button
        {...(props as ComponentProps<'button'>)}
        onClick={onClick}
        type="button"
      />
    );
  }

  return (
    <div
      {...(props as ComponentProps<'div'>)}
      role={
        props.tabIndex !== undefined || props['aria-label'] ? 'img' : undefined
      }
    />
  );
};

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
        `rounded-full border-[1.5px] border-text p-[1.5px]`,
        size === 'sm' && 'size-7 border-[1px] p-[1px]',
        size === 'md' && 'size-9',
        size === 'lg' && 'size-12',
        size === 'xl' && 'size-16',
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
        <div className="absolute top-0 left-0 flex size-full flex-col items-center justify-center rounded-full bg-text text-text-opposite">
          {displayLoader && (
            <Loader className="w-3/4" aria-label="Loading user avatar" />
          )}

          {displayAvatar && (
            <img
              className="size-full rounded-full object-cover"
              src={src}
              srcSet={src}
              alt={alt ?? `Avatar of ${fullname}`}
              width={59}
              height={59}
              loading="lazy"
              draggable={false}
            />
          )}

          {displayInitials && (
            <div className="flex size-full items-center justify-center gap-[0.1rem] font-bold text-sm max-md:py-1">
              {capitals?.map((capital, index) => (
                <span key={`${capital}-${index}`}>{capital}</span>
              ))}
            </div>
          )}

          {displayUserIcon && (
            <User
              size={cn(
                size === 'sm' && 14,
                size === 'md' && 25,
                size === 'lg' && 30,
                size === 'xl' && 40
              )}
              aria-label="Default user icon"
            />
          )}
        </div>
      </div>
    </Container>
  );
};
