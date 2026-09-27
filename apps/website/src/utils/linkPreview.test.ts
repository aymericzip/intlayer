import { describe, expect, it } from 'vitest';
import { parseLinkPreview } from './linkPreview';

const PAGE_URL = 'https://marketplace.visualstudio.com/items?itemName=intlayer';

describe('parseLinkPreview', () => {
  it('reads the Open Graph tags', () => {
    const html = `<html><head>
      <title>Fallback</title>
      <meta property="og:title" content="Intlayer &amp; VS Code" />
      <meta property="og:description" content='Autocomplete &#39;keys&#39;' />
      <meta property="og:image" content="/assets/og.png" />
      <meta property="og:site_name" content="Visual Studio Marketplace" />
      <link rel="shortcut icon" href="/favicon.ico" />
    </head></html>`;

    expect(parseLinkPreview(html, PAGE_URL)).toEqual({
      url: PAGE_URL,
      title: 'Intlayer & VS Code',
      description: "Autocomplete 'keys'",
      image: 'https://marketplace.visualstudio.com/assets/og.png',
      siteName: 'Visual Studio Marketplace',
      favicon: 'https://marketplace.visualstudio.com/favicon.ico',
    });
  });

  it('falls back to twitter tags, <title> and meta description', () => {
    const html = `<head>
      <title>Page title</title>
      <meta name="description" content="Plain description">
      <meta name="twitter:image" content="https://cdn.example.com/card.jpg">
    </head>`;

    expect(parseLinkPreview(html, PAGE_URL)).toMatchObject({
      title: 'Page title',
      description: 'Plain description',
      image: 'https://cdn.example.com/card.jpg',
    });
  });

  it('keeps the first declaration and drops non-http images', () => {
    const html = `<head>
      <meta property="og:title" content="First">
      <meta property="og:title" content="Second">
      <meta property="og:image" content="javascript:alert(1)">
    </head>`;

    const preview = parseLinkPreview(html, PAGE_URL);

    expect(preview.title).toBe('First');
    expect(preview.image).toBeUndefined();
  });

  it('returns only the url for a page without metadata', () => {
    expect(parseLinkPreview('<html></html>', PAGE_URL)).toEqual({
      url: PAGE_URL,
      title: undefined,
      description: undefined,
      image: undefined,
      siteName: undefined,
      favicon: undefined,
    });
  });
});
