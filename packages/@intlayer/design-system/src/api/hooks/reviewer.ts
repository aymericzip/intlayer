'use client';

import type {
  CreateMissionBody,
  EstimateMissionBody,
  GetMarketplaceQuery,
  RegisterReviewerBody,
  SubmitReviewBody,
  UpdateMissionStatusBody,
  UpdateReviewerBody,
} from '@intlayer/backend';
import {
  type UseQueryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useReviewerAPI } from '../useIntlayerAPI';
import { useAppQuery } from './utils';

export const useGetReviewerMarketplace = (
  params?: GetMarketplaceQuery,
  options?: Partial<UseQueryOptions>
) => {
  const reviewerAPI = useReviewerAPI();

  return useAppQuery({
    queryKey: ['reviewer', 'marketplace', params],
    queryFn: ({ signal }) => reviewerAPI.getMarketplace(params, { signal }),
    ...options,
  });
};

export const useGetReviewerPriceDistribution = (
  params?: Pick<
    GetMarketplaceQuery,
    'fromLocale' | 'toLocale' | 'minRating' | 'categories'
  >,
  options?: Partial<UseQueryOptions>
) => {
  const reviewerAPI = useReviewerAPI();

  return useAppQuery({
    queryKey: ['reviewer', 'marketplace', 'price-distribution', params],
    queryFn: ({ signal }) =>
      reviewerAPI.getPriceDistribution(params, { signal }),
    ...options,
  });
};

export const useGetReviewerById = (
  reviewerId: string | undefined,
  options?: Partial<UseQueryOptions>
) => {
  const reviewerAPI = useReviewerAPI();

  return useAppQuery({
    queryKey: ['reviewer', reviewerId],
    queryFn: ({ signal }) =>
      reviewerAPI.getReviewerById(reviewerId!, { signal }),
    enabled: Boolean(reviewerId),
    ...options,
  });
};

export const useGetReviewerReviews = (
  reviewerId: string | undefined,
  params?: { page?: number; pageSize?: number },
  options?: Partial<UseQueryOptions>
) => {
  const reviewerAPI = useReviewerAPI();

  return useAppQuery({
    queryKey: ['reviewer', reviewerId, 'reviews', params],
    queryFn: ({ signal }) =>
      reviewerAPI.getReviewerReviews(reviewerId!, params, {
        signal,
      }),
    enabled: Boolean(reviewerId),
    ...options,
  });
};

export const useGetMyReviewerProfile = (options?: Partial<UseQueryOptions>) => {
  const reviewerAPI = useReviewerAPI();

  return useAppQuery({
    queryKey: ['reviewer', 'me'],
    queryFn: ({ signal }) => reviewerAPI.getMyReviewerProfile({ signal }),
    requireUser: true,
    ...options,
  });
};

export const useRegisterAsReviewer = () => {
  const reviewerAPI = useReviewerAPI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['reviewer', 'register'],
    mutationFn: (body: RegisterReviewerBody) =>
      reviewerAPI.registerAsReviewer(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviewer', 'me'] });
      queryClient.invalidateQueries({
        queryKey: ['reviewer', 'marketplace'],
      });
    },
  });
};

export const useUpdateReviewerProfile = () => {
  const reviewerAPI = useReviewerAPI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['reviewer', 'update'],
    mutationFn: (body: UpdateReviewerBody) =>
      reviewerAPI.updateReviewerProfile(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviewer', 'me'] });
    },
  });
};

export const useDeleteReviewerProfile = () => {
  const reviewerAPI = useReviewerAPI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['reviewer', 'delete'],
    mutationFn: () => reviewerAPI.deleteReviewerProfile(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviewer', 'me'] });
      queryClient.invalidateQueries({ queryKey: ['reviewer', 'marketplace'] });
    },
  });
};

export const useUploadReviewerMainPicture = () => {
  const reviewerAPI = useReviewerAPI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['reviewer', 'picture', 'main'],
    mutationFn: (file: File) => reviewerAPI.uploadMainPicture(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviewer', 'me'] });
    },
  });
};

export const useUploadReviewerCoverPicture = () => {
  const reviewerAPI = useReviewerAPI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['reviewer', 'picture', 'cover'],
    mutationFn: (file: File) => reviewerAPI.uploadCoverPicture(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviewer', 'me'] });
    },
  });
};

