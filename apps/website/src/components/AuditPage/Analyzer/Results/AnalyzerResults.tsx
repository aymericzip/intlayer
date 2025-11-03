'use client';
// biome-ignore assist/source/organizeImports: <explanation>
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
import { useIntlayer } from 'next-intlayer';
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
  data: any;
  url: string;
}) {
  const { score, statusLabels, messages, fields } =
    useIntlayer('analyzer-results');

  if (data.error) {
    return (
      <div className="mt-10 w-full max-w-2xl rounded-2xl border border-gray-100 bg-white p-6 shadow-md dark:border-neutral-700 dark:bg-neutral-800">
        <p className="font-medium text-red-500">{data.error}</p>
      </div>
    );
  }

  const getStatusLabel = () => {
    if (data.score >= 70) return statusLabels.good.value;
    if (data.score >= 40) return statusLabels.medium.value;
    return statusLabels.bad.value;
  };

  const fieldsList = [
    {
      icon: <Globe size={16} />,
      label: fields.langTag.value,
      value: data.summary.langTag,
    },
    {
      icon: <FileText size={16} />,
      label: fields.hreflangs.value,
      value: data.summary.hreflangs,
    },
    {
      icon: <BarChart3 size={16} />,
      label: fields.diversity.value,
      value: data.summary.hreflangDiversity,
    },
    {
      icon: <Languages size={16} />,
      label: fields.langSelector.value,
      value: <StatusIcon ok={data.summary.hasLangSelector} />,
    },
    {
      icon: <Flag size={16} />,
      label: fields.flags.value,
      value: <StatusIcon ok={data.summary.hasFlagIcons} />,
    },
    {
      icon: <LinkIcon size={16} />,
      label: fields.canonical.value,
      value: <StatusIcon ok={data.summary.hasCanonical} />,
    },
    {
      icon: <Blocks size={16} />,
      label: fields.localizedUrls.value,
      value: <StatusIcon ok={data.summary.urlStructureLocalized} />,
    },
    {
      icon: <MapIcon size={16} />,
      label: fields.sitemap.value,
      value: <StatusIcon ok={data.summary.sitemapHasAlternate} />,
    },
    {
      icon: <Bot size={16} />,
      label: fields.robots.value,
      value: <StatusIcon ok={data.summary.robotsHasLocales} />,
    },
    {
      icon: <Link2 size={16} />,
      label: fields.localizedLinks.value,
      value: <StatusIcon ok={data.summary.hasLocalizedLinks} />,
    },
  ];

  return (
    <div className="mt-10 w-full max-w-2xl rounded-2xl border border-gray-100 bg-white p-6 shadow-md dark:border-neutral-700 dark:bg-neutral-800">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-semibold text-2xl text-neutral-900 dark:text-neutral-100">
          {score.title.value}:{' '}
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
          {getStatusLabel()}
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
              alt={messages.websitePreview.value}
              width={300}
              height={180}
              unoptimized
              className="rounded-xl border-4 border-white object-contain shadow-md dark:border-neutral-600"
            />
          </div>
          <div className="flex-1">
            <h3 className="mb-2 font-semibold text-neutral-900 text-xl dark:text-neutral-100">
              {data.summary.title || messages.noTitle.value}
            </h3>
            <p className="text-neutral-600 text-sm leading-relaxed dark:text-neutral-300">
              {data.summary.metaDescription || messages.noDescription.value}
            </p>
          </div>
        </a>
      )}

      <div className="my-6 border-gray-200 border-t dark:border-neutral-700" />

      <div className="grid grid-cols-2 gap-2 text-neutral-700 text-sm sm:grid-cols-3 dark:text-neutral-300">
        {fieldsList.map((item, idx) => (
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
