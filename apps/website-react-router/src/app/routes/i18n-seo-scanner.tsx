import { Website_Scanner } from '@intlayer/design-system/routes';
import {
  getIntlayer,
  getLocaleFromPath,
  getLocalizedUrl,
  getMultilingualUrls,
} from 'intlayer';
import { Suspense } from 'react';
import { useIntlayer } from 'react-intlayer';
import { getScannerHeaders } from '~/app/security-headers';
import { BackgroundLayout } from '~/components/BackgroundLayout';
import { LocalizationAnalyzer } from '~/components/ScannerPage';
import { PageLayout } from '~/layouts/PageLayout';
import { OrganizationHeader } from '~/structuredData/OrganizationHeader';
import { ScannerSoftwareApplicationHeader } from '~/structuredData/ScannerSoftwareApplicationHeader';
import { WebsiteHeader } from '~/structuredData/WebsiteHeader';

import type { Route } from './+types/i18n-seo-scanner';

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [];
  const { locale } = data;
  const { title, description, keywords } = getIntlayer(
    'i18n-SEO-scanner',
    locale!
  );

  return [
    { title },
    { name: 'description', content: description },
    {
      name: 'keywords',
      content: Array.isArray(keywords) ? keywords.join(', ') : keywords || '',
    },
    { property: 'og:url', content: getLocalizedUrl(Website_Scanner, locale!) },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    {
      tagName: 'link',
      rel: 'canonical',
      href: getLocalizedUrl(Website_Scanner, locale!),
    },
    {
      tagName: 'link',
      rel: 'alternate',
      hrefLang: 'x-default',
      href: Website_Scanner,
    },
    ...Object.entries(getMultilingualUrls(Website_Scanner)).map(
      ([lang, url]) => ({
        tagName: 'link',
        rel: 'alternate',
        hrefLang: lang,
        href: url,
      })
    ),
  ];
};

/**
 * Scanner-specific headers: overrides the default CSP to allow any image and
 * connect source (so the scanner can analyse arbitrary third-party sites).
 * Mirrors the `scannerHeaders` block in next.config.ts.
 */
export function headers(): Record<string, string> {
  return getScannerHeaders();
}

export async function loader({ request }: Route.LoaderArgs) {
  const locale = getLocaleFromPath(request.url);
  return { locale };
}

function AuditContent() {
  const { title, description } = useIntlayer('audit-page');

  return (
    <div className="relative flex size-full flex-1 flex-col">
      <BackgroundLayout />
      <main className="relative flex flex-1 flex-col items-center justify-center gap-16 px-4 pt-20 md:px-10">
        <h1 className="max-w-3xl text-center font-bold text-3xl text-text leading-tight sm:text-5xl md:text-5xl lg:text-5xl">
          {title}
        </h1>
        <p className="max-w-2xl text-neutral leading-relaxed">{description}</p>
        <Suspense>
          <LocalizationAnalyzer />
        </Suspense>
      </main>
    </div>
  );
}

export default function AuditPageRoute({ loaderData }: Route.ComponentProps) {
  const { locale } = loaderData;

  return (
    <PageLayout>
      <WebsiteHeader key={locale} />
      <OrganizationHeader />
      <ScannerSoftwareApplicationHeader />
      <AuditContent />
    </PageLayout>
  );
}
