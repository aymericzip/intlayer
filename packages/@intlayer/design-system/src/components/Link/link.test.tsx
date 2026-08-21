import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { Link } from './Link';

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
});
