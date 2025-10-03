import type { FC } from 'react';

import { useLocale } from 'react-intlayer';
import { Link, type LinkComponentProps } from '@tanstack/react-router';

export const LOCALE_ROUTE = '{-$locale}' as const;

// Helpers
type RemoveAll<
  S extends string,
  Sub extends string,
> = S extends `${infer H}${Sub}${infer T}` ? RemoveAll<`${H}${T}`, Sub> : S;

type CollapseDoubleSlashes<S extends string> =
  S extends `${infer H}//${infer T}` ? CollapseDoubleSlashes<`${H}/${T}`> : S;

type RemoveLocaleFromString<S extends string> = CollapseDoubleSlashes<
  RemoveAll<S, typeof LOCALE_ROUTE>
>;

// Main utility
export type RemoveLocaleParam<T> = T extends string
  ? RemoveLocaleFromString<T>
  : T;

type LocalizedLinkProps = Omit<LinkComponentProps, 'to'> & {
  to?: RemoveLocaleParam<LinkComponentProps['to']>;
};

export const LocalizedLink: FC<LocalizedLinkProps> = (props) => {
  const { locale } = useLocale();

  return (
    <Link
      {...props}
      to={`/${LOCALE_ROUTE}${props.to}` as any}
      params={{
        locale,
        ...(typeof props?.params === 'object' ? props?.params : {}),
      }}
    />
  );
};
