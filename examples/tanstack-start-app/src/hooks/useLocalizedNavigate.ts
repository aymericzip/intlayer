import { useNavigate } from '@tanstack/react-router';
import { getPrefix } from 'intlayer';
import { useLocale } from 'react-intlayer';
import { LOCALE_ROUTE } from '@/components/localized-link';
import type { FileRouteTypes } from '@/routeTree.gen';

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();

  const { locale } = useLocale();

  type StripLocalePrefix<T extends string> = T extends
    | `/${typeof LOCALE_ROUTE}`
    | `/${typeof LOCALE_ROUTE}/`
    ? '/'
    : T extends `/${typeof LOCALE_ROUTE}/${infer Rest}`
      ? `/${Rest}`
      : never;

  type LocalizedTo = StripLocalePrefix<FileRouteTypes['to']>;

  interface LocalizedNavigate {
    (to: LocalizedTo): ReturnType<typeof navigate>;
    (
      opts: { to: LocalizedTo } & Record<string, unknown>
    ): ReturnType<typeof navigate>;
  }

  const localizedNavigate: LocalizedNavigate = (args: any) => {
    if (typeof args === 'string') {
      return navigate({
        to: `/${LOCALE_ROUTE}${args}`,
        params: { locale: getPrefix(locale).localePrefix },
      });
    }

    const { to, ...rest } = args;

    const localizedTo = `/${LOCALE_ROUTE}${to}`;

    return navigate({
      to: localizedTo,
      params: { locale: getPrefix(locale).localePrefix, ...rest },
    });
  };

  return localizedNavigate;
};
