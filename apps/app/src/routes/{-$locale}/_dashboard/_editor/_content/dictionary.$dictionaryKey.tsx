import {
  App_Dashboard,
  App_Dashboard_Dictionaries,
} from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import { getLocalizedUrl } from 'intlayer';
import { BreadcrumbsHeader } from '#/structuredData/BreadcrumbsHeader';
import { CreativeWorkHeader } from '#/structuredData/CreativeWorkHeader';
import { BackgroundLayout } from '#components/BackgroundLayout';
import { ContentDashboard } from '#components/Dashboard/ContentDashboard';

export const Route = createFileRoute(
  '/{-$locale}/_dashboard/_editor/_content/dictionary/$dictionaryKey'
)({
  component: DictionaryDetailPage,
});

function DictionaryDetailPage() {
  const { dictionaryKey, locale } = Route.useParams();

  return (
    <>
      <BreadcrumbsHeader
        breadcrumbs={[
          {
            name: 'Dashboard',
            url: getLocalizedUrl(App_Dashboard, locale),
          },
          {
            name: 'Dictionaries',
            url: getLocalizedUrl(App_Dashboard_Dictionaries, locale),
          },
          {
            name: dictionaryKey,
            url: getLocalizedUrl(
              `${App_Dashboard_Dictionaries}/${dictionaryKey}`,
              locale
            ),
          },
        ]}
      />
      <CreativeWorkHeader
        creativeWorkName={dictionaryKey}
        creativeWorkDescription={`Dictionary ${dictionaryKey} for Intlayer CMS`}
        creativeWorkContent={`Manage translations for ${dictionaryKey}`}
        keywords={`intlayer, cms, ${dictionaryKey}`}
        url={getLocalizedUrl(
          `${App_Dashboard_Dictionaries}/${dictionaryKey}`,
          locale
        )}
      />
      <div className="flex min-h-0 w-full flex-1 flex-col items-stretch px-10">
        <ContentDashboard dictionaryKey={dictionaryKey} />
      </div>
      <BackgroundLayout />
    </>
  );
}
