import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { Link } from './Link';

// Mock the configuration to avoid esbuild issues
vi.mock('@intlayer/config/built', () => ({
  default: {
    internationalization: {
      defaultLocale: 'en',
      locales: ['en', 'fr', 'es'],
    },
  },
}));

// Mock the getLocalizedUrl function from @intlayer/core
vi.mock('@intlayer/core', () => ({
  getLocalizedUrl: vi.fn((url, locale) => `/${locale}${url}`),
}));

describe('Link', () => {
  test('renders', () => {
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
});
