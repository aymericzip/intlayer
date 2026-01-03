import { Period, Plans } from '@components/PricingPage/data.content';
import { Steps } from './steps';

export const getPlanDetails = (details: string[]) => {
  const [step, ...rest] = details ?? [];

  return {
    step: (step as Steps) ?? Steps.Registration,
    plan: (rest[0] as Plans) ?? Plans.Free,
    period: (rest[1] as Period) ?? Period.Monthly,
  };
};
