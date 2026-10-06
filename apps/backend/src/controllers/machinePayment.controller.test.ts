import type { FastifyReply, FastifyRequest } from 'fastify';
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

const { stripeMock } = vi.hoisted(() => ({
  stripeMock: {
    prices: {
      retrieve: vi.fn(async (priceId: string) => ({
        id: priceId,
        unit_amount: 4900,
        currency: 'usd',
      })),
    },
    customers: { create: vi.fn(async () => ({ id: 'cus_new' })) },
  },
}));

vi.mock('stripe', () => ({
  default: vi.fn(function StripeMock() {
    return stripeMock;
  }),
}));
vi.mock('@logger', () => ({
  logger: { info: vi.fn(), error: vi.fn(), warn: vi.fn() },
}));

beforeAll(() => {
  process.env.STRIPE_SECRET_KEY = 'sk_test_machine_payment';
  process.env.STRIPE_PROFILE_ID = 'profile_test_intlayer';
  process.env.STRIPE_ONE_TIME_PAYMENT_PRICE_ID = 'price_lifetime';
  process.env.BACKEND_URL = 'https://back.intlayer.org';
});

const {
  getMachinePaymentDiscovery,
  MACHINE_PAYMENT_LIFETIME_PATH,
  purchaseLifetimePlan,
} = await import('./machinePayment.controller');

const organizationId = '0123456789abcdef01234567';
const userId = 'aaaaaaaaaaaaaaaaaaaaaaaa';

type TestPlan = { type: string; status: string; customerId?: string };

/** Builds a bearer-authenticated request as the oAuth2 middleware leaves it. */
const createRequest = ({
  roles = ['org_admin'],
  plan,
  withUser = true,
  withOrganization = true,
}: {
  roles?: string[];
  plan?: TestPlan;
  withUser?: boolean;
  withOrganization?: boolean;
} = {}): FastifyRequest => {
  const organization = {
    id: organizationId,
    name: 'Acme',
    membersIds: [userId],
    plan,
  };

  return {
    method: 'POST',
    url: MACHINE_PAYMENT_LIFETIME_PATH,
    protocol: 'https',
    headers: {
      host: 'back.intlayer.org',
      authorization: 'Bearer token',
    },
    session: {
      user: withUser ? { id: userId, email: 'admin@acme.org' } : undefined,
      organization: withOrganization ? organization : null,
      roles,
    },
  } as unknown as FastifyRequest;
};

/** Records the status, headers and payload the controller answers with. */
const createReply = () => {
  const reply = {
    statusCode: 200,
    payload: undefined as unknown,
    headers: {} as Record<string, string>,
    request: undefined,
    code: vi.fn((statusCode: number) => {
      reply.statusCode = statusCode;
      return reply;
    }),
    status: vi.fn((statusCode: number) => {
      reply.statusCode = statusCode;
      return reply;
    }),
    header: vi.fn((name: string, value: string) => {
      reply.headers[name.toLowerCase()] = value;
      return reply;
    }),
    type: vi.fn((value: string) => {
      reply.headers['content-type'] = value;
      return reply;
    }),
    send: vi.fn((payload: unknown) => {
      reply.payload = payload;
      return reply;
    }),
  };

  return reply;
};

const asReply = (reply: ReturnType<typeof createReply>) =>
  reply as unknown as FastifyReply;

describe('purchaseLifetimePlan', () => {
  beforeEach(() => {
    stripeMock.customers.create.mockClear();
  });

  it('answers 402 with an MPP challenge for the lifetime price', async () => {
    const reply = createReply();

    await purchaseLifetimePlan(createRequest(), asReply(reply));

    expect(reply.statusCode).toBe(402);

    const challenge = reply.headers['www-authenticate'];
    expect(challenge).toMatch(/^Payment /);
    expect(challenge).toContain('method="stripe"');
    expect(challenge).toContain('intent="charge"');
    expect(challenge).toContain('realm="back.intlayer.org"');
  });

  it('creates no Stripe customer for an unpaid challenge', async () => {
    await purchaseLifetimePlan(createRequest(), asReply(createReply()));

    expect(stripeMock.customers.create).not.toHaveBeenCalled();
  });

  it('binds the challenge to the organization', async () => {
    const reply = createReply();

    await purchaseLifetimePlan(createRequest(), asReply(reply));

    const encodedRequest =
      reply.headers['www-authenticate']?.match(/request="([^"]+)"/)?.[1];
    const decodedRequest = JSON.parse(
      Buffer.from(encodedRequest ?? '', 'base64url').toString('utf8')
    ) as { amount: string; currency: string; externalId: string };

    expect(decodedRequest).toMatchObject({
      amount: '4900',
      currency: 'usd',
      externalId: organizationId,
    });
  });

  it('rejects a caller who is not an organization admin', async () => {
    const reply = createReply();

    await purchaseLifetimePlan(
      createRequest({ roles: ['org_user'] }),
      asReply(reply)
    );

    expect(reply.statusCode).toBe(403);
  });

  it('rejects an organization already on the lifetime plan', async () => {
    const reply = createReply();

    await purchaseLifetimePlan(
      createRequest({ plan: { type: 'LIFETIME', status: 'active' } }),
      asReply(reply)
    );

    expect(reply.statusCode).not.toBe(402);
    expect(JSON.stringify(reply.payload)).toContain('ALREADY_SUBSCRIBED');
  });

  it('requires an authenticated user and organization', async () => {
    const withoutUser = createReply();
    const withoutOrganization = createReply();

    await purchaseLifetimePlan(
      createRequest({ withUser: false }),
      asReply(withoutUser)
    );
    await purchaseLifetimePlan(
      createRequest({ withOrganization: false }),
      asReply(withoutOrganization)
    );

    expect(JSON.stringify(withoutUser.payload)).toContain('USER_NOT_FOUND');
    expect(JSON.stringify(withoutOrganization.payload)).toContain(
      'ORGANIZATION_NOT_FOUND'
    );
  });
});

describe('getMachinePaymentDiscovery', () => {
  it('advertises the paid route with its live price', async () => {
    const reply = createReply();

    await getMachinePaymentDiscovery(
      createRequest() as FastifyRequest,
      asReply(reply)
    );

    const document = reply.payload as {
      openapi: string;
      paths: Record<
        string,
        {
          post: {
            'x-payment-info': {
              offers: { amount: string; currency: string; method: string }[];
            };
            responses: Record<string, unknown>;
          };
        }
      >;
    };
    const operation = document.paths[MACHINE_PAYMENT_LIFETIME_PATH]?.post;

    expect(document.openapi).toBe('3.1.0');
    expect(operation?.responses).toHaveProperty('402');
    expect(operation?.['x-payment-info'].offers[0]).toMatchObject({
      amount: '4900',
      currency: 'usd',
      method: 'stripe',
    });
    expect(reply.headers['cache-control']).toBe('public, max-age=300');
    expect(reply.payload).toMatchObject({
      servers: [{ url: 'https://back.intlayer.org' }],
    });
  });
});
