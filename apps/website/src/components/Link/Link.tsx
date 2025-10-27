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
    ...otherProps
  } = props;
  const { locale: currentLocale } = useLocale();
  const locale = localeProp ?? currentLocale;
  const isExternalLink = isExternalLinkProp ?? checkIsExternalLink(props);
  const isPageSection = isPageSectionProp ?? hrefProp?.startsWith('#') ?? false;
  const isChildrenString = typeof children === 'string';

  const rel = isExternalLink ? 'noopener noreferrer nofollow' : undefined;

  const target = isExternalLink ? '_blank' : '_self';

  const href =
    locale && hrefProp && !isExternalLink && !isPageSection
      ? getLocalizedUrl(hrefProp, locale)
      : hrefProp;

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
          className,
        })
      )}
      {...otherProps}
    >
      {variant === 'button' ? (
        <span className="size-full">{children}</span>
      ) : (
        children
      )}
      {isExternalLink && isChildrenString && (
        <ExternalLink className="ml-2 inline-block size-4" />
      )}
      {isPageSection && <MoveRight className="ml-2 inline-block size-4" />}
    </NextLink>
  );
};
