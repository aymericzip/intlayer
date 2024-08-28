import { Container } from '@intlayer/design-system';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider, useIntlayer } from 'next-intlayer/server';
import { SignInForm } from '@/components/Auth/SignInForm';
export { generateMetadata } from './metadata';

const SignInPage: NextPageIntlayer = ({ params: { locale } }) => {
  const { title, title2, description } = useIntlayer('sign-in-page', locale);

  return (
    <IntlayerServerProvider locale={locale}>
      <h1 className="hidden">{title}</h1>
      <div className="flex h-full flex-1 flex-col items-center justify-center p-10">
        <Container
          className="w-[85%] max-w-md justify-center gap-10 p-10 text-2xl"
          padding="xl"
          roundedSize="xl"
          transparency="sm"
        >
          <div className="flex flex-col gap-3 text-center">
            <h2 className="font-extrabold">{title2}</h2>
            <span className="text-neutral dark:text-neutral-dark text-xs">
              {description}
            </span>
          </div>

          <SignInForm />
        </Container>
      </div>
    </IntlayerServerProvider>
  );
};

export default SignInPage;
