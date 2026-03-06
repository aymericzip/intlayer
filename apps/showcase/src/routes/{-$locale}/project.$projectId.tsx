import { Button } from '@intlayer/design-system';
import { createFileRoute, Link } from '@tanstack/react-router';
import { getIntlayer } from 'intlayer';
import { useIntlayer } from 'react-intlayer';
import { ProjectFocus } from '@/components/ProjectFocus/ProjectFocus';
import { ShowcaseHeader } from '@/components/ShowcaseHeader';
import { getProjectById } from '@/server/projectActions/projectActions';

export const Route = createFileRoute('/{-$locale}/project/$projectId')({
  loader: async ({ params }) => {
    const projectResponse = await getProjectById({
      data: { projectId: params.projectId },
    });

    return {
      project: projectResponse.data,
    };
  },
  component: ProjectPage,
  head: ({ params }) => {
    const { locale } = params as { locale?: string };
    const content = getIntlayer('app', locale);

    return {
      meta: [
        { title: `Project Details - ${content.metadata.title}` },
        {
          name: 'description',
          content: content.metadata.description,
        },
      ],
    };
  },
});

function ProjectPage() {
  const { project } = Route.useLoaderData();
  const content = useIntlayer('project-focus');

  if (!project) {
    return (
      <div className="flex min-h-screen flex-col">
        <ShowcaseHeader />
        <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
          <h2 className="mb-4 font-bold text-2xl">
            {content.projectNotFound.title}
          </h2>
          <p className="mb-8 text-neutral">
            {content.projectNotFound.description}
          </p>
          <Link to="/{-$locale}">
            <Button
              label={content.projectNotFound.backToGallery.value}
              variant="default"
            >
              {content.projectNotFound.backToGallery}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <ShowcaseHeader />
      <div className="flex-1">
        <ProjectFocus project={project} />
      </div>
    </div>
  );
}
