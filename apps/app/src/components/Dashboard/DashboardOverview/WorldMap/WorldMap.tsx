import { type FC, type PointerEvent, useMemo, useRef, useState } from 'react';
import {
  countryToFlag,
  getCountryName,
  WORLD_MAP_HEIGHT,
  WORLD_MAP_WIDTH,
} from './worldMap.utils';
import { WORLD_MAP_PATHS } from './worldMapPaths';

/** Lowest fill opacity of a country with at least one visitor. */
const MIN_ACTIVE_OPACITY = 0.2;

export type WorldMapRow = {
  /** ISO 3166-1 alpha-2 country code. */
  key: string;
  /** Distinct visitors from that country. */
  users: number;
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
};

type HoveredCountry = {
  code: string;
  /** Pointer position relative to the map container, in px. */
  x: number;
  y: number;
  /** Whether the pointer is on the right half, so the tooltip opens leftward. */
  isOnRightHalf: boolean;
};

/**
 * Choropleth world map of visitors per country. Countries are shaded with the
 * `text` token on a square-root scale, so a few big countries do not wash out
 * every other one. Dependency-free: outlines are pre-projected SVG paths.
 */
export const WorldMap: FC<WorldMapProps> = ({
  rows,
  locale,
  usersLabel,
  chartLabel,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredCountry, setHoveredCountry] = useState<HoveredCountry | null>(
    null
  );

  const usersByCountry = useMemo(
    () => new Map(rows.map((row) => [row.key.toUpperCase(), row.users])),
    [rows]
  );
  const maxUsers = Math.max(1, ...usersByCountry.values());

  const getOpacity = (users: number): number =>
    MIN_ACTIVE_OPACITY + (1 - MIN_ACTIVE_OPACITY) * Math.sqrt(users / maxUsers);

  const handlePointerMove = (event: PointerEvent<SVGPathElement>) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    const code = event.currentTarget.dataset.country;

    if (!containerRect || !code) return;

    setHoveredCountry({
      code,
      x: event.clientX - containerRect.left,
      y: event.clientY - containerRect.top,
      isOnRightHalf:
        event.clientX - containerRect.left > containerRect.width / 2,
    });
  };

  const hoveredUsers = hoveredCountry
    ? (usersByCountry.get(hoveredCountry.code) ?? 0)
    : 0;

  return (
    <div className="flex flex-col gap-3">
      {/* Geography is not mirrored in RTL. */}
      <div ref={containerRef} className="relative w-full" dir="ltr">
        <svg
          viewBox={`0 0 ${WORLD_MAP_WIDTH} ${WORLD_MAP_HEIGHT}`}
          className="h-auto w-full text-text"
          role="img"
          aria-label={chartLabel}
          onPointerLeave={() => setHoveredCountry(null)}
        >
          {Object.entries(WORLD_MAP_PATHS).map(([code, path]) => {
            const users = usersByCountry.get(code) ?? 0;
            const isHovered = hoveredCountry?.code === code;

            return (
              <path
                key={code}
                d={path}
                data-country={code}
                onPointerMove={handlePointerMove}
                className={
                  users > 0
                    ? 'fill-current stroke-background transition-opacity'
                    : 'fill-neutral/15 stroke-background'
                }
                style={
                  users > 0
                    ? { opacity: isHovered ? 1 : getOpacity(users) }
                    : undefined
                }
                strokeWidth={isHovered ? 1.2 : 0.5}
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
        </svg>

        {hoveredCountry && (
          <div
            className="pointer-events-none absolute z-10 flex flex-col gap-0.5 rounded-lg border border-neutral/20 bg-card px-3 py-2 text-xs whitespace-nowrap shadow-md"
            style={{
              top: hoveredCountry.y + 12,
              left: hoveredCountry.x,
              transform: hoveredCountry.isOnRightHalf
                ? 'translateX(calc(-100% - 12px))'
                : 'translateX(12px)',
            }}
          >
            <span className="flex items-center gap-1.5 font-medium text-text">
              <span aria-hidden>{countryToFlag(hoveredCountry.code)}</span>
              {getCountryName(hoveredCountry.code, locale)}
            </span>
            <span className="text-neutral">
              {hoveredUsers.toLocaleString(locale)} {usersLabel}
            </span>
          </div>
        )}
      </div>

      {/* Scale legend — LTR like the gradient it labels. */}
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
    </div>
  );
};
