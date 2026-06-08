import { logger } from '@logger';
import * as tagService from '@services/tag.service';
import { type AppError, ErrorHandler } from '@utils/errors';
import type { FiltersAndPagination } from '@utils/filtersAndPagination/getFiltersAndPaginationFromBody';
import {
  getTagFiltersAndPagination,
  type TagFiltersParams,
} from '@utils/filtersAndPagination/getTagFiltersAndPagination';
import { mapTagsToAPI, mapTagToAPI } from '@utils/mapper/tag';
import { hasPermission } from '@utils/permissions';
import {
  formatPaginatedResponse,
  formatResponse,
  type PaginatedResponse,
  type ResponseData,
} from '@utils/responseData';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { t } from 'fastify-intlayer';
import type {
  Tag,
  TagAPI,
  TagCreationData,
  TagData,
  TagSchema,
} from '@/types/tag.types';

export type GetTagsParams = FiltersAndPagination<TagFiltersParams>;
export type GetTagsResult = PaginatedResponse<TagAPI>;

/**
 * Retrieves a list of tags based on filters and pagination.
 */
export const getTags = async (
  request: FastifyRequest<{ Querystring: GetTagsParams }>,
  reply: FastifyReply
): Promise<void> => {
  const { user, organization, roles } = request.session || {};
  const { filters, sortOptions, pageSize, skip, page, getNumberOfPages } =
    getTagFiltersAndPagination(request);

  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }

  if (!organization) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'ORGANIZATION_NOT_DEFINED'
    );
  }

  try {
    const tags = await tagService.findTags(
      filters,
      skip,
      pageSize,
      sortOptions
    );

    if (
      !hasPermission(
        roles || [],
        'tag:read'
      )({
        ...request.session,
        targetTags: tags,
      })
    ) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'PERMISSION_DENIED'
      );
    }

    const totalItems = await tagService.countTags(filters);

    const formattedTags = mapTagsToAPI(tags);

    const responseData = formatPaginatedResponse<TagAPI>({
      data: formattedTags,
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

export type AddTagBody = TagCreationData;
export type AddTagResult = ResponseData<TagAPI>;

/**
 * Adds a new tag to the database.
 */
export const addTag = async (
  request: FastifyRequest<{ Body: AddTagBody }>,
  reply: FastifyReply
): Promise<void> => {
  const { organization, project, user, roles } = request.session || {};
  const tagData = request.body;

  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }

  if (!organization) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'ORGANIZATION_NOT_DEFINED'
    );
  }

  if (!project) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'PROJECT_NOT_DEFINED'
    );
  }

  if (!tagData) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'PROJECT_DATA_NOT_FOUND'
    );
  }

  const tag: TagData = {
    creatorId: user.id,
    organizationId: organization.id,
    projectId: project.id,
    ...tagData,
  };

  if (
    !hasPermission(
      roles || [],
      'tag:admin'
    )({
      ...request.session,
      targetTags: [tag as Tag],
    })
  ) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'PERMISSION_DENIED');
  }

  try {
    const newTag = await tagService.createTag(tag);

    const formattedTag = mapTagToAPI(newTag);

    const responseData = formatResponse<TagAPI>({
      message: t({
        en: 'Tag created successfully',
        'en-GB': 'Tag created successfully',
        fr: 'Tag créé avec succès',
        es: 'Tag creado con éxito',
        ru: 'Тег успешно создан',
        ja: 'タグが正常に作成されました',
        ko: '태그가 성공적으로 생성되었습니다',
        zh: '标签已成功创建',
        de: 'Tag erfolgreich erstellt',
        ar: 'تم إنشاء العلامة بنجاح',
        it: 'Tag creato con successo',
        pt: 'Tag criada com sucesso',
        hi: 'टैग सफलतापूर्वक बनाया गया',
        tr: 'Etiket başarıyla oluşturuldu',
        pl: 'Tag został pomyślnie utworzony',
        id: 'Tag berhasil dibuat',
        vi: 'Thẻ đã được tạo thành công',
        uk: 'Тег успішно створено',
      }),
      description: t({
        en: 'Your tag has been created successfully',
        'en-GB': 'Your tag has been created successfully',
        fr: 'Votre tag a été créé avec succès',
        es: 'Su tag ha sido creado con éxito',
        ru: 'Ваш тег был успешно создан',
        ja: 'タグは正常に作成されました',
        ko: '태그가 성공적으로 생성되었습니다',
        zh: '您的标签已成功创建',
        de: 'Ihr Tag wurde erfolgreich erstellt',
        ar: 'لقد تم إنشاء علامتك بنجاح',
        it: 'Il tuo tag è stato creato con successo',
        pt: 'Sua tag foi criada com sucesso',
        hi: 'आपका टैग सफलतापूर्वक बना लिया गया है',
        tr: 'Etiketiniz başarıyla oluşturuldu',
        pl: 'Twój tag został pomyślnie utworzony',
        id: 'Tag Anda telah berhasil dibuat',
        vi: 'Thẻ của bạn đã được tạo thành công',
        uk: 'Ваш тег успішно створено',
      }),
      data: formattedTag,
    });

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type UpdateTagParams = { tagId: string | Tag['id'] };
export type UpdateTagBody = Partial<TagData>;
export type UpdateTagResult = ResponseData<TagAPI>;

/**
 * Updates an existing tag in the database.
 */
export const updateTag = async (
  request: FastifyRequest<{ Params: UpdateTagParams; Body: UpdateTagBody }>,
  reply: FastifyReply
): Promise<void> => {
  const { tagId } = request.params;
  const { organization, user, roles } = request.session || {};

  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }

  if (!organization) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'ORGANIZATION_NOT_DEFINED'
    );
  }

  try {
    const tag = {
      _id: tagId,
      name: request.body.name,
      key: request.body.key,
      description: request.body.description,
      instructions: request.body.instructions,
    } as Partial<TagSchema> & { _id: Tag['id'] };

    const tagToDelete = await tagService.getTagById(tagId);

    if (
      !hasPermission(
        roles || [],
        'tag:write'
      )({
        ...request.session,
        targetTags: [tagToDelete],
      })
    ) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'PERMISSION_DENIED'
      );
    }

    if (String(tagToDelete.organizationId) !== String(organization.id)) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'TAG_NOT_IN_ORGANIZATION'
      );
    }

    const updatedTag = await tagService.updateTagById(tag._id, tag);

    const formattedTag = mapTagToAPI(updatedTag);

    const responseData = formatResponse<TagAPI>({
      message: t({
        en: 'Tag updated successfully',
        'en-GB': 'Tag updated successfully',
        fr: 'Tag mis à jour avec succès',
        es: 'Tag actualizado con éxito',
        ru: 'Тег успешно обновлен',
        ja: 'タグが正常に更新されました',
        ko: '태그가 성공적으로 업데이트되었습니다',
        zh: '标签已成功更新',
        de: 'Tag erfolgreich aktualisiert',
        ar: 'تم تحديث العلامة بنجاح',
        it: 'Tag aggiornato con successo',
        pt: 'Tag atualizada com sucesso',
        hi: 'टैग सफलतापूर्वक अपडेट किया गया',
        tr: 'Etiket başarıyla güncellendi',
        pl: 'Tag został pomyślnie zaktualizowany',
        id: 'Tag berhasil diperbarui',
        vi: 'Thẻ đã được cập nhật thành công',
        uk: 'Тег успішно оновлено',
      }),
      description: t({
        en: 'Your tag has been updated successfully',
        'en-GB': 'Your tag has been updated successfully',
        fr: 'Votre tag a été mis à jour avec succès',
        es: 'Su tag ha sido actualizado con éxito',
        ru: 'Ваш тег был успешно обновлен',
        ja: 'タグは正常に更新されました',
        ko: '태그가 성공적으로 업데이트되었습니다',
        zh: '您的标签已成功更新',
        de: 'Ihr Tag wurde erfolgreich aktualisiert',
        ar: 'لقد تم تحديث علامتك بنجاح',
        it: 'Il tuo tag è stato aggiornato con successo',
        pt: 'Sua tag foi atualizada com sucesso',
        hi: 'आपका टैग सफलतापूर्वक अपडेट कर दिया गया है',
        tr: 'Etiketiniz başarıyla güncellendi',
        pl: 'Twój tag został pomyślnie zaktualizowany',
        id: 'Tag Anda telah berhasil diperbarui',
        vi: 'Thẻ của bạn đã được cập nhật thành công',
        uk: 'Ваш тег успішно оновлено',
      }),
      data: formattedTag,
    });

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};

