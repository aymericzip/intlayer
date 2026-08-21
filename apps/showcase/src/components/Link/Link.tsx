import { getLocalizedUrl } from '@intlayer/core/localization';
import {
  checkIsExternalLink,
  isTextChildren,
  type LinkProps as LinkUIProps,
  linkVariants,
} from '@intlayer/design-system/link';
import { cn } from '@intlayer/design-system/utils';
import {
  Link as TanStackLink,
  type LinkProps as TansStackLinkProps,
} from '@tanstack/react-router';
import { ExternalLink, MoveRight } from 'lucide-react';
import type { FC } from 'react';
import { useLocale } from 'react-intlayer';
import { SITE_URL } from '#/lib/site';

export const LOCALE_ROUTE = '{-$locale}' as const;

export type StripLocalePrefix<T extends string | undefined> = T extends
  | `/${typeof LOCALE_ROUTE}/`
  | `/${typeof LOCALE_ROUTE}`
  ? '/'
  : T extends `/${typeof LOCALE_ROUTE}/${infer Rest}`
    ? `/${Rest}`
    : T;

export type LinkProps = Omit<LinkUIProps, 'href'> &
  Omit<TansStackLinkProps, 'to'> & {
    locale?: string;
    to: StripLocalePrefix<TansStackLinkProps['to']> | (string & {});
  };

export const Link: FC<LinkProps> = ({
  variant = 'default',
  to,
  color,
  children,
  label,
  className,
  isActive,
  underlined,
  locale: localeProp,
  isExternalLink: isExternalLinkProp,
  isPageSection: isPageSectionProp,
  roundedSize,
  size,
  rel: relProp,
  target: targetProp,
  ...otherProps
}) => {
  const { locale: currentLocale } = useLocale();
  const locale = localeProp ?? currentLocale;

  // Normalize internal links: convert https://intlayer.org/xxx to /xxx
  let normalizedHref = to;
  if (typeof to === 'string' && SITE_URL && to.startsWith(SITE_URL)) {
    normalizedHref = to.replace(SITE_URL, '') || '/';
  }

  // Check if external link using normalized href
  const isExternalLink =
    isExternalLinkProp ??
    checkIsExternalLink(
      { href: to, isExternalLink: isExternalLinkProp },
      SITE_URL
    );

  const isPageSection =
    isPageSectionProp ?? normalizedHref?.startsWith('#') ?? false;

  const isChildrenString = isTextChildren(children);
  const isButton = variant === 'button' || variant === 'button-outlined';

  const href =
    locale && normalizedHref && !isExternalLink && !isPageSection
      ? getLocalizedUrl(normalizedHref, locale)
      : normalizedHref;

  /**
   * External links always carry the full safety/SEO `rel`, so a caller cannot
   * accidentally strip `nofollow`. Internal links keep whatever the caller asked for.
   */
  const rel = isExternalLink ? 'noopener noreferrer nofollow' : relProp;

  const target = isExternalLink ? '_blank' : (targetProp ?? '_self');

  if (isExternalLink || isPageSection) {
    return (
      <a
        {...otherProps}
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
            roundedSize,
            size,
            className,
          })
        )}
      >
        {isButton && isChildrenString ? <span>{children}</span> : children}
        {isExternalLink && isChildrenString && (
          <ExternalLink className="ml-2 inline-block size-4" />
        )}
        {isPageSection && <MoveRight className="ml-2 inline-block size-4" />}
      </a>
    );
  }

  return (
    <TanStackLink
      to={href as TansStackLinkProps['to']}
      aria-label={label}
      rel={rel}
      target={target}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        linkVariants({
          variant,
          color,
          underlined,
          roundedSize,
          size,
          className,
        })
      )}
      {...otherProps}
      params={{
        locale,
        ...(typeof otherProps?.params === 'object' ? otherProps.params : {}),
      }}
    >
      {isButton && isChildrenString ? <span>{children}</span> : children}
    </TanStackLink>
  );
};
