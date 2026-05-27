import { CMSLandingPage } from '@components/CMSLandingPage';
import { generateMetadata } from './metadata';

export { generateMetadata };

const Page = async () => {
  return <CMSLandingPage />;
};

export default Page;
