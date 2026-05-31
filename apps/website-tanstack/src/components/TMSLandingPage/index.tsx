import { type FC, lazy, Suspense } from 'react';
import { BackgroundLayout } from '~/components/BackgroundLayout';

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
  import('~/components/LandingPage/ProductsSection').then((module) => ({
    default: module.ProductsSection,
  }))
);
const ContributorSection = lazy(() =>
  import('~/components/LandingPage/ContributorSection').then((module) => ({
    default: module.ContributorSection,
  }))
);

export const TMSLandingPage: FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <BackgroundLayout>
        <Suspense fallback={null}>
          <HeroSection />
        </Suspense>
      </BackgroundLayout>

      {/* Pain Points Section */}
      <Suspense fallback={null}>
        <PainPointsSection />
      </Suspense>

      {/* Comparison Table Section */}
      <Suspense fallback={null}>
        <ComparisonSection />
      </Suspense>

      {/* Features Grid */}
      <Suspense fallback={null}>
        <FeaturesSection />
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

      {/* Final CTA */}
      <Suspense fallback={null}>
        <FinalCTASection />
      </Suspense>
    </div>
  );
};
