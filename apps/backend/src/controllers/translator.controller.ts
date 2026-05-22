import { logger } from '@logger';
import { sendEmail } from '@services/email.service';
import {
  deleteTranslatorPicture,
  type TranslatorPictureKind,
  uploadTranslatorPicture,
  validateTranslatorPictureUpload,
} from '@services/translator/pictureUpload.service';
import * as translatorService from '@services/translator.service';
import * as messageService from '@services/translatorMessage.service';
import * as missionService from '@services/translatorMission.service';
import * as userService from '@services/user.service';
import { ErrorHandler } from '@utils/errors';
import {
  formatPaginatedResponse,
  formatResponse,
  type ResponseData,
} from '@utils/responseData';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { t } from 'fastify-intlayer';
import type {
  MissionEstimate,
  MissionStatus,
  TranslationMissionAPI,
  TranslatorMessageAPI,
  TranslatorProfileAPI,
  TranslatorReviewAPI,
} from '@/types/translator.types';

// ── Helpers ──────────────────────────────────────────────────────────────────

const toProfileAPI = (doc: any): TranslatorProfileAPI => doc.toJSON();
const toMissionAPI = (doc: any): TranslationMissionAPI => doc.toJSON();
const toReviewAPI = (doc: any): TranslatorReviewAPI => doc.toJSON();
const toMessageAPI = (doc: any): TranslatorMessageAPI => doc.toJSON();

// ── Marketplace / Profile ────────────────────────────────────────────────────

export type GetMarketplaceQuery = {
  page?: number;
  pageSize?: number;
  fromLocale?: string;
  toLocale?: string;
  minRating?: number;
  maxPricePerHour?: number;
  minPricePerHour?: number;
};

export const getMarketplace = async (
  request: FastifyRequest<{ Querystring: GetMarketplaceQuery }>,
  reply: FastifyReply
): Promise<void> => {
  const {
    page = 1,
    pageSize = 20,
    fromLocale,
    toLocale,
    minRating,
    maxPricePerHour,
    minPricePerHour,
  } = request.query;

  const query: Record<string, any> = {};

  if (fromLocale || toLocale) {
    const pairFilter: Record<string, any> = {};
    if (fromLocale) pairFilter.from = fromLocale;
    if (toLocale) pairFilter.to = toLocale;
    query.languagePairs = { $elemMatch: pairFilter };
  }

  if (minRating !== undefined)
    query.averageRating = { $gte: Number(minRating) };

  if (minPricePerHour !== undefined || maxPricePerHour !== undefined) {
    query.pricePerHour = {};
    if (minPricePerHour !== undefined)
      query.pricePerHour.$gte = Number(minPricePerHour);
    if (maxPricePerHour !== undefined)
      query.pricePerHour.$lte = Number(maxPricePerHour);
  }

  const skip = (Number(page) - 1) * Number(pageSize);
  const [profiles, total] = await Promise.all([
    translatorService.findTranslatorProfiles(query, skip, Number(pageSize)),
    translatorService.countTranslatorProfiles(query),
  ]);

  const totalPages = Math.ceil(total / Number(pageSize));

  return reply.send(
    formatPaginatedResponse<TranslatorProfileAPI>({
      data: profiles.map(toProfileAPI),
      page: Number(page),
      pageSize: Number(pageSize),
      totalPages,
      totalItems: total,
      message: t({
        en: 'Translator profiles fetched',
        fr: 'Profils récupérés',
        es: 'Perfiles obtenidos',
        de: 'Profile abgerufen',
        ar: 'تم جلب الملفات الشخصية',
        'en-GB': 'Translator profiles fetched',
        ru: 'Профили получены',
        ja: 'プロフィールを取得しました',
        ko: '프로필을 가져왔습니다',
        zh: '已获取翻译员资料',
        it: 'Profili recuperati',
        pt: 'Perfis obtidos',
        hi: 'प्रोफाइल प्राप्त की गई',
        tr: 'Profiller getirildi',
        pl: 'Profile pobrane',
        id: 'Profil diambil',
        vi: 'Đã lấy hồ sơ',
        uk: 'Профілі отримано',
      }),
    })
  );
};

