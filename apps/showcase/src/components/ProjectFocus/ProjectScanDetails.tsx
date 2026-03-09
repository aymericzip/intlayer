import { Container, H2 } from '@intlayer/design-system';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import type { ShowcaseProject } from '#/utils/projectActions/types';
import { AnalyzerPageResults } from '../Scanner/Analyzer/Results/AnalyzerPageResults';
import { RobotsSection } from '../Scanner/Analyzer/Results/RobotsSection';
import { SitemapSection } from '../Scanner/Analyzer/Results/SitemapSection';
import type {
  AuditStatus,
  MergedData,
} from '../Scanner/Analyzer/Results/types';

interface ProjectScanDetailsProps {
  project: ShowcaseProject;
}

export const ProjectScanDetails: FC<ProjectScanDetailsProps> = ({
  project,
}) => {
  const content = useIntlayer('project-scan-details');
  const scan = project.scanDetails;

  // Map project scanDetails to MergedData expected by Scanner components
  const url = project.websiteUrl;
  const mergedData: MergedData = {
    [`url_htmlLang\\${url}`]: {
      status: (scan?.langTag ? 'success' : 'error') as AuditStatus,
      data: { successDetails: scan?.langTag || null },
    },
    [`url_htmlDir\\${url}`]: {
      status: 'success' as AuditStatus,
      data: { successDetails: scan?.htmlDir || 'ltr' },
    },
    [`url_hreflang\\${url}`]: {
      status: (scan?.hreflangs?.length ? 'success' : 'error') as AuditStatus,
      data: { successDetails: scan?.hreflangs || [] },
    },
    [`url_hasXDefault\\${url}`]: {
      status: (scan?.hasXDefault ? 'success' : 'error') as AuditStatus,
    },
    [`url_hasCanonical\\${url}`]: {
      status: (scan?.hasCanonical ? 'success' : 'error') as AuditStatus,
    },
    [`url_hasLocalizedLinks\\${url}`]: {
      status: (scan?.hasLocalizedLinks ? 'success' : 'error') as AuditStatus,
    },
    robots_robotsPresent: {
      status: (scan?.robotsTxt?.accessible
        ? 'success'
        : 'error') as AuditStatus,
    },
    robots_noLocalizedUrlsForgotten: {
      status: (scan?.robotsTxt?.disallowWithoutLocaleAlternates
        ? 'success'
        : 'error') as AuditStatus,
    },
    sitemap_sitemapPresent: {
      status: (scan?.sitemapXml?.urlsDiscoveredCount
        ? 'success'
        : 'error') as AuditStatus,
    },
    sitemap_noLocalizedUrlsForgotten: {
      status: (scan?.sitemapXml?.alternatesPresent
        ? 'success'
        : 'error') as AuditStatus,
    },
    sitemap_hasXDefault: {
      status: (scan?.sitemapXml?.xDefaultPresent
        ? 'success'
        : 'error') as AuditStatus,
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <H2 className="font-bold text-text text-xl">{content.seoHeader}</H2>
        <p className="text-neutral text-xs">{content.seoDescription}</p>
      </div>
      <Container roundedSize="3xl" padding="lg" transparency="lg">
        <AnalyzerPageResults data={mergedData} url={url} />

        <div className="mt-8 grid grid-cols-1 gap-8 border-neutral/20 border-t border-dashed pt-8 md:grid-cols-2">
          <div>
            <RobotsSection data={mergedData} />
          </div>
          <div>
            <SitemapSection data={mergedData} />
          </div>
        </div>
      </Container>
    </div>
  );
};
