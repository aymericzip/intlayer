import { ensureMongoDocumentToObject } from '@utils/ensureMongoDocumentToObject';
import { Tag, TagAPI } from '@/types/tag.types';

/**
 * Maps a tag to an API response.
 * @param tag - The tag to map.
 * @returns The tag mapped to an API response.
 */
export const mapTagToAPI = (tag: Tag): TagAPI => {
  const tagObject = ensureMongoDocumentToObject(tag);

  const { ...tagAPI } = tagObject;
  return tagAPI;
};

/**
 * Formats an array of tags for API response. Removes sensitive information.
 * @param tags - The array of tag objects to format.
 * @param user - The user object.
 * @param isTagAdmin - Whether the user is an admin of the tag.
 * @returns The formatted array of user objects.
 */
export const mapTagsToAPI = (tags: Tag[]): TagAPI[] =>
  tags.map((tag) => mapTagToAPI(tag));
