import { afterEach, describe, expect, it, vi } from 'vitest';
import { isBotEnvironment, isBotUserAgent } from './isBot';

/** Replaces `navigator` for the duration of one test. */
const stubNavigator = (navigatorLike: Partial<Navigator>): void => {
  vi.stubGlobal('navigator', navigatorLike as Navigator);
};

const CHROME_USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

describe('isBotUserAgent', () => {
  it('accepts real browser user agents', () => {
    const humanUserAgents = [
      CHROME_USER_AGENT,
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36 Edg/121.0.0.0',
      'Mozilla/5.0 (X11; Linux x86_64; rv:122.0) Gecko/20100101 Firefox/122.0',
    ];

    for (const userAgent of humanUserAgents) {
      expect(isBotUserAgent(userAgent)).toBe(false);
    }
  });

  it('rejects search-engine and SEO crawlers', () => {
    const crawlerUserAgents = [
      'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
      'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)',
      'Mozilla/5.0 (compatible; YandexBot/3.0)',
      'Mozilla/5.0 (compatible; Baiduspider/2.0)',
      'Mozilla/5.0 (compatible; AhrefsBot/7.0)',
      'Mozilla/5.0 (compatible; SemrushBot/7~bl)',
    ];

    for (const userAgent of crawlerUserAgents) {
      expect(isBotUserAgent(userAgent)).toBe(true);
    }
  });

  it('rejects AI crawlers and agents', () => {
    const aiUserAgents = [
      'Mozilla/5.0 (compatible; GPTBot/1.1; +https://openai.com/gptbot)',
      'Mozilla/5.0 (compatible; ClaudeBot/1.0)',
      'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ChatGPT-User/1.0',
      'Mozilla/5.0 (compatible; PerplexityBot/1.0)',
      'Mozilla/5.0 (compatible; CCBot/2.0)',
      'meta-externalagent/1.1',
    ];

    for (const userAgent of aiUserAgents) {
      expect(isBotUserAgent(userAgent)).toBe(true);
    }
  });

  it('rejects link-preview fetchers, monitors and scripted clients', () => {
    const scriptedUserAgents = [
      'facebookexternalhit/1.1',
      'Mozilla/5.0 (compatible; Discordbot/2.0)',
      'Slackbot-LinkExpanding 1.0',
      'curl/8.4.0',
      'Wget/1.21.4',
      'python-requests/2.31.0',
      'Go-http-client/2.0',
      'axios/1.6.7',
      'Pingdom.com_bot_version_1.4',
    ];

    for (const userAgent of scriptedUserAgents) {
      expect(isBotUserAgent(userAgent)).toBe(true);
    }
  });

  it('rejects headless and automation runtimes', () => {
    const automationUserAgents = [
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/120.0.0.0 Safari/537.36',
      'Mozilla/5.0 (Macintosh) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36 Chrome-Lighthouse',
      'Mozilla/5.0 (X11; Linux x86_64) PhantomJS/2.1.1',
    ];

    for (const userAgent of automationUserAgents) {
      expect(isBotUserAgent(userAgent)).toBe(true);
    }
  });

  it('treats a missing or empty user agent as a bot', () => {
    expect(isBotUserAgent(undefined)).toBe(true);
    expect(isBotUserAgent(null)).toBe(true);
    expect(isBotUserAgent('')).toBe(true);
  });

  it('does not flag real devices whose model contains a bot-looking token', () => {
    expect(
      isBotUserAgent(
        'Mozilla/5.0 (Linux; Android 10; CUBOT_X19) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36'
      )
    ).toBe(false);
  });
});

describe('isBotEnvironment', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('allows a normal browser session', () => {
    stubNavigator({ userAgent: CHROME_USER_AGENT, webdriver: false });
    expect(isBotEnvironment()).toBe(false);
  });

  it('detects a crawler by user agent', () => {
    stubNavigator({
      userAgent: 'Mozilla/5.0 (compatible; Googlebot/2.1)',
      webdriver: false,
    });
    expect(isBotEnvironment()).toBe(true);
  });

  it('detects automation spoofing a browser user agent via navigator.webdriver', () => {
    stubNavigator({ userAgent: CHROME_USER_AGENT, webdriver: true });
    expect(isBotEnvironment()).toBe(true);
  });

  it('detects automation runtime globals', () => {
    stubNavigator({ userAgent: CHROME_USER_AGENT, webdriver: false });
    vi.stubGlobal('_phantom', {});
    expect(isBotEnvironment()).toBe(true);
  });

  it('allows native runtimes that expose no user agent', () => {
    stubNavigator({ product: 'ReactNative' } as Partial<Navigator>);
    expect(isBotEnvironment()).toBe(false);
  });

  it('stays disabled outside a browser', () => {
    vi.stubGlobal('navigator', undefined);
    expect(isBotEnvironment()).toBe(false);
  });
});
