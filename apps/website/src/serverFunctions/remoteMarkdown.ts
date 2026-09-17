import { createServerFn } from '@tanstack/react-start';
import type { LocalesValues } from 'intlayer';
import { type ParsedMarkdown, parseMarkdown } from 'react-intlayer/markdown';
import { urlRenamer } from '~/utils/markdown';
import { assertSafeRemoteMarkdownUrl } from '~/utils/remoteMarkdownUrl';

/** Upper bound on the remote fetch, so a stalled host cannot hang the render. */
const REMOTE_MARKDOWN_TIMEOUT_MS = 20_000;

export type RemoteMarkdownResult =
  | {
      status: 'success';
      markdownParsed: ParsedMarkdown;
      codeStyleSheet: string;
    }
  | { status: 'error'; message: string };

const fetchRemoteMarkdown = async (source: URL): Promise<string> => {
  const response = await fetch(source.toString(), {
    cache: 'no-store',
    headers: { Accept: 'text/markdown, text/plain, */*' },
    signal: AbortSignal.timeout(REMOTE_MARKDOWN_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`Failed to load markdown (${response.status})`);
  }

  return response.text();
};

/**
 * Fetches a public markdown document and prepares it for `DocumentationRender`.
 *
 * Deliberately not wrapped in `staticFunctionMiddleware`: the target is an
 * arbitrary URL, so the result is request-time by nature and must never be
 * baked into the prerender cache. Failures are returned rather than thrown so
 * the route can render them without tripping the error boundary.
 */
export const loadRemoteMarkdown = createServerFn()
  .validator((data: { locale: LocalesValues; url: string }) => data)
  .handler(async ({ data: { locale, url } }): Promise<RemoteMarkdownResult> => {
    try {
      const source = assertSafeRemoteMarkdownUrl(url);
      const markdown = urlRenamer(await fetchRemoteMarkdown(source), locale);
      const markdownParsed = parseMarkdown(markdown);

      const { highlightMarkdownCodeBlocks } = await import(
        '~/utils/highlightMarkdown'
      );
      const codeStyleSheet = await highlightMarkdownCodeBlocks(markdownParsed);

      return { status: 'success', markdownParsed, codeStyleSheet };
    } catch (error) {
      return {
        status: 'error',
        message: error instanceof Error ? error.message : String(error),
      };
    }
  });
