import { DocumentationRender } from '@components/DocPage/DocumentationRender';
import { urlRenamer } from '@utils/markdown';
import { assertSafeRemoteMarkdownUrl } from '@utils/remoteMarkdownUrl';
import { getIntlayer, type LocalesValues } from 'intlayer';
import type { LocalPromiseParams } from 'next-intlayer';
import { IntlayerServerProvider } from 'next-intlayer/server';
import type { ReactNode } from 'react';
import { MarkdownPreviewEmptyState } from './MarkdownPreviewEmptyState';
import { MarkdownPreviewErrorState } from './MarkdownPreviewErrorState';

export const dynamic = 'force-dynamic';

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

const MarkdownPreviewPage = async ({
  params,
  searchParams,
}: MarkdownPreviewPageProps): Promise<ReactNode> => {
  const { locale } = await params;
  const sp = await searchParams;
  const rawUrl = firstString(sp.url);

  if (!rawUrl) {
    return (
      <IntlayerServerProvider locale={locale}>
        <MarkdownPreviewEmptyState />
      </IntlayerServerProvider>
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
      <IntlayerServerProvider locale={locale}>
        <MarkdownPreviewErrorState message={message} />
      </IntlayerServerProvider>
    );
  }

  return (
    <IntlayerServerProvider locale={locale}>
      <div className="mx-auto max-w-2xl px-10">
        <DocumentationRender>{markdown}</DocumentationRender>
      </div>
    </IntlayerServerProvider>
  );
};

export default MarkdownPreviewPage;
