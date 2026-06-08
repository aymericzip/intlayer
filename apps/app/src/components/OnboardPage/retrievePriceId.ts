import { Period, Plans } from '#components/PricingPage/data.content';

const pricing: Partial<
  Record<Period, Partial<Record<Plans, { priceId: string }>>>
> = {
  [Period.Monthly]: {
    [Plans.Premium]: {
      priceId: import.meta.env.VITE_STRIPE_PREMIUM_MONTHLY_PRICE_ID!,
    },
    [Plans.Enterprise]: {
      priceId: import.meta.env.VITE_STRIPE_ENTERPRISE_MONTHLY_PRICE_ID!,
    },
  },
  [Period.Yearly]: {
    [Plans.Premium]: {
      priceId: import.meta.env.VITE_STRIPE_PREMIUM_YEARLY_PRICE_ID!,
    },
    [Plans.Enterprise]: {
      priceId: import.meta.env.VITE_STRIPE_ENTERPRISE_YEARLY_PRICE_ID!,
    },
  },
  [Period.Lifetime]: {
    [Plans.Lifetime]: {
      priceId: import.meta.env.VITE_STRIPE_ONE_TIME_PAYMENT_PRICE_ID!,
    },
  },
};

export const retrievePriceId = (
  plan: Plans,
  period: Period
): string | undefined => pricing[period]?.[plan]?.priceId || undefined;
