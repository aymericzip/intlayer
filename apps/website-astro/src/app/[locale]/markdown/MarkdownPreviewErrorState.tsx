import { Container } from '@intlayer/design-system/container';
import { H1 } from '@intlayer/design-system/headers';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';

type MarkdownPreviewErrorStateProps = {
  message: string;
};

export const MarkdownPreviewErrorState: FC<MarkdownPreviewErrorStateProps> = ({
  message,
}) => {
  const { title } = useIntlayer('markdown-preview-page');

  return (
    <Container padding="lg" className="mx-auto max-w-3xl py-16">
      <H1>{title}</H1>
      <p className="mt-4 text-destructive" role="alert">
        {message}
      </p>
    </Container>
  );
};
