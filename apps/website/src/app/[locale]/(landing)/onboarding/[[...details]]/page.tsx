import { OnboardFlow } from '@components/OnboardPage';
import { getPlanDetails } from '@components/OnboardPage/getPlanDetails';
import { Container } from '@intlayer/design-system';
import type { Locales } from 'intlayer';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider, useIntlayer } from 'next-intlayer/server';
import type { FC } from 'react';

const OnboardPageContent: FC<{ locale: Locales; details: string[] }> = ({
  locale,
  details,
}) => {
  const { title, description } = useIntlayer('onboard-page', locale);
  const pageDetails = getPlanDetails(details);

  return (
    <>
      <h1 className="hidden">{title}</h1>
      <div className="flex flex-1 flex-col items-center justify-center gap-5 p-10">
        <span className="text-neutral dark:text-neutral-dark text-xs">
          {description}
        </span>
        <Container
          className="w-full max-w-md justify-center p-10 text-2xl"
          padding="xl"
          roundedSize="xl"
          transparency="sm"
        >
          <OnboardFlow {...pageDetails} />
        </Container>
      </div>
    </>
  );
};

const OnboardPage: NextPageIntlayer<{ details: string[] }> = async ({
  params,
}) => {
  const { locale, details } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <OnboardPageContent locale={locale} details={details} />
    </IntlayerServerProvider>
  );
};

export default OnboardPage;
