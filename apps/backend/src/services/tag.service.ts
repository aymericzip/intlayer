import { TagModel } from '@models/tag.model';
import { GenericError } from '@utils/errors';
import type { TagFilters } from '@utils/filtersAndPagination/getTagFiltersAndPagination';
import { type TagFields, validateTag } from '@utils/validation/validateTag';
import type { ObjectId } from 'mongoose';
import { Organization } from '@/export';
import type { Tag, TagData, TagDocument } from '@/types/tag.types';

/**
 * Finds tags based on filters and pagination options.
 * @param filters - MongoDB filter query.
 * @param skip - Number of documents to skip.
 * @param limit - Number of documents to limit.
 * @returns List of tags matching the filters.
 */
export const findTags = async (
  filters: TagFilters,
  skip = 0,
  limit = 100
): Promise<TagDocument[]> =>
  await TagModel.find(filters).skip(skip).limit(limit);

/**
 * Finds a tag by its ID.
 * @param tagId - The ID of the tag to find.
 * @returns The tag matching the ID.
 */
export const getTagById = async (
  tagId: string | ObjectId
): Promise<TagDocument> => {
  const tag = await TagModel.findById(tagId);

  if (!tag) {
    throw new GenericError('TAG_NOT_FOUND', { tagId });
  }

  return tag;
};

export const getTagsByKeys = async (
  keys: string[],
  organizationId: string | Organization['_id']
): Promise<TagDocument[]> => {
  const tags = await TagModel.find({ key: { $in: keys }, organizationId });

  return tags;
};

/**
 * Counts the total number of tags that match the filters.
 * @param filters - MongoDB filter query.
 * @returns Total number of tags.
 */
export const countTags = async (filters: TagFilters): Promise<number> => {
  const result = await TagModel.countDocuments(filters);

  if (typeof result === 'undefined') {
    throw new GenericError('TAG_COUNT_FAILED', { filters });
  }

  return result;
};

/**
 * Creates a new tag in the database.
 * @param  tag - The tag data to create.
 * @returns The created tag.
 */
export const createTag = async (tag: TagData): Promise<TagDocument> => {
  const errors = await validateTag(tag, ['key']);

  if (Object.keys(errors).length > 0) {
    throw new GenericError('TAG_INVALID_FIELDS', { errors });
  }

  return await TagModel.create(tag);
};

/**
 * Updates an existing tag in the database by its ID.
 * @param tagId - The ID of the tag to update.
 * @param tag - The updated tag data.
 * @returns The updated tag.
 */
export const updateTagById = async (
  tagId: string | ObjectId,
  tag: Partial<Tag>
): Promise<TagDocument> => {
  const updatedKeys = Object.keys(tag) as TagFields;

  const errors = validateTag(tag, updatedKeys);

  if (Object.keys(errors).length > 0) {
    throw new GenericError('TAG_INVALID_FIELDS', {
      tagId,
      errors,
    });
  }

  const result = await TagModel.updateOne({ _id: tagId }, tag);

  if (result.matchedCount === 0) {
    throw new GenericError('TAG_UPDATE_FAILED', { tagId });
  }

  return await getTagById(tagId);
};

/**
 * Deletes a tag from the database by its ID.
 * @param tagId - The ID of the tag to delete.
 * @returns The result of the deletion operation.
 */
export const deleteTagById = async (
  tagId: string | ObjectId
): Promise<TagDocument> => {
  const tag = await TagModel.findByIdAndDelete(tagId);

  if (!tag) {
    throw new GenericError('TAG_NOT_FOUND', { tagId });
  }

  return tag;
};
