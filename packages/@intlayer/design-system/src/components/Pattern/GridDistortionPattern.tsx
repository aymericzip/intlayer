'use client';

import { cn } from '@utils/cn';
import { type FC, type SVGProps, useEffect, useRef } from 'react';
import { useIsDarkMode } from '../../hooks/useIsDarkMode';

// ---------------------------------------------------------------------------
// Theme configuration — tweak these to adjust the grid appearance globally
// ---------------------------------------------------------------------------

type GridTheme = {
  /** Resting line color, used far from the pointer. */
  lineColor: string;
  /**
   * Color the lines fade toward as the pointer approaches. To avoid lines
   * appearing to "dim into the background" near the pointer, this should be
   * brighter (higher luminance) than {@link GridTheme.lineColor} in dark mode
   * and clearly contrasting in light mode.
   */
  highlightColor: string;
  /** Stroke opacity far from the pointer — keeps the whole grid visible. */
  baseOpacity: number;
  /** Extra opacity added at the pointer's center on top of {@link GridTheme.baseOpacity}. */
  highlightOpacityBoost: number;
};

/**
 * Light mode: a visible (but subtle) gray line on white. The base opacity is
 * raised and the highlight boost lowered so the grid no longer fades to nothing
 * far from the pointer while spiking to a harsh accent underneath it.
 */
const LIGHT_THEME: GridTheme = {
  lineColor: '#a8a8a8',
  highlightColor: '#969696',
  baseOpacity: 0.3,
  highlightOpacityBoost: 0.3,
};

/**
 * Dark mode: a mid-gray line that brightens toward a light purple near the
 * pointer (brighter than the resting line, so the hovered segment lights up
 * instead of darkening into the black background).
 */
const DARK_THEME: GridTheme = {
  lineColor: '#4d4d4d',
  highlightColor: '#5c5c5c',
  baseOpacity: 0.2,
  highlightOpacityBoost: 0.2,
};

/**
 * Falloff exponent for the highlight. A gentler curve (2 = quadratic) spreads
 * the highlight over a wider area than a cubic one, smoothing the transition
 * between the resting line and the accent under the pointer.
 */
const HIGHLIGHT_FALLOFF_EXPONENT = 2;

// ---------------------------------------------------------------------------
// Pure helpers — defined once at module level, never recreated
// ---------------------------------------------------------------------------

const hexToRgb = (hex: string): [number, number, number] => {
  const numericValue = parseInt(hex.replace('#', ''), 16);
  return [
    (numericValue >> 16) & 255,
    (numericValue >> 8) & 255,
    numericValue & 255,
  ];
};

/** Neutral gray used when a color string can't be parsed into RGB. */
const FALLBACK_RGB: [number, number, number] = [136, 136, 136];

/**
 * Resolves any CSS color string — `#rrggbb`, `rgb()/hsl()`, a named color, or a
 * `var(--token)` reference — into an `[r, g, b]` triple.
 *
 * 6-digit hex is parsed directly. Everything else is resolved by the browser
 * via a throwaway probe element mounted inside `contextElement`, so custom
 * properties resolve against the correct cascade. Falls back to a neutral gray
 * when the value can't be parsed, so the grid never emits invalid
 * `rgb(NaN, …)` strokes (which browsers render as solid black).
 */
const resolveColorToRgb = (
  color: string,
  contextElement: Element
): [number, number, number] => {
  const trimmed = color.trim();

  // Fast path: 6-digit hex needs no DOM access.
  if (/^#[0-9a-f]{6}$/i.test(trimmed)) {
    return hexToRgb(trimmed);
  }

  const probe = document.createElement('span');
  probe.style.color = trimmed;
  probe.style.display = 'none';
  contextElement.appendChild(probe);
  const computedColor = getComputedStyle(probe).color;
  probe.remove();

  const channels = computedColor.match(/-?\d+(?:\.\d+)?/g);
  if (channels && channels.length >= 3) {
    return [Number(channels[0]), Number(channels[1]), Number(channels[2])];
  }

  return FALLBACK_RGB;
};

type Point = { baseX: number; baseY: number; x: number; y: number };

