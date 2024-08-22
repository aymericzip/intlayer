import { Loader } from '@intlayer/design-system';
import dynamic from 'next/dynamic';
import type { FC } from 'react';
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

const DynamicLanguageSection = dynamic(
  () => import('./LanguageSection').then((mod) => mod.LanguageSection),
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

const DynamicDemoSection = dynamic(
  () => import('./DemoSection').then((mod) => mod.DemoSection),
  {
    loading: () => <Loader />,
  }
);

export const LandingPage: FC = () => (
  <>
    <LandingSection />
    <DynamicAvailableTechnoSection />
    <DynamicLanguageSection />
    <DynamicWhyToChoseIntlayerSection />
    <DynamicDemoSection />
  </>
);
