/** @jsxImportSource react */

import { CMSLandingPage } from '@components/CMSLandingPage';
import type { LocalesValues } from 'intlayer';
import type { FC } from 'react';
import { WebsiteIslandWrapper } from './WebsiteIslandWrapper';

export const CMSIsland: FC<{ locale: LocalesValues }> = ({ locale }) => (
  <WebsiteIslandWrapper locale={locale}>
    <CMSLandingPage />
  </WebsiteIslandWrapper>
);
