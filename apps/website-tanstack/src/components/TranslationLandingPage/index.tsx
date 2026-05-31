import { type FC, lazy, Suspense } from 'react';

const HeroSection = lazy(() =>
  import('./HeroSection').then((module) => ({ default: module.HeroSection }))
);
const ProvidersCarousel = lazy(() =>
  import('./ProvidersCarousel').then((module) => ({
    default: module.ProvidersCarousel,
  }))
);
const CommandsSection = lazy(() =>
  import('./CommandsSection').then((module) => ({
    default: module.CommandsSection,
  }))
);
const KeyPointsSection = lazy(() =>
  import('./KeyPointsSection').then((module) => ({
    default: module.KeyPointsSection,
  }))
);
const LocalVsServerSection = lazy(() =>
  import('./LocalVsServerSection').then((module) => ({
    default: module.LocalVsServerSection,
  }))
);
const HowItWorksSection = lazy(() =>
  import('./HowItWorksSection').then((module) => ({
    default: module.HowItWorksSection,
  }))
);
const CTASection = lazy(() =>
  import('./CTASection').then((module) => ({ default: module.CTASection }))
);
const ProductsSection = lazy(() =>
  import('~/components/LandingPage/ProductsSection').then((module) => ({
    default: module.ProductsSection,
  }))
);
const ContributorSection = lazy(() =>
  import('~/components/LandingPage/ContributorSection').then((module) => ({
    default: module.ContributorSection,
  }))
);
const LanguageSection = lazy(() =>
  import('@intlayer/design-system').then((module) => ({
    default: module.LanguageSection,
  }))
);

export const AiTranslationLandingCore: FC = () => {
  return (
    <div>
      {/* Hero Section with ambient effects */}
      <Suspense fallback={null}>
        <HeroSection />
      </Suspense>

      {/* Providers Carousel */}
      <Suspense fallback={null}>
        <ProvidersCarousel />
      </Suspense>

      {/* Commands Section */}
      <Suspense fallback={null}>
        <CommandsSection />
      </Suspense>

      {/* Key Points Section */}
      <Suspense fallback={null}>
        <KeyPointsSection />
      </Suspense>

      {/* Local vs Server Section */}
      <Suspense fallback={null}>
        <LocalVsServerSection />
      </Suspense>

      {/* Language Section (from design-system, not lazy) */}
      <Suspense fallback={null}>
        <LanguageSection />
      </Suspense>

      {/* How It Works Section */}
      <Suspense fallback={null}>
        <HowItWorksSection />
      </Suspense>

      {/* Products Section */}
      <Suspense fallback={null}>
        <ProductsSection />
      </Suspense>

      {/* Community Section */}
      <section>
        <Suspense fallback={null}>
          <ContributorSection />
        </Suspense>
      </section>

      {/* CTA Section */}
      <Suspense fallback={null}>
        <CTASection />
      </Suspense>
    </div>
  );
};
