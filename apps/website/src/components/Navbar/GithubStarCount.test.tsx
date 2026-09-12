import { renderToStaticMarkup } from 'react-dom/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { GithubStarCount } from './GithubStarCount';

const fixture = vi.hoisted(() => ({
  stars: 828 as number | null,
  locale: 'en',
}));

vi.mock('@tanstack/react-router', () => ({
  getRouteApi: () => ({
    useLoaderData: () => ({ githubStars: fixture.stars }),
  }),
}));

vi.mock('./useRevalidatedGithubStars', () => ({
  useRevalidatedGithubStars: (stars: number | null) => stars,
}));

vi.mock('react-intlayer/format', () => ({
  useNumber: () => (value: number, options: Intl.NumberFormatOptions) =>
    new Intl.NumberFormat(fixture.locale, options).format(value),
}));

beforeEach(() => {
  fixture.stars = 828;
  fixture.locale = 'en';
});

describe('GithubStarCount server rendering', () => {
  it('does not flash the final count or zero before animation starts', () => {
    const markup = renderToStaticMarkup(<GithubStarCount />);

    expect(markup).toMatch(/class="absolute[^"]*" aria-hidden="true"><\/span>/);
    expect(markup).toContain('<span class="sr-only">828</span>');
    expect(markup).toMatch(
      /class="invisible [^"]*motion-reduce:visible" aria-hidden="true">828<\/span>/
    );
  });

  it('renders nothing when the count is unavailable', () => {
    fixture.stars = null;

    expect(renderToStaticMarkup(<GithubStarCount />)).toBe('');
  });

  it('treats zero as an available count', () => {
    fixture.stars = 0;

    expect(renderToStaticMarkup(<GithubStarCount />)).toContain(
      '<span class="sr-only">0</span>'
    );
  });

  it('reserves room for intermediate digits when the target is compact', () => {
    fixture.stars = 1000;
    const markup = renderToStaticMarkup(<GithubStarCount />);

    expect(markup).toContain('<span class="sr-only">1K</span>');
    expect(markup).toMatch(
      /class="invisible [^"]*" aria-hidden="true">1000<\/span>/
    );
  });

  it.each(['en', 'fr', 'ar'])('keeps compact formatting in %s', (locale) => {
    fixture.stars = 1250;
    fixture.locale = locale;
    const formatted = new Intl.NumberFormat(locale, {
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(1250);

    expect(renderToStaticMarkup(<GithubStarCount />)).toContain(
      `<span class="sr-only">${formatted}</span>`
    );
  });
});
