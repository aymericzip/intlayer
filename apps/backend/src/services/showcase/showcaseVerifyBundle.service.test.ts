import { beforeEach, describe, expect, it, vi } from 'vitest';
import { verifyIntlayerBundle } from './showcaseVerifyBundle.service';

vi.mock('@logger', () => ({
  logger: {
    error: vi.fn(),
  },
}));

describe('verifyIntlayerBundle', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  it('verifies a URL with Intlayer metadata in HTML', async () => {
    (fetch as any).mockResolvedValue({
      ok: true,
      text: () =>
        Promise.resolve(
          '<html><script>var meta = { name: "Intlayer" };</script></html>'
        ),
    });

    const result = await verifyIntlayerBundle('https://example.com');
    expect(result).toBe(true);
  });

  it('verifies a URL with Intlayer metadata in a linked script', async () => {
    (fetch as any)
      .mockResolvedValueOnce({
        ok: true,
        text: () =>
          Promise.resolve('<html><script src="/bundle.js"></script></html>'),
      })
      .mockResolvedValueOnce({
        ok: true,
        text: () =>
          Promise.resolve(
            'var bundle = { name: "Intlayer", version: "1.0.0" };'
          ),
      });

    const result = await verifyIntlayerBundle('https://example.com');
    expect(result).toBe(true);
  });

  it('fails verification for a URL without Intlayer metadata', async () => {
    (fetch as any).mockResolvedValue({
      ok: true,
      text: () => Promise.resolve('<html><body>Hello World</body></html>'),
    });

    const result = await verifyIntlayerBundle('https://google.com');
    expect(result).toBe(false);
  });

  it('verifies the showcase bundle example', async () => {
    const bundleContent = `
      , Aj = {
        name: "Intlayer",
        version: "8.2.4",
        doc: "https://intlayer.org/docs"
    }
    `;
    (fetch as any)
      .mockResolvedValueOnce({
        ok: true,
        text: () =>
          Promise.resolve(
            '<html><script src="https://showcase.intlayer.org/_next/static/chunks/main.js"></script></html>'
          ),
      })
      .mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(bundleContent),
      });

    const result = await verifyIntlayerBundle('https://showcase.intlayer.org');
    expect(result).toBe(true);
  });

  it('handles relative script URLs correctly', async () => {
    (fetch as any)
      .mockResolvedValueOnce({
        ok: true,
        text: () =>
          Promise.resolve(
            '<html><script src="static/js/bundle.js"></script></html>'
          ),
      })
      .mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve('name:"Intlayer"'),
      });

    await verifyIntlayerBundle('https://example.com/app/');

    // Check if the script URL was resolved correctly
    expect(fetch).toHaveBeenNthCalledWith(
      2,
      'https://example.com/app/static/js/bundle.js',
      expect.objectContaining({
        headers: expect.objectContaining({
          'User-Agent': expect.any(String),
        }),
      })
    );
  });
});
