import { getIntlayerAPI } from '@intlayer/api';
import {
  Showcase_Root_Path,
  Website_Home,
} from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import {
  defaultLocale,
  getIntlayer,
  getLocalizedUrl,
  localeMap,
} from 'intlayer';
import { useIntlayer } from 'react-intlayer';
import { ProjectFocus } from '#/components/ProjectFocus/ProjectFocus';
import { ShowcaseHeader } from '#/components/ShowcaseHeader';
import { BreadcrumbsHeader } from '#/structuredData/BreadcrumbsHeader';
import type { ShowcaseProject } from '#/utils/projectActions/types';
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

    const canonicalUrl = getLocalizedUrl(path, locale);

    return {
      links: [
        // Canonical link: Points to the current localized page
        { rel: 'canonical', href: getLocalizedUrl(path, locale) },

        // Hreflang: Tell Google about all localized versions
        ...localeMap(({ locale }) => ({
          rel: 'alternate',
          hrefLang: locale,
          href: getLocalizedUrl(path, locale),
        })),

        // x-default: For users in unmatched languages
        // Define the default fallback locale (usually your primary language)
        {
          rel: 'alternate',
          hrefLang: 'x-default',
          href: getLocalizedUrl(path, defaultLocale),
        },
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
              children: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'WebPage',
                name: title,
                description: description,
                url: canonicalUrl,
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
  const { locale } = Route.useParams();

  if (!project) {
    return (
      <div className="flex min-h-screen flex-col px-10">
        <BreadcrumbsHeader
          breadcrumbs={[
            {
              name: 'Intlayer',
              url: getLocalizedUrl(Website_Home, locale),
            },
            {
              name: 'Showcase',
              url: getLocalizedUrl(Showcase_Root_Path, locale),
            },
            {
              name: content.projectNotFound.title.value,
              url: getLocalizedUrl(`/project/${(project as any)?.id}`, locale),
            },
          ]}
        />
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
      <BreadcrumbsHeader
        breadcrumbs={[
          {
            name: 'Intlayer',
            url: getLocalizedUrl(Website_Home, locale),
          },
          {
            name: 'Showcase',
            url: getLocalizedUrl(Showcase_Root_Path, locale),
          },
          {
            name: project.title,
            url: getLocalizedUrl(`/project/${project.id}`, locale),
          },
        ]}
      />
      <ShowcaseHeader />
      <ProjectFocus project={project} />
    </div>
  );
}
