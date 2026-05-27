/** @jsxImportSource react */

import { TMSLandingPage } from '@components/TMSLandingPage';
import type { LocalesValues } from 'intlayer';
import type { FC } from 'react';
import { WebsiteIslandWrapper } from './WebsiteIslandWrapper';

export const TMSIsland: FC<{ locale: LocalesValues }> = ({ locale }) => (
  <WebsiteIslandWrapper locale={locale}>
    <TMSLandingPage />
  </WebsiteIslandWrapper>
);
