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
        <Suspense>
          <HeroSection />
        </Suspense>
      </BackgroundLayout>

      {/* Pain Points Section */}
      <Suspense>
        <PainPointsSection />
      </Suspense>

      {/* Comparison Table Section */}
      <Suspense>
        <ComparisonSection />
      </Suspense>

      {/* Features Grid */}
      <Suspense>
        <FeaturesSection />
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

      {/* Final CTA */}
      <Suspense>
        <FinalCTASection />
      </Suspense>
    </div>
  );
};
