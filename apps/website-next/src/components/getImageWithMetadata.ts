import type { Locales } from 'intlayer';

export type OgImageParams = {
  title: string;
  description?: string;
  locale?: Locales;
};

export type OgImageWithMetadata = {
  url: string;
  width: number;
  height: number;
  alt: string;
};

// Standard Open Graph / Twitter `summary_large_image` dimensions.
const OG_IMAGE_WIDTH = 1200;
const OG_IMAGE_HEIGHT = 630;

/**
 * Builds an Open Graph image URL from a base endpoint (e.g. `/api/og`) and the
 * given metadata, returning it wrapped with the dimensions and alt text
 * expected by Next.js `Metadata` `openGraph.images` / `twitter.images`.
 */
export const getImageWithMetadata = (
  baseUrl: string,
  { title, description, locale }: OgImageParams
): OgImageWithMetadata[] => {
  const searchParams = new URLSearchParams();

  searchParams.set('title', title);

  if (description) {
    searchParams.set('description', description);
  }

  if (locale) {
    searchParams.set('locale', locale);
  }

  return [
    {
      url: `${baseUrl}?${searchParams.toString()}`,
      width: OG_IMAGE_WIDTH,
      height: OG_IMAGE_HEIGHT,
      alt: title,
    },
  ];
};
