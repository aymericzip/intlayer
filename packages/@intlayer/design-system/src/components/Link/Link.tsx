import configuration from '@intlayer/config/built';
import type { LocalesValues } from '@intlayer/config/client';
import { getLocalizedUrl } from '@intlayer/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { ExternalLink } from 'lucide-react';
import {
  type AnchorHTMLAttributes,
  type DetailedHTMLProps,
  type FC,
} from 'react';
import { cn } from '../../utils/cn';

export const linkVariants = cva(
  'gap-3 transition focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'h-auto justify-start border-inherit bg-current/0 px-1 underline-offset-4 hover:bg-current/0 hover:underline',
        'invisible-link':
          'h-auto justify-start border-inherit bg-current/0 px-1 underline-offset-4 hover:bg-current/0',
        button:
          'rounded-lg bg-current *:text-text-opposite min-h-8 px-6 max-md:py-2 text-sm flex items-center justify-center gap-2 whitespace-nowrap font-medium transition focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50',
        'button-outlined':
          'rounded-lg border-[1.5px] hover:bg-current/30 min-h-8 px-6 max-md:py-2 text-sm flex items-center justify-center gap-2 whitespace-nowrap font-medium transition focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50',
        hoverable:
          'block rounded-lg border-none bg-current/0 transition hover:bg-current/20 aria-[current]:bg-current/5',
      },
      color: {
        primary: 'text-primary',
        secondary: 'text-secondary',
        destructive: 'text-destructive',
        neutral: 'text-neutral',
        light: 'text-white',
        dark: 'text-neutral-800',
        text: 'text-text',
        'text-inverse': 'text-text-opposite',
        error: 'text-error',
        success: 'text-success',
        custom: '',
      },
      underlined: {
        default: '',
        true: 'underline',
        false: 'no-underline',
      },
    },

    defaultVariants: {
      variant: 'default',
      color: 'primary',
      underlined: 'default',
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
    isActive?: boolean;
    locale?: LocalesValues;
  };

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

export const Link: FC<LinkProps> = (props) => {
  const {
    variant = 'default',
    color = 'primary',
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
  const { internationalization } = configuration;

  const isExternalLink = checkIsExternalLink(props);
  const isChildrenString = typeof children === 'string';

  const rel = isExternalLink ? 'noopener noreferrer nofollow' : undefined;

  const target = isExternalLink ? '_blank' : '_self';

  const hrefLang = locale
    ? locale === internationalization.defaultLocale
      ? 'x-default'
      : locale
    : undefined;

  const href =
    locale && hrefProp && !isExternalLink
      ? getLocalizedUrl(hrefProp, locale)
      : hrefProp;

  return (
    <a
      href={href}
      hrefLang={hrefLang}
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
