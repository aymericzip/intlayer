import { Badge, Button, Container } from '@intlayer/design-system';
import {
  useSession,
  useToggleShowcaseLike,
} from '@intlayer/design-system/hooks';
import { Link, useParams } from '@tanstack/react-router';
import { ExternalLink, ThumbsDown, ThumbsUp } from 'lucide-react';
import { useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { AppRoutes } from '#/Routes';
import { getFaviconUrl } from '#/utils/getFaviconUrl';
import type { Project } from '@/server/projectActions/types';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const content = useIntlayer('app');
  const { locale } = useParams({ from: '/{-$locale}' });
  const { session } = useSession();
  const { mutateAsync: toggleLike, isPending } = useToggleShowcaseLike();

  // isLiked is determined by whether the current user's id is in upvoters
  const [upvotes, setUpvotes] = useState(project.upvotes);
  const [isLiked, setIsLiked] = useState(project.upvoters.length > 0);

  const faviconUrl = getFaviconUrl(project.websiteUrl);

  const handleVote = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!session) {
      const redirectUrl = encodeURIComponent(window.location.href);
      window.location.href = `${AppRoutes.Auth_SignIn}?redirect_url=${redirectUrl}`;
      return;
    }

    try {
      const result = await toggleLike(project._id);
      if (result?.data) {
        setUpvotes(result.data.upvotes);
        setIsLiked(result.data.isLiked);
      }
    } catch {
      // ignore
    }
  };

  return (
    <Container
      key={project._id}
      className="group relative h-full overflow-hidden shadow-lg transition-all hover:shadow-xl"
      roundedSize="3xl"
      transparency="lg"
    >
      <Link
        to="/{-$locale}/project/$projectId"
        params={{
          locale: locale || 'en',
          projectId: project._id,
        }}
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
              disabled={isPending}
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
              disabled={isPending}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};
