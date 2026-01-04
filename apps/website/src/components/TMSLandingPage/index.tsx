'use client';

import { BackgroundLayout } from '@components/BackgroundLayout';
import type { FC } from 'react';
import { lazy, Suspense } from 'react';

const HeroSection = lazy(() =>
  import('./HeroSection').then((module) => ({ default: module.HeroSection }))
);
const PainPointsSection = lazy(() =>
  import('./PainPointsSection').then((module) => ({
    default: module.PainPointsSection,
  }))
);
const ComparisonSection = lazy(() =>
  import('./ComparisonSection').then((module) => ({
    default: module.ComparisonSection,
  }))
);
const FeaturesSection = lazy(() =>
  import('./FeaturesSection').then((module) => ({
    default: module.FeaturesSection,
  }))
);
const FinalCTASection = lazy(() =>
  import('./FinalCTASection').then((module) => ({
    default: module.FinalCTASection,
  }))
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

export const TMSLandingPage: FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <BackgroundLayout>
        <Suspense fallback={<div className="min-h-[calc(100vh-64px)]" />}>
          <HeroSection />
        </Suspense>
      </BackgroundLayout>

      {/* Pain Points Section */}
      <Suspense fallback={<div className="py-24" />}>
        <PainPointsSection />
      </Suspense>

      {/* Comparison Table Section */}
      <Suspense fallback={<div className="py-24" />}>
        <ComparisonSection />
      </Suspense>

      {/* Features Grid */}
      <Suspense fallback={<div className="py-24" />}>
        <FeaturesSection />
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

      {/* Final CTA */}
      <Suspense fallback={<div className="py-24" />}>
        <FinalCTASection />
      </Suspense>
    </div>
  );
};
