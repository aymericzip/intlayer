import { Period, Plans } from '@components/PricingPage/data.content';

const pricing = {
  [Period.Monthly]: {
    [Plans.Premium]: {
      priceId: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_MONTHLY_PRICE_ID!,
    },
    [Plans.Enterprise]: {
      priceId: process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_MONTHLY_PRICE_ID!,
    },
  },
  [Period.Yearly]: {
    [Plans.Premium]: {
      priceId: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_YEARLY_PRICE_ID!,
    },
    [Plans.Enterprise]: {
      priceId: process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_YEARLY_PRICE_ID!,
    },
  },
};

export const retrievePriceId = (
  plan: Plans,
  period: Period
): string | undefined => {
  if (
    !pricing[period as keyof typeof pricing]?.[
      plan as keyof (typeof pricing)[Period]
    ]?.priceId
  ) {
    return undefined;
  }

  return pricing[period as keyof typeof pricing][
    plan as keyof (typeof pricing)[Period]
  ].priceId;
};
