import { Carousel, Container } from '@intlayer/design-system';
import { useQuery } from '@tanstack/react-query';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { ProjectCard } from '@/components/ProjectCard';
import { getOtherProjects } from '@/server/projectActions/projectActions';

interface MoreProjectsProps {
  excludeId: string;
}

export const MoreProjects: FC<MoreProjectsProps> = ({ excludeId }) => {
  const content = useIntlayer('project-more-projects');

  const { data: otherProjects = [] } = useQuery({
    queryKey: ['otherProjects', excludeId],
    queryFn: () => getOtherProjects({ data: { excludeId, limit: 10 } }),
    select: (response) => response.data ?? [],
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h2 className="font-bold text-text text-xl">{content.moreProjects}</h2>
        <p className="text-neutral text-xs">
          {content.moreProjectsDescription}
        </p>
      </div>
      <div className="relative w-full">
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
              {otherProjects.map((proj) => (
                <Carousel.Item key={proj._id}>
                  <ProjectCard project={proj} />
                </Carousel.Item>
              ))}
              <Carousel.Indicators />
            </Carousel>
          </div>
        )}
      </div>
    </div>
  );
};