export const useEstimateMission = () => {
  const reviewerAPI = useReviewerAPI();

  return useMutation({
    mutationKey: ['reviewer', 'mission', 'estimate'],
    mutationFn: (body: EstimateMissionBody) =>
      reviewerAPI.estimateMission(body),
  });
};

export const useCreateMission = () => {
  const reviewerAPI = useReviewerAPI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['reviewer', 'mission', 'create'],
    mutationFn: (body: CreateMissionBody) => reviewerAPI.createMission(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviewer', 'missions'] });
    },
  });
};

export const useGetMyMissions = (
  params?: { role?: 'client' | 'reviewer'; page?: number; pageSize?: number },
  options?: Partial<UseQueryOptions>
) => {
  const reviewerAPI = useReviewerAPI();

  return useAppQuery({
    queryKey: ['reviewer', 'missions', params],
    queryFn: ({ signal }) => reviewerAPI.getMyMissions(params, { signal }),
    requireUser: true,
    ...options,
  });
};

export const useGetMissionById = (
  missionId: string | undefined,
  options?: Partial<UseQueryOptions>
) => {
  const reviewerAPI = useReviewerAPI();

  return useAppQuery({
    queryKey: ['reviewer', 'mission', missionId],
    queryFn: ({ signal }) => reviewerAPI.getMissionById(missionId!, { signal }),
    enabled: Boolean(missionId),
    requireUser: true,
    ...options,
  });
};

export const useUpdateMissionStatus = () => {
  const reviewerAPI = useReviewerAPI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['reviewer', 'mission', 'status'],
    mutationFn: ({
      missionId,
      body,
    }: {
      missionId: string;
      body: UpdateMissionStatusBody;
    }) => reviewerAPI.updateMissionStatus(missionId, body),
    onSuccess: (_data, { missionId }) => {
      queryClient.invalidateQueries({
        queryKey: ['reviewer', 'mission', missionId],
      });
      queryClient.invalidateQueries({ queryKey: ['reviewer', 'missions'] });
    },
  });
};

export const useSubmitReview = () => {
  const reviewerAPI = useReviewerAPI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['reviewer', 'review'],
    mutationFn: ({
      missionId,
      body,
    }: {
      missionId: string;
      body: SubmitReviewBody;
    }) => reviewerAPI.submitReview(missionId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviewer'] });
    },
  });
};

export const useGetChatHistory = (
  missionId: string | undefined,
  options?: Partial<UseQueryOptions>
) => {
  const reviewerAPI = useReviewerAPI();

  return useAppQuery({
    queryKey: ['reviewer', 'mission', missionId, 'chat'],
    queryFn: ({ signal }) => reviewerAPI.getChatHistory(missionId!, { signal }),
    enabled: Boolean(missionId),
    requireUser: true,
    ...options,
  });
};

export const useSendReviewerMessage = () => {
  const reviewerAPI = useReviewerAPI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['reviewer', 'chat', 'send'],
    mutationFn: ({
      missionId,
      content,
    }: {
      missionId: string;
      content: string;
    }) => reviewerAPI.sendMessage(missionId, { content }),
    onSuccess: (_data, { missionId }) => {
      queryClient.invalidateQueries({
        queryKey: ['reviewer', 'mission', missionId, 'chat'],
      });
    },
  });
};

export const useContactReviewer = () => {
  const reviewerAPI = useReviewerAPI();
  return useMutation({
    mutationKey: ['reviewer', 'contact'],
    mutationFn: ({
      reviewerId,
      message,
    }: {
      reviewerId: string;
      message: string;
    }) => reviewerAPI.contactReviewer(reviewerId, { message }),
  });
};

export const useGetAdminReviewers = (
  params: { page?: number; pageSize?: number; status?: string } = {},
  options?: Partial<UseQueryOptions>
) => {
  const reviewerAPI = useReviewerAPI();

  return useAppQuery({
    queryKey: ['admin', 'reviewers', params],
    queryFn: ({ signal }) => reviewerAPI.getAdminReviewers(params, { signal }),
    requireUser: true,
    ...options,
  });
};

export const useValidateReviewerProfile = () => {
  const reviewerAPI = useReviewerAPI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['admin', 'reviewer', 'validate'],
    mutationFn: (reviewerId: string) =>
      reviewerAPI.validateReviewerProfile(reviewerId),
    onSuccess: (_data, reviewerId) => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'reviewers'] });
      queryClient.invalidateQueries({
        queryKey: ['reviewer', reviewerId],
      });
    },
  });
};
