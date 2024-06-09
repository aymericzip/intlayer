import type { FC } from 'react';
import { AvailableTechnoSection } from './AvailableTechnoSection';
import { LandingSection } from './LandingSection';
import { WhyToChoseIntlayerSection } from './WhyToChoseIntlayerSection';

export const LandingPage: FC = () => (
  <>
    <LandingSection />
    <AvailableTechnoSection />
    <WhyToChoseIntlayerSection />
  </>
);
