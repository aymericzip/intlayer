import { BackgroundLayout } from '@components/BackgroundLayout';
import { LocalizationAnalyzer } from '@components/ScannerPage';
import { getOrganizationHeader } from '@intlayer/design-system/structured-data';
import { getScannerSoftwareApplicationHeader } from '@intlayer/design-system/structured-data';
import { getWebsiteHeader } from '@intlayer/design-system/structured-data';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider, useIntlayer } from 'next-intlayer/server';
import { type FC, Suspense } from 'react';

export { generateMetadata } from './metadata';

const AuditContent: FC = () => {
  const { title, description } = useIntlayer('audit-page');

  return (
    <div className="relative flex size-full flex-1 flex-col">
      <BackgroundLayout />
      <main className="relative flex flex-1 flex-col items-center justify-center gap-16 px-4 pt-20 md:px-10">
        <h1 className="max-w-3xl text-center font-bold text-3xl text-text leading-tight sm:text-5xl md:text-5xl lg:text-5xl">
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
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: This is safe because the data is generated securely and stringified
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getWebsiteHeader({ locale })),
        }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: This is safe because the data is generated securely and stringified
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getOrganizationHeader({ locale })),
        }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: This is safe because the data is generated securely and stringified
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getScannerSoftwareApplicationHeader({ locale })),
        }}
      />
      <AuditContent />
    </IntlayerServerProvider>
  );
};

export default AuditPage;
