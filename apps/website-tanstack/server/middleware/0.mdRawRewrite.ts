/**
 * Nitro production middleware — redirects .md content URLs to their /raw/ equivalents.
 *
 * /[locale]/doc/slug.md                → 301 → /[locale]/doc/raw/slug
 * /[locale]/blog/slug.md               → 301 → /[locale]/blog/raw/slug
 * /[locale]/frequent-questions/slug.md → 301 → /[locale]/frequent-questions/raw/slug
 *
 * Uses a 301 permanent redirect so the /raw/ server.handlers serve the markdown
 * regardless of how TanStack Start resolves the rewritten path.
 * The <link rel="alternate" type="text/markdown"> head tag advertises the .md URL
 * to AI crawlers; they will follow the redirect transparently.
 */
import { defineEventHandler, sendRedirect } from 'h3';

const MD_REWRITE_PATTERN =
  /^(\/[a-z]{2}(?:-[A-Z]{2})?)?\/(doc|blog|frequent-questions)\/(.+?)\.md(\?.*)?$/;

export default defineEventHandler((event) => {
  const match = event.path.match(MD_REWRITE_PATTERN);
  if (!match) return;

  const locale = match[1] ?? '';
  const section = match[2];
  const slug = match[3];
  const query = match[4] ?? '';

  return sendRedirect(event, `${locale}/${section}/raw/${slug}${query}`, 301);
});
