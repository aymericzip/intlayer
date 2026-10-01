import {
  getOgImagePath,
  type OgImageParams,
} from '@intlayer/design-system/og-image';

const SITE_URL = (
  import.meta.env.VITE_SITE_URL ?? 'https://app.intlayer.org'
).replace(/\/$/, '');

/**
 * Absolute URL of the Open Graph card (/api/og) for a page. `locale` picks
 * the regional glyph forms of the title (e.g. Chinese vs Japanese).
 */
export const getOgImageUrl = (params: OgImageParams): string =>
  `${SITE_URL}${getOgImagePath(params)}`;
