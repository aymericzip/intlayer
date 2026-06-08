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

type LocalizedLinkProps = {
  to?: To;
} & Omit<LinkComponentProps, 'to'>;

export const LocalizedLink: FC<LocalizedLinkProps> = (props) => {
  const { locale } = useLocale();

  return (
    <Link
      {...props}
      params={{
        locale: getPrefix(locale).localePrefix,
        ...(typeof props.params === 'object' ? props.params : {}),
      }}
      to={`/${LOCALE_ROUTE}${props.to}` as LinkComponentProps['to']}
    />
  );
};
