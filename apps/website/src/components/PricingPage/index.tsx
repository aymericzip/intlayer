'use client';

import { H1, SwitchSelector } from '@intlayer/design-system';
import { useIntlayer } from 'next-intlayer';
import { type FC, useState } from 'react';
import { type Period } from './data.content';
import { PricingCarousel } from './PricingCarousel';

export const PricingPage: FC = () => {
  const [focusedPeriod, setFocusedPeriod] = useState<Period>('yearly');
  const { title, period } = useIntlayer('pricing');

  return (
    <div className="m-auto w-full max-w-full">
      <H1 className="my-10 ml-4 text-4xl">{title}</H1>

      <SwitchSelector
        className="m-auto mb-5"
        choices={[
          { content: period.yearly.value, value: 'yearly' },
          { content: period.monthly.value, value: 'monthly' },
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
