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
  const { user, organization, roles } = request.locals || {};
  const { filters, sortOptions, pageSize, skip, page, getNumberOfPages } =
    getTagFiltersAndPagination(request);

  if (!user) {
    ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
    return;
  }

  if (!organization) {
    ErrorHandler.handleGenericErrorResponse(reply, 'ORGANIZATION_NOT_DEFINED');
    return;
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
        ...request.locals,
        targetTags: tags,
      })
    ) {
      ErrorHandler.handleGenericErrorResponse(reply, 'PERMISSION_DENIED');
      return;
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

    reply.send(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(reply, error as AppError);
    return;
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
  const { organization, project, user, roles } = request.locals || {};
  const tagData = request.body;

  if (!user) {
    ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
    return;
  }

  if (!organization) {
    ErrorHandler.handleGenericErrorResponse(reply, 'ORGANIZATION_NOT_DEFINED');
    return;
  }

  if (!project) {
    ErrorHandler.handleGenericErrorResponse(reply, 'PROJECT_NOT_DEFINED');
    return;
  }

  if (!tagData) {
    ErrorHandler.handleGenericErrorResponse(reply, 'PROJECT_DATA_NOT_FOUND');
    return;
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
      ...request.locals,
      targetTags: [tag as Tag],
    })
  ) {
    ErrorHandler.handleGenericErrorResponse(reply, 'PERMISSION_DENIED');
    return;
  }

  try {
    const newTag = await tagService.createTag(tag);

    const formattedTag = mapTagToAPI(newTag);

    const responseData = formatResponse<TagAPI>({
      message: t({
        en: 'Tag created successfully',
        fr: 'Tag créé avec succès',
        es: 'Tag creado con éxito',
      }),
      description: t({
        en: 'Your tag has been created successfully',
        fr: 'Votre tag a été créé avec succès',
        es: 'Su tag ha sido creado con éxito',
      }),
      data: formattedTag,
    });

    reply.send(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(reply, error as AppError);
    return;
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
  const { organization, user, roles } = request.locals || {};

  if (!user) {
    ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
    return;
  }

  if (!organization) {
    ErrorHandler.handleGenericErrorResponse(reply, 'ORGANIZATION_NOT_DEFINED');
    return;
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
        ...request.locals,
        targetTags: [tagToDelete],
      })
    ) {
      ErrorHandler.handleGenericErrorResponse(reply, 'PERMISSION_DENIED');
      return;
    }

    if (String(tagToDelete.organizationId) !== String(organization.id)) {
      ErrorHandler.handleGenericErrorResponse(reply, 'TAG_NOT_IN_ORGANIZATION');
      return;
    }

    const updatedTag = await tagService.updateTagById(tag._id, tag);

    const formattedTag = mapTagToAPI(updatedTag);

    const responseData = formatResponse<TagAPI>({
      message: t({
        en: 'Tag updated successfully',
        fr: 'Tag mis à jour avec succès',
        es: 'Tag actualizado con éxito',
      }),
      description: t({
        en: 'Your tag has been updated successfully',
        fr: 'Votre tag a été mis à jour avec succès',
        es: 'Su tag ha sido actualizado con éxito',
      }),
      data: formattedTag,
    });

    reply.send(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(reply, error as AppError);
    return;
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
  const { user, organization, roles } = request.locals || {};
  const { tagId } = request.params;

  if (!user) {
    ErrorHandler.handleGenericErrorResponse(reply, 'USER_NOT_DEFINED');
    return;
  }

  if (!organization) {
    ErrorHandler.handleGenericErrorResponse(reply, 'ORGANIZATION_NOT_DEFINED');
    return;
  }

  if (!tagId) {
    ErrorHandler.handleGenericErrorResponse(reply, 'TAG_ID_NOT_FOUND');
    return;
  }

  try {
    const tagToDelete = await tagService.getTagById(tagId);

    if (
      !hasPermission(
        roles || [],
        'tag:admin'
      )({
        ...request.locals,
        targetTags: [tagToDelete],
      })
    ) {
      ErrorHandler.handleGenericErrorResponse(reply, 'PERMISSION_DENIED');
      return;
    }

    if (String(tagToDelete.organizationId) !== String(organization.id)) {
      ErrorHandler.handleGenericErrorResponse(reply, 'TAG_NOT_IN_ORGANIZATION');
      return;
    }

    const deletedTag = await tagService.deleteTagById(tagId);

    if (!deletedTag) {
      ErrorHandler.handleGenericErrorResponse(reply, 'TAG_NOT_FOUND', {
        tagId,
      });

      return;
    }

    logger.info(`Tag deleted: ${String(deletedTag.id)}`);

    const formattedTag = mapTagToAPI(deletedTag);

    const responseData = formatResponse<TagAPI>({
      message: t({
        en: 'Tag deleted successfully',
        fr: 'Tag supprimé avec succès',
        es: 'Tag eliminado con éxito',
      }),
      description: t({
        en: 'Your tag has been deleted successfully',
        fr: 'Votre tag a été supprimé avec succès',
        es: 'Su tag ha sido eliminado con éxito',
      }),
      data: formattedTag,
    });

    reply.send(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(reply, error as AppError);
    return;
  }
};
