import { describe, expect, it } from 'vitest';
import { AI_BOT_USER_AGENTS, buildRobotsTxt } from './buildRobotsTxt';

describe('buildRobotsTxt', () => {
  const robotsTxt = buildRobotsTxt({
    disallowedPaths: ['/404', '/fr/404', '/404'],
    sitemapUrl: 'https://intlayer.org/sitemap.xml',
    trailingLines: ['# Agentmap: https://intlayer.org/x'],
  });
  const lines = robotsTxt.split('\n');

  it('emits Content-Signal as a real directive granting every signal', () => {
    expect(lines).toContain(
      'Content-Signal: search=yes, ai-input=yes, ai-train=yes'
    );
    expect(robotsTxt).not.toContain('# Content-Signal');
  });

  it('places Content-Signal inside the user-agent group', () => {
    const lastUserAgentIndex = lines.lastIndexOf('User-agent: *');
    const signalIndex = lines.findIndex((line) =>
      line.startsWith('Content-Signal:')
    );

    expect(signalIndex).toBe(lastUserAgentIndex + 1);
    expect(lines[signalIndex + 1]).toBe('Allow: /');
  });

  it('names every AI bot in the shared group', () => {
    for (const userAgent of AI_BOT_USER_AGENTS) {
      expect(lines).toContain(`User-agent: ${userAgent}`);
    }
  });

  it('deduplicates disallowed paths and keeps trailing lines last', () => {
    expect(lines.filter((line) => line === 'Disallow: /404')).toHaveLength(1);
    expect(lines).toContain('Sitemap: https://intlayer.org/sitemap.xml');
    expect(robotsTxt.endsWith('# Agentmap: https://intlayer.org/x\n')).toBe(
      true
    );
  });

  it('honours withdrawn signals', () => {
    expect(
      buildRobotsTxt({
        disallowedPaths: [],
        sitemapUrl: 'https://intlayer.org/sitemap.xml',
        contentSignals: { search: 'yes', 'ai-input': 'yes', 'ai-train': 'no' },
      })
    ).toContain('Content-Signal: search=yes, ai-input=yes, ai-train=no');
  });
});
