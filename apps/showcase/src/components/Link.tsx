import {
  isTextChildren,
  LinkVariant,
  linkVariants,
} from '@intlayer/design-system';
import {
  type LinkComponentProps,
  Link as TanStackLink,
} from '@tanstack/react-router';
import { getPrefix } from 'intlayer';
import { ExternalLink, MoveRight } from 'lucide-react';
import type {
  AnchorHTMLAttributes,
  FC,
  MouseEventHandler,
  ReactNode,
} from 'react';
import { useLocale } from 'react-intlayer';
import { cn } from '#/utils/cn';

export const LOCALE_ROUTE = '{-$locale}' as const;

export type RemoveLocaleParam<T> = T extends string
  ? RemoveLocaleFromString<T>
  : T;

export type To = RemoveLocaleParam<LinkComponentProps['to']>;

type CollapseDoubleSlashes<S extends string> =
  S extends `${infer H}//${infer T}` ? CollapseDoubleSlashes<`${H}/${T}`> : S;

type RemoveAll<
  S extends string,
  Sub extends string,
> = S extends `${infer H}${Sub}${infer T}` ? RemoveAll<`${H}${T}`, Sub> : S;

type RemoveLocaleFromString<S extends string> = CollapseDoubleSlashes<
  RemoveAll<S, typeof LOCALE_ROUTE>
>;

type LinkProps = {
  href?: string;
  to?: To;
  label?: string;
  children?: ReactNode;
  isExternalLink?: boolean;
  color?: any;
  variant?: LinkVariant | string;
  roundedSize?: any;
  size?: any;
  className?: string;
  isActive?: boolean;
  replace?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  underlined?: boolean;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> &
  Omit<LinkComponentProps, 'to' | 'href' | 'children'>;

export const Link: FC<LinkProps> = ({
  href,
  to,
  label,
  children,
  isExternalLink,
  isActive,
  replace,
  onClick,
  params,
  variant = 'default',
  color,
  underlined,
  roundedSize,
  size,
  className,
  ...props
}) => {
  const { locale } = useLocale();

  const targetUrl = href || (to as string) || '';

  const isExternalLinkUrl =
    targetUrl.startsWith('http') ||
    targetUrl.startsWith('mailto') ||
    targetUrl.startsWith('tel') ||
    targetUrl.startsWith('#');

  const isExternal = isExternalLink ?? isExternalLinkUrl;
  const isPageSection = targetUrl.startsWith('#');

  const isChildrenString = isTextChildren(children);
  const isButton =
    variant === LinkVariant.BUTTON || variant === LinkVariant.BUTTON_OUTLINED;

  const content = (
    <>
      {isButton && isChildrenString ? <span>{children}</span> : children}

      {isExternal && isChildrenString && (
        <ExternalLink className="ml-2 inline-block size-4" />
      )}
      {isPageSection && <MoveRight className="ml-2 inline-block size-4" />}
    </>
  );

  const classes = cn(
    linkVariants({
      variant: variant as any,
      color: color as any,
      underlined,
      roundedSize: roundedSize as any,
      size: size as any,
      className,
    })
  );

  if (isExternal || isExternalLinkUrl) {
    return (
      <a
        href={targetUrl}
        aria-label={label}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        onClick={onClick}
        className={classes}
        {...(props as any)}
      >
        {content}
      </a>
    );
  }

  const { localePrefix } = getPrefix(locale);

  if (to) {
    const tanstackTo = `/${LOCALE_ROUTE}${to}` as LinkComponentProps['to'];
    const tanstackParams = {
      locale: localePrefix,
      ...(typeof params === 'object' && params !== null ? params : {}),
    };

    return (
      <TanStackLink
        to={tanstackTo}
        params={tanstackParams as LinkComponentProps['params']}
        aria-label={label}
        aria-current={isActive ? 'page' : undefined}
        replace={replace}
        onClick={onClick}
        className={classes}
        {...(props as LinkComponentProps)}
      >
        {content}
      </TanStackLink>
    );
  }

  const localizedHref = isExternalLinkUrl
    ? targetUrl
    : `/${locale}${targetUrl === '/' ? '' : targetUrl}`;

  return (
    <TanStackLink
      to={localizedHref as To}
      aria-label={label}
      aria-current={isActive ? 'page' : undefined}
      replace={replace}
      onClick={onClick}
      className={classes}
      {...(props as LinkComponentProps)}
    >
      {content}
    </TanStackLink>
  );
};
