import {
  isTextChildren,
  type LinkProps as LinkUIProps,
  LinkVariant,
  linkVariants,
} from '@intlayer/design-system';
import { cn } from '@intlayer/design-system/utils';
import {
  type LinkComponentProps,
  Link as TanStackLink,
} from '@tanstack/react-router';
import { getPrefix } from 'intlayer';
import { ExternalLink, MoveRight } from 'lucide-react';
import type { AnchorHTMLAttributes, FC } from 'react';
import { useLocale } from 'react-intlayer';

export const LOCALE_ROUTE = '{-$locale}' as const;

export type LinkProps = LinkUIProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'color'> & {
    href?: string;
    to?: string;
    prefetch?: boolean;
    replace?: boolean;
    isExternalLink?: boolean;
    locale?: string;
  };

const DOMAIN =
  typeof import.meta !== 'undefined'
    ? (import.meta.env?.VITE_SITE_URL ?? '')
    : '';

export const Link: FC<LinkProps> = (props) => {
  const {
    variant = 'default',
    color = 'custom',
    children,
    label,
    className,
    isActive,
    underlined,
    locale: _localeProp,
    prefetch: _prefetch,
    replace,
    isExternalLink: isExternalLinkProp,
    href: hrefProp,
    to: toProp,
    roundedSize,
    size,
    ...otherProps
  } = props;
  const { locale } = useLocale();

  // Normalize internal links: convert https://intlayer.org/xxx to /xxx
  const rawHref = hrefProp ?? toProp;
  let normalizedHref = rawHref;
  if (typeof rawHref === 'string' && DOMAIN && rawHref.startsWith(DOMAIN)) {
    normalizedHref = rawHref.replace(DOMAIN, '') || '/';
  }

  const targetUrl = normalizedHref ?? '';

  const isExternalLinkUrl =
    targetUrl.startsWith('http') ||
    targetUrl.startsWith('mailto') ||
    targetUrl.startsWith('tel') ||
    targetUrl.startsWith('#');

  const isExternal = isExternalLinkProp ?? isExternalLinkUrl;
  const isPageSection = targetUrl.startsWith('#');

  const isChildrenString = isTextChildren(children);
  const isButton =
    variant === LinkVariant.BUTTON || variant === LinkVariant.BUTTON_OUTLINED;

  const classes = cn(
    linkVariants({
      variant,
      color,
      underlined,
      roundedSize,
      size,
      className,
    })
  );

  const content = (
    <>
      {isButton && isChildrenString ? <span>{children}</span> : children}
      {isExternal && isChildrenString && (
        <ExternalLink className="ml-2 inline-block size-4" />
      )}
      {isPageSection && <MoveRight className="ml-2 inline-block size-4" />}
    </>
  );

  if (isExternal || isExternalLinkUrl) {
    return (
      <a
        href={targetUrl}
        aria-label={label}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className={classes}
        {...(otherProps as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    );
  }

  const { localePrefix } = getPrefix(locale);

  const tanstackTo =
    `/${LOCALE_ROUTE}${normalizedHref}` as LinkComponentProps['to'];
  const tanstackParams = {
    locale: localePrefix ?? '',
  };

  return (
    <TanStackLink
      to={tanstackTo}
      params={tanstackParams as LinkComponentProps['params']}
      aria-label={label}
      aria-current={isActive ? 'page' : undefined}
      replace={replace}
      className={classes}
      {...(otherProps as unknown as LinkComponentProps)}
    >
      {content}
    </TanStackLink>
  );
};
