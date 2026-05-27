/** @jsxImportSource react */

import { DocumentationRender } from '@components/DocPage/DocumentationRender';
import type { LocalesValues } from 'intlayer';
import type { FC } from 'react';
import { MarkdownPreviewEmptyState } from '@/app/[locale]/markdown/MarkdownPreviewEmptyState';
import { MarkdownPreviewErrorState } from '@/app/[locale]/markdown/MarkdownPreviewErrorState';
import { WebsiteIslandWrapper } from './WebsiteIslandWrapper';

type Props = {
  locale: LocalesValues;
  content?: string;
  errorMessage?: string;
  hasUrl: boolean;
};

export const MarkdownPreviewIsland: FC<Props> = ({
  locale,
  content,
  errorMessage,
  hasUrl,
}) => (
  <WebsiteIslandWrapper locale={locale}>
    {!hasUrl && <MarkdownPreviewEmptyState />}
    {hasUrl && errorMessage && (
      <MarkdownPreviewErrorState message={errorMessage} />
    )}
    {hasUrl && content && (
      <div className="mx-auto max-w-2xl px-10">
        <DocumentationRender>{content}</DocumentationRender>
      </div>
    )}
  </WebsiteIslandWrapper>
);
