import type { Locale } from '@intlayer/types/allLocales';
import { logger } from '@logger';
import { ErrorHandler } from '@utils/errors';
import {
  getLifetimePrice,
  getMppx,
  sendFetchResponse,
  toFetchRequest,
} from '@utils/machinePayment';
import { hasPermission } from '@utils/permissions';
import { formatResponse } from '@utils/responseData';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { generate } from 'mppx/discovery';
import Stripe from 'stripe';
import type { Organization } from '@/types/organization.types';
import type { User } from '@/types/user.types';

/** Path of the paid route, shared by the router and the discovery document. */
export const MACHINE_PAYMENT_LIFETIME_PATH = '/api/machine-payment/lifetime';

/** Wire shape answered once the payment is recorded. */
export type MachinePaymentLifetimeResult = {
  organizationId: string;
  plan: 'LIFETIME';
  /** The plan turns active when Stripe confirms the charge (webhook). */
  status: 'processing';
};

/**
 * Reuses the organization's Stripe customer or creates one. Called only once a
 * payment credential arrives, so unpaid challenges create no customer.
 */
const resolveStripeCustomer = async (
  organization: Organization,
  user: User,
  locale: Locale | undefined
): Promise<string> => {
  if (organization.plan?.customerId) return organization.plan.customerId;

  const customer = await new Stripe(
    process.env.STRIPE_SECRET_KEY!
  ).customers.create({
    email: user.email,
    metadata: {
      organizationId: String(organization.id),
      userId: String(user.id),
      ...(locale && { locale }),
    },
  });

  return customer.id;
};

/**
 * `POST /api/machine-payment/lifetime` — buys the lifetime plan for the
 * caller's organization through MPP.
 *
 * Without a payment credential the route answers `402` with an MPP challenge;
 * an agent pays it with a Stripe Shared Payment Token and retries. The
 * PaymentIntent carries the same metadata as the dashboard's lifetime checkout,
 * so the existing `charge.succeeded` webhook activates the plan and sends the
 * confirmation email — no second activation path.
 */
export const purchaseLifetimePlan = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const { organization, user, roles } = request.session ?? {};

  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_FOUND');
  }

  if (!organization) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'ORGANIZATION_NOT_FOUND'
    );
  }

  if (
    !hasPermission(
      roles ?? [],
      'organization:admin'
    )({ ...request.session, targetOrganizations: [organization] })
  ) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'PERMISSION_DENIED');
  }

  if (
    organization.plan?.type === 'LIFETIME' &&
    organization.plan.status === 'active'
  ) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'ALREADY_SUBSCRIBED',
      { organizationId: organization.id }
    );
  }

  try {
    const price = await getLifetimePrice();
    const organizationId = String(organization.id);
    const locale = (request.session as unknown as { locale?: Locale }).locale;

    const result = await getMppx().charge({
      amount: price.amount,
      currency: price.currency,
      description: `Intlayer lifetime plan for organization ${organization.name}`,
      // Part of the signed challenge: a credential paid for one organization
      // cannot be replayed to upgrade another.
      externalId: organizationId,
      paymentIntentOptions: async () => ({
        customer: await resolveStripeCustomer(organization, user, locale),
        metadata: {
          organizationId,
          userId: String(user.id),
          priceId: price.priceId,
          purchaseType: 'lifetime',
        },
      }),
    })(toFetchRequest(request));

    if (result.status === 402) {
      return sendFetchResponse(reply, result.challenge);
    }

    return sendFetchResponse(
      reply,
      result.withReceipt(
        Response.json(
          formatResponse<MachinePaymentLifetimeResult>({
            data: { organizationId, plan: 'LIFETIME', status: 'processing' },
          })
        )
      )
    );
  } catch (error) {
    logger.error('[machine-payment] lifetime purchase failed', error);

    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'SUBSCRIPTION_CREATION_FAILED',
      { organizationId: organization.id }
    );
  }
};

/**
 * `GET /openapi.json` — MPP discovery document advertising the paid route and
 * its live price, so agents learn the cost before calling it.
 *
 * @see https://mpp.dev/advanced/discovery
 */
export const getMachinePaymentDiscovery = async (
  _request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  try {
    const price = await getLifetimePrice();
    const websiteUrl = process.env.WEBSITE_URL;
    const backendUrl = process.env.BACKEND_URL;

    const document = generate(getMppx(), {
      info: { title: 'Intlayer API', version: '1.0.0' },
      serviceInfo: {
        categories: ['developer-tools', 'i18n', 'saas'],
        docs: {
          homepage: websiteUrl,
          apiReference: `${backendUrl}/docs`,
          llms: `${websiteUrl}/llms.txt`,
        },
      },
      routes: [
        {
          method: 'post',
          path: MACHINE_PAYMENT_LIFETIME_PATH,
          summary:
            "Buy the Intlayer lifetime plan for the caller's organization. Requires an access-key bearer token of an organization admin.",
          handler: getMppx().charge({
            amount: price.amount,
            currency: price.currency,
            description: 'Intlayer lifetime plan',
          }),
        },
      ],
    });

    reply
      .header('Cache-Control', 'public, max-age=300')
      .header('Access-Control-Allow-Origin', '*')
      .type('application/json; charset=utf-8')
      .send({
        ...document,
        // Absolute, so copies served from other origins (app.intlayer.org)
        // still send agents to the API.
        servers: [{ url: backendUrl }],
        components: {
          securitySchemes: {
            accessKey: {
              type: 'oauth2',
              description:
                'Project access key exchanged for a bearer token (client_credentials). See https://intlayer.org/auth.md',
              flows: {
                clientCredentials: {
                  tokenUrl: `${backendUrl}/oauth2/token`,
                  scopes: {},
                },
              },
            },
          },
        },
        security: [{ accessKey: [] }],
      });
  } catch (error) {
    logger.error('[machine-payment] discovery failed', error);

    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'SUBSCRIPTION_CREATION_FAILED'
    );
  }
};
