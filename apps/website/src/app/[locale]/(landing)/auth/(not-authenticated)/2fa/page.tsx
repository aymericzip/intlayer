import { TotpForm } from '@components/Auth/TotpForm';
import { Container, Loader } from '@intlayer/design-system';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider, useIntlayer } from 'next-intlayer/server';
import { type FC, Suspense } from 'react';

export { generateMetadata } from './metadata';

const TwoFactorFormPageContent: FC = () => {
  const { title, title2, description } = useIntlayer('2fa-page');

  return (
    <>
      <h1 className="hidden">{title}</h1>
      <div className="flex h-full flex-1 flex-col items-center justify-center p-5 md:p-10">
        <Container
          className="w-full max-w-md justify-center gap-10 p-10 text-2xl"
          padding="xl"
          roundedSize="3xl"
          transparency="sm"
        >
          <div className="flex flex-col gap-3 py-3 text-center">
            <h2 className="font-extrabold">{title2}</h2>
            <span className="text-neutral text-xs">{description}</span>
          </div>

          <Suspense fallback={<Loader />}>
            <TotpForm />
          </Suspense>
        </Container>
      </div>
    </>
  );
};

const TwoFactorFormPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <TwoFactorFormPageContent />
    </IntlayerServerProvider>
  );
};

export default TwoFactorFormPage;
