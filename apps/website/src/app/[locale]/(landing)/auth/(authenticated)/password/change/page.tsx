import { ChangePasswordForm } from '@components/Auth/ChangePassword';
import { Container } from '@intlayer/design-system';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider, useIntlayer } from 'next-intlayer/server';
import type { FC } from 'react';
export { generateMetadata } from './metadata';

const ChangePasswordPageContent: FC = () => {
  const { title, title2, description } = useIntlayer('change-password-page');

  return (
    <>
      <h1 className="hidden">{title}</h1>
      <div className="flex flex-1 flex-col items-center justify-center gap-5 p-5 md:p-10">
        <Container
          className="w-full max-w-md justify-center gap-16 p-10 text-2xl"
          padding="xl"
          roundedSize="xl"
          transparency="sm"
        >
          <div className="flex flex-col gap-3 text-center">
            <h2 className="font-extrabold">{title2}</h2>
            <span className="text-neutral text-xs">{description}</span>
          </div>

          <ChangePasswordForm />
        </Container>
      </div>
    </>
  );
};

const ChangePasswordPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <ChangePasswordPageContent />
    </IntlayerServerProvider>
  );
};

export default ChangePasswordPage;
