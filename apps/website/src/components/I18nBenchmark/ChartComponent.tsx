import { useQuery } from '@tanstack/react-query';
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  type Plugin,
  Tooltip,
} from 'chart.js';
import { type FC, useEffect, useRef } from 'react';
import {
  type ChartItem,
  getLibLogoUrl,
  isIntlayerLib,
  LOGO_URLS,
} from './constants';

/** Vertical space reserved per bar so every library label stays readable. */
const ROW_HEIGHT_PIXELS = 28;
/** Room for the x axis ticks and chart padding. */
const AXIS_HEIGHT_PIXELS = 40;

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

/** Preloads every library logo so the chart plugin can draw them on canvas. */
export const useLogoImages = () =>
  useQuery({
    queryKey: ['logoImages'],
    queryFn: async () => {
      const imagesByUrl: Record<string, HTMLImageElement> = {};

      await Promise.all(
        LOGO_URLS.map(
          (logoUrl) =>
            new Promise<void>((resolve) => {
              const image = new window.Image();
              image.onload = image.onerror = () => {
                imagesByUrl[logoUrl] = image;
                resolve();
              };
              image.src = logoUrl;
            })
        )
      );

      return imagesByUrl;
    },
    staleTime: Infinity,
  });

export const ChartComponent: FC<{
  data: ChartItem[];
  unit: string;
  logoImages: Record<string, HTMLImageElement>;
  isDarkMode?: boolean;
}> = ({ data, unit, logoImages, isDarkMode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (data.length === 0) {
      chartRef.current?.destroy();
      chartRef.current = null;
      return;
    }

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    chartRef.current?.destroy();
    chartRef.current = null;

    const logoPlugin: Plugin<'bar'> = {
      id: 'logoPlugin',
      afterDraw(chart) {
        const yAxis = chart.scales?.y;
        if (!yAxis) return;
        const size = 14;
        const gap = 4;

        yAxis.ticks.forEach((tick, i) => {
          const label = Array.isArray(tick.label)
            ? tick.label[0]
            : (tick.label as string);
          const item = data.find((d) => d.label === label);
          if (!item) return;
          const logoUrl = getLibLogoUrl(item.libId);
          const img = logoUrl ? logoImages[logoUrl] : undefined;
          if (!img?.complete || !img.naturalWidth) return;

          const y = yAxis.getPixelForTick(i);
          const x = chart.chartArea.left - yAxis.width - size - gap;
          ctx.save();
          ctx.beginPath();
          ctx.arc(x + size / 2, y, size / 2, 0, Math.PI * 2);
          ctx.clip();
          if (isDarkMode && isIntlayerLib(item.libId)) {
            ctx.filter = 'brightness(0) invert(1)';
          }
          ctx.drawImage(img, x, y - size / 2, size, size);
          ctx.restore();
        });
      },
    };

    const rangePlugin: Plugin<'bar'> = {
      id: 'rangePlugin',
      afterDatasetsDraw(chart) {
        const ctx = chart.ctx;
        const meta = chart.getDatasetMeta(0);
        const xAxis = chart.scales.x;

        meta.data.forEach((element, index) => {
          const item = data[index];
          if (
            !item ||
            typeof item.min !== 'number' ||
            typeof item.max !== 'number'
          )
            return;
          if (item.min === item.max) return;

          const y = element.y;
          const xMin = xAxis.getPixelForValue(item.min);
          const xMax = xAxis.getPixelForValue(item.max);

          ctx.save();
          ctx.beginPath();
          ctx.strokeStyle = '#9ca3af'; // match neutral tick color
          ctx.lineWidth = 1.5;
          ctx.setLineDash([2, 1]); // optional: slightly dashed to indicate range or solid

          // main line connecting min to max
          ctx.moveTo(xMin, y);
          ctx.lineTo(xMax, y);
          ctx.stroke();

          // remove dash for the ticks
          ctx.setLineDash([]);
          const tickHeight = 8;
          ctx.beginPath();
          ctx.moveTo(xMin, y - tickHeight / 2);
          ctx.lineTo(xMin, y + tickHeight / 2);
          ctx.moveTo(xMax, y - tickHeight / 2);
          ctx.lineTo(xMax, y + tickHeight / 2);
          ctx.stroke();

          ctx.restore();
        });
      },
    };

    let isCancelled = false;

    // Defer chart instantiation to the next animation frame so that
    // Framer Motion's mounting animations have finished applying styles,
    // avoiding a forced reflow when Chart.js measures canvas dimensions.
    const rafId = requestAnimationFrame(() => {
      if (isCancelled || !canvasRef.current) return;

      const currentCtx = canvasRef.current.getContext('2d');
      if (!currentCtx) return;

      chartRef.current = new Chart(currentCtx, {
        type: 'bar',
        data: {
          labels: data.map((d) => d.label),
          datasets: [
            {
              data: data.map((d) => d.value),
              backgroundColor: data.map((d) => d.color),
              borderRadius: 6,
              borderSkipped: false,
            },
          ],
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          animation: { duration: 350 },
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const item = data[context.dataIndex];
                  let text = `${context.parsed.x?.toFixed(1)} ${unit}`;
                  if (item.min !== item.value || item.max !== item.value) {
                    text += ` (range: ${item.min.toFixed(1)} - ${item.max.toFixed(1)})`;
                  }
                  if (item.version) text += ` · v${item.version}`;
                  return text;
                },
              },
            },
          },
          layout: { padding: { left: 26, right: 16 } },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: '#9ca3af' },
              suggestedMax: Math.max(
                ...data.map((d) => Math.max(d.value, d.max))
              ),
            },
            y: {
              grid: { display: false },
              ticks: {
                color: '#9ca3af',
                font: { size: 11, weight: 'bold' },
                autoSkip: false,
              },
            },
          },
        },
        plugins: [logoPlugin, rangePlugin],
      });
    });

    return () => {
      isCancelled = true;
      cancelAnimationFrame(rafId);
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, [data, unit, logoImages, isDarkMode]);

  return (
    <div
      className="relative size-full"
      style={{
        minHeight: data.length * ROW_HEIGHT_PIXELS + AXIS_HEIGHT_PIXELS,
      }}
    >
      <canvas ref={canvasRef} className="block size-full" />
    </div>
  );
};
