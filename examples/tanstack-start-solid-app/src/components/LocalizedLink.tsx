import { Link, type LinkProps } from '@tanstack/solid-router';
import { getPrefix } from 'intlayer';
import { useLocale } from 'solid-intlayer';
import type { JSX } from 'solid-js';

export const LOCALE_ROUTE = '{-$locale}' as const;

// Renamed 'T' to 'TVal' to be explicit, though 'T' is usually allowed.
// Renamed 'S' to 'TString' to satisfy the linter.
export type RemoveLocaleParam<TVal> = TVal extends string
  ? RemoveLocaleFromString<TVal>
  : TVal;

export type To = RemoveLocaleParam<LinkProps['to']>;

// 'TString' replaces 'S', 'THead' replaces 'H', 'TTail' replaces 'T'
type CollapseDoubleSlashes<TString extends string> =
  TString extends `${infer THead}//${infer TTail}`
    ? CollapseDoubleSlashes<`${THead}/${TTail}`>
    : TString;

type LocalizedLinkProps = Omit<LinkProps, 'to'> & {
  to?: To;
} & JSX.AnchorHTMLAttributes<HTMLAnchorElement>;

// 'TString' replaces 'S', 'TSub' replaces 'Sub'
type RemoveAll<
  TString extends string,
  TSub extends string,
> = TString extends `${infer THead}${TSub}${infer TTail}`
  ? RemoveAll<`${THead}${TTail}`, TSub>
  : TString;

type RemoveLocaleFromString<TString extends string> = CollapseDoubleSlashes<
  RemoveAll<TString, typeof LOCALE_ROUTE>
>;

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
export const isModifiedClick = (event: MouseEvent): boolean =>
  event.metaKey || event.altKey || event.ctrlKey || event.shiftKey;

const LocalizedLink = (props: LocalizedLinkProps) => {
  const { locale } = useLocale();

  return (
    <Link
      {...props}
      params={
        withLocaleParam(
          props.params,
          getPrefix(locale()).localePrefix
        ) as LinkProps['params']
      }
      to={localizeTo(props.to as string | undefined) as LinkProps['to']}
    />
  );
};

export { LocalizedLink as Link };
