'use client';

import configuration from '@intlayer/config/built';

import { getLocalizedUrl } from '@intlayer/core';
import {
  linkVariants,
  type LinkProps as LinkUIProps,
  checkIsExternalLink,
} from '@intlayer/design-system';
import { ExternalLink } from 'lucide-react';
import NextLink, { type LinkProps as NextLinkProps } from 'next/link';
import { useLocale } from 'next-intlayer';
import { type FC } from 'react';

export type LinkProps = LinkUIProps & NextLinkProps;

export const Link: FC<LinkProps> = (props) => {
  const {
    variant = 'default',
    color = 'primary',
    children,
    label,
    className,
    isActive,
    underlined,
    locale: localeProp,
    prefetch,
    isExternalLink: isExternalLinkProp,
    href: hrefProp,
    ...otherProps
  } = props;
  const { locale: currentLocale } = useLocale();
  const locale = localeProp ?? currentLocale;
  const isExternalLink = checkIsExternalLink(props);
  const isChildrenString = typeof children === 'string';

  const rel = isExternalLink ? 'noopener noreferrer nofollow' : undefined;

  const target = isExternalLink ? '_blank' : '_self';

  const hrefLang = locale
    ? locale === configuration.internationalization.defaultLocale
      ? 'x-default'
      : locale
    : undefined;

  const href =
    locale && hrefProp && !isExternalLink
      ? getLocalizedUrl(hrefProp, locale)
      : hrefProp;

  return (
    <NextLink
      prefetch={prefetch}
      href={href}
      hrefLang={hrefLang}
      aria-label={label}
      rel={rel}
      target={target}
      aria-current={isActive ? 'page' : undefined}
      className={linkVariants({
        variant,
        color,
        underlined,
        className,
      })}
      {...otherProps}
    >
      {variant === 'button' ? <span>{children}</span> : children}
      {isExternalLink && isChildrenString && (
        <ExternalLink className="ml-2 inline-block size-4" />
      )}
    </NextLink>
  );
};
