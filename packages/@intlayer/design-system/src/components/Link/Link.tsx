import { getLocalizedUrl } from '@intlayer/core';
import type { LocalesValues } from '@intlayer/types';
import { cva, type VariantProps } from 'class-variance-authority';
import { ExternalLink, MoveRight } from 'lucide-react';
import type { AnchorHTMLAttributes, DetailedHTMLProps, FC } from 'react';
import { cn } from '../../utils/cn';

/**
 * Visual style variants for Link component
 *
 * @enum {string}
 */
export enum LinkVariant {
  /** Default underlined link with hover effects */
  DEFAULT = 'default',
  /** Link without visible underline or hover effects */
  INVISIBLE_LINK = 'invisible-link',
  /** Button-styled link with solid background */
  BUTTON = 'button',
  /** Button-styled link with outlined border */
  BUTTON_OUTLINED = 'button-outlined',
  /** Link with subtle hover background effect */
  HOVERABLE = 'hoverable',
}

/**
 * Color theme variants for Link component
 *
 * @enum {string}
 */
export enum LinkColor {
  /** Primary brand color */
  PRIMARY = 'primary',
  /** Secondary brand color */
  SECONDARY = 'secondary',
  /** Destructive/danger color for critical actions */
  DESTRUCTIVE = 'destructive',
  /** Neutral/muted color for less prominent links */
  NEUTRAL = 'neutral',
  /** Light color for dark backgrounds */
  LIGHT = 'light',
  /** Dark color for light backgrounds */
  DARK = 'dark',
  /** Default text color */
  TEXT = 'text',
  /** Inverse text color for opposite backgrounds */
  TEXT_INVERSE = 'text-inverse',
  /** Error/red color for error states */
  ERROR = 'error',
  /** Success/green color for positive actions */
  SUCCESS = 'success',
  /** Custom color - no default styling applied */
  CUSTOM = 'custom',
}

/** Available rounded corner sizes for the container */
export enum LinkRoundedSize {
  NONE = 'none',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
  TWO_XL = '2xl',
  THREE_XL = '3xl',
  FULL = 'full',
}

export enum LinkSize {
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
  CUSTOM = 'custom',
}

/**
 * Underline style options for Link component
 *
 * @enum {string}
 */
export enum LinkUnderlined {
  /** Default underline behavior based on variant */
  DEFAULT = 'default',
  /** Always show underline */
  TRUE = 'true',
  /** Never show underline */
  FALSE = 'false',
}

/**
 * Class variance authority configuration for Link component styling
 * Defines the visual appearance based on variant, color, and underline options
 */
export const linkVariants = cva(
  'gap-3 transition-all duration-300 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        [`${LinkVariant.DEFAULT}`]:
          'h-auto justify-start border-inherit bg-current/0 px-1 underline-offset-4 hover:bg-current/0 hover:underline',
        [`${LinkVariant.INVISIBLE_LINK}`]:
          'h-auto justify-start border-inherit bg-current/0 px-1 underline-offset-4 hover:bg-current/0',

        [`${LinkVariant.BUTTON}`]:
          'relative flex cursor-pointer flex-row items-center justify-center gap-2 rounded-full bg-current text-center font-medium text-text ring-0 ring-neutral/20 *:text-text-opposite hover:bg-current/90 hover:ring-6 aria-selected:ring-6',

        [`${LinkVariant.BUTTON_OUTLINED}`]:
          'relative flex cursor-pointer flex-row items-center justify-center gap-2 rounded-full border-[1.5px] border-current text-center font-medium text-text ring-0 ring-neutral/20 *:text-text hover:bg-current/10 hover:ring-6 aria-selected:ring-6',

        [`${LinkVariant.HOVERABLE}`]:
          'block rounded-lg border-none bg-current/0 hover:bg-current/20 aria-[current]:bg-current/5',
      },
      roundedSize: {
        [`${LinkRoundedSize.NONE}`]: 'rounded-none',
        [`${LinkRoundedSize.SM}`]:
          'rounded-lg [corner-shape:squircle] supports-[corner-shape:squircle]:rounded-xl',
        [`${LinkRoundedSize.MD}`]:
          'rounded-xl [corner-shape:squircle] supports-[corner-shape:squircle]:rounded-2xl',
        [`${LinkRoundedSize.LG}`]:
          'rounded-2xl [corner-shape:squircle] supports-[corner-shape:squircle]:rounded-3xl',
        [`${LinkRoundedSize.XL}`]:
          'rounded-3xl [corner-shape:squircle] supports-[corner-shape:squircle]:rounded-4xl',
        [`${LinkRoundedSize.TWO_XL}`]:
          'rounded-4xl [corner-shape:squircle] supports-[corner-shape:squircle]:rounded-[2.5rem]',
        [`${LinkRoundedSize.THREE_XL}`]:
          'rounded-[2.5rem] [corner-shape:squircle] supports-[corner-shape:squircle]:rounded-[3rem]',
        [`${LinkRoundedSize.FULL}`]: 'rounded-full',
      },
      color: {
        [`${LinkColor.PRIMARY}`]: 'text-primary',
        [`${LinkColor.SECONDARY}`]: 'text-secondary',
        [`${LinkColor.DESTRUCTIVE}`]: 'text-destructive',
        [`${LinkColor.NEUTRAL}`]: 'text-neutral',
        [`${LinkColor.LIGHT}`]: 'text-white',
        [`${LinkColor.DARK}`]: 'text-neutral-800',
        [`${LinkColor.TEXT}`]: 'text-text',
        [`${LinkColor.TEXT_INVERSE}`]: 'text-text-opposite',
        [`${LinkColor.ERROR}`]: 'text-error',
        [`${LinkColor.SUCCESS}`]: 'text-success',
        [`${LinkColor.CUSTOM}`]: '',
      },
      size: {
        [`${LinkSize.SM}`]: 'text-sm',
        [`${LinkSize.MD}`]: 'text-base',
        [`${LinkSize.LG}`]: 'text-lg',
        [`${LinkSize.XL}`]: 'text-xl',
        [`${LinkSize.CUSTOM}`]: '',
      },
      underlined: {
        [LinkUnderlined.DEFAULT]: '',
        [LinkUnderlined.TRUE]: 'underline',
        [LinkUnderlined.FALSE]: 'no-underline',
      },
    },
    // Compound variants handle height and padding
    compoundVariants: [
      {
        variant: [LinkVariant.BUTTON, LinkVariant.BUTTON_OUTLINED],
        size: LinkSize.SM,
        class: 'min-h-7 px-3 max-md:py-1',
      },
      {
        variant: [LinkVariant.BUTTON, LinkVariant.BUTTON_OUTLINED],
        size: LinkSize.MD,
        class: 'min-h-8 px-6 max-md:py-2',
      },
      {
        variant: [LinkVariant.BUTTON, LinkVariant.BUTTON_OUTLINED],
        size: LinkSize.LG,
        class: 'min-h-10 px-8 max-md:py-3',
      },
      {
        variant: [LinkVariant.BUTTON, LinkVariant.BUTTON_OUTLINED],
        size: LinkSize.XL,
        class: 'min-h-11 px-10 max-md:py-4',
      },
    ],

    defaultVariants: {
      variant: LinkVariant.DEFAULT,
      color: LinkColor.PRIMARY,
      roundedSize: LinkRoundedSize.NONE,
      underlined: LinkUnderlined.DEFAULT,
      size: LinkSize.MD,
    },
  }
);

