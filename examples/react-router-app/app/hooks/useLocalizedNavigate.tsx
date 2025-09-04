import { getLocalizedUrl } from 'intlayer';
import { useLocale } from 'react-intlayer';
// eslint-disable-next-line no-restricted-imports
import { useNavigate, type NavigateOptions } from 'react-router';

export function useLocalizedNavigate() {
  const navigate = useNavigate();
  const { locale } = useLocale();

  return (to: string, options?: NavigateOptions) => {
    const final = to.startsWith('/') ? getLocalizedUrl(to, locale) : to;
    navigate(final, options);
  };
}
