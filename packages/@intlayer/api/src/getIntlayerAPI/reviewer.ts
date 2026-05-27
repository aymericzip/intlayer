import type {
  CreateMissionBody,
  EstimateMissionBody,
  GetMarketplaceQuery,
  MissionEstimate,
  PaginatedResponse,
  PriceDistributionData,
  RegisterReviewerBody,
  ResponseData,
  ReviewerMessageAPI,
  ReviewerProfileAPI,
  ReviewerReviewAPI,
  SendMessageBody,
  SubmitReviewBody,
  TranslationMissionAPI,
  UpdateMissionStatusBody,
  UpdateReviewerBody,
  UploadReviewerPictureResult,
} from '@intlayer/backend';
import config from '@intlayer/config/built';
import type { IntlayerConfig } from '@intlayer/types/config';
import { type FetcherOptions, fetcher } from '../fetcher';

export const getReviewerAPI = (
  authAPIOptions: FetcherOptions = {},
  intlayerConfig?: IntlayerConfig
) => {
  const backendURL =
    intlayerConfig?.editor?.backendURL ?? config.editor.backendURL;
  const BASE = `${backendURL}/api/reviewer`;

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
      `${BASE}/marketplace${query ? `?${query}` : ''}`,
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
      `${BASE}/marketplace/price-distribution${query ? `?${query}` : ''}`,
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
      `${BASE}/${reviewerId}`,
      authAPIOptions,
      otherOptions,
      { method: 'GET' }
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
      `${BASE}/${reviewerId}/reviews${query ? `?${query}` : ''}`,
      authAPIOptions,
      otherOptions,
      { method: 'GET' }
    );
  };

  // ── My profile ─────────────────────────────────────────────────────────────

  const getMyReviewerProfile = (otherOptions: FetcherOptions = {}) =>
    fetcher<ResponseData<ReviewerProfileAPI | null>>(
      `${BASE}/me`,
      authAPIOptions,
      otherOptions,
      { method: 'GET' }
    );

  const registerAsReviewer = (
    body: RegisterReviewerBody,
    otherOptions: FetcherOptions = {}
  ) =>
    fetcher<ResponseData<ReviewerProfileAPI>>(
      `${BASE}/register`,
      authAPIOptions,
      otherOptions,
      { method: 'POST', body }
    );

  const updateReviewerProfile = (
    body: UpdateReviewerBody,
    otherOptions: FetcherOptions = {}
  ) =>
    fetcher<ResponseData<ReviewerProfileAPI>>(
      `${BASE}/`,
      authAPIOptions,
      otherOptions,
      { method: 'PUT', body }
    );

  const deleteReviewerProfile = (otherOptions: FetcherOptions = {}) =>
    fetcher<ResponseData<null>>(BASE, authAPIOptions, otherOptions, {
      method: 'DELETE',
    });

  // ── Contact ────────────────────────────────────────────────────────────────

  const contactReviewer = (
    reviewerId: string,
    body: { message: string },
    otherOptions: FetcherOptions = {}
  ) =>
    fetcher<ResponseData<null>>(
      `${BASE}/${reviewerId}/contact`,
      authAPIOptions,
      otherOptions,
      { method: 'POST', body }
    );

  // ── Missions ───────────────────────────────────────────────────────────────

  const estimateMission = (
    body: EstimateMissionBody,
    otherOptions: FetcherOptions = {}
  ) =>
    fetcher<ResponseData<MissionEstimate>>(
      `${BASE}/mission/estimate`,
      authAPIOptions,
      otherOptions,
      { method: 'POST', body }
    );

  const createMission = (
    body: CreateMissionBody,
    otherOptions: FetcherOptions = {}
  ) =>
    fetcher<ResponseData<TranslationMissionAPI>>(
      `${BASE}/mission`,
      authAPIOptions,
      otherOptions,
      { method: 'POST', body }
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
      `${BASE}/mission${query ? `?${query}` : ''}`,
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
      `${BASE}/mission/${missionId}`,
      authAPIOptions,
      otherOptions,
      { method: 'GET' }
    );

  const updateMissionStatus = (
    missionId: string,
    body: UpdateMissionStatusBody,
    otherOptions: FetcherOptions = {}
  ) =>
    fetcher<ResponseData<TranslationMissionAPI>>(
      `${BASE}/mission/${missionId}/status`,
      authAPIOptions,
      otherOptions,
      { method: 'PUT', body }
    );

  // ── Reviews ────────────────────────────────────────────────────────────────

  const submitReview = (
    missionId: string,
    body: SubmitReviewBody,
    otherOptions: FetcherOptions = {}
  ) =>
    fetcher<ResponseData<ReviewerReviewAPI>>(
      `${BASE}/mission/${missionId}/review`,
      authAPIOptions,
      otherOptions,
      { method: 'POST', body }
    );

  // ── Chat ───────────────────────────────────────────────────────────────────

  const getChatHistory = (
    missionId: string,
    otherOptions: FetcherOptions = {}
  ) =>
    fetcher<ResponseData<ReviewerMessageAPI[]>>(
      `${BASE}/mission/${missionId}/chat/history`,
      authAPIOptions,
      otherOptions,
      { method: 'GET' }
    );

  const sendMessage = (
    missionId: string,
    body: SendMessageBody,
    otherOptions: FetcherOptions = {}
  ) =>
    fetcher<ResponseData<ReviewerMessageAPI>>(
      `${BASE}/mission/${missionId}/chat`,
      authAPIOptions,
      otherOptions,
      { method: 'POST', body }
    );

  const getChatStreamUrl = (missionId: string) =>
    `${BASE}/mission/${missionId}/chat/stream`;

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

    const response = await fetch(`${BASE}/me/picture/${kind}`, {
      method: 'POST',
      credentials: 'include',
      headers: { ...authHeaders, ...baseHeaders },
      body: buffer,
      signal: otherOptions.signal as AbortSignal | undefined,
    });

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
      `${BASE}/${reviewerId}/validate`,
      authAPIOptions,
      otherOptions,
      { method: 'PUT' }
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
      `${BASE}/admin/reviewers${query ? `?${query}` : ''}`,
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
