import { useLocale } from 'react-intlayer';
import { Navigate } from 'react-router';

export default function Page() {
  const { locale } = useLocale();

  return <Navigate replace to={locale} />;
}
