'use client';

import {
  Link as LinkUI,
  type LinkProps as LinkUIProps,
  checkIsExternalLink,
} from '@intlayer/design-system';
import NextLink, { type LinkProps as NextLinkProps } from 'next/link';
import { useLocale } from 'next-intlayer';
import type { FC } from 'react';

type LinkProps = LinkUIProps & NextLinkProps;

export const Link: FC<LinkProps> = ({ prefetch = true, ...props }) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(props);

  return (
    // For internal links, use nextjs's Link for client-side navigation
    <NextLink
      href={props.href}
      prefetch={prefetch}
      legacyBehavior
      passHref={false}
    >
      {/* 
        Using legacyBehavior to ensure that nextjs's Link wraps the child <a> tag correctly.
        This allows forwarding the ref to the underlying <a> tag in the design system's Link.
      */}
      <LinkUI locale={locale} isExternalLink={isExternalLink} {...props} />
    </NextLink>
  );
};
