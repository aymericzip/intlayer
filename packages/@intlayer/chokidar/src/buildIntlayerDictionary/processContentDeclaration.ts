import { logger } from '@intlayer/config/client';
import type { Dictionary } from '@intlayer/types';
import { resolveObjectPromises } from '../utils/resolveObjectPromises';

/**
 * Function to load, process the module and return the Intlayer Dictionary from the module file
 */
export const processContentDeclaration = async (
  contentDeclaration: Dictionary
): Promise<Dictionary | undefined> => {
  try {
    const content = (await resolveObjectPromises(
      contentDeclaration.content
    )) as Dictionary['content'];

    return {
      ...contentDeclaration,
      content,
    } as Dictionary;
  } catch (error) {
    logger(error, {
      level: 'error',
    });
  }
};