export const getTranslatorById = async (
  request: FastifyRequest<{ Params: { translatorId: string } }>,
  reply: FastifyReply
): Promise<void> => {
  const { translatorId } = request.params;
  const profile = await translatorService.findTranslatorById(translatorId);

  if (!profile) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'TRANSLATOR_PROFILE_NOT_FOUND'
    );
  }

  return reply.send(
    formatResponse<TranslatorProfileAPI>({
      data: toProfileAPI(profile),
      message: t({
        en: 'Translator profile fetched',
        fr: 'Profil récupéré',
        es: 'Perfil obtenido',
        de: 'Profil abgerufen',
        ar: 'تم جلب الملف الشخصي',
        'en-GB': 'Translator profile fetched',
        ru: 'Профиль получен',
        ja: 'プロフィールを取得しました',
        ko: '프로필을 가져왔습니다',
        zh: '已获取翻译员资料',
        it: 'Profilo recuperato',
        pt: 'Perfil obtido',
        hi: 'प्रोफाइल प्राप्त की गई',
        tr: 'Profil getirildi',
        pl: 'Profil pobrany',
        id: 'Profil diambil',
        vi: 'Đã lấy hồ sơ',
        uk: 'Профіль отримано',
      }),
    })
  );
};

export type RegisterTranslatorBody = {
  bio?: string;
  languagePairs: { from: string; to: string }[];
  pricePerHour: number;
};

export const registerAsTranslator = async (
  request: FastifyRequest<{ Body: RegisterTranslatorBody }>,
  reply: FastifyReply
): Promise<void> => {
  const user = request.session?.user;
  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }

  const existing = await translatorService.findTranslatorByUserId(
    String(user.id)
  );
  if (existing) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'TRANSLATOR_PROFILE_ALREADY_EXISTS'
    );
  }

  const { bio, languagePairs, pricePerHour } = request.body;

  const profile = await translatorService.createTranslatorProfile({
    userId: user.id as any,
    bio,
    languagePairs: languagePairs ?? [],
    pricePerHour: pricePerHour ?? 0,
  });

  // Notify the Intlayer team that a new translator has applied
  await sendEmail({
    type: 'translatorApplication',
    to: 'contact@intlayer.org',
    username: user.name ?? user.email,
    userEmail: user.email,
    profileLink: `${process.env.APP_URL}/dashboard/translator/${String(profile.id)}`,
  }).catch((err) =>
    logger.error('Failed to send translator application email', err)
  );

  return reply.status(201).send(
    formatResponse<TranslatorProfileAPI>({
      data: toProfileAPI(profile),
      message: t({
        en: 'Registered as translator',
        fr: 'Enregistré comme traducteur',
        es: 'Registrado como traductor',
        de: 'Als Übersetzer registriert',
        ar: 'تم التسجيل كمترجم',
        'en-GB': 'Registered as translator',
        ru: 'Зарегистрирован как переводчик',
        ja: '翻訳者として登録されました',
        ko: '번역가로 등록되었습니다',
        zh: '已注册为翻译员',
        it: 'Registrato come traduttore',
        pt: 'Registado como tradutor',
        hi: 'अनुवादक के रूप में पंजीकृत',
        tr: 'Çevirmen olarak kaydedildi',
        pl: 'Zarejestrowany jako tłumacz',
        id: 'Terdaftar sebagai penerjemah',
        vi: 'Đã đăng ký là dịch giả',
        uk: 'Зареєстровано як перекладач',
      }),
    })
  );
};

export type UpdateTranslatorBody = Partial<RegisterTranslatorBody> & {
  coverPicture?: string;
};

