import { BackgroundLayout } from '@components/BackgroundLayout';
import { onboardingSteps } from '@components/OnboardPage/steps';
import { NextLayoutIntlayer } from 'next-intlayer';

export const generateStaticParams = () => Object.keys(onboardingSteps);

export { generateMetadata } from './metadata';

const OnboardingLayout: NextLayoutIntlayer<{ step: string }> = ({
  children,
}) => <BackgroundLayout>{children}</BackgroundLayout>;

export default OnboardingLayout;
