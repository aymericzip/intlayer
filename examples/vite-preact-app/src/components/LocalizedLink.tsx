import { getLocalizedUrl } from 'intlayer';
import type { JSX, Ref, TargetedMouseEvent } from 'preact';
import { useLocale } from 'preact-intlayer';
import { useLocation } from 'preact-iso';

export interface LocalizedLinkProps
  extends JSX.HTMLAttributes<HTMLAnchorElement> {
  href: string;
  replace?: boolean;
}

/**
 * Utility function to check whether a given URL is external.
 * If the URL starts with http:// or https://, it's considered external.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? '');

/**
 * A custom Link component that adapts the href attribute based on the current locale.
 */
export const LocalizedLink = (
  { href, children, onClick, replace = false, ...props }: LocalizedLinkProps,
  ref: Ref<HTMLAnchorElement>
) => {
  const { locale } = useLocale();
  const location = useLocation();
  const isExternalLink = checkIsExternalLink(href);

  const hrefI18n =
    href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

  const handleClick = (event: TargetedMouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(event);
    }
    if (
      !isExternalLink &&
      href &&
      event.button === 0 &&
      !event.metaKey &&
      !event.ctrlKey &&
      !event.shiftKey &&
      !event.altKey
    ) {
      event.preventDefault();
      if (location.url !== hrefI18n) {
        location.route(hrefI18n, replace);
      }
    }
  };

  return (
    <a href={hrefI18n} ref={ref} onClick={handleClick} {...props}>
      {children}
    </a>
  );
};
