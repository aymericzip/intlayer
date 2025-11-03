'use client';

import { Tag } from '@intlayer/design-system';
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
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';

const StatusIcon: FC<{ ok: boolean }> = ({ ok }) =>
  ok ? (
    <CheckCircle2 size={16} className="text-green-600" />
  ) : (
    <XCircle size={16} className="text-red-500" />
  );

type AnalyzerResultsProps = {
  data: any;
  url: string;
};

export const AnalyzerSiteResults: FC<AnalyzerResultsProps> = ({ data }) => {
  const { score, status, messages } = useIntlayer('analyzer-results');
  return (
    <div className="flex flex-col pb-6">
      <div className="mb-4 flex items-center justify-between">
        <span className="font-semibold text-2xl text-text/70">
          <span className="mr-2 text-neutral">{score.title}:</span>
          <span className="mr-1 text-text">{data.score}</span>
          <span className="text-neutral text-sm">/100</span>
        </span>

        <Tag color={status(data.score).color.value} size="md">
          {status(data.score).label}
        </Tag>
      </div>

      {data.summary.ogImage && (
        <div className="flex items-center gap-8">
          <Image
            src={data.summary.ogImage}
            alt={messages.websitePreview}
            width={300}
            height={180}
            unoptimized
            className="rounded-xl border-4 border-neutral"
          />
          <div className="flex-1 text-left">
            <h3 className="mb-2 font-semibold text-neutral-900 text-xl dark:text-neutral-100">
              {data.summary.title ?? messages.noTitle}
            </h3>
            <p className="text-neutral text-sm">
              {data.summary.metaDescription ?? messages.noDescription}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export const AnalyzerPageResults: FC<AnalyzerResultsProps> = ({ data }) => {
  const { fields } = useIntlayer('analyzer-results');

  const fieldsList = [
    {
      icon: <Globe size={16} />,
      label: fields.langTag,
      value: data.summary.langTag,
    },
    {
      icon: <FileText size={16} />,
      label: fields.hreflangs,
      value: data.summary.hreflangs,
    },
    {
      icon: <BarChart3 size={16} />,
      label: fields.diversity,
      value: data.summary.hreflangDiversity,
    },
    {
      icon: <Languages size={16} />,
      label: fields.langSelector,
      value: <StatusIcon ok={data.summary.hasLangSelector} />,
    },
    {
      icon: <Flag size={16} />,
      label: fields.flags,
      value: <StatusIcon ok={data.summary.hasFlagIcons} />,
    },
    {
      icon: <LinkIcon size={16} />,
      label: fields.canonical,
      value: <StatusIcon ok={data.summary.hasCanonical} />,
    },
    {
      icon: <Blocks size={16} />,
      label: fields.localizedUrls,
      value: <StatusIcon ok={data.summary.urlStructureLocalized} />,
    },
    {
      icon: <MapIcon size={16} />,
      label: fields.sitemap,
      value: <StatusIcon ok={data.summary.sitemapHasAlternate} />,
    },
    {
      icon: <Bot size={16} />,
      label: fields.robots,
      value: <StatusIcon ok={data.summary.robotsHasLocales} />,
    },
    {
      icon: <Link2 size={16} />,
      label: fields.localizedLinks,
      value: <StatusIcon ok={data.summary.hasLocalizedLinks} />,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-2 border-neutral border-t border-dashed pt-6 text-sm sm:grid-cols-3">
      {fieldsList.map((item) => (
        <p
          key={item.label}
          className="flex items-center gap-2 rounded-lg px-2 py-1 text-neutral"
        >
          {item.icon} <strong>{item.label}:</strong>{' '}
          <span className="text-text/70">{item.value}</span>
        </p>
      ))}
    </div>
  );
};

export const AnalyzerResults: FC<AnalyzerResultsProps> = ({ data, url }) => {
  if (data.error) {
    return <span className="text-error">{data.error}</span>;
  }

  return (
    <div className="mt-10 w-full max-w-2xl rounded-2xl bg-card p-6 shadow-md">
      <AnalyzerSiteResults data={data} url={url} />
      <AnalyzerPageResults data={data} url={url} />
    </div>
  );
};
