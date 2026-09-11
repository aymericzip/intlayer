import { describe, expect, it } from 'vitest';
import { generateOgImage } from './generateOgImage';

describe('generateOgImage', () => {
  it('generates a PNG with the default title', async () => {
    const buffer = await generateOgImage();
    expect(buffer.byteLength).toBeGreaterThan(10000);

    // PNG signature check: 0x89 0x50 0x4E 0x47
    const header = new Uint8Array(buffer.slice(0, 4));
    expect(header[0]).toBe(0x89);
    expect(header[1]).toBe(0x50);
    expect(header[2]).toBe(0x4e);
    expect(header[3]).toBe(0x47);
  });

  it('generates an OG image with custom title and description', async () => {
    const buffer = await generateOgImage({
      title: 'Per-component i18n for React, Next.js, Vue, Svelte | Intlayer',
      description:
        'Boost your app scalability with Intlayer: an internationalization (i18n) and content management solution powered by AI.',
    });
    expect(buffer.byteLength).toBeGreaterThan(10000);
  });

  it('renders the title text, not only the background', async () => {
    // The background alone is a fixed JPEG, so the same title must yield a
    // stable image while a different title must change the pixels.
    const [first, second, other] = await Promise.all([
      generateOgImage({ title: 'Alpha' }),
      generateOgImage({ title: 'Alpha' }),
      generateOgImage({ title: 'Omega' }),
    ]);
    expect(Buffer.from(first).equals(Buffer.from(second))).toBe(true);
    expect(Buffer.from(first).equals(Buffer.from(other))).toBe(false);
  });
});
