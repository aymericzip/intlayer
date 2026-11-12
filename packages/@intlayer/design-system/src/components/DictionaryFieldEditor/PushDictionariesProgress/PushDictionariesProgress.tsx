'use client';

import type { PushDictionariesProgressState } from '@api/pushDictionariesInBatches';
import { cn } from '@utils/cn';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';

export type PushDictionariesProgressProps = {
  progress: PushDictionariesProgressState;
  className?: string;
};

/**
 * Advancement of a batched dictionary push: the settled count, a progress bar,
 * then the dictionaries in flight and the failed ones.
 */
export const PushDictionariesProgress: FC<PushDictionariesProgressProps> = ({
  progress,
  className,
}) => {
  const content = useIntlayer('push-dictionaries-progress');
  const { totalCount, settledCount, pushingKeys, failedKeys } = progress;
  const percentage =
    totalCount === 0 ? 100 : Math.round((settledCount / totalCount) * 100);

  return (
    <div className={cn('flex flex-col gap-2 text-sm', className)}>
      <span className="font-medium">
        {content.pushedCount({ settled: settledCount, total: totalCount })}
      </span>
      <div
        className="h-1 w-full overflow-hidden rounded-full bg-neutral/20"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={totalCount}
        aria-valuenow={settledCount}
      >
        <div
          className="h-full rounded-full bg-text transition-[width]"
          style={{ width: `${percentage}%` }}
        />
      </div>
      {pushingKeys.length > 0 && (
        <div className="flex flex-col gap-1">
          <span className="text-neutral">{content.pushing}</span>
          <ul className="max-h-40 list-inside list-disc overflow-y-auto">
            {pushingKeys.map((key) => (
              <li key={key} className="truncate">
                {key}
              </li>
            ))}
          </ul>
        </div>
      )}
      {failedKeys.length > 0 && (
        <div className="flex flex-col gap-1 text-error">
          <span>{content.failed}</span>
          <ul className="max-h-40 list-inside list-disc overflow-y-auto">
            {failedKeys.map((key) => (
              <li key={key} className="truncate">
                {key}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
