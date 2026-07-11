import type { AudienceSeriesPoint, AudienceStats } from '@intlayer/backend';
import { useGetAnalyticsAudience } from '@intlayer/design-system/api';
import { Container } from '@intlayer/design-system/container';
import { Loader } from '@intlayer/design-system/loader';
import { cn } from '@intlayer/design-system/utils';
import { getLocaleName } from 'intlayer';
import { CalendarDays, Eye, Globe, MapPin, Users } from 'lucide-react';
import { type FC, type ReactNode, useMemo, useState } from 'react';
import { useIntlayer, useLocale } from 'react-intlayer';

/** Selectable rolling windows for the audience report. */
const RANGE_OPTIONS = [7, 30, 90] as const;
type RangeOption = (typeof RANGE_OPTIONS)[number];

/** Which breakdown tab is active. */
type BreakdownTab = 'locales' | 'location';

/**
 * Converts an ISO 3166-1 alpha-2 country code to its flag emoji.
 * Returns a globe for unknown / invalid codes.
 */
const countryToFlag = (code: string): string => {
  if (!/^[A-Za-z]{2}$/.test(code) || code.toUpperCase() === 'ZZ') return '🌐';
  const base = 0x1f1e6;
  const chars = code
    .toUpperCase()
    .split('')
    .map((char) => base + (char.charCodeAt(0) - 65));
  return String.fromCodePoint(...chars);
};

type StatTileProps = {
  icon: ReactNode;
  label: ReactNode;
  value: ReactNode;
  hint?: ReactNode;
};

/** A single headline metric tile. */
const StatTile: FC<StatTileProps> = ({ icon, label, value, hint }) => (
  <Container
    className="flex flex-1 flex-col gap-2 p-4"
    roundedSize="2xl"
    transparency="none"
    border
    borderColor="neutral"
  >
    <span className="flex items-center gap-2 text-neutral text-xs">
      {icon}
      {label}
    </span>
    <span className="font-semibold text-2xl text-text">{value}</span>
    {hint && <span className="text-neutral text-xs">{hint}</span>}
  </Container>
);

type EvolutionChartProps = {
  series: AudienceSeriesPoint[];
  locale: string;
  usersLabel: string;
};

/**
 * Lightweight inline SVG area chart of daily distinct visitors. Dependency-free
 * and theme-aware (uses the `primary` token via `currentColor`).
 */
const EvolutionChart: FC<EvolutionChartProps> = ({
  series,
  locale,
  usersLabel,
}) => {
  const width = 600;
  const height = 160;
  const paddingTop = 12;
  const paddingBottom = 18;

  const { areaPath, linePath, maxUsers, peak } = useMemo(() => {
    const values = series.map((point) => point.users);
    const max = Math.max(1, ...values);
    const usableHeight = height - paddingTop - paddingBottom;
    const step = series.length > 1 ? width / (series.length - 1) : 0;

    const toPoint = (value: number, index: number): [number, number] => {
      const x = series.length > 1 ? index * step : width / 2;
      const y = paddingTop + usableHeight * (1 - value / max);
      return [x, y];
    };

    const points = values.map(toPoint);
    const line = points
      .map(([x, y], index) => `${index === 0 ? 'M' : 'L'}${x},${y}`)
      .join(' ');
    const area =
      points.length > 0
        ? `${line} L${points[points.length - 1][0]},${height - paddingBottom} L${points[0][0]},${height - paddingBottom} Z`
        : '';

    const peakValue = Math.max(...values, 0);

    return { areaPath: area, linePath: line, maxUsers: max, peak: peakValue };
  }, [series]);

  const firstDay = series[0]?.day;
  const lastDay = series[series.length - 1]?.day;

  const formatDay = (day?: string): string =>
    day
      ? new Date(`${day}T00:00:00Z`).toLocaleDateString(locale, {
          month: 'short',
          day: 'numeric',
        })
      : '';

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-start justify-between text-neutral text-xs">
        <span>
          {peak} {usersLabel}
        </span>
        <span className="text-neutral/70">max {maxUsers}</span>
      </div>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-40 w-full text-primary"
        preserveAspectRatio="none"
        role="img"
        aria-label="Visitor evolution chart"
      >
        <defs>
          <linearGradient id="audienceArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
        {areaPath && <path d={areaPath} fill="url(#audienceArea)" />}
        {linePath && (
          <path
            d={linePath}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        )}
      </svg>
      <div className="flex items-center justify-between text-neutral text-xs">
        <span>{formatDay(firstDay)}</span>
        <span>{formatDay(lastDay)}</span>
      </div>
    </div>
  );
};

