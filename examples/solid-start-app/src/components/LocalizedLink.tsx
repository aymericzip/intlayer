import { A, type AnchorProps } from '@solidjs/router';
import { getLocalizedUrl } from 'intlayer';
import { useLocale } from 'solid-intlayer';
import type { ParentComponent } from 'solid-js';

/**
 * Drop-in replacement for `<A>` from `@solidjs/router` that prefixes internal
 * hrefs with the active locale, following the configured routing mode.
 *
 * External links (`http://`, `https://`, `mailto:`…) are left untouched.
 *
 * @example
 * ```tsx
 * <LocalizedLink href="/about">About</LocalizedLink>
 * // → /about in English (default locale, not prefixed)
 * // → /fr/about in French
 * ```
 */
export const LocalizedLink: ParentComponent<AnchorProps> = (props) => {
  const { locale } = useLocale();

  const isExternal = () => /^[a-z][a-z0-9+.-]*:/i.test(props.href);

  const localizedHref = () =>
    isExternal() ? props.href : getLocalizedUrl(props.href, locale());

  return <A {...props} href={localizedHref()} />;
};
