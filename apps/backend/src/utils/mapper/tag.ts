import type { Tag, TagAPI } from '@/types/tag.types';
import { ensureMongoDocumentToObject } from '@utils/ensureMongoDocumentToObject';

/**
 * Maps a tag to an API response.
 * @param tag - The tag to map.
 * @returns The tag mapped to an API response.
 */
export const mapTagToAPI = (tag: Tag): TagAPI => {
  const tagObject = ensureMongoDocumentToObject(tag);

  return tagObject as unknown as TagAPI;
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
