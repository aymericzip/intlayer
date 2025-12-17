import { PageLayout } from '@layouts/PageLayout';
import { Inter } from 'next/font/google';
import type { NextLayoutIntlayer } from 'next-intlayer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

const LandingLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <PageLayout locale={locale} className={inter.className}>
      {children}
    </PageLayout>
  );
};

export default LandingLayout;
