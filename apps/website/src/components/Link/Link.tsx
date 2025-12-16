'use client';

import { getLocalizedUrl } from '@intlayer/core';
import {
  checkIsExternalLink,
  type LinkProps as LinkUIProps,
  linkVariants,
} from '@intlayer/design-system';
import { cn } from '@utils/cn';
import { ExternalLink, MoveRight } from 'lucide-react';
import NextLink, { type LinkProps as NextLinkProps } from 'next/link';
import { useLocale } from 'next-intlayer';
import type { FC } from 'react';

export type LinkProps = LinkUIProps & NextLinkProps;

const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;

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
    isPageSection: isPageSectionProp,
    href: hrefProp,
    roundedSize,
    size,
    ...otherProps
  } = props;
  const { locale: currentLocale } = useLocale();
  const locale = localeProp ?? currentLocale;

  // Normalize internal links: convert https://intlayer.org/xxx to /xxx
  let normalizedHref = hrefProp;
  if (typeof hrefProp === 'string' && DOMAIN && hrefProp.startsWith(DOMAIN)) {
    normalizedHref = hrefProp.replace(DOMAIN, '') || '/';
  }

  // Check if external link using normalized href
  const propsWithNormalizedHref = { ...props, href: normalizedHref };
  const isExternalLink =
    isExternalLinkProp ?? checkIsExternalLink(propsWithNormalizedHref);
  const isPageSection =
    isPageSectionProp ?? normalizedHref?.startsWith('#') ?? false;
  const isChildrenString = typeof children === 'string';

  const href =
    locale && normalizedHref && !isExternalLink && !isPageSection
      ? getLocalizedUrl(normalizedHref, locale)
      : normalizedHref;

  const rel = isExternalLink ? 'noopener noreferrer' : undefined;

  const target = isExternalLink ? '_blank' : '_self';

  return (
    <NextLink
      prefetch={prefetch}
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
      {...otherProps}
    >
      {children}

      {isExternalLink && isChildrenString && (
        <ExternalLink className="ml-2 inline-block size-4" />
      )}
      {isPageSection && <MoveRight className="ml-2 inline-block size-4" />}
    </NextLink>
  );
};
