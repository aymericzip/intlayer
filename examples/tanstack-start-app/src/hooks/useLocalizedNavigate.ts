// eslint-disable-next-line no-restricted-imports
import { NavigateOptions, useNavigate } from '@tanstack/react-router';
import { getLocalizedUrl } from 'intlayer';
import { useLocale } from 'react-intlayer';

type LocalizedNavigateOptions = {
  to: string;
} & Omit<NavigateOptions, 'to'>;

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();
  const { locale } = useLocale();

  const isExternal = (to: string) => {
    return /^(https?:)?\/\//.test(to);
  };

  const localizedNavigate = (options: LocalizedNavigateOptions) => {
    const to = isExternal(options.to)
      ? options.to
      : getLocalizedUrl(options.to, locale);

    navigate({ ...options, to: to as NavigateOptions['to'] });
  };

  return localizedNavigate;
};
