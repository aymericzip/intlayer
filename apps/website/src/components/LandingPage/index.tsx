import type { FC } from 'react';
import { AvailableTechnoSection } from './AvailableTechnoSection';
import { LandingSection } from './LandingSection';

export const LandingPage: FC = () => (
  <>
    <LandingSection />
    <AvailableTechnoSection />
  </>
);
