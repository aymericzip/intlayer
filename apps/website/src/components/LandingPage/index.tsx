import { BackgroundLayout } from '@components/BackgroundLayout';
import { CommonQuestionsSection } from '@components/LandingPage/CommonQuestionsSection/CommonQuestions';
import { Loader } from '@intlayer/design-system/loader';
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
  () => import('@intlayer/design-system').then((mod) => mod.LanguageSection),
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

const DynamicI18nBenchmark = dynamic(
  () => import('@components/i18nBenchmark').then((mod) => mod.I18nBenchmark),
  {
    loading: () => <Loader />,
  }
);

const DynamicAuditSection = dynamic(
  () => import('./AuditSection').then((mod) => mod.AuditSection),
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

const DynamicContributorSection = dynamic(
  () => import('./ContributorSection').then((mod) => mod.ContributorSection),
  {
    loading: () => <Loader />,
  }
);

const DynamicFeatureFlagsSection = dynamic(
  () => import('./ProductsSection/index').then((mod) => mod.ProductsSection),
  {
    loading: () => <Loader />,
  }
);

export const LandingPage: FC = () => (
  <>
    <div className="flex flex-col gap-10">
      <BackgroundLayout>
        <LandingSection />
        <DynamicFeaturesSection />
      </BackgroundLayout>
      <a
        href="https://builders.to/projects/intlayer?utm_source=badge"
        target="_blank"
        rel="noopener noreferrer"
        className="scale-10 opacity-10"
      >
        <img
          src="https://builders.to/badges/featured-on-builders-small.svg"
          alt="intlayer - Featured on Builders.to"
          width="130"
          height="40"
        />
      </a>

      <DynamicWhyToChoseIntlayerSection />

      <div className="relative flex w-full flex-col gap-24 overflow-hidden bg-neutral/5 py-16 dark:bg-neutral-900/10">
        <DynamicI18nBenchmark />

        <DynamicLanguageSection />

        <DynamicAuditSection />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-4 bg-background [clip-path:polygon(0_0,100%_0,0_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-4 bg-background [clip-path:polygon(100%_0,100%_100%,0_100%)]" />
      </div>

      <DynamicFeatureFlagsSection />
      <DynamicAvailableTechnoSection />
      <DynamicDemoSection />
      <DynamicContributorSection />
      <CommonQuestionsSection />
    </div>

    <DynamicChatBotModal />
  </>
);
