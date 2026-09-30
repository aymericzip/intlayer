/**
 * Browser-safe part of the OG card API: building the card URL in route
 * `head()` runs on the client too, so this module must not import the
 * renderer (node:fs, satori, resvg).
 */

/** Path the handlers are mounted on in every app. */
export const OG_IMAGE_PATH = '/api/og';

export type OgImageParams = {
  title?: string;
  description?: string;
  /** Locale of the page the card is for, e.g. `params.locale`. */
  locale?: string;
};

/**
 * Builds the `/api/og` path (with query) for a page. Prefix it with the site
 * origin: crawlers ignore relative `og:image` URLs.
 */
export const getOgImagePath = ({
  title,
  description,
  locale,
}: OgImageParams = {}): string => {
  const searchParams = new URLSearchParams();
  if (title) searchParams.set('title', title);
  if (description) searchParams.set('description', description);
  // Only meaningful alongside text: the default card is locale-independent.
  if (locale && (title || description)) searchParams.set('locale', locale);

  const query = searchParams.toString();
  return query ? `${OG_IMAGE_PATH}?${query}` : OG_IMAGE_PATH;
};
