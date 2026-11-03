import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  type ChartConfiguration,
  Legend,
  LinearScale,
  type Plugin,
  Tooltip,
} from 'chart.js';
import { type FC, useEffect, useRef } from 'react';
import type { ChartItem } from './constants';

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

export const ChartComponent: FC<{
  data: ChartItem[];
  unit: string;
}> = ({ data, unit }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;

    if (!container || !canvas || data.length === 0) return;

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

    const configuration: ChartConfiguration<'bar'> = {
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
        // Sized by the ResizeObserver below.
        responsive: false,
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
        layout: { padding: { right: 16 } },
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
      plugins: [rangePlugin],
    };

    let chart: Chart<'bar'> | null = null;

    // Chart.js measures its canvas when it is created and on every resize.
    // `ResizeObserver` callbacks run right after layout, so measuring there is
    // free; Chart.js' own responsive mode (and a requestAnimationFrame) reads
    // before layout and forces a reflow instead.
    const resizeObserver = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;

      if (width === 0 && height === 0) return;

      if (chart) {
        chart.resize(width, height);
        return;
      }

      chart = new Chart(canvas, configuration);
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      chart?.destroy();
    };
  }, [data, unit]);

  return (
    <div
      ref={containerRef}
      className="relative size-full"
      style={{
        minHeight: data.length * ROW_HEIGHT_PIXELS + AXIS_HEIGHT_PIXELS,
      }}
    >
      <canvas ref={canvasRef} className="block size-full" />
    </div>
  );
};
