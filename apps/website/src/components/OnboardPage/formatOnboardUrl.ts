import { PagesRoutes } from '@/Routes';
import { Period, Plans } from '../PricingPage/data.content';
import { Steps } from './steps';

type Args = {
  plan?: Plans;
  step?: Steps;
  period?: Period;
  origin?: string;
  otherParams?: Record<string, string>;
};
export const formatOnboardUrl = ({
  plan = Plans.Free,
  step = Steps.Registration,
  period = Period.Monthly,
  origin = typeof window !== 'undefined' ? window.location.href : '',
  otherParams = {},
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

  // Create an array to hold query parameter strings
  const queryParams: string[] = [];

  // Add the origin if available
  if (origin) {
    queryParams.push(`origin=${encodeURIComponent(origin)}`);
  }

  // Loop through the additional params and add them
  for (const key in otherParams) {
    if (Object.hasOwn(otherParams, key)) {
      queryParams.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(otherParams[key])}`
      );
    }
  }

  // Append query parameters to the URL if any exist
  if (queryParams.length > 0) {
    url += `?${queryParams.join('&')}`;
  }

  return url;
};
