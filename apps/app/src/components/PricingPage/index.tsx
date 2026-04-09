import type { GetPricingResult } from '@intlayer/backend';
import { H1 } from '@intlayer/design-system/headers';
import { SwitchSelector } from '@intlayer/design-system/switch-selector';
import { type FC, Suspense, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Period } from './data.content';
import { PricingCarousel } from './PricingCarousel';

type PricingPageProps = {
  pricings?: GetPricingResult['data'];
};

export const PricingPage: FC<PricingPageProps> = ({ pricings }) => {
  const [focusedPeriod, setFocusedPeriod] = useState<Period>(Period.Yearly);
  const { title, period, description } = useIntlayer('pricing');

  return (
    <div className="m-auto w-full max-w-full">
      <div className="m-auto max-w-5xl px-10 py-4">
        <H1 className="my-10 ml-4 text-4xl">{title}</H1>
        <p className="py-4 text-neutral text-sm">{description}</p>
      </div>

      <SwitchSelector
        className="m-auto mb-5"
        choices={[
          { content: period.yearly.value, value: Period.Yearly },
          { content: period.monthly.value, value: Period.Monthly },
        ]}
        color="text"
        onChange={setFocusedPeriod}
        value={focusedPeriod}
      />
      {pricings ? (
        <Suspense>
          <PricingCarousel
            focusedPeriod={focusedPeriod}
            setFocusedPeriod={setFocusedPeriod}
            pricings={pricings}
          />
        </Suspense>
      ) : (
        <div className="m-auto flex h-full w-full items-center justify-center">
          <p className="text-neutral text-sm">
            Failed to fetch pricing data. Please try again later.
          </p>
        </div>
      )}
    </div>
  );
};
