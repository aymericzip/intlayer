import {
  getAppLogger,
  getConfiguration,
  type GetConfigurationOptions,
} from '@intlayer/config';
import fg from 'fast-glob';

type GetContentDeclarationOptions = {
  exclude?: string[];
  configOptions?: GetConfigurationOptions;
};

export const getContentDeclaration = (
  options?: GetContentDeclarationOptions
): string[] => {
  const {
    content: { watchedFilesPatternWithPath },
  } = getConfiguration(options?.configOptions);

  const contentDeclarationFilesPath: string[] = fg.sync(
    watchedFilesPatternWithPath,
    {
      ignore: options?.exclude,
    }
  );

  return contentDeclarationFilesPath;
};

type ListContentDeclarationOptions = {
  configOptions?: GetConfigurationOptions;
};

export const listContentDeclaration = (
  options?: ListContentDeclarationOptions
) => {
  const contentDeclarationFilesPath = getContentDeclaration(options);

  const config = getConfiguration(options?.configOptions);
  const appLogger = getAppLogger(config);

  appLogger([contentDeclarationFilesPath]);
};
