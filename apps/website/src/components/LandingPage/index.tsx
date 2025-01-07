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

const DynamicDemoSection = dynamic(
  () => import('./DemoSection').then((mod) => mod.DemoSection),
  {
    loading: () => <Loader />,
  }
);

const DynamicIDESection = dynamic(
  () => import('./IDESection').then((mod) => mod.IDESection),
  {
    loading: () => <Loader />,
  }
);

// const DynamicChatBotSection = dynamic(
//   () => import('./ChatBotSection').then((mod) => mod.ChatBotSection),
//   {
//     loading: () => <Loader />,
//   }
// );

export const LandingPage: FC = () => (
  <div className="flex flex-col gap-10">
    <LandingSection />
    <DynamicWhyToChoseIntlayerSection />
    <DynamicAvailableTechnoSection />
    <DynamicIDESection />
    <DynamicLanguageSection />
    <DynamicDemoSection />
    {/* <DynamicChatBotSection /> */}
    <CommonQuestionsSection />
  </div>
);
