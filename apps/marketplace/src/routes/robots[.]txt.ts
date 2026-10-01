import {
  App_NotFound_Path,
  Marketplace_Dashboard_Path,
  Marketplace_Origin,
} from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import { getMultilingualUrls } from 'intlayer';

const PRIVATE_PATHS = [App_NotFound_Path, Marketplace_Dashboard_Path];

/**
 * Canonical marketplace origin. Not read from `VITE_SITE_URL`: production
 * builds were baked with a local value (`http://localhost:3300`).
 */
const SITE_URL = Marketplace_Origin;

/**
 * Expands every path into its localized variants, so `/fr/admin` is disallowed
 * alongside `/admin` — a `Disallow` matches a URL prefix, not a route.
 *
 * @param paths - The unprefixed paths to disallow.
 * @returns Every localized URL to list under `Disallow`.
 */
const getAllUrls = (paths: string[]): string[] =>
  paths.flatMap((path) => Object.values(getMultilingualUrls(path)) as string[]);

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
        // Kept in path order — every locale of a path listed together — so the
        // file stays readable next to `PRIVATE_PATHS`.
        const disallowedUrls = [...new Set(getAllUrls(PRIVATE_PATHS))];

        const lines = [
          ...[...AI_BOT_USER_AGENTS, '*'].map(
            (userAgent) => `User-agent: ${userAgent}`
          ),
          'Allow: /',
          ...disallowedUrls.map((url) => `Disallow: ${url}`),
          '',
          `Sitemap: ${SITE_URL}/sitemap.xml`,
        ];

        return new Response(`${lines.join('\n')}\n`, {
          headers: { 'Content-Type': 'text/plain; charset=utf-8' },
        });
      },
    },
  },
});
