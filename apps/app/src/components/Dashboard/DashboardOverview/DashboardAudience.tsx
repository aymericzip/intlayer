import type {
  AudienceGranularity,
  AudienceRange,
  AudienceSeriesPoint,
  AudienceStats,
} from '@intlayer/backend-contract/analytics';
import {
  useGetAnalyticsAudience,
  useGetPageMetadata,
  useSession,
} from '@intlayer/design-system/api';
import { Container } from '@intlayer/design-system/container';
import { ExpandCollapse } from '@intlayer/design-system/expand-collapse';
import { Loader } from '@intlayer/design-system/loader';
import {
  SwitchSelector,
  type SwitchSelectorChoices,
} from '@intlayer/design-system/switch-selector';
import { getLocaleName } from 'intlayer';
import {
  CalendarDays,
  ExternalLink,
  Eye,
  FileText,
  Globe,
  MapPin,
  Users,
} from 'lucide-react';
import {
  type FC,
  lazy,
  type ReactNode,
  Suspense,
  useMemo,
  useState,
} from 'react';
import { useIntlayer, useLocale } from 'react-intlayer';
import {
  countryToFlag,
  getCountryName,
  UNKNOWN_COUNTRY_CODE,
  WORLD_MAP_HEIGHT,
  WORLD_MAP_WIDTH,
} from './WorldMap/worldMap.utils';

/** The map ships ~70 KB of country outlines, so it loads in its own chunk. */
const WorldMap = lazy(() =>
  import('./WorldMap/WorldMap').then((module) => ({
    default: module.WorldMap,
  }))
);

/** Selectable rolling windows for the audience report, shortest first. */
const RANGE_OPTIONS = [
  'live',
  '1h',
  '24h',
  '7d',
  '30d',
  '90d',
  '6mo',
  '1y',
  '3y',
] as const satisfies readonly AudienceRange[];

/** How often the `live` view polls for fresh activity. */
const LIVE_REFRESH_INTERVAL_MS = 15_000;

/** Which breakdown tab is active. */
type BreakdownTab = 'locales' | 'location' | 'pages';

/** Pulsing dot marking the realtime view. */
const LiveDot: FC = () => (
  <span className="relative flex size-2 shrink-0" aria-hidden>
    <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-75" />
    <span className="relative inline-flex size-2 rounded-full bg-success" />
  </span>
);

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
    <span className="flex items-center gap-2 text-xs text-neutral">
      {icon}
      {label}
    </span>
    <span className="text-2xl font-semibold text-text">{value}</span>
    {hint && <span className="text-xs text-neutral">{hint}</span>}
  </Container>
);

type EvolutionChartProps = {
  series: AudienceSeriesPoint[];
  /** `area` for trends, `bars` for the per-minute live activity. */
  variant: 'area' | 'bars';
  granularity: AudienceGranularity;
  locale: string;
  usersLabel: string;
  maxLabel: string;
  chartLabel: string;
};

/**
 * Formats a series bucket for the axis ends. Sub-day buckets carry a time and
 * read as a clock value; day and week buckets as a date; month buckets as a
 * month and year.
 */
