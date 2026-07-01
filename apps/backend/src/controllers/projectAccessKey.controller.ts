import { sendEmail } from '@services/email.service';
import * as projectAccessKeyService from '@services/projectAccessKey.service';
import { type AppError, ErrorHandler } from '@utils/errors';
import {
  hasPermission,
  intersectPermissions,
  type Permission,
} from '@utils/permissions';
import { formatResponse, type ResponseData } from '@utils/responseData';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { t } from 'fastify-intlayer';
import type { AccessKeyData, OAuth2Access } from '@/types/project.types';

export type AddNewAccessKeyBody = AccessKeyData;
export type AddNewAccessKeyResponse = ResponseData<OAuth2Access>;

/**
 * Adds a new access key to a project.
 */
export const addNewAccessKey = async (
  request: FastifyRequest<{ Body: AddNewAccessKeyBody }>,
  reply: FastifyReply
): Promise<void> => {
  const { user, project, organization, roles, permissions } =
    request.session || {};
  const { grants, name, expiresAt, allowedEnvironmentIds, allowedLocales } =
    request.body;

  if (!project) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'PROJECT_NOT_DEFINED'
    );
  }

  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }

  if (
    !hasPermission(
      roles || [],
      'project:write'
    )({
      ...request.session,
      targetProjectIds: [project.id],
    })
  ) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'PERMISSION_DENIED');
  }

  const filteredPermisions = intersectPermissions(
    permissions || [],
    (grants as Permission[]) || []
  );

  try {
    const newAccessKey = await projectAccessKeyService.addNewAccessKey(
      {
        name,
        expiresAt,
        grants: filteredPermisions,
        allowedEnvironmentIds: allowedEnvironmentIds ?? null,
        allowedLocales: allowedLocales ?? null,
      },
      project.id,
      user
    );

    const responseData = formatResponse<OAuth2Access>({
      message: t({
        en: 'Access key created successfully',
        es: 'Clave de acceso creada con éxito',
        fr: "Clé d'accès créée avec succès",
        ru: 'Ключ доступа успешно создан',
        ja: 'アクセスキーが正常に作成されました',
        ko: '액세스 키가 성공적으로 생성되었습니다',
        zh: '访问密钥创建成功',
        de: 'Zugriffsschlüssel erfolgreich erstellt',
        ar: 'تم إنشاء مفتاح الوصول بنجاح',
        it: 'Chiave di accesso creata con successo',
        'en-GB': 'Access key created successfully',
        pt: 'Chave de acesso criada com sucesso',
        hi: 'एक्सेस कुंजी सफलतापूर्वक बनाई गई',
        tr: 'Erişim anahtarı başarıyla oluşturuldu',
        pl: 'Klucz dostępu został pomyślnie utworzony',
        id: 'Kunci akses berhasil dibuat',
        vi: 'Khóa truy cập đã được tạo thành công',
        uk: 'Ключ доступу успішно створено',
      }),
      description: t({
        en: 'The access key has been created successfully',
        es: 'La clave de acceso ha sido creada con éxito',
        fr: "La clé d'accès a été créée avec succès",
        ru: 'Ключ доступа был успешно создан',
        ja: 'アクセスキーが正常に作成されました',
        ko: '액세스 키가 성공적으로 생성되었습니다',
        zh: '访问密钥已成功创建',
        de: 'Der Zugriffsschlüssel wurde erfolgreich erstellt',
        ar: 'تم إنشاء مفتاح الوصول بنجاح',
        it: 'La chiave di accesso è stata creata con successo',
        'en-GB': 'The access key has been created successfully',
        pt: 'A chave de acesso foi criada com sucesso',
        hi: 'एक्सेस कुंजी सफलतापूर्वक बना दी गई है',
        tr: 'Erişim anahtarı başarıyla oluşturuldu',
        pl: 'Klucz dostępu został pomyślnie utworzony',
        id: 'Kunci akses telah berhasil dibuat',
        vi: 'Khóa truy cập đã được tạo thành công',
        uk: 'Ключ доступу було успішно створено',
      }),
      data: newAccessKey,
    });

    sendEmail({
      type: 'oAuthTokenCreated',
      to: user.email,
      organizationId: organization?.id,
      username: user.name,
      applicationName: newAccessKey.name ?? newAccessKey.clientId,
      scopes: newAccessKey.grants,
      tokenDetailsUrl: `${process.env.APP_URL}/oauth2/token`,
      securityLogUrl: `${process.env.APP_URL}/security-log`,
      supportUrl: `${process.env.APP_URL}/support`,
    });

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type DeleteAccessKeyBody = { clientId: string };
export type DeleteAccessKeyResponse = ResponseData<null>;

/**
 * Deletes an access key from a project.
 */
export const deleteAccessKey = async (
  request: FastifyRequest<{ Body: DeleteAccessKeyBody }>,
  reply: FastifyReply
): Promise<void> => {
  const { user, project, roles } = request.session || {};
  const { clientId } = request.body;

  if (!project) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'PROJECT_NOT_DEFINED'
    );
  }

  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }

  if (!clientId) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'CLIENT_ID_NOT_FOUND'
    );
  }

  if (
    !hasPermission(
      roles || [],
      'project:write'
    )({
      ...request.session,
      targetProjectIds: [project.id],
    })
  ) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'PERMISSION_DENIED');
  }

  try {
    const deletedAccessKey = await projectAccessKeyService.deleteAccessKey(
      clientId,
      project,
      user.id
    );

    if (!deletedAccessKey) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'ACCESS_KEY_NOT_FOUND',
        {
          clientId,
        }
      );
    }

    const responseData = formatResponse<null>({
      message: t({
        en: 'Access key deleted successfully',
        es: 'Clave de acceso eliminada con éxito',
        fr: "Clé d'accès supprimée avec succès",
        ru: 'Ключ доступа успешно удален',
        ja: 'アクセスキーが正常に削除されました',
        ko: '액세스 키가 성공적으로 삭제되었습니다',
        zh: '访问密钥删除成功',
        de: 'Zugriffsschlüssel erfolgreich gelöscht',
        ar: 'تم حذف مفتاح الوصول بنجاح',
        it: 'Chiave di accesso eliminata con successo',
        'en-GB': 'Access key deleted successfully',
        pt: 'Chave de acesso eliminada com sucesso',
        hi: 'एक्सेस कुंजी सफलतापूर्वक हटा दी गई',
        tr: 'Erişim anahtarı başarıyla silindi',
        pl: 'Klucz dostępu został pomyślnie usunięty',
        id: 'Kunci akses berhasil dihapus',
        vi: 'Khóa truy cập đã được xóa thành công',
        uk: 'Ключ доступу успішно видалено',
      }),
      description: t({
        en: 'The access key has been deleted successfully',
        es: 'La clave de acceso ha sido eliminada con éxito',
        fr: "La clé d'accès a été supprimée avec succès",
        ru: 'Ключ доступа был успешно удален',
        ja: 'アクセスキーが正常に削除されました',
        ko: '액세스 키가 성공적으로 삭제되었습니다',
        zh: '访问密钥已成功删除',
        de: 'Der Zugriffsschlüssel wurde erfolgreich gelöscht',
        ar: 'تم حذف مفتاح الوصول بنجاح',
        it: 'La chiave di accesso è stata eliminata con successo',
        'en-GB': 'The access key has been deleted successfully',
        pt: 'A chave de acesso foi eliminada com sucesso',
        hi: 'एक्सेस कुंजी सफलतापूर्वक हटा दी गई है',
        tr: 'Erişim anahtarı başarıyla silindi',
        pl: 'Klucz dostępu został pomyślnie usunięty',
        id: 'Kunci akses telah berhasil dihapus',
        vi: 'Khóa truy cập đã được xóa thành công',
        uk: 'Ключ доступу було успішно видалено',
      }),
      data: null,
    });

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type RefreshAccessKeyBody = { clientId: string };
export type RefreshAccessKeyResponse = ResponseData<OAuth2Access>;

