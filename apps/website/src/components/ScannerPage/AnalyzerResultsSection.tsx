import { Link } from '@components/Link/Link';
import { Button, ButtonColor, ButtonVariant } from '@intlayer/design-system';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import { AppRoutes } from '@/Routes';
import { AnalyzerPageResults } from './Analyzer/Results/AnalyzerPageResults';
import { AnalyzerSiteResults } from './Analyzer/Results/AnalyzerSiteResults';
import { RobotsSection } from './Analyzer/Results/RobotsSection';
import { SitemapSection } from './Analyzer/Results/SitemapSection';
import { RecursiveAuditResults } from './RecursiveAuditResults';

interface AnalyzerResultsSectionProps {
  domainData: any;
  score: number;
  mergedData: any;
  url: string;
  isSingleScanLoading: boolean;
  recursiveJobId: string | null;
  recursiveStatus: any;
  isLoggedIn: boolean;
  handleStartRecursiveAudit: () => void;
}

export const AnalyzerResultsSection: FC<AnalyzerResultsSectionProps> = ({
  domainData,
  score,
  mergedData,
  url,
  isSingleScanLoading,
  recursiveJobId,
  recursiveStatus,
  isLoggedIn,
  handleStartRecursiveAudit,
}) => {
  const { fullSiteAudit, loginToAuditFullSite, wantToAnalyzeFullSite } =
    useIntlayer('localization-analyzer');

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

      {!recursiveJobId && !isSingleScanLoading && hasData && (
        <div className="mt-6 flex flex-col items-center gap-4 border-neutral border-t border-dashed pt-6">
          <p className="text-neutral text-sm">{wantToAnalyzeFullSite}</p>
          {isLoggedIn ? (
            <Button
              onClick={handleStartRecursiveAudit}
              disabled={isSingleScanLoading || !url}
              variant={ButtonVariant.OUTLINE}
              color={ButtonColor.TEXT}
              label={fullSiteAudit.value}
            >
              {fullSiteAudit}
            </Button>
          ) : (
            <Link
              href={`${AppRoutes.Auth_SignIn}?redirect_url=${encodeURIComponent(
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

      {recursiveStatus && <RecursiveAuditResults status={recursiveStatus} />}
    </div>
  );
};
