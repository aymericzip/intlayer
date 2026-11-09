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
import {
  SwitchSelector,
  type SwitchSelectorChoices,
} from '@intlayer/design-system/switch-selector';
import { cn } from '@intlayer/design-system/utils';
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
  type PointerEvent,
  type ReactNode,
  Suspense,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useIntlayer, useLocale } from 'react-intlayer';
import { Skeleton } from '#components/Skeleton';
import { getAvailableAudienceRanges } from './audienceRanges';
import { buildSmoothLinePath } from './smoothLinePath';
import { useAnimatedRatios } from './useAnimatedRatios';
import {
  EMPTY_LIVE_VISITOR_SELECTION,
  getHighlightedMinutes,
  type LiveVisitorSelection,
  selectLiveMinute,
} from './WorldMap/liveVisitorSelection';
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

/** Averaged page-to-page user flow (Sankey diagram). */
const PageFlow = lazy(() =>
  import('./PageFlow/PageFlow').then((module) => ({
    default: module.PageFlow,
  }))
);

/** Most visited pages offered as starting points of the user flow. */
const MAX_FLOW_START_OPTIONS = 20;

/** Live map (dots, zoom, visitor journeys) — only loaded in the live view. */
const LiveVisitorMap = lazy(() =>
  import('./WorldMap/LiveVisitorMap').then((module) => ({
    default: module.LiveVisitorMap,
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
  /** Buckets kept opaque, the others are dimmed; `null` dims none. */
  highlightedBuckets?: Set<string> | null;
  /** Makes non-empty bars clickable. */
  onBucketSelect?: (bucket: string) => void;
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

/**
 * Formats a series bucket in full for the hover cursor: a date (with the time
 * for sub-day buckets), or a month and year for month buckets.
 */
const formatBucketDetail = (
  bucket: string,
  granularity: AudienceGranularity,
  locale: string
): string => {
  const isSubDay = granularity === 'minute' || granularity === 'hour';
  const date = new Date(isSubDay ? `${bucket}:00.000Z` : `${bucket}T00:00:00Z`);

  if (Number.isNaN(date.getTime())) return bucket;

  if (isSubDay) {
    return date.toLocaleString(locale, {
      dateStyle: 'short',
      timeStyle: 'short',
    });
  }

  if (granularity === 'month') {
    return date.toLocaleDateString(locale, { month: 'long', year: 'numeric' });
  }

  return date.toLocaleDateString(locale, { dateStyle: 'short' });
};

/** Horizontal share of the chart past which the cursor label flips inward. */
const CURSOR_LABEL_EDGE_RATIO = 0.15;

/** Share of a bar slot left empty between two bars. */
const BAR_GAP_RATIO = 0.25;

/** Bar opacity: default, emphasized, dimmed by a selection. */
const BAR_OPACITY = 0.7;
const BAR_HIGHLIGHTED_OPACITY = 0.9;
const BAR_DIMMED_OPACITY = 0.15;

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
  highlightedBuckets = null,
  onBucketSelect,
}) => {
  const width = 600;
  const height = 160;
  const paddingTop = 12;
  const paddingBottom = 18;

  const usableHeight = height - paddingTop - paddingBottom;
  // Unique per instance: two charts must not share one gradient definition
  // (useId's `:`/`«` characters are not valid inside `url(#…)`)
  const areaGradientId = `audience-area-${useId().replace(/[^\w-]/g, '')}`;

  const { targetRatios, maxUsers, peak } = useMemo(() => {
    const values = series.map((point) => point.users);
    const max = Math.max(1, ...values);

    return {
      targetRatios: values.map((value) => value / max),
      maxUsers: max,
      peak: Math.max(...values, 0),
    };
  }, [series]);

  // The area curve morphs from the previous range to the new one
  const displayedRatios = useAnimatedRatios(targetRatios, variant === 'area');

  const { areaPath, linePath, chartPoints } = useMemo(() => {
    const step =
      displayedRatios.length > 1 ? width / (displayedRatios.length - 1) : 0;

    const points = displayedRatios.map((ratio, index): [number, number] => [
      displayedRatios.length > 1 ? index * step : width / 2,
      paddingTop + usableHeight * (1 - ratio),
    ]);
    const line = buildSmoothLinePath(points);
    const area =
      points.length > 0
        ? `${line} L${points[points.length - 1][0]},${height - paddingBottom} L${points[0][0]},${height - paddingBottom} Z`
        : '';

    return { areaPath: area, linePath: line, chartPoints: points };
  }, [displayedRatios, usableHeight]);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  /** Snaps the pointer to the nearest series point. */
  const handleCursorMove = (event: PointerEvent<HTMLDivElement>) => {
    if (series.length === 0) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const ratio = (event.clientX - bounds.left) / Math.max(1, bounds.width);
    const nearestIndex = Math.round(ratio * (series.length - 1));

    setHoveredIndex(Math.min(series.length - 1, Math.max(0, nearestIndex)));
  };

  const hoveredPoint = hoveredIndex === null ? undefined : series[hoveredIndex];
  const hoveredChartPoint =
    hoveredIndex === null ? undefined : chartPoints[hoveredIndex];

  const barSlotWidth = width / Math.max(1, series.length);

  const getBarLabel = (point: AudienceSeriesPoint): string =>
    `${formatBucket(point.bucket, granularity, locale)} · ${point.users} ${usersLabel}`;

  const getBarOpacity = (bucket: string): number =>
    !highlightedBuckets
      ? BAR_OPACITY
      : highlightedBuckets.has(bucket)
        ? BAR_HIGHLIGHTED_OPACITY
        : BAR_DIMMED_OPACITY;

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
            <linearGradient id={areaGradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
              <stop offset="35%" stopColor="currentColor" stopOpacity="0.1" />
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
                  opacity={getBarOpacity(point.bucket)}
                  className="fill-current transition-opacity"
                >
                  <title>{getBarLabel(point)}</title>
                </rect>
              );
            })}
          {variant === 'area' && areaPath && (
            <path d={areaPath} fill={`url(#${areaGradientId})`} />
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
        {/* Hover cursor: snaps to the nearest point and shows its exact value */}
        {variant === 'area' && series.length > 0 && (
          <div
            className="absolute inset-0 cursor-crosshair"
            dir="ltr"
            onPointerMove={handleCursorMove}
            onPointerLeave={() => setHoveredIndex(null)}
            aria-hidden
          >
            {hoveredPoint && hoveredChartPoint && (
              <CursorMarker
                xRatio={hoveredChartPoint[0] / width}
                yRatio={hoveredChartPoint[1] / height}
                label={`${formatBucketDetail(hoveredPoint.bucket, granularity, locale)} · ${hoveredPoint.users} ${usersLabel}`}
              />
            )}
          </div>
        )}
        {/* Full-height hit areas over the bars, in the SVG's (LTR) order. */}
        {variant === 'bars' && onBucketSelect && (
          <div className="absolute inset-0 flex" dir="ltr">
            {series.map((point) =>
              point.users > 0 ? (
                <button
                  key={point.bucket}
                  type="button"
                  onClick={() => onBucketSelect(point.bucket)}
                  aria-label={getBarLabel(point)}
                  aria-pressed={highlightedBuckets?.has(point.bucket) ?? false}
                  title={getBarLabel(point)}
                  className="flex-1 cursor-pointer rounded-sm transition-colors hover:bg-neutral/10"
                />
              ) : (
                <span key={point.bucket} className="flex-1" aria-hidden />
              )
            )}
          </div>
        )}
      </div>
      <div className="flex items-center justify-between text-xs text-neutral">
        <span>{formatBucket(firstBucket, granularity, locale)}</span>
        <span>{formatBucket(lastBucket, granularity, locale)}</span>
      </div>
    </div>
  );
};

