import {
  checkIsRelativeLink,
  withDefaultParams,
} from '@intlayer/design-system/link';
import { useNavigate } from '@tanstack/react-router';
import { getPrefix } from 'intlayer';
import { useLocale } from 'react-intlayer';
import type { FileRouteTypes } from '#/routeTree.gen';
import { LOCALE_ROUTE } from '#components/Link/Link';

type StripLocalePrefix<T extends string> = T extends
  | `/${typeof LOCALE_ROUTE}`
  | `/${typeof LOCALE_ROUTE}/`
  ? '/'
  : T extends `/${typeof LOCALE_ROUTE}/${infer Rest}`
    ? `/${Rest}`
    : never;

type NavigateOptions = Parameters<ReturnType<typeof useNavigate>>[0];

type LocalizedTo = StripLocalePrefix<FileRouteTypes['to']>;

type LocalizedNavigate = {
  (to: LocalizedTo): ReturnType<ReturnType<typeof useNavigate>>;
  (
    opts: { to: LocalizedTo } & Record<string, unknown>
  ): ReturnType<ReturnType<typeof useNavigate>>;
};

/**
 * Programmatic navigation hook that automatically injects the current locale prefix.
 */
export const useLocalizedNavigate = () => {
  const navigate = useNavigate();
  const { locale } = useLocale();

  const localizedNavigate: LocalizedNavigate = (args: any) => {
    const { localePrefix } = getPrefix(locale);

    const { params, to, ...rest } =
      typeof args === 'string' ? { to: args } : args;

    return navigate({
      ...rest,
      // Relative targets (`.`, `..`) resolve against the current route
      to: checkIsRelativeLink(to) ? to : `/${LOCALE_ROUTE}${to}`,
      params: withDefaultParams(
        { locale: localePrefix },
        params
      ) as NavigateOptions['params'],
    });
  };

  return localizedNavigate;
};
