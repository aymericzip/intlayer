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
  const [progress, setProgress] = useState<number>(0);
  const [stepsMessage, setStepsMessage] = useState<string>('');
  const [score, setScore] = useState<number>(0);

  const [domainData, setDomainData] = usePersistedStore<
    Partial<DomainData> | undefined
  >('localization-analyzer-domain-data', undefined);
  const [mergedData, setMergedData] = usePersistedStore<MergedData>(
    'localization-analyzer-data',
    {}
  );

  const urlSchema = useAnalyzerUrlSchema();

  const eventSourceRef = useRef<EventSource | null>(null);

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
    if (
      Object.keys(mergedData).length === 0 &&
      params.auto_start &&
      params.url
    ) {
      try {
        // Validate the URL (adjust schema call as needed)
        urlSchema.parse({ url: params.url });
      } catch (error) {
        setError(`Invalid URL: ${error}`);
        return;
      }

      handleAnalyze(params.url);
    }
  }, [params.auto_start, params.url]);

  const handleAnalyze = async (url: string) => {
    // Close any existing EventSource connection
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }

    setError(null);
    setIsLoading(true);
    setProgress(0);
    setStepsMessage('');
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

          if (message.globalError) {
            console.error(message.globalError);
            setError('An error occurred while analyzing the site.');
            eventSource.close();
            eventSourceRef.current = null;
            setIsLoading(false);
            return;
          }

          if (message.message) {
            setStepsMessage(message.message);
          }
          if (message.progress) {
            setProgress(message.progress ?? 0);
          }
          if (message.score) {
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

          if (message.domainData) {
            setDomainData((prev) => ({ ...prev, ...message.domainData }));
          }

          // Check if analysis is complete (only when progress reaches 100)
          if (message.progress === 100) {
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

      eventSource.onerror = (error) => {
        console.error('SSE error:', error);
        setError('Connection error while analyzing site.');
        eventSource.close();
        eventSourceRef.current = null;
        setIsLoading(false);
      };
    } catch (error) {
      setMergedData({});
      setError(extractErrorMessage(error));
      setIsLoading(false);
    }
  };

  const hasData = mergedData && Object.keys(mergedData).length > 0;

  console.log('mergedData', mergedData);

  return (
    <div className="flex w-full flex-col items-center justify-center p-6 text-center">
      <AnalyzerForm onAnalyze={handleAnalyze} loading={isLoading} />

      {isLoading && (
        <AnalyzerLoading
          progress={progress}
          currentStep={stepsMessage ?? 'Analyzing...'}
        />
      )}

      {hasData && (
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
