import {
  acceptAffiliateInvitation,
  cancelSubscription,
  createPortalSession,
  createPromoCode,
  deletePromoCode,
  getAffiliate,
  getAffiliateAccountSession,
  getAffiliateById,
  getAffiliateInvitation,
  getAffiliateInvitations,
  getAffiliateOnboardingLink,
  getAffiliatePromoCode,
  getAffiliateStats,
  getAffiliates,
  getInvoices,
  getPaymentMethod,
  getPricing,
  getPromoCodeById,
  getPromoCodes,
  getSubscription,
  grantAffiliateAccess,
  sendAffiliateInvitation,
  updateAffiliateStatus,
  updatePromoCode,
} from '@controllers/stripe.controller';
import { stripeContract } from '@intlayer/backend-contract/stripe';
import { registerContractRoutes } from '@utils/contract/registerContractRoutes';
import type { FastifyInstance } from 'fastify';

export const stripeRoute = stripeContract.prefix;

/** Billing routes. The Stripe webhook is registered apart (raw body). */
export const stripeRouter = async (fastify: FastifyInstance) => {
  registerContractRoutes(fastify, stripeContract, {
    getPricing,
    createSubscription: getSubscription,
    cancelSubscription,
    getInvoices,
    getPaymentMethod,
    createPortalSession,
    grantAffiliateAccess,
    getAffiliates,
    getAffiliateById,
    getAffiliate,
    getAffiliateAccountSession,
    getAffiliateOnboardingLink,
    getAffiliateStats,
    getAffiliateInvitations,
    sendAffiliateInvitation,
    getAffiliateInvitation,
    acceptAffiliateInvitation,
    updateAffiliateStatus,
    getPromoCodes,
    getPromoCodeById,
    createPromoCode,
    updatePromoCode,
    deletePromoCode,
    getAffiliatePromoCode,
  });
};