export const updateTranslatorProfile = async (
  request: FastifyRequest<{ Body: UpdateTranslatorBody }>,
  reply: FastifyReply
): Promise<void> => {
  const user = request.session?.user;
  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }

  const profile = await translatorService.findTranslatorByUserId(
    String(user.id)
  );
  if (!profile) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'TRANSLATOR_PROFILE_NOT_FOUND'
    );
  }

  const updated = await translatorService.updateTranslatorProfile(
    String(profile.id),
    request.body
  );

  return reply.send(
    formatResponse<TranslatorProfileAPI>({
      data: toProfileAPI(updated),
      message: t({
        en: 'Profile updated',
        fr: 'Profil mis à jour',
        es: 'Perfil actualizado',
        de: 'Profil aktualisiert',
        ar: 'تم تحديث الملف الشخصي',
        'en-GB': 'Profile updated',
        ru: 'Профиль обновлён',
        ja: 'プロフィールを更新しました',
        ko: '프로필이 업데이트되었습니다',
        zh: '资料已更新',
        it: 'Profilo aggiornato',
        pt: 'Perfil atualizado',
        hi: 'प्रोफाइल अपडेट की गई',
        tr: 'Profil güncellendi',
        pl: 'Profil zaktualizowany',
        id: 'Profil diperbarui',
        vi: 'Hồ sơ đã được cập nhật',
        uk: 'Профіль оновлено',
      }),
    })
  );
};

export const getMyTranslatorProfile = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const user = request.session?.user;
  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }

  const profile = await translatorService.findTranslatorByUserId(
    String(user.id)
  );

  return reply.send(
    formatResponse<TranslatorProfileAPI | null>({
      data: profile ? toProfileAPI(profile) : null,
    })
  );
};

// ── Admin: validate translator profile ────────────────────────────────────────

export const validateTranslatorProfile = async (
  request: FastifyRequest<{ Params: { translatorId: string } }>,
  reply: FastifyReply
): Promise<void> => {
  const sessionUser = request.session?.user;
  if (!sessionUser || sessionUser.role !== 'admin') {
    return ErrorHandler.handleGenericErrorResponse(reply, 'PERMISSION_DENIED');
  }

  const { translatorId } = request.params;

  const profile = await translatorService.findTranslatorById(translatorId);
  if (!profile) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'TRANSLATOR_PROFILE_NOT_FOUND'
    );
  }

  if (profile.status === 'active') {
    // Already active — still return 200 so the admin can be idempotent
    return reply.send(
      formatResponse<TranslatorProfileAPI>({
        data: toProfileAPI(profile),
        message: t({
          en: 'Translator profile is already active',
          fr: 'Le profil du traducteur est déjà actif',
          es: 'El perfil del traductor ya está activo',
          de: 'Das Übersetzer-Profil ist bereits aktiv',
          ar: 'ملف المترجم نشط بالفعل',
          'en-GB': 'Translator profile is already active',
          ru: 'Профиль переводчика уже активен',
          ja: '翻訳者プロフィールはすでにアクティブです',
          ko: '번역가 프로필이 이미 활성화되어 있습니다',
          zh: '译者档案已激活',
          it: 'Il profilo del traduttore è già attivo',
          pt: 'O perfil do tradutor já está ativo',
          hi: 'अनुवादक प्रोफ़ाइल पहले से सक्रिय है',
          tr: 'Çevirmen profili zaten aktif',
          pl: 'Profil tłumacza jest już aktywny',
          id: 'Profil penerjemah sudah aktif',
          vi: 'Hồ sơ dịch giả đã được kích hoạt',
          uk: 'Профіль перекладача вже активний',
        }),
      })
    );
  }

  const updated = await translatorService.updateTranslatorProfile(
    translatorId,
    { status: 'active' }
  );

  // Fetch the linked user to send the approval email
  const linkedUser = await userService.getUserById(String(profile.userId));
  if (linkedUser) {
    await sendEmail({
      type: 'translatorApproved',
      to: linkedUser.email,
      locale: (linkedUser as any).locale,
      username: linkedUser.name ?? linkedUser.email,
      dashboardLink: `${process.env.APP_URL}/dashboard/translator`,
    }).catch((err) =>
      logger.error('Failed to send translator approved email', err)
    );
  }

  logger.info(
    `Translator profile ${translatorId} validated by admin ${String(sessionUser.id)}`
  );

  return reply.send(
    formatResponse<TranslatorProfileAPI>({
      data: toProfileAPI(updated),
      message: t({
        en: 'Translator profile validated',
        fr: 'Profil traducteur validé',
        es: 'Perfil del traductor validado',
        de: 'Übersetzer-Profil validiert',
        ar: 'تم التحقق من ملف المترجم',
        'en-GB': 'Translator profile validated',
        ru: 'Профиль переводчика подтверждён',
        ja: '翻訳者プロフィールを承認しました',
        ko: '번역가 프로필이 승인되었습니다',
        zh: '译者档案已验证',
        it: 'Profilo traduttore validato',
        pt: 'Perfil do tradutor validado',
        hi: 'अनुवादक प्रोफ़ाइल सत्यापित',
        tr: 'Çevirmen profili doğrulandı',
        pl: 'Profil tłumacza zwalidowany',
        id: 'Profil penerjemah divalidasi',
        vi: 'Hồ sơ dịch giả đã được xác nhận',
        uk: 'Профіль перекладача підтверджено',
      }),
    })
  );
};

