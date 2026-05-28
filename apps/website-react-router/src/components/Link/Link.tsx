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
    href: hrefProp,
    roundedSize,
    size,
    ...otherProps
  } = props;
  const { locale: currentLocale } = useLocale();
  const locale = localeProp ?? currentLocale;

  // Normalize internal links: convert https://intlayer.org/xxx to /xxx
  let normalizedHref = hrefProp;
  if (typeof hrefProp === 'string' && URL && hrefProp.startsWith(URL)) {
    normalizedHref = hrefProp.replace(URL, '') || '/';
  }

  // Check if external link or asset using normalized href
  const propsWithNormalizedHref = { ...props, href: normalizedHref };
  const isExternalLink =
    isExternalLinkProp ?? checkIsExternalLink(propsWithNormalizedHref);

  const isAsset =
    typeof normalizedHref === 'string' &&
    /\.(png|jpe?g|gif|svg|mp4|webm|pdf|zip|mp3|wav|ogg|vtt|webp)$/i.test(
      normalizedHref
    );

  const isChildrenString = isTextChildren(children);
  const isButton =
    variant === LinkVariant.BUTTON || variant === LinkVariant.BUTTON_OUTLINED;

  const href =
    locale && normalizedHref && !isExternalLink && !isAsset
      ? getLocalizedUrl(normalizedHref, locale)
      : normalizedHref;

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
      to={href as string}
    >
      {isButton && isChildrenString ? <span>{children}</span> : children}

      {isExternalLink && isChildrenString && (
        <ExternalLink className="ml-2 inline-block size-4" />
      )}
    </ReactRouterLink>
  );
};
