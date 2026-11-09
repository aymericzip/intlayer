import type { LiveVisitor } from '@intlayer/backend-contract/analytics';
import { Minus, Plus, RotateCcw } from 'lucide-react';
import { type FC, type PointerEvent, useMemo, useRef, useState } from 'react';
import { useMapZoom } from './useMapZoom';
import {
  countryToFlag,
  getCountryName,
  WORLD_MAP_HEIGHT,
  WORLD_MAP_WIDTH,
} from './worldMap.utils';
import { WORLD_MAP_PATHS } from './worldMapPaths';
import { groupVisitorsByPlace, type LiveMapPlace } from './worldMapProjection';

/** Lowest fill opacity of a country with at least one visitor. */
const MIN_ACTIVE_OPACITY = 0.2;

/** A place whose latest activity is this recent pulses on the map. */
const PULSE_RECENCY_MS = 60_000;

export type WorldMapRow = {
  /** ISO 3166-1 alpha-2 country code. */
  key: string;
  /** Distinct visitors from that country. */
  users: number;
};

/** Live mode: visitor dots, zoom and place selection. */
export type WorldMapLiveOptions = {
  /** Active visitors to place on the map. */
  visitors: LiveVisitor[];
  /** Time the visitors were fetched (epoch ms), to pulse recent places. */
  referenceTime: number;
  /** Key of the selected place, highlighted on the map. */
  selectedPlaceKey: string | null;
  /** Called when a dot is clicked. */
  onPlaceSelect: (place: LiveMapPlace) => void;
  zoomInLabel: string;
  zoomOutLabel: string;
  resetZoomLabel: string;
};

type WorldMapProps = {
  /** Visitors per country. */
  rows: WorldMapRow[];
  /** Locale used to name countries and format counts. */
  locale: string;
  /** Unit appended to counts (e.g. "users"). */
  usersLabel: string;
  /** Accessible name of the map. */
  chartLabel: string;
  /** Enables the live mode (dots + zoom) when set. */
  live?: WorldMapLiveOptions;
};

type HoveredTarget =
  | { kind: 'country'; code: string }
  | { kind: 'place'; place: LiveMapPlace };

type TooltipState = HoveredTarget & {
  /** Pointer position relative to the map container, in px. */
  x: number;
  y: number;
  /** Whether the pointer is on the right half, so the tooltip opens leftward. */
  isOnRightHalf: boolean;
};

/** Latest activity of anyone at a place (epoch ms). */
const getPlaceLastSeen = (place: LiveMapPlace): number =>
  Math.max(...place.visitors.map((visitor) => Date.parse(visitor.lastSeenAt)));

/** Dot radius in screen-stable units: grows with the crowd at the place. */
const getDotRadius = (visitorCount: number, scale: number): number =>
  (3.5 + 2 * Math.sqrt(visitorCount)) / scale;

/**
 * World map of visitors. By default a choropleth of visitors per country,
 * shaded with the `text` token on a square-root scale. In live mode, active
 * visitors are drawn as dots at their city (or country centroid), and the map
 * zooms (wheel, pinch, buttons) and pans (drag). Dependency-free: outlines are
 * pre-projected SVG paths.
 */
