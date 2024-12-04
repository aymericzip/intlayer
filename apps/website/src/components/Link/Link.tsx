import {
  Link as LinkUI,
  type LinkProps as LinkUIProps,
} from '@intlayer/design-system';
import NextLink, { type LinkProps as NextLinkProps } from 'next/link';
import { forwardRef, type ForwardedRef } from 'react';

type LinkProps = LinkUIProps & NextLinkProps;

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    { href, prefetch = true, ...props },
    ref: ForwardedRef<HTMLAnchorElement>
  ) => (
    // For internal links, use nextjs's Link for client-side navigation
    <NextLink href={href} prefetch={prefetch} passHref legacyBehavior>
      {/* 
        Using legacyBehavior to ensure that nextjs's Link wraps the child <a> tag correctly.
        This allows forwarding the ref to the underlying <a> tag in the design system's Link.
      */}
      <LinkUI ref={ref} {...props} />
    </NextLink>
  )
);

Link.displayName = 'Link';
