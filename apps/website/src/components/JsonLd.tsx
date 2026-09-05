import type { FC } from 'react';

type JsonLdProps = {
  /** The schema.org node, serialised as-is into the script. */
  jsonLd: unknown;
};

/**
 * Emits a schema.org node as an inline `<script type="application/ld+json">`.
 *
 * JSON-LD is the format Google recommends over microdata, and it lets a block
 * describe itself wherever it is rendered — a block whose content is unknown to
 * the route that builds the `head`, such as a markdown-sourced documentation
 * section, has no other place to declare it.
 *
 * `<` is escaped so a `</script>` sequence inside the content cannot close the
 * script tag early; the escape stays valid JSON.
 */
export const JsonLd: FC<JsonLdProps> = ({ jsonLd }) => (
  <script
    type="application/ld+json"
    // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON serialised here, with `<` escaped
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
    }}
  />
);
