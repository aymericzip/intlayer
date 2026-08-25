/**
 * Nitro production middleware — serves the markdown representation of a
 * documentation page to agents that ask for it, without changing the URL.
 *
 * `GET /doc/get-started` with `Accept: text/markdown` keeps its canonical URL
 * and answers with the markdown source.
 *
 * `.md` URLs are left alone: `0.mdRawRewrite` owns them, and rewriting them
 * here would target `/doc/raw/get-started.md`, which no route matches.
 *
 * @see https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/
 */

import {
  getRawMarkdownPathname,
  prefersMarkdown,
  type RewritableEvent,
  rewriteToRawMarkdown,
} from '../markdownRewrite';

export default (event: RewritableEvent): void => {
  const { pathname } = event.url;

  // Owned by `0.mdRawRewrite`, which forces its own representation.
  if (pathname.endsWith('.md')) return;

  if (!prefersMarkdown(event.req.headers.get('accept'))) return;

  const rawPathname = getRawMarkdownPathname(pathname);

  if (!rawPathname) return;

  rewriteToRawMarkdown(event, rawPathname);
};
