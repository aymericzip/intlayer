'use client';

import { H1, SwitchSelector } from '@intlayer/design-system';
import { useIntlayer } from 'next-intlayer';
import { type FC, useState } from 'react';
import { Period } from './data.content';
import { PricingCarousel } from './PricingCarousel';

export const PricingPage: FC = () => {
  const [focusedPeriod, setFocusedPeriod] = useState<Period>(Period.Yearly);
  const { title, period, description } = useIntlayer('pricing');

  return (
    <div className="m-auto w-full max-w-full">
      <div className="m-auto max-w-5xl px-10 py-4">
        <H1 className="my-10 ml-4 text-4xl">{title}</H1>
        <p className="text-neutral py-4 text-sm">{description}</p>
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
      <PricingCarousel
        focusedPeriod={focusedPeriod}
        setFocusedPeriod={setFocusedPeriod}
      />
    </div>
  );
};
