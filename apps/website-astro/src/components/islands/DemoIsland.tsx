/** @jsxImportSource react */

import { BackgroundLayout } from '@components/BackgroundLayout';
import { DemoPage } from '@components/DemoPage';
import type { LocalesValues } from 'intlayer';
import type { FC } from 'react';
import { WebsiteIslandWrapper } from './WebsiteIslandWrapper';

export const DemoIsland: FC<{ locale: LocalesValues }> = ({ locale }) => (
  <WebsiteIslandWrapper locale={locale}>
    <BackgroundLayout>
      <DemoPage />
    </BackgroundLayout>
  </WebsiteIslandWrapper>
);
