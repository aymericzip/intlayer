import { findFieldDeclaration } from '@intlayer/lsp/utils';
import { describe, expect, it, vi } from 'vitest';
import { getCmsDictionaryUrl } from './cmsDictionaryUrl';
import { renderRemoteDictionaryDocument } from './remoteDictionaryDocument';

vi.mock('vscode', () => ({ Uri: { from: vi.fn() } }));

describe('getCmsDictionaryUrl', () => {
  it('joins the CMS URL and the encoded key', () => {
    expect(
      getCmsDictionaryUrl('https://app.intlayer.org/', 'hero section')
    ).toBe('https://app.intlayer.org/dictionary/hero%20section');
  });
});

describe('renderRemoteDictionaryDocument', () => {
  const text = renderRemoteDictionaryDocument(
    {
      key: 'hero-section',
      content: {
        title: { nodeType: 'translation', translation: { en: 'Hi' } },
      },
    },
    'https://app.intlayer.org'
  );

  it('links the CMS page', () => {
    expect(JSON.parse(text).cmsUrl).toBe(
      'https://app.intlayer.org/dictionary/hero-section'
    );
  });

  it('lets findFieldDeclaration locate the fields', () => {
    const span = findFieldDeclaration(
      text,
      'hero-section.content.json',
      'hero-section',
      ['title']
    );

    expect(span && text.slice(span.start, span.end)).toBe('"title"');
  });
});
