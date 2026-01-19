'use client';

import { Link } from '@components/Link/Link';
import { extractErrorMessage } from '@intlayer/config/client';
import { Button, ButtonColor, ButtonVariant } from '@intlayer/design-system';
import { usePersistedStore, useSession } from '@intlayer/design-system/hooks';
import { useIntlayer } from 'next-intlayer';
import { type FC, useEffect, useRef, useState } from 'react';
import { useSearchParamState } from '@/hooks/useSearchParamState';
import { AppRoutes } from '@/Routes';
import { AnalyzerLoading } from './Analyzer/AnalyzerLoading';
import { AnalyzerForm } from './Analyzer/Form/AnalyzerForm';
import { useAnalyzerUrlSchema } from './Analyzer/Form/useAnalyzerUrlSchema';
import { AnalyzerPageResults } from './Analyzer/Results/AnalyzerPageResults';
import { AnalyzerSiteResults } from './Analyzer/Results/AnalyzerSiteResults';
import { RobotsSection } from './Analyzer/Results/RobotsSection';
import { SitemapSection } from './Analyzer/Results/SitemapSection';
import type {
  AuditEvent,
  DomainData,
  MergedData,
} from './Analyzer/Results/types';
import { RecursiveAuditResults } from './RecursiveAuditResults';

