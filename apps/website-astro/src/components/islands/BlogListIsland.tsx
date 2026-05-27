/** @jsxImportSource react */

import { BlogPageLayout } from '@components/BlogPage/BlogPageLayout';
import type { LocalesValues } from 'intlayer';
import type { FC } from 'react';
import { WebsiteIslandWrapper } from './WebsiteIslandWrapper';

export const BlogListIsland: FC<{ locale: LocalesValues }> = ({ locale }) => (
  <WebsiteIslandWrapper locale={locale}>
    <BlogPageLayout activeSlugs={[]} locale={locale}>
      <div />
    </BlogPageLayout>
  </WebsiteIslandWrapper>
);
