/* @vitest-environment node */

import { describe, expect, it } from 'vitest';
import {
  getRawMarkdownPathname,
  prefersMarkdown,
  type RewritableEvent,
} from './markdownRewrite';
import mdAcceptRewrite from './middleware/0.mdAcceptRewrite';
import mdRawRewrite from './middleware/0.mdRawRewrite';

/** Builds the minimal h3 event shape the middlewares mutate. */
const createEvent = (path: string, accept?: string): RewritableEvent => {
  const url = new URL(path, 'https://intlayer.org');

  return {
    url,
    req: new Request(url, { headers: accept ? { accept } : undefined }),
  };
};

describe('prefersMarkdown', () => {
  it('honours an agent asking for markdown first', () => {
    expect(prefersMarkdown('text/markdown,text/html;q=0.9')).toBe(true);
  });

  it('honours an equal-quality tie', () => {
    expect(prefersMarkdown('text/html,text/markdown')).toBe(true);
  });

  it('never treats a browser header as a markdown request', () => {
    expect(prefersMarkdown('text/html,application/xhtml+xml,*/*;q=0.8')).toBe(
      false
    );
  });

  it('never infers markdown from a wildcard alone', () => {
    expect(prefersMarkdown('*/*')).toBe(false);
  });

  it('treats a missing header as HTML', () => {
    expect(prefersMarkdown(undefined)).toBe(false);
  });
});

describe('getRawMarkdownPathname', () => {
  it('maps a locale-less documentation path', () => {
    expect(getRawMarkdownPathname('/doc/get-started')).toBe(
      '/doc/raw/get-started'
    );
  });

  it('keeps the locale prefix', () => {
    expect(getRawMarkdownPathname('/fr/doc/concept/cms')).toBe(
      '/fr/doc/raw/concept/cms'
    );
  });

  it('supports every negotiable section', () => {
    expect(getRawMarkdownPathname('/blog/why-intlayer')).toBe(
      '/blog/raw/why-intlayer'
    );
    expect(getRawMarkdownPathname('/en-GB/frequent-questions/build')).toBe(
      '/en-GB/frequent-questions/raw/build'
    );
  });

  it('leaves an already-raw path alone', () => {
    expect(getRawMarkdownPathname('/doc/raw/get-started')).toBeUndefined();
  });

  it('leaves interactive pages alone', () => {
    expect(getRawMarkdownPathname('/doc/search')).toBeUndefined();
    expect(getRawMarkdownPathname('/fr/doc/chat')).toBeUndefined();
  });

  it('leaves non-negotiable sections alone', () => {
    expect(getRawMarkdownPathname('/pricing')).toBeUndefined();
    expect(getRawMarkdownPathname('/doc')).toBeUndefined();
  });
});

describe('mdRawRewrite', () => {
  it('serves a .md URL from its raw counterpart without redirecting', () => {
    const event = createEvent('/doc/packages/intlayer-cli/exports.md');

    const result = mdRawRewrite(event);

    // A `301` here breaks any client fetching with `redirect: 'error'`.
    expect(result).toBeUndefined();
    expect(event.url.pathname).toBe('/doc/raw/packages/intlayer-cli/exports');
    expect(event.url.searchParams.get('format')).toBe('txt');
  });

  it('rewrites the request the SSR renderer reads, not only the event URL', () => {
    const event = createEvent('/fr/blog/why-intlayer.md');

    mdRawRewrite(event);

    expect(new URL(event.req.url).pathname).toBe('/fr/blog/raw/why-intlayer');
    expect(event.req.headers).toBeInstanceOf(Headers);
  });

  it('keeps a format the request already carries', () => {
    const event = createEvent('/doc/get-started.md?format=html');

    mdRawRewrite(event);

    expect(event.url.searchParams.get('format')).toBe('html');
  });

  it('ignores URLs without a .md suffix', () => {
    const event = createEvent('/doc/get-started');

    mdRawRewrite(event);

    expect(event.url.pathname).toBe('/doc/get-started');
  });

  it('ignores a .md suffix outside a negotiable section', () => {
    const event = createEvent('/llms.md');

    mdRawRewrite(event);

    expect(event.url.pathname).toBe('/llms.md');
  });
});

describe('mdAcceptRewrite', () => {
  it('serves markdown from the canonical URL when an agent asks for it', () => {
    const event = createEvent('/doc/get-started', 'text/markdown');

    mdAcceptRewrite(event);

    expect(event.url.pathname).toBe('/doc/raw/get-started');
    expect(new URL(event.req.url).pathname).toBe('/doc/raw/get-started');
  });

  it('forces no format, so the raw handler negotiates the media type', () => {
    const event = createEvent('/doc/get-started', 'text/markdown');

    mdAcceptRewrite(event);

    expect(event.url.searchParams.has('format')).toBe(false);
  });

  it('keeps serving HTML to browsers', () => {
    const event = createEvent(
      '/doc/get-started',
      'text/html,application/xhtml+xml,*/*;q=0.8'
    );

    mdAcceptRewrite(event);

    expect(event.url.pathname).toBe('/doc/get-started');
  });

  it('leaves .md URLs to the suffix middleware', () => {
    const event = createEvent('/doc/get-started.md', 'text/markdown');

    mdAcceptRewrite(event);

    expect(event.url.pathname).toBe('/doc/get-started.md');
  });
});
