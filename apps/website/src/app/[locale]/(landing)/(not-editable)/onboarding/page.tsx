'use client';

import { formatOnboardUrl } from '@components/OnboardPage/formatOnboardUrl';
import { onboardingSteps } from '@components/OnboardPage/steps';
import type { Period, Plans } from '@components/PricingPage/data.content';
import { type NextPage } from 'next';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC, Suspense, useEffect } from 'react';

const OnboardPageContent: FC = () => {
  const router = useRouter();

  const plan = useSearchParams().get('plan') as Plans;
  const period = useSearchParams().get('period') as Period;
  const origin = useSearchParams().get('origin') as string;

  const url = formatOnboardUrl(
    Object(onboardingSteps).values()[0].url,
    plan,
    period,
    origin
  );

  useEffect(() => {
    router.push(url);
  }, [url, router]);

  return <></>;
};

const OnboardPage: NextPage = () => (
  <Suspense>
    <OnboardPageContent />
  </Suspense>
);

export default OnboardPage;
