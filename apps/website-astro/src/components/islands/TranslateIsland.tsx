/** @jsxImportSource react */

import { AiTranslationLandingCore } from '@components/TranslationLandingPage';
import type { LocalesValues } from 'intlayer';
import type { FC } from 'react';
import { WebsiteIslandWrapper } from './WebsiteIslandWrapper';

export const TranslateIsland: FC<{ locale: LocalesValues }> = ({ locale }) => (
  <WebsiteIslandWrapper locale={locale}>
    <AiTranslationLandingCore />
  </WebsiteIslandWrapper>
);
