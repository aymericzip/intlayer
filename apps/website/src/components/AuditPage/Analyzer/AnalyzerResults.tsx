'use client';

import {
  BarChart3,
  Blocks,
  Bot,
  CheckCircle2,
  FileText,
  Flag,
  Globe,
  Languages,
  Link2,
  Link as LinkIcon,
  Map as MapIcon,
  XCircle,
} from 'lucide-react';
import Image from 'next/image';

const StatusIcon = ({ ok }: { ok: boolean }) =>
  ok ? (
    <CheckCircle2 size={16} className="text-green-600" />
  ) : (
    <XCircle size={16} className="text-red-500" />
  );

export default function AnalyzerResults({
  data,
  url,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  url: string;
}) {
  if (data.error) {
    return (
      <div className="mt-10 w-full max-w-2xl rounded-2xl border border-gray-100 bg-white p-6 shadow-md dark:border-neutral-700 dark:bg-neutral-800">
        <p className="font-medium text-red-500">{data.error}</p>
      </div>
    );
  }

  return (
    <div className="mt-10 w-full max-w-2xl rounded-2xl border border-gray-100 bg-white p-6 shadow-md dark:border-neutral-700 dark:bg-neutral-800">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-semibold text-2xl text-neutral-900 dark:text-neutral-100">
          Score:{' '}
          <span
            className={
              data.score >= 70
                ? 'text-green-600'
                : data.score >= 40
                  ? 'text-yellow-600'
                  : 'text-red-600'
            }
          >
            {data.score}/100
          </span>
        </h2>
        <span
          className={`rounded-full px-3 py-1 text-sm ${
            data.score >= 70
              ? 'bg-green-100 text-green-700'
              : data.score >= 40
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-red-100 text-red-700'
          }`}
        >
          {data.label}
        </span>
      </div>

      {data.summary.ogImage && (
        <a
          href={data.summary.url || url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 flex cursor-pointer flex-col items-start gap-6 rounded-xl border border-gray-100 p-4 transition-all hover:scale-[1.02] hover:bg-neutral-100 hover:shadow-sm sm:flex-row dark:border-neutral-700 dark:hover:bg-neutral-700"
        >
          <div className="flex-shrink-0">
            <Image
              src={data.summary.ogImage}
              alt="Website preview"
              width={300}
              height={180}
              unoptimized
              className="rounded-xl border-4 border-white object-contain shadow-md dark:border-neutral-600"
            />
          </div>
          <div className="flex-1">
            <h3 className="mb-2 font-semibold text-neutral-900 text-xl dark:text-neutral-100">
              {data.summary.title || 'No title'}
            </h3>
            <p className="text-neutral-600 text-sm leading-relaxed dark:text-neutral-300">
              {data.summary.metaDescription || 'No meta description available.'}
            </p>
          </div>
        </a>
      )}

      <div className="my-6 border-gray-200 border-t dark:border-neutral-700" />

      <div className="grid grid-cols-2 gap-2 text-neutral-700 text-sm sm:grid-cols-3 dark:text-neutral-300">
        {[
          {
            icon: <Globe size={16} />,
            label: 'Lang tag',
            value: data.summary.langTag,
          },
          {
            icon: <FileText size={16} />,
            label: 'Hreflangs',
            value: data.summary.hreflangs,
          },
          {
            icon: <BarChart3 size={16} />,
            label: 'Diversity',
            value: data.summary.hreflangDiversity,
          },
          {
            icon: <Languages size={16} />,
            label: 'Lang selector',
            value: <StatusIcon ok={data.summary.hasLangSelector} />,
          },
          {
            icon: <Flag size={16} />,
            label: 'Flags',
            value: <StatusIcon ok={data.summary.hasFlagIcons} />,
          },
          {
            icon: <LinkIcon size={16} />,
            label: 'Canonical',
            value: <StatusIcon ok={data.summary.hasCanonical} />,
          },
          {
            icon: <Blocks size={16} />,
            label: 'Localized URLs',
            value: <StatusIcon ok={data.summary.urlStructureLocalized} />,
          },
          {
            icon: <MapIcon size={16} />,
            label: 'Sitemap',
            value: <StatusIcon ok={data.summary.sitemapHasAlternate} />,
          },
          {
            icon: <Bot size={16} />,
            label: 'Robots.txt',
            value: <StatusIcon ok={data.summary.robotsHasLocales} />,
          },
          {
            icon: <Link2 size={16} />,
            label: 'Localized links',
            value: <StatusIcon ok={data.summary.hasLocalizedLinks} />,
          },
        ].map((item, idx) => (
          <p
            key={idx}
            className="flex items-center gap-2 rounded-lg px-2 py-1 transition-all hover:scale-[1.05] hover:bg-neutral-100 dark:hover:bg-neutral-700"
          >
            {item.icon} <strong>{item.label}:</strong> {item.value}
          </p>
        ))}
      </div>
    </div>
  );
}
