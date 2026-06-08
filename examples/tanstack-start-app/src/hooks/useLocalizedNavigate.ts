import { useNavigate } from '@tanstack/react-router';
import { getPrefix } from 'intlayer';
import { useLocale } from 'react-intlayer';
import {
  LOCALE_ROUTE,
  type StripLocalePrefix,
} from '#/components/localized-link';
import type { FileRouteTypes } from '#/routeTree.gen';

type NavigateFn = ReturnType<typeof useNavigate>;
type BaseNavigateOptions = Parameters<NavigateFn>[0];

type LocalizedTo = StripLocalePrefix<FileRouteTypes['to']>;

export type LocalizedNavigateOptions = Omit<
  BaseNavigateOptions,
  'to' | 'params'
> & {
  to: LocalizedTo;
  params?: Omit<NonNullable<BaseNavigateOptions['params']>, 'locale'>;
};

type LocalizedNavigate = (
  options: LocalizedNavigateOptions
) => ReturnType<NavigateFn>;

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();

  const { locale } = useLocale();

  const localizedNavigate: LocalizedNavigate = (args) => {
    const { params: existingParams, to, ...rest } = args;

    const localizedTo = `/${LOCALE_ROUTE}${to}`;

    return navigate({
      ...rest,
      params: {
        ...(existingParams ?? {}),
        locale: getPrefix(locale).localePrefix,
      } as any,
      to: localizedTo,
    });
  };

  return localizedNavigate;
};
