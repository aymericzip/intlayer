'use client';

import { BackgroundLayout } from '@components/BackgroundLayout';
import type { FC } from 'react';
import { lazy, Suspense } from 'react';

const HeroSection = lazy(() =>
  import('./HeroSection').then((module) => ({ default: module.HeroSection }))
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

export const CMSLandingPage: FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <BackgroundLayout>
        <Suspense>
          <HeroSection />
        </Suspense>
      </BackgroundLayout>

      {/* Content Delivery Section */}
      <Suspense>
        <ContentDeliverySection />
      </Suspense>

      {/* Features Grid Section */}
      <Suspense>
        <FeaturesSection />
      </Suspense>

      {/* Coming Soon Section */}
      <Suspense>
        <ComingSoonSection />
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

      {/* Final CTA Section */}
      <Suspense>
        <FinalCTASection />
      </Suspense>
    </div>
  );
};
