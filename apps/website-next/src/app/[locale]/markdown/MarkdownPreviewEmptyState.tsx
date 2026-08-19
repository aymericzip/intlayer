'use client';

import { Container } from '@intlayer/design-system/container';
import { H1 } from '@intlayer/design-system/headers';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';

export const MarkdownPreviewEmptyState: FC = () => {
  const {
    title,
    emptyStateBeforeUrl,
    emptyStateBetweenUrlAndHttps,
    emptyStateAfterHttps,
  } = useIntlayer('markdown-preview-page');

  return (
    <Container padding="lg" className="mx-auto max-w-3xl py-16">
      <H1>{title}</H1>
      <p className="mt-4 text-text/80">
        {emptyStateBeforeUrl}
        <code className="rounded bg-muted px-1 py-0.5">url</code>
        {emptyStateBetweenUrlAndHttps}
        <code className="rounded bg-muted px-1 py-0.5">https</code>
        {emptyStateAfterHttps}
      </p>
    </Container>
  );
};
