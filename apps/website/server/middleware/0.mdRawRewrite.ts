/**
 * Nitro production middleware — serves `.md` content URLs from their `/raw/`
 * counterpart.
 *
 * /[locale]/doc/slug.md                → /[locale]/doc/raw/slug?format=txt
 * /[locale]/blog/slug.md               → /[locale]/blog/raw/slug?format=txt
 * /[locale]/frequent-questions/slug.md → /[locale]/frequent-questions/raw/slug?format=txt
 *
 * This is a rewrite answering `200`, not a `301`. The Next.js site served these
 * URLs through `rewrites()` and agents rely on it: the Intlayer CLI's skill
 * installer fetches every `https://intlayer.org/**.md` link with
 * `redirect: 'error'`, which turns a redirect into `TypeError: fetch failed`.
 *
 * `format=txt` mirrors the destination the Next.js rewrite used, so a `.md` URL
 * keeps answering `text/plain` regardless of the client's `Accept` header.
 */

import {
  getRawMarkdownPathname,
  type RewritableEvent,
  rewriteToRawMarkdown,
} from '../markdownRewrite';

const MD_SUFFIX_PATTERN = /\.md$/;

export default (event: RewritableEvent): void => {
  const { pathname } = event.url;

  if (!MD_SUFFIX_PATTERN.test(pathname)) return;

  const rawPathname = getRawMarkdownPathname(
    pathname.replace(MD_SUFFIX_PATTERN, '')
  );

  if (!rawPathname) return;

  rewriteToRawMarkdown(event, rawPathname, 'txt');
};
