import { PageLayout } from '@layouts/PageLayout';
import type { NextLayoutIntlayer } from 'next-intlayer';
import { FC, PropsWithChildren } from 'react';

const StatupFrame: FC<PropsWithChildren> = () => {
  return (
    <a
      href="https://startupfa.me/s/intlayer.org?utm_source=intlayer.org"
      target="_blank"
      className="absolute bottom-5 right-5 opacity-5"
    >
      <img
        src="https://startupfa.me/badges/featured/dark.webp"
        alt="Featured on Startup Fame"
        width="171"
        height="54"
      />
    </a>
  );
};

const LandingLayout: NextLayoutIntlayer<{
  isSpecial: boolean;
}> = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <PageLayout locale={locale}>
      <StatupFrame />
      {children}
    </PageLayout>
  );
};

export default LandingLayout;
