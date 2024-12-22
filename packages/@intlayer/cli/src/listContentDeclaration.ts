import { getConfiguration, logger } from '@intlayer/config';
import fg from 'fast-glob';

type GetContentDeclarationOptions = {
  exclude?: string[];
};

export const getContentDeclaration = (
  options?: GetContentDeclarationOptions
): string[] => {
  const {
    content: { watchedFilesPatternWithPath },
  } = getConfiguration();

  const contentDeclarationFilesPath: string[] = fg.sync(
    watchedFilesPatternWithPath,
    {
      ignore: options?.exclude,
    }
  );

  return contentDeclarationFilesPath;
};

type ListContentDeclarationOptions = {};

export const listContentDeclaration = (
  _options: ListContentDeclarationOptions
) => {
  const contentDeclarationFilesPath = getContentDeclaration();

  logger(`Content declaration files: ${contentDeclarationFilesPath}`);
};
