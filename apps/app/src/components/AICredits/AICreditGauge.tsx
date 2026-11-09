import type { AICreditBalance } from '@intlayer/backend-contract/ai';
import { cn } from '@intlayer/design-system/utils';
import { TriangleAlert } from 'lucide-react';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { useDate, useNumber } from 'react-intlayer/format';

/** Share of the monthly allowance above which the gauge turns to warning. */
export const WARNING_USAGE_RATIO = 0.8;

/**
 * Ratio of the monthly allowance already used, clamped to `[0, 1]`.
 */
export const getUsageRatio = ({
  usedCredits,
  monthlyCredits,
}: Pick<AICreditBalance, 'usedCredits' | 'monthlyCredits'>): number =>
  monthlyCredits > 0 ? Math.min(1, usedCredits / monthlyCredits) : 1;

type AICreditGaugeProps = {
  balance: AICreditBalance;
};

/**
 * Monthly credit gauge: used / total, remaining, reset date and an
 * exhaustion warning.
 */
export const AICreditGauge: FC<AICreditGaugeProps> = ({ balance }) => {
  const { usedOf, remaining, resetsOn, exhausted } = useIntlayer(
    'organization-ai-credits'
  );
  const formatNumber = useNumber();
  const formatDate = useDate();

  const usageRatio = getUsageRatio(balance);
  const isExhausted = balance.remainingCredits <= 0;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-baseline justify-between gap-2 text-sm">
        <span className="text-text">
          {usedOf({
            used: formatNumber(balance.usedCredits),
            total: formatNumber(balance.monthlyCredits),
          })}
        </span>
        <span className="font-semibold text-text">
          {remaining({ remaining: formatNumber(balance.remainingCredits) })}
        </span>
      </div>
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-neutral/10"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={balance.monthlyCredits}
        aria-valuenow={balance.usedCredits}
      >
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500 ease-out',
            isExhausted
              ? 'bg-error'
              : usageRatio >= WARNING_USAGE_RATIO
                ? 'bg-warning'
                : 'bg-success'
          )}
          style={{ width: `${Math.round(usageRatio * 100)}%` }}
        />
      </div>
      <span className="text-xs text-neutral">
        {resetsOn({ date: formatDate(balance.periodEnd) })}
      </span>
      {isExhausted && (
        <p className="flex items-start gap-2 text-sm text-error">
          <TriangleAlert className="mt-0.5 size-4 shrink-0" />
          {exhausted}
        </p>
      )}
    </div>
  );
};
