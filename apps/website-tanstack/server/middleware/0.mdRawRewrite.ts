/**
 * Nitro production middleware — redirects .md content URLs to their /raw/ equivalents.
 *
 * /[locale]/doc/slug.md                → 301 → /[locale]/doc/raw/slug
 * /[locale]/blog/slug.md               → 301 → /[locale]/blog/raw/slug
 * /[locale]/frequent-questions/slug.md → 301 → /[locale]/frequent-questions/raw/slug
 *
 * Intentionally avoids importing from 'h3' — Nitro bundles h3 internally and
 * provides a populated event at runtime. Using a structural type keeps this file
 * runtime-agnostic and resolves without h3 in devDependencies.
 */

type H3EventLike = {
  readonly path: string;
};

const MD_REWRITE_PATTERN =
  /^(\/[a-z]{2}(?:-[A-Z]{2})?)?\/(doc|blog|frequent-questions)\/(.+?)\.md(\?.*)?$/;

export default (event: H3EventLike): Response | void => {
  const match = event.path.match(MD_REWRITE_PATTERN);
  if (!match) return;

  const locale = match[1] ?? '';
  const section = match[2];
  const slug = match[3];
  const query = match[4] ?? '';

  return new Response(null, {
    status: 301,
    headers: { Location: `${locale}/${section}/raw/${slug}${query}` },
  });
};
