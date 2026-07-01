import { logger } from '@logger';
import { sendEmail } from '@services/email.service';
import {
  deleteUserAvatar,
  uploadUserAvatar,
  validateAvatarUpload,
} from '@services/user/avatarUpload.service';
import * as userService from '@services/user.service';
import { type AppError, ErrorHandler } from '@utils/errors';
import type { FiltersAndPagination } from '@utils/filtersAndPagination/getFiltersAndPaginationFromBody';
import {
  getUserFiltersAndPagination,
  type UserFiltersParam,
} from '@utils/filtersAndPagination/getUserFiltersAndPagination';
import { isSelfHosted } from '@utils/isSelfHosted';
import { mapUsersToAPI, mapUserToAPI } from '@utils/mapper/user';
import { hasPermission } from '@utils/permissions';
import {
  formatPaginatedResponse,
  formatResponse,
  type PaginatedResponse,
  type ResponseData,
} from '@utils/responseData';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { t } from 'fastify-intlayer';
import type { User, UserAPI } from '@/types/user.types';

export type GetSetupStatusResult = ResponseData<{ isSetupRequired: boolean }>;

/**
 * Reports whether the instance still needs its initial setup, i.e. whether the
 * first super-admin account must be created. This is only ever `true` on a
 * self-hosted deployment whose users collection is still empty. On the hosted
 * cloud it always returns `false`. Public endpoint (no authentication) so the
 * dashboard can gate the init flow before any user exists.
 */
export const getSetupStatus = async (
  _request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  try {
    const isSetupRequired =
      isSelfHosted() && (await userService.countUsers({})) === 0;

    const responseData = formatResponse<{ isSetupRequired: boolean }>({
      data: { isSetupRequired },
    });

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type CreateUserBody = { email: string; password?: string };
export type CreateUserResult = ResponseData<UserAPI>;

/**
 * Creates a new user.
 */
export const createUser = async (
  request: FastifyRequest<{ Body: User }>,
  reply: FastifyReply
): Promise<void> => {
  const user: User | undefined = request.body;

  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }

  try {
    const newUser = await userService.createUser(user);

    await sendEmail({
      type: 'welcome',
      to: newUser.email,
      username: newUser.name,
      loginLink: `${process.env.APP_URL}/auth/login`,
    });

    const formattedUser = mapUserToAPI(newUser);

    const responseData = formatResponse<UserAPI>({
      message: t({
        en: 'User created',
        'en-GB': 'User created',
        fr: 'Utilisateur créé',
        es: 'Usuario creado',
        ru: 'Пользователь создан',
        ja: 'ユーザーが作成されました',
        ko: '사용자가 생성되었습니다',
        zh: '用户已创建',
        de: 'Benutzer erstellt',
        ar: 'تم إنشاء المستخدم',
        it: 'Utente creato',
        pt: 'Usuário criado',
        hi: 'उपयोगकर्ता बनाया गया',
        tr: 'Kullanıcı oluşturuldu',
        pl: 'Użytkownik został utworzony',
        id: 'Pengguna dibuat',
        vi: 'Người dùng đã được tạo',
        uk: 'Користувача створено',
      }),
      description: t({
        en: 'User created successfully',
        'en-GB': 'User created successfully',
        fr: 'Utilisateur créé avec succès',
        es: 'Usuario creado con éxito',
        ru: 'Пользователь успешно создан',
        ja: 'ユーザーが正常に作成されました',
        ko: '사용자가 성공적으로 생성되었습니다',
        zh: '用户已成功创建',
        de: 'Benutzer erfolgreich erstellt',
        ar: 'تم إنشاء المستخدم بنجاح',
        it: 'Utente creato con successo',
        pt: 'Usuário criado com sucesso',
        hi: 'उपयोगकर्ता सफलतापूर्वक बनाया गया',
        tr: 'Kullanıcı başarıyla oluşturuldu',
        pl: 'Użytkownik został pomyślnie utworzony',
        id: 'Pengguna berhasil dibuat',
        vi: 'Người dùng đã được tạo thành công',
        uk: 'Користувача успішно створено',
      }),
      data: formattedUser,
    });

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type GetUsersParams = FiltersAndPagination<UserFiltersParam>;
export type GetUsersResult = PaginatedResponse<UserAPI>;

/**
 * Retrieves a list of users based on filters and pagination.
 */
export const getUsers = async (
  request: FastifyRequest<{ Querystring: GetUsersParams }>,
  reply: FastifyReply
): Promise<void> => {
  const { user, roles } = request.session || {};

  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }

  const { filters, sortOptions, pageSize, skip, page, getNumberOfPages } =
    getUserFiltersAndPagination(request);

  try {
    const users = await userService.findUsers(
      filters,
      skip,
      pageSize,
      sortOptions
    );

    // Skip permission check when there are no users to protect.
    // An empty result is safe to return without checking roles.
    if (
      users.length > 0 &&
      !hasPermission(
        roles || [],
        'user:read'
      )({
        ...request.session,
        targetUsers: users,
      })
    ) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'PERMISSION_DENIED'
      );
    }

    const totalItems = await userService.countUsers(filters);

    const formattedUsers = mapUsersToAPI(users);

    const responseData = formatPaginatedResponse<UserAPI>({
      data: formattedUsers,
      page,
      pageSize,
      totalPages: getNumberOfPages(totalItems),
      totalItems,
    });

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type GetUserByIdParams = { userId: UserAPI['id'] };
export type GetUserByIdResult = ResponseData<UserAPI>;

export const getUserById = async (
  request: FastifyRequest<{ Params: GetUserByIdParams }>,
  reply: FastifyReply
): Promise<void> => {
  const { userId } = request.params;
  const { user: sessionUser } = request.session || {};

  if (!sessionUser) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }

  if (
    String(sessionUser.id) !== String(userId) &&
    sessionUser.role !== 'admin'
  ) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'PERMISSION_DENIED');
  }

  try {
    const user = await userService.getUserById(userId);

    if (!user) {
      return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
    }

    const formattedUser = mapUserToAPI(user);
    const responseData = formatResponse<UserAPI>({ data: formattedUser });

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type GetUserByEmailParams = { email: string };
export type GetUserByEmailResult = ResponseData<UserAPI>;

export const getUserByEmail = async (
  request: FastifyRequest<{ Params: GetUserByEmailParams }>,
  reply: FastifyReply
): Promise<void> => {
  const { email } = request.params;
  const { user: sessionUser, roles } = request.session || {};

  if (!sessionUser) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }

  try {
    const user = await userService.getUserByEmail(email);

    if (!user) {
      return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
    }

    if (
      !hasPermission(
        roles || [],
        'user:read'
      )({
        ...request.session,
        targetUsers: [user],
      })
    ) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'PERMISSION_DENIED'
      );
    }

    const formattedUser = mapUserToAPI(user);
    const responseData = formatResponse<UserAPI>({ data: formattedUser });

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type UpdateUserBody = Partial<UserAPI>;
export type UpdateUserResult = ResponseData<UserAPI>;

