import { getAppOnboardingFlowRoute } from '@intlayer/design-system/routes';
import { Period, Plans } from '../PricingPage/data.content';
import { Steps } from './steps';

type Args = {
  plan?: Plans;
  step?: Steps;
  period?: Period;
  origin?: string | string[];
  otherParams?: Record<string, any>;
};

export const formatOnboardUrl = ({
  plan = Plans.Free,
  step = Steps.Registration,
  period = Period.Monthly,
  origin = typeof window !== 'undefined' ? window.location.href : '',
  otherParams = {},
}: Args = {}) => {
  // Generate ONLY the base path with the step (e.g., /onboarding/setup-organization)
  // You will need to update getAppOnboardingFlowRoute to stop appending plan/period
  const url = getAppOnboardingFlowRoute(step!);

  const searchParams = new URLSearchParams();

  // Explicitly set plan and period as search parameters
  if (plan) searchParams.set('plan', plan);
  if (period) searchParams.set('period', period);

  const originStr = Array.isArray(origin) ? origin[0] : origin;

  if (typeof originStr === 'string' && originStr) {
    const cleanOrigin = originStr.split('?')[0];
    searchParams.set('origin', cleanOrigin);
  }

  const reservedKeys = ['origin', 'step', 'plan', 'period'];

  for (const [key, value] of Object.entries(otherParams)) {
    if (
      !reservedKeys.includes(key) &&
      value !== undefined &&
      value !== null &&
      value !== 'undefined'
    ) {
      const normalizedValue = Array.isArray(value) ? value[0] : value;
      searchParams.set(key, String(normalizedValue));
    }
  }

  const queryString = searchParams.toString();

  const finalUrl = queryString ? `${url}?${queryString}` : url;

  return finalUrl;
};
