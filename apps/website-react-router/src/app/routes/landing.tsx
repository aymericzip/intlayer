import { EmailRegistrationToast } from '~/components/EmailRegistrationToast';
import { LandingPage as LandingPageContent } from '~/components/LandingPage';
import { PageLayout } from '~/layouts/PageLayout';
import { OrganizationHeader } from '~/structuredData/OrganizationHeader';
import { ProductHeader } from '~/structuredData/ProductHeader';
import { SoftwareApplicationHeader } from '~/structuredData/SoftwareApplication';
import { WebsiteHeader } from '~/structuredData/WebsiteHeader';
import { getPricing } from '~/utils/stripe';
import {
  getIntlayer,
  getLocaleFromPath,
  getLocalizedUrl,
  getMultilingualUrls,
} from 'intlayer';
import type { Route } from './+types/landing';

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [];
  const { locale } = data;
  const { title, description, keywords } = getIntlayer(
    'landing-metadata',
    locale!
  );

  return [
    { title },
    { name: 'description', content: description },
    {
      name: 'keywords',
      content: Array.isArray(keywords) ? keywords.join(', ') : keywords || '',
    },
    { property: 'og:url', content: getLocalizedUrl('/', locale!) },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { tagName: 'link', rel: 'canonical', href: getLocalizedUrl('/', locale!) },
    { tagName: 'link', rel: 'alternate', hrefLang: 'x-default', href: '/' },
    ...Object.entries(getMultilingualUrls('/')).map(([lang, url]) => ({
      tagName: 'link',
      rel: 'alternate',
      hrefLang: lang,
      href: url,
    })),
  ];
};

export async function loader({ request }: Route.LoaderArgs) {
  const pricings = await getPricing();
  const locale = getLocaleFromPath(request.url);
  return { pricings, locale };
}

export default function LandingPage({ loaderData }: Route.ComponentProps) {
  const { pricings } = loaderData;

  return (
    <PageLayout>
      <EmailRegistrationToast />
      <WebsiteHeader />
      <OrganizationHeader />
      <SoftwareApplicationHeader />
      <ProductHeader pricings={pricings} />
      <LandingPageContent />
    </PageLayout>
  );
}
