import { DocumentationRender } from '@components/DocPage/DocumentationRender';
import { OrganizationHeader } from '@structuredData/OrganizationHeader';
import { SoftwareApplicationHeader } from '@structuredData/SoftwareApplication';
import { WebsiteHeader } from '@structuredData/WebsiteHeader';
import { urlRenamer } from '@utils/markdown';
import { assertSafeRemoteMarkdownUrl } from '@utils/remoteMarkdownUrl';
import { getIntlayer, type LocalesValues } from 'intlayer';
import { connection } from 'next/server';
import type { LocalPromiseParams } from 'next-intlayer';
import type { ReactNode } from 'react';
import { MarkdownPreviewEmptyState } from './MarkdownPreviewEmptyState';
import { MarkdownPreviewErrorState } from './MarkdownPreviewErrorState';

type MarkdownPreviewPageProps = LocalPromiseParams & {
  searchParams: Promise<{ url?: string | string[] }>;
};

const firstString = (
  value: string | string[] | undefined
): string | undefined => (Array.isArray(value) ? value[0] : value);

const fetchRemoteMarkdown = async (source: URL): Promise<string> => {
  const response = await fetch(source.toString(), {
    cache: 'no-store',
    headers: { Accept: 'text/markdown, text/plain, */*' },
    signal: AbortSignal.timeout(20_000),
  });

  if (!response.ok) {
    throw new Error(`Failed to load markdown (${response.status})`);
  }

  return response.text();
};

/**
 * Renders a remote markdown document named by the `url` search param.
 *
 * `connection()` replaces the `dynamic = 'force-dynamic'` segment config, which
 * Cache Components does not accept. The page is request-time by nature — it
 * reads `searchParams` and fetches an arbitrary URL with `no-store`, both of
 * which return promises that never resolve during a prerender.
 */
const MarkdownPreviewPage = async ({
  params,
  searchParams,
}: MarkdownPreviewPageProps): Promise<ReactNode> => {
  await connection();

  const { locale } = await params;
  const sp = await searchParams;
  const rawUrl = firstString(sp.url);

  if (!rawUrl) {
    return (
      <>
        <WebsiteHeader key={locale} />
        <OrganizationHeader />
        <SoftwareApplicationHeader />
        <MarkdownPreviewEmptyState />
      </>
    );
  }

  let markdown: string;
  try {
    const source = assertSafeRemoteMarkdownUrl(rawUrl);
    markdown = urlRenamer(
      await fetchRemoteMarkdown(source),
      locale as LocalesValues
    );
  } catch (err) {
    const { unknownLoadError } = getIntlayer(
      'markdown-preview-page',
      locale as LocalesValues
    );
    const message = err instanceof Error ? err.message : unknownLoadError;
    return (
      <>
        <WebsiteHeader key={locale} />
        <OrganizationHeader />
        <SoftwareApplicationHeader />
        <MarkdownPreviewErrorState message={message} />
      </>
    );
  }

  return (
    <>
      <WebsiteHeader key={locale} />
      <OrganizationHeader />
      <SoftwareApplicationHeader />
      <div className="mx-auto max-w-2xl px-10">
        <DocumentationRender>{markdown}</DocumentationRender>
      </div>
    </>
  );
};

export default MarkdownPreviewPage;
