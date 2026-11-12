/** @module buildRobotsTxt */

/** Value of a single Content Signal. */
export type ContentSignalValue = 'yes' | 'no';

/**
 * Content Signals declaring how a site's content may be reused.
 *
 * - `search`   — indexing for traditional search results.
 * - `ai-input` — retrieval to ground an AI answer (RAG, AI Overviews, chat).
 * - `ai-train` — retention in a generative model's training corpus.
 *
 * @see https://contentsignals.org/
 */
export type ContentSignals = Record<
  'search' | 'ai-input' | 'ai-train',
  ContentSignalValue
>;

/**
 * Every signal granted: Intlayer's sites and documentation are deliberately
 * published for machine consumption, model training included.
 */
export const INTLAYER_CONTENT_SIGNALS: ContentSignals = {
  search: 'yes',
  'ai-input': 'yes',
  'ai-train': 'yes',
};

/**
 * AI crawler and agent user agents, named so auditors that look for them see
 * the permission stated rather than inferred from `User-agent: *`.
 */
export const AI_BOT_USER_AGENTS = [
  // OpenAI: training crawler, search index, on-demand fetches for ChatGPT
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  // Anthropic: training crawler, search index, on-demand fetches for Claude
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'Claude-Web',
  // Google (Gemini / AI Overviews training opt-in token)
  'Google-Extended',
  // Perplexity: index crawler and on-demand fetches
  'PerplexityBot',
  'Perplexity-User',
  // Apple Intelligence, Amazon, Meta AI, Mistral, DuckDuckGo, Common Crawl
  'Applebot-Extended',
  'Amazonbot',
  'meta-externalagent',
  'MistralAI-User',
  'DuckAssistBot',
  'CCBot',
] as const;

export type BuildRobotsTxtParams = {
  /** Every URL path listed under `Disallow`, already localized. */
  disallowedPaths: string[];
  /** Absolute URL of this host's sitemap. */
  sitemapUrl: string;
  /** Defaults to {@link INTLAYER_CONTENT_SIGNALS}. */
  contentSignals?: ContentSignals;
  /** Lines appended after the `Sitemap` directive (comments, extra hints). */
  trailingLines?: string[];
};

/**
 * Serializes Content Signals into a robots.txt directive.
 *
 * @returns e.g. `Content-Signal: search=yes, ai-input=yes, ai-train=yes`
 */
export const getContentSignalDirective = (
  contentSignals: ContentSignals
): string =>
  `Content-Signal: ${Object.entries(contentSignals)
    .map(([signal, value]) => `${signal}=${value}`)
    .join(', ')}`;

/**
 * Builds a robots.txt body shared by every Intlayer site.
 *
 * AI user agents join the `*` group instead of getting an `Allow: /` group of
 * their own: a crawler obeys only the most specific group matching it, so a
 * separate group would reopen every `Disallow` to them.
 *
 * `Content-Signal` is emitted as a real directive inside that group — a
 * commented one is invisible to every consumer. Parsers following RFC 9309
 * (Google, Bing) ignore unknown directives, so crawl rules are unaffected.
 *
 * @param params - Disallowed paths, sitemap and signals of the site.
 * @returns The robots.txt content, newline-terminated.
 */
export const buildRobotsTxt = ({
  disallowedPaths,
  sitemapUrl,
  contentSignals = INTLAYER_CONTENT_SIGNALS,
  trailingLines = [],
}: BuildRobotsTxtParams): string => {
  const lines = [
    ...[...AI_BOT_USER_AGENTS, '*'].map(
      (userAgent) => `User-agent: ${userAgent}`
    ),
    getContentSignalDirective(contentSignals),
    'Allow: /',
    ...[...new Set(disallowedPaths)].map((path) => `Disallow: ${path}`),
    '',
    `Sitemap: ${sitemapUrl}`,
    ...trailingLines,
  ];

  return `${lines.join('\n')}\n`;
};
