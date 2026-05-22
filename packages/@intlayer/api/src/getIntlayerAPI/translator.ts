import type {
  CreateMissionBody,
  EstimateMissionBody,
  GetMarketplaceQuery,
  MissionEstimate,
  PaginatedResponse,
  RegisterTranslatorBody,
  ResponseData,
  SendMessageBody,
  SubmitReviewBody,
  TranslationMissionAPI,
  TranslatorMessageAPI,
  TranslatorProfileAPI,
  TranslatorReviewAPI,
  UpdateMissionStatusBody,
  UpdateTranslatorBody,
  UploadTranslatorPictureResult,
} from '@intlayer/backend';
import config from '@intlayer/config/built';
import type { IntlayerConfig } from '@intlayer/types/config';
import { type FetcherOptions, fetcher } from '../fetcher';

export const getTranslatorAPI = (
  authAPIOptions: FetcherOptions = {},
  intlayerConfig: IntlayerConfig = config
) => {
  const backendURL = intlayerConfig.editor.backendURL;
  const BASE = `${backendURL}/api/translator`;

  // ── Marketplace ────────────────────────────────────────────────────────────

  const getMarketplace = (
    params: GetMarketplaceQuery = {},
    otherOptions: FetcherOptions = {}
  ) => {
    const query = new URLSearchParams(
      Object.fromEntries(
        Object.entries(params)
          .filter(([, v]) => v !== undefined)
          .map(([k, v]) => [k, String(v)])
      )
    ).toString();
    return fetcher<PaginatedResponse<TranslatorProfileAPI>>(
      `${BASE}/marketplace${query ? `?${query}` : ''}`,
      authAPIOptions,
      otherOptions,
      { method: 'GET' }
    );
  };

  const getTranslatorById = (
    translatorId: string,
    otherOptions: FetcherOptions = {}
  ) =>
    fetcher<ResponseData<TranslatorProfileAPI>>(
      `${BASE}/${translatorId}`,
      authAPIOptions,
      otherOptions,
      { method: 'GET' }
    );

  const getTranslatorReviews = (
    translatorId: string,
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
    return fetcher<PaginatedResponse<TranslatorReviewAPI>>(
      `${BASE}/${translatorId}/reviews${query ? `?${query}` : ''}`,
      authAPIOptions,
      otherOptions,
      { method: 'GET' }
    );
  };

  // ── My profile ─────────────────────────────────────────────────────────────

  const getMyTranslatorProfile = (otherOptions: FetcherOptions = {}) =>
    fetcher<ResponseData<TranslatorProfileAPI | null>>(
      `${BASE}/me`,
      authAPIOptions,
      otherOptions,
      { method: 'GET' }
    );

  const registerAsTranslator = (
    body: RegisterTranslatorBody,
    otherOptions: FetcherOptions = {}
  ) =>
    fetcher<ResponseData<TranslatorProfileAPI>>(
      `${BASE}/register`,
      authAPIOptions,
      otherOptions,
      { method: 'POST', body }
    );

  const updateTranslatorProfile = (
    body: UpdateTranslatorBody,
    otherOptions: FetcherOptions = {}
  ) =>
    fetcher<ResponseData<TranslatorProfileAPI>>(
      `${BASE}/`,
      authAPIOptions,
      otherOptions,
      { method: 'PUT', body }
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
      role?: 'client' | 'translator';
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
    fetcher<ResponseData<TranslatorReviewAPI>>(
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
    fetcher<ResponseData<TranslatorMessageAPI[]>>(
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
    fetcher<ResponseData<TranslatorMessageAPI>>(
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
  ): Promise<UploadTranslatorPictureResult> => {
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

    return (await response.json()) as UploadTranslatorPictureResult;
  };

  const uploadMainPicture = (file: File, otherOptions: FetcherOptions = {}) =>
    uploadPicture('main', file, otherOptions);

  const uploadCoverPicture = (file: File, otherOptions: FetcherOptions = {}) =>
    uploadPicture('cover', file, otherOptions);

  return {
    getMarketplace,
    getTranslatorById,
    getTranslatorReviews,
    getMyTranslatorProfile,
    registerAsTranslator,
    updateTranslatorProfile,
    estimateMission,
    createMission,
    getMyMissions,
    getMissionById,
    updateMissionStatus,
    submitReview,
    getChatHistory,
    sendMessage,
    getChatStreamUrl,
    uploadMainPicture,
    uploadCoverPicture,
  };
};
