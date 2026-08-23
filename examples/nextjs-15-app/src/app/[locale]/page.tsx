import { HomeContent } from '@components/HomeContent';
import { ServerComponentExample } from '@components/ServerComponentExample';
import type { NextPageIntlayer } from 'next-intlayer';

const Page: NextPageIntlayer = () => (
  <>
    <HomeContent />
    <ServerComponentExample />
  </>
);

export default Page;
