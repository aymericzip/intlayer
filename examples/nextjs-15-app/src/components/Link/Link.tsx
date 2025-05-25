'use client';

import { configuration, getLocalizedUrl, LocalesValues } from 'intlayer';
import { useLocale } from 'next-intlayer';
import NextLink, { type LinkProps as NextLinkProps } from 'next/link';
import { PropsWithChildren, type FC } from 'react';

export type LinkProps = NextLinkProps &
  PropsWithChildren<{
    isExternalLink?: boolean;
    label: string;
    isActive?: boolean;
    locale?: LocalesValues;
    className?: string;
  }>;

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
    label,
    className,
    locale: localeProp,
    prefetch,
    isExternalLink: isExternalLinkProp,
    href: hrefProp,
    children,
    ...otherProps
  } = props;
  const { locale: currentLocale } = useLocale();
  const locale = localeProp ?? currentLocale;
  const isExternalLink = checkIsExternalLink(props);

  const rel = isExternalLink ? 'noopener noreferrer nofollow' : undefined;

  const target = isExternalLink ? '_blank' : '_self';

  const hrefLang = locale
    ? locale === configuration.internationalization.defaultLocale
      ? 'x-default'
      : locale
    : undefined;

  const href =
    locale && hrefProp && !isExternalLink
      ? getLocalizedUrl(hrefProp.toString(), locale)
      : hrefProp;

  const isActive = otherProps.isActive ?? false;

  return (
    <NextLink
      prefetch={prefetch}
      href={href}
      hrefLang={hrefLang}
      aria-label={label}
      rel={rel}
      target={target}
      aria-current={isActive ? 'page' : undefined}
      className={className}
      {...otherProps}
    >
      {children}
    </NextLink>
  );
};
