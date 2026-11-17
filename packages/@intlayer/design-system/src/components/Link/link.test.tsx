import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import {
  checkIsExternalLink,
  checkIsRelativeLink,
  isModifiedClick,
  Link,
  withDefaultParams,
} from './Link';

// Mock the getLocalizedUrl function from @intlayer/core
vi.mock('@intlayer/core/localization', () => ({
  getLocalizedUrl: vi.fn((url, locale) => `/${locale}${url}`),
}));

describe('Link', () => {
  test.skip('renders', () => {
    const linkContent = "I'm a link";
    const linkLabel = 'test label';

    render(
      <Link label={linkLabel} data-testid="link">
        {linkContent}
      </Link>
    );

    const linkByTestID = screen.getByTestId('link');
    const linkByText = screen.getByText(linkContent);

    expect(linkByTestID).toBeDefined();
    expect(linkByText).toBeDefined();

    const labelResult = linkByTestID.getAttribute('aria-label');

    expect(labelResult).toBe(linkLabel);
  });

  describe('rel and target on external links', () => {
    test('adds the full safety and SEO rel to external links', () => {
      render(
        <Link
          label="external"
          data-testid="link"
          href="https://www.happy-milo.com/fr"
        >
          Visit
        </Link>
      );

      const link = screen.getByTestId('link');

      expect(link.getAttribute('rel')).toBe('noopener noreferrer nofollow');
      expect(link.getAttribute('target')).toBe('_blank');
    });

    test('ignores a caller rel that would strip nofollow from an external link', () => {
      render(
        <Link
          label="external"
          data-testid="link"
          href="https://www.happy-milo.com/fr"
          rel="noopener noreferrer"
        >
          Visit
        </Link>
      );

      expect(screen.getByTestId('link').getAttribute('rel')).toBe(
        'noopener noreferrer nofollow'
      );
    });

    test('treats isExternalLink as an explicit override', () => {
      render(
        <Link label="external" data-testid="link" href="/about" isExternalLink>
          Visit
        </Link>
      );

      expect(screen.getByTestId('link').getAttribute('rel')).toBe(
        'noopener noreferrer nofollow'
      );
    });

    test('leaves internal links free of rel and keeps a caller rel', () => {
      render(
        <Link label="internal" data-testid="link" href="/about">
          About
        </Link>
      );

      const link = screen.getByTestId('link');

      expect(link.getAttribute('rel')).toBeNull();
      expect(link.getAttribute('target')).toBe('_self');
    });

    test('treats a malformed absolute URL as external without throwing', () => {
      // A bare URL autolinked from doc markdown can carry trailing text
      // (e.g. CJK punctuation), producing a value `new URL()` rejects.
      const malformedHref = "http://localhost:8000'입니다";

      expect(() =>
        checkIsExternalLink({ href: malformedHref }, 'https://intlayer.org')
      ).not.toThrow();
      expect(
        checkIsExternalLink({ href: malformedHref }, 'https://intlayer.org')
      ).toBe(true);
    });

    test('preserves a caller rel and target on internal links', () => {
      render(
        <Link
          label="internal"
          data-testid="link"
          href="/about"
          rel="me"
          target="_parent"
        >
          About
        </Link>
      );

      const link = screen.getByTestId('link');

      expect(link.getAttribute('rel')).toBe('me');
      expect(link.getAttribute('target')).toBe('_parent');
    });
  });

  describe('hoverable variant', () => {
    test('stays a block so its hover background covers block children', () => {
      render(
        <Link
          label="hoverable"
          data-testid="link"
          href="/about"
          variant="hoverable"
        >
          <div>Row content</div>
        </Link>
      );

      expect(screen.getByTestId('link').className).toContain('block');
    });
  });
});

describe('checkIsRelativeLink', () => {
  test.each(['.', '..', './guide', '../guide', '?tab=1', '#faq'])(
    'treats %s as relative',
    (href) => {
      expect(checkIsRelativeLink(href)).toBe(true);
    }
  );

  test.each(['/', '/about', 'https://intlayer.org', '.well-known', undefined])(
    'treats %s as not relative',
    (href) => {
      expect(checkIsRelativeLink(href)).toBe(false);
    }
  );
});

describe('isModifiedClick', () => {
  const noModifier = {
    altKey: false,
    ctrlKey: false,
    metaKey: false,
    shiftKey: false,
  };

  test('is false for a plain click', () => {
    expect(isModifiedClick(noModifier)).toBe(false);
  });

  test.each(['altKey', 'ctrlKey', 'metaKey', 'shiftKey'] as const)(
    'is true when %s is pressed',
    (key) => {
      expect(isModifiedClick({ ...noModifier, [key]: true })).toBe(true);
    }
  );
});

describe('withDefaultParams', () => {
  test('applies defaults under object params', () => {
    expect(withDefaultParams({ locale: 'fr' }, { id: '1' })).toEqual({
      locale: 'fr',
      id: '1',
    });
    expect(withDefaultParams({ locale: 'fr' }, { locale: 'es' })).toEqual({
      locale: 'es',
    });
  });

  test('returns the defaults for missing or non-object params', () => {
    expect(withDefaultParams({ locale: 'fr' }, undefined)).toEqual({
      locale: 'fr',
    });
    expect(withDefaultParams({ locale: 'fr' }, true)).toEqual({
      locale: 'fr',
    });
  });

  test('keeps the reducer form and merges its result over the defaults', () => {
    const params = withDefaultParams({ locale: 'fr' }, (previous: object) => ({
      ...previous,
      postId: '9',
    }));

    expect(typeof params).toBe('function');
    expect(
      (params as (previous: object) => object)({ section: 'blog' })
    ).toEqual({ locale: 'fr', section: 'blog', postId: '9' });
  });
});

describe('Link with relative href', () => {
  test.each(['#faq', '?tab=1', '.'])('does not localize %s', (href) => {
    render(
      <Link label="relative" href={href} locale="fr" data-testid="link">
        Relative
      </Link>
    );

    expect(screen.getByTestId('link').getAttribute('href')).toBe(href);
  });
});
