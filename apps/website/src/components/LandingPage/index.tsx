import { BackgroundLayout } from '@components/BackgroundLayout';
import { CommonQuestionsSection } from '@components/LandingPage/CommonQuestionsSection/CommonQuestions';
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

const DynamicFeaturesSection = dynamic(
  () => import('./FeaturesSection').then((mod) => mod.FeaturesSection),
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

const DynamicChatBotModal = dynamic(
  () => import('./ChatBotModal').then((mod) => mod.ChatBotModal),
  {
    loading: () => <Loader />,
  }
);

const DynamicAIABTestingSection = dynamic(
  () => import('./AIABTestingSection').then((mod) => mod.AIABTestingSection),
  {
    loading: () => <Loader />,
  }
);

export const LandingPage: FC = () => (
  <>
    <div className="flex flex-col gap-10">
      <BackgroundLayout>
        <LandingSection />
        <DynamicWhyToChoseIntlayerSection />
      </BackgroundLayout>
      <DynamicFeaturesSection />
      <DynamicAIABTestingSection />
      <DynamicAvailableTechnoSection />
      <DynamicLanguageSection />
      <DynamicDemoSection />
      <CommonQuestionsSection />
    </div>

    <DynamicChatBotModal />
  </>
);
