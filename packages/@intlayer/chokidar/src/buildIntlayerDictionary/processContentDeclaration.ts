import { logger } from '@intlayer/config/client';
import type { Dictionary, IntlayerConfig } from '@intlayer/types';
import { autoDecorateContent } from '../utils/autoDecorateContent';
import { resolveObjectPromises } from '../utils/resolveObjectPromises';

/**
 * Function to load, process the module and return the Intlayer Dictionary from the module file
 */
export const processContentDeclaration = async (
  contentDeclaration: Dictionary,
  configuration: IntlayerConfig
): Promise<Dictionary | undefined> => {
  try {
    const resolvedContent = (await resolveObjectPromises(
      contentDeclaration.content
    )) as Dictionary['content'];

    const isAutoDecorateContentEnabled =
      contentDeclaration.contentAutoTransformation ??
      configuration.dictionary?.contentAutoTransformation ??
      false;

    const decoratedContent = isAutoDecorateContentEnabled
      ? autoDecorateContent(resolvedContent)
      : resolvedContent;

    return {
      ...contentDeclaration,
      content: decoratedContent,
    } as Dictionary;
  } catch (error) {
    logger(error, {
      level: 'error',
    });
  }
};
