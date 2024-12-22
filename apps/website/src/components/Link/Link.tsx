'use client';

import { getLocalizedUrl } from '@intlayer/core';
import {
  Link as LinkUI,
  type LinkProps as LinkUIProps,
} from '@intlayer/design-system';
import NextLink, { type LinkProps as NextLinkProps } from 'next/link';
import { useLocale } from 'next-intlayer';
import { forwardRef, type ForwardedRef } from 'react';

type LinkProps = LinkUIProps & NextLinkProps;

const isExternal = (href = ''): boolean => /^https?:\/\//.test(href);

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    { href, prefetch = true, ...props },
    ref: ForwardedRef<HTMLAnchorElement>
  ) => {
    const { locale } = useLocale();
    return (
      // For internal links, use nextjs's Link for client-side navigation
      <NextLink href={href} prefetch={prefetch} passHref legacyBehavior>
        {/* 
        Using legacyBehavior to ensure that nextjs's Link wraps the child <a> tag correctly.
        This allows forwarding the ref to the underlying <a> tag in the design system's Link.
      */}
        <LinkUI
          locale={locale}
          href={href}
          ref={ref}
          isExternalLink={isExternal(href)}
          {...props}
        />
      </NextLink>
    );
  }
);

Link.displayName = 'Link';
