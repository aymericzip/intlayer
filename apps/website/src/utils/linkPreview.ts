/** Open Graph summary of an external page, rendered as a link preview card. */
export type LinkPreview = {
  /** Final URL of the page, after redirects. */
  url: string;
  title?: string;
  description?: string;
  /** Absolute URL of the `og:image` / `twitter:image`. */
  image?: string;
  siteName?: string;
  /** Absolute URL of the declared favicon. */
  favicon?: string;
};

/** Longest description kept, the card clamps it to two lines anyway. */
const MAX_DESCRIPTION_LENGTH = 300;

const NAMED_ENTITIES: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
};

/** Decodes the HTML entities found in attribute values and `<title>`. */
const decodeHtmlEntities = (value: string): string =>
  value.replace(
    /&(#x[\da-f]+|#\d+|[a-z]+);/gi,
    (match, entity: string): string => {
      const lowerEntity = entity.toLowerCase();

      if (lowerEntity.startsWith('#x')) {
        return String.fromCodePoint(Number.parseInt(lowerEntity.slice(2), 16));
      }
      if (lowerEntity.startsWith('#')) {
        return String.fromCodePoint(Number.parseInt(lowerEntity.slice(1), 10));
      }

      return NAMED_ENTITIES[lowerEntity] ?? match;
    }
  );

/** Attributes of one HTML tag, keys lower-cased, values entity-decoded. */
const parseTagAttributes = (tag: string): Record<string, string> => {
  const attributes: Record<string, string> = {};
  const attributePattern =
    /([^\s"'<>/=]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+))/g;

  for (const match of tag.matchAll(attributePattern)) {
    const [, name, doubleQuoted, singleQuoted, unquoted] = match;
    attributes[name.toLowerCase()] = decodeHtmlEntities(
      doubleQuoted ?? singleQuoted ?? unquoted ?? ''
    ).trim();
  }

  return attributes;
};

/** Resolves `value` against the page URL, keeping only http(s) results. */
const resolveHttpUrl = (
  value: string | undefined,
  pageUrl: string
): string | undefined => {
  if (!value) return undefined;

  try {
    const resolved = new URL(value, pageUrl);
    return resolved.protocol === 'https:' || resolved.protocol === 'http:'
      ? resolved.toString()
      : undefined;
  } catch {
    return undefined;
  }
};

const truncate = (value: string, maxLength: number): string =>
  value.length > maxLength ? `${value.slice(0, maxLength - 1)}…` : value;

/**
 * Extracts the Open Graph / Twitter card metadata of an HTML document,
 * falling back to `<title>` and `<meta name="description">`.
 */
export const parseLinkPreview = (
  html: string,
  pageUrl: string
): LinkPreview => {
  const metaValues: Record<string, string> = {};

  for (const [tag] of html.matchAll(/<meta\b[^>]*>/gi)) {
    const attributes = parseTagAttributes(tag);
    const key = (attributes.property ?? attributes.name)?.toLowerCase();

    // The first declaration wins, as crawlers do
    if (key && attributes.content && !(key in metaValues)) {
      metaValues[key] = attributes.content;
    }
  }

  let faviconHref: string | undefined;
  for (const [tag] of html.matchAll(/<link\b[^>]*>/gi)) {
    const attributes = parseTagAttributes(tag);
    const relations = attributes.rel?.toLowerCase().split(/\s+/) ?? [];

    if (relations.includes('icon') && attributes.href) {
      faviconHref = attributes.href;
      break;
    }
  }

  const documentTitle = html.match(/<title\b[^>]*>([^<]*)<\/title>/i)?.[1];
  const title =
    metaValues['og:title'] ??
    metaValues['twitter:title'] ??
    (documentTitle ? decodeHtmlEntities(documentTitle).trim() : undefined);
  const description =
    metaValues['og:description'] ??
    metaValues['twitter:description'] ??
    metaValues.description;

  return {
    url: pageUrl,
    title: title || undefined,
    description: description
      ? truncate(description, MAX_DESCRIPTION_LENGTH)
      : undefined,
    image: resolveHttpUrl(
      metaValues['og:image:secure_url'] ??
        metaValues['og:image'] ??
        metaValues['og:image:url'] ??
        metaValues['twitter:image'] ??
        metaValues['twitter:image:src'],
      pageUrl
    ),
    siteName: metaValues['og:site_name'],
    favicon: resolveHttpUrl(faviconHref, pageUrl),
  };
};
