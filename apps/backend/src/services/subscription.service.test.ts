import type Stripe from 'stripe';
import { describe, expect, it, vi } from 'vitest';
import {
  isRelevantForPlan,
  reusePendingLifetimePaymentIntent,
  reusePendingSubscription,
} from './subscription.service';

const createSubscription = (
  id: string,
  metadata: Record<string, string>,
  clientSecret: string | null = `${id}_secret`
) =>
  ({
    id,
    metadata,
    latest_invoice: {
      confirmation_secret: clientSecret
        ? { client_secret: clientSecret }
        : null,
    },
  }) as unknown as Stripe.Subscription;

const createStripeMock = <Item>(
  resource: 'subscriptions' | 'paymentIntents',
  items: Item[]
) => {
  const cancel = vi.fn().mockResolvedValue({});
  const stripe = {
    [resource]: { list: vi.fn().mockResolvedValue({ data: items }), cancel },
  } as unknown as Stripe;

  return { stripe, cancel };
};

describe('isRelevantForPlan', () => {
  it('accepts any status for the current subscription', () => {
    expect(
      isRelevantForPlan({ subscriptionId: 'sub_1' }, 'sub_1', 'incomplete')
    ).toBe(true);
  });

  it('accepts a newly paid subscription', () => {
    expect(
      isRelevantForPlan({ subscriptionId: 'sub_1' }, 'sub_2', 'active')
    ).toBe(true);
  });

  it('ignores unpaid or expired checkouts that are not the plan', () => {
    expect(
      isRelevantForPlan({ subscriptionId: 'sub_1' }, 'sub_2', 'incomplete')
    ).toBe(false);
    expect(isRelevantForPlan(undefined, 'sub_2', 'incomplete_expired')).toBe(
      false
    );
  });
});

describe('reusePendingSubscription', () => {
  it('reuses the matching checkout and cancels the others', async () => {
    const matching = createSubscription('sub_match', {
      priceId: 'price_1',
      couponId: 'coupon_1',
    });
    const otherPrice = createSubscription('sub_other', {
      priceId: 'price_2',
      couponId: 'coupon_1',
    });
    const { stripe, cancel } = createStripeMock('subscriptions', [
      otherPrice,
      matching,
    ]);

    const result = await reusePendingSubscription(
      stripe,
      'cus_1',
      'price_1',
      'coupon_1'
    );

    expect(result?.id).toBe('sub_match');
    expect(cancel).toHaveBeenCalledExactlyOnceWith('sub_other');
  });

  it('does not reuse a checkout created with another coupon', async () => {
    const { stripe, cancel } = createStripeMock('subscriptions', [
      createSubscription('sub_no_coupon', { priceId: 'price_1', couponId: '' }),
    ]);

    const result = await reusePendingSubscription(
      stripe,
      'cus_1',
      'price_1',
      'coupon_1'
    );

    expect(result).toBeNull();
    expect(cancel).toHaveBeenCalledExactlyOnceWith('sub_no_coupon');
  });

  it('does not reuse a checkout without a client secret', async () => {
    const { stripe } = createStripeMock('subscriptions', [
      createSubscription('sub_1', { priceId: 'price_1', couponId: '' }, null),
    ]);

    expect(
      await reusePendingSubscription(stripe, 'cus_1', 'price_1', null)
    ).toBeNull();
  });
});

describe('reusePendingLifetimePaymentIntent', () => {
  const createPaymentIntent = (
    id: string,
    amount: number,
    status: Stripe.PaymentIntent.Status = 'requires_payment_method'
  ) =>
    ({
      id,
      amount,
      status,
      client_secret: `${id}_secret`,
      metadata: { purchaseType: 'lifetime', priceId: 'price_lifetime' },
    }) as unknown as Stripe.PaymentIntent;

  it('reuses the unpaid intent with the same amount and cancels the others', async () => {
    const { stripe, cancel } = createStripeMock('paymentIntents', [
      createPaymentIntent('pi_full_price', 10_000),
      createPaymentIntent('pi_discounted', 8_000),
      createPaymentIntent('pi_paid', 8_000, 'succeeded'),
    ]);

    const result = await reusePendingLifetimePaymentIntent(
      stripe,
      'cus_1',
      'price_lifetime',
      8_000
    );

    expect(result?.id).toBe('pi_discounted');
    expect(cancel).toHaveBeenCalledExactlyOnceWith('pi_full_price');
  });
});
