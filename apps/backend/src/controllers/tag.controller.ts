import { logger } from '@logger';
import type { ResponseWithInformation } from '@middlewares/sessionAuth.middleware';
import * as tagService from '@services/tag.service';
import { type AppError, ErrorHandler } from '@utils/errors';
import type { FiltersAndPagination } from '@utils/filtersAndPagination/getFiltersAndPaginationFromBody';
import {
  getTagFiltersAndPagination,
  type TagFilters,
  type TagFiltersParams,
} from '@utils/filtersAndPagination/getTagFiltersAndPagination';
import { mapTagsToAPI, mapTagToAPI } from '@utils/mapper/tag';
import {
  formatPaginatedResponse,
  type ResponseData,
  type PaginatedResponse,
  formatResponse,
} from '@utils/responseData';
import type { NextFunction, Request } from 'express';
import { t } from 'express-intlayer';
import type { Tag, TagAPI, TagCreationData, TagData } from '@/types/tag.types';

export type GetTagsParams = FiltersAndPagination<TagFiltersParams>;
export type GetTagsResult = PaginatedResponse<TagAPI>;

/**
 * Retrieves a list of tags based on filters and pagination.
 */
export const getTags = async (
  req: Request<GetTagsParams>,
  res: ResponseWithInformation<GetTagsResult>,
  _next: NextFunction
): Promise<void> => {
  const { user, organization } = res.locals;
  const { filters, pageSize, skip, page, getNumberOfPages } =
    getTagFiltersAndPagination(req);

  if (!user) {
    ErrorHandler.handleGenericErrorResponse(res, 'USER_NOT_DEFINED');
    return;
  }

  if (!organization) {
    ErrorHandler.handleGenericErrorResponse(res, 'ORGANIZATION_NOT_DEFINED');
    return;
  }

  const restrictedFilter: TagFilters = {
    ...filters,
    organizationId: String(organization._id),
  };

  try {
    const tags = await tagService.findTags(restrictedFilter, skip, pageSize);
    const totalItems = await tagService.countTags(filters);

    const formattedTags = mapTagsToAPI(tags);

    const responseData = formatPaginatedResponse<TagAPI>({
      data: formattedTags,
      page,
      pageSize,
      totalPages: getNumberOfPages(totalItems),
      totalItems,
    });

    res.json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};

export type AddTagBody = TagCreationData;
export type AddTagResult = ResponseData<TagAPI>;

/**
 * Adds a new tag to the database.
 */
export const addTag = async (
  req: Request<any, any, AddTagBody>,
  res: ResponseWithInformation<AddTagResult>,
  _next: NextFunction
): Promise<void> => {
  const { organization, user, isOrganizationAdmin } = res.locals;
  const tagData = req.body;

  if (!user) {
    ErrorHandler.handleGenericErrorResponse(res, 'USER_NOT_DEFINED');
    return;
  }

  if (!organization) {
    ErrorHandler.handleGenericErrorResponse(res, 'ORGANIZATION_NOT_DEFINED');
    return;
  }

  if (!isOrganizationAdmin) {
    ErrorHandler.handleGenericErrorResponse(
      res,
      'USER_IS_NOT_ADMIN_OF_ORGANIZATION'
    );
  }

  if (!tagData) {
    ErrorHandler.handleGenericErrorResponse(res, 'PROJECT_DATA_NOT_FOUND');
  }

  const { plan } = organization;

  if (!plan) {
    ErrorHandler.handleGenericErrorResponse(res, 'PLAN_NOT_FOUND', {
      organizationId: organization._id,
    });
    return;
  }

  const tag: TagData = {
    creatorId: user._id,
    organizationId: organization._id,
    ...tagData,
  };

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

    res.json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};

export type UpdateTagParams = { tagId: string | Tag['_id'] };
export type UpdateTagBody = Partial<TagData>;
export type UpdateTagResult = ResponseData<TagAPI>;

/**
 * Updates an existing tag in the database.
 */
export const updateTag = async (
  req: Request<UpdateTagParams, any, UpdateTagBody>,
  res: ResponseWithInformation<UpdateTagResult>,
  _next: NextFunction
): Promise<void> => {
  const { tagId } = req.params;
  const { organization, user } = res.locals;

  if (!user) {
    ErrorHandler.handleGenericErrorResponse(res, 'USER_NOT_DEFINED');
    return;
  }

  if (!organization) {
    ErrorHandler.handleGenericErrorResponse(res, 'ORGANIZATION_NOT_DEFINED');
    return;
  }

  try {
    const tag = {
      _id: tagId as TagAPI['_id'],
      name: req.body.name,
      key: req.body.key,
      description: req.body.description,
      instructions: req.body.instructions,
    };

    const tagToDelete = await tagService.getTagById(tagId);

    if (String(tagToDelete.organizationId) !== String(organization._id)) {
      ErrorHandler.handleGenericErrorResponse(res, 'TAG_NOT_IN_ORGANIZATION');
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

    res.json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};

export type DeleteTagParams = { tagId: string | Tag['_id'] };
export type DeleteTagResult = ResponseData<TagAPI>;

/**
 * Deletes a tag from the database by its ID.
 * @param req - Express request object.
 * @param  res - Express response object.
 * @returns Response confirming the deletion.
 */
export const deleteTag = async (
  req: Request<DeleteTagParams>,
  res: ResponseWithInformation<DeleteTagResult>,
  _next: NextFunction
): Promise<void> => {
  const { user, organization } = res.locals;
  const { tagId } = req.params;

  if (!user) {
    ErrorHandler.handleGenericErrorResponse(res, 'USER_NOT_DEFINED');
    return;
  }

  if (!organization) {
    ErrorHandler.handleGenericErrorResponse(res, 'ORGANIZATION_NOT_DEFINED');
    return;
  }

  if (!tagId) {
    ErrorHandler.handleGenericErrorResponse(res, 'TAG_ID_NOT_FOUND');
    return;
  }

  try {
    const tagToDelete = await tagService.getTagById(tagId);

    if (String(tagToDelete.organizationId) !== String(organization._id)) {
      ErrorHandler.handleGenericErrorResponse(res, 'TAG_NOT_IN_ORGANIZATION');
      return;
    }

    const deletedTag = await tagService.deleteTagById(tagId);

    if (!deletedTag) {
      ErrorHandler.handleGenericErrorResponse(res, 'TAG_NOT_FOUND', {
        tagId,
      });

      return;
    }

    logger.info(`Tag deleted: ${String(deletedTag._id)}`);

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

    res.json(responseData);
    return;
  } catch (error) {
    ErrorHandler.handleAppErrorResponse(res, error as AppError);
    return;
  }
};