// ── Picture upload ────────────────────────────────────────────────────────────

export type UploadTranslatorPictureResult = ResponseData<TranslatorProfileAPI>;

const uploadTranslatorPictureHandler =
  (kind: TranslatorPictureKind) =>
  async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const user = request.session?.user;
    if (!user) {
      return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
    }

    const profile = await translatorService.findTranslatorByUserId(
      String(user.id)
    );
    if (!profile) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'TRANSLATOR_PROFILE_NOT_FOUND'
      );
    }

    const rawContentType = request.headers['content-type'] ?? '';
    const contentType = rawContentType.split(';')[0].trim() || 'image/jpeg';
    const contentLength = Number(request.headers['content-length'] ?? 0);

    const validationError = validateTranslatorPictureUpload(
      contentType,
      contentLength
    );
    if (validationError) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'USER_INVALID_FIELDS'
      );
    }

    const buffer = request.body;
    if (!Buffer.isBuffer(buffer) || buffer.length === 0) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'USER_INVALID_FIELDS'
      );
    }

    const field = kind === 'main' ? 'mainPicture' : 'coverPicture';
    const existing = (profile as any)[field] as string | undefined;
    if (existing) {
      await deleteTranslatorPicture(existing).catch(() => {});
    }

    const imageUrl = await uploadTranslatorPicture(
      buffer,
      String(profile.id),
      kind,
      contentType
    );

    const updated = await translatorService.updateTranslatorProfile(
      String(profile.id),
      {
        [field]: imageUrl,
      }
    );

    logger.info(
      `Translator ${kind} picture uploaded for profile ${String(profile.id)}`
    );

    return reply.send(
      formatResponse<TranslatorProfileAPI>({
        data: toProfileAPI(updated),
        message: t({
          en: 'Picture uploaded',
          fr: 'Image mise à jour',
          es: 'Imagen subida',
          de: 'Bild hochgeladen',
          ar: 'تم رفع الصورة',
          'en-GB': 'Picture uploaded',
          ru: 'Изображение загружено',
          ja: '画像をアップロードしました',
          ko: '이미지가 업로드되었습니다',
          zh: '图片已上传',
          it: 'Immagine caricata',
          pt: 'Imagem enviada',
          hi: 'चित्र अपलोड किया गया',
          tr: 'Resim yüklendi',
          pl: 'Zdjęcie przesłane',
          id: 'Gambar diunggah',
          vi: 'Ảnh đã được tải lên',
          uk: 'Зображення завантажено',
        }),
      })
    );
  };

