'use client';

import { extractErrorMessage } from '@intlayer/config/client';
import { usePersistedStore } from '@intlayer/design-system/hooks';
import { type FC, useEffect, useRef, useState } from 'react';
import { useSearchParamState } from '@/hooks/useSearchParamState';
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

export const LocalizationAnalyzer: FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
    setIsLoading(true);
    setProgress(0);
    setStepsMessage('Starting analysis...');
    setMergedData({});
    setDomainData(undefined);

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
            setError('An error occurred while analyzing the site.');
            eventSource.close();
            eventSourceRef.current = null;
            setIsLoading(false);
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
            console.log(message);
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
            setIsLoading(false);
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

      // eventSource.onerror = (error) => {
      //   console.error('SSE error:', error);

      //   setError('Connection error while analyzing site.');
      //   eventSource.close();
      //   eventSourceRef.current = null;
      //   setIsLoading(false);
      // };
    } catch (error) {
      setMergedData({});
      setError(extractErrorMessage(error));
      setIsLoading(false);
    }
  };

  const hasData = mergedData && Object.keys(mergedData).length > 0;

  return (
    <div className="flex w-full flex-col items-center justify-center p-6 text-center">
      <AnalyzerForm onAnalyze={handleAnalyze} loading={isLoading} />

      {isLoading && (
        <AnalyzerLoading
          progress={progress}
          currentStep={stepsMessage ?? 'Analyzing...'}
        />
      )}

      {(hasData || isLoading) && (
        <div className="mt-10 w-full max-w-2xl rounded-2xl bg-card p-6 shadow-md">
          <AnalyzerSiteResults
            domainData={domainData}
            score={score}
            isLoading={isLoading}
          />

          <AnalyzerPageResults
            data={mergedData}
            url={params.url}
            isLoading={isLoading}
          />

          <RobotsSection data={mergedData} isLoading={isLoading} />

          <SitemapSection data={mergedData} isLoading={isLoading} />

          {/* <PageGroupsList domainData={domainData} onSelect={() => null} /> */}
        </div>
      )}

      {error && <p className="text-error">{error}</p>}
    </div>
  );
};
