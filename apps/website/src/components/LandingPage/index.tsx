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

const DynamicI18nBenchmarkSection = dynamic(
  () =>
    import('./I18nBenchmarkSection').then((mod) => mod.I18nBenchmarkSection),
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

      <DynamicWhyToChoseIntlayerSection />

      <div className="relative flex w-full flex-col gap-24 overflow-hidden bg-neutral/5 py-16 dark:bg-neutral-900/10">
        <DynamicI18nBenchmarkSection />

        <DynamicLanguageSection />

        <DynamicAuditSection />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-4 bg-background [clip-path:polygon(0_0,100%_0,0_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-4 bg-background [clip-path:polygon(100%_0,100%_100%,0_100%)]" />
      </div>

      <div className="flex scale-10 flex-row items-center justify-center gap-4 opacity-10">
        <a href="https://showmebest.ai" target="_blank" rel="noopener">
          <img
            src="https://showmebest.ai/badge/feature-badge-white.webp"
            alt="Featured on ShowMeBestAI"
            width="220"
            height="60"
          />
        </a>
        <a
          href="https://launchigniter.com/product/intlayer-1?ref=badge-intlayer-1"
          target="_blank"
          rel="noopener"
        >
          <img
            src="https://launchigniter.com/api/badge/intlayer-1?theme=light"
            alt="Featured on LaunchIgniter"
            width="212"
            height="55"
          />
        </a>
        <a
          href="https://indie.deals?ref=https%3A%2F%2Fintlayer.org%2F"
          target="_blank"
          rel="noopener noreferrer"
        >
          <image
            href="https://indie.deals/logo_badge.png"
            x="14.4"
            y="12"
            width="36"
            height="36"
            preserveAspectRatio="xMidYMid meet"
            filter="drop-shadow(1px 1px 2px rgba(0,0,0,0.15))"
          />
        </a>
        <a
          href="https://toolfame.com/item/intlayer"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://toolfame.com/badge-light.svg"
            alt="Featured on toolfame.com"
            style="height: 54px; width: auto;"
          />
        </a>
        <a
          href="https://auraplusplus.com/projects/intlayer"
          target="_blank"
          rel="noopener"
        >
          <img
            src="https://auraplusplus.com/images/badges/featured-on-light.svg"
            alt="Featured on Aura++"
            width="265"
            height="58"
          />
        </a>

        <a
          href="https://indiehunt.io/project/intlayer"
          target="_blank"
          rel="noopener"
        >
          <img
            src="https://indiehunt.io/badges/indiehunt-badge-light.svg"
            alt="Featured on IndieHunt"
            width="265"
            height="58"
          />
        </a>
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