export const uploadTranslatorMainPicture =
  uploadTranslatorPictureHandler('main');
export const uploadTranslatorCoverPicture =
  uploadTranslatorPictureHandler('cover');

// ── Reviews ──────────────────────────────────────────────────────────────────

export const getTranslatorReviews = async (
  request: FastifyRequest<{
    Params: { translatorId: string };
    Querystring: { page?: number; pageSize?: number };
  }>,
  reply: FastifyReply
): Promise<void> => {
  const { translatorId } = request.params;
  const { page = 1, pageSize = 20 } = request.query;

  const skip = (Number(page) - 1) * Number(pageSize);
  const [reviews, total] = await Promise.all([
    translatorService.findReviewsByTranslatorId(
      translatorId,
      skip,
      Number(pageSize)
    ),
    translatorService.countReviewsByTranslatorId(translatorId),
  ]);

  return reply.send(
    formatPaginatedResponse<TranslatorReviewAPI>({
      data: reviews.map(toReviewAPI),
      page: Number(page),
      pageSize: Number(pageSize),
      totalPages: Math.ceil(total / Number(pageSize)),
      totalItems: total,
    })
  );
};

export type SubmitReviewBody = { rating: number; comment?: string };

export const submitReview = async (
  request: FastifyRequest<{
    Params: { missionId: string };
    Body: SubmitReviewBody;
  }>,
  reply: FastifyReply
): Promise<void> => {
  const user = request.session?.user;
  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }

  const mission = await missionService.findMissionById(
    request.params.missionId
  );
  if (!mission) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'TRANSLATOR_MISSION_NOT_FOUND'
    );
  }

  if (String(mission.clientUserId) !== String(user.id)) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'TRANSLATOR_MISSION_UNAUTHORIZED'
    );
  }

  if (mission.status !== 'completed') {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'TRANSLATOR_REVIEW_MISSION_NOT_COMPLETED'
    );
  }

  const existing = await translatorService.findReviewByMissionId(
    request.params.missionId
  );
  if (existing) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'TRANSLATOR_REVIEW_ALREADY_EXISTS'
    );
  }

  const review = await translatorService.createReview({
    missionId: mission.id,
    reviewerId: user.id as any,
    translatorId: mission.translatorId,
    rating: request.body.rating,
    comment: request.body.comment,
  });

  await translatorService.updateRating(
    String(mission.translatorId),
    request.body.rating
  );

  return reply.status(201).send(
    formatResponse<TranslatorReviewAPI>({
      data: toReviewAPI(review),
      message: t({
        en: 'Review submitted',
        fr: 'Avis soumis',
        es: 'Reseña enviada',
        de: 'Bewertung eingereicht',
        ar: 'تم تقديم المراجعة',
        'en-GB': 'Review submitted',
        ru: 'Отзыв отправлен',
        ja: 'レビューを送信しました',
        ko: '리뷰가 제출되었습니다',
        zh: '评价已提交',
        it: 'Recensione inviata',
        pt: 'Avaliação enviada',
        hi: 'समीक्षा सबमिट की गई',
        tr: 'İnceleme gönderildi',
        pl: 'Recenzja przesłana',
        id: 'Ulasan dikirim',
        vi: 'Đánh giá đã được gửi',
        uk: 'Відгук надіслано',
      }),
    })
  );
};

// ── Missions ─────────────────────────────────────────────────────────────────

export type EstimateMissionBody = {
  dictionaryIds: string[];
  sourceLocale: string;
  pricePerHour: number;
};

export const estimateMission = async (
  request: FastifyRequest<{ Body: EstimateMissionBody }>,
  reply: FastifyReply
): Promise<void> => {
  const { dictionaryIds, sourceLocale, pricePerHour } = request.body;

  const estimate = await missionService.calculateMissionEstimate(
    dictionaryIds,
    sourceLocale,
    pricePerHour
  );

  return reply.send(formatResponse<MissionEstimate>({ data: estimate }));
};

