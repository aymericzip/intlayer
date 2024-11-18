import { OnboardFlow } from '@components/OnboardPage';
import { Container } from '@intlayer/design-system';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider, useIntlayer } from 'next-intlayer/server';

const OnboardPage: NextPageIntlayer<{ step: string }> = ({
  params: { locale, step },
}) => {
  const { title, description } = useIntlayer('onboard-page', locale);

  return (
    <IntlayerServerProvider locale={locale}>
      <h1 className="hidden">{title}</h1>
      <div className="flex flex-1 flex-col items-center justify-center gap-5 p-10">
        <span className="text-neutral dark:text-neutral-dark text-xs">
          {description}
        </span>
        <Container
          className="w-full max-w-md justify-center gap-16 p-10 text-2xl"
          padding="xl"
          roundedSize="xl"
          transparency="sm"
        >
          <OnboardFlow stepId={step} />
        </Container>
      </div>
    </IntlayerServerProvider>
  );
};

export default OnboardPage;
