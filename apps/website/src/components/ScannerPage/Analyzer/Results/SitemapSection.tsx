'use client';

import { Globe, Link as LinkIcon, Map as MapIcon } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import { memo } from 'react';
import { FieldItem } from './FieldItem';
import type { MergedData } from './types';

type SitemapSectionProps = {
  data: MergedData;
  isLoading?: boolean;
};

export const SitemapSection: FC<SitemapSectionProps> = memo(
  ({ data, isLoading }) => {
    const { sections, sitemapLabels } = useIntlayer('analyzer-results');

    return (
      <>
        <h3 className="mt-6 mb-3 font-semibold text-lg text-text/80">
          {sections.sitemap}
        </h3>
        <div className="mt-2 grid grid-cols-1 gap-x-8 gap-y-2 px-2 text-sm sm:grid-cols-2">
          <FieldItem
            id="urlsDiscovered"
            icon={<MapIcon size={16} />}
            label={sitemapLabels.urlsDiscovered}
            event={data['sitemap_sitemapPresent']}
            details={sitemapLabels.urlsDiscoveredDescription}
            isLoading={isLoading}
          />
          <FieldItem
            id="alternatesPresent"
            icon={<LinkIcon size={16} />}
            label={sitemapLabels.alternatesPresent}
            event={data['sitemap_noLocalizedUrlsForgotten']}
            details={sitemapLabels.alternatesPresentDescription}
            isLoading={isLoading}
          />
          <FieldItem
            id="xDefaultPresent"
            icon={<Globe size={16} />}
            label={sitemapLabels.xDefaultPresent}
            event={data['sitemap_hasXDefault']}
            details={sitemapLabels.xDefaultPresentDescription}
            isLoading={isLoading}
          />
        </div>
      </>
    );
  }
);
