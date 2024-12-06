import { BackgroundLayout } from '@components/BackgroundLayout';
import { onboardingSteps } from '@components/OnboardPage/steps';
import { Period, Plans } from '@components/PricingPage/data.content';
import { Next14LayoutIntlayer } from 'next-intlayer';

export const generateStaticParams = () => {
  const routes = [
    [],
    ...Object.keys(onboardingSteps).flatMap((step) => [
      [step],
      [step, Plans.Free],
      [step, Plans.Premium, Period.Monthly],
      [step, Plans.Premium, Period.Yearly],
      [step, Plans.Enterprise, Period.Monthly],
      [step, Plans.Enterprise, Period.Yearly],
    ]),
  ].flatMap((details) => ({
    details,
  }));

  return routes;
};

export { generateMetadata } from './metadata';

const OnboardingLayout: Next14LayoutIntlayer<{ details: string[] }> = ({
  children,
}) => <BackgroundLayout>{children}</BackgroundLayout>;

export default OnboardingLayout;
