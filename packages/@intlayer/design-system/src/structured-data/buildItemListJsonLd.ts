/** @module buildItemListJsonLd */

export type ItemListEntry = {
  name: string;
  description: string;
};

export type BuildItemListJsonLdParams = {
  items: ItemListEntry[];
  /** Name of the list itself, when it has one worth describing. */
  name?: string;
};

/**
 * Builds a Schema.org ItemList JSON-LD object.
 *
 * Describes an ordered set of named entries — the sections of a documentation
 * block, for instance. Entries that are not questions must not be declared as
 * a `FAQPage`, which is what this covers.
 *
 * @param params - The entries of the list, and an optional name for the list.
 * @returns A JSON-LD ItemList object ready for serialization.
 */
export const buildItemListJsonLd = ({
  items,
  name,
}: BuildItemListJsonLdParams) => ({
  '@context': 'https://schema.org' as const,
  '@type': 'ItemList' as const,
  ...(name ? { name } : {}),
  numberOfItems: items.length,
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem' as const,
    position: index + 1,
    name: item.name,
    description: item.description,
  })),
});
