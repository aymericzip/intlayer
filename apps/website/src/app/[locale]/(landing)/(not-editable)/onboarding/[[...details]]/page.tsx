import { OnboardFlow } from '@components/OnboardPage';
import { getPlanDetails } from '@components/OnboardPage/getPlanDetails';
import { Container } from '@intlayer/design-system';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider, useIntlayer } from 'next-intlayer/server';

const OnboardPage: NextPageIntlayer<{ details: string[] }> = ({
  params: { locale, details },
}) => {
  const { title, description } = useIntlayer('onboard-page', locale);
  const pageDetails = getPlanDetails(details);

  return (
    <IntlayerServerProvider locale={locale}>
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
    </IntlayerServerProvider>
  );
};

export default OnboardPage;