const buildSegmentAttrs = (
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  mouseX: number,
  mouseY: number,
  mouseActive: boolean,
  radius: number,
  strength: number,
  lineRgb: [number, number, number],
  highlightRgb: [number, number, number],
  baseOpacity: number,
  highlightOpacityBoost: number
): {
  d: string;
  stroke: string;
  strokeOpacity: number;
  strokeWidth: number;
} => {
  let red: number;
  let green: number;
  let blue: number;
  let opacity: number;
  let strokeWidth: number;

  if (!mouseActive) {
    [red, green, blue] = lineRgb;
    opacity = baseOpacity;
    strokeWidth = 0.8;
  } else {
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;
    const deltaX = mouseX - midX;
    const deltaY = mouseY - midY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const distanceRatio = Math.max(0, 1 - distance / radius);
    const easing = distanceRatio ** HIGHLIGHT_FALLOFF_EXPONENT;
    red = Math.round(lineRgb[0] + (highlightRgb[0] - lineRgb[0]) * easing);
    green = Math.round(lineRgb[1] + (highlightRgb[1] - lineRgb[1]) * easing);
    blue = Math.round(lineRgb[2] + (highlightRgb[2] - lineRgb[2]) * easing);
    opacity = baseOpacity + easing * highlightOpacityBoost;
    strokeWidth = 0.8 + easing * 1.2;
    void strength; // currently unused in segment coloring, kept for API compatibility
  }

  return {
    d: `M ${startX} ${startY} L ${endX} ${endY}`,
    stroke: `rgb(${red},${green},${blue})`,
    strokeOpacity: opacity,
    strokeWidth,
  };
};

const updateGridPoints = (
  grid: Point[][],
  mouseX: number,
  mouseY: number,
  mouseActive: boolean,
  radius: number,
  strength: number
): void => {
  const rows = grid.length;
  const columns = grid[0]!.length;

  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
      const point = grid[rowIndex]![columnIndex]!;
      if (!mouseActive) {
        point.x += (point.baseX - point.x) * 0.08;
        point.y += (point.baseY - point.y) * 0.08;
        continue;
      }
      const deltaX = mouseX - point.baseX;
      const deltaY = mouseY - point.baseY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < radius && distance > 0) {
        const force = (Math.cos((distance / radius) * Math.PI) + 1) / 2;
        const displacement = force * strength * radius * 0.3;
        point.x +=
          (point.baseX + (deltaX / distance) * displacement - point.x) * 0.12;
        point.y +=
          (point.baseY + (deltaY / distance) * displacement - point.y) * 0.12;
      } else {
        point.x += (point.baseX - point.x) * 0.08;
        point.y += (point.baseY - point.y) * 0.08;
      }
    }
  }
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

type GridDistortionPatternProps = {
  width?: number;
  height?: number;
  radius?: number;
  strength?: number;
  lineColor?: string;
  highlightColor?: string;
} & SVGProps<SVGSVGElement>;

