import { Showcase_Root } from '@intlayer/design-system/routes';

export const SITE_TITLE = 'Intlayer Showcase';
export const SITE_DESCRIPTION =
  'Discover projects built with Intlayer — the i18n and content management solution for React, Next.js, Vue, Svelte and more.';

/**
 * Absolute origin (no trailing slash) used to build every outward-facing URL:
 * canonical, `hreflang` alternates, Open Graph and the sitemap.
 *
 * Prefers the deployment-provided `VITE_SITE_URL`, and falls back to the
 * canonical showcase domain when the variable is missing *or empty*, so the
 * generated URLs are never relative (search engines ignore relative
 * `hreflang` / canonical values).
 */
export const SITE_URL: string = (
  import.meta.env?.VITE_SITE_URL || Showcase_Root
).replace(/\/$/, '');
