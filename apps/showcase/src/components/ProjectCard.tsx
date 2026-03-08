import { Badge, Button, Container } from '@intlayer/design-system';
import { Link } from '@tanstack/react-router';
import { ExternalLink, ThumbsDown, ThumbsUp } from 'lucide-react';
import { useIntlayer } from 'react-intlayer';
import { getFaviconUrl } from '#/utils/getFaviconUrl';
import { useShowcaseLike } from '@/hooks/useShowcaseLike';
import type { Project } from '@/server/projectActions/types';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const content = useIntlayer('app');
  const { upvotes, isLiked, isDisabled, handleVote } = useShowcaseLike(project);

  const faviconUrl = getFaviconUrl(project.websiteUrl);

  return (
    <Container
      key={project._id}
      className="group relative h-full overflow-hidden shadow-lg transition-all [-webkit-mask-image:-webkit-radial-gradient(white,black)] hover:shadow-xl"
      roundedSize="3xl"
      transparency="lg"
    >
      <Link
        to="/{-$locale}/project/$projectId"
        params={{
          projectId: project._id,
        }}
        preload="viewport"
        className="flex flex-1 flex-col"
      >
        <div className="relative aspect-video overflow-hidden bg-background">
          <img
            alt={`${project.title} screenshot`}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            src={project.imageUrl}
          />
          {faviconUrl && (
            <Container
              roundedSize="xl"
              transparency="lg"
              className="absolute bottom-3 left-3 size-8 shrink-0 overflow-hidden shadow-md"
            >
              <img
                alt={`${project.title} favicon`}
                className="h-full w-full object-cover"
                src={faviconUrl}
              />
            </Container>
          )}
        </div>
        <div className="flex-1 p-4">
          <h3 className="font-bold text-lg text-text transition-colors group-hover:text-text/70">
            {project.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-neutral-500 text-sm">
            {project.description}
          </p>
        </div>
      </Link>

      <div className="absolute top-3 right-3 flex gap-2">
        <a
          href={project.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-background/90 p-2 shadow-sm transition-colors hover:bg-card"
          title="Visit site"
        >
          <ExternalLink className="size-4 text-text" />
        </a>
      </div>

      <div className="mt-auto px-4 pb-4">
        <div className="flex items-end justify-between gap-2">
          <div className="flex min-w-0 flex-wrap gap-1.5">
            {(project.tags ?? []).map((tag: string) => (
              <Badge
                key={tag}
                className="border-none bg-neutral/10 text-neutral/80 hover:bg-neutral/10"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <Button
              type="button"
              variant="hoverable"
              label={content.showcase.upvote.label.value}
              color={isLiked ? 'primary' : 'neutral'}
              size="icon-sm"
              Icon={ThumbsUp}
              onClick={handleVote}
              disabled={isDisabled}
            />
            <span className="min-w-6 text-center font-medium text-sm text-text">
              {upvotes}
            </span>
            <Button
              type="button"
              variant="hoverable"
              label={content.showcase.downvote.label.value}
              color="neutral"
              size="icon-sm"
              Icon={ThumbsDown}
              onClick={handleVote}
              disabled={isDisabled}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};
