import { Container } from '@intlayer/design-system/container';
import { App_Onboarding } from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import {
  defaultLocale,
  getIntlayer,
  getLocalizedUrl,
  localeMap,
} from 'intlayer';
import { useIntlayer } from 'react-intlayer';
import { BackgroundLayout } from '#components/BackgroundLayout';
import { OnboardFlow } from '#components/OnboardPage';
import { getPlanDetails } from '#components/OnboardPage/getPlanDetails';

type OnboardingSearch = {
  plan?: string;
  period?: string;
  ref?: string;
  promoCode?: string;
  origin?: string;
};

export const Route = createFileRoute('/{-$locale}/_other/onboarding/$step')({
  validateSearch: (search: Record<string, unknown>): OnboardingSearch => ({
    plan: typeof search.plan === 'string' ? search.plan : undefined,
    period: typeof search.period === 'string' ? search.period : undefined,
    ref:
      typeof search.ref === 'string'
        ? search.ref.trim().toUpperCase()
        : undefined,
    promoCode:
      typeof search.promoCode === 'string' ? search.promoCode : undefined,
    origin: typeof search.origin === 'string' ? search.origin : undefined,
  }),
  component: OnboardingPage,
  head: ({ params }) => {
    const { locale, step } = params;
    const path = `${App_Onboarding}/${step}`;
    const content = getIntlayer('onboard-page', locale);

    return {
      links: [
        // Canonical link: Points to the current localized page
        { rel: 'canonical', href: getLocalizedUrl(path, locale) },

        // Hreflang: Tell Google about all localized versions
        ...localeMap(({ locale: mapLocale }) => ({
          rel: 'alternate',
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
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
        { title: content.metadata.title },
        {
          name: 'description',
          content: content.metadata.description,
        },
      ],
    };
  },
});

function OnboardingPage() {
  const { title, description } = useIntlayer('onboard-page');

  // Extract step from the path parameters (/onboarding/setup-organization)
  const { step } = Route.useParams();

  const { plan, period } = Route.useSearch();

  const details = [step, plan, period].filter(Boolean) as string[];
  const pageDetails = getPlanDetails(details);

  return (
    <BackgroundLayout>
      <h1 className="hidden">{title}</h1>
      <div className="flex flex-1 flex-col items-center justify-center gap-5 p-10">
        <span className="text-neutral text-xs">{description}</span>
        <Container
          className="w-full max-w-xl justify-center text-2xl"
          padding="xl"
          roundedSize="4xl"
          transparency="md"
        >
          <OnboardFlow {...pageDetails} />
        </Container>
      </div>
    </BackgroundLayout>
  );
}
