import { useNavigate } from '@tanstack/react-router';
import { getPathWithoutLocale, getPrefix } from 'intlayer';
import { useLocale } from 'react-intlayer';
import type { FileRouteTypes } from '#/routeTree.gen';
import { LOCALE_ROUTE, type StripLocalePrefix } from '#components/Link/Link';

type LocalizedTo = StripLocalePrefix<FileRouteTypes['to']> | (string & {});

type LocalizedNavigate = (
  args: ({ to?: LocalizedTo } & Record<string, unknown>) | LocalizedTo
) => ReturnType<ReturnType<typeof useNavigate>>;

const getLocalizedTo = (path: string): string => {
  const withoutLocaleRoute = path.startsWith(`/${LOCALE_ROUTE}`)
    ? path.replace(`/${LOCALE_ROUTE}`, '') || '/'
    : path;

  const cleanPath = getPathWithoutLocale(withoutLocaleRoute);

  return cleanPath === '/' || cleanPath === ''
    ? `/${LOCALE_ROUTE}`
    : `/${LOCALE_ROUTE}${cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`}`;
};

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();

  const { locale } = useLocale();

  const localizedNavigate: LocalizedNavigate = (args) => {
    if (typeof args === 'string') {
      return navigate({
        params: { locale: getPrefix(locale).localePrefix },
        to: getLocalizedTo(args) as any,
      });
    }

    const { params: existingParams, to, ...rest } = args;

    const localizedTo = typeof to === 'string' ? getLocalizedTo(to) : to;

    return navigate({
      ...rest,
      params: {
        locale: getPrefix(locale).localePrefix,
        ...(existingParams ?? {}),
      },
      ...(localizedTo ? { to: localizedTo as any } : {}),
    });
  };

  return localizedNavigate;
};
