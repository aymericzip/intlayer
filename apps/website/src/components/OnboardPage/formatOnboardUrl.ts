import { PagesRoutes } from '@/Routes';
import { Period, Plans } from '../PricingPage/data.content';
import { Steps } from './steps';

type Args = {
  plan?: Plans;
  step?: Steps;
  period?: Period;
  origin?: string;
};

export const formatOnboardUrl = ({
  plan = Plans.Free,
  step = Steps.Registration,
  period = Period.Monthly,
  origin = typeof window !== 'undefined' ? window.location.href : '',
}: Args = {}) => {
  // Start building the URL manually
  let url = PagesRoutes.Onboarding_Flow.replace('{{step}}', step!).replace(
    '{{plan}}',
    plan!
  );

  if (period) {
    url = url.replace('{{period}}', period!);
  } else {
    url = url.replace('{{period}}/', '');
  }

  if (origin) {
    url += `?origin=${encodeURIComponent(origin)}`;
  }

  return url.toString();
};
