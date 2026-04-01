import { getIntlayerAPI } from '@intlayer/api';
import { createFileRoute } from '@tanstack/react-router';
import {
  defaultLocale,
  getIntlayer,
  getLocalizedUrl,
  localeMap,
} from 'intlayer';
import { useIntlayer } from 'react-intlayer';
import { Link } from '#/components/Link';
import { ProjectFocus } from '#/components/ProjectFocus/ProjectFocus';
import { ShowcaseHeader } from '#/components/ShowcaseHeader';
import type { ShowcaseProject } from '#/utils/projectActions/types';

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
