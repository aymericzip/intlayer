'use client';

import { cn } from '@utils/cn';
import { type FC, type SVGProps, useEffect, useRef } from 'react';

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
  highlightRgb: [number, number, number]
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
    opacity = 0.14;
    strokeWidth = 0.8;
  } else {
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;
    const deltaX = mouseX - midX;
    const deltaY = mouseY - midY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const distanceRatio = Math.max(0, 1 - distance / radius);
    const easing = distanceRatio * distanceRatio * distanceRatio;
    red = Math.round(lineRgb[0] + (highlightRgb[0] - lineRgb[0]) * easing);
    green = Math.round(lineRgb[1] + (highlightRgb[1] - lineRgb[1]) * easing);
    blue = Math.round(lineRgb[2] + (highlightRgb[2] - lineRgb[2]) * easing);
    opacity = 0.14 + easing * 0.72;
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
  lineColor = '#888888',
  highlightColor = '#7f77dd',
  className,
  ...props
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const mouse = useRef({ x: -9999, y: -9999, active: false });
  const points = useRef<Point[][]>([]);

  // Stable refs so the animation loop always sees the latest prop values
  // without needing to restart itself.
  const radiusRef = useRef(radius);
  const strengthRef = useRef(strength);
  const lineRgbRef = useRef<[number, number, number]>(hexToRgb(lineColor));
  const highlightRgbRef = useRef<[number, number, number]>(
    hexToRgb(highlightColor)
  );

  // Keep refs in sync with props on each render (cheap assignments).
  radiusRef.current = radius;
  strengthRef.current = strength;
  lineRgbRef.current = hexToRgb(lineColor);
  highlightRgbRef.current = hexToRgb(highlightColor);

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
            highlightRgb
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
            highlightRgb
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
