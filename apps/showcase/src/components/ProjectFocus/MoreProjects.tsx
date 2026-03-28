import { Carousel, Container, H2 } from '@intlayer/design-system';
import { useGetOtherShowcaseProjects } from '@intlayer/design-system/hooks';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { ProjectCard } from '#/components/ProjectCard';
import type { ShowcaseProject } from '#/utils/projectActions/types';

interface MoreProjectsProps {
  excludeId: string;
}

export const MoreProjects: FC<MoreProjectsProps> = ({ excludeId }) => {
  const content = useIntlayer('project-more-projects');

  const { data: response } = useGetOtherShowcaseProjects({
    excludeId,
    limit: 8,
  });

  const otherProjects = response?.data ?? [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <H2 className="font-bold text-text text-xl">{content.moreProjects}</H2>
        <p className="text-neutral text-xs">
          {content.moreProjectsDescription}
        </p>
      </div>
      <Container
        className="relative w-full"
        roundedSize="3xl"
        background="none"
        border
        borderColor="text"
      >
        {otherProjects.length === 0 ? (
          <Container
            roundedSize="3xl"
            transparency="lg"
            className="size-full min-h-36 flex-col items-center justify-center"
          >
            <p className="text-neutral text-sm italic">
              {content.noProjectsFound}
            </p>
          </Container>
        ) : (
          <div className="flex flex-col gap-6">
            <Carousel>
              {otherProjects.map((project: ShowcaseProject) => (
                <Carousel.Item key={project.id} className="shadow-lg">
                  <ProjectCard project={project} transparency="sm" />
                </Carousel.Item>
              ))}
              <Carousel.Indicators />
            </Carousel>
          </div>
        )}
      </Container>
    </div>
  );
};
