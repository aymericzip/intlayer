import { getLocalizedUrl } from '@intlayer/core/localization';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import { cn } from '@utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { ExternalLink, MoveRight } from 'lucide-react';
import {
  type AnchorHTMLAttributes,
  type DetailedHTMLProps,
  type FC,
  isValidElement,
  type ReactNode,
} from 'react';

export type LinkVariant =
  | 'default'
  | 'invisible-link'
  | 'button'
  | 'button-outlined'
  | 'hoverable';

/**
 * Color theme variants for Link component
 */
export type LinkColor =
  | 'primary'
  | 'secondary'
  | 'neutral'
  | 'light'
  | 'dark'
  | 'text'
  | 'text-inverse'
  | 'error'
  | 'success'
  | 'custom';

export type LinkRoundedSize =
  | 'none'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | 'full';

export type LinkSize = 'sm' | 'md' | 'lg' | 'xl' | 'custom';

export type LinkUnderlined = 'default' | 'true' | 'false';

export const linkVariants = cva(
  'gap-3 transition-all duration-300 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'h-auto justify-start border-inherit bg-current/0 px-1 font-medium decoration-[1.5] underline-offset-5 hover:bg-current/0 hover:text-current/80 hover:underline hover:underline-offset-6',
        'invisible-link':
          'h-auto justify-start border-inherit bg-current/0 px-1 underline-offset-5 hover:bg-current/0 aria-[current]:bg-current/5',

        button:
          'relative flex cursor-pointer flex-row items-center justify-center gap-2 rounded-full bg-current text-center font-medium text-text ring-0 *:text-text-opposite hover:bg-current/90 hover:ring-5 aria-selected:ring-5 aria-[current]:ring-5',

        'button-outlined':
          'relative flex cursor-pointer flex-row items-center justify-center gap-2 rounded-full border-[1.3px] border-current text-center font-medium text-text ring-0 *:text-text hover:bg-current/20 hover:ring-5 aria-selected:ring-5 aria-[current]:ring-5',

        hoverable:
          'rounded-lg border-none bg-current/0 transition *:text-current! hover:bg-current/20 aria-[current]:bg-current/5',
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
        full: 'rounded-full',
      },
      color: {
        primary: 'text-primary',
        secondary: 'text-secondary',
        neutral: 'text-neutral',
        light: 'text-white',
        dark: 'text-neutral-800',
        text: 'text-text',
        'text-inverse': 'text-text-opposite',
        error: 'text-error',
        success: 'text-success',
        custom: '',
      },
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
        custom: '',
      },
      underlined: {
        default: '',
        true: 'underline',
        false: 'no-underline',
      },
    },
    // Compound variants handle height and padding
    compoundVariants: [
      // ---------------------------------------------------------
      // FIX START: Correctly Handle Contrast for TEXT_INVERSE
      // ---------------------------------------------------------
      {
        // Filled Button + Inverse Color (e.g., White Button):
        // We DO NOT override parent text color (it must remain 'text-opposite' so bg-current is white).
        // We ONLY override children to be 'text-text' (Dark) so they show up on white.
        variant: 'button',
        color: 'text-inverse',
        class: '*:text-text',
      },
      {
        // Outlined Button + Inverse Color (e.g., White Border):
        // Parent is 'text-opposite' (Border is white).
        // Children must also be 'text-opposite' (White text) to show on dark background.
        variant: 'button-outlined',
        color: 'text-inverse',
        class: 'text-text-opposite *:text-text-opposite',
      },

      // Min height and padding for button variants
      {
        variant: ['button', 'button-outlined'],
        size: 'sm',
        class: 'min-h-7 px-3 text-xs max-md:py-1',
      },
      {
        variant: ['button', 'button-outlined'],
        size: 'md',
        class: 'min-h-8 px-6 text-sm max-md:py-2',
      },
      {
        variant: ['button', 'button-outlined'],
        size: 'lg',
        class: 'min-h-10 px-8 text-lg max-md:py-3',
      },
      {
        variant: ['button', 'button-outlined'],
        size: 'xl',
        class: 'min-h-11 px-10 text-xl max-md:py-4',
      },
      // Ring color variants
      {
        variant: ['button', 'button-outlined'],
        color: 'primary',
        class: 'ring-primary/20',
      },
      {
        variant: ['button', 'button-outlined'],
        color: 'secondary',
        class: 'ring-secondary/20',
      },
      {
        variant: ['button', 'button-outlined'],
        color: 'neutral',
        class: 'ring-neutral/20',
      },
      {
        variant: ['button', 'button-outlined'],
        color: 'light',
        class: 'ring-white/20',
      },
      {
        variant: ['button', 'button-outlined'],
        color: 'dark',
        class: 'ring-neutral-800/20',
      },
      {
        variant: ['button', 'button-outlined'],
        color: 'text',
        class: 'ring-text/20',
      },
      {
        variant: ['button', 'button-outlined'],
        color: 'text-inverse',
        class: 'ring-text-opposite/20',
      },
      {
        variant: ['button', 'button-outlined'],
        color: 'error',
        class: 'ring-error/20',
      },
      {
        variant: ['button', 'button-outlined'],
        color: 'success',
        class: 'ring-success/20',
      },
    ],

    defaultVariants: {
      variant: 'default',
      roundedSize: 'md',
      underlined: 'default',
      size: 'custom',
    },
  }
);

