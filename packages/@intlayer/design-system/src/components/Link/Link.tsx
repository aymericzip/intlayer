import { getConfiguration, Locales } from '@intlayer/config/client';
import { getLocalizedUrl } from '@intlayer/core';
import { cva, type VariantProps } from 'class-variance-authority';
import { ExternalLink } from 'lucide-react';
import {
  forwardRef,
  type DetailedHTMLProps,
  type AnchorHTMLAttributes,
} from 'react';

const linkVariants = cva(
  'gap-3 whitespace-nowrap font-medium transition focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'h-auto justify-start text-wrap border-inherit bg-transparent px-1 underline-offset-4 hover:bg-transparent hover:underline dark:bg-transparent hover:dark:bg-transparent',
        'invisible-link':
          'h-auto justify-start text-wrap border-inherit bg-transparent px-1 underline-offset-4 hover:bg-transparent dark:bg-transparent hover:dark:bg-transparent',

        button:
          'rounded-lg text-text-opposite dark:text-text-opposite-dark min-h-8 px-6 max-md:py-2 text-sm flex items-center justify-center gap-2 whitespace-nowrap font-medium transition focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
        'button-outlined':
          'rounded-lg border-[1.5px] bg-opacity-0 hover:bg-opacity-30 dark:bg-opacity-0 min-h-8 px-6 max-md:py-2 text-sm flex items-center justify-center gap-2 whitespace-nowrap font-medium transition focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
        hoverable:
          'block rounded-lg border-none bg-opacity-0 transition hover:bg-opacity-10 aria-selected:bg-opacity-5 dark:border-none dark:bg-opacity-0 dark:hover:bg-opacity-10',
      },
      color: {
        primary:
          'border-primary bg-primary text-primary hover:bg-primary-500 dark:border-primary-dark dark:bg-primary-dark dark:text-primary-dark hover:dark:bg-primary-300',
        secondary:
          'border-secondary bg-secondary text-secondary hover:bg-secondary-300 dark:border-secondary-dark dark:bg-secondary-dark dark:text-secondary-dark hover:dark:bg-secondary-100',
        destructive:
          'border-destructive bg-destructive text-destructive hover:bg-destructive-500 dark:border-destructive-dark dark:bg-destructive-dark hover:dark:bg-destructive-200',
        neutral:
          'border-neutral bg-neutral text-neutral hover:bg-neutral-600 dark:border-neutral-dark dark:bg-neutral-dark dark:text-neutral-dark hover:dark:bg-neutral-400',
        light: 'border-white bg-white text-white hover:bg-neutral-500',
        dark: 'border-neutral-800 bg-neutral-800 text-neutral-800 hover:bg-neutral-900 dark:hover:bg-neutral-700',
        text: 'border-text bg-text text-text hover:opacity-80 dark:border-text-dark dark:bg-text-dark dark:text-text-dark',
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
    locale?: Locales;
  };

const isExternal = (href = ''): boolean => /^https?:\/\//.test(href);

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
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
      ...props
    },
    ref
  ) => {
    const { internationalization } = getConfiguration();
    const isChildrenString = typeof children === 'string';
    const isValidHref = typeof hrefProp === 'string' && hrefProp.trim() !== '';
    const isExternalLink =
      isExternalLinkProp === true ||
      (isChildrenString &&
        typeof isExternalLinkProp === 'undefined' &&
        isValidHref &&
        isExternal(hrefProp));

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
        ref={ref}
        hrefLang={hrefLang}
        aria-label={label}
        rel={rel}
        target={target}
        className={linkVariants({
          variant,
          color,
          underlined,
          className,
        })}
        {...props}
      >
        {children}
        {isExternalLink && (
          <ExternalLink className="ml-2 inline-block size-4" />
        )}
      </a>
    );
  }
);

Link.displayName = 'Link';
