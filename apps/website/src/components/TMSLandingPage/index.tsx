'use client';

import { BackgroundLayout } from '@components/BackgroundLayout';
import { ContributorSection } from '@components/LandingPage/ContributorSection';
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

      {/* Community Section */}
      <section className="py-24">
        <ContributorSection />
      </section>

      {/* Final CTA */}
      <Suspense fallback={<div className="py-24" />}>
        <FinalCTASection />
      </Suspense>
    </div>
  );
};
