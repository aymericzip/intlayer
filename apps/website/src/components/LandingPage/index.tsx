import { Loader } from '@intlayer/design-system';
import dynamic from 'next/dynamic';
import type { FC } from 'react';
import { DemoCodeSandbox } from './DemoCodeSandbox';
import { LandingSection } from './LandingSection';

const DynamicAvailableTechnoSection = dynamic(
  () =>
    import('./AvailableTechnoSection').then(
      (mod) => mod.AvailableTechnoSection
    ),
  {
    loading: () => <Loader />,
  }
);

const DynamicWhyToChoseIntlayerSection = dynamic(
  () =>
    import('./WhyToChoseIntlayerSection').then(
      (mod) => mod.WhyToChoseIntlayerSection
    ),
  {
    loading: () => <Loader />,
  }
);

export const LandingPage: FC = () => (
  <>
    <LandingSection />
    <DynamicAvailableTechnoSection />
    <DynamicWhyToChoseIntlayerSection />
    <DemoCodeSandbox />
  </>
);