export type CreateMissionBody = {
  translatorId: string;
  dictionaryIds: string[];
  sourceLocale: string;
  targetLocales: string[];
  projectId?: string;
  notes?: string;
};

export const createMission = async (
  request: FastifyRequest<{ Body: CreateMissionBody }>,
  reply: FastifyReply
): Promise<void> => {
  const user = request.session?.user;
  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }

  const translator = await translatorService.findTranslatorById(
    request.body.translatorId
  );
  if (!translator) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'TRANSLATOR_PROFILE_NOT_FOUND'
    );
  }

  const estimate = await missionService.calculateMissionEstimate(
    request.body.dictionaryIds,
    request.body.sourceLocale,
    translator.pricePerHour
  );

  const mission = await missionService.createMission({
    translatorId: translator.id,
    clientUserId: user.id as any,
    projectId: request.body.projectId as any,
    dictionaryIds: request.body.dictionaryIds as any[],
    sourceLocale: request.body.sourceLocale,
    targetLocales: request.body.targetLocales,
    wordCount: estimate.wordCount,
    estimatedHours: estimate.estimatedHours,
    pricePerHour: translator.pricePerHour,
    totalPrice: estimate.totalPrice,
    currency: estimate.currency,
    notes: request.body.notes,
  });

  return reply.status(201).send(
    formatResponse<TranslationMissionAPI>({
      data: toMissionAPI(mission),
      message: t({
        en: 'Mission created',
        fr: 'Mission créée',
        es: 'Misión creada',
        de: 'Auftrag erstellt',
        ar: 'تم إنشاء المهمة',
        'en-GB': 'Mission created',
        ru: 'Задание создано',
        ja: 'ミッションが作成されました',
        ko: '미션이 생성되었습니다',
        zh: '任务已创建',
        it: 'Missione creata',
        pt: 'Missão criada',
        hi: 'मिशन बनाया गया',
        tr: 'Görev oluşturuldu',
        pl: 'Misja utworzona',
        id: 'Misi dibuat',
        vi: 'Nhiệm vụ đã được tạo',
        uk: 'Завдання створено',
      }),
    })
  );
};

export const getMyMissions = async (
  request: FastifyRequest<{
    Querystring: {
      role?: 'client' | 'translator';
      page?: number;
      pageSize?: number;
    };
  }>,
  reply: FastifyReply
): Promise<void> => {
  const user = request.session?.user;
  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }

  const { role = 'client', page = 1, pageSize = 20 } = request.query;
  const skip = (Number(page) - 1) * Number(pageSize);
  const userId = String(user.id);

  if (role === 'translator') {
    const profile = await translatorService.findTranslatorByUserId(userId);
    if (!profile) {
      return reply.send(
        formatPaginatedResponse<TranslationMissionAPI>({
          data: [],
          page: 1,
          pageSize: Number(pageSize),
          totalPages: 0,
          totalItems: 0,
        })
      );
    }
    const missions = await missionService.findMissionsForTranslatorProfile(
      String(profile.id),
      skip,
      Number(pageSize)
    );
    return reply.send(
      formatPaginatedResponse<TranslationMissionAPI>({
        data: missions.map(toMissionAPI),
        page: Number(page),
        pageSize: Number(pageSize),
        totalPages: 1,
        totalItems: missions.length,
      })
    );
  }

  const missions = await missionService.findMissionsForUser(
    userId,
    skip,
    Number(pageSize)
  );

  return reply.send(
    formatPaginatedResponse<TranslationMissionAPI>({
      data: missions.map(toMissionAPI),
      page: Number(page),
      pageSize: Number(pageSize),
      totalPages: 1,
      totalItems: missions.length,
    })
  );
};