export type LinkProps = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> &
  VariantProps<typeof linkVariants> & {
    label: string;
    isExternalLink?: boolean;
    isPageSection?: boolean;
    isActive?: boolean;
    locale?: LocalesValues;
  };

export const checkIsExternalLink = (
  {
    href,
    isExternalLink: isExternalLinkProp,
  }: Pick<LinkProps, 'href' | 'isExternalLink'>,
  url?: string
): boolean => {
  // Explicit prop override takes precedence
  if (typeof isExternalLinkProp === 'boolean') {
    return isExternalLinkProp;
  }

  const isValidHref = typeof href === 'string' && href.trim() !== '';

  if (!isValidHref) return false;

  // Relative URLs (e.g., '/about') are always internal
  if (!/^https?:\/\//.test(href)) {
    return false;
  }

  // Compare base domains
  if (url) {
    try {
      const hrefHost = new URL(href).hostname;
      // Ensure the reference url has a protocol so URL() can parse it correctly
      const currentHost = new URL(
        url.startsWith('http') ? url : `https://${url}`
      ).hostname;

      // Extract the root domain (e.g., 'app.intlayer.org' -> 'intlayer.org')
      const getBaseDomain = (host: string) =>
        host.split('.').slice(-2).join('.');

      return getBaseDomain(hrefHost) !== getBaseDomain(currentHost);
    } catch {
      // If URL parsing fails for any reason, default to treating it as external
      return true;
    }
  }

  // Absolute URL with no comparison URL provided
  return true;
};

export const isTextChildren = (children: ReactNode): boolean => {
  if (typeof children === 'string' || typeof children === 'number') {
    return true;
  }
  if (Array.isArray(children)) {
    return children.every(isTextChildren);
  }
  if (isValidElement(children)) {
    return isTextChildren(
      (children.props as { children?: ReactNode }).children
    );
  }
  return false;
};

export const Link: FC<LinkProps> = (props) => {
  const {
    variant = 'default',
    color = 'custom',
    roundedSize,
    children,
    label,
    className,
    isActive,
    underlined,
    locale,
    size: sizeProp,
    isExternalLink: isExternalLinkProp,
    isPageSection: isPageSectionProp,
    href: hrefProp,
    ...otherProps
  } = props;

  const isButton = variant === 'button' || variant === 'button-outlined';
  const size = sizeProp ?? (isButton ? 'md' : 'custom');

  const isExternalLink = isExternalLinkProp ?? checkIsExternalLink(props);
  const isPageSection = isPageSectionProp ?? hrefProp?.startsWith('#') ?? false;

  const isChildrenString = isTextChildren(children);

  const rel = isExternalLink ? 'noopener noreferrer nofollow' : undefined;

  const target = isExternalLink ? '_blank' : '_self';

  const resolvedHref =
    locale && hrefProp && !isExternalLink && !isPageSection
      ? getLocalizedUrl(hrefProp, locale)
      : hrefProp;

  const href = resolvedHref === '' ? undefined : resolvedHref;

  return (
    <a
      href={href}
      aria-label={label}
      rel={rel}
      target={target}
      aria-current={isActive ? 'page' : undefined}
      suppressHydrationWarning
      className={cn(
        linkVariants({
          variant,
          color,
          roundedSize,
          underlined,
          size,
          className,
        })
      )}
      {...otherProps}
    >
      {isButton && isChildrenString ? <span>{children}</span> : children}

      {isExternalLink && isChildrenString && (
        <ExternalLink className="ml-2 inline-block size-4" />
      )}
      {isPageSection && <MoveRight className="ml-2 inline-block size-4" />}
    </a>
  );
};