/**
 * Updates user information (phone number, date of birth).
 */
export const updateUser = async (
  request: FastifyRequest<{ Body: UpdateUserBody }>,
  reply: FastifyReply
): Promise<void> => {
  const userData = request.body;
  const { user, roles } = request.session || {};

  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }

  if (typeof userData !== 'object') {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'USER_DATA_NOT_FOUND'
    );
  }

  if (!userData.id) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'USER_INVALID_FIELDS'
    );
  }

  const userDB = await userService.getUserById(userData.id);

  if (!userDB) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_FOUND');
  }

  if (
    !hasPermission(
      roles || [],
      'user:write'
    )({
      ...request.session,
      targetUsers: [userDB],
    })
  ) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'PERMISSION_DENIED');
  }

  try {
    const updatedUser = await userService.updateUserById(userDB.id, userData);

    logger.info(
      `User updated: Name: ${updatedUser.name}, id: ${String(updatedUser.id)}`
    );

    const formattedUser = mapUserToAPI(updatedUser);
    const responseData = formatResponse<UserAPI>({
      message: t({
        en: 'User updated',
        'en-GB': 'User updated',
        fr: 'Utilisateur mis à jour',
        es: 'Usuario actualizado',
        ru: 'Пользователь обновлен',
        ja: 'ユーザーが更新されました',
        ko: '사용자가 업데이트되었습니다',
        zh: '用户已更新',
        de: 'Benutzer aktualisiert',
        ar: 'تم تحديث المستخدم',
        it: 'Utente aggiornato',
        pt: 'Usuário atualizado',
        hi: 'उपयोगकर्ता अपडेट किया गया',
        tr: 'Kullanıcı güncellendi',
        pl: 'Użytkownik został zaktualizowany',
        id: 'Pengguna diperbarui',
        vi: 'Người dùng đã được cập nhật',
        uk: 'Користувача оновлено',
      }),
      description: t({
        en: 'User updated successfully',
        'en-GB': 'User updated successfully',
        fr: 'Utilisateur mis à jour avec succès',
        es: 'Usuario actualizado con éxito',
        ru: 'Пользователь успешно обновлен',
        ja: 'ユーザーが正常に更新されました',
        ko: '사용자가 성공적으로 업데이트되었습니다',
        zh: '用户已成功更新',
        de: 'Benutzer erfolgreich aktualisiert',
        ar: 'تم تحديث المستخدم بنجاح',
        it: 'Utente aggiornato con successo',
        pt: 'Usuário atualizado com sucesso',
        hi: 'उपयोगकर्ता सफलतापूर्वक अपडेट किया गया',
        tr: 'Kullanıcı başarıyla güncellendi',
        pl: 'Użytkownik został pomyślnie zaktualizowany',
        id: 'Pengguna berhasil diperbarui',
        vi: 'Người dùng đã được cập nhật thành công',
        uk: 'Користувача успішно оновлено',
      }),
      data: formattedUser,
    });

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type DeleteUserParams = { userId: string };
export type DeleteUserResult = ResponseData<UserAPI>;

/**
 * Deletes a user based on the provided ID.
 */
export const deleteUser = async (
  request: FastifyRequest<{ Params: DeleteUserParams }>,
  reply: FastifyReply
): Promise<void> => {
  const { userId } = request.params;
  const { roles } = request.session || {};

  try {
    const user = await userService.getUserById(userId);

    if (!user) {
      return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_FOUND');
    }

    if (
      !hasPermission(
        roles || [],
        'user:admin'
      )({
        ...request.session,
        targetUsers: [user],
      })
    ) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'PERMISSION_DENIED'
      );
    }

    await userService.deleteUser(userId);

    const formattedUser = mapUserToAPI(user);
    const responseData = formatResponse<UserAPI>({
      message: t({
        en: 'User deleted',
        'en-GB': 'User deleted',
        fr: 'Utilisateur supprimé',
        es: 'Usuario eliminado',
        ru: 'Пользователь удален',
        ja: 'ユーザーが削除されました',
        ko: '사용자가 삭제되었습니다',
        zh: '用户已删除',
        de: 'Benutzer gelöscht',
        ar: 'تم حذف المستخدم',
        it: 'Utente eliminato',
        pt: 'Usuário excluído',
        hi: 'उपयोगकर्ता हटा दिया गया',
        tr: 'Kullanıcı silindi',
        pl: 'Użytkownik został usunięty',
        id: 'Pengguna dihapus',
        vi: 'Người dùng đã bị xóa',
        uk: 'Користувача видалено',
      }),
      description: t({
        en: 'User deleted successfully',
        'en-GB': 'User deleted successfully',
        fr: 'Utilisateur supprimé avec succès',
        es: 'Usuario eliminado con éxito',
        ru: 'Пользователь успешно удален',
        ja: 'ユーザーが正常に削除されました',
        ko: '사용자가 성공적으로 삭제되었습니다',
        zh: '用户已成功删除',
        de: 'Benutzer erfolgreich gelöscht',
        ar: 'تم حذف المستخدم بنجاح',
        it: 'Utente eliminato con successo',
        pt: 'Usuário excluído com sucesso',
        hi: 'उपयोगकर्ता सफलतापूर्वक हटा दिया गया',
        tr: 'Kullanıcı başarıyla silindi',
        pl: 'Użytkownik został pomyślnie usunięty',
        id: 'Pengguna berhasil dihapus',
        vi: 'Người dùng đã được xóa thành công',
        uk: 'Користувача успішно видалено',
      }),
      data: formattedUser,
    });

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type UploadUserAvatarResult = ResponseData<UserAPI>;

/**
 * Uploads a new avatar for the authenticated user, stores it in S3, and
 * updates the user's image field. Deletes the previous avatar if it was
 * hosted on our own storage.
 */
export const uploadAvatar = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const { user, roles } = request.session || {};

  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }

  const rawContentType = request.headers['content-type'] ?? '';
  // Strip parameters like "; charset=utf-8" to get the bare MIME type
  const contentType = rawContentType.split(';')[0].trim() || 'image/jpeg';
  const contentLength = Number(request.headers['content-length'] ?? 0);

  logger.info('uploadAvatar request', {
    contentType,
    contentLength,
    userId: String(user.id),
  });

  const validationError = validateAvatarUpload(contentType, contentLength);
  if (validationError === 'UNSUPPORTED_TYPE') {
    logger.warn('uploadAvatar: unsupported type', { contentType });
    return reply.status(415).send(
      formatResponse({
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
        data: null,
      })
    );
  }

  if (validationError === 'TOO_LARGE') {
    logger.warn('uploadAvatar: file too large', { contentLength });
    return reply.status(413).send(
      formatResponse({
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
        data: null,
      })
    );
  }

  if (
    !hasPermission(
      roles || [],
      'user:write'
    )({ ...request.session, targetUsers: [user] })
  ) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'PERMISSION_DENIED');
  }

  try {
    const buffer = request.body;
    const userId = String(user.id);

    if (!Buffer.isBuffer(buffer) || buffer.length === 0) {
      logger.error('uploadAvatar: body is not a Buffer', {
        bodyType: typeof buffer,
        isBuffer: Buffer.isBuffer(buffer),
        length: Buffer.isBuffer(buffer) ? buffer.length : 'N/A',
        contentType,
      });
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'USER_INVALID_FIELDS'
      );
    }

    // Delete the old avatar from S3 if it was uploaded by us
    if (user.image) {
      await deleteUserAvatar(user.image).catch(() => {});
    }

    const imageUrl = await uploadUserAvatar(buffer, userId);

    const updatedUser = await userService.updateUserById(userId, {
      image: imageUrl,
    });

    logger.info(`Avatar uploaded for user ${userId}`);

    const formattedUser = mapUserToAPI(updatedUser);
    const responseData = formatResponse<UserAPI>({
      message: t({
        en: 'Avatar uploaded',
        'en-GB': 'Avatar uploaded',
        fr: 'Avatar mis à jour',
        es: 'Avatar actualizado',
        ru: 'Аватар загружен',
        ja: 'アバターをアップロードしました',
        ko: '아바타가 업로드되었습니다',
        zh: '头像已上传',
        de: 'Avatar hochgeladen',
        ar: 'تم رفع الصورة الرمزية',
        it: 'Avatar caricato',
        pt: 'Avatar enviado',
        hi: 'अवतार अपलोड किया गया',
        tr: 'Avatar yüklendi',
        pl: 'Awatar przesłany',
        id: 'Avatar diunggah',
        vi: 'Ảnh đại diện đã được tải lên',
        uk: 'Аватар завантажено',
      }),
      data: formattedUser,
    });

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

