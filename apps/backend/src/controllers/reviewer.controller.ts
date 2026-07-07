import { logger } from '@logger';
import { sendEmail } from '@services/email.service';
import {
  deleteReviewerPicture,
  type ReviewerPictureKind,
  uploadReviewerPicture,
  validateReviewerPictureUpload,
} from '@services/reviewer/pictureUpload.service';
import * as reviewerService from '@services/reviewer.service';
import * as messageService from '@services/reviewerMessage.service';
import * as missionService from '@services/reviewerMission.service';
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
  ReviewerCategory,
  ReviewerMessageAPI,
  ReviewerProfileAPI,
  ReviewerProfileDocument,
  ReviewerReviewAPI,
  TranslationMissionAPI,
} from '@/types/reviewer.types';

// ── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Maps a reviewer profile document to its API shape, attaching the public
 * name and avatar of the linked user when provided.
 */
const toProfileAPI = (
  doc: ReviewerProfileDocument,
  userInfo?: reviewerService.ReviewerUserInfo
): ReviewerProfileAPI => ({
  ...(doc.toJSON() as unknown as ReviewerProfileAPI),
  name: userInfo?.name,
  avatar: userInfo?.avatar,
});

/**
 * Maps reviewer profile documents to their API shape, resolving the public
 * user info (name, avatar) of each linked user in a single query.
 */
const toProfilesAPIWithUserInfo = async (
  profiles: ReviewerProfileDocument[]
): Promise<ReviewerProfileAPI[]> => {
  const userInfoMap = await reviewerService.getReviewerUserInfoMap(profiles);

  return profiles.map((profile) =>
    toProfileAPI(profile, userInfoMap.get(String(profile.userId)))
  );
};

/**
 * Maps a single reviewer profile document to its API shape, resolving the
 * public user info (name, avatar) of the linked user.
 */
const toProfileAPIWithUserInfo = async (
  profile: ReviewerProfileDocument
): Promise<ReviewerProfileAPI> => {
  const [profileAPI] = await toProfilesAPIWithUserInfo([profile]);
  return profileAPI ?? toProfileAPI(profile);
};

const toMissionAPI = (doc: any): TranslationMissionAPI => doc.toJSON();
const toReviewAPI = (doc: any): ReviewerReviewAPI => doc.toJSON();
const toMessageAPI = (doc: any): ReviewerMessageAPI => doc.toJSON();

// ── Marketplace / Profile ────────────────────────────────────────────────────

export type GetMarketplaceQuery = {
  page?: number;
  pageSize?: number;
  fromLocale?: string;
  toLocale?: string;
  minRating?: number;
  maxPricePerHour?: number;
  minPricePerHour?: number;
  categories?: string | string[];
};

export type PriceDistributionBucket = {
  min: number;
  max: number;
  count: number;
};

