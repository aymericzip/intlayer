import { Container } from '@intlayer/design-system';
import type { Next14PageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider, useIntlayer } from 'next-intlayer/server';
import { SignUpForm } from '@/components/Auth/SignUpForm';
export { generateMetadata } from './metadata';

const SignUpPage: Next14PageIntlayer = ({ params: { locale } }) => {
  const { title, title2, description } = useIntlayer('sign-up-page', locale);

  return (
    <IntlayerServerProvider locale={locale}>
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
            <span className="text-neutral dark:text-neutral-dark text-xs">
              {description}
            </span>
          </div>

          <SignUpForm />
        </Container>
      </div>
    </IntlayerServerProvider>
  );
};

export default SignUpPage;