let clients: Array<{
  id: number;
  userId: string;
  res: { raw: FastifyReply['raw'] };
}> = [];

export const sendVerificationUpdate = (user: User) => {
  const filteredClients = clients.filter(
    (client) => String(client.userId) === String(user.id)
  );

  for (const client of filteredClients) {
    if (user.emailVerified) {
      client.res.raw.write(
        `data: ${JSON.stringify({ userId: user.id, status: 'verified' })}\n\n`
      );
    }
  }
};

export type VerifyEmailStatusSSEParams = { userId: string };

/**
 * SSE to check the email verification status
 */
export const verifyEmailStatusSSE = async (
  request: FastifyRequest<{ Params: VerifyEmailStatusSSEParams }>,
  reply: FastifyReply
) => {
  const { user: sessionUser, roles } = request.session || {};

  const { userId } = request.params; // Get user ID from params

  const user = await userService.getUserById(userId);

  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }

  // When a session exists, enforce ownership or admin access.
  // When there is no session the user just registered and is waiting for
  // email verification — BetterAuth does not create a session until the
  // email is verified, so we allow unauthenticated access for this endpoint.
  if (
    sessionUser &&
    String(sessionUser.id) !== String(userId) &&
    !hasPermission(
      roles || [],
      'user:admin'
    )({ ...request.session, targetUsers: [user] })
  ) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'PERMISSION_DENIED');
  }

  // Set headers for SSE
  reply.raw.setHeader('Content-Type', 'text/event-stream;charset=utf-8');
  reply.raw.setHeader('Cache-Control', 'no-cache, no-transform');
  reply.raw.setHeader('Connection', 'keep-alive');
  reply.raw.setHeader('X-Accel-Buffering', 'no'); // For Nginx buffering

  // Send initial data to ensure the connection is open
  reply.raw.write(':\n\n'); // Comment to keep connection alive
  reply.raw.flushHeaders?.();

  const clientId = Date.now();

  // Add client to the list
  const newClient = { id: clientId, userId, res: { raw: reply.raw } };
  clients.push(newClient);

  sendVerificationUpdate(user);

  // Remove client on connection close
  request.raw.on('close', () => {
    clients = clients.filter((client) => client.id !== clientId);
  });
};
