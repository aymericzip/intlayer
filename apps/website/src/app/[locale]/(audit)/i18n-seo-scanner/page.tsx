import { BackgroundLayout } from '@components/BackgroundLayout';
import { LocalizationAnalyzer } from '@components/ScannerPage';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider, useIntlayer } from 'next-intlayer/server';
import { type FC, Suspense } from 'react';

export { generateMetadata } from './metadata';

const AuditContent: FC = () => {
  const { title, description } = useIntlayer('audit-page');

  return (
    <div className="relative flex size-full flex-1 flex-col">
      <BackgroundLayout />
      <main className="relative flex flex-1 flex-col items-center justify-center gap-16 px-10 pt-20">
        <h1 className="max-w-5xl font-bold text-3xl text-text leading-tight sm:text-5xl md:text-5xl lg:text-5xl">
          {title}
        </h1>
        <p className="max-w-2xl text-neutral leading-relaxed">{description}</p>
        <Suspense>
          <LocalizationAnalyzer />
        </Suspense>
      </main>
    </div>
  );
};

const AuditPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <AuditContent />
    </IntlayerServerProvider>
  );
};

export default AuditPage;
