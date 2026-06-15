import * as assetService from '@services/asset.service';
import {
  deleteAssetFromS3,
  uploadAsset as uploadAssetToS3,
  validateAssetUpload,
} from '@services/blog/assetUpload.service';
import { type AppError, ErrorHandler } from '@utils/errors';
import { hasPermission } from '@utils/permissions';
import {
  formatPaginatedResponse,
  formatResponse,
  type PaginatedResponse,
  type ResponseData,
} from '@utils/responseData';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { t } from 'fastify-intlayer';
import type { AssetAPI } from '@/types/asset.types';

export type GetAssetsResult = PaginatedResponse<AssetAPI>;
export type GetAssetByIdResult = ResponseData<AssetAPI>;
export type UploadAssetResult = ResponseData<AssetAPI>;
export type UpdateAssetResult = ResponseData<AssetAPI>;
export type DeleteAssetResult = ResponseData<null>;

/**
 * Lists all assets for the session's current project, paginated.
 */
export const getAssets = async (
  request: FastifyRequest<{
    Querystring: { page?: string; pageSize?: string };
  }>,
  reply: FastifyReply
): Promise<void> => {
  const { project, roles } = request.session || {};

  if (!project) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'PROJECT_NOT_DEFINED'
    );
  }

  if (
    !hasPermission(
      roles || [],
      'project:read'
    )({
      ...request.session,
      targetProjects: [project],
    })
  ) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'PERMISSION_DENIED');
  }

  const { page, pageSize } = request.query;

  try {
    const result = await assetService.findAssets({
      projectId: project.id.toString(),
      page: page ? Number(page) : 1,
      pageSize: pageSize ? Number(pageSize) : 20,
    });

    const responseData = formatPaginatedResponse<AssetAPI>({
      data: result.data.map(
        (asset) =>
          (asset as unknown as { toJSON(): AssetAPI }).toJSON?.() ??
          (asset as unknown as AssetAPI)
      ),
      page: page ? Number(page) : 1,
      pageSize: pageSize ? Number(pageSize) : 20,
      totalPages: result.totalPages,
      totalItems: result.totalItems,
    });

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

/**
 * Retrieves a single asset by ID, scoped to the session project.
 */
export const getAssetById = async (
  request: FastifyRequest<{ Params: { assetId: string } }>,
  reply: FastifyReply
): Promise<void> => {
  const { project, roles } = request.session || {};

  if (!project) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'PROJECT_NOT_DEFINED'
    );
  }

  if (
    !hasPermission(
      roles || [],
      'project:read'
    )({
      ...request.session,
      targetProjects: [project],
    })
  ) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'PERMISSION_DENIED');
  }

  const { assetId } = request.params;

  try {
    const asset = await assetService.getAssetById(
      assetId,
      project.id.toString()
    );

    const responseData = formatResponse<AssetAPI>({
      data:
        (asset as unknown as { toJSON(): AssetAPI }).toJSON?.() ??
        (asset as unknown as AssetAPI),
    });

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

/**
 * Uploads a new asset image for the session's current project.
 *
 * Expects a raw image buffer body with the appropriate Content-Type header.
 * Optional metadata via request headers:
 *   - X-File-Name   original filename (default: "upload")
 *   - X-Alt-Text    accessibility alt text
 *   - X-Caption     optional image caption
 */
export const uploadAsset = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const { project, user, roles } = request.session || {};

  if (!project) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'PROJECT_NOT_DEFINED'
    );
  }

  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }

  if (!hasPermission(roles || [], 'dictionary:write')(request.session as any)) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'PERMISSION_DENIED');
  }

  const contentType = (request.headers['content-type'] ?? '').split(';')[0]!;
  const contentLength = Number(request.headers['content-length'] ?? 0);

  const validationError = validateAssetUpload(contentType, contentLength);

  if (validationError === 'UNSUPPORTED_TYPE') {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'BLOG_ASSET_UNSUPPORTED_TYPE'
    );
  }

  if (validationError === 'TOO_LARGE') {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'BLOG_ASSET_TOO_LARGE'
    );
  }

  const buffer = request.body as Buffer;
  const originalName =
    (request.headers['x-file-name'] as string | undefined) ?? 'upload';
  const alt = request.headers['x-alt-text'] as string | undefined;
  const caption = request.headers['x-caption'] as string | undefined;
  const projectId = project.id.toString();

  try {
    const { s3Key, publicUrl, size } = await uploadAssetToS3(
      buffer,
      projectId,
      originalName,
      contentType
    );

    const asset = await assetService.createAsset({
      projectId: project.id,
      originalName,
      mimeType: contentType,
      size,
      s3Key,
      publicUrl,
      uploadedBy: user.id,
      ...(alt && { alt }),
      ...(caption && { caption }),
    });

    const assetJSON =
      (asset as unknown as { toJSON(): AssetAPI }).toJSON?.() ??
      (asset as unknown as AssetAPI);

    const responseData = formatResponse<AssetAPI>({
      message: t({
        en: 'Asset uploaded successfully',
        'en-GB': 'Asset uploaded successfully',
        fr: 'Ressource téléchargée avec succès',
        es: 'Recurso subido correctamente',
        ru: 'Ресурс успешно загружен',
        ja: 'アセットが正常にアップロードされました',
        ko: '자산이 성공적으로 업로드되었습니다',
        zh: '资源上传成功',
        de: 'Asset erfolgreich hochgeladen',
        ar: 'تم رفع المورد بنجاح',
        it: 'Risorsa caricata con successo',
        pt: 'Recurso enviado com sucesso',
        hi: 'एसेट सफलतापूर्वक अपलोड किया गया',
        tr: 'Varlık başarıyla yüklendi',
        pl: 'Zasób przesłany pomyślnie',
        id: 'Aset berhasil diunggah',
        vi: 'Tải lên tài sản thành công',
        uk: 'Ресурс успішно завантажено',
      }),
      data: assetJSON,
    });

    return reply.status(201).send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

/**
 * Updates mutable metadata (name, alt text, caption) of an asset.
 */
export const updateAsset = async (
  request: FastifyRequest<{
    Params: { assetId: string };
    Body: { originalName?: string; alt?: string; caption?: string };
  }>,
  reply: FastifyReply
): Promise<void> => {
  const { project, roles } = request.session || {};

  if (!project) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'PROJECT_NOT_DEFINED'
    );
  }

  if (!hasPermission(roles || [], 'dictionary:write')(request.session as any)) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'PERMISSION_DENIED');
  }

  const { assetId } = request.params;
  const { originalName, alt, caption } = request.body;

  try {
    const asset = await assetService.updateAsset(
      assetId,
      project.id.toString(),
      { originalName, alt, caption }
    );

    const assetJSON =
      (asset as unknown as { toJSON(): AssetAPI }).toJSON?.() ??
      (asset as unknown as AssetAPI);

    return reply.send(formatResponse<AssetAPI>({ data: assetJSON }));
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

/**
 * Deletes an asset record from the database and removes the file from S3.
 */
export const deleteAsset = async (
  request: FastifyRequest<{ Params: { assetId: string } }>,
  reply: FastifyReply
): Promise<void> => {
  const { project, roles } = request.session || {};

  if (!project) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'PROJECT_NOT_DEFINED'
    );
  }

  if (!hasPermission(roles || [], 'dictionary:write')(request.session as any)) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'PERMISSION_DENIED');
  }

  const { assetId } = request.params;

  try {
    const { s3Key } = await assetService.deleteAsset(
      assetId,
      project.id.toString()
    );

    await deleteAssetFromS3(s3Key);

    const responseData = formatResponse<null>({
      message: t({
        en: 'Asset deleted',
        'en-GB': 'Asset deleted',
        fr: 'Ressource supprimée',
        es: 'Recurso eliminado',
        ru: 'Ресурс удалён',
        ja: 'アセットが削除されました',
        ko: '자산이 삭제되었습니다',
        zh: '资源已删除',
        de: 'Asset gelöscht',
        ar: 'تم حذف المورد',
        it: 'Risorsa eliminata',
        pt: 'Recurso excluído',
        hi: 'एसेट हटाया गया',
        tr: 'Varlık silindi',
        pl: 'Zasób usunięty',
        id: 'Aset dihapus',
        vi: 'Tài sản đã bị xóa',
        uk: 'Ресурс видалено',
      }),
      data: null,
    });

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};
