/* @vitest-environment node */

import { describe, expect, it } from 'vitest';
import {
  convertHtmlToMarkdown,
  estimateMarkdownTokens,
} from './htmlToMarkdown';
import type { RewritableEvent } from './markdownRewrite';
import markdownForAgents from './middleware/0.markdownForAgents';
import mdAcceptRewrite from './middleware/0.mdAcceptRewrite';

const PAGE_HTML = `<!doctype html><html><head>
<title>Intlayer | Internationalization</title>
<meta name="description" content="Type-safe: i18n &quot;solution&quot;">
<link rel="canonical" href="https://intlayer.org/">
<script>window.__STATE__ = {}</script>
</head><body>
<nav><a href="/doc">Docs</a></nav>
<main>
  <h1><span aria-hidden="true">Internationalization Layer</span><span>Internationalization Layer</span></h1>
  <p>Define translations <a href="/doc/get-started">anywhere</a>.</p>
  <svg><text>logo</text></svg>
  <a href="/doc/environment/nextjs" aria-label="nextjs"><svg></svg></a>
  <a href="/empty"><svg></svg></a>
  <button>What is i18n?</button>
  <div hidden>Hidden panel</div>
</main>
<footer>Footer links</footer>
</body></html>`;

/** Builds the minimal h3 event shape the middleware reads and rebinds. */
const createEvent = (
  path: string,
  headers: Record<string, string>,
  method = 'GET'
): RewritableEvent => {
  const url = new URL(path, 'https://intlayer.org');

  return { url, req: new Request(url, { method, headers }) };
};

const htmlResponse = (body = PAGE_HTML): Response =>
  new Response(body, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Length': String(body.length),
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });

describe('convertHtmlToMarkdown', () => {
  const markdown = convertHtmlToMarkdown(PAGE_HTML, 'https://intlayer.org/x');

  it('writes front matter from the head', () => {
    expect(markdown.startsWith('---\n')).toBe(true);
    expect(markdown).toContain('title: "Intlayer | Internationalization"');
    expect(markdown).toContain('description: "Type-safe: i18n \\"solution\\""');
    expect(markdown).toContain('url: "https://intlayer.org/"');
  });

  it('converts only the main content', () => {
    expect(markdown).toContain('# Internationalization Layer\n');
    expect(markdown).toContain('[anywhere](/doc/get-started)');
    expect(markdown).toContain('What is i18n?');
    expect(markdown).not.toContain('Docs');
    expect(markdown).not.toContain('Footer links');
    expect(markdown).not.toContain('__STATE__');
    expect(markdown).not.toContain('logo');
    expect(markdown).not.toContain('Hidden panel');
  });

  it('names icon-only links and drops unlabelled ones', () => {
    expect(markdown).toContain('[nextjs](/doc/environment/nextjs)');
    expect(markdown).not.toContain('/empty');
  });

  it('drops aria-hidden duplicates', () => {
    expect(markdown).not.toContain(
      'Internationalization LayerInternationalization Layer'
    );
  });

  it('falls back to the page URL without a canonical link', () => {
    expect(
      convertHtmlToMarkdown('<main><p>Hi</p></main>', 'https://intlayer.org/x')
    ).toContain('url: "https://intlayer.org/x"');
  });
});

describe('estimateMarkdownTokens', () => {
  it('rounds four characters per token up', () => {
    expect(estimateMarkdownTokens('12345')).toBe(2);
  });
});

describe('0.markdownForAgents', () => {
  it('leaves browsers and crawlers untouched without calling next', async () => {
    for (const accept of [
      'text/html,application/xhtml+xml,*/*;q=0.8',
      '*/*',
      'text/markdown;q=0.5,text/html',
    ]) {
      const event = createEvent('/', { accept });
      const originalRequest = event.req;
      let nextCalled = false;

      const result = await markdownForAgents(event, () => {
        nextCalled = true;
        return htmlResponse();
      });

      expect(result).toBeUndefined();
      expect(nextCalled).toBe(false);
      expect(event.req).toBe(originalRequest);
    }
  });

  it('ignores non-GET requests', async () => {
    const event = createEvent('/', { accept: 'text/markdown' }, 'HEAD');

    expect(await markdownForAgents(event, htmlResponse)).toBeUndefined();
  });

  it('converts an HTML page for an agent', async () => {
    const event = createEvent('/pricing?ref=x', {
      accept: 'text/markdown',
      'accept-encoding': 'br, gzip',
    });
    let downstreamEncoding: string | null = 'unset';

    const response = (await markdownForAgents(event, () => {
      downstreamEncoding = event.req.headers.get('accept-encoding');
      return htmlResponse();
    })) as Response;

    expect(downstreamEncoding).toBeNull();
    expect(response.headers.get('content-type')).toBe(
      'text/markdown; charset=utf-8'
    );
    expect(Number(response.headers.get('x-markdown-tokens'))).toBeGreaterThan(
      0
    );
    expect(response.headers.get('vary')).toContain('Accept');
    expect(response.headers.get('link')).toBe(
      '<https://intlayer.org/pricing>; rel="canonical"'
    );
    expect(response.headers.get('content-length')).toBeNull();
    expect(response.headers.get('cache-control')).toBe(
      'public, max-age=0, must-revalidate'
    );
    expect(await response.text()).toContain('# Internationalization Layer');
  });

  it('adds a token count to doc markdown and keeps the public URL', async () => {
    const event = createEvent('/doc/get-started', { accept: 'text/markdown' });
    let downstreamPathname = '';

    const response = (await markdownForAgents(event, () => {
      mdAcceptRewrite(event);
      downstreamPathname = new URL(event.req.url).pathname;

      return new Response('# Get started\n', {
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          Vary: 'Accept',
        },
      });
    })) as Response;

    expect(downstreamPathname).toBe('/doc/raw/get-started');
    expect(response.headers.get('x-markdown-tokens')).toBe('4');
    expect(response.headers.get('link')).toBe(
      '<https://intlayer.org/doc/get-started>; rel="canonical"'
    );
    expect(await response.text()).toBe('# Get started\n');
  });

  it('passes through errors and non-HTML responses', async () => {
    const notFound = new Response('<p>404</p>', {
      status: 404,
      headers: { 'Content-Type': 'text/html' },
    });
    const json = Response.json({ ok: true });

    expect(
      await markdownForAgents(
        createEvent('/missing', { accept: 'text/markdown' }),
        () => notFound
      )
    ).toBe(notFound);
    expect(
      await markdownForAgents(
        createEvent('/api/x', { accept: 'text/markdown' }),
        () => json
      )
    ).toBe(json);
  });
});
