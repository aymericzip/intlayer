import { type FC, lazy, Suspense } from 'react';
import { BackgroundLayout } from '~/components/BackgroundLayout';
import { HeroSection } from './HeroSection';

const BenchmarkSection = lazy(() =>
  import('./BenchmarkSection').then((module) => ({
    default: module.BenchmarkSection,
  }))
);
const ComparisonSection = lazy(() =>
  import('./ComparisonSection').then((module) => ({
    default: module.ComparisonSection,
  }))
);
const FrameworksSection = lazy(() =>
  import('./FrameworksSection').then((module) => ({
    default: module.FrameworksSection,
  }))
);
const SSRSection = lazy(() =>
  import('./SSRSection').then((module) => ({ default: module.SSRSection }))
);
const CustomizationSection = lazy(() =>
  import('./CustomizationSection').then((module) => ({
    default: module.CustomizationSection,
  }))
);
const FrontmatterSection = lazy(() =>
  import('./FrontmatterSection').then((module) => ({
    default: module.FrontmatterSection,
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

export const MarkdownLandingPage: FC = () => (
  <div className="flex flex-col">
    {/* Hero */}
    <BackgroundLayout>
      <HeroSection />
    </BackgroundLayout>

    {/* Performance numbers */}
    <Suspense>
      <BenchmarkSection />
    </Suspense>

    {/* Why not a standalone renderer */}
    <Suspense>
      <ComparisonSection />
    </Suspense>

    {/* Cross-framework coverage */}
    <Suspense>
      <FrameworksSection />
    </Suspense>

    {/* Parse on the server, render on the client */}
    <Suspense>
      <SSRSection />
    </Suspense>

    {/* Global configuration and per-node overrides */}
    <Suspense>
      <CustomizationSection />
    </Suspense>

    {/* Typed frontmatter, and the HTML parser */}
    <Suspense>
      <FrontmatterSection />
    </Suspense>

    {/* Products */}
    <Suspense>
      <ProductsSection />
    </Suspense>

    {/* Community */}
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
