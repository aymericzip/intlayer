import type { FastifyRequest } from 'fastify';
import { describe, expect, it } from 'vitest';
import { isBotRequest, isBotUserAgent } from './isBotRequest';

/** Minimal request stub carrying only the header the filter reads. */
const requestWithUserAgent = (userAgent?: string | string[]): FastifyRequest =>
  ({ headers: { 'user-agent': userAgent } }) as unknown as FastifyRequest;

const CHROME_USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

describe('isBotUserAgent', () => {
  it('accepts real browser user agents', () => {
    expect(isBotUserAgent(CHROME_USER_AGENT)).toBe(false);
    expect(
      isBotUserAgent(
        'Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1'
      )
    ).toBe(false);
  });

  it('rejects crawlers, AI agents and scripted clients', () => {
    const botUserAgents = [
      'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
      'Mozilla/5.0 (compatible; GPTBot/1.1)',
      'Mozilla/5.0 (compatible; ClaudeBot/1.0)',
      'facebookexternalhit/1.1',
      'curl/8.4.0',
      'python-requests/2.31.0',
      'Mozilla/5.0 (X11; Linux x86_64) HeadlessChrome/120.0.0.0 Safari/537.36',
    ];

    for (const userAgent of botUserAgents) {
      expect(isBotUserAgent(userAgent)).toBe(true);
    }
  });

  it('treats a missing user agent as a bot', () => {
    expect(isBotUserAgent(undefined)).toBe(true);
    expect(isBotUserAgent('')).toBe(true);
  });

  it('does not flag devices whose model contains a bot-looking token', () => {
    expect(
      isBotUserAgent(
        'Mozilla/5.0 (Linux; Android 10; CUBOT_X19) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36'
      )
    ).toBe(false);
  });
});

describe('isBotRequest', () => {
  it('reads the user agent from the request headers', () => {
    expect(isBotRequest(requestWithUserAgent(CHROME_USER_AGENT))).toBe(false);
    expect(
      isBotRequest(
        requestWithUserAgent('Mozilla/5.0 (compatible; bingbot/2.0)')
      )
    ).toBe(true);
  });

  it('uses the first value when the header is repeated', () => {
    expect(
      isBotRequest(requestWithUserAgent(['curl/8.4.0', CHROME_USER_AGENT]))
    ).toBe(true);
  });

  it('rejects a request without a user agent', () => {
    expect(isBotRequest(requestWithUserAgent(undefined))).toBe(true);
  });
});