/**
 * Refreshes an access key from a project.
 */
export const refreshAccessKey = async (
  request: FastifyRequest<{ Body: RefreshAccessKeyBody }>,
  reply: FastifyReply
): Promise<void> => {
  const { user, project, roles } = request.session || {};
  const { clientId } = request.body;

  if (!project) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'PROJECT_NOT_DEFINED'
    );
  }

  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }

  if (!clientId) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'CLIENT_ID_NOT_FOUND'
    );
  }

  if (
    !hasPermission(
      roles || [],
      'project:write'
    )({
      ...request.session,
      targetProjectIds: [project?.id],
    })
  ) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'PERMISSION_DENIED');
  }

  try {
    const newAccessKey = await projectAccessKeyService.refreshAccessKey(
      clientId,
      project?.id,
      user?.id
    );

    const responseData = formatResponse<OAuth2Access>({
      message: t({
        en: 'Access key refreshed successfully',
        es: 'Clave de acceso actualizada con éxito',
        fr: "Clé d'accès actualisée avec succès",
        ru: 'Ключ доступа успешно обновлен',
        ja: 'アクセスキーが正常に更新されました',
        ko: '액세스 키가 성공적으로 새로 고쳐졌습니다',
        zh: '访问密钥刷新成功',
        de: 'Zugriffsschlüssel erfolgreich aktualisiert',
        ar: 'تم تحديث مفتاح الوصول بنجاح',
        it: 'Chiave di accesso aggiornata con successo',
        'en-GB': 'Access key refreshed successfully',
        pt: 'Chave de acesso atualizada com sucesso',
        hi: 'एक्सेस कुंजी सफलतापूर्वक रिफ्रेश कर दी गई',
        tr: 'Erişim anahtarı başarıyla yenilendi',
        pl: 'Klucz dostępu został pomyślnie odświeżony',
        id: 'Kunci akses berhasil diperbarui',
        vi: 'Khóa truy cập đã được làm mới thành công',
        uk: 'Ключ доступу успішно оновлено',
      }),
      description: t({
        en: 'The access key has been refreshed successfully',
        es: 'La clave de acceso ha sido actualizada con éxito',
        fr: "La clé d'accès a été actualisée avec succès",
        ru: 'Ключ доступа был успешно обновлен',
        ja: 'アクセスキーが正常に更新されました',
        ko: '액세스 키가 성공적으로 새로 고쳐졌습니다',
        zh: '访问密钥已成功刷新',
        de: 'Der Zugriffsschlüssel wurde erfolgreich aktualisiert',
        ar: 'تم تحديث مفتاح الوصول بنجاح',
        it: 'La chiave di accesso è stata aggiornata con successo',
        'en-GB': 'The access key has been refreshed successfully',
        pt: 'A chave de acesso foi atualizada com sucesso',
        hi: 'एक्सेस कुंजी सफलतापूर्वक रिफ्रेश कर दी गई है',
        tr: 'Erişim anahtarı başarıyla yenilendi',
        pl: 'Klucz dostępu został pomyślnie odświeżony',
        id: 'Kunci akses telah berhasil diperbarui',
        vi: 'Khóa truy cập đã được làm mới thành công',
        uk: 'Ключ доступу було успішно оновлено',
      }),
      data: newAccessKey,
    });

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};
