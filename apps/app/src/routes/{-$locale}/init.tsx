import { Container } from '@intlayer/design-system/container';
import { LanguageBackground } from '@intlayer/design-system/language-background';
import {
  App_Auth_SignIn_Path,
  App_Init_Path,
} from '@intlayer/design-system/routes';
import { createFileRoute, redirect } from '@tanstack/react-router';
import {
  defaultLocale,
  getIntlayer,
  getLocalizedUrl,
  localeMap,
} from 'intlayer';
import { useIntlayer } from 'react-intlayer';
import { SetupForm } from '#components/Auth/Setup';
import { BackgroundLayout } from '#components/BackgroundLayout';
import { setupStatusQueryOptions } from '#utils/setupStatus';

export const Route = createFileRoute('/{-$locale}/init')({
  beforeLoad: async ({ context, params }) => {
    // The init flow only exists while a self-hosted instance still needs its
    // first super-admin. Once an admin exists (or on the hosted cloud), fall
    // back to the standard sign-in page.
    const isSetupRequired = await context.queryClient.ensureQueryData(
      setupStatusQueryOptions
    );

    if (!isSetupRequired) {
      throw redirect({
        to: `/{-$locale}${App_Auth_SignIn_Path}`,
        params: { locale: params.locale },
      });
    }
  },
  component: SetupPage,
  head: ({ params }) => {
    const { locale } = params;
    const path = App_Init_Path;
    const content = getIntlayer('setup-page', locale);

    return {
      links: [
        { rel: 'canonical', href: getLocalizedUrl(path, locale) },
        ...localeMap(({ locale: mapLocale }) => ({
          rel: 'alternate',
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),
        {
          rel: 'alternate',
          hrefLang: 'x-default',
          href: getLocalizedUrl(path, defaultLocale),
        },
      ],
      meta: [
        { title: content.metadata.title },
        {
          name: 'description',
          content: content.metadata.description,
        },
        { name: 'robots', content: 'noindex, nofollow' },
      ],
    };
  },
});

function SetupPage() {
  const { title, title2, description } = useIntlayer('setup-page');

  return (
    <BackgroundLayout>
      <LanguageBackground>
        <h1 className="hidden">{title}</h1>
        <div className="flex flex-1 flex-col items-center justify-center gap-5 p-5 md:p-10">
          <Container
            className="w-full max-w-md justify-center gap-16 p-10 text-2xl"
            padding="xl"
            roundedSize="3xl"
            transparency="xs"
          >
            <div className="flex flex-col gap-3 text-center">
              <h2 className="font-extrabold">{title2}</h2>
              <span className="text-neutral text-xs">{description}</span>
            </div>
            <SetupForm />
          </Container>
        </div>
      </LanguageBackground>
    </BackgroundLayout>
  );
}
