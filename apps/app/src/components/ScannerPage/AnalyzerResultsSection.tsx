import { Container } from '@intlayer/design-system/container';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { AnalyzerPageResults } from './Analyzer/Results/AnalyzerPageResults';
import { AnalyzerSiteResults } from './Analyzer/Results/AnalyzerSiteResults';
import { BundleContentField } from './Analyzer/Results/BundleContentField';
import { CachedResultNotice } from './Analyzer/Results/CachedResultNotice';
import { RobotsSection } from './Analyzer/Results/RobotsSection';
import { SitemapSection } from './Analyzer/Results/SitemapSection';
import { SiteStackSection } from './Analyzer/Results/SiteStackSection';
import { RecursiveAuditResults } from './RecursiveAuditResults';
import { UrlDiscoveryList } from './UrlDiscoveryList';

interface AnalyzerResultsSectionProps {
  domainData: any;
  score: number;
  mergedData: any;
  url: string;
  isSingleScanLoading: boolean;
  /** ISO date of the audit when it was replayed from the one-hour cache. */
  cachedAt?: string | null;
  /** Runs a fresh audit of the URL, bypassing the cache. */
  onRerun: () => void;
  // discovery phase
  isDiscovering: boolean;
  discoveredUrls: string[] | null;
  onDiscoverUrls: () => void;
  onStartWithUrls: (urls: string[]) => void;
  // recursive audit
  recursiveJobId: string | null;
  recursiveStatus: any;
  isRecursiveScanLoading: boolean;
  isPaused: boolean;
  onPause: () => void;
  onResume: () => void;
  onCancel: () => void;
}

export const AnalyzerResultsSection: FC<AnalyzerResultsSectionProps> = ({
  domainData,
  score,
  mergedData,
  url,
  isSingleScanLoading,
  cachedAt,
  onRerun,
  isDiscovering,
  discoveredUrls,
  onStartWithUrls,
  recursiveJobId,
  recursiveStatus,
  isRecursiveScanLoading,
  isPaused,
  onPause,
  onResume,
  onCancel,
}) => {
  const { discoveringUrls } = useIntlayer('localization-analyzer');

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

      {isDiscovering && (
        <div className="mt-6 border-neutral border-t border-dotted pt-6 text-center text-sm text-text/60">
          {discoveringUrls}
        </div>
      )}
      {discoveredUrls && !recursiveJobId && (
        <UrlDiscoveryList
          urls={discoveredUrls}
          isLoading={isRecursiveScanLoading}
          onStart={onStartWithUrls}
          onCancel={() => onStartWithUrls([])}
        />
      )}
      {recursiveStatus && (
        <RecursiveAuditResults
          status={recursiveStatus}
          isPaused={isPaused}
          onPause={onPause}
          onResume={onResume}
          onCancel={onCancel}
        />
      )}
    </Container>
  );
};
