'use client';

import type { FC } from 'react';
import { lazy, Suspense } from 'react';

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
  import('@components/LandingPage/ProductsSection').then((module) => ({
    default: module.ProductsSection,
  }))
);
const ContributorSection = lazy(() =>
  import('@components/LandingPage/ContributorSection').then((module) => ({
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
      <Suspense fallback={<div className="min-h-screen" />}>
        <HeroSection />
        {/* Providers Carousel */}
        <Suspense fallback={<div className="py-8" />}>
          <ProvidersCarousel />
        </Suspense>
      </Suspense>

      {/* Commands Section */}
      <Suspense fallback={<div className="py-24" />}>
        <CommandsSection />
      </Suspense>

      {/* Key Points Section */}
      <Suspense fallback={<div className="py-24" />}>
        <KeyPointsSection />
      </Suspense>

      {/* Local vs Server Section */}
      <Suspense fallback={<div className="py-24" />}>
        <LocalVsServerSection />
      </Suspense>

      {/* Language Section (from design-system, not lazy) */}
      <Suspense fallback={<div className="py-24" />}>
        <LanguageSection />
      </Suspense>

      {/* How It Works Section */}
      <Suspense fallback={<div className="py-24" />}>
        <HowItWorksSection />
      </Suspense>

      {/* Products Section */}
      <Suspense fallback={<div className="py-24" />}>
        <ProductsSection />
      </Suspense>

      {/* Community Section */}
      <section>
        <Suspense fallback={<div className="py-24" />}>
          <ContributorSection />
        </Suspense>
      </section>

      {/* CTA Section */}
      <Suspense fallback={<div className="py-24" />}>
        <CTASection />
      </Suspense>
    </div>
  );
};