export const getMissionById = async (
  request: FastifyRequest<{ Params: { missionId: string } }>,
  reply: FastifyReply
): Promise<void> => {
  const user = request.session?.user;
  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }

  const mission = await missionService.findMissionById(
    request.params.missionId
  );
  if (!mission) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'TRANSLATOR_MISSION_NOT_FOUND'
    );
  }

  const userId = String(user.id);
  const profile = await translatorService.findTranslatorByUserId(userId);
  const isClient = String(mission.clientUserId) === userId;
  const isTranslator =
    profile && String(mission.translatorId) === String(profile.id);

  if (!isClient && !isTranslator) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'TRANSLATOR_MISSION_UNAUTHORIZED'
    );
  }

  return reply.send(
    formatResponse<TranslationMissionAPI>({ data: toMissionAPI(mission) })
  );
};

export type UpdateMissionStatusBody = { status: MissionStatus };

export const updateMissionStatus = async (
  request: FastifyRequest<{
    Params: { missionId: string };
    Body: UpdateMissionStatusBody;
  }>,
  reply: FastifyReply
): Promise<void> => {
  const user = request.session?.user;
  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }

  const mission = await missionService.findMissionById(
    request.params.missionId
  );
  if (!mission) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'TRANSLATOR_MISSION_NOT_FOUND'
    );
  }

  const userId = String(user.id);
  const profile = await translatorService.findTranslatorByUserId(userId);
  const isClient = String(mission.clientUserId) === userId;
  const isTranslator =
    profile && String(mission.translatorId) === String(profile.id);

  if (!isClient && !isTranslator) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'TRANSLATOR_MISSION_UNAUTHORIZED'
    );
  }

  const newStatus = request.body.status;

  const updated = await missionService.updateMissionStatus(
    request.params.missionId,
    newStatus
  );

  if (newStatus === 'completed' && profile) {
    await translatorService.incrementMissionCount(String(profile.id));
  }

  return reply.send(
    formatResponse<TranslationMissionAPI>({
      data: toMissionAPI(updated),
      message: t({
        en: 'Mission status updated',
        fr: 'Statut de la mission mis à jour',
        es: 'Estado de la misión actualizado',
        de: 'Auftragsstatus aktualisiert',
        ar: 'تم تحديث حالة المهمة',
        'en-GB': 'Mission status updated',
        ru: 'Статус задания обновлён',
        ja: 'ミッションのステータスを更新しました',
        ko: '미션 상태가 업데이트되었습니다',
        zh: '任务状态已更新',
        it: 'Stato missione aggiornato',
        pt: 'Estado da missão atualizado',
        hi: 'मिशन स्थिति अपडेट की गई',
        tr: 'Görev durumu güncellendi',
        pl: 'Status misji zaktualizowany',
        id: 'Status misi diperbarui',
        vi: 'Trạng thái nhiệm vụ đã được cập nhật',
        uk: 'Статус завдання оновлено',
      }),
    })
  );
};

// ── Chat ─────────────────────────────────────────────────────────────────────

export const getChatHistory = async (
  request: FastifyRequest<{ Params: { missionId: string } }>,
  reply: FastifyReply
): Promise<void> => {
  const user = request.session?.user;
  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }

  const mission = await missionService.findMissionById(
    request.params.missionId
  );
  if (!mission) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'TRANSLATOR_MISSION_NOT_FOUND'
    );
  }

  const userId = String(user.id);
  const profile = await translatorService.findTranslatorByUserId(userId);
  const isClient = String(mission.clientUserId) === userId;
  const isTranslator =
    profile && String(mission.translatorId) === String(profile.id);

  if (!isClient && !isTranslator) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'TRANSLATOR_MISSION_UNAUTHORIZED'
    );
  }

  const messages = await messageService.findMessagesByMissionId(
    request.params.missionId
  );
  await messageService.markMessagesRead(request.params.missionId, userId);

  return reply.send(
    formatResponse<TranslatorMessageAPI[]>({ data: messages.map(toMessageAPI) })
  );
};

export type SendMessageBody = { content: string };

