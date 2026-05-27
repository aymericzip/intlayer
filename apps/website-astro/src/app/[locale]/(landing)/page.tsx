import { LandingPage as LandingPageContent } from '@components/LandingPage';
import { ProductHeader } from '@structuredData/ProductHeader';
import { SoftwareApplicationHeader } from '@structuredData/SoftwareApplication';
import { WebsiteHeader } from '@structuredData/WebsiteHeader';

const LandingPage = async () => {
  return (
    <>
      <WebsiteHeader />
      <SoftwareApplicationHeader />
      <ProductHeader />
      <LandingPageContent />
    </>
  );
};

export default LandingPage;
