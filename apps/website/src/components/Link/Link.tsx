'use client';

import {
  Link as LinkUI,
  type LinkProps as LinkUIProps,
  checkIsExternalLink,
} from '@intlayer/design-system';
import NextLink, { type LinkProps as NextLinkProps } from 'next/link';
import { useLocale } from 'next-intlayer';
import { forwardRef, type ForwardedRef } from 'react';

type LinkProps = LinkUIProps & NextLinkProps;

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ prefetch = true, ...props }, ref: ForwardedRef<HTMLAnchorElement>) => {
    const { locale } = useLocale();
    const isExternalLink = checkIsExternalLink(props);

    return (
      // For internal links, use nextjs's Link for client-side navigation
      <NextLink href={props.href} prefetch={prefetch} passHref legacyBehavior>
        {/* 
        Using legacyBehavior to ensure that nextjs's Link wraps the child <a> tag correctly.
        This allows forwarding the ref to the underlying <a> tag in the design system's Link.
      */}
        <LinkUI
          locale={locale}
          ref={ref}
          isExternalLink={isExternalLink}
          {...props}
        />
      </NextLink>
    );
  }
);

Link.displayName = 'Link';