type BreakdownListProps = {
  rows: { label: ReactNode; users: number; views: number }[];
  usersLabel: string;
  viewsLabel: string;
  metric: 'users' | 'views';
};

/** Ranked horizontal-bar list for a breakdown tab. */
const BreakdownList: FC<BreakdownListProps> = ({
  rows,
  usersLabel,
  viewsLabel,
  metric,
}) => {
  const max = Math.max(1, ...rows.map((row) => row[metric]));

  return (
    <ul className="flex flex-col gap-3">
      {rows.map((row, index) => {
        const value = row[metric];
        const ratio = value / max;

        return (
          <li
            // biome-ignore lint/suspicious/noArrayIndexKey: rows are stable per fetch and labels can repeat
            key={index}
            className="flex flex-col gap-1"
          >
            <div className="flex items-center justify-between gap-2 text-sm">
              <span className="flex min-w-0 items-center gap-2 text-text">
                {row.label}
              </span>
              <span className="shrink-0 text-neutral text-xs">
                {row.users.toLocaleString()} {usersLabel} ·{' '}
                {row.views.toLocaleString()} {viewsLabel}
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral/10">
              <div
                className="h-full min-w-1 rounded-full bg-primary/60 transition-all duration-500 ease-out"
                style={{ width: `${Math.round(ratio * 100)}%` }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
};

/**
 * Audience analytics section: distinct visitors (today / 7d / range), page
 * views, a visitor-evolution graph, and Locales / Location breakdown tabs.
 * Backed by `@intlayer/analytics` ingestion; renders an empty state until data
 * is collected.
 */
export const DashboardAudience: FC = () => {
  const content = useIntlayer('dashboard-audience');
  const { locale } = useLocale();
  const [range, setRange] = useState<RangeOption>(30);
  const [tab, setTab] = useState<BreakdownTab>('locales');

  const { data, isLoading } = useGetAnalyticsAudience(range);
  const audience = data?.data as AudienceStats | undefined;

  const rangeLabels: Record<RangeOption, string> = {
    7: content.rangeLast7Days.value,
    30: content.rangeLast30Days.value,
    90: content.rangeLast90Days.value,
  };

  const localeRows = useMemo(
    () =>
      (audience?.byLocale ?? []).map((row) => ({
        label: (
          <>
            <Globe className="size-3.5 shrink-0 text-neutral" />
            <span className="truncate">{getLocaleName(row.key, locale)}</span>
            <span className="shrink-0 text-neutral text-xs">{row.key}</span>
          </>
        ),
        users: row.users,
        views: row.views,
      })),
    [audience?.byLocale, locale]
  );

  const countryRows = useMemo(
    () =>
      (audience?.byCountry ?? []).map((row) => ({
        label: (
          <>
            <span aria-hidden>{countryToFlag(row.key)}</span>
            <span className="truncate">
              {row.key === 'ZZ' ? content.unknownCountry : row.key}
            </span>
          </>
        ),
        users: row.users,
        views: row.views,
      })),
    [audience?.byCountry, content.unknownCountry]
  );

  const hasData =
    audience &&
    (audience.usersInRange > 0 ||
      audience.viewsInRange > 0 ||
      audience.usersToday > 0);

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4">
      {/* Header + range selector */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-col">
          <h2 className="font-semibold text-base text-text">{content.title}</h2>
          <span className="text-neutral text-xs">{content.subtitle}</span>
        </div>
        <div className="flex items-center gap-1 rounded-lg bg-neutral/10 p-1">
          {RANGE_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setRange(option)}
              className={cn(
                'rounded-md px-3 py-1 font-medium text-xs transition-colors',
                range === option
                  ? 'bg-background text-text shadow-sm'
                  : 'text-neutral hover:text-text'
              )}
            >
              {rangeLabels[option]}
            </button>
          ))}
        </div>
      </div>

      {isLoading && !audience ? (
        <div className="flex flex-1 items-center justify-center p-10">
          <Loader />
        </div>
      ) : !hasData ? (
        <Container
          className="m-auto flex max-w-xl items-center justify-center p-10"
          roundedSize="2xl"
          transparency="none"
          border
          borderColor="neutral"
        >
          <p className="max-w-sm text-center text-neutral text-sm">
            {content.noData}
          </p>
        </Container>
      ) : (
        <>
          {/* Stat tiles */}
          <div className="flex flex-wrap gap-4">
            <StatTile
              icon={<Users className="size-4" />}
              label={content.statActiveUsers}
              value={audience.usersInRange.toLocaleString()}
              hint={`${content.statActiveUsersHint} (${rangeLabels[range]})`}
            />
            <StatTile
              icon={<CalendarDays className="size-4" />}
              label={content.statToday}
              value={audience.usersToday.toLocaleString()}
            />
            <StatTile
              icon={<Users className="size-4" />}
              label={content.statLast7Days}
              value={audience.usersLast7Days.toLocaleString()}
            />
            <StatTile
              icon={<Eye className="size-4" />}
              label={content.statViews}
              value={audience.viewsInRange.toLocaleString()}
            />
          </div>

          <div className="flex flex-col gap-4 lg:flex-row">
            {/* Evolution graph */}
            <Container
              className="flex flex-2 flex-col gap-3 p-5"
              roundedSize="2xl"
              transparency="none"
              border
              borderColor="neutral"
            >
              <h3 className="font-semibold text-sm text-text">
                {content.evolutionTitle}
              </h3>
              <EvolutionChart
                series={audience.series}
                locale={locale}
                usersLabel={content.usersLabel.value}
              />
            </Container>

            {/* Locales / Location tabs */}
            <Container
              className="flex flex-1 flex-col gap-4 p-5"
              roundedSize="2xl"
              transparency="none"
              border
              borderColor="neutral"
            >
              <div className="flex items-center gap-1 rounded-lg bg-neutral/10 p-1">
                <button
                  type="button"
                  onClick={() => setTab('locales')}
                  className={cn(
                    'flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-1 font-medium text-xs transition-colors',
                    tab === 'locales'
                      ? 'bg-background text-text shadow-sm'
                      : 'text-neutral hover:text-text'
                  )}
                >
                  <Globe className="size-3.5" />
                  {content.tabLocales}
                </button>
                <button
                  type="button"
                  onClick={() => setTab('location')}
                  className={cn(
                    'flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-1 font-medium text-xs transition-colors',
                    tab === 'location'
                      ? 'bg-background text-text shadow-sm'
                      : 'text-neutral hover:text-text'
                  )}
                >
                  <MapPin className="size-3.5" />
                  {content.tabLocation}
                </button>
              </div>

              {tab === 'locales' ? (
                <BreakdownList
                  rows={localeRows}
                  usersLabel={content.usersLabel.value}
                  viewsLabel={content.viewsLabel.value}
                  metric="views"
                />
              ) : (
                <BreakdownList
                  rows={countryRows}
                  usersLabel={content.usersLabel.value}
                  viewsLabel={content.viewsLabel.value}
                  metric="users"
                />
              )}
            </Container>
          </div>
        </>
      )}
    </div>
  );
};
