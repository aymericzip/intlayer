import { getIntlayerAPI } from '@intlayer/api';
import { createFileRoute } from '@tanstack/react-router';
import { getIntlayer, getLocalizedUrl } from 'intlayer';
import { useIntlayer } from 'react-intlayer';
import { Link } from '#/components/Link';
import type { ShowcaseProject } from '#/utils/projectActions/types';
import { ProjectFocus } from '@/components/ProjectFocus/ProjectFocus';
import { ShowcaseHeader } from '@/components/ShowcaseHeader';
import { SITE_URL } from '@/lib/site';

export const Route = createFileRoute('/{-$locale}/project/$projectId')({
  loader: async ({ params }) => {
    const projectResponse =
      await getIntlayerAPI().showcaseProject.getShowcaseProjectById(
        params.projectId
      );

    return {
      project: projectResponse.data as unknown as ShowcaseProject,
    };
  },
  component: ProjectPage,
  head: ({ params, loaderData }) => {
    const { locale, projectId } = params as {
      locale?: string;
      projectId: string;
    };
    const content = getIntlayer('app', locale);
    const project = loaderData?.project;
    const title = project?.title
      ? `${project.title} – Intlayer Showcase`
      : content.projectPage.metadata.title;
    const description =
      project?.description ?? content.projectPage.metadata.description;
    const canonicalUrl = `${SITE_URL}${getLocalizedUrl(`/project/${projectId}`, locale)}`;

    return {
      meta: [
        { title },
        { name: 'description', content: description },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:url', content: canonicalUrl },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
      ],
      links: [{ rel: 'canonical', href: canonicalUrl }],
      scripts: project
        ? [
            {
              type: 'application/ld+json',
              children: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: title,
                description: description,
                image: project.imageUrl,
                url: canonicalUrl,
                applicationCategory: 'WebApplication',
                datePublished: project.createdAt,
              }),
            },
          ]
        : [],
    };
  },
});

function ProjectPage() {
  const { project } = Route.useLoaderData();
  const content = useIntlayer('project-focus');

  if (!project) {
    return (
      <div className="flex min-h-screen flex-col px-10">
        <ShowcaseHeader />
        <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
          <h2 className="mb-4 font-bold text-2xl">
            {content.projectNotFound.title}
          </h2>
          <p className="mb-8 text-neutral">
            {content.projectNotFound.description}
          </p>
          <Link
            to="/"
            color="text"
            variant="button"
            aria-label={content.projectNotFound.backToGallery.value}
          >
            {content.projectNotFound.backToGallery}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col px-10">
      <ShowcaseHeader />
      <ProjectFocus project={project} />
    </div>
  );
}
