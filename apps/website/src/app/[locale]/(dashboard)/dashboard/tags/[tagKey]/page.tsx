import { BackgroundLayout } from '@components/BackgroundLayout';
import { TagDetails } from '@components/Dashboard/TagForm/TagDetails';
import type { Next14PageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider, useIntlayer } from 'next-intlayer/server';

type DictionaryDashboardPageProps = {
  tagKey: string;
};

const DictionaryDashboardPage: Next14PageIntlayer<
  DictionaryDashboardPageProps
> = ({ params: { locale, tagKey } }) => {
  const { title } = useIntlayer('tag-dashboard-page', locale);

  return (
    <IntlayerServerProvider locale={locale}>
      <h1 className="border-neutral dark:border-neutral-dark border-b-[0.5px] p-10 text-3xl">
        {title}
      </h1>
      <div className="relative flex size-full flex-1 flex-col items-center">
        <div className="flex size-full flex-1 flex-col items-center justify-center p-10">
          <TagDetails tagKey={tagKey} />
        </div>
        <BackgroundLayout />
      </div>
    </IntlayerServerProvider>
  );
};

export default DictionaryDashboardPage;
