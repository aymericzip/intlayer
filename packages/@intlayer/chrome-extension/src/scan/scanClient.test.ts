import { afterEach, describe, expect, it, vi } from 'vitest';
import type { PageDetectionResult } from '../detector/types';
import { reportHostDetection } from './scanClient';

const detection = {
  url: 'https://example.com/fr',
  title: 'Exemple',
  routing: {
    strategy: 'prefix-no-default',
    confidence: 'high',
    locales: ['en', 'fr', 'x-default'],
    evidence: 'hreflang alternates',
  },
  technologies: [
    {
      id: 'nextjs',
      name: 'Next.js',
      category: 'framework',
      version: '15.1.0',
      evidence: '',
    },
    { id: 'crowdin', name: 'Crowdin', category: 'tms', evidence: '' },
  ],
} as unknown as PageDetectionResult;

describe('reportHostDetection', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('posts the detected stack without cookies', async () => {
    const fetchMock = vi.fn(async () => new Response('{}'));
    vi.stubGlobal('fetch', fetchMock);

    await reportHostDetection({ detection, backendUrl: 'https://back.test' });

    const [url, init] = fetchMock.mock.calls[0] as unknown as [
      string,
      RequestInit,
    ];
    expect(url).toBe('https://back.test/api/scan/hosts/detections');
    expect(init.credentials).toBe('omit');
    expect(JSON.parse(init.body as string)).toEqual({
      url: 'https://example.com/fr',
      technologies: [{ id: 'nextjs', version: '15.1.0' }, { id: 'crowdin' }],
      routingStrategy: 'prefix-no-default',
      locales: ['en', 'fr'],
      title: 'Exemple',
    });
  });

  it('never throws when the backend is unreachable', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => {
        throw new TypeError('Failed to fetch');
      })
    );

    await expect(reportHostDetection({ detection })).resolves.toBeUndefined();
  });
});
