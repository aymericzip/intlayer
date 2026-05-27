/** @jsxImportSource react */

import { LandingPage as LandingPageContent } from '@components/LandingPage';
import { ProductHeader } from '@structuredData/ProductHeader';
import { SoftwareApplicationHeader } from '@structuredData/SoftwareApplication';
import { WebsiteHeader } from '@structuredData/WebsiteHeader';
import type { LocalesValues } from 'intlayer';
import type { FC } from 'react';
import { WebsiteIslandWrapper } from './WebsiteIslandWrapper';

export const LandingIsland: FC<{ locale: LocalesValues }> = ({ locale }) => (
  <WebsiteIslandWrapper locale={locale} mobileRollable={false}>
    <WebsiteHeader />
    <SoftwareApplicationHeader />
    <ProductHeader />
    <LandingPageContent />
  </WebsiteIslandWrapper>
);
