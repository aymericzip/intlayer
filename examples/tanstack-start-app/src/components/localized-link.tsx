import type { LinkComponentProps } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import { getPrefix } from 'intlayer';
import type { FC } from 'react';
import { useLocale } from 'react-intlayer';

export const LOCALE_ROUTE = '{-$locale}' as const;

export type To = StripLocalePrefix<LinkComponentProps['to']>;

export type StripLocalePrefix<T extends string | undefined> = T extends
  | `/${typeof LOCALE_ROUTE}/`
  | `/${typeof LOCALE_ROUTE}`
  ? '/'
  : T extends `/${typeof LOCALE_ROUTE}/${infer Rest}`
    ? `/${Rest}`
    : T;

type RouteParams = Record<string, unknown>;
type RouteParamsReducer = (previousParams: RouteParams) => RouteParams;

/**
 * Prefixes absolute destinations with the optional locale segment.
 * Relative destinations (`.`, `..`) keep their router meaning, and an
 * omitted destination targets the locale root.
 */
export const localizeTo = (to: string | undefined): string => {
  if (to === undefined) return `/${LOCALE_ROUTE}`;

  return to.startsWith('/') ? `/${LOCALE_ROUTE}${to}` : to;
};

/**
 * Defaults the `locale` param to the given prefix, under the caller's params.
 * Supports both the object and the reducer form of router params.
 */
export const withLocaleParam = (
  params: unknown,
  localePrefix: string | undefined
): RouteParams | RouteParamsReducer => {
  if (typeof params === 'function') {
    const reduceParams = params as RouteParamsReducer;

    return (previousParams) => ({
      locale: localePrefix,
      ...reduceParams(previousParams),
    });
  }

  return {
    locale: localePrefix,
    ...(typeof params === 'object' ? params : {}),
  };
};

/**
 * Whether a click opens the link elsewhere (new tab/window, download)
 * instead of navigating the current tab.
 */
export const isModifiedClick = (event: {
  altKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
  shiftKey: boolean;
}): boolean => event.metaKey || event.altKey || event.ctrlKey || event.shiftKey;

type LocalizedLinkProps = {
  to?: To;
} & Omit<LinkComponentProps, 'to'>;

export const LocalizedLink: FC<LocalizedLinkProps> = (props) => {
  const { locale } = useLocale();

  return (
    <Link
      {...props}
      params={
        withLocaleParam(
          props.params,
          getPrefix(locale).localePrefix
        ) as LinkComponentProps['params']
      }
      to={localizeTo(props.to) as LinkComponentProps['to']}
    />
  );
};
