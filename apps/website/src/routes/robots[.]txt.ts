import {
  Website_Domain,
  Website_NotFound_Path,
  Website_Origin,
  WellKnown_AiCatalog_Path,
} from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import { getMultilingualUrls } from 'intlayer';

const getAllUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

/**
 * Content Signals declaring how Intlayer's content may be reused.
 *
 * The documentation is Apache-2.0 licensed and deliberately published for
 * machine consumption (llms.txt, the MCP server and the agent skills index), so
 * every signal is granted.
 *
 * - `search`   — indexing for traditional search results.
 * - `ai-input` — retrieval to ground an AI answer (RAG, AI Overviews, chat).
 * - `ai-train` — retention in a generative model's training corpus.
 *
 * Emitted as a comment: `Content-Signal` is an unregistered directive, so
 * validators (Ahrefs, Lighthouse) report it as an invalid line and risk the
 * whole file being mistrusted — the same trade-off made for `Agentmap` below.
 * Granting every signal is already the no-directive default, so nothing is lost.
 * Withdrawing a permission (flipping a value to `no`) only takes effect as a
 * real directive, so drop the `# ` prefix in that case.
 *
 * @see https://contentsignals.org/
 */
const CONTENT_SIGNALS = {
  search: 'yes',
  'ai-input': 'yes',
  'ai-train': 'yes',
} as const;

/**
 * Serializes the Content Signals into a single robots.txt line.
 *
 * @returns e.g. `# Content-Signal: search=yes, ai-input=yes, ai-train=yes`
 */
const getContentSignalDirective = (): string =>
  `# Content-Signal: ${Object.entries(CONTENT_SIGNALS)
    .map(([signal, value]) => `${signal}=${value}`)
    .join(', ')}`;

/**
 * AI crawler and agent user agents, named so auditors that look for them see
 * the permission stated rather than inferred from `User-agent: *`.
 *
 * They join the `*` group instead of getting an `Allow: /` group of their own:
 * a crawler obeys only the most specific group matching it, so a separate group
 * would reopen every `Disallow` below to them.
 */
const AI_BOT_USER_AGENTS = [
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
];

export const Route = createFileRoute('/robots.txt')({
  server: {
    handlers: {
      GET: () => {
        const siteUrl = (
          import.meta.env.VITE_URL ||
          import.meta.env.VITE_SITE_URL ||
          Website_Origin
        ).replace(/\/$/, '');

        const lines = [
          ...[...AI_BOT_USER_AGENTS, '*'].map(
            (userAgent) => `User-agent: ${userAgent}`
          ),
          // Must sit inside the User-agent group it applies to.
          getContentSignalDirective(),
          'Allow: /',
          ...getAllUrls([Website_NotFound_Path]).map(
            (path) => `Disallow: ${path}`
          ),
          '',
          // Only this host's sitemap: a sitemap may only submit URLs of its
          // own host, and every subdomain advertises its own in its robots.txt.
          `Sitemap: ${siteUrl}/sitemap.xml`,
          // Points agents at the ARD capability manifest, the way `Sitemap`
          // points crawlers at the sitemap. `Agentmap` is not a registered
          // directive, and validators (Lighthouse included) report an unknown
          // one as a malformed robots.txt — which risks the whole file being
          // mistrusted. The manifest is already advertised by the
          // `Link: rel="ai-catalog"` response header and its well-known path,
          // so this stays a comment: still readable, never invalid.
          `# Agentmap: https://${Website_Domain}${WellKnown_AiCatalog_Path}`,
        ];

        return new Response(`${lines.join('\n')}\n`, {
          headers: { 'Content-Type': 'text/plain; charset=utf-8' },
        });
      },
    },
  },
});
