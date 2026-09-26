import { Button } from '@intlayer/design-system/button';
import { relativeTime } from 'intlayer';
import { History, RotateCw } from 'lucide-react';
import type { FC } from 'react';
import { useIntlayer, useLocale } from 'react-intlayer';

type CachedResultNoticeProps = {
  /** ISO date of the cached audit; nothing is rendered when absent. */
  cachedAt?: string | null;
  /** Runs a fresh audit, bypassing the cache. */
  onRerun: () => void;
  isLoading?: boolean;
};

/** Returns the largest whole unit elapsed since `date` (minutes, hours…). */
const getElapsedUnit = (date: Date): Intl.RelativeTimeFormatUnit => {
  const elapsedSeconds = (Date.now() - date.getTime()) / 1000;
  if (elapsedSeconds < 60) return 'second';
  if (elapsedSeconds < 3600) return 'minute';
  return 'hour';
};

/** Tells the result was replayed from the one-hour cache, with a rerun button. */
export const CachedResultNotice: FC<CachedResultNoticeProps> = ({
  cachedAt,
  onRerun,
  isLoading,
}) => {
  const { cachedResult, cacheDescription, rerun } = useIntlayer(
    'cached-result-notice'
  );
  const { locale } = useLocale();

  if (!cachedAt) return null;

  const cachedDate = new Date(cachedAt);
  const elapsedTime = relativeTime(new Date(), cachedDate, {
    locale,
    unit: getElapsedUnit(cachedDate),
    numeric: 'auto',
  });

  return (
    <div
      className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-neutral/30 border-dashed px-3 py-2 text-left text-neutral text-sm"
      title={cacheDescription.value}
    >
      <span className="flex items-center gap-2">
        <History size={16} />
        {cachedResult({ time: elapsedTime })}
      </span>
      <Button
        label={rerun.value}
        variant="outline"
        color="text"
        size="sm"
        Icon={RotateCw}
        disabled={isLoading}
        onClick={onRerun}
      >
        {rerun}
      </Button>
    </div>
  );
};