export const LocalizationAnalyzer: FC = () => {
  const { session } = useSession();
  const isLoggedIn = !!session;

  const {
    globalError: globalErrorMessage,
    fullSiteAudit,
    loginToAuditFullSite,
    wantToAnalyzeFullSite,
  } = useIntlayer('localization-analyzer');
  const [error, setError] = useState<string | null>(null);

  const [isSingleScanLoading, setIsSingleScanLoading] =
    useState<boolean>(false);
  const [isRecursiveScanLoading, setIsRecursiveScanLoading] =
    useState<boolean>(false);
  const isLoading = isSingleScanLoading || isRecursiveScanLoading;
  const [progress, setProgress] = usePersistedStore<number>(
    'localization-analyzer-progress',
    0
  );
  const [stepsMessage, setStepsMessage] = usePersistedStore<string>(
    'localization-analyzer-steps-message',
    ''
  );
  const [score, setScore] = usePersistedStore<number>(
    'localization-analyzer-score',
    0
  );

  const [domainData, setDomainData] = usePersistedStore<
    Partial<DomainData> | undefined
  >('localization-analyzer-domain-data', undefined);
  const [mergedData, setMergedData] = usePersistedStore<MergedData>(
    'localization-analyzer-data',
    {}
  );

  const [recursiveJobId, setRecursiveJobId] = useState<string | null>(null);
  const [recursiveStatus, setRecursiveStatus] = useState<any>(null);

  const urlSchema = useAnalyzerUrlSchema();

  const eventSourceRef = useRef<EventSource | null>(null);
  const analyzedUrlRef = useRef<string | null>(null);

  const { params } = useSearchParamState({
    auto_start: { type: 'boolean', fallbackValue: false },
    url: { type: 'string', fallbackValue: '' },
  });

  // Cleanup EventSource on unmount
  useEffect(() => {
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    // Only auto-start if:
    // 1. auto_start is true
    // 2. URL is provided
    // 3. We haven't already analyzed this URL
    // 4. Not currently loading
    // 5. No existing data (first time or after reset)
    if (
      params.auto_start &&
      params.url &&
      analyzedUrlRef.current !== params.url &&
      !isLoading &&
      Object.keys(mergedData).length === 0
    ) {
      try {
        // Validate the URL (adjust schema call as needed)
        urlSchema.parse({ url: params.url });
      } catch (error) {
        setError(`Invalid URL: ${error}`);
        return;
      }

      analyzedUrlRef.current = params.url;
      handleAnalyze(params.url);
    }
  }, [params.auto_start, params.url, isLoading]);

  const handleAnalyze = async (url: string) => {
    // Close any existing EventSource connection
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }

    setError(null);
    setIsSingleScanLoading(true);
    setProgress(0);
    setStepsMessage('Starting analysis...');
    setMergedData({});
    setDomainData(undefined);
    setScore(0);

    try {
      const eventSource = new EventSource(
        `${process.env.NEXT_PUBLIC_SCANNER_API_URL}?url=${encodeURIComponent(url)}`
      );
      eventSourceRef.current = eventSource;

      eventSource.onmessage = (event) => {
        try {
          const message: AuditEvent = JSON.parse(event.data);

          if (typeof message.globalError === 'string') {
            console.error(message.globalError);
            setError(globalErrorMessage);
            eventSource.close();
            eventSourceRef.current = null;
            setIsSingleScanLoading(false);
            return;
          }

          if (typeof message.message === 'string') {
            setStepsMessage(message.message);
          }
          if (typeof message.progress === 'number') {
            setProgress(message.progress ?? 0);
          }
          if (typeof message.score === 'number') {
            setScore(message.score);
          }
          if (typeof message.type === 'string') {
            setMergedData((prev) => ({
              ...prev,
              [message.type!]: {
                status: message.status,
                data: message.data,
              },
            }));
          }

          if (typeof message.domainData === 'object') {
            setDomainData((prev) => ({ ...prev, ...message.domainData }));
          }

          // Check if analysis is complete (only when progress reaches 100)
          if (
            typeof message.progress === 'number' &&
            message.progress === 100
          ) {
            setIsSingleScanLoading(false);
            // Keep connection open briefly to ensure all messages are received
            setTimeout(() => {
              if (eventSourceRef.current) {
                eventSourceRef.current.close();
                eventSourceRef.current = null;
              }
            }, 1000);
          }
        } catch (err) {
          console.error('Failed to parse SSE message:', err);
        }
      };

      eventSource.onerror = (error) => {
        console.error('SSE error:', error);
        eventSource.close();
        eventSourceRef.current = null;
        setIsSingleScanLoading(false);
      };
    } catch (error) {
      setMergedData({});
      setError(extractErrorMessage(error));
      setIsSingleScanLoading(false);
    }
  };

  const handleCancel = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    setIsSingleScanLoading(false);
    setIsRecursiveScanLoading(false);
    setStepsMessage('Analysis cancelled');
  };

  const handleStartRecursiveAudit = async () => {
    if (!params.url) return;
    setError(null);
    setIsRecursiveScanLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SCANNER_API_URL}/recursive/start?url=${encodeURIComponent(params.url)}`,
        {
          method: 'POST',
          headers: {
            'x-user-id': session?.user?.id ?? '',
          },
        }
      );
      const data = await response.json();
      if (data.jobId) {
        setRecursiveJobId(data.jobId);
      } else {
        setError(data.error || 'Failed to start recursive audit');
        setIsRecursiveScanLoading(false);
      }
    } catch (err) {
      setError(extractErrorMessage(err));
      setIsRecursiveScanLoading(false);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (recursiveJobId) {
      interval = setInterval(async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_SCANNER_API_URL}/recursive/${recursiveJobId}`
          );
          const data = await response.json();
          setRecursiveStatus(data);
          if (data.job.status === 'completed' || data.job.status === 'failed') {
            clearInterval(interval);
            setIsRecursiveScanLoading(false);
          }
        } catch (err) {
          console.error('Failed to poll recursive status:', err);
        }
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [recursiveJobId]);

  const hasData = mergedData && Object.keys(mergedData).length > 0;

  return (
    <div className="flex w-full flex-col items-center justify-center py-6 text-center">
      <div className="flex w-full flex-col items-center gap-4">
        <AnalyzerForm
          onAnalyze={handleAnalyze}
          loading={isLoading}
          onCancel={handleCancel}
        />
      </div>

      {isSingleScanLoading && !recursiveJobId && (
        <AnalyzerLoading
          progress={progress}
          currentStep={stepsMessage ?? 'Analyzing...'}
        />
      )}

      {(hasData || isSingleScanLoading) && (
        <div className="mt-10 w-full max-w-2xl rounded-2xl bg-card p-6 shadow-md">
          <AnalyzerSiteResults
            domainData={domainData}
            score={score}
            isLoading={isSingleScanLoading}
          />

          <AnalyzerPageResults
            data={mergedData}
            url={params.url}
            isLoading={isSingleScanLoading}
          />

          <RobotsSection data={mergedData} isLoading={isSingleScanLoading} />

          <SitemapSection data={mergedData} isLoading={isSingleScanLoading} />

          {/* <PageGroupsList domainData={domainData} onSelect={() => null} /> */}

          {!recursiveJobId && !isSingleScanLoading && hasData && (
            <div className="mt-6 flex flex-col items-center gap-4 border-neutral border-t border-dashed pt-6">
              <p className="text-neutral text-sm">{wantToAnalyzeFullSite}</p>
              {isLoggedIn ? (
                <Button
                  onClick={handleStartRecursiveAudit}
                  disabled={isLoading || !params.url}
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

          {recursiveStatus && (
            <RecursiveAuditResults status={recursiveStatus} />
          )}
        </div>
      )}

      {error && <p className="text-error">{error}</p>}
    </div>
  );
};
