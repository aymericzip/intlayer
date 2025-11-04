'use client';

import { Globe, Link as LinkIcon, Map as MapIcon } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import { memo } from 'react';
import { InformationTag, StatusIcon } from './AnalyzerPageResults';

type SitemapSectionProps = {
  data: any;
};

export const SitemapSection: FC<SitemapSectionProps> = memo(({ data }) => {
  const { sections, sitemapLabels } = useIntlayer('analyzer-results');

  return (
    <>
      <h3 className="mt-6 mb-3 font-semibold text-lg text-text/80">
        {sections.sitemap}
      </h3>
      <div className="mt-2 grid grid-cols-1 gap-x-8 gap-y-2 px-2 text-sm sm:grid-cols-2">
        <div className="grid grid-cols-[auto_auto_1fr_auto] items-center gap-2 text-neutral">
          <MapIcon size={16} />
          <strong>{sitemapLabels.urlsDiscovered}</strong>
          <span className="flex items-center gap-2 text-left text-text/70">
            <StatusIcon ok={(data?.summary?.sitemapUrlsCount ?? 0) > 0} />
            {data?.summary?.sitemapUrlsCount ?? 0}
          </span>
          <InformationTag id="urlsDiscovered">
            {sitemapLabels.urlsDiscoveredDescription}
          </InformationTag>
        </div>
        <div className="grid grid-cols-[auto_auto_1fr_auto] items-center gap-2 text-neutral">
          <LinkIcon size={16} />
          <strong>{sitemapLabels.alternatesPresent}</strong>
          <span className="text-left text-text/70">
            <StatusIcon ok={Boolean(data?.summary?.sitemapHasAlternate)} />
          </span>
          <InformationTag id="alternatesPresent">
            {sitemapLabels.alternatesPresentDescription}
          </InformationTag>
        </div>
        <div className="grid grid-cols-[auto_auto_1fr_auto] items-center gap-2 text-neutral">
          <Globe size={16} />
          <strong>{sitemapLabels.xDefaultPresent}</strong>
          <span className="text-left text-text/70">
            <StatusIcon ok={Boolean(data?.summary?.sitemapHasXDefault)} />
          </span>
          <InformationTag id="xDefaultPresent">
            {sitemapLabels.xDefaultPresentDescription}
          </InformationTag>
        </div>
      </div>
    </>
  );
});
