import type { AudienceRange } from '@intlayer/backend-contract/analytics';
import { useGetPageFlow } from '@intlayer/design-system/api';
import { PageFlow as PageFlowChart } from '@intlayer/design-system/page-flow';
import { useState } from 'react';

type PageFlowProps = {
  range: AudienceRange;
  pageOptions: string[];
  locale: string;
};

/** Fetches the selected report for the shared page-flow chart. */
export const PageFlow = ({ range, pageOptions, locale }: PageFlowProps) => {
  const [startUrl, setStartUrl] = useState('/');
  const { data, isLoading, isPlaceholderData } = useGetPageFlow(
    range,
    startUrl,
    {
      refetchInterval: range === 'live' ? 15_000 : false,
    }
  );

  return (
    <PageFlowChart
      flow={data?.data}
      isLoading={isLoading}
      isPlaceholderData={isPlaceholderData}
      startUrl={startUrl}
      onStartUrlChange={setStartUrl}
      pageOptions={pageOptions}
      locale={locale}
    />
  );
};
