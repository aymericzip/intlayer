import { WebMCPTools } from '@components/WebMCP';
import type { FC, PropsWithChildren } from 'react';
import { AppProviders } from '@/providers/AppProviders';

export { generateStaticParams } from 'next-intlayer';
export { generateMetadata, viewport } from './metadata';

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  <AppProviders>
    {/* Titled feed link — Next.js alternates API omits the title attribute */}
    <link
      rel="alternate"
      type="application/rss+xml"
      title="Intlayer RSS Feed"
      href="/feed.xml"
    />
    {/* Exposes the documentation to agents via the WebMCP browser API */}
    <WebMCPTools />
    {children}
  </AppProviders>
);

export default RootLayout;
