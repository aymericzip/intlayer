import {
  defaultLocale,
  getMultilingualUrls,
  getPathWithoutLocale,
} from 'intlayer';
import { type Component, For } from 'solid-js';

export type AlternateLinksProps = {
  /** Absolute URL of the page being rendered. */
  url: string;
};

/**
 * Emits the `canonical` / `alternate` links search engines need to relate the
 * localized variants of a page to each other.
 *
 * `getMultilingualUrls` derives one URL per configured locale from the canonical
 * (locale-free) path, following the routing mode — so `/fr/about` yields
 * `/about`, `/fr/about` and `/es/about` without any hard-coded prefix logic.
 */
export const AlternateLinks: Component<AlternateLinksProps> = (props) => {
  const multilingualUrls = () => {
    const { origin, pathname } = new URL(props.url);

    return Object.entries(
      getMultilingualUrls(`${origin}${getPathWithoutLocale(pathname)}`)
    );
  };

  const canonicalUrl = () =>
    new URL(props.url).origin + new URL(props.url).pathname;

  return (
    <>
      <link href={canonicalUrl()} rel="canonical" />
      <For each={multilingualUrls()}>
        {([locale, localizedUrl]) => (
          <link href={localizedUrl} hreflang={locale} rel="alternate" />
        )}
      </For>
      <link
        href={
          multilingualUrls().find(([locale]) => locale === defaultLocale)?.[1]
        }
        hreflang="x-default"
        rel="alternate"
      />
    </>
  );
};
