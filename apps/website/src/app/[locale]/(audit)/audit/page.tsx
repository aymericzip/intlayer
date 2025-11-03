import { LocalizationAnalyzer } from '@components/AuditPage';
import { BackgroundLayout } from '@components/BackgroundLayout';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider, useIntlayer } from 'next-intlayer/server';
import type { FC } from 'react';

export { generateMetadata } from './metadata';

const AuditContent: FC = () => {
  const { title, description } = useIntlayer('audit-page');

  return (
    <>
      <h1 className="border-neutral border-b-[0.5px] p-10 text-3xl">{title}</h1>
      <div className="relative flex size-full flex-1 flex-col">
        <BackgroundLayout />
        <p className="m-auto my-3 max-w-3xl px-10 text-neutral text-sm">
          {description}
        </p>
        <div className="relative flex size-full flex-1 flex-col items-center px-10 pb-5">
          <LocalizationAnalyzer />
        </div>
      </div>
    </>
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
