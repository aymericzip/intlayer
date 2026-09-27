import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

vi.mock('react-intlayer', () => ({ useIntlayer: () => ({}) }));

const { collectFrameworkLogoKeys, FrameworkLogoReference } = await import(
  './index'
);

describe('collectFrameworkLogoKeys', () => {
  it('collects each logo once across the whole tree', () => {
    const logoKeys = collectFrameworkLogoKeys({
      nextjs: {
        frameworks: ['nextjs', 'react'],
        subSections: {
          pages: { frameworks: ['nextjs'] },
          vanilla: { frameworks: ['js'] },
          plain: { frameworks: ['vanilla'] },
        },
      },
      concepts: { frameworks: ['all'] },
    });

    expect(logoKeys).toEqual(['nextjs', 'react', 'js']);
  });
});

describe('FrameworkLogoReference', () => {
  it('references the sprite symbol instead of inlining the logo', () => {
    const markup = renderToStaticMarkup(
      <FrameworkLogoReference logoKey="nest" className="size-3.5" />
    );

    expect(markup).toContain('href="#framework-logo-nestjs"');
    expect(markup).toContain('aria-hidden="true"');
    expect(markup).not.toContain('<path');
  });

  it('renders nothing for an unknown logo key', () => {
    expect(
      renderToStaticMarkup(<FrameworkLogoReference logoKey={undefined} />)
    ).toBe('');
  });
});
