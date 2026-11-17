import {
  checkIsRelativeLink,
  withDefaultParams,
} from '@intlayer/design-system/link';
import { useNavigate } from '@tanstack/react-router';
import { getPathWithoutLocale, getPrefix } from 'intlayer';
import { useLocale } from 'react-intlayer';
import type { FileRouteTypes } from '#/routeTree.gen';
import { LOCALE_ROUTE, type StripLocalePrefix } from '#components/Link/Link';

type NavigateOptions = Parameters<ReturnType<typeof useNavigate>>[0];

type LocalizedTo = StripLocalePrefix<FileRouteTypes['to']> | (string & {});

type LocalizedNavigate = (
  args: ({ to?: LocalizedTo } & Record<string, unknown>) | LocalizedTo
) => ReturnType<ReturnType<typeof useNavigate>>;

const getLocalizedTo = (path: string): string => {
  // Relative targets (`.`, `..`) resolve against the current route
  if (checkIsRelativeLink(path)) return path;

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
        to: getLocalizedTo(args) as FileRouteTypes['to'],
      });
    }

    const { params: existingParams, to, ...rest } = args;

    const localizedTo = typeof to === 'string' ? getLocalizedTo(to) : to;

    return navigate({
      ...rest,
      // No target keeps the current route
      to: (localizedTo ?? '.') as FileRouteTypes['to'],
      params: withDefaultParams(
        { locale: getPrefix(locale).localePrefix },
        existingParams
      ) as NavigateOptions['params'],
    });
  };

  return localizedNavigate;
};
