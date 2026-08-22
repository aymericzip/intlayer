// @vitest-environment node

import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, test } from 'vitest';
import { ThemeProvider } from './ThemeProvider';

describe('ThemeProvider server rendering', () => {
  test('inlines the bootstrap with the storage key it was given', () => {
    const markup = renderToStaticMarkup(
      <ThemeProvider storageKey="intlayer-theme">
        <div />
      </ThemeProvider>
    );

    expect(markup).toContain('<script');
    expect(markup).toContain('"intlayer-theme"');
    expect(markup).toContain('"data-theme"');
  });

  test('carries the CSP nonce, so the bootstrap survives script-src', () => {
    const markup = renderToStaticMarkup(
      <ThemeProvider nonce="test-nonce">
        <div />
      </ThemeProvider>
    );

    expect(markup).toContain('nonce="test-nonce"');
  });

  test('emits no nonce attribute when none is given', () => {
    const markup = renderToStaticMarkup(
      <ThemeProvider>
        <div />
      </ThemeProvider>
    );

    expect(markup).not.toContain('nonce=');
  });
});
