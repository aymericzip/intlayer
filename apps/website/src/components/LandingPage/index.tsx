import { useDevice } from '@intlayer/design-system/hooks';
import { Loader } from '@intlayer/design-system/loader';
import {
  type FC,
  lazy,
  type PropsWithChildren,
  type ReactNode,
  Suspense,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useIntlayer } from 'react-intlayer';
import { CommonQuestionsSection } from '~/components/LandingPage/CommonQuestionsSection/CommonQuestions';
import { HeroSection } from './HeroSection';

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

type InViewSectionProps = PropsWithChildren<{
  fallback?: ReactNode;
  rootMargin?: string;
  minHeight?: string | number;
}>;

/**
 * Defers loading and mounting below-the-fold lazy sections until they are
 * within `rootMargin` of the viewport. This avoids chaining critical requests
 * and downloading heavy chunks (such as the benchmark section and country flags)
 * on initial navigation.
 */
const InViewSection: FC<InViewSectionProps> = ({
  children,
  fallback = <Loader />,
  rootMargin = '300px',
  minHeight = '400px',
}) => {
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    if (!('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div
      ref={containerRef}
      style={!isInView && minHeight ? { minHeight } : undefined}
    >
      {isInView ? (
        <Suspense fallback={fallback}>{children}</Suspense>
      ) : (
        <div className="flex items-center justify-center" style={{ minHeight }}>
          {fallback}
        </div>
      )}
    </div>
  );
};

export const LandingPage: FC = () => {
  const content = useIntlayer('landing-page');
  const { isMobile } = useDevice();

  return (
    <>
      <div className="flex flex-col">
        <section aria-label={content.heroSection.value}>
          <HeroSection />
        </section>

        <section aria-label={content.keyFeaturesSection.value}>
          <Suspense fallback={<Loader />}>
            <FeaturesSection />
          </Suspense>
        </section>

        <section aria-label={content.whyChooseIntlayerSection.value}>
          <InViewSection minHeight="450px">
            <WhyToChoseIntlayerSection />
          </InViewSection>
        </section>

        <section aria-label={content.benchmarkSection.value}>
          <InViewSection minHeight="600px">
            <I18nBenchmarkSection />
          </InViewSection>
        </section>

        <section aria-label={content.supportedLanguagesSection.value}>
          <InViewSection minHeight="250px">
            <LanguageSection className="border-neutral border-b" />
          </InViewSection>
        </section>

        <section aria-label={content.codeAuditSection.value}>
          <InViewSection minHeight="500px">
            <AuditSection />
          </InViewSection>
        </section>

        <section aria-label={content.productsSection.value}>
          <InViewSection minHeight="600px">
            <ProductsSection />
          </InViewSection>
        </section>

        {/* The CodeSandbox embed is unusable on narrow screens */}
        {!isMobile && (
          <section aria-label={content.liveDemoSection.value}>
            <InViewSection minHeight="500px">
              <DemoSection />
            </InViewSection>
          </section>
        )}
        <section aria-label={content.contributorsSection.value}>
          <InViewSection minHeight="400px">
            <ContributorSection />
          </InViewSection>
        </section>
        <section aria-label={content.faqSection.value}>
          <CommonQuestionsSection />
        </section>
      </div>

      <InViewSection rootMargin="100px" minHeight={0}>
        <ChatBotModal />
      </InViewSection>
    </>
  );
};
