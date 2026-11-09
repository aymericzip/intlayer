import type {
  AICreditDailyUsage,
  AICreditFeature,
} from '@intlayer/backend-contract/ai';
import { useGetAICreditUsage } from '@intlayer/design-system/api';
import { Container } from '@intlayer/design-system/container';
import { Loader } from '@intlayer/design-system/loader';
import { SwitchSelector } from '@intlayer/design-system/switch-selector';
import { type FC, type ReactNode, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { useDate, useNumber } from 'react-intlayer/format';
import { AICredits } from './AICredits';

/** Selectable lengths (in days) of the usage series. */
const USAGE_RANGES = [7, 30, 90] as const;

type UsageRange = (typeof USAGE_RANGES)[number];

const DEFAULT_USAGE_RANGE: UsageRange = 30;

type AICreditDay = AICreditDailyUsage['days'][number];

/** `YYYY-MM-DD` (UTC day) → a Date at noon UTC, safe to format in any timezone. */
const parseUTCDay = (day: string): Date => new Date(`${day}T12:00:00Z`);

type UsageSummaryProps = {
  days: AICreditDay[];
};

/** Totals of the period: credits, requests and daily average. */
const UsageSummary: FC<UsageSummaryProps> = ({ days }) => {
  const { totalCredits, totalRequests, dailyAverage } = useIntlayer(
    'ai-usage-dashboard-page'
  );
  const formatNumber = useNumber();

  const creditsSum = days.reduce((sum, day) => sum + day.credits, 0);
  const requestsSum = days.reduce((sum, day) => sum + day.requestCount, 0);

  const statistics = [
    { label: totalCredits, value: formatNumber(creditsSum) },
    { label: totalRequests, value: formatNumber(requestsSum) },
    {
      label: dailyAverage,
      value: formatNumber(days.length > 0 ? creditsSum / days.length : 0, {
        maximumFractionDigits: 2,
      }),
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {statistics.map((statistic) => (
        <Container
          key={statistic.label.value}
          roundedSize="2xl"
          border
          borderColor="neutral"
          className="flex flex-col gap-1 p-4"
        >
          <span className="text-xs text-neutral">{statistic.label}</span>
          <span className="text-2xl font-semibold text-text tabular-nums">
            {statistic.value}
          </span>
        </Container>
      ))}
    </div>
  );
};

type DailyChartProps = {
  days: AICreditDay[];
};

/** One bar per day, scaled on the busiest day of the period. */
const DailyChart: FC<DailyChartProps> = ({ days }) => {
  const { chartTitle } = useIntlayer('ai-usage-dashboard-page');
  const formatNumber = useNumber();
  const formatDate = useDate();

  const maximumCredits = Math.max(0, ...days.map((day) => day.credits));

  return (
    <Container
      roundedSize="2xl"
      border
      borderColor="neutral"
      className="flex flex-col gap-3 p-4"
    >
      <h2 className="text-base font-semibold text-text">{chartTitle}</h2>
      <ul className="flex h-48 items-end gap-0.5">
        {days.map((day) => {
          const heightRatio =
            maximumCredits > 0 ? day.credits / maximumCredits : 0;
          const tooltip = `${formatDate(parseUTCDay(day.date), {
            dateStyle: 'medium',
            timeZone: 'UTC',
          })} · ${formatNumber(day.credits)}`;

          return (
            <li
              key={day.date}
              title={tooltip}
              aria-label={tooltip}
              className="group flex h-full flex-1 items-end"
            >
              <div
                className="w-full rounded-t-sm bg-text/60 transition-colors group-hover:bg-text"
                style={{
                  height: `${Math.round(heightRatio * 100)}%`,
                  minHeight: day.credits > 0 ? 2 : 0,
                }}
              />
            </li>
          );
        })}
      </ul>
      <div className="flex justify-between text-xs text-neutral">
        <span>
          {formatDate(parseUTCDay(days[0].date), {
            dateStyle: 'medium',
            timeZone: 'UTC',
          })}
        </span>
        <span>
          {formatDate(parseUTCDay(days[days.length - 1].date), {
            dateStyle: 'medium',
            timeZone: 'UTC',
          })}
        </span>
      </div>
    </Container>
  );
};

type DailyTableProps = {
  days: AICreditDay[];
};

/** Days with usage, most recent first, with their per-feature split. */
const DailyTable: FC<DailyTableProps> = ({ days }) => {
  const {
    tableTitle,
    dateHeader,
    creditsHeader,
    requestsHeader,
    featuresHeader,
  } = useIntlayer('ai-usage-dashboard-page');
  const { features } = useIntlayer('organization-ai-credits');
  const formatNumber = useNumber();
  const formatDate = useDate();

  const daysWithUsage = days.filter((day) => day.requestCount > 0).reverse();

  return (
    <Container
      roundedSize="2xl"
      border
      borderColor="neutral"
      className="flex flex-col gap-3 overflow-x-auto p-4"
    >
      <h2 className="text-base font-semibold text-text">{tableTitle}</h2>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="text-start text-xs text-neutral">
            <th className="py-2 text-start font-medium">{dateHeader}</th>
            <th className="py-2 text-end font-medium">{creditsHeader}</th>
            <th className="py-2 text-end font-medium">{requestsHeader}</th>
            <th className="py-2 ps-6 text-start font-medium">
              {featuresHeader}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-dashed divide-neutral/50">
          {daysWithUsage.map((day) => (
            <tr key={day.date}>
              <td className="py-2 text-nowrap text-text">
                {formatDate(parseUTCDay(day.date), {
                  dateStyle: 'medium',
                  timeZone: 'UTC',
                })}
              </td>
              <td className="py-2 text-end font-semibold text-text tabular-nums">
                {formatNumber(day.credits)}
              </td>
              <td className="py-2 text-end text-neutral tabular-nums">
                {formatNumber(day.requestCount)}
              </td>
              <td className="py-2 ps-6 text-xs text-neutral">
                {day.byFeature.map((featureUsage) => (
                  <span
                    key={featureUsage.feature}
                    className="me-3 inline-block text-nowrap"
                  >
                    {features[featureUsage.feature as AICreditFeature]}{' '}
                    <span className="text-text tabular-nums">
                      {formatNumber(featureUsage.credits)}
                    </span>
                  </span>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};

/**
 * AI usage page body: current balance, then the day-by-day usage of the
 * selected period (totals, daily chart, per-day breakdown).
 */
export const AICreditUsage: FC = () => {
  const { metadata, rangeLabel, ranges, noUsage } = useIntlayer(
    'ai-usage-dashboard-page'
  );
  const [usageRange, setUsageRange] = useState<UsageRange>(DEFAULT_USAGE_RANGE);
  const { data: usageResponse, isPending } = useGetAICreditUsage({
    days: String(usageRange),
  });

  const days = usageResponse?.data?.days ?? [];
  const hasUsage = days.some((day) => day.requestCount > 0);

  const rangeContentByDays: Record<UsageRange, ReactNode> = {
    7: ranges.last7Days,
    30: ranges.last30Days,
    90: ranges.last90Days,
  };

  return (
    <div className="flex w-full max-w-5xl flex-col gap-6">
      <p className="text-sm text-neutral">{metadata.description}</p>

      <Container
        roundedSize="2xl"
        border
        borderColor="neutral"
        padding="md"
        className="mx-auto w-full max-w-xl"
      >
        <AICredits />
      </Container>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-text">{rangeLabel}</span>
        <SwitchSelector
          choices={USAGE_RANGES.map((range) => ({
            content: rangeContentByDays[range],
            value: range,
          }))}
          value={usageRange}
          onChange={(value) => setUsageRange(value as UsageRange)}
          color="text"
          size="sm"
          className="w-full max-w-md"
        />
      </div>

      {isPending ? (
        <Loader className="mx-auto size-6" />
      ) : hasUsage ? (
        <>
          <UsageSummary days={days} />
          <DailyChart days={days} />
          <DailyTable days={days} />
        </>
      ) : (
        <p className="py-12 text-center text-sm text-neutral">{noUsage}</p>
      )}
    </div>
  );
};