export const WorldMap: FC<WorldMapProps> = ({
  rows,
  locale,
  usersLabel,
  chartLabel,
  live,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const isLive = live !== undefined;

  const {
    transform,
    isZoomed,
    wasDragged,
    zoomIn,
    zoomOut,
    resetZoom,
    pointerHandlers,
  } = useMapZoom(svgRef, WORLD_MAP_WIDTH, WORLD_MAP_HEIGHT, isLive);

  const usersByCountry = useMemo(
    () => new Map(rows.map((row) => [row.key.toUpperCase(), row.users])),
    [rows]
  );
  const maxUsers = Math.max(1, ...usersByCountry.values());

  const liveVisitors = live?.visitors;
  const places = useMemo(
    () => (liveVisitors ? groupVisitorsByPlace(liveVisitors) : []),
    [liveVisitors]
  );

  const getOpacity = (users: number): number =>
    MIN_ACTIVE_OPACITY + (1 - MIN_ACTIVE_OPACITY) * Math.sqrt(users / maxUsers);

  const showTooltip = (
    event: PointerEvent<SVGElement>,
    target: HoveredTarget
  ) => {
    const containerRect = containerRef.current?.getBoundingClientRect();

    if (!containerRect) return;

    setTooltip({
      ...target,
      x: event.clientX - containerRect.left,
      y: event.clientY - containerRect.top,
      isOnRightHalf:
        event.clientX - containerRect.left > containerRect.width / 2,
    });
  };

  const handleCountryPointerMove = (event: PointerEvent<SVGPathElement>) => {
    const code = event.currentTarget.dataset.country;

    if (code) showTooltip(event, { kind: 'country', code });
  };

  const hoveredCountryCode = tooltip?.kind === 'country' ? tooltip.code : null;

  return (
    <div className="flex flex-col gap-3">
      {/* Geography is not mirrored in RTL. */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-xl"
        dir="ltr"
      >
        <svg
          ref={svgRef}
          viewBox={`0 0 ${WORLD_MAP_WIDTH} ${WORLD_MAP_HEIGHT}`}
          className={
            isLive
              ? 'h-auto w-full cursor-grab touch-none text-text select-none active:cursor-grabbing'
              : 'h-auto w-full text-text'
          }
          role="img"
          aria-label={chartLabel}
          onPointerLeave={() => setTooltip(null)}
          {...pointerHandlers}
        >
          <g
            transform={`translate(${transform.translateX} ${transform.translateY}) scale(${transform.scale})`}
          >
            {Object.entries(WORLD_MAP_PATHS).map(([code, path]) => {
              const users = usersByCountry.get(code) ?? 0;
              const isHovered = hoveredCountryCode === code;
              const isShaded = users > 0 && !isLive;

              return (
                <path
                  key={code}
                  d={path}
                  data-country={code}
                  // Live mode reports visitors through the dots only.
                  onPointerMove={isLive ? undefined : handleCountryPointerMove}
                  className={
                    isShaded
                      ? 'fill-current stroke-background transition-opacity'
                      : 'fill-neutral/15 stroke-background'
                  }
                  style={
                    isShaded
                      ? { opacity: isHovered ? 1 : getOpacity(users) }
                      : undefined
                  }
                  strokeWidth={isHovered ? 1.2 : 0.5}
                  vectorEffect="non-scaling-stroke"
                />
              );
            })}

            {live &&
              places.map((place) => {
                const radius = getDotRadius(
                  place.visitors.length,
                  transform.scale
                );
                const isSelected = live.selectedPlaceKey === place.key;
                const isRecent =
                  live.referenceTime - getPlaceLastSeen(place) <
                  PULSE_RECENCY_MS;

                return (
                  // oxlint-disable-next-line jsx-a11y/click-events-have-key-events -- dots are a pointer shortcut; every visitor is also reachable from the panel list
                  <g
                    key={place.key}
                    className="cursor-pointer text-success"
                    onPointerMove={(event) =>
                      showTooltip(event, { kind: 'place', place })
                    }
                    onPointerLeave={() => setTooltip(null)}
                    onClick={() => {
                      if (!wasDragged()) live.onPlaceSelect(place);
                    }}
                  >
                    {isRecent && (
                      <circle
                        cx={place.x}
                        cy={place.y}
                        r={radius}
                        className="pointer-events-none fill-current"
                      >
                        <animate
                          attributeName="r"
                          values={`${radius};${radius * 2.6}`}
                          dur="1.8s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="opacity"
                          values="0.5;0"
                          dur="1.8s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    )}
                    <circle
                      cx={place.x}
                      cy={place.y}
                      r={isSelected ? radius * 1.3 : radius}
                      className={
                        isSelected
                          ? 'fill-current stroke-text'
                          : 'fill-current stroke-background'
                      }
                      strokeWidth={isSelected ? 2 : 1.2}
                      vectorEffect="non-scaling-stroke"
                      fillOpacity={0.85}
                    />
                  </g>
                );
              })}
          </g>
        </svg>

        {live && (
          <div className="absolute top-2 right-2 flex flex-col overflow-hidden rounded-lg border border-neutral/20 bg-card shadow-sm">
            {[
              { label: live.zoomInLabel, icon: Plus, onClick: zoomIn },
              { label: live.zoomOutLabel, icon: Minus, onClick: zoomOut },
              {
                label: live.resetZoomLabel,
                icon: RotateCcw,
                onClick: resetZoom,
                isDisabled: !isZoomed,
              },
            ].map(({ label, icon: Icon, onClick, isDisabled }) => (
              <button
                key={label}
                type="button"
                aria-label={label}
                title={label}
                onClick={onClick}
                disabled={isDisabled}
                className="flex size-8 items-center justify-center text-text transition-colors not-last:border-b not-last:border-neutral/20 hover:bg-neutral/10 disabled:opacity-40"
              >
                <Icon className="size-4" />
              </button>
            ))}
          </div>
        )}

        {tooltip && (
          <div
            className="pointer-events-none absolute z-10 flex flex-col gap-0.5 rounded-lg border border-neutral/20 bg-card px-3 py-2 text-xs whitespace-nowrap shadow-md"
            style={{
              top: tooltip.y + 12,
              left: tooltip.x,
              transform: tooltip.isOnRightHalf
                ? 'translateX(calc(-100% - 12px))'
                : 'translateX(12px)',
            }}
          >
            {tooltip.kind === 'country' ? (
              <>
                <span className="flex items-center gap-1.5 font-medium text-text">
                  <span aria-hidden>{countryToFlag(tooltip.code)}</span>
                  {getCountryName(tooltip.code, locale)}
                </span>
                <span className="text-neutral">
                  {(usersByCountry.get(tooltip.code) ?? 0).toLocaleString(
                    locale
                  )}{' '}
                  {usersLabel}
                </span>
              </>
            ) : (
              <>
                <span className="flex items-center gap-1.5 font-medium text-text">
                  <span aria-hidden>
                    {countryToFlag(tooltip.place.country)}
                  </span>
                  {tooltip.place.city
                    ? `${tooltip.place.city}, ${getCountryName(tooltip.place.country, locale)}`
                    : getCountryName(tooltip.place.country, locale)}
                </span>
                <span className="text-neutral">
                  {tooltip.place.visitors.length.toLocaleString(locale)}{' '}
                  {usersLabel}
                </span>
              </>
            )}
          </div>
        )}
      </div>

      {/* Scale legend — LTR like the gradient it labels. */}
      {!isLive && (
        <div className="flex items-center gap-2 text-xs text-neutral" dir="ltr">
          <span>0</span>
          <div
            className="h-1.5 w-32 rounded-full text-text"
            style={{
              backgroundImage: `linear-gradient(to right, color-mix(in srgb, currentColor ${MIN_ACTIVE_OPACITY * 100}%, transparent), currentColor)`,
            }}
          />
          <span>
            {maxUsers.toLocaleString(locale)} {usersLabel}
          </span>
        </div>
      )}
    </div>
  );
};
