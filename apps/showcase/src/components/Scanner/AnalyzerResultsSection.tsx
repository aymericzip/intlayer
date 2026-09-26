import { Container } from '@intlayer/design-system/container';
import type { FC } from 'react';
import { AnalyzerPageResults } from './Analyzer/Results/AnalyzerPageResults';
import { AnalyzerSiteResults } from './Analyzer/Results/AnalyzerSiteResults';
import { BundleContentField } from './Analyzer/Results/BundleContentField';
import { CachedResultNotice } from './Analyzer/Results/CachedResultNotice';
import { RobotsSection } from './Analyzer/Results/RobotsSection';
import { SitemapSection } from './Analyzer/Results/SitemapSection';
import { SiteStackSection } from './Analyzer/Results/SiteStackSection';

interface AnalyzerResultsSectionProps {
  domainData: any;
  score: number;
  mergedData: any;
  url: string;
  isSingleScanLoading: boolean;
  cachedAt?: string | null;
  onRerun: () => void;
}

export const AnalyzerResultsSection: FC<AnalyzerResultsSectionProps> = ({
  domainData,
  score,
  mergedData,
  url,
  isSingleScanLoading,
  cachedAt,
  onRerun,
}) => {
  const hasData = mergedData && Object.keys(mergedData).length > 0;
  const bundleKey = 'bundleContent' as const;

  if (!hasData && !isSingleScanLoading) return null;

  return (
    <Container
      className="mt-10 w-full max-w-2xl shadow-md"
      padding="lg"
      border
      roundedSize="2xl"
      borderColor="neutral"
    >
      <AnalyzerSiteResults
        domainData={domainData}
        score={score}
        isLoading={isSingleScanLoading}
      />

      <CachedResultNotice
        cachedAt={cachedAt}
        onRerun={onRerun}
        isLoading={isSingleScanLoading}
      />

      <SiteStackSection domainData={domainData} />

      <AnalyzerPageResults
        data={mergedData}
        url={url}
        isLoading={isSingleScanLoading}
      />

      <RobotsSection data={mergedData} isLoading={isSingleScanLoading} />

      <SitemapSection data={mergedData} isLoading={isSingleScanLoading} />

      <BundleContentField
        id={bundleKey}
        event={mergedData[`url_unusedBundleContent\\${url}`]}
        isLoading={isSingleScanLoading}
      />
    </Container>
  );
};
