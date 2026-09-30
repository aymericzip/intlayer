// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { ogImageHandlers } from './ogImageHandlers';
import { getOgImagePath } from './ogImagePath';

describe('getOgImagePath', () => {
  it('returns the bare route without params', () => {
    expect(getOgImagePath()).toBe('/api/og');
  });

  it('encodes title, description and locale', () => {
    const path = getOgImagePath({
      title: '国际化 | Intlayer',
      description: 'Guide',
      locale: 'zh',
    });
    const searchParams = new URL(path, 'https://example.com').searchParams;

    expect(searchParams.get('title')).toBe('国际化 | Intlayer');
    expect(searchParams.get('description')).toBe('Guide');
    expect(searchParams.get('locale')).toBe('zh');
  });

  it('drops the locale when there is no text to render', () => {
    expect(getOgImagePath({ locale: 'zh' })).toBe('/api/og');
  });
});

describe('ogImageHandlers', () => {
  it('renders a PNG for a GET request', async () => {
    const response = await ogImageHandlers.GET({
      request: new Request('https://example.com/api/og?title=Hello'),
    });

    expect(response.status).toBe(200);
    expect(response.headers.get('Content-Type')).toBe('image/png');
    expect((await response.arrayBuffer()).byteLength).toBeGreaterThan(10000);
  });

  it('answers HEAD without a body', async () => {
    const response = await ogImageHandlers.HEAD({
      request: new Request('https://example.com/api/og?title=Hello'),
    });

    expect(response.status).toBe(200);
    expect(response.body).toBeNull();
  });
});