/**
 * Props interface for the Link component
 *
 * @interface LinkProps
 * @extends {DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>}
 * @extends {VariantProps<typeof linkVariants>}
 */
export type LinkProps = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> &
  VariantProps<typeof linkVariants> & {
    /**
     * Accessible label for screen readers (required)
     * Provides context about what the link does or where it leads
     * @example "Navigate to home page"
     */
    label: string;

    /**
     * Whether this link opens in a new tab/window
     * When true, adds target="_blank" and security attributes
     * Auto-detected for URLs starting with http/https when undefined
     * @default undefined (auto-detect based on href)
     */
    isExternalLink?: boolean;

    /**
     * If a link is a page section as '#id'
     * @default false
     */
    isPageSection?: boolean;

    /**
     * Whether this link represents the current page/active state
     * Adds aria-current="page" for accessibility
     * @default false
     */
    isActive?: boolean;

    /**
     * Locale for internationalized URLs
     * When provided, URLs are automatically localized using Intlayer
     * @example 'fr', 'es', 'en'
     */
    locale?: LocalesValues;
  };

/**
 * Utility function to determine if a link should be treated as external
 *
 * @param props - Link component props containing href and isExternalLink
 * @returns {boolean} True if the link should open externally
 *
 * @example
 * ```tsx
 * checkIsExternalLink({ href: '[https://example.com](https://example.com)' }) // true
 * checkIsExternalLink({ href: '/internal-page' }) // false
 * checkIsExternalLink({ href: '/page', isExternalLink: true }) // true
 * ```
 */
export const checkIsExternalLink = ({
  href,
  isExternalLink: isExternalLinkProp,
}: LinkProps): boolean => {
  const isValidHref = typeof href === 'string' && href.trim() !== '';
  const isExternalLink =
    isExternalLinkProp === true ||
    (typeof isExternalLinkProp === 'undefined' &&
      isValidHref &&
      /^https?:\/\//.test(href));

  return isExternalLink;
};

/**
 * Link Component
 *
 * A versatile link component that handles both internal and external navigation
 * with comprehensive internationalization support and multiple visual variants.
 * ...
 */
export const Link: FC<LinkProps> = (props) => {
  const {
    variant = LinkVariant.DEFAULT,
    color = LinkColor.PRIMARY,
    roundedSize,
    children,
    label,
    className,
    isActive,
    underlined,
    locale,
    size,
    isExternalLink: isExternalLinkProp,
    isPageSection: isPageSectionProp,
    href: hrefProp,
    ...otherProps
  } = props;

  const isExternalLink = isExternalLinkProp ?? checkIsExternalLink(props);
  const isPageSection = isPageSectionProp ?? hrefProp?.startsWith('#') ?? false;

  const isChildrenString = typeof children === 'string';

  const rel = isExternalLink ? 'noopener noreferrer nofollow' : undefined;

  const target = isExternalLink ? '_blank' : '_self';

  const href =
    locale && hrefProp && !isExternalLink && !isPageSection
      ? getLocalizedUrl(hrefProp, locale)
      : hrefProp;

  const isButton = variant === 'button' || variant === 'button-outlined';

  return (
    <a
      href={href}
      aria-label={label}
      rel={rel}
      target={target}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        linkVariants({
          variant,
          color,
          roundedSize,
          underlined,
          size,
          className: isButton ? undefined : className,
        })
      )}
      {...otherProps}
    >
      {isButton ? <span className={className}>{children}</span> : children}

      {isExternalLink && isChildrenString && (
        <ExternalLink className="ml-2 inline-block size-4" />
      )}
      {isPageSection && <MoveRight className="ml-2 inline-block size-4" />}
    </a>
  );
};
