import { Loader } from '@intlayer/design-system/loader';
import { type FC, lazy, Suspense } from 'react';
import { useIntlayer } from 'react-intlayer';
import { BackgroundLayout } from '~/components/BackgroundLayout';
import { CommonQuestionsSection } from '~/components/LandingPage/CommonQuestionsSection/CommonQuestions';
import { HeroSection } from './HeroSection';

const AvailableTechnoSection = lazy(() =>
  import('./AvailableTechnoSection').then((mod) => ({
    default: mod.AvailableTechnoSection,
  }))
);

const LanguageSection = lazy(() =>
  import('@intlayer/design-system/language-background').then((mod) => ({
    default: mod.LanguageSection,
  }))
);

const WhyToChoseIntlayerSection = lazy(() =>
  import('./WhyToChoseIntlayerSection').then((mod) => ({
    default: mod.WhyToChoseIntlayerSection,
  }))
);

const FeaturesSection = lazy(() =>
  import('./FeaturesSection').then((mod) => ({
    default: mod.FeaturesSection,
  }))
);

// You can swap the import to the new section proposition in src/components/LandingPage/NEW/RedesignedFeatures.tsx

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
        className="flex flex-col"
      >
        <section aria-label={content.heroSection.value}>
          <HeroSection />
        </section>

        <section aria-label={content.keyFeaturesSection.value}>
          <Suspense fallback={<Loader />}>
            <FeaturesSection />
          </Suspense>
        </section>

        <section aria-label={content.whyChooseIntlayerSection.value}>
          <Suspense fallback={<Loader />}>
            <WhyToChoseIntlayerSection />
          </Suspense>
        </section>

        <section aria-label={content.benchmarkSection.value}>
          <Suspense fallback={<Loader />}>
            <I18nBenchmarkSection />
          </Suspense>
        </section>

        <section aria-label={content.supportedLanguagesSection.value}>
          <Suspense fallback={<Loader />}>
            <LanguageSection className="border-b" />
          </Suspense>
        </section>

        <section aria-label={content.codeAuditSection.value}>
          <Suspense fallback={<Loader />}>
            <AuditSection />
          </Suspense>
        </section>

        <section aria-label={content.productsSection.value}>
          <Suspense fallback={<Loader />}>
            <ProductsSection />
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

/*




*/
