import { Container } from '@intlayer/design-system/container';
import { H1 } from '@intlayer/design-system/headers';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { DocumentationRender } from '~/components/DocPage/DocumentationRender';
import type { RemoteMarkdownResult } from '~/serverFunctions/remoteMarkdown';

type MarkdownPreviewErrorStateProps = {
  message: string;
};

const MarkdownPreviewErrorState: FC<MarkdownPreviewErrorStateProps> = ({
  message,
}) => {
  const { title, unknownLoadError } = useIntlayer('markdown-preview');

  return (
    <Container padding="lg" className="mx-auto max-w-3xl py-16">
      <H1>{title}</H1>
      <p className="mt-4 text-error" role="alert">
        {message || unknownLoadError}
      </p>
    </Container>
  );
};

type MarkdownPreviewProps = {
  result: RemoteMarkdownResult;
};

/**
 * Renders a remote markdown document fetched by `loadRemoteMarkdown`, or the
 * reason it could not be loaded.
 */
export const MarkdownPreview: FC<MarkdownPreviewProps> = ({ result }) => {
  if (result.status === 'error') {
    return <MarkdownPreviewErrorState message={result.message} />;
  }

  return (
    <div className="mx-auto max-w-2xl px-10">
      <DocumentationRender codeStyleSheet={result.codeStyleSheet}>
        {result.markdownParsed}
      </DocumentationRender>
    </div>
  );
};
