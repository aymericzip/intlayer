import type { FastifyRequest } from 'fastify';

/**
 * Server-side bot filter for the public analytics ingestion endpoint.
 *
 * The `@intlayer/analytics` SDK already refuses to start for crawlers and
 * automation runtimes (`@intlayer/analytics/bot`), but the ingest endpoint is
 * public and long-lived: already-deployed SDK versions, replayed batches and
 * scripted POSTs would still reach it. This is the last gate before events are
 * rolled up, so the pattern below intentionally mirrors the SDK one — keep the
 * two in sync when adding a crawler family.
 */

/**
 * User agents that contain a bot-looking token but belong to real user devices.
 * `CUBOT` is an Android phone brand whose model strings embed `bot`.
 */
const HUMAN_USER_AGENT_EXCEPTION_PATTERN = /cubot/i;

/** Matches known non-human user agents (crawlers, scripts, AI agents). */
const BOT_USER_AGENT_PATTERN =
  /bot\b|bot[/\-\s]|crawler|crawling|spider|scraper|slurp|archiver|feedfetcher|validator|curl\/|wget\/|python-requests|python-urllib|okhttp|axios\/|got \(|go-http-client|java\/|libwww|httpunit|http_request|apache-httpclient|headless|phantomjs|puppeteer|playwright|selenium|webdriver|cypress|lighthouse|pagespeed|gtmetrix|prerender|pingdom|uptime|statuscake|site24x7|bingpreview|yandex|baiduspider|sogou|exabot|semrush|ahrefs|mj12|dotbot|petalbot|applebot|amazonbot|bytespider|facebookexternalhit|meta-externalagent|embedly|outbrain|quora link preview|skypeuripreview|vkshare|w3c_validator|apis-google|mediapartners|adsbot|storebot-google|google-inspectiontool|google-read-aloud|google-extended|duplexweb-google|gptbot|oai-searchbot|chatgpt-user|perplexity|claudebot|claude-web|anthropic-ai|cohere-ai|ccbot|diffbot|imagesift|omgili|timpi|youbot/i;

/**
 * Tells whether a user agent string identifies a bot rather than a human.
 *
 * A missing or empty user agent counts as a bot: every browser sends one, so
 * its absence means a script.
 *
 * @param userAgent - The raw `User-Agent` header value.
 * @returns `true` when the traffic must not be recorded.
 */
export const isBotUserAgent = (userAgent?: string | null): boolean => {
  if (!userAgent) return true;
  if (HUMAN_USER_AGENT_EXCEPTION_PATTERN.test(userAgent)) return false;

  return BOT_USER_AGENT_PATTERN.test(userAgent);
};

/**
 * Tells whether an incoming request comes from a bot, based on its
 * `User-Agent` header.
 *
 * @param request - The incoming Fastify request.
 * @returns `true` when the request must not produce analytics data.
 *
 * @example
 * if (isBotRequest(request)) return reply.status(200).send(emptyResult);
 */
export const isBotRequest = (request: FastifyRequest): boolean => {
  const userAgent = request.headers['user-agent'];

  return isBotUserAgent(Array.isArray(userAgent) ? userAgent[0] : userAgent);
};
