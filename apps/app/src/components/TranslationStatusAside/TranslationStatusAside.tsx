'use client';

import { RightDrawer } from '@intlayer/design-system';
import { clsx } from 'clsx';
import {
  AlertCircle,
  CheckCircle2,
  Globe,
  Languages,
  Loader2,
  X,
} from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import { type FC, useEffect, useState } from 'react';

type JobState = 'active' | 'waiting' | 'delayed' | 'completed' | 'failed';

type JobData = {
  jobId: string;
  state: JobState;
  progress: number;
  data?: any;
};

const getStatusIcon = (state: JobState) => {
  switch (state) {
    case 'active':
      return <Loader2 className="h-4 w-4 animate-spin" />;
    case 'completed':
      return <CheckCircle2 className="h-4 w-4 text-success" />;
    case 'failed':
      return <X className="h-4 w-4 text-error" />;
    default:
      return <Loader2 className="h-4 w-4 text-slate-400" />;
  }
};

export const TranslationStatusAside: FC = () => {
  const content = useIntlayer('translation-status-aside');

  const [jobs, setJobs] = useState<Record<string, JobData>>({});
  const [isOpen, setIsOpen] = useState(false);
  const [hasConnectionError, setHasConnectionError] = useState(false);
  const [lastSeenTimestamp, setLastSeenTimestamp] = useState(0);

  useEffect(() => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const eventSource = new EventSource(`${backendUrl}/api/translate/status`, {
      withCredentials: true,
    });

    eventSource.onopen = () => {
      setHasConnectionError(false);
    };

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.jobId) {
          setJobs((prev) => ({
            ...prev,
            [data.jobId]: {
              ...prev[data.jobId],
              ...data,
              updatedAt: Date.now(),
            },
          }));
        }
      } catch (e) {
        console.error(content.errorParsingSseData.value, e);
      }
    };

    eventSource.onerror = (_err) => {
      setHasConnectionError(true);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      setLastSeenTimestamp(Date.now());
    }
  }, [isOpen]);

  const activeJobs = Object.values(jobs).filter((j) =>
    ['active', 'waiting', 'delayed'].includes(j.state)
  );

  const isProcessing = activeJobs.length > 0;

  // Check for unseen completed/failed jobs since last open
  const hasUnseenChanges = Object.values(jobs).some((job) => {
    const jobUpdatedAt = (job as any).updatedAt || 0;
    return (
      ['completed', 'failed'].includes(job.state) &&
      jobUpdatedAt > lastSeenTimestamp
    );
  });

  return (
    <>
      {/* Floating Indicator Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className={clsx(
          'fixed top-24 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full transition-all hover:scale-105 active:scale-95'
        )}
        type="button"
        aria-label={content.translationStatus.value}
      >
        <div className="relative">
          {isProcessing ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : hasConnectionError ? (
            <AlertCircle className="h-6 w-6 text-warning" />
          ) : (
            <Languages className="h-6 w-6 text-text" />
          )}

          {hasUnseenChanges && (
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-error ring-2" />
          )}
        </div>
      </button>

      <RightDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        identifier="translation-status"
        title={
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            <span>{content.translationStatus1.value}</span>
          </div>
        }
      >
        <div className="space-y-4 p-1">
          {hasConnectionError && (
            <div className="flex items-center gap-2 rounded-md bg-amber-50 p-3 text-sm text-warning">
              <AlertCircle className="h-4 w-4" />
              {content.connectionLostReconnecting.value}
            </div>
          )}

          {Object.values(jobs)
            .sort((a, b) => b.jobId.localeCompare(a.jobId))
            .map((job) => (
              <div
                key={job.jobId}
                className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-colors hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800/50"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-slate-100 p-2 dark:bg-slate-800">
                      {getStatusIcon(job.state)}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-slate-500 text-xs dark:text-slate-400">
                        {content.jobId.value}
                      </span>
                      <span className="font-mono text-slate-700 text-xs dark:text-slate-200">
                        {job.jobId}
                      </span>
                    </div>
                  </div>
                  <div
                    className={clsx(
                      'rounded-full px-2 py-1 font-medium text-xs capitalize',
                      job.state === 'completed'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : job.state === 'failed'
                          ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                          : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                    )}
                  >
                    {job.state}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-slate-500 text-xs dark:text-slate-400">
                    <span>Progress</span>
                    <span>{Math.round(job.progress)}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div
                      className={clsx(
                        'h-full transition-all duration-500 ease-out',
                        job.state === 'completed'
                          ? 'bg-green-500'
                          : job.state === 'failed'
                            ? 'bg-error'
                            : 'bg-blue-500'
                      )}
                      style={{ width: `${Math.max(5, job.progress)}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          {Object.keys(jobs).length === 0 && !hasConnectionError && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-3 rounded-full bg-slate-50 p-4 dark:bg-slate-800/50">
                <Globe className="h-8 w-8 text-neutral" />
              </div>
              <p className="font-medium text-base text-text">
                {content.noActiveTranslations.value}
              </p>
              <p className="text-neutral text-sm">
                {content.startATranslationToSee.value}
              </p>
            </div>
          )}
        </div>
      </RightDrawer>
    </>
  );
};