export type PriceDistributionData = {
  buckets: PriceDistributionBucket[];
  globalMin: number;
  globalMax: number;
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
    categories,
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

  if (categories) {
    const cats = Array.isArray(categories) ? categories : [categories];
    if (cats.length > 0) query.categories = { $in: cats };
  }

  const skip = (Number(page) - 1) * Number(pageSize);
  const [profiles, total] = await Promise.all([
    reviewerService.findReviewerProfiles(query, skip, Number(pageSize)),
    reviewerService.countReviewerProfiles(query),
  ]);

  const totalPages = Math.ceil(total / Number(pageSize));

  return reply.send(
    formatPaginatedResponse<ReviewerProfileAPI>({
      data: await toProfilesAPIWithUserInfo(profiles),
      page: Number(page),
      pageSize: Number(pageSize),
      totalPages,
      totalItems: total,
      message: t({
        en: 'Reviewer profiles fetched',
        fr: 'Profils récupérés',
        es: 'Perfiles obtenidos',
        de: 'Profile abgerufen',
        ar: 'تم جلب الملفات الشخصية',
        'en-GB': 'Reviewer profiles fetched',
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

export const getPriceDistribution = async (
  request: FastifyRequest<{
    Querystring: Pick<
      GetMarketplaceQuery,
      'fromLocale' | 'toLocale' | 'minRating' | 'categories'
    >;
  }>,
  reply: FastifyReply
): Promise<void> => {
  const { fromLocale, toLocale, minRating, categories } = request.query;

  const query: Record<string, any> = {};

  if (fromLocale || toLocale) {
    const pairFilter: Record<string, any> = {};
    if (fromLocale) pairFilter.from = fromLocale;
    if (toLocale) pairFilter.to = toLocale;
    query.languagePairs = { $elemMatch: pairFilter };
  }
  if (minRating !== undefined)
    query.averageRating = { $gte: Number(minRating) };
  if (categories) {
    const cats = Array.isArray(categories) ? categories : [categories];
    if (cats.length > 0) query.categories = { $in: cats };
  }

  try {
    const buckets = await reviewerService.getReviewerPriceDistribution(query);
    const globalMin = buckets.length > 0 ? buckets[0].min : 0;
    const globalMax =
      buckets.length > 0 ? buckets[buckets.length - 1].max : 500;

    return reply.send(
      formatResponse<PriceDistributionData>({
        data: { buckets, globalMin, globalMax },
        message: 'Price distribution fetched',
      })
    );
  } catch (_error) {
    return reply
      .status(500)
      .send({ error: 'Failed to fetch price distribution' });
  }
};

export const getReviewerById = async (
  request: FastifyRequest<{ Params: { reviewerId: string } }>,
  reply: FastifyReply
): Promise<void> => {
  const { reviewerId } = request.params;
  const profile = await reviewerService.findReviewerById(reviewerId);

  if (!profile) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'REVIEWER_PROFILE_NOT_FOUND'
    );
  }

  const profileAPI = await toProfileAPIWithUserInfo(profile);

  return reply.send(
    formatResponse<ReviewerProfileAPI>({
      data: profileAPI,
      message: t({
        en: 'Reviewer profile fetched',
        fr: 'Profil récupéré',
        es: 'Perfil obtenido',
        de: 'Profil abgerufen',
        ar: 'تم جلب الملف الشخصي',
        'en-GB': 'Reviewer profile fetched',
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

export type RegisterReviewerBody = {
  bio?: string;
  languagePairs: { from: string; to: string }[];
  categories?: ReviewerCategory[];
  pricePerHour: number;
  socialLinks?: { github?: string; linkedin?: string; portfolio?: string };
};

export const registerAsReviewer = async (
  request: FastifyRequest<{ Body: RegisterReviewerBody }>,
  reply: FastifyReply
): Promise<void> => {
  const user = request.session?.user;
  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }

  const existing = await reviewerService.findReviewerByUserId(String(user.id));
  if (existing) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'REVIEWER_PROFILE_ALREADY_EXISTS'
    );
  }

  const { bio, languagePairs, categories, pricePerHour, socialLinks } =
    request.body;

  const profile = await reviewerService.createReviewerProfile({
    userId: user.id as any,
    bio,
    languagePairs: languagePairs ?? [],
    categories: (categories ?? []) as any,
    pricePerHour: pricePerHour ?? 0,
    socialLinks,
  });

  // Notify the Intlayer team that a new reviewer has applied
  await sendEmail({
    type: 'reviewerApplication',
    to: 'contact@intlayer.org',
    username: user.name ?? user.email,
    userEmail: user.email,
    profileLink: `${process.env.APP_URL}/admin/reviewers/${String(profile.id)}`,
  }).catch((err) =>
    logger.error('Failed to send reviewer application email', err)
  );

  return reply.status(201).send(
    formatResponse<ReviewerProfileAPI>({
      data: toProfileAPI(profile, { name: user.name, avatar: user.image }),
      message: t({
        en: 'Registered as reviewer',
        fr: 'Enregistré comme traducteur',
        es: 'Registrado como traductor',
        de: 'Als Übersetzer registriert',
        ar: 'تم التسجيل كمترجم',
        'en-GB': 'Registered as reviewer',
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

export type UpdateReviewerBody = Partial<RegisterReviewerBody> & {
  isHidden?: boolean;
};

export const updateReviewerProfile = async (
  request: FastifyRequest<{ Body: UpdateReviewerBody }>,
  reply: FastifyReply
): Promise<void> => {
  const user = request.session?.user;
  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }

  const profile = await reviewerService.findReviewerByUserId(String(user.id));
  if (!profile) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'REVIEWER_PROFILE_NOT_FOUND'
    );
  }

  // Whitelist the updatable fields — status, ratings and mission counters
  // must never be settable by the reviewer themselves
  const {
    bio,
    languagePairs,
    categories,
    pricePerHour,
    socialLinks,
    isHidden,
  } = request.body;

  const updated = await reviewerService.updateReviewerProfile(
    String(profile.id),
    {
      ...(bio !== undefined && { bio }),
      ...(languagePairs !== undefined && { languagePairs }),
      ...(categories !== undefined && { categories }),
      ...(pricePerHour !== undefined && { pricePerHour }),
      ...(socialLinks !== undefined && { socialLinks }),
      ...(isHidden !== undefined && { isHidden }),
    }
  );

  if (!updated) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'REVIEWER_PROFILE_NOT_FOUND'
    );
  }

  return reply.send(
    formatResponse<ReviewerProfileAPI>({
      data: toProfileAPI(updated, { name: user.name, avatar: user.image }),
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

export const deleteMyReviewerProfile = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const user = request.session?.user;
  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }

  const profile = await reviewerService.findReviewerByUserId(String(user.id));
  if (!profile) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'REVIEWER_PROFILE_NOT_FOUND'
    );
  }

  await reviewerService.deleteReviewerProfile(String(profile.id));

  return reply.send(
    formatResponse<null>({
      data: null,
      message: t({
        en: 'Profile deleted',
        fr: 'Profil supprimé',
        es: 'Perfil eliminado',
        de: 'Profil gelöscht',
        ar: 'تم حذف الملف الشخصي',
        'en-GB': 'Profile deleted',
        ru: 'Профиль удалён',
        ja: 'プロフィールを削除しました',
        ko: '프로필이 삭제되었습니다',
        zh: '资料已删除',
        it: 'Profilo eliminato',
        pt: 'Perfil excluído',
        hi: 'प्रोफाइल हटाई गई',
        tr: 'Profil silindi',
        pl: 'Profil usunięty',
        id: 'Profil dihapus',
        vi: 'Hồ sơ đã được xóa',
        uk: 'Профіль видалено',
      }),
    })
  );
};

export const getMyReviewerProfile = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const user = request.session?.user;
  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }

  const profile = await reviewerService.findReviewerByUserId(String(user.id));

  return reply.send(
    formatResponse<ReviewerProfileAPI | null>({
      data: profile
        ? toProfileAPI(profile, { name: user.name, avatar: user.image })
        : null,
    })
  );
};

// ── Admin: list all reviewers ───────────────────────────────────────────────

export const getAdminReviewers = async (
  request: FastifyRequest<{
    Querystring: {
      page?: number;
      pageSize?: number;
      status?: string;
    };
  }>,
  reply: FastifyReply
): Promise<void> => {
  const sessionUser = request.session?.user;
  if (sessionUser?.role !== 'admin') {
    return ErrorHandler.handleGenericErrorResponse(reply, 'PERMISSION_DENIED');
  }

  const { page = 1, pageSize = 20, status } = request.query;
  const query: Record<string, any> = {};
  if (status) query.status = status;

  const skip = (Number(page) - 1) * Number(pageSize);
  const [profiles, total] = await Promise.all([
    reviewerService.findReviewerProfilesAdmin(query, skip, Number(pageSize)),
    reviewerService.countReviewerProfilesAdmin(query),
  ]);

  return reply.send(
    formatPaginatedResponse<ReviewerProfileAPI>({
      data: await toProfilesAPIWithUserInfo(profiles),
      page: Number(page),
      pageSize: Number(pageSize),
      totalPages: Math.ceil(total / Number(pageSize)),
      totalItems: total,
    })
  );
};

// ── Admin: validate reviewer profile ────────────────────────────────────────

export const validateReviewerProfile = async (
  request: FastifyRequest<{ Params: { reviewerId: string } }>,
  reply: FastifyReply
): Promise<void> => {
  const sessionUser = request.session?.user;
  if (sessionUser?.role !== 'admin') {
    return ErrorHandler.handleGenericErrorResponse(reply, 'PERMISSION_DENIED');
  }

  const { reviewerId } = request.params;

  const profile = await reviewerService.findReviewerById(reviewerId);
  if (!profile) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'REVIEWER_PROFILE_NOT_FOUND'
    );
  }

  if (profile.status === 'active') {
    // Already active — still return 200 so the admin can be idempotent
    const profileAPI = await toProfileAPIWithUserInfo(profile);
    return reply.send(
      formatResponse<ReviewerProfileAPI>({
        data: profileAPI,
        message: t({
          en: 'Reviewer profile is already active',
          fr: 'Le profil du traducteur est déjà actif',
          es: 'El perfil del traductor ya está activo',
          de: 'Das Übersetzer-Profil ist bereits aktiv',
          ar: 'ملف المترجم نشط بالفعل',
          'en-GB': 'Reviewer profile is already active',
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

  const updated = await reviewerService.updateReviewerProfile(reviewerId, {
    status: 'active',
  });

  if (!updated) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'REVIEWER_PROFILE_NOT_FOUND'
    );
  }

  // Fetch the linked user to send the approval email
  const linkedUser = await userService.getUserById(String(profile.userId));
  if (linkedUser) {
    await sendEmail({
      type: 'reviewerApproved',
      to: linkedUser.email,
      locale: (linkedUser as any).locale,
      username: linkedUser.name ?? linkedUser.email,
      dashboardLink: `${process.env.APP_URL}/dashboard/reviewer`,
    }).catch((err) =>
      logger.error('Failed to send reviewer approved email', err)
    );
  }

  logger.info(
    `Reviewer profile ${reviewerId} validated by admin ${String(sessionUser.id)}`
  );

  return reply.send(
    formatResponse<ReviewerProfileAPI>({
      data: toProfileAPI(updated, {
        name: linkedUser?.name,
        avatar: linkedUser?.image,
      }),
      message: t({
        en: 'Reviewer profile validated',
        fr: 'Profil traducteur validé',
        es: 'Perfil del traductor validado',
        de: 'Übersetzer-Profil validiert',
        ar: 'تم التحقق من ملف المترجم',
        'en-GB': 'Reviewer profile validated',
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

export type UploadReviewerPictureResult = ResponseData<ReviewerProfileAPI>;

const uploadReviewerPictureHandler =
  (kind: ReviewerPictureKind) =>
  async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const user = request.session?.user;
    if (!user) {
      return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
    }

    const profile = await reviewerService.findReviewerByUserId(String(user.id));
    if (!profile) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'REVIEWER_PROFILE_NOT_FOUND'
      );
    }

    const rawContentType = request.headers['content-type'] ?? '';
    const contentType = rawContentType.split(';')[0].trim() || 'image/jpeg';
    const contentLength = Number(request.headers['content-length'] ?? 0);

    const validationError = validateReviewerPictureUpload(
      contentType,
      contentLength
    );
    if (validationError === 'UNSUPPORTED_TYPE') {
      return reply.status(415).send(
        formatResponse({
          data: null,
          message: t({
            en: 'Unsupported image type. Allowed: JPEG, PNG, WebP, GIF.',
            fr: "Type d'image non supporté. Formats acceptés : JPEG, PNG, WebP, GIF.",
            es: 'Tipo de imagen no admitido. Permitidos: JPEG, PNG, WebP, GIF.',
            'en-GB': 'Unsupported image type. Allowed: JPEG, PNG, WebP, GIF.',
            de: 'Nicht unterstützter Bildtyp. Erlaubt: JPEG, PNG, WebP, GIF.',
            ja: '対応していない画像形式です。使用可能: JPEG, PNG, WebP, GIF。',
            ko: '지원하지 않는 이미지 형식입니다. 허용: JPEG, PNG, WebP, GIF.',
            zh: '不支持的图片格式。允许：JPEG、PNG、WebP、GIF。',
            it: 'Tipo di immagine non supportato. Consentiti: JPEG, PNG, WebP, GIF.',
            pt: 'Tipo de imagem não suportado. Permitidos: JPEG, PNG, WebP, GIF.',
            hi: 'असमर्थित छवि प्रकार। अनुमत: JPEG, PNG, WebP, GIF।',
            ar: 'نوع صورة غير مدعوم. المسموح به: JPEG، PNG، WebP، GIF.',
            ru: 'Неподдерживаемый тип изображения. Разрешены: JPEG, PNG, WebP, GIF.',
            tr: 'Desteklenmeyen görüntü türü. İzin verilenler: JPEG, PNG, WebP, GIF.',
            pl: 'Nieobsługiwany typ obrazu. Dozwolone: JPEG, PNG, WebP, GIF.',
            id: 'Tipe gambar tidak didukung. Diizinkan: JPEG, PNG, WebP, GIF.',
            vi: 'Loại ảnh không được hỗ trợ. Được phép: JPEG, PNG, WebP, GIF.',
            uk: 'Непідтримуваний тип зображення. Дозволено: JPEG, PNG, WebP, GIF.',
          }),
        })
      );
    }

    if (validationError === 'TOO_LARGE') {
      return reply.status(413).send(
        formatResponse({
          data: null,
          message: t({
            en: 'File too large. Maximum size is 20 MB.',
            fr: 'Fichier trop volumineux. La taille maximale est de 20 Mo.',
            es: 'Archivo demasiado grande. El tamaño máximo es de 20 MB.',
            'en-GB': 'File too large. Maximum size is 20 MB.',
            de: 'Datei zu groß. Maximale Größe: 20 MB.',
            ja: 'ファイルが大きすぎます。最大サイズは20MBです。',
            ko: '파일이 너무 큽니다. 최대 크기는 20MB입니다.',
            zh: '文件过大。最大大小为 20 MB。',
            it: 'File troppo grande. La dimensione massima è 20 MB.',
            pt: 'Arquivo muito grande. O tamanho máximo é 20 MB.',
            hi: 'फ़ाइल बहुत बड़ी है। अधिकतम आकार 20 MB है।',
            ar: 'الملف كبير جدًا. الحجم الأقصى هو 20 ميغابايت.',
            ru: 'Файл слишком большой. Максимальный размер: 20 МБ.',
            tr: 'Dosya çok büyük. Maksimum boyut 20 MB.',
            pl: 'Plik zbyt duży. Maksymalny rozmiar to 20 MB.',
            id: 'File terlalu besar. Ukuran maksimum adalah 20 MB.',
            vi: 'Tệp quá lớn. Kích thước tối đa là 20 MB.',
            uk: 'Файл завеликий. Максимальний розмір: 20 МБ.',
          }),
        })
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
      await deleteReviewerPicture(existing).catch(() => {});
    }

    const imageUrl = await uploadReviewerPicture(
      buffer,
      String(profile.id),
      kind
    );

    const updated = await reviewerService.updateReviewerProfile(
      String(profile.id),
      {
        [field]: imageUrl,
      }
    );

    if (!updated) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'REVIEWER_PROFILE_NOT_FOUND'
      );
    }

    logger.info(
      `Reviewer ${kind} picture uploaded for profile ${String(profile.id)}`
    );

    return reply.send(
      formatResponse<ReviewerProfileAPI>({
        data: toProfileAPI(updated, { name: user.name, avatar: user.image }),
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

export const uploadReviewerMainPicture = uploadReviewerPictureHandler('main');
export const uploadReviewerCoverPicture = uploadReviewerPictureHandler('cover');

// ── Reviews ──────────────────────────────────────────────────────────────────

export const getReviewerReviews = async (
  request: FastifyRequest<{
    Params: { reviewerId: string };
    Querystring: { page?: number; pageSize?: number };
  }>,
  reply: FastifyReply
): Promise<void> => {
  const { reviewerId } = request.params;
  const { page = 1, pageSize = 20 } = request.query;

  const skip = (Number(page) - 1) * Number(pageSize);
  const [reviews, total] = await Promise.all([
    reviewerService.findReviewsByReviewerId(reviewerId, skip, Number(pageSize)),
    reviewerService.countReviewsByReviewerId(reviewerId),
  ]);

  return reply.send(
    formatPaginatedResponse<ReviewerReviewAPI>({
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
      'REVIEWER_MISSION_NOT_FOUND'
    );
  }

  if (String(mission.clientUserId) !== String(user.id)) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'REVIEWER_MISSION_UNAUTHORIZED'
    );
  }

  if (mission.status !== 'completed') {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'REVIEWER_REVIEW_MISSION_NOT_COMPLETED'
    );
  }

  const existing = await reviewerService.findReviewByMissionId(
    request.params.missionId
  );
  if (existing) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'REVIEWER_REVIEW_ALREADY_EXISTS'
    );
  }

  const review = await reviewerService.createReview({
    missionId: mission.id,
    reviewerId: mission.reviewerId,
    rating: request.body.rating,
    comment: request.body.comment,
  });

  await reviewerService.updateRating(
    String(mission.reviewerId),
    request.body.rating
  );

  return reply.status(201).send(
    formatResponse<ReviewerReviewAPI>({
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
  sourceLocale?: string;
  pricePerHour: number;
};

export const estimateMission = async (
  request: FastifyRequest<{ Body: EstimateMissionBody }>,
  reply: FastifyReply
): Promise<void> => {
  const user = request.session?.user;
  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }

  const { dictionaryIds, sourceLocale, pricePerHour } = request.body;

  // Only count dictionaries the caller can actually access
  const accessibleDictionaryIds =
    await missionService.filterAccessibleDictionaryIds(
      dictionaryIds ?? [],
      String(user.id)
    );

  const estimate = await missionService.calculateMissionEstimate(
    accessibleDictionaryIds,
    sourceLocale,
    pricePerHour
  );

  return reply.send(formatResponse<MissionEstimate>({ data: estimate }));
};

export type CreateMissionBody = {
  reviewerId: string;
  dictionaryIds?: string[];
  /** Optional — non-translation missions (e.g. SEO review) have no locales */
  sourceLocale?: string;
  targetLocales?: string[];
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

  const reviewer = await reviewerService.findReviewerById(
    request.body.reviewerId
  );
  if (!reviewer) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'REVIEWER_PROFILE_NOT_FOUND'
    );
  }

  if (reviewer.status !== 'active') {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'REVIEWER_PROFILE_NOT_ACTIVE'
    );
  }

  if (String(reviewer.userId) === String(user.id)) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'REVIEWER_CANNOT_BOOK_SELF'
    );
  }

  // Only attach dictionaries the caller can actually access
  const accessibleDictionaryIds =
    await missionService.filterAccessibleDictionaryIds(
      request.body.dictionaryIds ?? [],
      String(user.id)
    );

  const estimate = await missionService.calculateMissionEstimate(
    accessibleDictionaryIds,
    request.body.sourceLocale,
    reviewer.pricePerHour
  );

  const mission = await missionService.createMission({
    reviewerId: reviewer.id,
    clientUserId: user.id as any,
    projectId: request.body.projectId as any,
    dictionaryIds: accessibleDictionaryIds as any[],
    sourceLocale: request.body.sourceLocale,
    targetLocales: request.body.targetLocales ?? [],
    wordCount: estimate.wordCount,
    estimatedHours: estimate.estimatedHours,
    pricePerHour: reviewer.pricePerHour,
    totalPrice: estimate.totalPrice,
    currency: estimate.currency,
    notes: request.body.notes,
  });

  const missionLink = `${process.env.APP_URL}/find-reviewer/dashboard/mission/${String(mission.id)}`;

  const reviewerUser = await userService.getUserById(String(reviewer.userId));

  // Notify the client that their request was sent
  sendEmail({
    type: 'missionRequestedClient',
    to: user.email,
    clientUsername: user.name ?? user.email,
    reviewerName: reviewerUser?.name ?? 'the reviewer',
    missionLink,
  }).catch((err) =>
    logger.error('Failed to send missionRequestedClient email', err)
  );

  // Notify the reviewer that someone contacted them
  if (reviewerUser?.email) {
    sendEmail({
      type: 'missionRequestedReviewer',
      to: reviewerUser.email,
      reviewerUsername: reviewerUser.name ?? reviewerUser.email,
      clientName: user.name ?? user.email,
      sourceLocale: request.body.sourceLocale ?? '—',
      targetLocales: request.body.targetLocales ?? [],
      notes: request.body.notes,
      missionLink,
    }).catch((err) =>
      logger.error('Failed to send missionRequestedReviewer email', err)
    );
  }

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
      role?: 'client' | 'reviewer';
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

  if (role === 'reviewer') {
    const profile = await reviewerService.findReviewerByUserId(userId);
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
    const [missions, total] = await Promise.all([
      missionService.findMissionsForReviewerProfile(
        String(profile.id),
        skip,
        Number(pageSize)
      ),
      missionService.countMissionsForReviewerProfile(String(profile.id)),
    ]);
    return reply.send(
      formatPaginatedResponse<TranslationMissionAPI>({
        data: missions.map(toMissionAPI),
        page: Number(page),
        pageSize: Number(pageSize),
        totalPages: Math.ceil(total / Number(pageSize)),
        totalItems: total,
      })
    );
  }

  const [missions, total] = await Promise.all([
    missionService.findMissionsForUser(userId, skip, Number(pageSize)),
    missionService.countMissionsForUser(userId),
  ]);

  return reply.send(
    formatPaginatedResponse<TranslationMissionAPI>({
      data: missions.map(toMissionAPI),
      page: Number(page),
      pageSize: Number(pageSize),
      totalPages: Math.ceil(total / Number(pageSize)),
      totalItems: total,
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
      'REVIEWER_MISSION_NOT_FOUND'
    );
  }

  const userId = String(user.id);
  const profile = await reviewerService.findReviewerByUserId(userId);
  const isClient = String(mission.clientUserId) === userId;
  const isReviewer =
    profile && String(mission.reviewerId) === String(profile.id);

  if (!isClient && !isReviewer) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'REVIEWER_MISSION_UNAUTHORIZED'
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
      'REVIEWER_MISSION_NOT_FOUND'
    );
  }

  const userId = String(user.id);
  const profile = await reviewerService.findReviewerByUserId(userId);
  const isClient = String(mission.clientUserId) === userId;
  const isReviewer =
    profile && String(mission.reviewerId) === String(profile.id);

  if (!isClient && !isReviewer) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'REVIEWER_MISSION_UNAUTHORIZED'
    );
  }

  const newStatus = request.body.status;
  const role: missionService.MissionParticipantRole = isClient
    ? 'client'
    : 'reviewer';

  if (!missionService.canUpdateMissionStatus(role, mission.status, newStatus)) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'REVIEWER_MISSION_INVALID_STATUS_TRANSITION'
    );
  }

  const updated = await missionService.updateMissionStatus(
    request.params.missionId,
    newStatus
  );

  // Credit the mission's reviewer — not the caller, who is the client here
  if (newStatus === 'completed') {
    await reviewerService.incrementMissionCount(String(mission.reviewerId));
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
      'REVIEWER_MISSION_NOT_FOUND'
    );
  }

  const userId = String(user.id);
  const profile = await reviewerService.findReviewerByUserId(userId);
  const isClient = String(mission.clientUserId) === userId;
  const isReviewer =
    profile && String(mission.reviewerId) === String(profile.id);

  if (!isClient && !isReviewer) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'REVIEWER_MISSION_UNAUTHORIZED'
    );
  }

  const messages = await messageService.findMessagesByMissionId(
    request.params.missionId
  );
  await messageService.markMessagesRead(request.params.missionId, userId);

  return reply.send(
    formatResponse<ReviewerMessageAPI[]>({ data: messages.map(toMessageAPI) })
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
      'REVIEWER_MISSION_NOT_FOUND'
    );
  }

  const userId = String(user.id);
  const profile = await reviewerService.findReviewerByUserId(userId);
  const isClient = String(mission.clientUserId) === userId;
  const isReviewer =
    profile && String(mission.reviewerId) === String(profile.id);

  if (!isClient && !isReviewer) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'REVIEWER_MISSION_UNAUTHORIZED'
    );
  }

  const message = await messageService.createMessage(
    request.params.missionId,
    userId,
    request.body.content
  );

  return reply
    .status(201)
    .send(formatResponse<ReviewerMessageAPI>({ data: toMessageAPI(message) }));
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
  const profile = await reviewerService.findReviewerByUserId(userId);
  const isClient = String(mission.clientUserId) === userId;
  const isReviewer =
    profile && String(mission.reviewerId) === String(profile.id);

  if (!isClient && !isReviewer) {
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
  // TODO: confirm Stripe payment and release funds to reviewer's Stripe account
  return reply.send(formatResponse({ data: null, message: 'Not implemented' }));
};

