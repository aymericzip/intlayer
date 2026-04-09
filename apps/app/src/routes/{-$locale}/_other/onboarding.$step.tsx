import { Container } from '@intlayer/design-system/container';
import { createFileRoute } from '@tanstack/react-router';
import { getIntlayer } from 'intlayer';
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
    const { locale } = params;
    const content = getIntlayer('onboard-page', locale);

    return {
      title: content.metadata.title,
      meta: [
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
