import { BackgroundLayout } from '@components/BackgroundLayout';
import dynamic from 'next/dynamic';
import type { FC } from 'react';

const HeroSection = dynamic(() =>
  import('./HeroSection').then((module) => module.HeroSection)
);

const ContentDeliverySection = dynamic(() =>
  import('./ContentDeliverySection').then(
    (module) => module.ContentDeliverySection
  )
);
const FeaturesSection = dynamic(() =>
  import('./FeaturesSection').then((module) => module.FeaturesSection)
);
const ComingSoonSection = dynamic(() =>
  import('./ComingSoonSection').then((module) => module.ComingSoonSection)
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

export const CMSLandingPage: FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <BackgroundLayout>
        <HeroSection />
      </BackgroundLayout>

      {/* Content Delivery Section */}
      <ContentDeliverySection />

      {/* Features Grid Section */}
      <FeaturesSection />

      {/* Coming Soon Section */}
      <ComingSoonSection />

      {/* Products Section */}
      <ProductsSection />

      {/* Community Section */}
      <section>
        <ContributorSection />
      </section>

      {/* Final CTA Section */}
      <FinalCTASection />
    </div>
  );
};
