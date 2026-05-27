/** @jsxImportSource react */

import { DocHeader } from '@components/DocPage/DocHeader/DocHeader';
import { DocPageLayout } from '@components/DocPage/DocPageLayout';
import {
  DocPageNavigation,
  type DocPageNavigationProps,
} from '@components/DocPage/DocPageNavigation/DocPageNavigation';
import { DocumentationRender } from '@components/DocPage/DocumentationRender';
import { CreativeWorkHeader } from '@structuredData/CreativeWorkHeader';
import type { LocalesValues } from 'intlayer';
import type { FC } from 'react';
import { WebsiteIslandWrapper } from './WebsiteIslandWrapper';

type DocPageIslandProps = {
  locale: LocalesValues;
  slugs: string[];
  docData: {
    title: string;
    description: string;
    keywords: string[];
    createdAt: string;
    updatedAt: string;
    url: string;
    docKey: string;
    history?: { date: string; version: string; changes: string }[];
    slugs: string[];
  };
  defaultUpdatedAt: string;
  docContent: string;
  nextDoc?: { title: string; url: string };
  prevDoc?: { title: string; url: string };
};

export const DocPageIsland: FC<DocPageIslandProps> = ({
  locale,
  slugs,
  docData,
  defaultUpdatedAt,
  docContent,
  nextDoc,
  prevDoc,
}) => (
  <WebsiteIslandWrapper locale={locale} footer={<></>}>
    <DocPageLayout activeSlugs={slugs} locale={locale}>
      <CreativeWorkHeader
        creativeWorkName={docData.title}
        creativeWorkDescription={docData.description}
        creativeWorkContent={docContent}
        keywords={docData.keywords.join(', ')}
        dateModified={new Date(docData.updatedAt)}
        datePublished={new Date(docData.createdAt)}
        url={docData.url}
      />
      <DocHeader
        {...(docData as any)}
        markdownContent={docContent}
        baseUpdatedAt={defaultUpdatedAt}
        history={docData.history ?? []}
      />
      <DocumentationRender>{docContent}</DocumentationRender>
      <DocPageNavigation nextDoc={nextDoc} prevDoc={prevDoc} />
    </DocPageLayout>
  </WebsiteIslandWrapper>
);
