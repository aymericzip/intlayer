import { useRouter } from '@tanstack/react-router';
import {
  getLocalizedUrl,
  getPathWithoutLocale,
  type LocalesValues,
} from 'intlayer';
import { useLocale } from 'react-intlayer';

type NavigateToRedirectUrlOptions = {
  replace?: boolean;
};

export type ResolvedRedirectTarget =
  | { kind: 'external'; url: string }
  | { kind: 'internal'; href: string };

/**
 * Normalizes a post-authentication target into either a same-origin,
 * locale-prefixed href (query string and hash preserved) or an external URL.
 *
 * Accepts an un-localized route path, an already localized path, a path
 * carrying a query string, or an absolute URL.
 */
export const resolveRedirectTarget = (
  target: string,
  { origin, locale }: { origin: string; locale: LocalesValues }
): ResolvedRedirectTarget => {
  const url = new URL(target, origin);

  if (url.origin !== origin) {
    return { kind: 'external', url: url.toString() };
  }

  const pathnameWithoutLocale = getPathWithoutLocale(url.pathname);
  const localizedPathname = getLocalizedUrl(pathnameWithoutLocale, locale);

  return {
    kind: 'internal',
    href: `${localizedPathname}${url.search}${url.hash}`,
  };
};

/**
 * Navigates to a post-authentication target (`redirect_url`, callback URL…).
 *
 * `useLocalizedNavigate` blindly prefixes the locale and treats `?` as part of
 * the path, so absolute or already localized targets produced 404s after
 * sign-in. This hook resolves the target through `resolveRedirectTarget` and
 * navigates by `href` instead.
 */
export const useNavigateToRedirectUrl = () => {
  const router = useRouter();
  const { locale } = useLocale();

  return (
    target: string,
    options: NavigateToRedirectUrlOptions = {}
  ): Promise<void> => {
    const resolvedTarget = resolveRedirectTarget(target, {
      origin: window.location.origin,
      locale,
    });

    if (resolvedTarget.kind === 'external') {
      window.location.assign(resolvedTarget.url);
      return Promise.resolve();
    }

    return router.navigate({
      href: resolvedTarget.href,
      replace: options.replace,
    });
  };
};
