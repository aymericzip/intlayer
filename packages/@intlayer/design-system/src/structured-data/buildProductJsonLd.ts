/** @module buildProductJsonLd */

/** Minimal Schema.org Offer node. */
export type SchemaOrgOffer = {
  '@type': 'Offer';
  [key: string]: unknown;
};

export type BuildProductJsonLdParams = {
  /** Canonical URL of the product page. */
  url: string;
  /** Product display name. */
  name: string;
  description: string;
  /** Absolute URL of the product image. */
  imageUrl: string;
  /** Brand name (defaults to "Intlayer"). */
  brandName?: string;
  /** Pre-formatted Schema.org Offer nodes. */
  offers?: SchemaOrgOffer[];
};

/**
 * Builds a Schema.org Product JSON-LD object.
 *
 * @param params - Product metadata.
 * @returns A JSON-LD Product object ready for serialization.
 */
export const buildProductJsonLd = ({
  url,
  name,
  description,
  imageUrl,
  brandName = 'Intlayer',
  offers,
}: BuildProductJsonLdParams) => ({
  '@context': 'https://schema.org' as const,
  '@type': 'Product' as const,
  url,
  name,
  description,
  image: imageUrl,
  brand: {
    '@type': 'Brand' as const,
    name: brandName,
  },
  offers,
});
