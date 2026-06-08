'use client';

import type {
  CreatePromoCodeBody,
  GetAffiliatesParams,
  GetCheckoutSessionBody,
  GetPricingBody,
  GetPricingResult,
  GrantAffiliateAccessBody,
  SendAffiliateInvitationBody,
  UpdatePromoCodeBody,
} from '@intlayer/backend';
import {
  type UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useStripeAPI } from '../useIntlayerAPI';
import { useAppQuery } from './utils';

export const useGetPricing = (
  body: GetPricingBody,
  options?: Partial<UseQueryOptions<GetPricingResult>>
) => {
  const stripeAPI = useStripeAPI();

  return useQuery({
    queryKey: ['pricing', body],
    queryFn: ({ signal }) => stripeAPI.getPricing(body, { signal }),
    ...options,
  });
};

export const useGetSubscription = (
  body: GetCheckoutSessionBody,
  options?: Partial<UseQueryOptions>
) => {
  const stripeAPI = useStripeAPI();

  return useAppQuery({
    queryKey: ['subscription', body],
    queryFn: ({ signal }) => stripeAPI.getSubscription(body, { signal }),
    requireUser: true,
    requireOrganization: true,
    ...options,
  });
};

export const useCancelSubscription = () => {
  const stripeAPI = useStripeAPI();

  return useMutation({
    mutationKey: ['subscription'],
    mutationFn: () => stripeAPI.cancelSubscription(),
    meta: {
      invalidateQueries: [['session'], ['subscription']],
    },
  });
};

export const useGetInvoices = (options?: Partial<UseQueryOptions>) => {
  const stripeAPI = useStripeAPI();

  return useAppQuery({
    queryKey: ['invoices'],
    queryFn: ({ signal }) => stripeAPI.getInvoices({ signal }),
    requireUser: true,
    requireOrganization: true,
    ...options,
  });
};

export const useGetPaymentMethod = (options?: Partial<UseQueryOptions>) => {
  const stripeAPI = useStripeAPI();

  return useAppQuery({
    queryKey: ['paymentMethod'],
    queryFn: ({ signal }) => stripeAPI.getPaymentMethod({ signal }),
    requireUser: true,
    requireOrganization: true,
    ...options,
  });
};

export const useCreatePortalSession = () => {
  const stripeAPI = useStripeAPI();

  return useMutation({
    mutationKey: ['portalSession'],
    mutationFn: () => stripeAPI.createPortalSession(),
  });
};

export const useGetAffiliates = (
  params?: GetAffiliatesParams,
  options?: Partial<UseQueryOptions>
) => {
  const stripeAPI = useStripeAPI();

  return useAppQuery({
    queryKey: ['affiliates', params],
    queryFn: ({ signal }) => stripeAPI.getAffiliates(params, { signal }),
    requireUser: true,
    ...options,
  });
};

export const useGetAffiliateInvitations = (
  params?: GetAffiliatesParams,
  options?: Partial<UseQueryOptions>
) => {
  const stripeAPI = useStripeAPI();

  return useAppQuery({
    queryKey: ['affiliate-invitations', params],
    queryFn: ({ signal }) =>
      stripeAPI.getAffiliateInvitations(params, { signal }),
    requireUser: true,
    ...options,
  });
};

export const useGetAffiliateById = (
  id: string,
  options?: Partial<UseQueryOptions>
) => {
  const stripeAPI = useStripeAPI();

  return useAppQuery({
    queryKey: ['affiliates', id],
    queryFn: ({ signal }) => stripeAPI.getAffiliateById({ id }, { signal }),
    requireUser: true,
    enabled: Boolean(id),
    ...options,
  });
};

export const useGetAffiliate = (options?: Partial<UseQueryOptions>) => {
  const stripeAPI = useStripeAPI();

  return useAppQuery({
    queryKey: ['affiliate'],
    queryFn: ({ signal }) => stripeAPI.getAffiliate({ signal }),
    requireUser: true,
    ...options,
  });
};

export const useGetAffiliateAccountSession = (
  options?: Partial<UseQueryOptions>
) => {
  const stripeAPI = useStripeAPI();

  return useAppQuery({
    queryKey: ['affiliate', 'account-session'],
    queryFn: () => stripeAPI.getAffiliateAccountSession(),
    requireUser: true,
    ...options,
  });
};

export const useGetAffiliateOnboardingLink = (
  options?: Partial<UseQueryOptions>
) => {
  const stripeAPI = useStripeAPI();

  return useAppQuery({
    queryKey: ['affiliate', 'onboarding-link'],
    queryFn: () => stripeAPI.getAffiliateOnboardingLink(),
    requireUser: true,
    ...options,
  });
};

