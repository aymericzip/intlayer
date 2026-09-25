import {
  getLocalizedUrl,
  getPathWithoutLocale,
} from '@intlayer/core/localization';
import { useNavigate } from '@tanstack/react-router';
import { useLocale } from 'react-intlayer';
import { LOCALE_ROUTE, type StripLocalePrefix } from '~/components/Link/Link';
import type { FileRouteTypes } from '~/routeTree.gen';

export type LocalizedTo =
  | StripLocalePrefix<FileRouteTypes['to']>
  | (string & {});

export type LocalizedNavigateArgs =
  | ({ to?: LocalizedTo } & Record<string, unknown>)
  | LocalizedTo;

export type LocalizedNavigate = (
  args: LocalizedNavigateArgs
) => ReturnType<ReturnType<typeof useNavigate>>;

const getCleanPath = (path: string): string => {
  const withoutLocaleRoute = path.startsWith(`/${LOCALE_ROUTE}`)
    ? path.replace(`/${LOCALE_ROUTE}`, '') || '/'
    : path;

  return getPathWithoutLocale(withoutLocaleRoute);
};

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();
  const { locale } = useLocale();

  const localizedNavigate: LocalizedNavigate = (args) => {
    if (typeof args === 'string') {
      const cleanPath = getCleanPath(args);

      return navigate({
        to: getLocalizedUrl(cleanPath, locale) as any,
      });
    }

    const { to, ...rest } = args;

    const cleanTo = typeof to === 'string' ? getCleanPath(to) : to;

    const localizedTo = cleanTo ? getLocalizedUrl(cleanTo, locale) : undefined;

    return navigate({
      ...rest,
      to: localizedTo,
    });
  };

  return localizedNavigate;
};
