import { type FC, lazy, Suspense } from 'react';
import { BackgroundLayout } from '~/components/BackgroundLayout';

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
  import('~/components/LandingPage/ProductsSection').then((module) => ({
    default: module.ProductsSection,
  }))
);
const ContributorSection = lazy(() =>
  import('~/components/LandingPage/ContributorSection').then((module) => ({
    default: module.ContributorSection,
  }))
);

export const CMSLandingPage: FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <BackgroundLayout>
        <Suspense fallback={null}>
          <HeroSection />
        </Suspense>
      </BackgroundLayout>

      {/* Content Delivery Section */}
      <Suspense fallback={null}>
        <ContentDeliverySection />
      </Suspense>

      {/* Features Grid Section */}
      <Suspense fallback={null}>
        <FeaturesSection />
      </Suspense>

      {/* Coming Soon Section */}
      <Suspense fallback={null}>
        <ComingSoonSection />
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

      {/* Final CTA Section */}
      <Suspense fallback={null}>
        <FinalCTASection />
      </Suspense>
    </div>
  );
};