type CursorMarkerProps = {
  /** Point position as a share of the chart width / height, in `[0, 1]`. */
  xRatio: number;
  yRatio: number;
  label: string;
};

/**
 * Vertical guide, dot and value label of the hovered chart point. Drawn in
 * HTML so the dot stays round despite the stretched SVG.
 */
const CursorMarker: FC<CursorMarkerProps> = ({ xRatio, yRatio, label }) => {
  const labelTranslate =
    xRatio < CURSOR_LABEL_EDGE_RATIO
      ? '0%'
      : xRatio > 1 - CURSOR_LABEL_EDGE_RATIO
        ? '-100%'
        : '-50%';

  return (
    <div className="pointer-events-none absolute inset-0">
      <span
        className="absolute inset-y-0 w-px bg-text/30"
        style={{ left: `${xRatio * 100}%` }}
      />
      <span
        className="absolute size-2.5 -translate-1/2 rounded-full border-2 border-card bg-text"
        style={{ left: `${xRatio * 100}%`, top: `${yRatio * 100}%` }}
      />
      <span
        className="absolute rounded-md bg-text px-2 py-1 text-xs font-medium whitespace-nowrap text-text-opposite shadow-sm"
        style={{
          left: `${xRatio * 100}%`,
          top: `${yRatio * 100}%`,
          // Above the dot, or below it when the point is near the top edge
          transform: `translate(${labelTranslate}, ${
            yRatio < CURSOR_LABEL_EDGE_RATIO * 2
              ? '0.75rem'
              : 'calc(-100% - 0.75rem)'
          })`,
        }}
      >
        {label}
      </span>
    </div>
  );
};

