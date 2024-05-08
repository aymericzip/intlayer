import { Footer } from '@components/Footer';
import { Navbar } from '@components/Navbar';
import type { NextPageIntlayer } from 'next-intlayer';
import { generateMetadata } from './metadata';
import { AppProviders } from '@/providers/AppProviders';
export { generateMetadata };

const Page: NextPageIntlayer = ({ params: { locale } }) => {
  return (
    <AppProviders locale={locale}>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>

      <Footer />
    </AppProviders>
  );
};

export default Page;
