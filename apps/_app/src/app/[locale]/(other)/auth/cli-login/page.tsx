import { CliLoginFlow } from '@components/Auth/CliLogin/CliLoginFlow';
import type { LocalesValues } from 'intlayer';
import { IntlayerServerProvider } from 'next-intlayer/server';

type CliLoginPageProps = {
  params: Promise<{ locale: LocalesValues }>;
  searchParams: Promise<{ port?: string; state?: string }>;
};

const CliLoginPage = async ({ params, searchParams }: CliLoginPageProps) => {
  const { locale } = await params;
  const { port, state } = await searchParams;

  return (
    <IntlayerServerProvider locale={locale}>
      <CliLoginFlow port={port} state={state} />
    </IntlayerServerProvider>
  );
};

export default CliLoginPage;