/** One skeleton per headline stat tile. */
const STAT_TILE_SKELETON_KEYS = ['range', 'today', 'week', 'views'] as const;

/** Placeholder mirroring the report layout during the first load. */
const AudienceSkeleton: FC = () => (
  <div className="flex flex-col gap-4" aria-busy>
    <div className="flex flex-wrap gap-4">
      {STAT_TILE_SKELETON_KEYS.map((key) => (
        <Skeleton key={key} className="h-24 min-w-36 flex-1 rounded-2xl" />
      ))}
    </div>
    <div className="flex flex-col gap-4 lg:flex-row">
      <Skeleton className="h-64 flex-2 rounded-2xl" />
      <Skeleton className="h-64 flex-1 rounded-2xl" />
    </div>
    <Skeleton
      className="w-full rounded-2xl"
      style={{ aspectRatio: `${WORLD_MAP_WIDTH} / ${WORLD_MAP_HEIGHT}` }}
    />
    <Skeleton className="h-60 w-full rounded-2xl" />
  </div>
);

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
  const [liveSelection, setLiveSelection] = useState<LiveVisitorSelection>(
    EMPTY_LIVE_VISITOR_SELECTION
  );
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const isLive = range === 'live';
  const { data, isLoading, isPlaceholderData, dataUpdatedAt } =
    useGetAnalyticsAudience(range, {
      refetchInterval: isLive ? LIVE_REFRESH_INTERVAL_MS : false,
    });
  const audience = data?.data as AudienceStats | undefined;
  const liveVisitors = audience?.liveVisitors ?? [];

  const handleRangeChange = (nextRange: AudienceRange) => {
    setRange(nextRange);
    setLiveSelection(EMPTY_LIVE_VISITOR_SELECTION);
  };

  /** A clicked activity bar lists who was active then, next to the map. */
  const handleMinuteSelect = (minute: string) => {
    setLiveSelection((selection) =>
      selectLiveMinute(selection, liveVisitors, minute)
    );
    mapContainerRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  };

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

  const rangeChoices: SwitchSelectorChoices<AudienceRange> =
    getAvailableAudienceRanges(RANGE_OPTIONS, audience?.dataSince).map(
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
    <div className="flex flex-1 flex-col gap-4">
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
            onChange={handleRangeChange}
            color="text"
            size="sm"
            className="w-max"
          />
        </div>
      </div>

      {isLoading && !audience ? (
        <AudienceSkeleton />
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
        <div
          className={cn(
            'flex flex-col gap-4 transition-opacity',
            isPlaceholderData && 'opacity-50'
          )}
          aria-busy={isPlaceholderData}
        >
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
                highlightedBuckets={
                  isLive
                    ? getHighlightedMinutes(liveSelection, liveVisitors)
                    : null
                }
                onBucketSelect={isLive ? handleMinuteSelect : undefined}
              />
              {isLive && (
                <span className="text-xs text-neutral">
                  {content.liveEvolutionHint}
                </span>
              )}
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
            ref={mapContainerRef}
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
                <Skeleton
                  className="w-full rounded-xl"
                  style={{
                    aspectRatio: `${WORLD_MAP_WIDTH} / ${WORLD_MAP_HEIGHT}`,
                  }}
                />
              }
            >
              {isLive ? (
                <LiveVisitorMap
                  visitors={liveVisitors}
                  rows={audience.byCountry}
                  referenceTime={dataUpdatedAt}
                  selection={liveSelection}
                  onSelectionChange={setLiveSelection}
                  locale={locale}
                  usersLabel={content.usersLabel.value}
                  chartLabel={content.mapChartLabel.value}
                />
              ) : (
                <WorldMap
                  rows={audience.byCountry}
                  locale={locale}
                  usersLabel={content.usersLabel.value}
                  chartLabel={content.mapChartLabel.value}
                />
              )}
            </Suspense>
          </Container>

          {/* Averaged user flow */}
          <Container
            className="flex flex-col p-5"
            roundedSize="2xl"
            transparency="none"
            border
            borderColor="neutral"
          >
            <Suspense
              fallback={<Skeleton className="h-40 w-full rounded-xl" />}
            >
              <PageFlow
                range={range}
                pageOptions={audience.byPage
                  .slice(0, MAX_FLOW_START_OPTIONS)
                  .map((row) => row.key)}
                locale={locale}
              />
            </Suspense>
          </Container>
        </div>
      )}
    </div>
  );
};
