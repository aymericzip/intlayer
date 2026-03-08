import type { FC } from 'react';
import { AnalyzerPageResults } from './Analyzer/Results/AnalyzerPageResults';
import { AnalyzerSiteResults } from './Analyzer/Results/AnalyzerSiteResults';
import { RobotsSection } from './Analyzer/Results/RobotsSection';
import { SitemapSection } from './Analyzer/Results/SitemapSection';

interface AnalyzerResultsSectionProps {
  domainData: any;
  score: number;
  mergedData: any;
  url: string;
  isSingleScanLoading: boolean;
}

export const AnalyzerResultsSection: FC<AnalyzerResultsSectionProps> = ({
  domainData,
  score,
  mergedData,
  url,
  isSingleScanLoading,
}) => {
  const hasData = mergedData && Object.keys(mergedData).length > 0;

  if (!hasData && !isSingleScanLoading) return null;

  return (
    <div className="mt-10 w-full max-w-2xl rounded-2xl bg-card p-6 shadow-md">
      <AnalyzerSiteResults
        domainData={domainData}
        score={score}
        isLoading={isSingleScanLoading}
      />

      <AnalyzerPageResults
        data={mergedData}
        url={url}
        isLoading={isSingleScanLoading}
      />

      <RobotsSection data={mergedData} isLoading={isSingleScanLoading} />

      <SitemapSection data={mergedData} isLoading={isSingleScanLoading} />
    </div>
  );
};
