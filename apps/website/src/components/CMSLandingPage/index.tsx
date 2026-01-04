'use client';

import { BackgroundLayout } from '@components/BackgroundLayout';
import { ContributorSection } from '@components/LandingPage/ContributorSection';
import type { FC } from 'react';
import { lazy, Suspense } from 'react';

const HeroSection = lazy(() =>
  import('./HeroSection').then((module) => ({ default: module.HeroSection }))
);
const ValuePropsSection = lazy(() =>
  import('./ValuePropsSection').then((module) => ({
    default: module.ValuePropsSection,
  }))
);
const ContentDeliverySection = lazy(() =>
  import('./ContentDeliverySection').then((module) => ({
    default: module.ContentDeliverySection,
  }))
);
const FeaturesSection = lazy(() =>
  import('./FeaturesSection').then((module) => ({
    default: module.FeaturesSection,
  }))
);
const ComingSoonSection = lazy(() =>
  import('./ComingSoonSection').then((module) => ({
    default: module.ComingSoonSection,
  }))
);
const IntegrationSection = lazy(() =>
  import('./IntegrationSection').then((module) => ({
    default: module.IntegrationSection,
  }))
);
const FinalCTASection = lazy(() =>
  import('./FinalCTASection').then((module) => ({
    default: module.FinalCTASection,
  }))
);

export const CMSLandingPage: FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <BackgroundLayout>
        <Suspense fallback={<div className="min-h-[calc(100vh-64px)]" />}>
          <HeroSection />
        </Suspense>
      </BackgroundLayout>

      {/* Value Props Section */}
      <Suspense fallback={<div className="py-24" />}>
        <ValuePropsSection />
      </Suspense>

      {/* Content Delivery Section */}
      <Suspense fallback={<div className="py-24" />}>
        <ContentDeliverySection />
      </Suspense>

      {/* Features Grid Section */}
      <Suspense fallback={<div className="py-24" />}>
        <FeaturesSection />
      </Suspense>

      {/* Coming Soon Section */}
      <Suspense fallback={<div className="py-24" />}>
        <ComingSoonSection />
      </Suspense>

      {/* Integration Section */}
      <Suspense fallback={<div className="py-24" />}>
        <IntegrationSection />
      </Suspense>

      {/* Community Section */}
      <section className="py-24">
        <ContributorSection />
      </section>

      {/* Final CTA Section */}
      <Suspense fallback={<div className="py-24" />}>
        <FinalCTASection />
      </Suspense>
    </div>
  );
};
