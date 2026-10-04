import type { RouteEndpoints } from '@intlayer/backend-contract/defineRoute';
import { buildRouteURL } from '@intlayer/backend-contract/defineRoute';
import type {
  PaginatedResponse,
  ResponseData,
} from '@intlayer/backend-contract/responseData';
import type {
  CreateMissionBody,
  EstimateMissionBody,
  GetMarketplaceQuery,
  MissionEstimate,
  PriceDistributionData,
  RegisterReviewerBody,
  ReviewerMessageAPI,
  ReviewerProfileAPI,
  ReviewerReviewAPI,
  ReviewerRoutes,
  reviewerContract,
  SendMessageBody,
  SubmitReviewBody,
  TranslationMissionAPI,
  UpdateMissionStatusBody,
  UpdateReviewerBody,
  UploadReviewerPictureResult,
} from '@intlayer/backend-contract/reviewer';
import { editor } from '@intlayer/config/built';
import { BACKEND_URL } from '@intlayer/config/defaultValues';
import type { IntlayerConfig } from '@intlayer/types/config';
import { createEndpoint } from '../cms/createIntlayerCMS';
import { type FetcherOptions, fetcher } from '../fetcher';

/** Prefix of the routes, checked against the backend contract. */
const reviewerGroup = {
  prefix: '/api/reviewer',
} as const satisfies Pick<typeof reviewerContract, 'prefix'>;

/**
 * Method and path of every route, checked against the backend contract at
 * compile time (the contract's zod schemas are never loaded).
 */
const reviewerEndpoints = {
  getMarketplace: { method: 'GET', path: '/marketplace' },
  getPriceDistribution: {
    method: 'GET',
    path: '/marketplace/price-distribution',
  },
  getMyReviewerProfile: { method: 'GET', path: '/me' },
  getReviewerReviews: { method: 'GET', path: '/:reviewerId/reviews' },
  getReviewerById: { method: 'GET', path: '/:reviewerId' },
  registerAsReviewer: { method: 'POST', path: '/register' },
  updateReviewerProfile: { method: 'PUT', path: '/' },
  deleteReviewerProfile: { method: 'DELETE', path: '/' },
  uploadMainPicture: { method: 'POST', path: '/me/picture/main' },
  uploadCoverPicture: { method: 'POST', path: '/me/picture/cover' },
  estimateMission: { method: 'POST', path: '/mission/estimate' },
  createMission: { method: 'POST', path: '/mission' },
  getMyMissions: { method: 'GET', path: '/mission' },
  getMissionById: { method: 'GET', path: '/mission/:missionId' },
  updateMissionStatus: { method: 'PUT', path: '/mission/:missionId/status' },
  submitReview: { method: 'POST', path: '/mission/:missionId/review' },
  getChatHistory: { method: 'GET', path: '/mission/:missionId/chat/history' },
  sendMessage: { method: 'POST', path: '/mission/:missionId/chat' },
  chatSSE: { method: 'GET', path: '/mission/:missionId/chat/stream' },
  createPaymentIntent: {
    method: 'POST',
    path: '/mission/:missionId/payment/intent',
  },
  confirmPayment: {
    method: 'POST',
    path: '/mission/:missionId/payment/confirm',
  },
  requestPayout: { method: 'POST', path: '/payout' },
  contactReviewer: { method: 'POST', path: '/:reviewerId/contact' },
  getAdminReviewers: { method: 'GET', path: '/admin/reviewers' },
  validateReviewerProfile: { method: 'PUT', path: '/:reviewerId/validate' },
} as const satisfies RouteEndpoints<ReviewerRoutes>;

