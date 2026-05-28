import { DocumentationRender } from '~/components/DocPage/DocumentationRender';
import { Website_PrivacyPolicy } from '@intlayer/design-system/routes';
import { getLegal, getLegalMetadata } from '@intlayer/docs';
import { CreativeWorkHeader } from '~/structuredData/CreativeWorkHeader';
import {
  getLocaleFromPath,
  getLocalizedUrl,
  getMultilingualUrls,
} from 'intlayer';

import type { Route } from './+types/privacy-notice-page';

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
      content: getLocalizedUrl(Website_PrivacyPolicy, locale!),
    },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    {
      tagName: 'link',
      rel: 'canonical',
      href: getLocalizedUrl(Website_PrivacyPolicy, locale!),
    },
    {
      tagName: 'link',
      rel: 'alternate',
      hrefLang: 'x-default',
      href: Website_PrivacyPolicy,
    },
    ...Object.entries(getMultilingualUrls(Website_PrivacyPolicy)).map(
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
  const file = await getLegal('./legal/en/privacy_notice.md', locale);
  const { title, description, keywords, updatedAt, createdAt } =
    await getLegalMetadata('./legal/en/privacy_notice.md', locale);

  return { locale, file, title, description, keywords, updatedAt, createdAt };
}

export default function PrivacyNoticePage({
  loaderData,
}: Route.ComponentProps) {
  const { file, title, description, keywords, updatedAt, createdAt } =
    loaderData;

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
        <DocumentationRender>{file}</DocumentationRender>
      </div>
    </>
  );
}
