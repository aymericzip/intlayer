import type { LocalesValues } from '@intlayer/config/client';
import { getLocalizedUrl } from '@intlayer/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { ExternalLink } from 'lucide-react';
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
  'gap-3 transition focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        [`${LinkVariant.DEFAULT}`]:
          'h-auto justify-start border-inherit bg-current/0 px-1 underline-offset-4 hover:bg-current/0 hover:underline',
        [`${LinkVariant.INVISIBLE_LINK}`]:
          'h-auto justify-start border-inherit bg-current/0 px-1 underline-offset-4 hover:bg-current/0',
        [`${LinkVariant.BUTTON}`]:
          'flex min-h-8 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-current px-6 font-medium text-sm transition *:text-text-opposite focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 max-md:py-2',
        [`${LinkVariant.BUTTON_OUTLINED}`]:
          'flex min-h-8 items-center justify-center gap-2 whitespace-nowrap rounded-lg border-[1.5px] px-6 font-medium text-sm transition hover:bg-current/30 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 max-md:py-2',
        [`${LinkVariant.HOVERABLE}`]:
          'block rounded-lg border-none bg-current/0 transition hover:bg-current/20 aria-[current]:bg-current/5',
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
      underlined: {
        [LinkUnderlined.DEFAULT]: '',
        [LinkUnderlined.TRUE]: 'underline',
        [LinkUnderlined.FALSE]: 'no-underline',
      },
    },

    defaultVariants: {
      variant: LinkVariant.DEFAULT,
      color: LinkColor.PRIMARY,
      underlined: LinkUnderlined.DEFAULT,
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
 * checkIsExternalLink({ href: 'https://example.com' }) // true
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
 *
 * ## Key Features
 * - **Multiple Variants**: Default, invisible, button, outlined button, and hoverable styles
 * - **Color Themes**: Comprehensive color palette for different contexts and meanings
 * - **External Link Detection**: Automatic detection and handling of external URLs
 * - **Internationalization**: Built-in support for localized URLs via Intlayer
 * - **Security**: Automatic security attributes for external links (noopener, noreferrer)
 * - **Accessibility**: Full ARIA support with proper labels and current page indication
 * - **Visual Feedback**: Hover effects, underline options, and active states
 *
 * ## Use Cases
 * - Navigation within applications (internal links)
 * - External links to other websites with security measures
 * - Button-styled links for call-to-action scenarios
 * - Subtle hoverable links for navigation menus
 * - Multi-language website navigation with automatic URL localization
 *
 * ## Security Features
 * External links automatically receive security attributes:
 * - `rel="noopener noreferrer nofollow"` - Prevents security vulnerabilities
 * - `target="_blank"` - Opens in new tab/window
 * - External link icon indication for user clarity
 *
 * ## Internationalization
 * When used with Intlayer, the component automatically:
 * - Localizes internal URLs based on the current or specified locale
 * - Sets appropriate `hrefLang` attributes for SEO
 * - Maintains proper URL structure for multi-language sites
 *
 * @component
 * @example
 * ```tsx
 * // Basic internal link
 * <Link href="/about" label="Go to about page">
 *   About Us
 * </Link>
 *
 * // External link with auto-detection
 * <Link href="https://example.com" label="Visit external site">
 *   External Site
 * </Link>
 *
 * // Button-styled link
 * <Link
 *   href="/signup"
 *   variant={LinkVariant.BUTTON}
 *   color={LinkColor.PRIMARY}
 *   label="Sign up for account"
 * >
 *   Get Started
 * </Link>
 *
 * // Localized link
 * <Link
 *   href="/products"
 *   locale="fr"
 *   label="Voir les produits"
 * >
 *   Produits
 * </Link>
 *
 * // Active navigation link
 * <Link
 *   href="/dashboard"
 *   isActive={true}
 *   variant={LinkVariant.HOVERABLE}
 *   label="Current page: Dashboard"
 * >
 *   Dashboard
 * </Link>
 * ```
 *
 * @param props - Link component props
 * @param props.children - Content to display inside the link
 * @param props.href - URL or path to navigate to
 * @param props.label - Accessible label describing the link's purpose
 * @param props.variant - Visual style variant
 * @param props.color - Color theme for the link
 * @param props.underlined - Underline visibility option
 * @param props.isExternalLink - Override external link detection
 * @param props.isActive - Whether this link represents the current page
 * @param props.locale - Locale for URL internationalization
 * @param props.className - Additional CSS classes
 * @returns Accessible and internationalized link component
 */
export const Link: FC<LinkProps> = (props) => {
  const {
    variant = LinkVariant.DEFAULT,
    color = LinkColor.PRIMARY,
    children,
    label,
    className,
    isActive,
    underlined,
    locale,
    isExternalLink: isExternalLinkProp,
    href: hrefProp,
    ...otherProps
  } = props;

  const isExternalLink = checkIsExternalLink(props);
  const isChildrenString = typeof children === 'string';

  const rel = isExternalLink ? 'noopener noreferrer nofollow' : undefined;

  const target = isExternalLink ? '_blank' : '_self';

  const href =
    locale && hrefProp && !isExternalLink
      ? getLocalizedUrl(hrefProp, locale)
      : hrefProp;

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
          underlined,
          className,
        })
      )}
      {...otherProps}
    >
      {variant === 'button' ? <span>{children}</span> : children}
      {isExternalLink && isChildrenString && (
        <ExternalLink className="ml-2 inline-block size-4" />
      )}
    </a>
  );
};
