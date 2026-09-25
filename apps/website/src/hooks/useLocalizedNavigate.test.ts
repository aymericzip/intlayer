import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useLocalizedNavigate } from './useLocalizedNavigate';

const mockNavigate = vi.fn();
let currentLocale = 'en';

vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock('react-intlayer', () => ({
  useLocale: () => ({ locale: currentLocale }),
}));

vi.mock('@intlayer/core/localization', async (importOriginal) => {
  let actual: any;
  if (typeof importOriginal === 'function') {
    actual = await importOriginal();
  } else if (typeof vi.importActual === 'function') {
    actual = await vi.importActual('@intlayer/core/localization');
  } else {
    actual = await import('@intlayer/core/localization');
  }
  return {
    ...actual,
    getLocalizedUrl: (url: string, locale: string) =>
      locale === 'en' ? url : `/${locale}${url}`,
  };
});

describe('useLocalizedNavigate', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    currentLocale = 'en';
  });

  it('navigates with localized URL when passed a string path', () => {
    const navigate = useLocalizedNavigate();
    navigate('/doc/concept/cli');

    expect(mockNavigate).toHaveBeenCalledWith({
      to: '/doc/concept/cli',
    });
  });

  it('localizes path with current non-default locale', () => {
    currentLocale = 'fr';
    const navigate = useLocalizedNavigate();
    navigate('/doc/concept/cli');

    expect(mockNavigate).toHaveBeenCalledWith({
      to: '/fr/doc/concept/cli',
    });
  });

  it('strips LOCALE_ROUTE prefix before localizing', () => {
    currentLocale = 'es';
    const navigate = useLocalizedNavigate();
    navigate('/{-$locale}/demo');

    expect(mockNavigate).toHaveBeenCalledWith({
      to: '/es/demo',
    });
  });

  it('strips existing locale prefix before localizing', () => {
    currentLocale = 'es';
    const navigate = useLocalizedNavigate();
    navigate('/fr/doc/concept/cli');

    expect(mockNavigate).toHaveBeenCalledWith({
      to: '/es/doc/concept/cli',
    });
  });

  it('preserves search and extra options when passing an object', () => {
    currentLocale = 'de';
    const navigate = useLocalizedNavigate();
    navigate({
      to: '/i18n-seo-scanner',
      search: { url: 'https://example.com' },
      replace: true,
    });

    expect(mockNavigate).toHaveBeenCalledWith({
      to: '/de/i18n-seo-scanner',
      search: { url: 'https://example.com' },
      replace: true,
    });
  });
});
