import { getLocalizedUrl } from '@intlayer/core/localization';
import {
  checkIsExternalLink,
  isTextChildren,
  type LinkProps as LinkUIProps,
  LinkVariant,
  linkVariants,
} from '@intlayer/design-system/link';
import { cn } from '@intlayer/design-system/utils';
import { Link as TanStackLink } from '@tanstack/react-router';
import { ExternalLink, MoveRight } from 'lucide-react';
import type React from 'react';
import type { FC } from 'react';
import { useLocale } from 'react-intlayer';

export type LinkProps = LinkUIProps & {
  href?: string;
  to?: string;
  prefetch?: boolean | 'intent' | 'render' | 'viewport';
  locale?: string;
  [key: string]: unknown;
};

const URL = import.meta.env.VITE_URL;

export const Link: FC<LinkProps> = (props) => {
  const {
    variant = 'default',
    color,
    children,
    label,
    className,
    isActive,
    underlined,
    locale: localeProp,
    prefetch,
    isExternalLink: isExternalLinkProp,
    isPageSection: isPageSectionProp,
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

  // Check if external link using normalized href
  const propsWithNormalizedHref = { ...props, href: normalizedHref };
  const isExternalLink =
    isExternalLinkProp ?? checkIsExternalLink(propsWithNormalizedHref);
  const isPageSection =
    isPageSectionProp ?? normalizedHref?.startsWith('#') ?? false;

  const isChildrenString = isTextChildren(children);
  const isButton =
    variant === LinkVariant.BUTTON || variant === LinkVariant.BUTTON_OUTLINED;

  const href =
    locale && normalizedHref && !isExternalLink && !isPageSection
      ? getLocalizedUrl(normalizedHref, locale)
      : normalizedHref;

  const rel = isExternalLink ? 'noopener noreferrer' : undefined;

  const target = isExternalLink ? '_blank' : '_self';

  if (isExternalLink || isPageSection) {
    return (
      <a
        href={String(href ?? '')}
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
        {...(otherProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {isButton && isChildrenString ? <span>{children}</span> : children}
        {isExternalLink && isChildrenString && (
          <ExternalLink className="ml-2 inline-block size-4" />
        )}
        {isPageSection && <MoveRight className="ml-2 inline-block size-4" />}
      </a>
    );
  }

  return (
    <TanStackLink
      to={String(href ?? '/')}
      aria-label={label}
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
      {...(otherProps as Record<string, unknown>)}
    >
      {isButton && isChildrenString ? <span>{children}</span> : children}
    </TanStackLink>
  );
};
