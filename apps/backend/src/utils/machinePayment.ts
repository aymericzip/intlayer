import { createHmac } from 'node:crypto';
import { isSelfHosted } from '@utils/isSelfHosted';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { Mppx, stripe } from 'mppx/server';
import Stripe from 'stripe';

/**
 * Machine Payments Protocol (MPP) setup: lets an AI agent pay for an Intlayer
 * plan over HTTP 402, without the dashboard's Stripe Elements checkout.
 *
 * Only Stripe Shared Payment Tokens (cards) are enabled: each payment becomes
 * a regular PaymentIntent, which the existing Stripe webhook already knows how
 * to turn into an activated plan.
 *
 * @see https://mpp.dev
 * @see https://docs.stripe.com/payments/machine/mpp
 */

/** Price of a one-time plan purchase, read from Stripe. */
export type MachinePaymentPrice = {
  priceId: string;
  /** Display units (`"49.00"`), as MPP expects with `decimals`. */
  amount: string;
  currency: string;
  decimals: number;
};

/** Every currency Intlayer bills in has two decimals (EUR / USD). */
const CURRENCY_DECIMALS = 2;

const PRICE_CACHE_DURATION_MS = 5 * 60 * 1000;

let cachedPrice: { value: MachinePaymentPrice; expiresAt: number } | undefined;

let cachedMppx: ReturnType<typeof createMppx> | undefined;

/**
 * Whether agent payments can run: never on a self-hosted instance (billing is
 * cloud-only), and only once Stripe is configured with a business profile
 * (`STRIPE_PROFILE_ID`, the MPP network id) and a one-time price.
 */
export const isMachinePaymentEnabled = (): boolean =>
  !isSelfHosted() &&
  Boolean(
    process.env.STRIPE_SECRET_KEY &&
      process.env.STRIPE_PROFILE_ID &&
      process.env.STRIPE_ONE_TIME_PAYMENT_PRICE_ID
  );

/**
 * HMAC key binding challenges to this server. Derived from the Stripe secret,
 * as in Stripe's MPP guide, unless `MPP_SECRET_KEY` overrides it.
 */
const getChallengeSecretKey = (): string =>
  process.env.MPP_SECRET_KEY ??
  createHmac('sha256', process.env.STRIPE_SECRET_KEY ?? '')
    .update('mpp-challenge-signing')
    .digest('base64');

const createMppx = () => {
  const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY ?? '');

  return Mppx.create({
    methods: [
      stripe.charge({
        client: stripeClient,
        networkId: process.env.STRIPE_PROFILE_ID ?? '',
        paymentMethodTypes: ['card'],
        decimals: CURRENCY_DECIMALS,
      }),
    ],
    secretKey: getChallengeSecretKey(),
    realm: new URL(process.env.BACKEND_URL!).host,
  });
};

/** Lazily created so a missing Stripe configuration never throws at boot. */
export const getMppx = (): ReturnType<typeof createMppx> => {
  cachedMppx ??= createMppx();

  return cachedMppx;
};

/**
 * Reads the one-time (lifetime) plan price from Stripe, cached for a few
 * minutes so challenges do not cost a Stripe call each.
 */
export const getLifetimePrice = async (): Promise<MachinePaymentPrice> => {
  if (cachedPrice && cachedPrice.expiresAt > Date.now()) {
    return cachedPrice.value;
  }

  const priceId = process.env.STRIPE_ONE_TIME_PAYMENT_PRICE_ID ?? '';
  const price = await new Stripe(
    process.env.STRIPE_SECRET_KEY ?? ''
  ).prices.retrieve(priceId);

  if (!price.unit_amount) {
    throw new Error(`Stripe price ${priceId} has no unit amount`);
  }

  const value: MachinePaymentPrice = {
    priceId,
    amount: (price.unit_amount / 10 ** CURRENCY_DECIMALS).toFixed(
      CURRENCY_DECIMALS
    ),
    currency: price.currency,
    decimals: CURRENCY_DECIMALS,
  };

  cachedPrice = { value, expiresAt: Date.now() + PRICE_CACHE_DURATION_MS };

  return value;
};

/**
 * Rebuilds the Fetch `Request` mppx reads (headers and URL only: the paid
 * routes take no body).
 */
export const toFetchRequest = (request: FastifyRequest): Request => {
  const headers = new Headers();

  for (const [name, value] of Object.entries(request.headers)) {
    if (value === undefined) continue;

    headers.set(name, Array.isArray(value) ? value.join(', ') : value);
  }

  const url = new URL(
    request.url,
    `${request.protocol}://${request.headers.host ?? 'localhost'}`
  );

  return new Request(url, { method: request.method, headers });
};

/** Sends a Fetch `Response` (402 challenge, receipt) through Fastify. */
export const sendFetchResponse = async (
  reply: FastifyReply,
  response: Response
): Promise<void> => {
  response.headers.forEach((value, name) => {
    reply.header(name, value);
  });

  reply.status(response.status).send(await response.text());
};
