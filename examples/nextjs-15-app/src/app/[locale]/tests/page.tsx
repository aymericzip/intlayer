import type { LocalPromiseParams, NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider, useIntlayer } from 'next-intlayer/server';

const TestsPageContent = () => {
  const content = useIntlayer('app');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="font-bold text-4xl">Tests Page (Next.js 15)</h1>
      <p className="mt-4 text-xl">
        This page is reached via canonical /[locale]/tests or localized aliases.
      </p>
      <div className="mt-8 rounded border p-4">
        <h2 className="font-semibold text-2xl">Localized Content:</h2>
        <p>{content.title}</p>
      </div>
    </div>
  );
};

const TestsPage: NextPageIntlayer = async ({ params }: LocalPromiseParams) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <TestsPageContent />
    </IntlayerServerProvider>
  );
};

export default TestsPage;
