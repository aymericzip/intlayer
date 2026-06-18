import { cn } from '@utils/cn';
import {
  type FC,
  type SVGProps,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

function hexToRgb(hex: string): [number, number, number] {
  const numericValue = parseInt(hex.replace('#', ''), 16);
  return [
    (numericValue >> 16) & 255,
    (numericValue >> 8) & 255,
    numericValue & 255,
  ];
}

type Point = { baseX: number; baseY: number; x: number; y: number };

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
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [paths, setPaths] = useState<
    {
      d: string;
      opacity: number;
      width: number;
      red: number;
      green: number;
      blue: number;
    }[]
  >([]);

  const mouse = useRef({ x: -9999, y: -9999, active: false });
  const points = useRef<Point[][]>([]);

  const [lineColorRed, lineColorGreen, lineColorBlue] = hexToRgb(lineColor);
  const [highlightColorRed, highlightColorGreen, highlightColorBlue] =
    hexToRgb(highlightColor);

  // resize
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const resize = () => {
      const rect = svg.getBoundingClientRect();
      setSize({ width: rect.width, height: rect.height });
      const columns = Math.ceil(rect.width / width) + 2;
      const rows = Math.ceil(rect.height / height) + 2;
      points.current = [];
      for (let rowIndex = -1; rowIndex <= rows; rowIndex++) {
        const row: Point[] = [];
        for (let columnIndex = -1; columnIndex <= columns; columnIndex++)
          row.push({
            baseX: columnIndex * width,
            baseY: rowIndex * height,
            x: columnIndex * width,
            y: rowIndex * height,
          });
        points.current.push(row);
      }
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(svg);
    return () => resizeObserver.disconnect();
  }, [width, height]);

  // pointer
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

  // animation loop
  useEffect(() => {
    let frame = 0;
    const tick = () => {
      const grid = points.current;
      if (!grid.length) {
        frame = requestAnimationFrame(tick);
        return;
      }
      const rows = grid.length;
      const columns = grid[0]!.length;
      const currentMouse = mouse.current;

      for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
        for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
          const point = grid[rowIndex]![columnIndex]!;
          if (!currentMouse.active) {
            point.x += (point.baseX - point.x) * 0.08;
            point.y += (point.baseY - point.y) * 0.08;
            continue;
          }
          const deltaX = currentMouse.x - point.baseX;
          const deltaY = currentMouse.y - point.baseY;
          const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

          if (distance < radius && distance > 0) {
            const force = (Math.cos((distance / radius) * Math.PI) + 1) / 2;
            const displacement = force * strength * radius * 0.3;
            point.x +=
              (point.baseX + (deltaX / distance) * displacement - point.x) *
              0.12;
            point.y +=
              (point.baseY + (deltaY / distance) * displacement - point.y) *
              0.12;
          } else {
            point.x += (point.baseX - point.x) * 0.08;
            point.y += (point.baseY - point.y) * 0.08;
          }
        }
      }

      const nextPaths: typeof paths = [];

      const addSegment = (
        startX: number,
        startY: number,
        endX: number,
        endY: number
      ) => {
        let segmentRed: number;
        let segmentGreen: number;
        let segmentBlue: number;
        let opacity: number;
        let strokeWidth: number;
        if (!currentMouse.active) {
          segmentRed = lineColorRed;
          segmentGreen = lineColorGreen;
          segmentBlue = lineColorBlue;
          opacity = 0.14;
          strokeWidth = 0.8;
        } else {
          const midX = (startX + endX) / 2;
          const midY = (startY + endY) / 2;
          const deltaX = currentMouse.x - midX;
          const deltaY = currentMouse.y - midY;
          const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
          const distanceRatio = Math.max(0, 1 - distance / radius);
          const easing = distanceRatio * distanceRatio * distanceRatio;
          segmentRed = Math.round(
            lineColorRed + (highlightColorRed - lineColorRed) * easing
          );
          segmentGreen = Math.round(
            lineColorGreen + (highlightColorGreen - lineColorGreen) * easing
          );
          segmentBlue = Math.round(
            lineColorBlue + (highlightColorBlue - lineColorBlue) * easing
          );
          opacity = 0.14 + easing * 0.72;
          strokeWidth = 0.8 + easing * 1.2;
        }
        nextPaths.push({
          d: `M ${startX} ${startY} L ${endX} ${endY}`,
          opacity,
          width: strokeWidth,
          red: segmentRed,
          green: segmentGreen,
          blue: segmentBlue,
        });
      };

      for (let rowIndex = 0; rowIndex < rows; rowIndex++)
        for (let columnIndex = 0; columnIndex < columns - 1; columnIndex++)
          addSegment(
            grid![rowIndex]![columnIndex]!.x,
            grid![rowIndex]![columnIndex]!.y,
            grid![rowIndex]![columnIndex + 1]!.x,
            grid![rowIndex]![columnIndex + 1]!.y
          );
      for (let columnIndex = 0; columnIndex < columns; columnIndex++)
        for (let rowIndex = 0; rowIndex < rows - 1; rowIndex++)
          addSegment(
            grid![rowIndex]![columnIndex]!.x,
            grid![rowIndex]![columnIndex]!.y,
            grid![rowIndex + 1]![columnIndex]!.x,
            grid![rowIndex + 1]![columnIndex]!.y
          );

      setPaths(nextPaths);
      frame = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(frame);
  }, [
    radius,
    strength,
    lineColorRed,
    lineColorGreen,
    lineColorBlue,
    highlightColorRed,
    highlightColorGreen,
    highlightColorBlue,
  ]);

  const viewBox = useMemo(() => `0 0 ${size.width} ${size.height}`, [size]);

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      viewBox={viewBox}
      className={cn(
        'pointer-events-none absolute inset-0 size-full',
        className
      )}
      {...props}
    >
      {paths.map((segment, index) => (
        <path
          key={index}
          d={segment.d}
          fill="none"
          stroke={`rgb(${segment.red},${segment.green},${segment.blue})`}
          strokeOpacity={segment.opacity}
          strokeWidth={segment.width}
        />
      ))}
    </svg>
  );
};
