import { IntlayerProvider } from 'react-intlayer';
import { Outlet } from 'react-router';

import { useI18nHTMLAttributes } from 'app/hooks/useI18nHTMLAttributes';

export default function RootLayout() {
  useI18nHTMLAttributes();

  return (
    <IntlayerProvider>
      <Outlet />
    </IntlayerProvider>
  );
}
