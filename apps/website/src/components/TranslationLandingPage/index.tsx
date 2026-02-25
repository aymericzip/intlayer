import dynamic from 'next/dynamic';
import type { FC } from 'react';

const HeroSection = dynamic(() =>
  import('./HeroSection').then((module) => module.HeroSection)
);
const ProvidersCarousel = dynamic(() =>
  import('./ProvidersCarousel').then((module) => module.ProvidersCarousel)
);
const CommandsSection = dynamic(() =>
  import('./CommandsSection').then((module) => module.CommandsSection)
);
const KeyPointsSection = dynamic(() =>
  import('./KeyPointsSection').then((module) => module.KeyPointsSection)
);
const LocalVsServerSection = dynamic(() =>
  import('./LocalVsServerSection').then((module) => module.LocalVsServerSection)
);
const HowItWorksSection = dynamic(() =>
  import('./HowItWorksSection').then((module) => module.HowItWorksSection)
);
const CTASection = dynamic(() =>
  import('./CTASection').then((module) => module.CTASection)
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
const LanguageSection = dynamic(() =>
  import('@intlayer/design-system').then((module) => module.LanguageSection)
);

export const AiTranslationLandingCore: FC = () => {
  return (
    <div>
      {/* Hero Section with ambient effects */}
      <HeroSection />
      {/* Providers Carousel */}
      <ProvidersCarousel />

      {/* Commands Section */}
      <CommandsSection />

      {/* Key Points Section */}
      <KeyPointsSection />

      {/* Local vs Server Section */}
      <LocalVsServerSection />

      {/* Language Section (from design-system, not lazy) */}
      <LanguageSection />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Products Section */}
      <ProductsSection />

      {/* Community Section */}
      <section>
        <ContributorSection />
      </section>

      {/* CTA Section */}
      <CTASection />
    </div>
  );
};
