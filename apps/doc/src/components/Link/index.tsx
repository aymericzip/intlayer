import { getLocalizedUrl } from '@intlayer/core/localization';
import {
  checkIsExternalLink,
  isTextChildren,
  type LinkProps as LinkUIProps,
  LinkVariant,
  linkVariants,
} from '@intlayer/design-system';
import { cn } from '@intlayer/design-system/utils';
import { ExternalLink } from 'lucide-react';
import type { AnchorHTMLAttributes, FC } from 'react';
import { useLocale } from 'react-intlayer';

export type LinkProps = LinkUIProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'color'> & {
    href?: string;
    to?: string;
    prefetch?: boolean;
    replace?: boolean;
    isExternalLink?: boolean;
    locale?: string;
  };

const DOMAIN =
  typeof import.meta !== 'undefined'
    ? (import.meta.env?.VITE_SITE_URL ?? '')
    : '';

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
    prefetch: _prefetch,
    replace: _replace,
    isExternalLink: isExternalLinkProp,
    href: hrefProp,
    to: toProp,
    roundedSize,
    size,
    ...otherProps
  } = props;
  const { locale: currentLocale } = useLocale();
  const locale = localeProp ?? currentLocale;

  // Normalize internal links: convert https://intlayer.org/xxx to /xxx
  const normalizedHrefProp = hrefProp ?? toProp;
  let normalizedHref = normalizedHrefProp;
  if (
    typeof normalizedHrefProp === 'string' &&
    DOMAIN &&
    normalizedHrefProp.startsWith(DOMAIN)
  ) {
    normalizedHref = normalizedHrefProp.replace(DOMAIN, '') || '/';
  }

  // Check if external link using normalized href
  const propsWithNormalizedHref = { ...props, href: normalizedHref };
  const isExternalLink =
    isExternalLinkProp ?? checkIsExternalLink(propsWithNormalizedHref);

  const isChildrenString = isTextChildren(children);
  const isButton =
    variant === LinkVariant.BUTTON || variant === LinkVariant.BUTTON_OUTLINED;

  const href =
    locale && normalizedHref && !isExternalLink
      ? getLocalizedUrl(normalizedHref, locale)
      : normalizedHref;

  const rel = isExternalLink ? 'noopener noreferrer' : undefined;

  const target = isExternalLink ? '_blank' : '_self';

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
      {...otherProps}
    >
      {isButton && isChildrenString ? <span>{children}</span> : children}

      {isExternalLink && isChildrenString && (
        <ExternalLink className="ml-2 inline-block size-4" />
      )}
    </a>
  );
};
