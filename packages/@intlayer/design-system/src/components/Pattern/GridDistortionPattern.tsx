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
  const n = parseInt(hex.replace('#', ''), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

type Point = { bx: number; by: number; x: number; y: number };

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
      r: number;
      g: number;
      b: number;
    }[]
  >([]);

  const mouse = useRef({ x: -9999, y: -9999, active: false });
  const points = useRef<Point[][]>([]);

  const [lr, lg, lb] = hexToRgb(lineColor);
  const [hr, hg, hb] = hexToRgb(highlightColor);

  // resize
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const resize = () => {
      const rect = svg.getBoundingClientRect();
      setSize({ width: rect.width, height: rect.height });
      const cols = Math.ceil(rect.width / width) + 2;
      const rows = Math.ceil(rect.height / height) + 2;
      points.current = [];
      for (let r = -1; r <= rows; r++) {
        const row: Point[] = [];
        for (let c = -1; c <= cols; c++)
          row.push({
            bx: c * width,
            by: r * height,
            x: c * width,
            y: r * height,
          });
        points.current.push(row);
      }
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(svg);
    return () => ro.disconnect();
  }, [width, height]);

  // pointer
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const move = (e: PointerEvent) => {
      const rect = svg.getBoundingClientRect();
      mouse.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };
    const leave = () => {
      mouse.current.active = false;
    };
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerleave', leave, { passive: true });
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerleave', leave);
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
      const cols = grid[0]!.length;
      const m = mouse.current;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const p = grid[r]![c]!;
          if (!m.active) {
            p.x += (p.bx - p.x) * 0.08;
            p.y += (p.by - p.y) * 0.08;
            continue;
          }
          const dx = m.x - p.bx;
          const dy = m.y - p.by;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < radius && dist > 0) {
            const force = (Math.cos((dist / radius) * Math.PI) + 1) / 2;
            const disp = force * strength * radius * 0.3;
            p.x += (p.bx + (dx / dist) * disp - p.x) * 0.12;
            p.y += (p.by + (dy / dist) * disp - p.y) * 0.12;
          } else {
            p.x += (p.bx - p.x) * 0.08;
            p.y += (p.by - p.y) * 0.08;
          }
        }
      }

      const nextPaths: typeof paths = [];

      const addSeg = (x1: number, y1: number, x2: number, y2: number) => {
        let r2;
        let g2;
        let b2;
        let opacity;
        let strokeWidth;
        if (!m.active) {
          r2 = lr;
          g2 = lg;
          b2 = lb;
          opacity = 0.14;
          strokeWidth = 0.8;
        } else {
          const midX = (x1 + x2) / 2;
          const midY = (y1 + y2) / 2;
          const dx = m.x - midX;
          const dy = m.y - midY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const t = Math.max(0, 1 - dist / radius);
          const ease = t * t * t;
          r2 = Math.round(lr + (hr - lr) * ease);
          g2 = Math.round(lg + (hg - lg) * ease);
          b2 = Math.round(lb + (hb - lb) * ease);
          opacity = 0.14 + ease * 0.72;
          strokeWidth = 0.8 + ease * 1.2;
        }
        nextPaths.push({
          d: `M ${x1} ${y1} L ${x2} ${y2}`,
          opacity,
          width: strokeWidth,
          r: r2,
          g: g2,
          b: b2,
        });
      };

      for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols - 1; c++)
          addSeg(
            grid![r]![c]!.x,
            grid![r]![c]!.y,
            grid![r]![c + 1]!.x,
            grid![r]![c + 1]!.y
          );
      for (let c = 0; c < cols; c++)
        for (let r = 0; r < rows - 1; r++)
          addSeg(
            grid![r]![c]!.x,
            grid![r]![c]!.y,
            grid![r + 1]![c]!.x,
            grid![r + 1]![c]!.y
          );

      setPaths(nextPaths);
      frame = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(frame);
  }, [radius, strength, lr, lg, lb, hr, hg, hb]);

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
      {paths.map((seg, i) => (
        <path
          key={i}
          d={seg.d}
          fill="none"
          stroke={`rgb(${seg.r},${seg.g},${seg.b})`}
          strokeOpacity={seg.opacity}
          strokeWidth={seg.width}
        />
      ))}
    </svg>
  );
};
