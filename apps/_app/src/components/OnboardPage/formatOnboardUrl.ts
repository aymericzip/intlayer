import { getAppOnboardingFlowRoute } from '@intlayer/design-system/routes';
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
  let url = getAppOnboardingFlowRoute(step!, plan!, period || undefined);

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
