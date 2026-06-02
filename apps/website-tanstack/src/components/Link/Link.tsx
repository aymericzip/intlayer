import { getLocalizedUrl } from '@intlayer/core/localization';
import {
  checkIsExternalLink,
  isTextChildren,
  type LinkProps as LinkUIProps,
  linkVariants,
} from '@intlayer/design-system/link';
import { cn } from '@intlayer/design-system/utils';
import {
  Link as TanStackLink,
  type LinkProps as TanStackLinkProps,
} from '@tanstack/react-router';
import { ExternalLink } from 'lucide-react';
import type { FC } from 'react';
import { useLocale } from 'react-intlayer';

export type LinkProps = LinkUIProps &
  Omit<TanStackLinkProps, 'to'> & {
    to?: string | { pathname?: string; search?: string };
  };

const URL = import.meta.env.VITE_URL;

interface LinkInfo {
  isExternalLink: boolean;
  isAsset: boolean;
  href: string;
}

const getLinkInfo = (
  toProp: string | { pathname?: string; search?: string } | undefined,
  locale: string | undefined,
  isExternalLinkProp: boolean | undefined
): LinkInfo => {
  let normalizedHref:
    | string
    | { pathname?: string; search?: string }
    | undefined = toProp;

  if (typeof toProp === 'string' && URL && toProp.startsWith(URL)) {
    normalizedHref = toProp.replace(URL, '') || '/';
  } else if (
    typeof toProp === 'object' &&
    toProp !== null &&
    typeof toProp.pathname === 'string' &&
    URL &&
    toProp.pathname.startsWith(URL)
  ) {
    normalizedHref = {
      ...toProp,
      pathname: toProp.pathname.replace(URL, '') || '/',
    };
  }

  const pathnameString =
    typeof normalizedHref === 'string'
      ? normalizedHref
      : typeof normalizedHref === 'object' && normalizedHref !== null
        ? normalizedHref.pathname
        : undefined;

  const isExternalLink =
    isExternalLinkProp ??
    (typeof pathnameString === 'string'
      ? checkIsExternalLink(
          {
            href: pathnameString,
            isExternalLink: isExternalLinkProp,
          },
          URL
        )
      : false);

  const isAsset =
    typeof pathnameString === 'string' &&
    /\.(png|jpe?g|gif|svg|mp4|webm|pdf|zip|mp3|wav|ogg|vtt|webp)$/i.test(
      pathnameString
    );

  const href =
    locale && normalizedHref && !isExternalLink && !isAsset
      ? typeof normalizedHref === 'string'
        ? getLocalizedUrl(normalizedHref, locale)
        : typeof normalizedHref === 'object' &&
            normalizedHref !== null &&
            typeof pathnameString === 'string'
          ? getLocalizedUrl(pathnameString, locale)
          : (pathnameString ?? '/')
      : (pathnameString ??
        (typeof normalizedHref === 'string' ? normalizedHref : '/'));

  return { isExternalLink, isAsset, href };
};

export const Link: FC<LinkProps> = (props) => {
  const {
    variant = 'default',
    color = 'custom',
    children,
    label,
    className,
    isActive,
    underlined,
    locale: localeProp,
    isExternalLink: isExternalLinkProp,
    to: toProp,
    roundedSize,
    size,
    ...otherProps
  } = props;
  const { locale: currentLocale } = useLocale();
  const locale = localeProp ?? currentLocale;

  const { isExternalLink, isAsset, href } = getLinkInfo(
    toProp,
    locale,
    isExternalLinkProp
  );

  const isChildrenString = isTextChildren(children);
  const isButton =
    variant === 'button' || variant === 'button-outlined';

  const rel = isExternalLink ? 'noopener noreferrer' : undefined;
  const target = isExternalLink ? '_blank' : '_self';

  if (isAsset) {
    return (
      <a
        href={href}
        aria-label={label}
        rel={rel}
        target={target}
        aria-current={isActive ? 'page' : undefined}
        className={cn(
          linkVariants({
            variant,
            color,
            underlined,
            roundedSize,
            size,
            className,
          })
        )}
        {...(otherProps as any)}
      >
        {isButton && isChildrenString ? <span>{children}</span> : children}
        {isExternalLink && isChildrenString && (
          <ExternalLink className="ml-2 inline-block size-4" />
        )}
      </a>
    );
  }

  return (
    <TanStackLink
      aria-label={label}
      rel={rel}
      target={target}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        linkVariants({
          variant,
          color,
          underlined,
          roundedSize,
          size,
          className,
        })
      )}
      {...(otherProps as any)}
      to={href}
    >
      {isButton && isChildrenString ? <span>{children}</span> : children}
      {isExternalLink && isChildrenString && (
        <ExternalLink className="ml-2 inline-block size-4" />
      )}
    </TanStackLink>
  );
};
