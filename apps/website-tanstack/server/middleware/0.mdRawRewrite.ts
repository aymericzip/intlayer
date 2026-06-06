/**
 * Nitro production middleware — rewrites .md content URLs to their /raw/ equivalents
 * BEFORE the intlayerProxy locale-routing middleware runs.
 *
 * /[locale]/doc/slug.md                → /[locale]/doc/raw/slug
 * /[locale]/blog/slug.md               → /[locale]/blog/raw/slug
 * /[locale]/frequent-questions/slug.md → /[locale]/frequent-questions/raw/slug
 *
 * This allows AI crawlers and curl to fetch raw markdown at the canonical .md URL
 * without any HTTP redirect. The /raw/ server.handlers routes do the actual serving.
 */

type H3EventLike = {
  readonly path: string;
  url: URL;
};

const MD_REWRITE_PATTERN =
  /^(\/[a-z]{2}(?:-[A-Z]{2})?)?\/(doc|blog|frequent-questions)\/(.+?)\.md(\?.*)?$/;

export default (event: H3EventLike): void => {
  const match = event.path.match(MD_REWRITE_PATTERN);
  if (!match) return;

  const locale = match[1] ?? '';
  const section = match[2];
  const slug = match[3];
  const query = match[4] ?? '';
  const newPath = `${locale}/${section}/raw/${slug}${query}`;

  try {
    event.url = new URL(newPath, event.url.origin);
  } catch {
    console.error('[mdRawRewrite] URL rewrite failed — invalid path:', newPath);
  }
};
