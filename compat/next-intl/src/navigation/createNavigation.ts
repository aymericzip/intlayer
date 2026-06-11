import {
  permanentRedirect as nextPermanentRedirect,
  redirect as nextRedirect,
} from 'next/navigation';
import type { createNavigation as _createNavigation } from 'next-intl/navigation';
import { usePathname, useRouter } from './hooks';
import { Link } from './Link';
import { localizeHref, type NextIntlHref } from './localizeHref';

/** Arguments shared by `getPathname`, `redirect` and `permanentRedirect`. */
type LocalizedHrefArgs = { href: NextIntlHref; locale: string };

/** The optional `RedirectType` accepted by `next/navigation`'s redirect APIs. */
type RedirectTypeArg = Parameters<typeof nextRedirect>[1];

/**
 * Drop-in replacement for next-intl's `createNavigation`.
 *
 * Returns locale-aware navigation APIs (`Link`, `usePathname`, `useRouter`,
 * `getPathname`, `redirect`, `permanentRedirect`) backed by Intlayer's routing
 * configuration. The `routing` argument is accepted for API compatibility;
 * locales come from the Intlayer configuration.
 *
 * @example
 * ```ts
 * export const { Link, redirect, usePathname, useRouter, getPathname } =
 *   createNavigation();
 * ```
 */
export const createNavigation: typeof _createNavigation = (
  _routing?: unknown
) => {
  const getPathname = ({ href, locale }: LocalizedHrefArgs): string =>
    localizeHref(href, locale);

  const redirect = (
    { href, locale }: LocalizedHrefArgs,
    type?: RedirectTypeArg
  ) => nextRedirect(localizeHref(href, locale), type);

  const permanentRedirect = (
    { href, locale }: LocalizedHrefArgs,
    type?: RedirectTypeArg
  ) => nextPermanentRedirect(localizeHref(href, locale), type);

  return {
    Link: Link as ReturnType<typeof _createNavigation>['Link'],
    usePathname,
    useRouter,
    getPathname,
    redirect,
    permanentRedirect,
  } as ReturnType<typeof _createNavigation>;
};

export default createNavigation;
