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
  import('@intlayer/design-system/language-background').then((module) => ({
    default: module.LanguageSection,
  }))
);

export const AiTranslationLandingCore: FC = () => {
  return (
    <div>
      {/* Hero Section with ambient effects */}
      <HeroSection />

      {/* Providers Carousel */}
      <Suspense>
        <ProvidersCarousel />
      </Suspense>

      {/* Commands Section */}
      <Suspense>
        <CommandsSection />
      </Suspense>

      {/* Key Points Section */}
      <Suspense>
        <KeyPointsSection />
      </Suspense>

      {/* Local vs Server Section */}
      <Suspense>
        <LocalVsServerSection />
      </Suspense>

      {/* Language Section (from design-system, not lazy) */}
      <Suspense>
        <LanguageSection />
      </Suspense>

      {/* How It Works Section */}
      <Suspense>
        <HowItWorksSection />
      </Suspense>

      {/* Products Section */}
      <Suspense>
        <ProductsSection />
      </Suspense>

      {/* Community Section */}
      <section>
        <Suspense>
          <ContributorSection />
        </Suspense>
      </section>

      {/* CTA Section */}
      <Suspense>
        <CTASection />
      </Suspense>
    </div>
  );
};
