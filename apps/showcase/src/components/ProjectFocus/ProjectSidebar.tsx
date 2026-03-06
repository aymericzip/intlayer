import { Button, Container, Link } from '@intlayer/design-system';
import {
  Badge,
  Calendar,
  Code,
  Layers,
  ThumbsDown,
  ThumbsUp,
  Zap,
} from 'lucide-react';
import type { FC, ReactNode } from 'react';
import { useIntlayer } from 'react-intlayer';
import type { Project } from '@/server/projectActions/types';

interface ProjectSidebarProps {
  project: Project;
  formatDate: (dateStr?: string) => string;
}

const InfoItem = ({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: ReactNode;
  value: ReactNode;
}) => (
  <div className="flex items-center gap-3">
    <Container roundedSize="xl" padding="sm" transparency="lg">
      {icon}
    </Container>
    <div className="flex flex-col">
      <span className="mb-1 font-bold text-[10px] text-neutral uppercase leading-none tracking-widest">
        {label}
      </span>
      <span className="font-semibold text-sm text-text">{value}</span>
    </div>
  </div>
);

export const ProjectSidebar: FC<ProjectSidebarProps> = ({
  project,
  formatDate,
}) => {
  const content = useIntlayer('project-sidebar');
  const appContent = useIntlayer('app');

  return (
    <div className="space-y-6">
      <Container padding="xl" roundedSize="3xl" transparency="lg">
        <div className="flex items-center gap-4">
          {project.logoUrl && (
            <Container
              roundedSize="3xl"
              transparency="lg"
              className="shrink-0 overflow-hidden shadow-md"
            >
              <img
                src={project.logoUrl}
                alt=""
                className="size-8 bg-text/10 object-cover"
              />
            </Container>
          )}
          <h1 className="font-bold text-2xl text-text md:text-3xl">
            {project.title}
          </h1>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {(project.tags ?? []).map((tag) => (
            <Badge
              key={tag}
              color="neutral"
              className="py-0.5 font-semibold text-[10px]"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <p className="whitespace-pre-wrap text-base text-neutral/90 leading-relaxed">
          {project.description}
        </p>
      </Container>
      <div className="flex items-center gap-3">
        {project.githubUrl && (
          <Container
            roundedSize="2xl"
            transparency="lg"
            className="group h-full flex-1 shadow-sm transition-all"
          >
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="button"
              label={content.githubRepo.value}
            >
              <Code className="size-4 text-text" />
              <span className="font-medium text-sm">{content.githubRepo}</span>
            </Link>
          </Container>
        )}
        <Link
          href={project.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          color="text"
          variant="button"
          label={content.visitWebsite.value}
          isExternalLink
          className="flex-2 py-3 text-sm"
        >
          {content.visitWebsite}
        </Link>
      </div>

      <Container
        className="flex flex-col"
        roundedSize="3xl"
        padding="lg"
        gap="md"
        transparency="lg"
      >
        <InfoItem
          icon={<Calendar className="size-4" />}
          label={content.published}
          value={formatDate(project.createdAt)}
        />
        <InfoItem
          icon={<Zap className="size-4" />}
          label={content.lastScan}
          value={formatDate(project.lastScanDate)}
        />
        <InfoItem
          icon={<Layers className="size-4" />}
          label={content.intlayerVersion}
          value={project.intlayerVersion || content.stable}
        />
      </Container>

      {/* Rating Section inside Sidebar */}
      <Container
        className="flex flex-col"
        roundedSize="3xl"
        padding="lg"
        gap="md"
        transparency="lg"
      >
        <div className="items-top flex justify-between">
          <span className="block font-bold text-neutral text-xs uppercase tracking-widest">
            {content.rateThisProject}
          </span>
          <Container className="flex aspect-square size-10 items-center justify-center rounded-full font-bold text-lg text-text/70">
            {project.upvotes}
          </Container>
        </div>

        <div className="flex items-center justify-between gap-4">
          <Button
            type="button"
            variant="hoverable"
            color="neutral"
            label={appContent.showcase.upvote.label.value}
            Icon={ThumbsUp}
            className="flex-1"
          />
          <Button
            type="button"
            variant="hoverable"
            color="neutral"
            label={appContent.showcase.downvote.label.value}
            Icon={ThumbsDown}
            className="flex-1"
          />
        </div>
      </Container>

      {/* Libraries Section inside Sidebar */}
      {project.libsUsed && project.libsUsed.length > 0 && (
        <Container
          className="flex flex-col"
          roundedSize="3xl"
          padding="lg"
          gap="md"
          transparency="lg"
        >
          <span className="block font-bold text-neutral text-xs uppercase tracking-widest">
            {content.libsUsed}
          </span>
          <div className="flex flex-wrap gap-2">
            {project.libsUsed.map((lib) => (
              <Container
                key={lib}
                roundedSize="xl"
                transparency="lg"
                padding="sm"
              >
                <span className="font-medium text-text text-xs">{lib}</span>
              </Container>
            ))}
          </div>
        </Container>
      )}
    </div>
  );
};
