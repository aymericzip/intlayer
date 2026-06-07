import type { FC, PropsWithChildren } from 'react';
import { AppProviders } from '@/providers/AppProviders';
import NotFoundLayoutBase from '../[locale]/(landing)/[...not-found]/layout';

import '@/globals.css';
import '@/shiki.css';

const NotFoundRootLayout: FC<PropsWithChildren> = ({ children }) => (
  <html lang="en">
    <body>
      <AppProviders>
        <NotFoundLayoutBase>{children}</NotFoundLayoutBase>
      </AppProviders>
    </body>
  </html>
);

export default NotFoundRootLayout;
