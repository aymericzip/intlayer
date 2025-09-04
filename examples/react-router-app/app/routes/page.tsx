import { useEffect } from 'react';
import { useLocale } from 'react-intlayer';
// eslint-disable-next-line no-restricted-imports
import { useNavigate } from 'react-router';

export default function Page() {
  const { locale } = useLocale();
  const navigate = useNavigate();

  useEffect(() => {
    navigate(locale, { replace: true });
  }, [locale, navigate]);

  return null;
}
