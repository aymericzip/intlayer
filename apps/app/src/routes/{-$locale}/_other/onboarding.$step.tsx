import { Container } from '@intlayer/design-system/container';
import { App_Onboarding_Path } from '@intlayer/design-system/routes';
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

// Only plan and period are search parameters now
type OnboardingSearch = {
  plan?: string;
  period?: string;
};

// Add $step back to the route path
export const Route = createFileRoute('/{-$locale}/_other/onboarding/$step')({
  validateSearch: (search: Record<string, unknown>): OnboardingSearch => ({
    plan: typeof search.plan === 'string' ? search.plan : undefined,
    period: typeof search.period === 'string' ? search.period : undefined,
  }),
  component: OnboardingPage,
  head: ({ params }) => {
    const { locale, step } = params;
    const path = `${App_Onboarding_Path}/${step}`;
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

  // Extract plan and period from the query string (?plan=free&period=monthly)
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
          roundedSize="2xl"
          transparency="xs"
        >
          <OnboardFlow {...pageDetails} />
        </Container>
      </div>
    </BackgroundLayout>
  );
}