const formatBucket = (
  bucket: string | undefined,
  granularity: AudienceGranularity,
  locale: string
): string => {
  if (!bucket) return '';

  const isSubDay = granularity === 'minute' || granularity === 'hour';
  const date = new Date(isSubDay ? `${bucket}:00.000Z` : `${bucket}T00:00:00Z`);

  if (Number.isNaN(date.getTime())) return '';

  if (isSubDay) {
    return date.toLocaleTimeString(locale, {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  if (granularity === 'month') {
    return date.toLocaleDateString(locale, {
      month: 'short',
      year: 'numeric',
    });
  }

  return date.toLocaleDateString(locale, { month: 'short', day: 'numeric' });
};

/** Share of a bar slot left empty between two bars. */
const BAR_GAP_RATIO = 0.25;

/**
 * Lightweight inline SVG chart of distinct visitors, as an area or as bars.
 * Dependency-free and theme-aware (uses the `text` token via `currentColor`).
 */
const EvolutionChart: FC<EvolutionChartProps> = ({
  series,
  variant,
  granularity,
  locale,
  usersLabel,
  maxLabel,
  chartLabel,
}) => {
  const width = 600;
  const height = 160;
  const paddingTop = 12;
  const paddingBottom = 18;

  const usableHeight = height - paddingTop - paddingBottom;

  const { areaPath, linePath, maxUsers, peak } = useMemo(() => {
    const values = series.map((point) => point.users);
    const max = Math.max(1, ...values);
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
  }, [series, usableHeight]);

  const barSlotWidth = width / Math.max(1, series.length);

  const firstBucket = series[0]?.bucket;
  const lastBucket = series[series.length - 1]?.bucket;

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-1">
      <div className="flex items-start justify-between text-xs text-neutral">
        <span>
          {peak} {usersLabel}
        </span>
        <span className="text-neutral/70">
          {maxLabel} {maxUsers}
        </span>
      </div>
      {/* Absolutely-positioned SVG so the chart fills whatever height the row
          gets from its tallest sibling instead of imposing its own. */}
      <div className="relative min-h-40 flex-1">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="absolute inset-0 h-full w-full text-text"
          preserveAspectRatio="none"
          role="img"
          aria-label={chartLabel}
        >
          <defs>
            <linearGradient id="audienceArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
          </defs>
          {variant === 'bars' &&
            series.map((point, index) => {
              const barHeight = usableHeight * (point.users / maxUsers);

              return (
                <rect
                  key={point.bucket}
                  x={index * barSlotWidth + (barSlotWidth * BAR_GAP_RATIO) / 2}
                  y={height - paddingBottom - barHeight}
                  width={barSlotWidth * (1 - BAR_GAP_RATIO)}
                  height={barHeight}
                  rx={2}
                  className="fill-current opacity-70"
                >
                  <title>
                    {`${formatBucket(point.bucket, granularity, locale)} · ${point.users} ${usersLabel}`}
                  </title>
                </rect>
              );
            })}
          {variant === 'area' && areaPath && (
            <path d={areaPath} fill="url(#audienceArea)" />
          )}
          {variant === 'area' && linePath && (
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
      </div>
      <div className="flex items-center justify-between text-xs text-neutral">
        <span>{formatBucket(firstBucket, granularity, locale)}</span>
        <span>{formatBucket(lastBucket, granularity, locale)}</span>
      </div>
    </div>
  );
};

/** Collapsed height (px) of a breakdown list before the "show all" toggle appears. */
const BREAKDOWN_COLLAPSED_HEIGHT = 400;

type BreakdownListProps = {
  rows: { label: ReactNode; users: number; views: number }[];
  usersLabel: string;
  viewsLabel: string;
  metric: 'users' | 'views';
};

/**
 * Formats the counters shown next to a breakdown row. A dimension the
 * breakdown cannot carry is left out rather than printed as a zero — pages are
 * counted in views only, countries in visitors only.
 */
const formatRowCounters = (
  row: { users: number; views: number },
  usersLabel: string,
  viewsLabel: string,
  metric: 'users' | 'views'
): string[] =>
  (
    [
      ['users', row.users, usersLabel],
      ['views', row.views, viewsLabel],
    ] as const
  )
    .filter(([dimension, value]) => value > 0 || dimension === metric)
    .map(([, value, label]) => `${value.toLocaleString()} ${label}`);

/**
 * Ranked horizontal-bar list for a breakdown tab. Long lists (countries can run
 * to dozens of rows) collapse behind a "show all" toggle.
 */
const BreakdownList: FC<BreakdownListProps> = ({
  rows,
  usersLabel,
  viewsLabel,
  metric,
}) => {
  const max = Math.max(1, ...rows.map((row) => row[metric]));

  return (
    <ExpandCollapse minHeight={BREAKDOWN_COLLAPSED_HEIGHT}>
      <ul className="flex flex-col gap-3 pb-6">
        {rows.map((row, index) => {
          const value = row[metric];
          const ratio = value / max;

          return (
            <li
              // oxlint-disable-next-line react/no-array-index-key -- rows are stable per fetch and labels can repeat
              key={index}
              className="flex flex-col gap-1"
            >
              <div className="flex items-start justify-between gap-2 text-sm">
                <div className="flex min-w-0 flex-1 items-start gap-2 text-text">
                  {row.label}
                </div>
                <span className="shrink-0 text-xs text-neutral">
                  {formatRowCounters(row, usersLabel, viewsLabel, metric).join(
                    ' · '
                  )}
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral/10">
                <div
                  className="h-full min-w-1 rounded-full bg-text/60 transition-all duration-500 ease-out"
                  style={{ width: `${Math.round(ratio * 100)}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </ExpandCollapse>
  );
};

type PageBreakdownRowProps = {
  pageUrl: string;
  applicationURL?: string | null;
};

/**
 * Breakdown row component for a page: dynamically loads and displays the title
 * and meta description (cached for 24h), and provides a link to the page.
 */
const PageBreakdownRow: FC<PageBreakdownRowProps> = ({
  pageUrl,
  applicationURL,
}) => {
  const fullUrl = useMemo(() => {
    if (pageUrl.startsWith('http://') || pageUrl.startsWith('https://')) {
      return pageUrl;
    }
    if (applicationURL) {
      try {
        return new URL(pageUrl, applicationURL).href;
      } catch {
        const cleanBase = applicationURL.replace(/\/$/, '');
        const cleanPath = pageUrl.startsWith('/') ? pageUrl : `/${pageUrl}`;
        return `${cleanBase}${cleanPath}`;
      }
    }
    return pageUrl;
  }, [pageUrl, applicationURL]);

  const { data } = useGetPageMetadata(fullUrl || pageUrl);
  const metadata = data?.data;
  const title = metadata?.title?.trim();
  const description = metadata?.description?.trim();

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-0.5">
      <div className="flex min-w-0 items-center gap-1.5">
        <FileText className="size-3.5 shrink-0 text-neutral" />
        <a
          href={fullUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex min-w-0 items-center gap-1 font-medium text-text hover:underline"
          title={fullUrl}
        >
          <span className="truncate">{title || pageUrl}</span>
          <ExternalLink className="size-3 shrink-0 text-neutral opacity-60 transition-opacity group-hover:opacity-100" />
        </a>
        {title && (
          <span
            className="max-w-40 shrink-0 truncate font-mono text-xs text-neutral"
            title={pageUrl}
          >
            {pageUrl}
          </span>
        )}
      </div>
      {description && (
        <p
          className="line-clamp-2 ps-5 text-xs leading-relaxed text-neutral"
          title={description}
        >
          {description}
        </p>
      )}
    </div>
  );
};

/**
 * Audience analytics section: distinct visitors (today / 7d / range), page
 * views, a visitor-evolution graph, Locales / Location / Pages breakdown tabs,
 * and a world map of visitors. The `live` range polls every 15s and shows
 * sessions active in the last 30 minutes, per minute.
 * Backed by `@intlayer/analytics` ingestion; renders an empty state until data
 * is collected.
 */
export const DashboardAudience: FC = () => {
  const content = useIntlayer('dashboard-audience');
  const { locale } = useLocale();
  const { session } = useSession();
  const applicationURL =
    session?.project?.configuration?.editor?.applicationURL ?? null;
  const [range, setRange] = useState<AudienceRange>('30d');
  const [tab, setTab] = useState<BreakdownTab>('locales');

  const isLive = range === 'live';
  const { data, isLoading } = useGetAnalyticsAudience(range, {
    refetchInterval: isLive ? LIVE_REFRESH_INTERVAL_MS : false,
  });
  const audience = data?.data as AudienceStats | undefined;

  const rangeLabels: Record<AudienceRange, string> = {
    live: content.rangeLive.value,
    '1h': content.rangeLast1Hour.value,
    '24h': content.rangeLast24Hours.value,
    '7d': content.rangeLast7Days.value,
    '30d': content.rangeLast30Days.value,
    '90d': content.rangeLast90Days.value,
    '6mo': content.rangeLast6Months.value,
    '1y': content.rangeLast1Year.value,
    '3y': content.rangeLast3Years.value,
  };

  const rangeChoices: SwitchSelectorChoices<AudienceRange> = RANGE_OPTIONS.map(
    (option) => ({
      content: (
        <span className="flex items-center gap-1.5 whitespace-nowrap">
          {option === 'live' && <LiveDot />}
          {rangeLabels[option]}
        </span>
      ),
      value: option,
    })
  );

  const breakdownChoices = [
    {
      content: (
        <span className="flex items-center justify-center gap-1.5 whitespace-nowrap">
          <Globe className="size-3.5" />
          {content.tabLocales}
        </span>
      ),
      value: 'locales',
    },
    {
      content: (
        <span className="flex items-center justify-center gap-1.5 whitespace-nowrap">
          <MapPin className="size-3.5" />
          {content.tabLocation}
        </span>
      ),
      value: 'location',
    },
    {
      content: (
        <span className="flex items-center justify-center gap-1.5 whitespace-nowrap">
          <FileText className="size-3.5" />
          {content.tabPages}
        </span>
      ),
      value: 'pages',
    },
  ] as SwitchSelectorChoices<BreakdownTab>;

  const localeRows = useMemo(
    () =>
      (audience?.byLocale ?? []).map((row) => ({
        label: (
          <>
            <Globe className="size-3.5 shrink-0 text-neutral" />
            <span className="truncate">{getLocaleName(row.key, locale)}</span>
            <span className="shrink-0 text-xs text-neutral">{row.key}</span>
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
              {row.key === UNKNOWN_COUNTRY_CODE
                ? content.unknownCountry
                : getCountryName(row.key, locale)}
            </span>
            <span className="shrink-0 text-xs text-neutral">{row.key}</span>
          </>
        ),
        users: row.users,
        views: row.views,
      })),
    [audience?.byCountry, content.unknownCountry, locale]
  );

  const pageRows = useMemo(
    () =>
      (audience?.byPage ?? []).map((row) => ({
        label: (
          <PageBreakdownRow pageUrl={row.key} applicationURL={applicationURL} />
        ),
        users: row.users,
        views: row.views,
      })),
    [audience?.byPage, applicationURL]
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
          <h2 className="text-base font-semibold text-text">{content.title}</h2>
          <span className="text-xs text-neutral">{content.subtitle}</span>
        </div>
        {/* Eight ranges overflow a narrow header — scroll rather than wrap. */}
        <div className="-mx-1 max-w-full overflow-x-auto px-1">
          <SwitchSelector
            choices={rangeChoices}
            value={range}
            onChange={setRange}
            color="text"
            size="sm"
            className="w-max"
          />
        </div>
      </div>

      {isLoading && !audience ? (
        <div className="flex flex-1 items-center justify-center p-10">
          <Loader />
        </div>
      ) : !hasData ? (
        <Container
          className="m-auto flex items-center justify-center p-10"
          roundedSize="2xl"
          transparency="none"
          border
          borderColor="neutral"
        >
          <p className="max-w-sm text-center text-sm text-neutral">
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
              hint={
                isLive
                  ? content.liveActiveUsersHint
                  : `${content.statActiveUsersHint} (${rangeLabels[range]})`
              }
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
              className="flex min-h-0 flex-2 flex-col gap-3 p-5"
              roundedSize="2xl"
              transparency="none"
              border
              borderColor="neutral"
            >
              <h3 className="flex items-center gap-2 text-sm font-semibold text-text">
                {isLive && <LiveDot />}
                {isLive ? content.liveEvolutionTitle : content.evolutionTitle}
              </h3>
              <EvolutionChart
                series={audience.series}
                variant={isLive ? 'bars' : 'area'}
                granularity={audience.granularity}
                locale={locale}
                usersLabel={content.usersLabel.value}
                maxLabel={content.maxLabel.value}
                chartLabel={
                  isLive
                    ? content.liveEvolutionChartLabel.value
                    : content.evolutionChartLabel.value
                }
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
              <SwitchSelector
                choices={breakdownChoices}
                value={tab}
                onChange={setTab}
                color="text"
                size="sm"
                className="w-full"
              />

              {tab === 'locales' && (
                <BreakdownList
                  rows={localeRows}
                  usersLabel={content.usersLabel.value}
                  viewsLabel={content.viewsLabel.value}
                  metric="views"
                />
              )}
              {tab === 'location' && (
                <BreakdownList
                  rows={countryRows}
                  usersLabel={content.usersLabel.value}
                  viewsLabel={content.viewsLabel.value}
                  metric="users"
                />
              )}
              {tab === 'pages' && (
                <BreakdownList
                  rows={pageRows}
                  usersLabel={content.usersLabel.value}
                  viewsLabel={content.viewsLabel.value}
                  metric="views"
                />
              )}
            </Container>
          </div>

          {/* Visitor location map */}
          <Container
            className="flex flex-col gap-3 p-5"
            roundedSize="2xl"
            transparency="none"
            border
            borderColor="neutral"
          >
            <h3 className="text-sm font-semibold text-text">
              {content.mapTitle}
            </h3>
            {/* Placeholder keeps the map's aspect ratio while its chunk loads. */}
            <Suspense
              fallback={
                <div
                  className="flex w-full items-center justify-center"
                  style={{
                    aspectRatio: `${WORLD_MAP_WIDTH} / ${WORLD_MAP_HEIGHT}`,
                  }}
                >
                  <Loader />
                </div>
              }
            >
              <WorldMap
                rows={audience.byCountry}
                locale={locale}
                usersLabel={content.usersLabel.value}
                chartLabel={content.mapChartLabel.value}
              />
            </Suspense>
          </Container>
        </>
      )}
    </div>
  );
};