export const requestPayout = async (
  _request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  // TODO: trigger payout to reviewer's Stripe Connect account
  return reply.send(formatResponse({ data: null, message: 'Not implemented' }));
};

// ── Contact ───────────────────────────────────────────────────────────────────

export const contactReviewer = async (
  request: FastifyRequest<{
    Params: { reviewerId: string };
    Body: { message: string };
  }>,
  reply: FastifyReply
): Promise<void> => {
  const { reviewerId } = request.params;
  const { message } = request.body;
  const user = request.session?.user;

  // Require an authenticated sender so the reviewer knows who wrote and
  // anonymous callers cannot spam reviewers by email
  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }

  if (!message?.trim()) {
    return reply
      .status(400)
      .send(formatResponse({ data: null, message: 'Message is required' }));
  }

  const reviewer = await reviewerService.findReviewerById(reviewerId);
  if (!reviewer) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'REVIEWER_PROFILE_NOT_FOUND'
    );
  }

  const reviewerUser = await userService.getUserById(String(reviewer.userId));
  if (reviewerUser?.email) {
    sendEmail({
      type: 'reviewerContactInquiry',
      to: reviewerUser.email,
      reviewerUsername: reviewerUser.name ?? reviewerUser.email,
      clientName: `${user.name ?? user.email} (${user.email})`,
      message: message.trim(),
    }).catch((err) =>
      logger.error('Failed to send reviewerContactInquiry email', err)
    );
  }

  return reply
    .status(200)
    .send(formatResponse({ data: null, message: 'Message sent' }));
};
