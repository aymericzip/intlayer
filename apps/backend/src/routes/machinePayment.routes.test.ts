import type { FastifyInstance } from 'fastify';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { registerMachinePaymentRoutes } from './machinePayment.routes';

vi.mock('@logger', () => ({
  logger: { info: vi.fn(), error: vi.fn(), warn: vi.fn() },
}));

/** Records the routes a router registers. */
const createApp = () => {
  const routes: string[] = [];
  const app = {
    get: vi.fn((path: string) => routes.push(`GET ${path}`)),
    post: vi.fn((path: string) => routes.push(`POST ${path}`)),
  };

  return { app: app as unknown as FastifyInstance, routes };
};

const configureStripe = () => {
  vi.stubEnv('STRIPE_SECRET_KEY', 'sk_test_machine_payment');
  vi.stubEnv('STRIPE_PROFILE_ID', 'profile_test_intlayer');
  vi.stubEnv('STRIPE_ONE_TIME_PAYMENT_PRICE_ID', 'price_lifetime');
};

describe('registerMachinePaymentRoutes', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('registers nothing on a self-hosted instance, even with Stripe set', () => {
    configureStripe();
    vi.stubEnv('SELF_HOSTED', 'true');
    const { app, routes } = createApp();

    registerMachinePaymentRoutes(app);

    expect(routes).toEqual([]);
  });

  it('registers nothing without a Stripe business profile', () => {
    configureStripe();
    vi.stubEnv('STRIPE_PROFILE_ID', '');
    const { app, routes } = createApp();

    registerMachinePaymentRoutes(app);

    expect(routes).toEqual([]);
  });

  it('registers the discovery and paid routes on the cloud', () => {
    configureStripe();
    vi.stubEnv('SELF_HOSTED', 'false');
    const { app, routes } = createApp();

    registerMachinePaymentRoutes(app);

    expect(routes).toEqual([
      'GET /openapi.json',
      'POST /api/machine-payment/lifetime',
    ]);
  });
});
