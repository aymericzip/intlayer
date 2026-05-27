import { BackgroundLayout } from '@components/BackgroundLayout';
import { DemoPage } from '@components/DemoPage';
import { generateMetadata } from './metadata';

export { generateMetadata };

const Page = async () => {
  return (
    <BackgroundLayout>
      <DemoPage />
    </BackgroundLayout>
  );
};
export default Page;