export type DeleteTagParams = { tagId: string | Tag['id'] };
export type DeleteTagResult = ResponseData<TagAPI>;

/**
 * Deletes a tag from the database by its ID.
 */
export const deleteTag = async (
  request: FastifyRequest<{ Params: DeleteTagParams }>,
  reply: FastifyReply
): Promise<void> => {
  const { user, organization, roles } = request.session || {};
  const { tagId } = request.params;

  if (!user) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
  }

  if (!organization) {
    return ErrorHandler.handleGenericErrorResponse(
      reply,
      'ORGANIZATION_NOT_DEFINED'
    );
  }

  if (!tagId) {
    return ErrorHandler.handleGenericErrorResponse(reply, 'TAG_ID_NOT_FOUND');
  }

  try {
    const tagToDelete = await tagService.getTagById(tagId);

    if (
      !hasPermission(
        roles || [],
        'tag:admin'
      )({
        ...request.session,
        targetTags: [tagToDelete],
      })
    ) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'PERMISSION_DENIED'
      );
    }

    if (String(tagToDelete.organizationId) !== String(organization.id)) {
      return ErrorHandler.handleGenericErrorResponse(
        reply,
        'TAG_NOT_IN_ORGANIZATION'
      );
    }

    const deletedTag = await tagService.deleteTagById(tagId);

    if (!deletedTag) {
      return ErrorHandler.handleGenericErrorResponse(reply, 'TAG_NOT_FOUND', {
        tagId,
      });
    }

    logger.info(`Tag deleted: ${String(deletedTag.id)}`);

    const formattedTag = mapTagToAPI(deletedTag);

    const responseData = formatResponse<TagAPI>({
      message: t({
        en: 'Tag deleted successfully',
        'en-GB': 'Tag deleted successfully',
        fr: 'Tag supprimé avec succès',
        es: 'Tag eliminado con éxito',
        ru: 'Тег успешно удален',
        ja: 'タグが正常に削除されました',
        ko: '태그가 성공적으로 삭제되었습니다',
        zh: '标签已成功删除',
        de: 'Tag erfolgreich gelöscht',
        ar: 'تم حذف العلامة بنجاح',
        it: 'Tag eliminato con successo',
        pt: 'Tag excluída com sucesso',
        hi: 'टैग सफलतापूर्वक हटा दिया गया',
        tr: 'Etiket başarıyla silindi',
        pl: 'Tag został pomyślnie usunięty',
        id: 'Tag berhasil dihapus',
        vi: 'Thẻ đã được xóa thành công',
        uk: 'Тег успішно видалено',
      }),
      description: t({
        en: 'Your tag has been deleted successfully',
        'en-GB': 'Your tag has been deleted successfully',
        fr: 'Votre tag a été supprimé avec succès',
        es: 'Su tag ha sido eliminado con éxito',
        ru: 'Ваш тег был успешно удален',
        ja: 'タグは正常に削除されました',
        ko: '태그가 성공적으로 삭제되었습니다',
        zh: '您的标签已成功删除',
        de: 'Ihr Tag wurde erfolgreich gelöscht',
        ar: 'لقد تم حذف علامتك بنجاح',
        it: 'Il tuo tag è stato eliminato con successo',
        pt: 'Sua tag foi excluída com sucesso',
        hi: 'आपका टैग सफलतापूर्वक हटा दिया गया है',
        tr: 'Etiketiniz başarıyla silindi',
        pl: 'Twój tag został pomyślnie usunięty',
        id: 'Tag Anda telah berhasil dihapus',
        vi: 'Thẻ của bạn đã được xóa thành công',
        uk: 'Ваш тег успішно видалено',
      }),
      data: formattedTag,
    });

    return reply.send(responseData);
  } catch (error) {
    return ErrorHandler.handleAppErrorResponse(reply, error as AppError);
  }
};
