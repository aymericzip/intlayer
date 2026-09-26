import { describe, expect, it } from 'vitest';
import { getShowcaseSubmitUrl } from './getShowcaseSubmitUrl';

describe('getShowcaseSubmitUrl', () => {
  it('presets the site name and the page origin', () => {
    const submitUrl = new URL(
      getShowcaseSubmitUrl('https://acme.com/fr/about?tab=1', 'Acme Corp')
    );

    expect(submitUrl.origin).toBe('https://showcase.intlayer.org');
    expect(submitUrl.pathname).toBe('/submit');
    expect(submitUrl.searchParams.get('name')).toBe('Acme Corp');
    expect(submitUrl.searchParams.get('url')).toBe('https://acme.com');
  });

  it('falls back to the hostname without www when no site name', () => {
    const submitUrl = new URL(
      getShowcaseSubmitUrl('https://www.acme.com/page', '  ')
    );

    expect(submitUrl.searchParams.get('name')).toBe('acme.com');
  });
});
