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
          'h-auto justify-start border-inherit bg-transparent px-1 font-medium decoration-[1.5] underline-offset-5 hover:bg-transparent hover:text-current/80 hover:underline hover:underline-offset-6',
        'invisible-link':
          'h-auto justify-start border-inherit bg-transparent px-1',

        button:
          'relative inline-flex min-h-8 cursor-pointer flex-row items-center justify-center gap-2 rounded-full px-6 text-center font-medium text-sm ring-0 hover:ring-5 aria-selected:ring-5 aria-[current]:ring-5 max-md:py-2',

        'button-outlined':
          'relative inline-flex min-h-8 cursor-pointer flex-row items-center justify-center gap-2 rounded-full border-[1.3px] px-6 text-center font-medium text-sm ring-0 hover:bg-current/10 hover:ring-5 aria-selected:ring-5 aria-[current]:ring-5 max-md:py-2',

        hoverable:
          'rounded-lg border-none bg-transparent transition hover:bg-current/10 aria-[current]:bg-current/5',
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
      // Pour "default" / "invisible-link" / "hoverable" : juste la couleur du texte
      color: {
        primary: 'text-primary',
        secondary: 'text-secondary',
        neutral: 'text-neutral',
        light: 'text-white',
        dark: 'text-neutral-800',
        text: 'text-foreground',
        'text-inverse': 'text-foreground-opposite', // seulement utilisé hors button/button-outlined
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
    compoundVariants: [
      // ----------------------------------------------------------------
      // BUTTON PLEIN : paires fond/texte EXPLICITES, tirées du thème réel
      // ----------------------------------------------------------------
      {
        variant: 'button',
        color: 'primary',
        class: 'bg-primary text-primary-foreground ring-primary/20',
      },
      {
        variant: 'button',
        color: 'secondary',
        class: 'bg-secondary text-secondary-foreground ring-secondary/20',
      },
      {
        variant: 'button',
        color: 'neutral',
        class: 'bg-neutral text-white ring-neutral/20',
      },
      {
        variant: 'button',
        color: 'light',
        class: 'bg-white text-black ring-white/20',
      },
      {
        variant: 'button',
        color: 'dark',
        class: 'bg-neutral-800 text-white ring-neutral-800/20',
      },
      {
        variant: 'button',
        color: 'text',
        class: 'bg-foreground text-background ring-foreground/20',
      },
      {
        variant: 'button',
        color: 'text-inverse',
        class: 'bg-background text-foreground ring-foreground/20',
      },
      {
        variant: 'button',
        color: 'error',
        class: 'bg-error text-white ring-error/20',
      },
      {
        variant: 'button',
        color: 'success',
        class: 'bg-success text-white ring-success/20',
      },

      // ----------------------------------------------------------------
      // BUTTON OUTLINED : bordure + texte de la couleur, fond transparent
      // ----------------------------------------------------------------
      {
        variant: 'button-outlined',
        color: 'primary',
        class: 'border-primary text-primary hover:bg-primary/10',
      },
      {
        variant: 'button-outlined',
        color: 'secondary',
        class: 'border-secondary text-secondary hover:bg-secondary/10',
      },
      {
        variant: 'button-outlined',
        color: 'neutral',
        class: 'border-neutral text-neutral hover:bg-neutral/10',
      },
      {
        variant: 'button-outlined',
        color: 'light',
        class: 'border-white text-white hover:bg-white/10',
      },
      {
        variant: 'button-outlined',
        color: 'dark',
        class: 'border-neutral-800 text-neutral-800 hover:bg-neutral-800/10',
      },
      {
        variant: 'button-outlined',
        color: 'text',
        class: 'border-foreground text-foreground hover:bg-foreground/10',
      },
      {
        variant: 'button-outlined',
        color: 'text-inverse',
        class: 'border-background text-background hover:bg-background/10',
      },
      {
        variant: 'button-outlined',
        color: 'error',
        class: 'border-error text-error hover:bg-error/10',
      },
      {
        variant: 'button-outlined',
        color: 'success',
        class: 'border-success text-success hover:bg-success/10',
      },

      // Min height et padding selon size (inchangé)
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
