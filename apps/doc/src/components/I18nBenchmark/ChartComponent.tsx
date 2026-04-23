'use client';

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
import type { ChartItem, StaticImport } from './constants';
import { LIB_LOGOS } from './constants';

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export const useLogoImages = () => {
  return useQuery({
    queryKey: ['logoImages'],
    queryFn: async () => {
      const entries: Array<[string, string]> = Object.entries(
        LIB_LOGOS
      ).flatMap(([id, logo]) => {
        if (!logo) return [[id, '/logo.svg']] as [string, string][];
        const src = (logo as StaticImport).src;
        return src ? ([[id, src]] as [string, string][]) : [];
      });

      const map = new Map<string, HTMLImageElement>();
      await Promise.all(
        entries.map(([id, src]) => {
          return new Promise<void>((resolve) => {
            const img = new window.Image();
            img.onload = img.onerror = () => {
              map.set(id, img);
              resolve();
            };
            img.src = src;
          });
        })
      );
      return map;
    },
    staleTime: Infinity,
  });
};

export const ChartComponent: FC<{
  data: ChartItem[];
  unit: string;
  logoImages: Map<string, HTMLImageElement>;
}> = ({ data, unit, logoImages }) => {
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
          const img = logoImages.get(item.libId);
          if (!img?.complete || !img.naturalWidth) return;

          const y = yAxis.getPixelForTick(i);
          const x = chart.chartArea.left - yAxis.width - size - gap;
          ctx.save();
          ctx.beginPath();
          ctx.arc(x + size / 2, y, size / 2, 0, Math.PI * 2);
          ctx.clip();
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

    chartRef.current = new Chart(ctx, {
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
            ticks: { color: '#9ca3af', font: { size: 11, weight: 'bold' } },
          },
        },
      },
      plugins: [logoPlugin, rangePlugin],
    });

    return () => {
      chartRef.current?.destroy();
    };
  }, [data, unit, logoImages]);

  return <canvas ref={canvasRef} className="h-full w-full" />;
};
