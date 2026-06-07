import {
  External_Github,
  Website_Demo_Path,
  Website_Home,
} from '@intlayer/design-system/routes';
import { getSoftwareApplicationHeader } from '@intlayer/design-system/structured-data';
import { createFileRoute } from '@tanstack/react-router';
import { defaultLocale, getIntlayer } from 'intlayer';
import { BackgroundLayout } from '~/components/BackgroundLayout';
import { DemoPage } from '~/components/DemoPage';
import { PageLayout } from '~/layouts/PageLayout';
import { getAbsoluteUrl, getHreflangLinks } from '~/utils/seo';

export const Route = createFileRoute('/{-$locale}/demo')({
  head: ({ params }) => {
    const locale = params.locale ?? defaultLocale;
    const path = Website_Demo_Path;
    const { title, description, keywords } = getIntlayer(
      'demo-metadata',
      locale
    );

    return {
      meta: [
        { title: title },
        { name: 'description', content: description },
        {
          name: 'keywords',
          content: Array.isArray(keywords)
            ? keywords.join(', ')
            : keywords || '',
        },
        { property: 'og:url', content: getAbsoluteUrl(path, locale) },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
      ],
      links: [
        { rel: 'canonical', href: getAbsoluteUrl(path, locale) },
        ...getHreflangLinks(path),
      ],
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify(getSoftwareApplicationHeader({ locale })),
        },
      ],
    };
  },
  component: DemoPageRoute,
});

function DemoPageRoute() {
  return (
    <PageLayout>
      <BackgroundLayout>
        <DemoPage />
      </BackgroundLayout>
    </PageLayout>
  );
}
