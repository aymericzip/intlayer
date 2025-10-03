import { useLocale } from 'react-intlayer';
import { type NavigateOptions, type To, useNavigate } from 'react-router';

import { locacalizeTo } from '~/components/localized-link';

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();
  const { locale } = useLocale();

  const localizedNavigate = (to: To, options?: NavigateOptions) => {
    const localedTo = locacalizeTo(to, locale);

    navigate(localedTo, options);
  };

  return localizedNavigate;
};
