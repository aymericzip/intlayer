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
import type { FastifyInstance } from 'fastify';
import type { Routes } from '@/types/Routes';

export const stripeRoute = '/api/stripe';

const baseURL = () => `${process.env.BACKEND_URL}${stripeRoute}`;

export const getStripeRoutes = () =>
  ({
    getPricing: {
      urlModel: '/pricing',
      url: `${baseURL()}/pricing`,
      method: 'POST',
    },
    createSubscription: {
      urlModel: '/create-subscription',
      url: `${baseURL()}/create-subscription`,
      method: 'POST',
    },
    cancelSubscription: {
      urlModel: '/cancel-subscription',
      url: `${baseURL()}/cancel-subscription`,
      method: 'POST',
    },
    getInvoices: {
      urlModel: '/invoices',
      url: `${baseURL()}/invoices`,
      method: 'GET',
    },
    getPaymentMethod: {
      urlModel: '/payment-method',
      url: `${baseURL()}/payment-method`,
      method: 'GET',
    },
    createPortalSession: {
      urlModel: '/portal-session',
      url: `${baseURL()}/portal-session`,
      method: 'POST',
    },
    grantAffiliateAccess: {
      urlModel: '/affiliate/grant',
      url: `${baseURL()}/affiliate/grant`,
      method: 'POST',
    },
    getAffiliates: {
      urlModel: '/affiliates',
      url: `${baseURL()}/affiliates`,
      method: 'GET',
    },
    getAffiliateById: {
      urlModel: '/affiliates/:id',
      url: ({ id }: { id: string }) => `${baseURL()}/affiliates/${id}`,
      method: 'GET',
    },
    getAffiliate: {
      urlModel: '/affiliate',
      url: `${baseURL()}/affiliate`,
      method: 'GET',
    },
    getAffiliateAccountSession: {
      urlModel: '/affiliate/account-session',
      url: `${baseURL()}/affiliate/account-session`,
      method: 'POST',
    },
    getAffiliateOnboardingLink: {
      urlModel: '/affiliate/onboarding-link',
      url: `${baseURL()}/affiliate/onboarding-link`,
      method: 'GET',
    },
    getAffiliateStats: {
      urlModel: '/affiliate/stats',
      url: `${baseURL()}/affiliate/stats`,
      method: 'GET',
    },
    getAffiliateInvitations: {
      urlModel: '/affiliate/invitations',
      url: `${baseURL()}/affiliate/invitations`,
      method: 'GET',
    },
    sendAffiliateInvitation: {
      urlModel: '/affiliate/invite',
      url: `${baseURL()}/affiliate/invite`,
      method: 'POST',
    },
    getAffiliateInvitation: {
      urlModel: '/affiliate/invitation/:token',
      url: ({ token }: { token: string }) =>
        `${baseURL()}/affiliate/invitation/${token}`,
      method: 'GET',
    },
    acceptAffiliateInvitation: {
      urlModel: '/affiliate/invitation/:token/accept',
      url: ({ token }: { token: string }) =>
        `${baseURL()}/affiliate/invitation/${token}/accept`,
      method: 'POST',
    },
    updateAffiliateStatus: {
      urlModel: '/affiliates/:id/status',
      url: ({ id }: { id: string }) => `${baseURL()}/affiliates/${id}/status`,
      method: 'PATCH',
    },
    getPromoCodes: {
      urlModel: '/promo-codes',
      url: `${baseURL()}/promo-codes`,
      method: 'GET',
    },
    getPromoCodeById: {
      urlModel: '/promo-codes/:id',
      url: ({ id }: { id: string }) => `${baseURL()}/promo-codes/${id}`,
      method: 'GET',
    },
    createPromoCode: {
      urlModel: '/promo-codes',
      url: `${baseURL()}/promo-codes`,
      method: 'POST',
    },
    updatePromoCode: {
      urlModel: '/promo-codes/:id',
      url: ({ id }: { id: string }) => `${baseURL()}/promo-codes/${id}`,
      method: 'PATCH',
    },
    deletePromoCode: {
      urlModel: '/promo-codes/:id',
      url: ({ id }: { id: string }) => `${baseURL()}/promo-codes/${id}`,
      method: 'DELETE',
    },
    getAffiliatePromoCode: {
      urlModel: '/affiliate-promo-code/:referralCode',
      url: ({ referralCode }: { referralCode: string }) =>
        `${baseURL()}/affiliate-promo-code/${referralCode}`,
      method: 'GET',
    },
  }) satisfies Routes;

export const stripeRouter = async (fastify: FastifyInstance) => {
  fastify.post(getStripeRoutes().getPricing.urlModel, getPricing);
  fastify.post(getStripeRoutes().createSubscription.urlModel, getSubscription);
  fastify.post(
    getStripeRoutes().cancelSubscription.urlModel,
    cancelSubscription
  );
  fastify.get(getStripeRoutes().getInvoices.urlModel, getInvoices);
  fastify.get(getStripeRoutes().getPaymentMethod.urlModel, getPaymentMethod);
  fastify.post(
    getStripeRoutes().createPortalSession.urlModel,
    createPortalSession
  );
  fastify.post(
    getStripeRoutes().grantAffiliateAccess.urlModel,
    grantAffiliateAccess
  );
  fastify.get(getStripeRoutes().getAffiliates.urlModel, getAffiliates);
  fastify.get(getStripeRoutes().getAffiliateById.urlModel, getAffiliateById);
  fastify.get(getStripeRoutes().getAffiliate.urlModel, getAffiliate);
  fastify.post(
    getStripeRoutes().getAffiliateAccountSession.urlModel,
    getAffiliateAccountSession
  );
  fastify.get(
    getStripeRoutes().getAffiliateOnboardingLink.urlModel,
    getAffiliateOnboardingLink
  );
  fastify.get(getStripeRoutes().getAffiliateStats.urlModel, getAffiliateStats);
  fastify.get(
    getStripeRoutes().getAffiliateInvitations.urlModel,
    getAffiliateInvitations
  );
  fastify.post(
    getStripeRoutes().sendAffiliateInvitation.urlModel,
    sendAffiliateInvitation
  );
  fastify.get(
    getStripeRoutes().getAffiliateInvitation.urlModel,
    getAffiliateInvitation
  );
  fastify.post(
    getStripeRoutes().acceptAffiliateInvitation.urlModel,
    acceptAffiliateInvitation
  );
  fastify.patch(
    getStripeRoutes().updateAffiliateStatus.urlModel,
    updateAffiliateStatus
  );
  fastify.get(getStripeRoutes().getPromoCodes.urlModel, getPromoCodes);
  fastify.get(getStripeRoutes().getPromoCodeById.urlModel, getPromoCodeById);
  fastify.post(getStripeRoutes().createPromoCode.urlModel, createPromoCode);
  fastify.patch(getStripeRoutes().updatePromoCode.urlModel, updatePromoCode);
  fastify.delete(getStripeRoutes().deletePromoCode.urlModel, deletePromoCode);
  fastify.get(
    getStripeRoutes().getAffiliatePromoCode.urlModel,
    getAffiliatePromoCode
  );
};
