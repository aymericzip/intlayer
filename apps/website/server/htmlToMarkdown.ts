/**
 * Converts a rendered HTML page into the markdown served to agents that send
 * `Accept: text/markdown` (Markdown for Agents).
 *
 * Documentation, blog and FAQ pages are answered from their markdown sources by
 * the `/raw/` routes; this conversion covers every other page (home, pricing,
 * tools…), which only exists as rendered HTML.
 *
 * @see https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/
 */

import { NodeHtmlMarkdown } from 'node-html-markdown';
import { type HTMLElement, parse } from 'node-html-parser';

/**
 * Elements carrying no readable content, or only site chrome repeated on every
 * page. `<button>` is kept on purpose: accordion triggers hold FAQ questions.
 */
const IGNORED_SELECTORS = [
  'script',
  'style',
  'noscript',
  'template',
  'svg',
  'canvas',
  'iframe',
  'video',
  'audio',
  'picture',
  'nav',
  'footer',
  'aside',
  // Visual duplicates (sizing ghosts, decorative layers) read twice otherwise.
  '[aria-hidden="true"]',
  '[hidden]',
] as const;

const markdownConverter = new NodeHtmlMarkdown({
  maxConsecutiveNewlines: 2,
  keepDataImages: false,
});

/** Front matter values extracted from the page `<head>`. */
type PageMetadata = {
  title?: string;
  description?: string;
  url: string;
};

/** Quotes a front matter value so colons and quotes stay valid YAML. */
const toYamlString = (value: string): string => JSON.stringify(value.trim());

const getMetadata = (document: HTMLElement, pageUrl: string): PageMetadata => {
  const canonicalUrl = document
    .querySelector('link[rel="canonical"]')
    ?.getAttribute('href');

  return {
    title: document.querySelector('title')?.textContent,
    description: document
      .querySelector('meta[name="description"]')
      ?.getAttribute('content'),
    url: canonicalUrl ?? pageUrl,
  };
};

const toFrontMatter = ({ title, description, url }: PageMetadata): string => {
  const entries = [
    title ? `title: ${toYamlString(title)}` : undefined,
    description ? `description: ${toYamlString(description)}` : undefined,
    `url: ${toYamlString(url)}`,
  ].filter((entry): entry is string => entry !== undefined);

  return `---\n${entries.join('\n')}\n---`;
};

/**
 * Gives icon-only links (their `<svg>` already removed) their accessible name
 * as text, so they do not render as empty `[](/href)`. Links without one are
 * dropped.
 */
const labelIconOnlyLinks = (content: HTMLElement): void => {
  for (const link of content.querySelectorAll('a')) {
    if (link.textContent.trim() !== '') continue;

    const label =
      link.getAttribute('aria-label') ?? link.getAttribute('title') ?? '';

    if (label.trim() === '') {
      link.remove();
    } else {
      link.set_content(label);
    }
  }
};

/**
 * Converts a full HTML document into markdown with YAML front matter.
 *
 * Only `<main>` is converted when the page has one, so navigation and footer
 * links do not drown the page content.
 *
 * @param html - Complete HTML document.
 * @param pageUrl - Absolute URL of the page, used when it has no canonical link.
 * @returns The markdown representation, newline-terminated.
 */
export const convertHtmlToMarkdown = (
  html: string,
  pageUrl: string
): string => {
  const document = parse(html, { comment: false });
  const metadata = getMetadata(document, pageUrl);
  const content =
    document.querySelector('main') ??
    document.querySelector('body') ??
    document;

  for (const element of content.querySelectorAll(IGNORED_SELECTORS.join(','))) {
    element.remove();
  }

  labelIconOnlyLinks(content);

  const markdown = markdownConverter.translate(content.toString()).trim();

  return `${toFrontMatter(metadata)}\n\n${markdown}\n`;
};

/**
 * Rough token count of a markdown body, exposed as `x-markdown-tokens` so an
 * agent can budget its context before reading the body.
 *
 * Uses the common four-characters-per-token heuristic: an estimate, not the
 * exact count of any specific tokenizer.
 */
export const estimateMarkdownTokens = (markdown: string): number =>
  Math.ceil(markdown.length / 4);
