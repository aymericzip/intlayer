import { BackgroundLayout } from '@components/BackgroundLayout';
import { CommonQuestionsSection } from '@components/LandingPage/CommonQuestionsSection/CommonQuestions';
import { Loader } from '@intlayer/design-system/loader';
import dynamic from '@utils/dynamic';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
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

export const LandingPage: FC = () => {
  const content = useIntlayer('landing-page');

  return (
    <>
      <main
        aria-label={content.landingMainTitle.value}
        className="flex flex-col gap-10"
      >
        <BackgroundLayout>
          <section aria-label={content.heroSection.value}>
            <LandingSection />
          </section>
          <section aria-label={content.keyFeaturesSection.value}>
            <DynamicFeaturesSection />
          </section>
        </BackgroundLayout>

        <section aria-label={content.whyChooseIntlayerSection.value}>
          <DynamicWhyToChoseIntlayerSection />
        </section>

        <div className="relative flex w-full flex-col gap-24 overflow-hidden bg-neutral/5 py-16 dark:bg-neutral-900/10">
          <section aria-label={content.benchmarkSection.value}>
            <DynamicI18nBenchmarkSection />
          </section>

          <section aria-label={content.supportedLanguagesSection.value}>
            <DynamicLanguageSection />
          </section>

          <section aria-label={content.codeAuditSection.value}>
            <DynamicAuditSection />
          </section>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-4 bg-background [clip-path:polygon(0_0,100%_0,0_100%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-4 bg-background [clip-path:polygon(100%_0,100%_100%,0_100%)]"
          />
        </div>

        <section aria-label={content.productsSection.value}>
          <DynamicFeatureFlagsSection />
        </section>
        <section aria-label={content.technologiesSection.value}>
          <DynamicAvailableTechnoSection />
        </section>
        <section aria-label={content.liveDemoSection.value}>
          <DynamicDemoSection />
        </section>
        <section aria-label={content.contributorsSection.value}>
          <DynamicContributorSection />
        </section>
        <section aria-label={content.faqSection.value}>
          <CommonQuestionsSection />
        </section>
      </main>

      <DynamicChatBotModal />
    </>
  );
};
