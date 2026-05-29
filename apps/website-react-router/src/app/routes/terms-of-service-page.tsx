import { Website_TermsOfService } from '@intlayer/design-system/routes';
import { getLegal, getLegalMetadata } from '@intlayer/docs';
import {
  getLocaleFromPath,
  getLocalizedUrl,
  getMultilingualUrls,
} from 'intlayer';
import { parseMarkdown } from 'react-intlayer/markdown';
import { DocumentationRender } from '~/components/DocPage/DocumentationRender';
import { CreativeWorkHeader } from '~/structuredData/CreativeWorkHeader';

import type { Route } from './+types/terms-of-service-page';

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [];
  const { title, description, keywords, locale } = data;
  return [
    { title },
    { name: 'description', content: description },
    {
      name: 'keywords',
      content: Array.isArray(keywords) ? keywords.join(', ') : keywords || '',
    },
    {
      property: 'og:url',
      content: getLocalizedUrl(Website_TermsOfService, locale!),
    },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    {
      tagName: 'link',
      rel: 'canonical',
      href: getLocalizedUrl(Website_TermsOfService, locale!),
    },
    {
      tagName: 'link',
      rel: 'alternate',
      hrefLang: 'x-default',
      href: Website_TermsOfService,
    },
    ...Object.entries(getMultilingualUrls(Website_TermsOfService)).map(
      ([lang, url]) => ({
        tagName: 'link',
        rel: 'alternate',
        hrefLang: lang,
        href: url,
      })
    ),
  ];
};

export async function loader({ request }: Route.LoaderArgs) {
  const locale = getLocaleFromPath(request.url);
  const file = await getLegal('./legal/en/terms_of_service.md', locale);
  const { title, description, keywords, updatedAt, createdAt } =
    await getLegalMetadata('./legal/en/terms_of_service.md', locale);
  const fileParsed = parseMarkdown(file);

  return {
    locale,
    file,
    fileParsed,
    title,
    description,
    keywords,
    updatedAt,
    createdAt,
  };
}

export default function TermsOfServicePage({
  loaderData,
}: Route.ComponentProps) {
  const {
    file,
    fileParsed,
    title,
    description,
    keywords,
    updatedAt,
    createdAt,
  } = loaderData;

  return (
    <>
      <CreativeWorkHeader
        type="WebPage"
        creativeWorkName={title}
        creativeWorkDescription={description}
        creativeWorkContent={file}
        keywords={
          Array.isArray(keywords) ? keywords.join(', ') : keywords || ''
        }
        dateModified={new Date(updatedAt)}
        datePublished={new Date(createdAt)}
      />

      <div className="m-auto max-w-2xl">
        <DocumentationRender>{fileParsed}</DocumentationRender>
      </div>
    </>
  );
}
