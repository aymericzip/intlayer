import { getLocalizedUrl } from '@intlayer/core/localization';
import {
  checkIsExternalLink,
  isTextChildren,
  type LinkProps as LinkUIProps,
  LinkVariant,
  linkVariants,
} from '@intlayer/design-system/link';
import { cn } from '@intlayer/design-system/utils';
import { ExternalLink } from 'lucide-react';
import type { FC } from 'react';
import { useLocale } from 'react-intlayer';
import {
  Link as ReactRouterLink,
  type LinkProps as ReactRouterLinkProps,
} from 'react-router';

export type LinkProps = LinkUIProps & ReactRouterLinkProps;

const URL = import.meta.env.VITE_URL;

interface LinkInfo {
  isExternalLink: boolean;
  isAsset: boolean;
  href: ReactRouterLinkProps['to'];
}

const getLinkInfo = (
  toProp: ReactRouterLinkProps['to'],
  locale: string | undefined,
  isExternalLinkProp: boolean | undefined
): LinkInfo => {
  // Normalize internal links: convert https://intlayer.org/xxx to /xxx
  let normalizedHref = toProp;
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

  // Check if external link or asset using normalized href
  const isExternalLink =
    isExternalLinkProp ??
    (typeof pathnameString === 'string'
      ? checkIsExternalLink({
          href: pathnameString,
          isExternalLink: isExternalLinkProp,
        })
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
          ? {
              ...normalizedHref,
              pathname: getLocalizedUrl(pathnameString, locale),
            }
          : normalizedHref
      : normalizedHref;

  return {
    isExternalLink,
    isAsset,
    href: href as ReactRouterLinkProps['to'],
  };
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
    prefetch,
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
    variant === LinkVariant.BUTTON || variant === LinkVariant.BUTTON_OUTLINED;

  const rel = isExternalLink ? 'noopener noreferrer' : undefined;

  const target = isExternalLink ? '_blank' : '_self';

  return (
    <ReactRouterLink
      aria-label={label}
      rel={rel}
      target={target}
      reloadDocument={isAsset}
      aria-current={isActive ? 'page' : undefined}
      prefetch={isExternalLink || isAsset ? undefined : (prefetch ?? 'intent')}
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
      {...otherProps}
      to={href}
    >
      {isButton && isChildrenString ? <span>{children}</span> : children}

      {isExternalLink && isChildrenString && (
        <ExternalLink className="ml-2 inline-block size-4" />
      )}
    </ReactRouterLink>
  );
};
