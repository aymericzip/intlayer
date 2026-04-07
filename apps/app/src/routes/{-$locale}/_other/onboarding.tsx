import { Container } from '@intlayer/design-system/container';
import { createFileRoute } from '@tanstack/react-router';
import { getIntlayer } from 'intlayer';
import { useIntlayer } from 'react-intlayer';
import { BackgroundLayout } from '#components/BackgroundLayout';
import { OnboardFlow } from '#components/OnboardPage';
import { getPlanDetails } from '#components/OnboardPage/getPlanDetails';

export const Route = createFileRoute('/{-$locale}/_other/onboarding')({
  validateSearch: (search: Record<string, unknown>) => ({
    step: typeof search.step === 'string' ? search.step : undefined,
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
  const { step, plan, period } = Route.useSearch();
  const details = [step, plan, period].filter(Boolean) as string[];
  const pageDetails = getPlanDetails(details);

  return (
    <BackgroundLayout>
      <>
        <h1 className="hidden">{title}</h1>
        <div className="flex flex-1 flex-col items-center justify-center gap-5 p-10">
          <span className="text-neutral text-xs">{description}</span>
          <Container
            className="w-full max-w-md justify-center p-10 text-2xl"
            padding="xl"
            roundedSize="xl"
            transparency="xs"
          >
            <OnboardFlow {...pageDetails} />
          </Container>
        </div>
      </>
    </BackgroundLayout>
  );
}
