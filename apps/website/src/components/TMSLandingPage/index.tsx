import { BackgroundLayout } from '@components/BackgroundLayout';
import dynamic from 'next/dynamic';
import type { FC } from 'react';

const HeroSection = dynamic(() =>
  import('./HeroSection').then((module) => module.HeroSection)
);
const PainPointsSection = dynamic(() =>
  import('./PainPointsSection').then((module) => module.PainPointsSection)
);
const ComparisonSection = dynamic(() =>
  import('./ComparisonSection').then((module) => module.ComparisonSection)
);
const FeaturesSection = dynamic(() =>
  import('./FeaturesSection').then((module) => module.FeaturesSection)
);
const FinalCTASection = dynamic(() =>
  import('./FinalCTASection').then((module) => module.FinalCTASection)
);
const ProductsSection = dynamic(() =>
  import('@components/LandingPage/ProductsSection').then(
    (module) => module.ProductsSection
  )
);
const ContributorSection = dynamic(() =>
  import('@components/LandingPage/ContributorSection').then(
    (module) => module.ContributorSection
  )
);

export const TMSLandingPage: FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <BackgroundLayout>
        <HeroSection />
      </BackgroundLayout>

      {/* Pain Points Section */}
      <PainPointsSection />

      {/* Comparison Table Section */}
      <ComparisonSection />

      {/* Features Grid */}
      <FeaturesSection />

      {/* Products Section */}
      <ProductsSection />

      {/* Community Section */}
      <section>
        <ContributorSection />
      </section>

      {/* Final CTA */}
      <FinalCTASection />
    </div>
  );
};
