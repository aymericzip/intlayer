/** @jsxImportSource react */

import { DocumentationRender } from '@components/DocPage/DocumentationRender';
import type { LocalesValues } from 'intlayer';
import type { FC } from 'react';
import { WebsiteIslandWrapper } from './WebsiteIslandWrapper';

export const FrequentQuestionPageIsland: FC<{
  locale: LocalesValues;
  content: string;
}> = ({ locale, content }) => (
  <WebsiteIslandWrapper locale={locale}>
    <div className="mx-auto max-w-2xl">
      <DocumentationRender>{content}</DocumentationRender>
    </div>
  </WebsiteIslandWrapper>
);
