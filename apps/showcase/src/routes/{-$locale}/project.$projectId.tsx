import { getIntlayerAPI } from '@intlayer/api';
import {
  Showcase_Root,
  Website_Domain,
  Website_Home,
} from '@intlayer/design-system/routes';
import { buildBreadcrumbsJsonLd } from '@intlayer/design-system/structured-data';
import { createFileRoute } from '@tanstack/react-router';
import { getIntlayer, getLocalizedUrl } from 'intlayer';
import { useIntlayer } from 'react-intlayer';
import { ProjectFocus } from '#/components/ProjectFocus/ProjectFocus';
import { ShowcaseHeader } from '#/components/ShowcaseHeader';
import type { ShowcaseProject } from '#/utils/projectActions/types';
import { getAbsoluteUrl, getHreflangLinks } from '#/utils/seo';
import { Link } from '#components/Link/Link';

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
    const { locale, projectId } = params;

    const path = `/project/${projectId}`;
    const content = getIntlayer('showcase-project', locale);
    const project = loaderData?.project;

    const title = content.metadata.title({
      projectDetails: project?.title ?? '-',
    });

    const description = project?.description ?? content.metadata.description;

    const canonicalUrl = getAbsoluteUrl(path, locale);

    return {
      links: [
        { rel: 'canonical', href: canonicalUrl },
        ...getHreflangLinks(path),
      ],
      meta: [
        { title },
        { name: 'description', content: description },
        {
          name: 'keywords',
          content: content.metadata.keywords.join(', '),
        },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:url', content: canonicalUrl },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
      ],
      scripts: project
        ? [
            {
              type: 'application/ld+json',
              children: JSON.stringify(
                buildBreadcrumbsJsonLd({
                  breadcrumbs: [
                    {
                      name: 'Intlayer',
                      url: getLocalizedUrl(Website_Home, locale),
                    },
                    {
                      name: 'Showcase',
                      url: getLocalizedUrl(Showcase_Root, locale),
                    },
                    {
                      name: project.title,
                      url: getLocalizedUrl(`/project/${project.id}`, locale),
                    },
                  ],
                  domain: Website_Domain,
                })
              ),
            },
          ]
        : [],
    };
  },
});

function ProjectPage() {
  const { project } = Route.useLoaderData();
  const content = useIntlayer('project-focus');
  const { locale } = Route.useParams();

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
            label={content.projectNotFound.backToGallery.value}
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
