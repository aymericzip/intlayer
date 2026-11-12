import {
  getMachinePaymentDiscovery,
  MACHINE_PAYMENT_LIFETIME_PATH,
  purchaseLifetimePlan,
} from '@controllers/machinePayment.controller';
import { isMachinePaymentEnabled } from '@utils/machinePayment';
import type { FastifyInstance } from 'fastify';

/**
 * Machine Payments Protocol routes. Plain Fastify routes, like the
 * `.well-known` documents: MPP defines its own wire format (`402` challenge,
 * `Payment-Receipt` header, OpenAPI discovery), which a contract envelope
 * would break.
 *
 * Registered after the auth hooks so `request.session` holds the caller.
 * Registers nothing on self-hosted instances or without a Stripe profile.
 *
 * @param app - Fastify instance to register the routes on.
 */
export const registerMachinePaymentRoutes = (app: FastifyInstance): void => {
  if (!isMachinePaymentEnabled()) return;

  app.get('/openapi.json', getMachinePaymentDiscovery);
  app.post(MACHINE_PAYMENT_LIFETIME_PATH, purchaseLifetimePlan);
};