export const useGetAffiliateStats = (options?: Partial<UseQueryOptions>) => {
  const stripeAPI = useStripeAPI();

  return useAppQuery({
    queryKey: ['affiliate', 'stats'],
    queryFn: ({ signal }) => stripeAPI.getAffiliateStats({ signal }),
    requireUser: true,
    ...options,
  });
};

export const useGrantAffiliateAccess = () => {
  const stripeAPI = useStripeAPI();

  return useMutation({
    mutationKey: ['affiliate', 'grant'],
    mutationFn: (body: GrantAffiliateAccessBody) =>
      stripeAPI.grantAffiliateAccess(body),
    meta: {
      invalidateQueries: [['affiliate']],
    },
  });
};

export const useSendAffiliateInvitation = () => {
  const stripeAPI = useStripeAPI();

  return useMutation({
    mutationKey: ['affiliate', 'invitation', 'send'],
    mutationFn: (body: SendAffiliateInvitationBody) =>
      stripeAPI.sendAffiliateInvitation(body),
    meta: {
      invalidateQueries: [['affiliate-invitations']],
    },
  });
};

export const useGetAffiliateInvitation = (
  token: string,
  options?: Partial<UseQueryOptions>
) => {
  const stripeAPI = useStripeAPI();

  return useQuery({
    queryKey: ['affiliate', 'invitation', token],
    queryFn: () => stripeAPI.getAffiliateInvitation({ token }),
    enabled: Boolean(token),
    ...options,
  });
};

export const useAcceptAffiliateInvitation = () => {
  const stripeAPI = useStripeAPI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['affiliate', 'invitation', 'accept'],
    mutationFn: ({
      token,
      country,
      stripeAccountType,
    }: {
      token: string;
      country?: string;
      stripeAccountType?: 'express' | 'standard';
    }) =>
      stripeAPI.acceptAffiliateInvitation({
        token,
        country,
        stripeAccountType,
      }),
    onSuccess: (_data, { token }) => {
      queryClient.invalidateQueries({
        queryKey: ['affiliate', 'invitation', token],
      });
      queryClient.invalidateQueries({ queryKey: ['affiliate'] });
    },
  });
};

export const useUpdateAffiliateStatus = () => {
  const stripeAPI = useStripeAPI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['affiliate', 'update'],
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status?: 'active' | 'suspended';
    }) => stripeAPI.updateAffiliateStatus({ id }, { status }),
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['affiliates', id] });
      queryClient.invalidateQueries({ queryKey: ['affiliates'] });
    },
  });
};

export const useGetPromoCodeById = (
  promoCodeId?: string,
  options?: Partial<UseQueryOptions>
) => {
  const stripeAPI = useStripeAPI();

  return useAppQuery({
    queryKey: ['promo-codes', promoCodeId],
    queryFn: ({ signal }) =>
      stripeAPI.getPromoCodeById(promoCodeId!, { signal }),
    enabled: Boolean(promoCodeId),
    requireUser: true,
    ...options,
  });
};

export const useGetPromoCodes = (
  params: { affiliateId?: string } = {},
  options?: Partial<UseQueryOptions>
) => {
  const stripeAPI = useStripeAPI();

  return useAppQuery({
    queryKey: ['promo-codes', params.affiliateId ?? 'all'],
    queryFn: ({ signal }) => stripeAPI.getPromoCodes(params, { signal }),
    requireUser: true,
    ...options,
  });
};

export const useCreatePromoCode = () => {
  const stripeAPI = useStripeAPI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['promo-codes', 'create'],
    mutationFn: (body: CreatePromoCodeBody) => stripeAPI.createPromoCode(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['promo-codes'] });
    },
  });
};

export const useUpdatePromoCode = () => {
  const stripeAPI = useStripeAPI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['promo-codes', 'update'],
    mutationFn: ({ id, ...body }: { id: string } & UpdatePromoCodeBody) =>
      stripeAPI.updatePromoCode({ id, ...body }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['promo-codes'] });
    },
  });
};

export const useDeletePromoCode = () => {
  const stripeAPI = useStripeAPI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['promo-codes', 'delete'],
    mutationFn: ({ id }: { id: string }) => stripeAPI.deletePromoCode({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['promo-codes'] });
    },
  });
};

export const useGetAffiliatePromoCode = (
  referralCode?: string,
  options?: Partial<UseQueryOptions>
) => {
  const stripeAPI = useStripeAPI();

  return useQuery({
    queryKey: ['affiliate-promo-code', referralCode],
    queryFn: () => stripeAPI.getAffiliatePromoCode(referralCode!),
    enabled: Boolean(referralCode),
    ...options,
  });
};
