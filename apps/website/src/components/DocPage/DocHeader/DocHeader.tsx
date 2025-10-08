import configuration from '@intlayer/config/built';
import { Container } from '@intlayer/design-system';
import type { DocMetadata } from '@intlayer/docs';
import { getDocMetadata } from '@intlayer/docs';
import type { LocalesValues } from 'intlayer';
import { useIntlayer } from 'next-intlayer/server';
import type { FC } from 'react';
import { ApplicationTemplateMessage } from '../ApplicationTemplateMessage';
import { ContributionMessage } from '../ContributionMessage';
import { CopyMarkdownMessage } from '../CopyMarkdownMessage';
import { MCPMessage } from '../MCPMessage';
import { OutdatedTranslationMessage } from '../OutdatedTranslationMessage';
import { SummarizeAI } from '../SummarizeAI/SummarizeAI';
import { TranslatedContentMessage } from '../TranslatedContentMessage';
import { YoutubeVideoMessage } from '../YoutubeVideoMessage';

type DocHeaderProps = DocMetadata & {
  locale: LocalesValues;
  markdownContent: string;
};

export const DocHeader: FC<DocHeaderProps> = async ({
  author,
  updatedAt,
  createdAt,
  url,
  relativeUrl,
  markdownContent,
  githubUrl,
  locale,
  youtubeVideo,
  applicationTemplate,
  docKey,
}) => {
  const { authorLabel, creationLabel, lastUpdateLabel } =
    useIntlayer('doc-header');

  // Determine if current locale doc is out of date compared to default locale
  const defaultLocale = configuration.internationalization
    .defaultLocale as LocalesValues;

  let isOutdated = false;
  let baseUpdatedAt: string | undefined;

  try {
    if (docKey) {
      const baseMetadata = await getDocMetadata(docKey as any, defaultLocale);
      baseUpdatedAt = baseMetadata?.updatedAt;

      if (baseUpdatedAt && updatedAt) {
        const baseDate = new Date(baseUpdatedAt).getTime();
        const currentDate = new Date(updatedAt).getTime();
        isOutdated = baseDate > currentDate && locale !== defaultLocale;
      }
    }
  } catch {
    // Silently ignore comparison errors; no warning shown
  }

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
          <div className="flex w-full flex-row items-center justify-start gap-4">
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
          </div>
          <div className="flex w-full flex-row items-center justify-end gap-4">
            {isOutdated && (
              <OutdatedTranslationMessage
                pageUrl={relativeUrl}
                baseUpdatedAt={baseUpdatedAt as string}
                defaultLocale={defaultLocale}
              />
            )}
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
