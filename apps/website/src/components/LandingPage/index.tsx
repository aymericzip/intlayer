import { BackgroundLayout } from '@components/BackgroundLayout';
import { CommonQuestionsSection } from '@components/LandingPage/CommonQuestionsSection/CommonQuestions';
import { Loader } from '@intlayer/design-system/loader';
import { useIntlayer } from 'next-intlayer/server';
import { type FC, lazy, Suspense } from 'react';
import { LandingSection } from './LandingSection';

const AvailableTechnoSection = lazy(() =>
  import('./AvailableTechnoSection').then((mod) => ({
    default: mod.AvailableTechnoSection,
  }))
);

const LanguageSection = lazy(() =>
  import('@intlayer/design-system').then((mod) => ({
    default: mod.LanguageSection,
  }))
);

const WhyToChoseIntlayerSection = lazy(() =>
  import('./WhyToChoseIntlayerSection').then((mod) => ({
    default: mod.WhyToChoseIntlayerSection,
  }))
);

const FeaturesSection = lazy(() =>
  import('./FeaturesSection').then((mod) => ({ default: mod.FeaturesSection }))
);

const I18nBenchmarkSection = lazy(() =>
  import('./I18nBenchmarkSection').then((mod) => ({
    default: mod.I18nBenchmarkSection,
  }))
);

const AuditSection = lazy(() =>
  import('./AuditSection').then((mod) => ({ default: mod.AuditSection }))
);

const DemoSection = lazy(() =>
  import('./DemoSection').then((mod) => ({ default: mod.DemoSection }))
);

const ChatBotModal = lazy(() =>
  import('./ChatBotModal').then((mod) => ({ default: mod.ChatBotModal }))
);

const ContributorSection = lazy(() =>
  import('./ContributorSection').then((mod) => ({
    default: mod.ContributorSection,
  }))
);

const ProductsSection = lazy(() =>
  import('./ProductsSection/index').then((mod) => ({
    default: mod.ProductsSection,
  }))
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
            <Suspense fallback={<Loader />}>
              <FeaturesSection />
            </Suspense>
          </section>
        </BackgroundLayout>

        <section aria-label={content.whyChooseIntlayerSection.value}>
          <Suspense fallback={<Loader />}>
            <WhyToChoseIntlayerSection />
          </Suspense>
        </section>

        <div className="relative flex w-full flex-col gap-24 overflow-hidden bg-neutral/5 py-16 dark:bg-neutral-900/10">
          <section aria-label={content.benchmarkSection.value}>
            <Suspense fallback={<Loader />}>
              <I18nBenchmarkSection />
            </Suspense>
          </section>

          <section aria-label={content.supportedLanguagesSection.value}>
            <Suspense fallback={<Loader />}>
              <LanguageSection />
            </Suspense>
          </section>

          <section aria-label={content.codeAuditSection.value}>
            <Suspense fallback={<Loader />}>
              <AuditSection />
            </Suspense>
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
          <Suspense fallback={<Loader />}>
            <ProductsSection />
          </Suspense>
        </section>
        <section aria-label={content.technologiesSection.value}>
          <Suspense fallback={<Loader />}>
            <AvailableTechnoSection />
          </Suspense>
        </section>
        <section aria-label={content.liveDemoSection.value}>
          <Suspense fallback={<Loader />}>
            <DemoSection />
          </Suspense>
        </section>
        <section aria-label={content.contributorsSection.value}>
          <Suspense fallback={<Loader />}>
            <ContributorSection />
          </Suspense>
        </section>
        <section aria-label={content.faqSection.value}>
          <CommonQuestionsSection />
        </section>
      </main>

      <Suspense fallback={<Loader />}>
        <ChatBotModal />
      </Suspense>
    </>
  );
};
