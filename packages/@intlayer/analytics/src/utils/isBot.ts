/**
 * Bot / automation detection.
 *
 * Analytics must describe real people. Crawlers, link-preview fetchers, uptime
 * monitors, AI agents and CI browsers (Lighthouse, Playwright, Puppeteer) all
 * execute JavaScript nowadays, so they would otherwise be counted as visitors
 * and inflate page views, content exposures and A/B conversion rates.
 *
 * Everything here is a pure string/environment check — no network, no storage.
 */

/**
 * User agents that look like a bot but belong to real user devices, checked
 * before {@link BOT_USER_AGENT_PATTERN}. `CUBOT` is an Android phone brand
 * whose model strings (`CUBOT_X19`) contain the `bot` token.
 */
const HUMAN_USER_AGENT_EXCEPTION_PATTERN = /cubot/i;

/**
 * Matches known non-human user agents. Grouped by family so the list stays
 * reviewable:
 * - generic tokens (`…bot`, `crawler`, `spider`, `scraper`)
 * - HTTP clients used by scripts (curl, wget, requests, axios…)
 * - headless / automation runtimes (Playwright, Puppeteer, Lighthouse…)
 * - search-engine and SEO crawlers
 * - social link-preview fetchers
 * - AI / LLM crawlers and agents
 */
export const BOT_USER_AGENT_PATTERN =
  /bot\b|bot[/\-\s]|crawler|crawling|spider|scraper|slurp|archiver|feedfetcher|validator|curl\/|wget\/|python-requests|python-urllib|okhttp|axios\/|node-fetch|got \(|go-http-client|java\/|libwww|httpunit|http_request|apache-httpclient|headless|phantomjs|puppeteer|playwright|selenium|webdriver|cypress|lighthouse|pagespeed|gtmetrix|prerender|pingdom|uptime|statuscake|site24x7|bingpreview|yandex|baiduspider|sogou|exabot|semrush|ahrefs|mj12|dotbot|petalbot|applebot|amazonbot|bytespider|facebookexternalhit|meta-externalagent|embedly|outbrain|quora link preview|skypeuripreview|vkshare|w3c_validator|apis-google|mediapartners|adsbot|storebot-google|google-inspectiontool|google-read-aloud|google-extended|duplexweb-google|gptbot|oai-searchbot|chatgpt-user|perplexity|claudebot|claude-web|anthropic-ai|cohere-ai|ccbot|diffbot|imagesift|omgili|timpi|youbot/i;

/**
 * Tells whether a user agent string identifies a bot, crawler or automation
 * runtime rather than a human visitor.
 *
 * A missing or empty user agent is treated as a bot: every real browser sends
 * one, so its absence means a script or a forged request.
 *
 * @param userAgent - The raw `User-Agent` string (header or `navigator.userAgent`).
 * @returns `true` when the traffic must not be recorded.
 *
 * @example
 * isBotUserAgent('Mozilla/5.0 (compatible; Googlebot/2.1)'); // true
 * isBotUserAgent('Mozilla/5.0 (Macintosh) Chrome/120'); // false
 */
export const isBotUserAgent = (userAgent?: string | null): boolean => {
  if (!userAgent) return true;
  if (HUMAN_USER_AGENT_EXCEPTION_PATTERN.test(userAgent)) return false;

  return BOT_USER_AGENT_PATTERN.test(userAgent);
};

/**
 * Globals injected by automation runtimes. Their mere presence means the page
 * is driven by a script, whatever the user agent claims.
 */
const AUTOMATION_GLOBAL_KEYS = [
  '_phantom',
  '__nightmare',
  'callPhantom',
  '__selenium_unwrapped',
  '__webdriver_evaluate',
  '__driver_evaluate',
  'domAutomation',
  'Cypress',
] as const;

/**
 * Tells whether the current browser environment is automated, combining the
 * user agent with automation fingerprints (`navigator.webdriver`, runtime
 * globals) that headless browsers spoofing a normal user agent still expose.
 *
 * Always `false` outside a browser (SSR): there is nothing to collect there,
 * and the server must not disable a client that has not run yet.
 *
 * @returns `true` when analytics must stay off for this environment.
 *
 * @example
 * if (isBotEnvironment()) return; // never start the client for a crawler
 */
export const isBotEnvironment = (): boolean => {
  if (typeof navigator === 'undefined') return false;

  if (navigator.webdriver === true) return true;

  const automationGlobals = globalThis as unknown as Record<string, unknown>;
  if (AUTOMATION_GLOBAL_KEYS.some((key) => key in automationGlobals)) {
    return true;
  }

  // Unlike a server reading the `User-Agent` header, an absent user agent here
  // means a non-browser runtime (React Native, Lynx) — a real app, not a bot.
  if (!navigator.userAgent) return false;

  return isBotUserAgent(navigator.userAgent);
};
