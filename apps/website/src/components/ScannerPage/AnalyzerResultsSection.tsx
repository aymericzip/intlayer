import { Link } from '@components/Link/Link';
import { Button, ButtonColor, ButtonVariant } from '@intlayer/design-system';
import { App_Auth_SignIn } from '@intlayer/design-system/routes';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import { AnalyzerPageResults } from './Analyzer/Results/AnalyzerPageResults';
import { AnalyzerSiteResults } from './Analyzer/Results/AnalyzerSiteResults';
import { BundleContentField } from './Analyzer/Results/BundleContentField';
import { RobotsSection } from './Analyzer/Results/RobotsSection';
import { SitemapSection } from './Analyzer/Results/SitemapSection';
import { RecursiveAuditResults } from './RecursiveAuditResults';
import { UrlDiscoveryList } from './UrlDiscoveryList';

interface AnalyzerResultsSectionProps {
  domainData: any;
  score: number;
  mergedData: any;
  url: string;
  isSingleScanLoading: boolean;
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
  isLoggedIn: boolean;
}

export const AnalyzerResultsSection: FC<AnalyzerResultsSectionProps> = ({
  domainData,
  score,
  mergedData,
  url,
  isSingleScanLoading,
  isDiscovering,
  discoveredUrls,
  onDiscoverUrls,
  onStartWithUrls,
  recursiveJobId,
  recursiveStatus,
  isRecursiveScanLoading,
  isPaused,
  onPause,
  onResume,
  onCancel,
  isLoggedIn,
}) => {
  const {
    fullSiteAudit,
    loginToAuditFullSite,
    wantToAnalyzeFullSite,
    discoveringUrls,
    discoveringUrlsButton,
  } = useIntlayer('localization-analyzer');

  const hasData = mergedData && Object.keys(mergedData).length > 0;
  const showFullSiteButton =
    !recursiveJobId &&
    !isSingleScanLoading &&
    !isDiscovering &&
    !discoveredUrls &&
    hasData;
  const bundleKey = 'bundleContent' as const;

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
      <BundleContentField
        id={bundleKey}
        event={mergedData[`url_unusedBundleContent\\${url}`]}
        isLoading={isSingleScanLoading}
      />
      {showFullSiteButton && (
        <div className="mt-6 flex flex-col items-center gap-4 border-neutral border-t border-dashed pt-6">
          <p className="text-neutral text-sm">{wantToAnalyzeFullSite}</p>
          {isLoggedIn ? (
            <Button
              onClick={onDiscoverUrls}
              disabled={isSingleScanLoading || !url || isDiscovering}
              variant={ButtonVariant.OUTLINE}
              color={ButtonColor.TEXT}
              label={fullSiteAudit.value}
            >
              {isDiscovering ? discoveringUrlsButton : fullSiteAudit}
            </Button>
          ) : (
            <Link
              href={`${App_Auth_SignIn}?redirect_url=${encodeURIComponent(
                typeof window !== 'undefined' ? window.location.href : ''
              )}`}
              color="text"
              variant="button"
              label={loginToAuditFullSite.value}
            >
              {loginToAuditFullSite}
            </Link>
          )}
        </div>
      )}
      {isDiscovering && (
        <div className="mt-6 border-neutral border-t border-dashed pt-6 text-center text-sm text-text/60">
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
    </div>
  );
};