export const GridDistortionPattern: FC<GridDistortionPatternProps> = ({
  width = 70,
  height = 70,
  radius = 280,
  strength = 0.12,
  lineColor,
  highlightColor,
  className,
  ...props
}) => {
  const isDarkMode = useIsDarkMode();
  const theme = isDarkMode ? DARK_THEME : LIGHT_THEME;

  // Explicit props win; otherwise fall back to the active theme's defaults.
  const resolvedLineColor = lineColor ?? theme.lineColor;
  const resolvedHighlightColor = highlightColor ?? theme.highlightColor;

  const svgRef = useRef<SVGSVGElement>(null);
  const mouse = useRef({ x: -9999, y: -9999, active: false });
  const points = useRef<Point[][]>([]);

  // Stable refs so the animation loop always sees the latest prop values
  // without needing to restart itself.
  const radiusRef = useRef(radius);
  const strengthRef = useRef(strength);
  // Initialized to safe placeholders; the real (possibly CSS-variable-based)
  // colors are resolved against the DOM in the effect below.
  const lineRgbRef = useRef<[number, number, number]>(FALLBACK_RGB);
  const highlightRgbRef = useRef<[number, number, number]>(FALLBACK_RGB);
  const baseOpacityRef = useRef(theme.baseOpacity);
  const highlightOpacityBoostRef = useRef(theme.highlightOpacityBoost);

  // Keep numeric refs in sync with props on each render (cheap assignments).
  radiusRef.current = radius;
  strengthRef.current = strength;
  baseOpacityRef.current = theme.baseOpacity;
  highlightOpacityBoostRef.current = theme.highlightOpacityBoost;

  // Resolve colors once mounted — getComputedStyle is required so that
  // `var(--token)` highlight/line colors resolve against the live cascade.
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    lineRgbRef.current = resolveColorToRgb(resolvedLineColor, svg);
    highlightRgbRef.current = resolveColorToRgb(resolvedHighlightColor, svg);
  }, [resolvedLineColor, resolvedHighlightColor]);

  // ---------------------------------------------------------------------------
  // Resize — rebuild the point grid and resize the SVG viewBox
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const resize = () => {
      const rect = svg.getBoundingClientRect();
      svg.setAttribute('viewBox', `0 0 ${rect.width} ${rect.height}`);

      const columns = Math.ceil(rect.width / width) + 2;
      const rows = Math.ceil(rect.height / height) + 2;
      const newGrid: Point[][] = [];

      for (let rowIndex = -1; rowIndex <= rows; rowIndex++) {
        const row: Point[] = [];
        for (let columnIndex = -1; columnIndex <= columns; columnIndex++) {
          row.push({
            baseX: columnIndex * width,
            baseY: rowIndex * height,
            x: columnIndex * width,
            y: rowIndex * height,
          });
        }
        newGrid.push(row);
      }
      points.current = newGrid;
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(svg);
    return () => resizeObserver.disconnect();
  }, [width, height]);

  // ---------------------------------------------------------------------------
  // Pointer tracking — passive listeners, no React state involved
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const handlePointerMove = (event: PointerEvent) => {
      const rect = svg.getBoundingClientRect();
      mouse.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        active: true,
      };
    };
    const handlePointerLeave = () => {
      mouse.current.active = false;
    };

    window.addEventListener('pointermove', handlePointerMove, {
      passive: true,
    });
    window.addEventListener('pointerleave', handlePointerLeave, {
      passive: true,
    });
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  // ---------------------------------------------------------------------------
  // Animation loop — writes directly to SVG DOM, no React state/re-renders
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // We maintain a pool of <path> elements and reuse them each frame
    // to avoid GC pressure from creating/deleting DOM nodes every tick.
    const pathPool: SVGPathElement[] = [];
    let frame = 0;

    const ensurePathCount = (count: number) => {
      while (pathPool.length < count) {
        const el = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'path'
        );
        el.setAttribute('fill', 'none');
        svg.appendChild(el);
        pathPool.push(el);
      }
      // Hide surplus paths
      for (let i = count; i < pathPool.length; i++) {
        pathPool[i]!.setAttribute('d', '');
      }
    };

    const tick = () => {
      const grid = points.current;
      if (!grid.length) {
        frame = requestAnimationFrame(tick);
        return;
      }

      const { x: mouseX, y: mouseY, active: mouseActive } = mouse.current;
      const currentRadius = radiusRef.current;
      const currentStrength = strengthRef.current;
      const lineRgb = lineRgbRef.current;
      const highlightRgb = highlightRgbRef.current;
      const baseOpacity = baseOpacityRef.current;
      const highlightOpacityBoost = highlightOpacityBoostRef.current;

      // Update point positions
      updateGridPoints(
        grid,
        mouseX,
        mouseY,
        mouseActive,
        currentRadius,
        currentStrength
      );

      const rows = grid.length;
      const columns = grid[0]!.length;

      // Count segments up front so we can size the pool
      const horizontalCount = rows * (columns - 1);
      const verticalCount = columns * (rows - 1);
      const totalSegments = horizontalCount + verticalCount;
      ensurePathCount(totalSegments);

      let pathIndex = 0;

      // Horizontal segments
      for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
        for (let columnIndex = 0; columnIndex < columns - 1; columnIndex++) {
          const p0 = grid[rowIndex]![columnIndex]!;
          const p1 = grid[rowIndex]![columnIndex + 1]!;
          const attrs = buildSegmentAttrs(
            p0.x,
            p0.y,
            p1.x,
            p1.y,
            mouseX,
            mouseY,
            mouseActive,
            currentRadius,
            currentStrength,
            lineRgb,
            highlightRgb,
            baseOpacity,
            highlightOpacityBoost
          );
          const el = pathPool[pathIndex++]!;
          el.setAttribute('d', attrs.d);
          el.setAttribute('stroke', attrs.stroke);
          el.setAttribute('stroke-opacity', String(attrs.strokeOpacity));
          el.setAttribute('stroke-width', String(attrs.strokeWidth));
        }
      }

      // Vertical segments
      for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
        for (let rowIndex = 0; rowIndex < rows - 1; rowIndex++) {
          const p0 = grid[rowIndex]![columnIndex]!;
          const p1 = grid[rowIndex + 1]![columnIndex]!;
          const attrs = buildSegmentAttrs(
            p0.x,
            p0.y,
            p1.x,
            p1.y,
            mouseX,
            mouseY,
            mouseActive,
            currentRadius,
            currentStrength,
            lineRgb,
            highlightRgb,
            baseOpacity,
            highlightOpacityBoost
          );
          const el = pathPool[pathIndex++]!;
          el.setAttribute('d', attrs.d);
          el.setAttribute('stroke', attrs.stroke);
          el.setAttribute('stroke-opacity', String(attrs.strokeOpacity));
          el.setAttribute('stroke-width', String(attrs.strokeWidth));
        }
      }

      frame = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(frame);
      // Clean up path elements we injected
      for (const el of pathPool) {
        el.remove();
      }
    };
  }, []); // no dependencies — reads everything via refs

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 size-full',
        className
      )}
      {...props}
    />
  );
};
