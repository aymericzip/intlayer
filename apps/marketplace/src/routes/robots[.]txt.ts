import {
  App_NotFound_Path,
  Marketplace_Dashboard_Path,
} from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import { getMultilingualUrls } from 'intlayer';

const PRIVATE_PATHS = [App_NotFound_Path, Marketplace_Dashboard_Path];

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
 * Known AI crawler and scraper user agents explicitly allowed to access public content.
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
  // Apple Intelligence, Meta AI, Common Crawl
  'Applebot-Extended',
  'meta-externalagent',
  'CCBot',
];

export const Route = createFileRoute('/robots.txt')({
  server: {
    handlers: {
      GET: () => {
        const siteUrl = (
          import.meta.env.VITE_SITE_URL ?? 'https://marketplace.intlayer.org'
        ).replace(/\/$/, '');

        // Kept in path order — every locale of a path listed together — so the
        // file stays readable next to `PRIVATE_PATHS`.
        const disallowedUrls = [...new Set(getAllUrls(PRIVATE_PATHS))];

        let text = '';
        for (const bot of AI_BOT_USER_AGENTS) {
          text += `User-agent: ${bot}\n`;
          text += 'Allow: /\n\n';
        }

        text += '# General robots rules\n';
        text += 'User-agent: *\n';
        text += 'Allow: /\n';
        for (const url of disallowedUrls) {
          text += `Disallow: ${url}\n`;
        }
        text += `Host: ${siteUrl}\n`;
        text += `Sitemap: ${siteUrl}/sitemap.xml\n`;

        return new Response(text, {
          headers: { 'Content-Type': 'text/plain; charset=utf-8' },
        });
      },
    },
  },
});
