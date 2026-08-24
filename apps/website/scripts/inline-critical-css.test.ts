import { describe, expect, it } from 'vitest';
import { inlineStylesheetLinks } from './inline-critical-css.ts';

/** Serves a fixed set of stylesheets, and nothing else. */
const loaderFor =
  (stylesheets: Record<string, string>) =>
  async (href: string): Promise<string | null> =>
    stylesheets[href] ?? null;

describe('inlineStylesheetLinks', () => {
  it('replaces a local stylesheet link with its rules', async () => {
    const { html, inlinedHrefs } = await inlineStylesheetLinks(
      '<head><link rel="stylesheet" href="/assets/app.css"/></head>',
      loaderFor({ '/assets/app.css': '.a{color:red}' })
    );

    expect(html).toBe(
      '<head><style data-inlined-stylesheet="/assets/app.css">.a{color:red}</style></head>'
    );
    expect(inlinedHrefs).toEqual(['/assets/app.css']);
  });

  it('reads attributes split across lines and in any order', async () => {
    const { inlinedHrefs } = await inlineStylesheetLinks(
      '<link\n  rel="stylesheet"\n  href="/assets/app.css"\n/>',
      loaderFor({ '/assets/app.css': '.a{}' })
    );

    expect(inlinedHrefs).toEqual(['/assets/app.css']);
  });

  it('leaves links that are not stylesheets alone', async () => {
    const source =
      '<link rel="modulepreload" href="/assets/app.js"/><link rel="icon" href="/favicon.ico"/>';
    const { html, inlinedHrefs } = await inlineStylesheetLinks(
      source,
      loaderFor({ '/assets/app.js': 'not css' })
    );

    expect(html).toBe(source);
    expect(inlinedHrefs).toEqual([]);
  });

  it('leaves cross-origin stylesheets alone', async () => {
    const source = '<link rel="stylesheet" href="https://cdn.example/a.css"/>';
    const { html, unresolvedHrefs } = await inlineStylesheetLinks(
      source,
      loaderFor({})
    );

    expect(html).toBe(source);
    expect(unresolvedHrefs).toEqual([]);
  });

  it('keeps the link when the stylesheet cannot be read', async () => {
    const source = '<link rel="stylesheet" href="/assets/missing.css"/>';
    const { html, inlinedHrefs, unresolvedHrefs } = await inlineStylesheetLinks(
      source,
      loaderFor({})
    );

    expect(html).toBe(source);
    expect(inlinedHrefs).toEqual([]);
    expect(unresolvedHrefs).toEqual(['/assets/missing.css']);
  });

  it('inlines every stylesheet on a page', async () => {
    const { html, inlinedHrefs } = await inlineStylesheetLinks(
      '<link rel="stylesheet" href="/a.css"/><link rel="stylesheet" href="/b.css"/>',
      loaderFor({ '/a.css': '.a{}', '/b.css': '.b{}' })
    );

    expect(inlinedHrefs).toEqual(['/a.css', '/b.css']);
    expect(html).not.toContain('<link');
  });

  it('escapes a closing style tag hidden in a declaration', async () => {
    const { html } = await inlineStylesheetLinks(
      '<link rel="stylesheet" href="/a.css"/>',
      loaderFor({ '/a.css': '.a::after{content:"</style>"}' })
    );

    // Exactly one real closing tag: the one this step wrote.
    expect(html.match(/<\/style>/g)).toHaveLength(1);
    expect(html).toContain('content:"<\\/style>"');
  });

  it('treats replacement patterns in the CSS as literal text', async () => {
    const css = '.a::after{content:"$& $` $\' $1"}';
    const { html } = await inlineStylesheetLinks(
      '<link rel="stylesheet" href="/a.css"/>',
      loaderFor({ '/a.css': css })
    );

    expect(html).toBe(`<style data-inlined-stylesheet="/a.css">${css}</style>`);
  });

  it('leaves a page with no stylesheet untouched', async () => {
    const source = '<html><head><title>x</title></head></html>';
    const { html, inlinedHrefs } = await inlineStylesheetLinks(
      source,
      loaderFor({})
    );

    expect(html).toBe(source);
    expect(inlinedHrefs).toEqual([]);
  });
});
