'use client';

import {
  Button,
  Loader,
  PopoverStatic,
  RightDrawer,
} from '@intlayer/design-system';
import { cn } from '@utils/cn';
import { AlertCircle, CheckCircle2, Globe, X, Zap } from 'lucide-react';
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
    case 'completed':
      return <CheckCircle2 className="size-4 text-success" />;
    case 'failed':
      return <X className="size-4 text-error" />;
    default:
      return <Loader className="size-4" />;
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
      <PopoverStatic identifier="translation-status">
        <Button
          onClick={() => setIsOpen(true)}
          type="button"
          variant="hoverable"
          label={content.translationStatus.value}
          Icon={Zap}
          isLoading={isProcessing}
          disabled={false}
          size="icon-lg"
        >
          <div className="relative">
            {hasUnseenChanges && (
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-error ring-2" />
            )}
          </div>
        </Button>

        <PopoverStatic.Detail identifier="translation-status" xAlign="end">
          <span className="flex gap-4 text-nowrap py-2 pr-2 pl-4 text-neutral text-sm">
            {content.translationStatusButtonDescription}
          </span>
        </PopoverStatic.Detail>
      </PopoverStatic>

      <RightDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        identifier="translation-status"
        title={
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            <span>{content.translationStatus1}</span>
          </div>
        }
      >
        <div className="space-y-4 p-1">
          {hasConnectionError && (
            <div className="flex items-center gap-2 rounded-md bg-amber-50 p-3 text-sm text-warning">
              <AlertCircle className="size-4" />
              {content.connectionLostReconnecting}
            </div>
          )}

          {Object.values(jobs)
            .sort((a, b) => b.jobId.localeCompare(a.jobId))
            .map((job) => (
              <div
                key={job.jobId}
                className="flex flex-col gap-3 rounded-xl border border-neutral-200 bg-background p-4 shadow-sm transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800/50"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-neutral-100 p-2 dark:bg-neutral-800">
                      {getStatusIcon(job.state)}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-neutral-500 text-xs dark:text-neutral-400">
                        {content.jobId}
                      </span>
                      <span className="font-mono text-neutral-700 text-xs dark:text-neutral-200">
                        {job.jobId}
                      </span>
                    </div>
                  </div>
                  <div
                    className={cn(
                      'rounded-full bg-neutral px-2 py-1 font-medium text-xs capitalize',
                      job.state === 'completed' &&
                        'bg-success-100 text-success/30',
                      job.state === 'failed' &&
                        'bg-red-100 text-error dark:text-red-400'
                    )}
                  >
                    {job.state}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-neutral-500 text-xs dark:text-neutral-400">
                    <span>Progress</span>
                    <span>{Math.round(job.progress)}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
                    <div
                      className={cn(
                        'h-full bg-blue-500 transition-all duration-500 ease-out',
                        job.state === 'completed' && 'bg-success',
                        job.state === 'failed' && 'bg-error'
                      )}
                      style={{ width: `${Math.max(5, job.progress)}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          {Object.keys(jobs).length === 0 && !hasConnectionError && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-3 rounded-full bg-neutral/20 p-4">
                <Globe className="h-8 w-8 text-neutral" />
              </div>
              <p className="font-medium text-base text-text">
                {content.noActiveTranslations}
              </p>
              <p className="text-neutral text-sm">
                {content.startATranslationToSee}
              </p>
            </div>
          )}
        </div>
      </RightDrawer>
    </>
  );
};
