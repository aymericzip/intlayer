import { Container } from '@intlayer/design-system';
import type { DocMetadata } from '@intlayer/docs';
import { useIntlayer, useLocale } from 'next-intlayer/server';
import type { FC } from 'react';
import { ApplicationTemplateMessage } from '../ApplicationTemplateMessage';
import { ContributionMessage } from '../ContributionMessage';
import { CopyMarkdownMessage } from '../CopyMarkdownMessage';
import { History } from '../History';
import { MCPMessage } from '../MCPMessage';
import { ScrollWellAndTitle } from '../ScrollWell';
import { SummarizeAI } from '../SummarizeAI/SummarizeAI';
import { TranslatedContentMessage } from '../TranslatedContentMessage';
import { YoutubeVideoMessage } from '../YoutubeVideoMessage';

type DocHeaderProps = DocMetadata & {
  markdownContent: string;
  baseUpdatedAt?: string;
  history?: {
    version: string;
    date: string;
    changes: string;
  }[];
};

export const DocHeader: FC<DocHeaderProps> = ({
  author,
  updatedAt,
  createdAt,
  url,
  relativeUrl,
  markdownContent,
  githubUrl,
  youtubeVideo,
  applicationTemplate,
  baseUpdatedAt,
  history,
}) => {
  const { locale } = useLocale();
  const { authorLabel, creationLabel, lastUpdateLabel } =
    useIntlayer('doc-header');

  return (
    <>
      <header className="z-10 mx-auto mt-5 flex flex-col gap-2 px-4 py-2 text-xs">
        {author && (
          <span className="block">
            {authorLabel}: <span className="ml-2 text-neutral">{author}</span>
          </span>
        )}
        <div className="flex w-full flex-row justify-between gap-4 py-2">
          {createdAt && (
            <span className="block">
              {creationLabel}:
              <span className="ml-2 text-neutral">{createdAt}</span>
            </span>
          )}
          {updatedAt && (
            <span className="block">
              {lastUpdateLabel}:
              <span className="ml-2 text-neutral">{updatedAt}</span>
            </span>
          )}
        </div>
      </header>
      <Container className="sticky top-20 z-5 mx-auto mt-5 flex flex-col gap-2 px-4 py-2">
        <div className="flex w-full flex-row justify-between gap-4">
          <div className="flex w-full shrink flex-row items-center justify-start gap-4">
            {applicationTemplate && (
              <ApplicationTemplateMessage
                applicationTemplateUrl={applicationTemplate.replace(
                  'github.com',
                  'github.dev'
                )}
              />
            )}

            {youtubeVideo && (
              <YoutubeVideoMessage youtubeVideoUrl={youtubeVideo} />
            )}

            <SummarizeAI url={url} />

            <MCPMessage />

            <ScrollWellAndTitle />
          </div>
          <div className="flex shrink-0 flex-row items-center justify-end gap-4">
            <History
              pageUrl={relativeUrl}
              updatedAt={updatedAt as string}
              baseUpdatedAt={baseUpdatedAt as string}
              history={history}
            />
            <TranslatedContentMessage pageUrl={relativeUrl} />

            <ContributionMessage
              githubUrl={githubUrl.replace('/en/', `/${locale}/`)}
            />

            <CopyMarkdownMessage markdownContent={markdownContent} />
          </div>
        </div>
      </Container>
    </>
  );
};
