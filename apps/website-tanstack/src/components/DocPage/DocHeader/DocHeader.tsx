import { Avatar } from '@intlayer/design-system/avatar';
import { Container } from '@intlayer/design-system/container';
import { useDevice } from '@intlayer/design-system/hooks';
import { Link } from '@intlayer/design-system/link';
import { PopoverStatic } from '@intlayer/design-system/popover';
import {
  DiscordLogo,
  FacebookLogo,
  GitHubLogo,
  GitLabLogo,
  InstagramLogo,
  LinkedInLogo,
  ProductHuntLogo,
  TiktokLogo,
  XLogo,
  YoutubeLogo,
} from '@intlayer/design-system/social-networks';
import type { AuthorProfile, DocMetadata } from '@intlayer/docs';
import type { FC } from 'react';
import { useIntlayer, useLocale } from 'react-intlayer';
import { ApplicationShowcaseMessage } from '../ApplicationShowcaseMessage';
import { ApplicationTemplateMessage } from '../ApplicationTemplateMessage';
import { ContributionMessage } from '../ContributionMessage';
import { CopyMarkdownMessage } from '../CopyMarkdownMessage';
import { History } from '../History';
import { MCPMessage } from '../MCPMessage';
import { ScrollWellAndTitle } from '../ScrollWell';
import { SummarizeAI } from '../SummarizeAI/SummarizeAI';
import { TranslatedContentMessage } from '../TranslatedContentMessage';
import { YoutubeVideoMessage } from '../YoutubeVideoMessage';

const getSocialIcon = (url: string, className?: string) => {
  if (url.includes('github.com')) return <GitHubLogo className={className} />;
  if (url.includes('x.com') || url.includes('twitter.com'))
    return <XLogo className={className} />;
  if (url.includes('linkedin.com'))
    return <LinkedInLogo className={className} />;
  if (url.includes('discord.com') || url.includes('discord.gg'))
    return <DiscordLogo className={className} />;
  if (url.includes('youtube.com')) return <YoutubeLogo className={className} />;
  if (url.includes('facebook.com'))
    return <FacebookLogo className={className} />;
  if (url.includes('instagram.com'))
    return <InstagramLogo className={className} />;
  if (url.includes('tiktok.com')) return <TiktokLogo className={className} />;
  if (url.includes('gitlab.com')) return <GitLabLogo className={className} />;
  if (url.includes('producthunt.com'))
    return <ProductHuntLogo className={className} />;
  return null;
};

type DocHeaderProps = Omit<DocMetadata, 'author'> & {
  author?: AuthorProfile;
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
  applicationShowcase,
  baseUpdatedAt,
  history,
}) => {
  const { isMobile } = useDevice();
  const { locale } = useLocale();
  const {
    authorLabel,
    creationLabel,
    lastUpdateLabel,
    authorAvatarAlt,
    authorGithubLabel,
  } = useIntlayer('doc-header');

  return (
    <>
      <header className="z-10 mx-auto mt-5 flex flex-col gap-2 px-4 py-2 text-xs">
        {author && (
          <span className="flex items-center gap-2">
            {authorLabel}:{' '}
            {author.socialMedias && author.socialMedias.length > 0 ? (
              <PopoverStatic identifier="author-social-medias">
                {author.github ? (
                  <Link
                    label={authorGithubLabel({ author: author.name })}
                    href={`https://github.com/${author.github}`}
                    className="flex items-center gap-2 text-neutral"
                  >
                    <Avatar
                      src={author.image}
                      alt={authorAvatarAlt({ author: author.name })}
                      size="sm"
                      className="scale-70"
                    />
                    {author.name}
                  </Link>
                ) : (
                  <span className="text-neutral">{author.name}</span>
                )}
                <PopoverStatic.Detail
                  identifier="author-social-medias"
                  xAlign="start"
                  yAlign="below"
                  className="flex w-auto min-w-0 flex-row gap-2 p-2 delay-200 group-hover/popover:delay-100"
                >
                  {author.socialMedias.map((url) => {
                    const icon = getSocialIcon(
                      url,
                      'h-auto max-h-full max-w-full'
                    );
                    if (!icon) return null;
                    return (
                      <Link
                        key={url}
                        href={url}
                        label={`Go to ${url}`}
                        className="max-h-5 max-w-5 shrink-0 transition-colors hover:text-primary"
                      >
                        {icon}
                      </Link>
                    );
                  })}
                </PopoverStatic.Detail>
              </PopoverStatic>
            ) : author.github ? (
              <Link
                label={authorGithubLabel({ author: author.name })}
                href={`https://github.com/${author.github}`}
                className="flex items-center gap-2 text-neutral"
              >
                <Avatar
                  src={author.image}
                  alt={authorAvatarAlt({ author: author.name })}
                  size="sm"
                  className="scale-70"
                />
                {author.name}
              </Link>
            ) : (
              <span className="text-neutral">{author.name}</span>
            )}
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
      <Container className="sticky top-10 z-10 mx-auto mt-5 flex max-w-3xl flex-col gap-2 px-4 py-2 max-md:overflow-x-auto">
        <div className="flex w-full flex-row justify-between gap-4">
          <div className="flex w-full shrink flex-row items-center justify-start gap-4">
            {!isMobile && applicationTemplate && (
              <ApplicationTemplateMessage
                applicationTemplateUrl={applicationTemplate.replace(
                  'github.com',
                  'github.dev'
                )}
              />
            )}

            {!isMobile && applicationShowcase && (
              <ApplicationShowcaseMessage
                applicationShowcaseUrl={applicationShowcase}
              />
            )}

            {youtubeVideo && (
              <YoutubeVideoMessage youtubeVideoUrl={youtubeVideo} />
            )}

            {!isMobile && <SummarizeAI url={url} />}

            {!isMobile && <MCPMessage />}

            <ScrollWellAndTitle />
          </div>
          <div className="flex shrink-0 flex-row items-center justify-end gap-4">
            {!isMobile && (
              <History
                pageUrl={relativeUrl}
                updatedAt={updatedAt as string}
                baseUpdatedAt={baseUpdatedAt as string}
                history={history}
              />
            )}
            {!isMobile && <TranslatedContentMessage pageUrl={relativeUrl} />}

            {!isMobile && (
              <ContributionMessage
                githubUrl={githubUrl.replace('/en/', `/${locale}/`)}
              />
            )}

            <CopyMarkdownMessage markdownContent={markdownContent} />
          </div>
        </div>
      </Container>
    </>
  );
};
