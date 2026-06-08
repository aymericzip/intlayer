'use client';

import NextLink from 'next/link';
import { useLocale } from 'next-intlayer';
import { type ComponentPropsWithoutRef, forwardRef, type Ref } from 'react';
import { localizeHref, type NextIntlHref } from './localizeHref';

/**
 * Props for the compat `Link`: identical to `next/link` except `href` accepts a
 * `next-intl` href and an optional `locale` overrides the current one.
 */
export type LinkProps = Omit<
  ComponentPropsWithoutRef<typeof NextLink>,
  'href' | 'locale'
> & {
  href: NextIntlHref;
  locale?: string;
};

/**
 * Drop-in for the `Link` returned by next-intl's `createNavigation`. Prefixes
 * `href` with the active locale (or the `locale` prop) before delegating to
 * `next/link`.
 */
export const Link = forwardRef(
  ({ href, locale, ...rest }: LinkProps, ref: Ref<HTMLAnchorElement>) => {
    const { locale: currentLocale } = useLocale();
    const targetLocale = locale ?? (currentLocale as string);

    return (
      <NextLink ref={ref} href={localizeHref(href, targetLocale)} {...rest} />
    );
  }
);

Link.displayName = 'Link';