export const getReviewerAPI = (
  authAPIOptions: FetcherOptions = {},
  intlayerConfig?: IntlayerConfig
) => {
  const backendURL =
    intlayerConfig?.editor?.backendURL ?? editor.backendURL ?? BACKEND_URL;

  // ── Marketplace ────────────────────────────────────────────────────────────

  const getMarketplace = (
    params: GetMarketplaceQuery = {},
    otherOptions: FetcherOptions = {}
  ) => {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (value === undefined) continue;
      if (Array.isArray(value)) {
        value.forEach((item) => {
          searchParams.append(key, String(item));
        });
      } else {
        searchParams.append(key, String(value));
      }
    }
    const query = searchParams.toString();

    return fetcher<PaginatedResponse<ReviewerProfileAPI>>(
      `${buildRouteURL(backendURL, reviewerGroup, reviewerEndpoints.getMarketplace)}${query ? `?${query}` : ''}`,
      authAPIOptions,
      otherOptions,
      { method: 'GET' }
    );
  };

  const getPriceDistribution = (
    params: Pick<
      GetMarketplaceQuery,
      'fromLocale' | 'toLocale' | 'minRating' | 'categories'
    > = {},
    otherOptions: FetcherOptions = {}
  ) => {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (value === undefined) continue;
      if (Array.isArray(value)) {
        value.forEach((item) => {
          searchParams.append(key, String(item));
        });
      } else {
        searchParams.append(key, String(value));
      }
    }
    const query = searchParams.toString();
    return fetcher<ResponseData<PriceDistributionData>>(
      `${buildRouteURL(backendURL, reviewerGroup, reviewerEndpoints.getPriceDistribution)}${query ? `?${query}` : ''}`,
      authAPIOptions,
      otherOptions,
      { method: 'GET' }
    );
  };

  const getReviewerById = (
    reviewerId: string,
    otherOptions: FetcherOptions = {}
  ) =>
    fetcher<ResponseData<ReviewerProfileAPI>>(
      buildRouteURL(
        backendURL,
        reviewerGroup,
        reviewerEndpoints.getReviewerById,
        { reviewerId }
      ),
      authAPIOptions,
      otherOptions,
      { method: reviewerEndpoints.getReviewerById.method }
    );

  const getReviewerReviews = (
    reviewerId: string,
    params: { page?: number; pageSize?: number } = {},
    otherOptions: FetcherOptions = {}
  ) => {
    const query = new URLSearchParams(
      Object.fromEntries(
        Object.entries(params)
          .filter(([, v]) => v !== undefined)
          .map(([k, v]) => [k, String(v)])
      )
    ).toString();
    return fetcher<PaginatedResponse<ReviewerReviewAPI>>(
      `${buildRouteURL(backendURL, reviewerGroup, reviewerEndpoints.getReviewerReviews, { reviewerId })}${query ? `?${query}` : ''}`,
      authAPIOptions,
      otherOptions,
      { method: 'GET' }
    );
  };

  // ── My profile ─────────────────────────────────────────────────────────────

  const getMyReviewerProfile = (otherOptions: FetcherOptions = {}) =>
    fetcher<ResponseData<ReviewerProfileAPI | null>>(
      buildRouteURL(
        backendURL,
        reviewerGroup,
        reviewerEndpoints.getMyReviewerProfile
      ),
      authAPIOptions,
      otherOptions,
      { method: reviewerEndpoints.getMyReviewerProfile.method }
    );

  const registerAsReviewer = (
    body: RegisterReviewerBody,
    otherOptions: FetcherOptions = {}
  ) =>
    fetcher<ResponseData<ReviewerProfileAPI>>(
      buildRouteURL(
        backendURL,
        reviewerGroup,
        reviewerEndpoints.registerAsReviewer
      ),
      authAPIOptions,
      otherOptions,
      { method: reviewerEndpoints.registerAsReviewer.method, body }
    );

  const updateReviewerProfile = (
    body: UpdateReviewerBody,
    otherOptions: FetcherOptions = {}
  ) =>
    fetcher<ResponseData<ReviewerProfileAPI>>(
      buildRouteURL(
        backendURL,
        reviewerGroup,
        reviewerEndpoints.updateReviewerProfile
      ),
      authAPIOptions,
      otherOptions,
      { method: reviewerEndpoints.updateReviewerProfile.method, body }
    );

  const deleteReviewerProfile = (otherOptions: FetcherOptions = {}) =>
    fetcher<ResponseData<null>>(
      buildRouteURL(
        backendURL,
        reviewerGroup,
        reviewerEndpoints.deleteReviewerProfile
      ),
      authAPIOptions,
      otherOptions,
      {
        method: reviewerEndpoints.deleteReviewerProfile.method,
      }
    );

  // ── Contact ────────────────────────────────────────────────────────────────

  const contactReviewer = (
    reviewerId: string,
    body: { message: string },
    otherOptions: FetcherOptions = {}
  ) =>
    fetcher<ResponseData<null>>(
      buildRouteURL(
        backendURL,
        reviewerGroup,
        reviewerEndpoints.contactReviewer,
        { reviewerId }
      ),
      authAPIOptions,
      otherOptions,
      { method: reviewerEndpoints.contactReviewer.method, body }
    );

  // ── Missions ───────────────────────────────────────────────────────────────

  const estimateMission = (
    body: EstimateMissionBody,
    otherOptions: FetcherOptions = {}
  ) =>
    fetcher<ResponseData<MissionEstimate>>(
      buildRouteURL(
        backendURL,
        reviewerGroup,
        reviewerEndpoints.estimateMission
      ),
      authAPIOptions,
      otherOptions,
      { method: reviewerEndpoints.estimateMission.method, body }
    );

  const createMission = (
    body: CreateMissionBody,
    otherOptions: FetcherOptions = {}
  ) =>
    fetcher<ResponseData<TranslationMissionAPI>>(
      buildRouteURL(backendURL, reviewerGroup, reviewerEndpoints.createMission),
      authAPIOptions,
      otherOptions,
      { method: reviewerEndpoints.createMission.method, body }
    );

  const getMyMissions = (
    params: {
      role?: 'client' | 'reviewer';
      page?: number;
      pageSize?: number;
    } = {},
    otherOptions: FetcherOptions = {}
  ) => {
    const query = new URLSearchParams(
      Object.fromEntries(
        Object.entries(params)
          .filter(([, v]) => v !== undefined)
          .map(([k, v]) => [k, String(v)])
      )
    ).toString();
    return fetcher<PaginatedResponse<TranslationMissionAPI>>(
      `${buildRouteURL(backendURL, reviewerGroup, reviewerEndpoints.getMyMissions)}${query ? `?${query}` : ''}`,
      authAPIOptions,
      otherOptions,
      { method: 'GET' }
    );
  };

  const getMissionById = (
    missionId: string,
    otherOptions: FetcherOptions = {}
  ) =>
    fetcher<ResponseData<TranslationMissionAPI>>(
      buildRouteURL(
        backendURL,
        reviewerGroup,
        reviewerEndpoints.getMissionById,
        { missionId }
      ),
      authAPIOptions,
      otherOptions,
      { method: reviewerEndpoints.getMissionById.method }
    );

  const updateMissionStatus = (
    missionId: string,
    body: UpdateMissionStatusBody,
    otherOptions: FetcherOptions = {}
  ) =>
    fetcher<ResponseData<TranslationMissionAPI>>(
      buildRouteURL(
        backendURL,
        reviewerGroup,
        reviewerEndpoints.updateMissionStatus,
        { missionId }
      ),
      authAPIOptions,
      otherOptions,
      { method: reviewerEndpoints.updateMissionStatus.method, body }
    );

  // ── Reviews ────────────────────────────────────────────────────────────────

  const submitReview = (
    missionId: string,
    body: SubmitReviewBody,
    otherOptions: FetcherOptions = {}
  ) =>
    fetcher<ResponseData<ReviewerReviewAPI>>(
      buildRouteURL(backendURL, reviewerGroup, reviewerEndpoints.submitReview, {
        missionId,
      }),
      authAPIOptions,
      otherOptions,
      { method: reviewerEndpoints.submitReview.method, body }
    );

  // ── Chat ───────────────────────────────────────────────────────────────────

  const getChatHistory = (
    missionId: string,
    otherOptions: FetcherOptions = {}
  ) =>
    fetcher<ResponseData<ReviewerMessageAPI[]>>(
      buildRouteURL(
        backendURL,
        reviewerGroup,
        reviewerEndpoints.getChatHistory,
        { missionId }
      ),
      authAPIOptions,
      otherOptions,
      { method: reviewerEndpoints.getChatHistory.method }
    );

  const sendMessage = (
    missionId: string,
    body: SendMessageBody,
    otherOptions: FetcherOptions = {}
  ) =>
    fetcher<ResponseData<ReviewerMessageAPI>>(
      buildRouteURL(backendURL, reviewerGroup, reviewerEndpoints.sendMessage, {
        missionId,
      }),
      authAPIOptions,
      otherOptions,
      { method: reviewerEndpoints.sendMessage.method, body }
    );

  const getChatStreamUrl = (missionId: string) =>
    buildRouteURL(backendURL, reviewerGroup, reviewerEndpoints.chatSSE, {
      missionId,
    });

  // ── Picture uploads ────────────────────────────────────────────────────────

  const uploadPicture = async (
    kind: 'main' | 'cover',
    file: File,
    otherOptions: FetcherOptions = {}
  ): Promise<UploadReviewerPictureResult> => {
    const buffer = await file.arrayBuffer();

    const baseHeaders: Record<string, string> = {
      'Content-Type': file.type || 'image/jpeg',
    };

    const authHeaders =
      (authAPIOptions.headers as Record<string, string> | undefined) ?? {};

    const endpoint =
      kind === 'main'
        ? reviewerEndpoints.uploadMainPicture
        : reviewerEndpoints.uploadCoverPicture;
    const response = await fetch(
      buildRouteURL(backendURL, reviewerGroup, endpoint),
      {
        method: endpoint.method,
        credentials: 'include',
        headers: { ...authHeaders, ...baseHeaders },
        body: buffer,
        signal: otherOptions.signal as AbortSignal | undefined,
      }
    );

    if (!response.ok) {
      const result = await response.json();
      throw new Error(JSON.stringify(result.error) ?? 'Picture upload failed');
    }

    return (await response.json()) as UploadReviewerPictureResult;
  };

  const uploadMainPicture = (file: File, otherOptions: FetcherOptions = {}) =>
    uploadPicture('main', file, otherOptions);

  const uploadCoverPicture = (file: File, otherOptions: FetcherOptions = {}) =>
    uploadPicture('cover', file, otherOptions);

  // ── Admin ──────────────────────────────────────────────────────────────────

  const validateReviewerProfile = (
    reviewerId: string,
    otherOptions: FetcherOptions = {}
  ) =>
    fetcher<ResponseData<ReviewerProfileAPI>>(
      buildRouteURL(
        backendURL,
        reviewerGroup,
        reviewerEndpoints.validateReviewerProfile,
        { reviewerId }
      ),
      authAPIOptions,
      otherOptions,
      { method: reviewerEndpoints.validateReviewerProfile.method }
    );

  const getAdminReviewers = (
    params: { page?: number; pageSize?: number; status?: string } = {},
    otherOptions: FetcherOptions = {}
  ) => {
    const query = new URLSearchParams(
      Object.fromEntries(
        Object.entries(params)
          .filter(([, v]) => v !== undefined)
          .map(([k, v]) => [k, String(v)])
      )
    ).toString();
    return fetcher<PaginatedResponse<ReviewerProfileAPI>>(
      `${buildRouteURL(backendURL, reviewerGroup, reviewerEndpoints.getAdminReviewers)}${query ? `?${query}` : ''}`,
      authAPIOptions,
      otherOptions,
      { method: 'GET' }
    );
  };

  return {
    getMarketplace,
    getPriceDistribution,
    getReviewerById,
    getReviewerReviews,
    getMyReviewerProfile,
    registerAsReviewer,
    updateReviewerProfile,
    deleteReviewerProfile,
    estimateMission,
    createMission,
    getMyMissions,
    getMissionById,
    updateMissionStatus,
    submitReview,
    contactReviewer,
    getChatHistory,
    sendMessage,
    getChatStreamUrl,
    uploadMainPicture,
    uploadCoverPicture,
    validateReviewerProfile,
    getAdminReviewers,
  };
};

/**
 * Authenticated `reviewer` endpoint bound to an Intlayer CMS authenticator.
 *
 * Pass an authenticator created with `createIntlayerCMS`, or omit it to use
 * the build-time configuration (`@intlayer/config/built`).
 */
export const reviewerEndpoint = createEndpoint(getReviewerAPI);
