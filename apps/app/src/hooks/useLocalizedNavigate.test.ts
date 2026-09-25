import { beforeEach, describe, expect, it, vi } from 'vitest';
import { LOCALE_ROUTE } from '#components/Link/Link';
import { useLocalizedNavigate } from './useLocalizedNavigate';

const mockNavigate = vi.fn();
let currentLocale = 'en';

vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock('react-intlayer', () => ({
  useLocale: () => ({ locale: currentLocale }),
}));

describe('useLocalizedNavigate', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    currentLocale = 'en';
  });

  it('navigates with LOCALE_ROUTE prefix when passed a plain string path', () => {
    const navigate = useLocalizedNavigate();
    navigate('/dashboard');

    expect(mockNavigate).toHaveBeenCalledWith({
      params: { locale: undefined },
      to: `/${LOCALE_ROUTE}/dashboard`,
    });
  });

  it('navigates to root LOCALE_ROUTE when passed root /', () => {
    const navigate = useLocalizedNavigate();
    navigate('/');

    expect(mockNavigate).toHaveBeenCalledWith({
      params: { locale: undefined },
      to: `/${LOCALE_ROUTE}`,
    });
  });

  it('strips existing locale using getPathWithoutLocale', () => {
    currentLocale = 'fr';
    const navigate = useLocalizedNavigate();
    navigate('/es/dashboard');

    expect(mockNavigate).toHaveBeenCalledWith({
      params: { locale: 'fr' },
      to: `/${LOCALE_ROUTE}/dashboard`,
    });
  });

  it('strips LOCALE_ROUTE prefix if already present', () => {
    currentLocale = 'fr';
    const navigate = useLocalizedNavigate();
    navigate(`/${LOCALE_ROUTE}/dashboard`);

    expect(mockNavigate).toHaveBeenCalledWith({
      params: { locale: 'fr' },
      to: `/${LOCALE_ROUTE}/dashboard`,
    });
  });

  it('preserves existing params and options when passing an object', () => {
    currentLocale = 'fr';
    const navigate = useLocalizedNavigate();
    navigate({
      to: '/projects',
      search: { page: 2 },
      replace: true,
      params: { customId: '123' },
    });

    expect(mockNavigate).toHaveBeenCalledWith({
      to: `/${LOCALE_ROUTE}/projects`,
      params: {
        locale: 'fr',
        customId: '123',
      },
      search: { page: 2 },
      replace: true,
    });
  });
});