export const sendMessage = async (
  request: FastifyRequest<{
    Params: { missionId: string };
    Body: SendMessageBody;
  }>,
  reply: FastifyReply
): Promise<void> => {
  const user = request.session?.user;
  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }

  const mission = await missionService.findMissionById(
    request.params.missionId
  );
  if (!mission) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'TRANSLATOR_MISSION_NOT_FOUND'
    );
  }

  const userId = String(user.id);
  const profile = await translatorService.findTranslatorByUserId(userId);
  const isClient = String(mission.clientUserId) === userId;
  const isTranslator =
    profile && String(mission.translatorId) === String(profile.id);

  if (!isClient && !isTranslator) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'TRANSLATOR_MISSION_UNAUTHORIZED'
    );
  }

  const message = await messageService.createMessage(
    request.params.missionId,
    userId,
    request.body.content
  );

  return reply
    .status(201)
    .send(
      formatResponse<TranslatorMessageAPI>({ data: toMessageAPI(message) })
    );
};

export const chatSSE = async (
  request: FastifyRequest<{ Params: { missionId: string } }>,
  reply: FastifyReply
): Promise<void> => {
  const user = request.session?.user;
  if (!user) {
    reply.raw.statusCode = 401;
    reply.raw.end();
    return;
  }

  const mission = await missionService.findMissionById(
    request.params.missionId
  );
  if (!mission) {
    reply.raw.statusCode = 404;
    reply.raw.end();
    return;
  }

  const userId = String(user.id);
  const profile = await translatorService.findTranslatorByUserId(userId);
  const isClient = String(mission.clientUserId) === userId;
  const isTranslator =
    profile && String(mission.translatorId) === String(profile.id);

  if (!isClient && !isTranslator) {
    reply.raw.statusCode = 403;
    reply.raw.end();
    return;
  }

  reply.hijack();

  const headers = reply.getHeaders();
  Object.entries(headers).forEach(([key, value]) => {
    if (value !== undefined) reply.raw.setHeader(key, value as string);
  });

  reply.raw.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
  reply.raw.setHeader('Cache-Control', 'no-cache, no-transform');
  reply.raw.setHeader('Connection', 'keep-alive');
  reply.raw.setHeader('X-Accel-Buffering', 'no');
  reply.raw.flushHeaders?.();

  reply.raw.write(': connected\n\n');

  const send = (data: any) => {
    if (!reply.raw.writableEnded && !reply.raw.destroyed) {
      reply.raw.write(`data: ${JSON.stringify(data)}\n\n`);
    }
  };

  let lastChecked = new Date();

  const interval = setInterval(async () => {
    try {
      const newMessages = await messageService.findNewMessagesSince(
        request.params.missionId,
        lastChecked
      );
      if (newMessages.length > 0) {
        lastChecked = new Date();
        for (const msg of newMessages) {
          send(toMessageAPI(msg));
        }
      }
    } catch (error) {
      logger.error('Error polling chat messages', error);
    }
  }, 2000);

  request.raw.on('close', () => {
    clearInterval(interval);
  });
};

// ── Payment stubs ─────────────────────────────────────────────────────────────

export const createPaymentIntent = async (
  _request: FastifyRequest<{ Params: { missionId: string } }>,
  reply: FastifyReply
): Promise<void> => {
  // TODO: create Stripe PaymentIntent for mission.totalPrice
  // Charge the client, hold funds in escrow until mission is completed
  return reply.send(formatResponse({ data: null, message: 'Not implemented' }));
};

export const confirmPayment = async (
  _request: FastifyRequest<{ Params: { missionId: string } }>,
  reply: FastifyReply
): Promise<void> => {
  // TODO: confirm Stripe payment and release funds to translator's Stripe account
  return reply.send(formatResponse({ data: null, message: 'Not implemented' }));
};

export const requestPayout = async (
  _request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  // TODO: trigger payout to translator's Stripe Connect account
  return reply.send(formatResponse({ data: null, message: 'Not implemented' }));
};
